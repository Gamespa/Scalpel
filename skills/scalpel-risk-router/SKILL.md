---
name: scalpel-risk-router
description: Use when a task may need planning, review, debugging, or verification, or when you need to choose whether to stay lightweight or escalate.
---

# Scalpel Risk Router

Route each task to the smallest skill that still protects the outcome.

## Triage

- Use `scalpel-execution` for small, local, low-risk implementation.
- Use `scalpel-planning` for open-ended, cross-module, or high-risk work.
- Use `scalpel-review` for diffs, docs, or merges that need adversarial review.
- Use `scalpel-debugging` when tests, CI, or runtime behavior fail.
- Use `scalpel-verification` when work is nearly done and needs proof.

## Escalate

Escalate when the task touches public APIs, schema, permissions, secrets, cross-module boundaries, CI, merges to main, or long-running work.

## Default Rule

If the task stays small and local, execute directly. If scope grows, route back through this skill again.
