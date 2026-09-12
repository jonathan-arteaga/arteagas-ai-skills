import fs from "node:fs";
import path from "node:path";

// Limits from the Agent Skills specification (agentskills.io/specification) and
// the Anthropic skill-authoring guidance. Errors block; warnings report.
export const NAME_MAX_LENGTH = 64;
export const DESCRIPTION_MAX_LENGTH = 1024;
export const COMPATIBILITY_MAX_LENGTH = 500;
export const BODY_LINE_LIMIT = 500;
export const REFERENCE_TOC_LINE_LIMIT = 100;
export const RESERVED_NAME_WORDS = ["anthropic", "claude"];

// Tokens that tie a SKILL.md body to one host. A portable skill states its
// needs in `compatibility` and refers to scripts by paths relative to the
// skill root instead.
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

export function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    return { data: null, body: content, error: "missing YAML frontmatter" };
  }

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#") || /^\s/.test(line)) {
      continue;
    }

    const separator = line.indexOf(":");
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim();
    const rawValue = line.slice(separator + 1).trim();
    const value =
      (rawValue.startsWith('"') && rawValue.endsWith('"')) ||
      (rawValue.startsWith("'") && rawValue.endsWith("'"))
        ? rawValue.slice(1, -1)
        : rawValue;
    data[key] = value;
  }

  return {
    data,
    body: content.slice(match[0].length),
    error: null,
  };
}

function hasXmlTag(value) {
  return /<[a-zA-Z/][^>]*>/.test(value);
}

export function validateSkillContent(content, folderName) {
  const errors = [];
  const parsed = parseFrontmatter(content);
  if (parsed.error || !parsed.data) {
    return [parsed.error ?? "could not parse frontmatter"];
  }

  const { name, description, compatibility } = parsed.data;
  if (!name) errors.push("missing required field: name");
  if (!description) errors.push("missing required field: description");

  if (name && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
    errors.push("name must use lowercase letters, numbers, and single hyphens");
  }
  if (name && name !== folderName) {
    errors.push(`name "${name}" must match folder "${folderName}"`);
  }
  if (name && name.length > NAME_MAX_LENGTH) {
    errors.push(`name must be ${NAME_MAX_LENGTH} characters or fewer`);
  }
  for (const word of RESERVED_NAME_WORDS) {
    if (name && name.includes(word)) {
      errors.push(`name must not contain the reserved word "${word}"`);
    }
  }
  if (description && description.length > DESCRIPTION_MAX_LENGTH) {
    errors.push(
      `description must be ${DESCRIPTION_MAX_LENGTH} characters or fewer`,
    );
  }
  if (description && hasXmlTag(description)) {
    errors.push("description must not contain XML tags");
  }
  if (compatibility !== undefined && compatibility.length === 0) {
    errors.push("compatibility must be non-empty when present");
  }
  if (compatibility && compatibility.length > COMPATIBILITY_MAX_LENGTH) {
    errors.push(
      `compatibility must be ${COMPATIBILITY_MAX_LENGTH} characters or fewer`,
    );
  }
  if (!parsed.body.trim()) errors.push("instructions are empty");

  const draftMarkers = ["TODO", "TBD", "{{", "}}", "lorem ipsum"];
  for (const marker of draftMarkers) {
    if (content.toLocaleLowerCase("en-US").includes(marker.toLowerCase())) {
      errors.push(`contains draft marker: ${marker}`);
    }
  }

  return errors;
}

function markdownLinkTargets(content) {
  const targets = [];
  const pattern = /\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  for (const match of content.matchAll(pattern)) {
    let target = match[1].trim();
    if (target.startsWith("<") && target.endsWith(">")) {
      target = target.slice(1, -1);
    }
    if (/^(https?:|mailto:|#)/i.test(target)) continue;
    if (/[<>{}]/.test(target)) continue; // placeholder like references/<name>.md
    targets.push(target.split("#")[0]);
  }
  return [...new Set(targets)].filter(Boolean);
}

export function validateSkillLinks(content, skillDirectory) {
  const errors = [];
  for (const target of markdownLinkTargets(content)) {
    const resolved = path.resolve(skillDirectory, target);
    if (!resolved.startsWith(path.resolve(skillDirectory))) {
      errors.push(`link escapes the skill folder: ${target}`);
      continue;
    }
    if (!fs.existsSync(resolved)) {
      errors.push(`broken relative link: ${target}`);
    }
  }
  return errors;
}

export function lintSkillContent(content) {
  const warnings = [];
  const parsed = parseFrontmatter(content);
  if (parsed.error || !parsed.data) return warnings;

  const bodyLines = parsed.body.replace(/\s+$/, "").split(/\r?\n/);
  if (bodyLines.length > BODY_LINE_LIMIT) {
    warnings.push(
      `SKILL.md body is ${bodyLines.length} lines; keep it under ${BODY_LINE_LIMIT} and move detail into references/`,
    );
  }

  const lines = content.split(/\r?\n/);
  for (const { label, pattern } of HOST_SPECIFIC_PATTERNS) {
    const index = lines.findIndex((line) => pattern.test(line));
    if (index >= 0) {
      warnings.push(
        `host-specific token ${label} at line ${index + 1}; declare needs in compatibility and use skill-relative paths`,
      );
    }
  }

  const positional = lines.findIndex((line) => /(^|[^\\$])\$\d/.test(line));
  if (positional >= 0) {
    warnings.push(
      `"$<digit>" at line ${positional + 1} may be read as a positional argument by some hosts; escape it as \\$`,
    );
  }

  return warnings;
}

function walkMarkdown(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const full = path.join(directory, entry.name);
      if (entry.isDirectory()) return walkMarkdown(full);
      return entry.name.endsWith(".md") ? [full] : [];
    })
    .sort();
}

export const REFERENCE_TOC_MIN_HEADINGS = 3;

function sectionHeadingCount(content) {
  let fenced = false;
  let count = 0;
  for (const line of content.split(/\r?\n/)) {
    if (line.startsWith("```")) fenced = !fenced;
    else if (!fenced && /^#{2,3} /.test(line)) count += 1;
  }
  return count;
}

// A long reference file with several sections should open with a contents
// list so a partial read still shows its scope. Single-section files are
// exempt: a one-entry list adds nothing.
export function lintReferenceFiles(skillDirectory) {
  const warnings = [];
  for (const file of walkMarkdown(path.join(skillDirectory, "references"))) {
    const content = fs.readFileSync(file, "utf8");
    const lineCount = content.replace(/\s+$/, "").split(/\r?\n/).length;
    if (lineCount <= REFERENCE_TOC_LINE_LIMIT) continue;
    if (sectionHeadingCount(content) < REFERENCE_TOC_MIN_HEADINGS) continue;
    if (/^#{1,3} +(contents|table of contents)\b/im.test(content)) continue;
    warnings.push(
      `${path.relative(skillDirectory, file)} is ${lineCount} lines without a "## Contents" list`,
    );
  }
  return warnings;
}

export function validateOpenAiMetadata(content, skillName) {
  const errors = [];
  const displayName = content.match(/^\s*display_name:\s*"([^"]+)"\s*$/m)?.[1];
  const shortDescription = content.match(
    /^\s*short_description:\s*"([^"]+)"\s*$/m,
  )?.[1];
  const defaultPrompt = content.match(
    /^\s*default_prompt:\s*"([^"]+)"\s*$/m,
  )?.[1];

  if (!/^interface:\s*$/m.test(content)) {
    errors.push("missing interface block");
  }
  if (!displayName) {
    errors.push("missing quoted interface.display_name");
  }
  if (!shortDescription) {
    errors.push("missing quoted interface.short_description");
  } else if (
    shortDescription.length < 25 ||
    shortDescription.length > 64
  ) {
    errors.push("interface.short_description must be 25-64 characters");
  }
  if (!defaultPrompt) {
    errors.push("missing quoted interface.default_prompt");
  } else if (!defaultPrompt.includes(`$${skillName}`)) {
    errors.push(`interface.default_prompt must include $${skillName}`);
  }

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

// Returns every issue as { skill, file, message, severity }. Errors are spec
// violations; warnings are portability and progressive-disclosure advice.
export function validateSkills(skillsRoot) {
  return discoverSkills(skillsRoot).flatMap((skill) => {
    const content = fs.readFileSync(skill.file, "utf8");
    const tag = (severity, file) => (message) => ({
      skill: skill.name,
      file,
      message,
      severity,
    });

    const contentErrors = validateSkillContent(content, skill.name);
    const parsed = parseFrontmatter(content);
    if (parsed.error) {
      return contentErrors.map(tag("error", skill.file));
    }

    const skillIssues = [
      ...contentErrors,
      ...validateSkillLinks(content, skill.directory),
    ].map(tag("error", skill.file));
    const skillWarnings = [
      ...lintSkillContent(content),
      ...lintReferenceFiles(skill.directory),
    ].map(tag("warning", skill.file));

    const metadataFile = path.join(skill.directory, "agents", "openai.yaml");
    const metadataIssues = fs.existsSync(metadataFile)
      ? validateOpenAiMetadata(
          fs.readFileSync(metadataFile, "utf8"),
          skill.name,
        ).map(tag("error", metadataFile))
      : [];

    return [...skillIssues, ...metadataIssues, ...skillWarnings];
  });
}

export function validationErrors(skillsRoot) {
  return validateSkills(skillsRoot).filter((issue) => issue.severity === "error");
}
