import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function readText(filePath) {
  return readFileSync(filePath, "utf8");
}

function listSkillDirs(rootDir) {
  const skillsDir = path.join(rootDir, "skills");
  return readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function parseSkillName(skillFile) {
  const match = readText(skillFile).match(/^name:\s*(.+)$/m);
  return match ? match[1].trim() : null;
}

function parseReadmeSkills(readmePath) {
  const lines = readText(readmePath).split(/\r?\n/);
  const start = lines.indexOf("## Skills");
  if (start === -1) return [];

  const skills = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    if (!line.startsWith("- ")) break;
    const match = line.match(/`([^`]+)`/);
    if (match) skills.push(match[1]);
  }
  return skills;
}

function findAgentPrompts(rootDir) {
  const prompts = [];
  for (const skillDir of listSkillDirs(rootDir)) {
    const agentPath = path.join(rootDir, "skills", skillDir, "agents", "openai.yaml");
    try {
      statSync(agentPath);
    } catch {
      continue;
    }
    const text = readText(agentPath);
    const matches = [...text.matchAll(/\$([A-Za-z0-9_-]+)/g)].map((match) => match[1]);
    prompts.push({ agentPath, references: matches });
  }
  return prompts;
}

export function validateRepo(rootDir) {
  const issues = [];
  const skillDirs = listSkillDirs(rootDir);
  const readmeSkills = parseReadmeSkills(path.join(rootDir, "README.md"));
  const skillSet = new Set(skillDirs);

  for (const skillDir of skillDirs) {
    const skillFile = path.join(rootDir, "skills", skillDir, "SKILL.md");
    try {
      statSync(skillFile);
    } catch {
      issues.push(`Missing SKILL.md for "${skillDir}"`);
      continue;
    }

    const name = parseSkillName(skillFile);
    if (name !== skillDir) {
      issues.push(`SKILL.md name mismatch in "${skillDir}": expected "${skillDir}", got "${name ?? "<missing>"}"`);
    }
  }

  for (const skillDir of skillDirs) {
    if (!readmeSkills.includes(skillDir)) {
      issues.push(`README is missing skill "${skillDir}"`);
    }
  }

  for (const skillName of readmeSkills) {
    if (!skillSet.has(skillName)) {
      issues.push(`README lists unknown skill "${skillName}"`);
    }
  }

  for (const { agentPath, references } of findAgentPrompts(rootDir)) {
    for (const ref of references) {
      if (ref.startsWith("scalpel-") && !skillSet.has(ref)) {
        issues.push(`Agent prompt ${path.relative(rootDir, agentPath)} references unknown skill "$${ref}"`);
      }
    }
  }

  return issues;
}

function main() {
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const issues = validateRepo(rootDir);

  if (issues.length > 0) {
    for (const issue of issues) {
      process.stderr.write(`${issue}\n`);
    }
    process.exitCode = 1;
    return;
  }

  process.stdout.write("Scalpel skill suite is consistent.\n");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
