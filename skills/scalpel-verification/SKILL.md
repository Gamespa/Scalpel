---
name: scalpel-verification
description: Use when work is nearly done and you need to prove behavior, tests, or acceptance before calling it finished.
---

# Scalpel Verification

Do not call it done without proof.

## Verify

- Targeted tests or checks.
- Behavior against the acceptance criteria.
- Nearby regressions or edge cases.
- Any manual check that matters for the task.

## Report

State exactly what you checked, what passed, and what still carries risk.

## Rules

- Verification is the last gate, not a replacement for implementation.
- If the check fails, return to debugging or planning.
- After verification, hand off to the user's normal delivery flow: commit, PR, or archive as appropriate.
- Do not call the task done until the checks are fresh and the output is clean.
