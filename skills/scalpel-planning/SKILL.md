---
name: scalpel-planning
description: Use when a task is open-ended, cross-module, or high-risk enough to need a one-page spec before execution, or when the user asks for a plan or design.
---

# Scalpel Planning

Turn uncertainty into a decision-complete one-page spec.

## Gather

- Goal and audience.
- In scope and out of scope.
- Constraints, non-goals, and hard risks.
- Acceptance criteria and test signals.

## Write

Use four sections only:

1. Summary
2. Key Changes
3. Test Plan
4. Assumptions

## Lenses

- PM: why now and for whom?
- Architect: what boundary changes?
- QA: what proves it works?
- Reviewer: what could break?

## Rules

- Ask only high-impact questions that cannot be inferred from context.
- Keep the spec short enough to hand to an implementer directly.
- If the work is still small and local, route back to `scalpel-execution`.
