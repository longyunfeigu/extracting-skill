---
name: extracting-skill-patterns
description: Use when studying, reverse-engineering, comparing, or learning from one or many AI skill packages, SKILL.md files, Claude/Codex skills, prompt workflows, or agent playbooks; use when the user wants reusable skill design patterns, a skill pattern library, Markdown plus JSON/YAML outputs, or help choosing patterns for a new skill.
---

# Extracting Skill Patterns

## Overview

Turn impressive skills into reusable design moves. Do not merely summarize what a skill says; explain what bad AI behavior it prevents, how it makes the agent behave differently, and which parts can be reused when writing new skills.

The output should feel like a creator's working notes: clear, concrete, and easy to steal from. Avoid consultant words unless the user asks for theory.

## Workflow

Use `references/visual-maps.md` when the user wants a richer explanation, a diagram, or a teachable version of the method.
Use `references/worked-example-trace.md` when the analyzed skill has a multi-stage workflow, or when the user asks for examples, stage-by-stage input/output, or a more intuitive explanation.

### 1. Treat the input as a skill package

The input may be a single `SKILL.md`, a skill directory, or a folder containing many skills.

Start by mapping the package:

- Find every `SKILL.md`.
- Note `references/`, `scripts/`, `assets/`, `examples/`, `tests/`, and metadata files.
- Read the entry `SKILL.md` first.
- Read referenced files only when they explain the skill's design. Do not swallow every large reference by default.
- If scripts exist, inspect what jobs they take away from the agent.

For a batch, analyze representative skills first, then scan the rest for repeated structures.

### 2. Read like a skill designer

For each skill, answer these questions in plain language:

- What was the wow moment?
- What bad AI output is this skill trying to prevent?
- Why is the process this heavy?
- What does it force the agent to do before answering?
- What does it stop the agent from doing lazily?
- How does the skill run from start to finish?
- Where does it put knowledge, examples, scripts, and evidence?
- Which terms would a smart reader still not understand?
- Which move can be reused in another skill?
- When would this move be too heavy or wrong?

Preserve three layers. Do not drop any of them:

1. **How it runs** - the flow, phases, gates, loops, and handoffs.
2. **How it is packaged** - `SKILL.md`, references, scripts, examples, tests, outputs.
3. **What design moves it contains** - reusable patterns that can help future skills.

### 3. Write human notes first

Use `references/output-template.md` for the main Markdown output.

Write in the user's language. If the user asks in Chinese, use natural Chinese headings like "它在防什么坏结果" and "我能偷走哪几招."

Prefer this vocabulary:

| If you are tempted to write about | Say |
| --- | --- |
| competing tensions | Why it has to be this way |
| strict rules | What it does not let the agent get away with |
| behavior control | How it changes the agent's behavior |
| file and context layout | Where it puts the moving parts |
| deliverables | Outputs |
| reusable theory | Reusable move / design pattern |

Keep the user's useful details. If a skill has a flow, file layout, and extracted patterns, include all three.

### Teaching layer

When the extraction uses a term that is not obvious, explain it before moving on. Do not explain a term by repeating the term.

For each important concept, include:

- **人话解释** - what this means in plain language.
- **怎么判断** - how to recognize it in a skill.
- **为什么重要** - what bad output it prevents.
- **小例子** - one concrete example from the analyzed skill.

Example:

```text
心智模型：不是“这个人说过的观点”，而是他反复用来判断问题的看法。
怎么判断：换一个新问题，这个看法还能帮他推出一个答案。
例子：芒格的“逆向思考”不是一句口号，而是遇到投资、人生、产品问题时都先问“怎样会失败”。
```

### Worked example trace

For any skill with phases, checkpoints, or routing, include one running example that follows the workflow end to end.

The example should show:

- **User input** - the concrete request that starts the skill.
- **Stage input** - what the agent has at that stage.
- **Agent action** - what the skill tells the agent to do.
- **Stage output** - what gets produced or saved.
- **What the reader learns** - the reusable move demonstrated by that stage.

Do this especially when the output contains abstract labels like "synthesis," "research review," "quality validation," or "Agentic Protocol."

### 4. Extract reusable design patterns

A pattern is not a section title. It is a move that can be reused.

Good pattern cards include:

- Plain name
- What bad result it prevents
- When to use it
- How it works
- Where it usually lives in the skill package
- What it costs
- What it combines with
- A real example from the analyzed skill

Use `references/pattern-library.md` for seed patterns and naming style. Add new patterns when the skill shows a move that is not already covered.

### 5. Produce both Markdown and structured data

When the user asks for a pattern library, produce:

- A Markdown version for people to read.
- A JSON or YAML version for later retrieval and composition.

Use `references/output-schema.yaml` for the structured shape. It is fine to include only the fields that are supported by evidence.

### 6. When helping write a new skill

Start from the problem the skill is meant to prevent:

1. Name the default bad AI behavior.
2. Pick 2-5 patterns from the library.
3. Decide what belongs in `SKILL.md` versus `references/` or `scripts/`.
4. Keep the first version small enough to test.
5. Include at least one pressure scenario that would make an agent fail without the skill.

Do not generate a huge skill just because many patterns are available. Choose the few that directly fix the failure mode.

## Quality Bar

Before finishing, check:

- Can the user immediately steal at least three concrete moves?
- Did you explain the flow without losing the file/package structure?
- Did you avoid abstract jargon unless it was translated into concrete user-facing language?
- Did every extracted pattern say when it is useful and when it is too heavy?
- Did the structured output match the Markdown instead of drifting into a separate summary?

## Resources

- `references/output-template.md` - Markdown templates for single-skill and batch analysis.
- `references/pattern-library.md` - starter library of reusable skill design patterns.
- `references/output-schema.yaml` - YAML schema for structured pattern output.
- `references/nuwa-example.md` - example extraction that keeps flow, package layout, and reusable patterns without drifting into jargon.
- `references/visual-maps.md` - flowcharts, layer maps, output menu, and scoring rubric for richer explanations.
- `references/worked-example-trace.md` - stage-by-stage example format with teaching principles behind it.
