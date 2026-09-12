import fs from "node:fs";
import path from "node:path";
import { parseDocument } from "yaml";
import { fromMarkdown } from "mdast-util-from-markdown";

export const NAME_MAX_LENGTH = 64;
export const DESCRIPTION_MAX_LENGTH = 1024;
export const COMPATIBILITY_MAX_LENGTH = 500;
export const BODY_LINE_LIMIT = 500;
export const REFERENCE_TOC_LINE_LIMIT = 100;
export const REFERENCE_TOC_MIN_HEADINGS = 3;
// Claude authoring constraints, not portable specification requirements.
export const RESERVED_NAME_WORDS = ["anthropic", "claude"];
export const HOST_SPECIFIC_PATTERNS = [
  { label: "CODEX_HOME", pattern: /CODEX_HOME/ },
  { label: "$imagegen", pattern: /\$imagegen\b/ },
  { label: "${CLAUDE_*}", pattern: /\$\{CLAUDE_[A-Z_]+\}/ },
  { label: "$ARGUMENTS", pattern: /\$ARGUMENTS\b/ },
  { label: "~/.codex", pattern: /~\/\.codex\b/ },
  { label: "~/.claude", pattern: /~\/\.claude\b/ },
  { label: "~/.cursor", pattern: /~\/\.cursor\b/ },
  { label: "~/.copilot", pattern: /~\/\.copilot\b/ },
  { label: "inline shell injection (!`cmd`)", pattern: /(^|\s)!`[^`]+`/ },
  { label: "shell fence (```!)", pattern: /^```!/m },
];
// Specific exceptions for a Codex-only workflow, never a skill-wide waiver.
export const HOST_TOKEN_EXCEPTIONS = {
  "hatch-pet": {
    CODEX_HOME: "Codex pet installation and image-generation storage paths",
    $imagegen: "Required Codex image-generation skill",
  },
};
const PORTABLE_FIELDS = new Set([
  "name",
  "description",
  "license",
  "compatibility",
  "metadata",
  "allowed-tools",
]);
const isMap = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

function readYaml(source) {
  const document = parseDocument(source, { uniqueKeys: true });
  if (document.errors.length)
    throw new Error(document.errors[0].message.split("\n")[0]);
  return document.toJS({ maxAliasCount: 100 });
}

export function parseFrontmatter(content) {
  const match = content.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match)
    return { data: null, body: content, error: "missing YAML frontmatter" };
  const body = content.slice(match[0].length);
  try {
    const data = readYaml(match[1]);
    if (!isMap(data)) throw new Error("frontmatter must be a mapping");
    return { data, body, error: null };
  } catch (error) {
    return {
      data: null,
      body,
      error: `invalid YAML frontmatter: ${error.message}`,
    };
  }
}

function walk(node, callback) {
  callback(node);
  for (const child of node.children ?? []) walk(child, callback);
}

export function validateSkillContent(content, folderName) {
  const { data, body, error } = parseFrontmatter(content);
  if (error) return [error];
  const errors = [];
  for (const field of ["name", "description"]) {
    if (data[field] === undefined || data[field] === "")
      errors.push(`missing required field: ${field}`);
    else if (typeof data[field] !== "string")
      errors.push(`${field} must be a string`);
    else if (!data[field].trim()) errors.push(`${field} must be non-empty`);
  }
  const { name, description, compatibility } = data;
  if (typeof name === "string" && name) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name))
      errors.push(
        "name must use lowercase letters, numbers, and single hyphens",
      );
    if (name !== folderName)
      errors.push(`name "${name}" must match folder "${folderName}"`);
    if (name.length > NAME_MAX_LENGTH)
      errors.push("name must be 64 characters or fewer");
    for (const word of RESERVED_NAME_WORDS) {
      if (name.includes(word))
        errors.push(
          `Claude compatibility: name must not contain the reserved word "${word}"`,
        );
    }
  }
  if (typeof description === "string") {
    if (description.length > DESCRIPTION_MAX_LENGTH)
      errors.push("description must be 1024 characters or fewer");
    if (/<[a-zA-Z/][^>]*>/.test(description))
      errors.push(
        "Claude compatibility: description must not contain XML tags",
      );
  }
  if (compatibility !== undefined) {
    if (typeof compatibility !== "string")
      errors.push("compatibility must be a string");
    else if (!compatibility.trim())
      errors.push("compatibility must be non-empty when present");
    else if (compatibility.length > COMPATIBILITY_MAX_LENGTH)
      errors.push("compatibility must be 500 characters or fewer");
  }
  for (const field of ["license", "allowed-tools"]) {
    if (data[field] !== undefined && typeof data[field] !== "string")
      errors.push(`${field} must be a string`);
  }
  if (
    data.metadata !== undefined &&
    (!isMap(data.metadata) ||
      Object.values(data.metadata).some((value) => typeof value !== "string"))
  )
    errors.push("metadata must map string keys to string values");
  for (const field of Object.keys(data)) {
    if (!PORTABLE_FIELDS.has(field))
      errors.push(`non-portable frontmatter field: ${field}`);
  }
  if (!body.trim()) errors.push("instructions are empty");
  const prose = [];
  walk(fromMarkdown(body), (node) => {
    if (node.type === "text") prose.push(node.value);
  });
  for (const marker of ["TODO", "TBD", "{{", "}}", "lorem ipsum"]) {
    if (prose.join("\n").toLowerCase().includes(marker.toLowerCase()))
      errors.push(`contains draft marker: ${marker}`);
  }
  return errors;
}

function markdownLinkTargets(content) {
  const targets = new Set();
  // AST nodes distinguish actual links/definitions/images from code examples.
  walk(fromMarkdown(content), (node) => {
    if (["link", "image", "definition"].includes(node.type))
      targets.add(node.url);
  });
  return [...targets].filter(
    (target) => !/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(target),
  );
}

function within(root, target) {
  const relative = path.relative(root, target);
  return (
    relative === "" ||
    (!path.isAbsolute(relative) &&
      relative !== ".." &&
      !relative.startsWith(`..${path.sep}`))
  );
}

// sourceDirectory is the referring file's directory; skillRoot is its package boundary.
export function validateSkillLinks(
  content,
  sourceDirectory,
  skillRoot = sourceDirectory,
) {
  const errors = [];
  for (const target of markdownLinkTargets(content)) {
    if (/[<>{}]/.test(target)) continue; // A documented filename placeholder.
    let pathname;
    try {
      pathname = decodeURIComponent(target.split(/[?#]/)[0]);
    } catch {
      errors.push(`invalid relative link encoding: ${target}`);
      continue;
    }
    if (!pathname) continue;
    const resolved = path.resolve(sourceDirectory, pathname);
    if (!within(path.resolve(skillRoot), resolved))
      errors.push(`link escapes the skill folder: ${target}`);
    else if (!fs.existsSync(resolved))
      errors.push(`broken relative link: ${target}`);
    else if (!within(fs.realpathSync(skillRoot), fs.realpathSync(resolved)))
      errors.push(`link escapes the skill folder through a symlink: ${target}`);
  }
  return errors;
}

export function lintSkillContent(content) {
  const parsed = parseFrontmatter(content);
  if (parsed.error) return [];
  const warnings = [];
  const bodyLines = parsed.body.trimEnd().split(/\r?\n/).length;
  if (bodyLines > BODY_LINE_LIMIT)
    warnings.push(
      `SKILL.md body is ${bodyLines} lines; consider selective references (guidance: ${BODY_LINE_LIMIT})`,
    );
  const lines = content.split(/\r?\n/);
  const exceptions = /\bCodex-only\b/.test(parsed.data.compatibility ?? "")
    ? (HOST_TOKEN_EXCEPTIONS[parsed.data.name] ?? {})
    : {};
  for (const { label, pattern } of HOST_SPECIFIC_PATTERNS) {
    const index = lines.findIndex((line) => pattern.test(line));
    if (index >= 0 && !Object.hasOwn(exceptions, label))
      warnings.push(
        `host-specific token ${label} at line ${index + 1}; verify intended host support`,
      );
  }
  // Claude escapes only a single backslash; two backslashes do not escape $1.
  const positional = lines.findIndex((line) =>
    /(?<!\\)\$\d|\\{2,}\$\d/.test(line),
  );
  if (positional >= 0)
    warnings.push(
      `"$<digit>" at line ${positional + 1} may be substituted by Claude Code; escape a literal dollar with one backslash`,
    );
  return warnings;
}

function walkMarkdown(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const full = path.join(directory, entry.name);
      if (entry.isDirectory()) return walkMarkdown(full);
      return entry.isFile() && entry.name.endsWith(".md") ? [full] : [];
    })
    .sort();
}

export function lintReferenceFiles(skillDirectory) {
  const warnings = [];
  for (const file of walkMarkdown(path.join(skillDirectory, "references"))) {
    const content = fs.readFileSync(file, "utf8");
    const lineCount = content.trimEnd().split(/\r?\n/).length;
    if (lineCount <= REFERENCE_TOC_LINE_LIMIT) continue;
    const headings = [];
    walk(fromMarkdown(content), (node) => {
      if (node.type === "heading" && node.depth <= 3) headings.push(node);
    });
    const sections = headings.filter((node) => node.depth >= 2);
    const hasContents = headings.some((node) =>
      /^(contents|table of contents)\b/i.test(
        node.children.map((child) => child.value ?? "").join(""),
      ),
    );
    if (sections.length >= REFERENCE_TOC_MIN_HEADINGS && !hasContents)
      warnings.push(
        `${path.relative(skillDirectory, file)} is ${lineCount} lines; consider a contents list for selective reading`,
      );
  }
  return warnings;
}

export function validateOpenAiMetadata(content, skillName) {
  let data;
  try {
    data = readYaml(content);
  } catch (error) {
    return [`invalid OpenAI metadata YAML: ${error.message}`];
  }
  if (!isMap(data?.interface)) return ["missing interface block"];
  const errors = [];
  const fields = data.interface;
  for (const field of ["display_name", "short_description", "default_prompt"]) {
    if (typeof fields[field] !== "string" || !fields[field].trim())
      errors.push(`missing interface.${field}`);
  }
  if (
    typeof fields.short_description === "string" &&
    (fields.short_description.length < 25 ||
      fields.short_description.length > 64)
  )
    errors.push("interface.short_description must be 25-64 characters");
  if (
    typeof fields.default_prompt === "string" &&
    !new RegExp(`\\$${skillName}(?![a-z0-9-])`).test(fields.default_prompt)
  )
    errors.push(`interface.default_prompt must include $${skillName}`);
  return errors;
}

export function discoverSkills(skillsRoot) {
  if (!fs.existsSync(skillsRoot)) return [];
  return fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => {
      const directory = path.join(skillsRoot, entry.name);
      return {
        name: entry.name,
        directory,
        file: path.join(directory, "SKILL.md"),
      };
    })
    .filter((skill) => fs.existsSync(skill.file))
    .sort((left, right) => left.name.localeCompare(right.name));
}

export function validateSkills(skillsRoot) {
  const skills = discoverSkills(skillsRoot);
  if (!skills.length)
    return [
      {
        skill: "(library)",
        file: skillsRoot,
        severity: "error",
        category: "packaging",
        message: "no skill folders found",
      },
    ];
  return skills.flatMap((skill) => {
    const content = fs.readFileSync(skill.file, "utf8");
    const tag =
      (severity, category, file = skill.file) =>
      (message) => ({
        skill: skill.name,
        file,
        message,
        severity,
        category: message.startsWith("Claude compatibility:")
          ? "host"
          : category,
      });
    const issues = validateSkillContent(content, skill.name).map(
      tag("error", "format"),
    );
    if (parseFrontmatter(content).error) return issues;
    for (const file of [
      skill.file,
      ...walkMarkdown(path.join(skill.directory, "references")),
    ]) {
      issues.push(
        ...validateSkillLinks(
          fs.readFileSync(file, "utf8"),
          path.dirname(file),
          skill.directory,
        ).map(tag("error", "packaging", file)),
      );
    }
    issues.push(
      ...lintSkillContent(content).map((message) =>
        tag(
          "warning",
          /host-specific|\$<digit>/.test(message) ? "host" : "editorial",
        )(message),
      ),
    );
    issues.push(
      ...lintReferenceFiles(skill.directory).map(tag("warning", "editorial")),
    );
    const metadataFile = path.join(skill.directory, "agents", "openai.yaml");
    if (fs.existsSync(metadataFile))
      issues.push(
        ...validateOpenAiMetadata(
          fs.readFileSync(metadataFile, "utf8"),
          skill.name,
        ).map(tag("error", "host", metadataFile)),
      );
    return issues;
  });
}

export function validationErrors(skillsRoot) {
  return validateSkills(skillsRoot).filter(
    (issue) => issue.severity === "error",
  );
}
