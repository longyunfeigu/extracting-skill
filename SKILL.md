---
name: extracting-skill-patterns
description: Use when studying, reverse-engineering, comparing, reviewing, or learning from AI skill packages, SKILL.md files, Claude/Codex skills, prompt workflows, or agent playbooks; use when the user wants reusable skill design patterns, a keep/cut review, Markdown report, structured pattern notes, or multi-page web handbook.
---

# Extracting Skill Patterns

## Purpose

Turn a skill package into useful creator notes. Explain how the skill changes an
agent's behavior, what bad output it prevents, which parts are worth copying,
and which parts are too heavy for the job.

Default to the smallest useful output. A web handbook is an output mode, not the
identity of this skill.

## Start Here

1. Map the source package first.
2. Choose the output mode from the user's request:
   - **Review / keep-cut advice:** write a direct Markdown review.
   - **Pattern extraction:** write human notes and optional JSON/YAML.
   - **Web handbook / 解剖手册:** read `references/handbook-spec.md`, then
     `references/web-production-flow.md`.
3. Load only the companion reference needed for the current section. Examples
   are calibration only; references and source files are the contract.

## Workflow

### 1. Map the Package

Treat the input as a single `SKILL.md`, a skill directory, or a folder of skills.

- Find every `SKILL.md`.
- Note `references/`, `scripts/`, `assets/`, `examples/`, `tests/`, and metadata.
- Read the entry `SKILL.md` first.
- Read referenced files only when they explain the skill's design.
- Inspect scripts to see which fragile jobs they take away from the agent.

For a batch, analyze representative skills first, then scan the rest for
repeated structures.

### 2. Find the Real Task Pain

Before naming mechanisms, stand outside the skill:

- What does a normal user think the task is about?
- Where does a default agent usually drift, fake progress, or skip checks?
- What visible symptom appears first?
- Which file, rule, script, checkpoint, or example catches that failure?

For web handbooks, write the full `ordinary-view pain scan` described in
`references/handbook-spec.md`. For shorter reviews, fold the same thinking into
the findings.

### 3. Read Like a Skill Designer

Preserve three layers:

1. **How it runs:** phases, gates, loops, handoffs, validation.
2. **How it is packaged:** entry file, references, scripts, assets, examples,
   tests, generated outputs.
3. **What design moves it contains:** reusable patterns, costs, and cases where
   they are too heavy.

Answer in plain language:

- What bad AI output does this prevent?
- What does it force the agent to do before answering?
- What shortcuts does it block?
- Which terms need explanation before they are useful?
- Which moves are reusable skill patterns?
- Which moves are platform workarounds or one-off project scars?

### 4. Choose the Output Shape

**Review / keep-cut advice**

Lead with findings. Group content as:

- what is working;
- what is too heavy, duplicated, or stale;
- what to delete, merge, or move to assets/scripts;
- what to keep as non-negotiable behavior control.

**Pattern extraction**

Write reusable pattern cards. Each card says:

- bad result prevented;
- when to use it;
- how it works;
- where it usually lives in the package;
- cost and counter-case;
- example from the source skill.

Use `references/cards-patterns.md` when writing many design-choice or pattern
cards.

**Web handbook**

Use one running example through the whole handbook. Follow:

1. `references/handbook-spec.md` for the content contract.
2. `references/web-production-flow.md` for `generation/<skill-slug>/`,
   `handbook-brief.md`, page packets, scaffold, and final checks.
3. `references/stage-writing.md`, `references/cards-patterns.md`,
   `references/visuals-and-quality.md`, and `references/voice-style-gate.md`
   only for the sections that need them.

### 5. Quality Check

Before finishing, check:

- Did the answer explain the behavior change, not just summarize files?
- Can the user steal at least three concrete moves?
- Did you preserve both workflow and package structure?
- Did every pattern say when it is useful and when it is too heavy?
- Did you avoid turning one project's generated output into the rule?

## Non-Negotiables

- Start from the bad AI behavior the skill is trying to prevent.
- Keep `SKILL.md` lean; move detailed writing rules, templates, and visual
  implementation notes to references or assets.
- Do not rely on examples as specification.
- Do not treat generated `generation/` output as reusable skill material.
- Use scripts/assets for repeatable mechanics instead of re-explaining them in
  prose.
- If producing a web handbook, use code-native diagrams for exact relationships
  and verify referenced SVG files exist.

## Resources

- `references/handbook-spec.md` — content contract for multi-page handbooks and
  the single source for the ordinary-view pain scan.
- `references/web-production-flow.md` — concise web production flow, scaffold,
  page packets, and verification.
- `references/stage-writing.md` — walkthrough-specific writing rules.
- `references/cards-patterns.md` — design-choice and pattern-card rules.
- `references/visuals-and-quality.md` — diagram rules and final quality checks.
- `references/voice-style-gate.md` — voice gate rules.
- `references/voice-gate-examples.md` — reviewer examples for common voice
  failures.
- `references/web-app-visuals.md` — short visual constraints for the static web
  template.
- `scripts/scaffold-web-app.sh` — creates the static handbook skeleton from
  `assets/web-app-template/`.
