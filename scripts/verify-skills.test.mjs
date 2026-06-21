import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { validateRepo } from "./verify-skills.mjs";

function writeFile(root, relativePath, contents) {
  const filePath = path.join(root, relativePath);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, contents);
}

function writeSkill(root, name, skillName = name, agentPrompt = `Use $${name}.`) {
  writeFile(
    root,
    path.join("skills", name, "SKILL.md"),
    `---\nname: ${skillName}\ndescription: Example skill.\n---\n\n# ${name}\n`,
  );
  writeFile(
    root,
    path.join("skills", name, "agents", "openai.yaml"),
    `interface:\n  default_prompt: "${agentPrompt}"\n`,
  );
}

function makeRepo() {
  return mkdtempSync(path.join(tmpdir(), "scalpel-skills-"));
}

test("accepts a consistent skill suite", () => {
  const root = makeRepo();
  writeSkill(root, "scalpel-execution");
  writeSkill(root, "scalpel-review");
  writeFile(
    root,
    "README.md",
    "# Scalpel\n\n## Skills\n\n- `scalpel-execution`\n- `scalpel-review`\n",
  );

  assert.deepEqual(validateRepo(root), []);
});

test("reports SKILL.md names that do not match their directory", () => {
  const root = makeRepo();
  writeSkill(root, "scalpel-execution", "scalpel-runner");
  writeFile(root, "README.md", "# Scalpel\n\n## Skills\n\n- `scalpel-execution`\n");

  assert.match(validateRepo(root).join("\n"), /expected "scalpel-execution"/);
});

test("reports README skill list drift", () => {
  const root = makeRepo();
  writeSkill(root, "scalpel-execution");
  writeFile(root, "README.md", "# Scalpel\n\n## Skills\n\n- `scalpel-review`\n");

  const issues = validateRepo(root).join("\n");
  assert.match(issues, /README is missing skill "scalpel-execution"/);
  assert.match(issues, /README lists unknown skill "scalpel-review"/);
});

test("reports agent prompts that reference missing scalpel skills", () => {
  const root = makeRepo();
  writeSkill(root, "scalpel-execution", "scalpel-execution", "Use $scalpel-missing.");
  writeFile(root, "README.md", "# Scalpel\n\n## Skills\n\n- `scalpel-execution`\n");

  assert.match(validateRepo(root).join("\n"), /unknown skill "\$scalpel-missing"/);
});

test("prints a success message when run as a CLI", () => {
  const scriptPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "verify-skills.mjs");
  const result = spawnSync(process.execPath, [scriptPath], { encoding: "utf8" });

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Scalpel skill suite is consistent\./);
});
