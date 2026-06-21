# Scalpel

Lean Scalpel skill suite source.

## Installation

- Install the whole `scalpel-*` bundle together when you want the routing flow.
- The suite is self-contained; it does not depend on any external skills being present.
- If you install only a subset, use those skills directly instead of relying on missing routes.

## Entry Point

- Start with `scalpel-risk-router` for new work.
- Route into `scalpel-planning`, `scalpel-execution`, `scalpel-review`, `scalpel-debugging`, or `scalpel-verification` as needed.

## Skills

- `scalpel-risk-router`
- `scalpel-planning`
- `scalpel-execution`
- `scalpel-review`
- `scalpel-debugging`
- `scalpel-verification`

## Workflow

- `scalpel-risk-router` chooses the lightest skill that still protects the outcome.
- `scalpel-execution` handles small, scoped implementation work.
- `scalpel-planning` handles open-ended or higher-risk work that needs a short spec first.
- `scalpel-review` handles review of diffs, docs, and merges.
- `scalpel-debugging` handles failures and root-cause analysis.
- `scalpel-verification` handles the last proof step before completion.

## Completion

- Treat `scalpel-verification` as the final gate before claiming a task is done.
- Report what was checked, what passed, and any remaining risk before you finish.

## Validation

Run the suite consistency check after adding, renaming, or deleting skills:

```sh
node scripts/verify-skills.mjs
```
