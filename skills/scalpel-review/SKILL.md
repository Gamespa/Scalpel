---
name: scalpel-review
description: Use when reviewing uncommitted changes, design docs, or merges for correctness, risk, boundary breaks, or missing tests.
---

# Scalpel Review

Find the problems first.

## Output

Report findings in this order:

1. Blockers
2. Major risks
3. Minor issues
4. Residual risk or assumptions

For each finding, include:

- severity
- file or artifact
- why it matters
- concrete fix direction

## Check

- Correctness and regressions.
- Boundary and scope creep.
- Security, credentials, and authority.
- Tests and acceptance gaps.
- Documentation claims that overpromise.

## Rules

- Do not edit files.
- If nothing is wrong, say so clearly and note the remaining risk surface.
