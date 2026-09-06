import fs from "node:fs";
import path from "node:path";

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

export function validateSkillContent(content, folderName) {
  const errors = [];
  const parsed = parseFrontmatter(content);
  if (parsed.error || !parsed.data) {
    return [parsed.error ?? "could not parse frontmatter"];
  }

  const { name, description } = parsed.data;
  if (!name) errors.push("missing required field: name");
  if (!description) errors.push("missing required field: description");

  if (name && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
    errors.push("name must use lowercase letters, numbers, and single hyphens");
  }
  if (name && name !== folderName) {
    errors.push(`name "${name}" must match folder "${folderName}"`);
  }
  if (name && name.length > 64) {
    errors.push("name must be 64 characters or fewer");
  }
  if (description && description.length > 1024) {
    errors.push("description must be 1024 characters or fewer");
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

export function validateSkills(skillsRoot) {
  return discoverSkills(skillsRoot).flatMap((skill) => {
    const content = fs.readFileSync(skill.file, "utf8");
    const skillIssues = validateSkillContent(content, skill.name).map((message) => ({
      skill: skill.name,
      file: skill.file,
      message,
    }));
    const metadataFile = path.join(skill.directory, "agents", "openai.yaml");
    const metadataIssues = fs.existsSync(metadataFile)
      ? validateOpenAiMetadata(
          fs.readFileSync(metadataFile, "utf8"),
          skill.name,
        ).map((message) => ({
          skill: skill.name,
          file: metadataFile,
          message,
        }))
      : [];

    return [...skillIssues, ...metadataIssues];
  });
}
