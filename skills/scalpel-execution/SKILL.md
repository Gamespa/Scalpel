---
name: scalpel-execution
description: Use when a task is already scoped, low-risk, and should be implemented quickly with minimal overhead.
---

# Scalpel Execution

Make the smallest change that satisfies the scoped task.

## Do

- Follow the repo's existing patterns.
- Edit only the owned files.
- Keep tests targeted.
- Stop and re-route if the task grows into a boundary change.
- Before editing, check `git status` and do not overwrite unrelated user changes.
- For destructive moves or deletes, prove the exact target set first and keep the command path-literal.
- For behavior changes, use TDD; for docs, renames, or metadata-only changes, verify with targeted checks.

## Do Not

- Draft a full spec for a tiny fix.
- Refactor unrelated code.
- Add new abstractions unless they remove real complexity.

## Escalate

Hand the task back to `scalpel-risk-router` if it touches APIs, schema, permissions, secrets, cross-module drift, or CI risk.
