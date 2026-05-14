# 女娲造人 Skill 解剖手册 brief

## Source

- Source package: `/home/guwanhua/Desktop/git/nuwa-skill`
- Entry skill: `/home/guwanhua/Desktop/git/nuwa-skill/SKILL.md`
- Source skill name: `huashu-nuwa`
- Handbook output: `generation/huashu-nuwa/`

## Package map

| Area | What it owns | Why it matters |
| --- | --- | --- |
| `SKILL.md` | Entry routing, phases, checkpoints, update path, source rules | It is the behavior contract for the agent running Nuwa. |
| `references/extraction-framework.md` | Mental model filtering, expression DNA, contradiction handling, self-check | It explains how raw research becomes usable judgment. |
| `references/skill-template.md` | Target person-skill structure | It keeps generated skills complete and installable. |
| `scripts/` | Subtitle conversion, subtitle download, research merge, quality checks | It takes fragile counting and parsing steps away from prose. |
| `examples/` | Finished person and topic skills | It shows the output shape and where the method has already been used. |

## Ordinary-view pain scan

| Ordinary assumption | Real friction | First visible symptom | Skill mechanism | Where it appears |
| --- | --- | --- | --- | --- |
| Making a person skill is mostly voice imitation. | The hard part is extracting a reusable way of judging new problems. | The answer sounds like a quote collage. | Mental models, heuristics, expression DNA, anti-patterns, honest boundaries. | Overview, Walkthrough stage 6, `references/extraction-framework.md` |
| More sources automatically mean better research. | Unranked sources mix primary material with summaries and rumors. | The skill cites weak material with the same confidence as original work. | Source quality ladder, blacklist, local-primary-material mode. | Walkthrough stages 3-4, `SKILL.md` Phase 1 |
| Six research directions can be summarized after the fact. | Without saved files, research disappears and cannot be reviewed. | The agent says it researched but cannot show evidence. | Required `references/research/01-06*.md` files. | Walkthrough stage 3, File map |
| After research, the agent can write the final skill immediately. | Synthesis is subjective and can choose the wrong core models. | A long `SKILL.md` is polished but off-target. | Research checkpoint and synthesis checkpoint before construction. | Walkthrough stages 4 and 6 |
| Good examples are enough to copy. | Examples can hide the reason each rule exists. | A reader copies the surface layout but not the behavior control. | Design choices and pattern cards name the bad output each rule blocks. | Design Choices, Patterns |
| A generated person skill can answer from memory. | Current facts change, especially for living people and companies. | It gives stale market or product claims in character. | Generated Agentic Protocol forces research before fact-sensitive answers. | Walkthrough stage 7, Glossary |
| Quality can be judged by reading the final prose. | Structural mistakes are easy to miss by eye. | Missing boundaries, too many models, no expression DNA. | `quality_check.py` and Phase 4 tests. | Walkthrough stage 8, File map |

## Running example

User request:

> 帮我蒸馏一个乔布斯 skill，用来审视产品设计和战略取舍。

Why this example:

- It is a clear direct-path request.
- It needs both person-specific thinking and current product facts.
- Nuwa already contains a Jobs example, so the handbook can show concrete output shapes.

Expected output:

- A self-contained `steve-jobs-perspective/` package.
- Six research files under `references/research/`.
- A final `SKILL.md` with mental models, heuristics, expression DNA, Agentic Protocol, boundaries, and sources.
- Validation notes showing known-position, edge-case, and voice checks.

## Total task in one sentence

Nuwa turns a person or theme request into a self-contained skill package by forcing evidence gathering, synthesis checkpoints, template construction, and validation before delivery.

## Stages

| ID | Summary |
| --- | --- |
| `stage-entry` | Route explicit person requests and fuzzy needs differently. |
| `stage-confirm` | Confirm target, use, focus, update mode, and local materials. |
| `stage-package` | Create the skill directory before research starts. |
| `stage-research` | Split evidence gathering into six dimensions and write files. |
| `stage-review` | Stop after research and expose source quality before synthesis. |
| `stage-synthesis` | Filter candidate ideas through three tests before naming models. |
| `stage-synthesis-check` | Stop again before writing the final skill. |
| `stage-build` | Fill the template and derive a person-specific Agentic Protocol. |
| `stage-validate` | Test the generated skill and refine or mark limits. |

## Mechanism threads

- Evidence thread: source rules -> six research files -> merge summary -> source appendix.
- Synthesis thread: candidate ideas -> triple validation -> model or heuristic -> generated skill sections.
- Boundary thread: weak dimensions -> checkpoints -> honest boundary text -> validation result.
- Current-facts thread: living person or current company question -> generated Agentic Protocol -> research-before-answer.

## Terms

- Mental model: a repeatable lens that can judge new problems.
- Decision heuristic: a practical if-this-then-that rule supported by cases.
- Expression DNA: how the person talks, not just what they believe.
- Honest boundary: specific limits, not a generic disclaimer.
- Agentic Protocol: the generated skill's own action path for answering.
- Six-road research: writings, conversations, expression, outside views, decisions, timeline.
- Source quality ladder: local primary material and original work outrank summaries.
- Self-contained package: every instruction, research note, script, and source note lives inside the skill folder.

## Design choices

- Route before work, because explicit and fuzzy requests need different paths.
- Ask for local materials, because user-provided primary sources beat search summaries.
- Create the package before research, because saved files keep work auditable.
- Checkpoint after research, because poor sources cap final quality.
- Triple-test models, because quotable ideas are not always operating principles.
- Derive Agentic Protocol, because generated skills must research current facts.
- Validate before delivery, because polished prose can still behave wrongly.

## Patterns

- Route by starting state.
- Six-road evidence split.
- Source quality ladder.
- Cheap checkpoint before expensive synthesis.
- Triple-gate model filtering.
- Protocol derived from models.
- Script takes fragile counting.
- Honest boundary as output section.

## Required diagrams

| ID | File | Purpose |
| --- | --- | --- |
| `main-flow` | `assets/diagrams/main-flow.svg` | High-level phase flow and checkpoints. |
| `package-map` | `assets/diagrams/package-map.svg` | File ownership and generated artifact relationship. |
| `agentic-compare` | `assets/diagrams/agentic-compare.svg` | Shows how different person models generate different research dimensions. |
| `pattern-network` | `assets/diagrams/pattern-network.svg` | Shows how reusable patterns connect. |

## Page list

- Overview: show ordinary failure before mechanics.
- Walkthrough: first-person run through the Jobs example.
- Glossary: explain design-heavy terms with concrete values.
- File map: explain responsibility, not just directory layout.
- Design choices: name bad scenarios and counter-cases.
- Patterns: extract reusable moves with cost and links.
- Apply it: turn the handbook into a short skill-authoring checklist.

## Risks and assumptions

- This handbook is based on the local source package at the time of generation.
- It does not rerun Nuwa to create a new Jobs skill; it documents the Nuwa skill itself.
- Script observations are from reading source code, not from executing every script on real media.
