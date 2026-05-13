---
name: extracting-skill-patterns
description: Use when studying or reverse-engineering an AI skill package (SKILL.md, Claude/Codex skills, prompt workflows, agent playbooks) and the user wants a Skill X-Ray, 解剖, manual, or documentation artifact explaining how the skill changes an AI's behavior. Defaults to a Recommended Trace X-Ray with an Intervention Map; upgrade to a multi-page web handbook only when requested.
---

# Extracting Skill Patterns

## Purpose

Turn a skill package into a **Skill X-Ray**: a compact, evidence-backed view of
how the skill changes an AI's behavior on one real representative task.

The default output is not a full handbook. First follow the skill's recommended
path as far as it is safe and feasible, log automatic choices, capture the trace
mode honestly, compare default AI instincts against skill interventions, and
show whether the added process is worth it.

A multi-page web handbook is an upgrade path, not the default.

## Start Here

1. Read `references/xray-flow.md` first. It defines the default Recommended
   Trace X-Ray workflow and output shape.
2. Read `references/intervention-map.md` before writing analysis. The
   Intervention Map is the central artifact: default AI instinct on the left,
   skill intervention on the right.
3. Load `references/handbook-spec.md` and `references/web-production-flow.md`
   only when the user asks to upgrade the X-Ray into a full handbook or web app.
4. Load only the reference needed for the current step. Do not read every
   reference or copy from examples by default.

## Default Policy

Choose the recommended path and continue. Do not stop for user confirmation
when the skill gives a recommended/default option and the action is safe to take.

Log every automatic choice in an Auto Decision Log:

- decision being made;
- chosen recommended option;
- why it was chosen;
- whether the user was asked;
- condition that would have required asking.

Ask the user only when:

- no recommended/default option exists;
- the action is destructive, external, irreversible, high-cost, or high-risk;
- the analyzed skill explicitly requires user confirmation and provides no
  recommended path;
- the user asked to review before continuing.

Separate **auto choices** from **hard checkpoints**:

- Auto choice: the skill gives a recommended/default path. Take it and log it.
- Hard checkpoint: the skill requires human review, subjective selection, or a
  stop condition with no default. Mark where the run would pause.
- High-cost recommended path: do not silently execute expensive external work
  such as broad web research, downloads, purchases, account actions, or large
  agent fan-out. Use source-grounded or delegated trace, or ask to run a live
  trace.

## Workflow

### 1. Map the source package

Treat the input as a single `SKILL.md`, a skill directory, or a folder of
skills. Build a package map before interpreting the skill:

- find every `SKILL.md`;
- note `references/`, `scripts/`, `assets/`, `examples/`, `tests/`, and metadata
  files;
- read the entry `SKILL.md` first;
- read directly referenced files when they explain the skill's behavior;
- inspect scripts to see which fragile jobs they take away from the agent.

For a batch, analyze representative skills first, then scan the rest for
repeated structures.

### 2. Pick one real task

Choose one small representative user request that can show the skill's behavior.
If the user provided a request, use that. Otherwise infer a typical request from
the skill's description and examples, and state that it is inferred.

This task must be concrete enough to produce trace material:

- prompts or inputs;
- files read;
- decisions made;
- intermediate artifacts;
- script calls;
- final output or output sketch.

### 3. Infer the recommended path

Before running or simulating the task, identify decision points:

- what the decision is;
- which option is recommended/default;
- why that option fits this run;
- when the agent would have to ask the user instead.

Then proceed with the recommended option and record it in the Auto Decision Log.
Also build a short Checkpoint Map for any place where the analyzed skill itself
would require user confirmation or manual review.

### 4. Capture the trace

Run the task through the skill's recommended path when safe and feasible.
Capture:

- source files and references read;
- files or references skipped and why;
- scripts or tools called;
- intermediate artifacts created;
- automatic recommended choices;
- places where the skill prevents a shortcut;
- final output or output sketch.

Start the trace with a trace type:

- **live-run trace**: actually ran the skill path.
- **source-grounded trace**: followed source instructions without executing
  high-cost or external steps.
- **delegated trace**: user explicitly requested subagents/delegation and
  independent agents inspected disjoint surfaces such as workflow, assets, and
  interventions.
- **simulated trace**: inferred from source because execution was not possible.
- **baseline trace**: ran or inferred a no-skill comparison.

If real execution is not possible, produce a source-grounded or simulated trace
and mark every simulated claim as inference. Do not present inferred behavior as
observed behavior. If using delegated trace, say what each delegate inspected
and do not present delegate findings as the analyzed skill's own runtime.

### 5. Build the Intervention Map

Create the Intervention Map before writing the X-Ray. For each important change,
pair:

```text
AI default instinct -> Skill intervention
```

Use `references/intervention-map.md` for the row shape. Each row needs evidence:
source, trace, diff, or inference.

### 6. Produce the Skill X-Ray

Write the default output as a compact X-Ray:

1. **What changed** — the skill's behavior change in 3-5 bullets.
2. **Real task used** — the representative request and why it was chosen.
3. **Recommended path** — steps followed and choices auto-selected.
4. **Auto Decision Log + Checkpoint Map** — recommended choices made without
   asking, plus places the skill would require human confirmation.
5. **Trace** — trace type and observed, source-grounded, delegated, or simulated
   execution path.
6. **Baseline diff** — what a default AI would likely do without the skill vs
   what the skill made it do.
7. **Intervention Map** — default instincts paired with interventions.
8. **Evidence table** — source / trace / diff / inference for major claims.
9. **Friction score** — what complexity the skill adds and whether it is worth
   it.
10. **Upgrade options** — full handbook, branch comparison, eval proof, pattern
   extraction.

### 7. Upgrade only when requested

Offer upgrades after the X-Ray. Do not silently expand into a large artifact.

- **Full handbook / web app**: use `references/handbook-spec.md`,
  `references/web-production-flow.md`, `references/web-app-structure.md`, and
  `references/web-app-visuals.md`.
- **Branch comparison**: compare recommended, fast, conservative, or
  high-quality paths.
- **Eval proof**: run 3-5 tasks with and without the skill and summarize pass
  rates, failures, cost, and residual risk.
- **Pattern extraction**: use `references/cards-patterns.md` to turn confirmed
  interventions into reusable pattern cards.

## Non-Negotiables

- Default to Skill X-Ray, not a full handbook.
- Choose recommended/default options and continue unless an ask condition fires.
- Log automatic choices instead of hiding them.
- Distinguish automatic recommended choices from hard human checkpoints.
- Label the trace type before making behavior claims.
- Use one real representative task.
- Every major claim must be tagged as source, trace, diff, or inference.
- Every major behavior claim must connect to an Intervention Map row.
- If subagents/delegates are used, scope them to independent read-only surfaces
  and label their findings as delegated trace.
- Do not rely on examples as specification. References define rules; samples
  are only optional calibration material.
- Avoid academic name-dropping, decorative metaphors, fake jargon, and
  English-Chinese mashups unless quoting source file names or source terms.

## Resources

- `references/xray-flow.md` — required first read; default Recommended Trace
  X-Ray workflow, Auto Decision Log, evidence tags, baseline diff, friction
  score, and upgrade ladder.
- `references/intervention-map.md` — required for analysis; pairs default AI
  instincts with concrete skill interventions and evidence.
- `references/handbook-spec.md` — optional full-handbook upgrade contract.
- `references/web-production-flow.md` — optional web handbook production flow:
  scaffold, page packets, page gates, editor pass, and Markdown export.
- `references/web-app-structure.md` — optional multi-page web app structure and
  page-level orientation requirements.
- `references/web-app-visuals.md` — optional visual rules for the rendered web
  app: typography, layout, component shapes, and CSS constraints.
- `references/stage-writing.md` — optional walkthrough writing rules for full
  handbook mode.
- `references/cards-patterns.md` — design-choice and pattern-card rules for
  full handbook or pattern extraction upgrades.
- `references/visuals-and-quality.md` — diagram/image rules and final quality
  checks for visual outputs.
- `references/voice-style-gate.md` — style gate for polished prose outputs.
- `references/voice-gate-examples.md` — concrete reviewer examples for common
  voice-gate failures.
- `scripts/scaffold-web-app.sh` — creates the static `web-app/` skeleton from
  `assets/web-app-template/` when the user requests a web handbook.
- `assets/web-app-template/` — fixed page shells, renderer, CSS, starter
  `data.js`, and empty `assets/diagrams/` directory.
