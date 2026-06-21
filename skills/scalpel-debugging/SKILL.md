---
name: scalpel-debugging
description: Use when tests, CI, or runtime behavior fail and the next step is root-cause analysis before changing the plan.
---

# Scalpel Debugging

Trace the failure to the smallest reproducible cause.

## Loop

1. Reproduce.
2. Isolate the smallest failing surface.
3. Inspect logs, traces, and data.
4. Form one hypothesis.
5. Apply the smallest fix.
6. Re-run the failing check.

## Rules

- Stay on the failure until you can explain it.
- Do not broaden into redesign while the root cause is still unclear.
- If the evidence points to a boundary problem, hand back to planning or review.
