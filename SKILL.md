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
- **Norvig check:** Should this be a *pattern*, or is it a missing feature in the base prompt / platform / language model that every skill ends up patching by hand? If the latter, name it as a deficiency, not a pattern.

Preserve three layers. Do not drop any of them:

1. **How it runs** - the flow, phases, gates, loops, and handoffs.
2. **How it is packaged** - `SKILL.md`, references, scripts, examples, tests, outputs.
3. **What design moves it contains** - reusable patterns that can help future skills.

### 3. Write human notes first

Use `references/output-template.md` for the main Markdown output.

Write in the user's language. If the user asks in Chinese, use natural Chinese headings like "它在防什么坏结果" and "我能偷走哪几招."

#### Output mode routing (do this before writing anything)

Two orthogonal choices: **what genre** and **for whom**.

**Genre** — pattern extraction (default) vs **teaching version** (Socratic narrative). These are different documents, not different sections. If the user asks for "教学版", "讲清楚原理", "first-principles explanation", "let me understand it deeply", or compares your output unfavorably to a Socratic tutorial — switch to teaching version.

**Audience** (only for pattern extraction) — same extraction is wrong for different readers:

| Reader | Wants | Does **not** want |
|---|---|---|
| **Author** of the skill | Misunderstanding check, platform-deficiency signals, Polanyi gaps, direct improvement asks | Worked example, glossary of their own terms, restated patterns they invented |
| **Learner** new to skills | Worked example first, then patterns; one anti-example per pattern | 12-item 招式列表 before any concrete trace |
| **Reuser** building a new skill | Distinctive patterns + forces + when-not-to-use; honest evidence-of-recurrence | Author-specific advice; long flow diagrams |

For teaching version, audience is implicitly Learner; do not add audience headers — the genre serves the audience by construction.

If the user does not say genre or audience, ask in one line. Default for ambiguous cases: **pattern extraction, audience Reuser**.

When the user wants both teaching version and pattern extraction, produce them as separate documents with clear cross-links — do not interleave.

#### If genre = teaching version: stop here, branch out

The rest of this SKILL.md (sections 3.x onward — teaching order, pattern cards, structured output, quality bar) is **for pattern extraction only**. They will mislead a teaching version writer — for example, the "Flow at a glance first" rule below is correct for pattern extraction's Learner audience, but explicitly **forbidden** for teaching version (it spoils derivation).

For teaching version: open `references/teaching-version-style.md` and follow that document instead. Its section structure (一、先感受问题 → 二、你会怎么修 → ... → 十、最好的学习方式), voice rules, flow-diagram-placement rules, and what-to-skip list are the canonical guidance. Come back here only for the Norvig check (section 4) and Polanyi-edge handling (section 5) — both apply to teaching version's content but not to its form.

Quality bar for teaching version (different from the pattern-extraction quality bar at the end of this document):

- Did the reader **invent** the design before seeing it? (Not "did I describe the design clearly"?)
- Does every section land on a "你已经独立发明了 X" moment, or on a `>` blockquote stating the principle?
- Does each tradeoff appear as a comparison table with a "适合谁" final row?
- Are flow diagrams (if any) placed at section "看一眼别人怎么做" or end-of-document, **never at top**?
- Does each diagram node carry a one-line "为什么" annotation that re-fires the matching narrative section?
- Does the "最好的学习方式" section give the reader a 30-minute concrete practice — not a generic "go try it"?

If both quality bars feel relevant to one document, you are interleaving genres. Split into two documents.

---

The remainder of this SKILL.md applies to **pattern extraction** only.

#### Teaching order for pattern extraction (Sweller + Marton)

Inside the output, follow this order — do not invert it:

1. **Flow at a glance** — one ASCII diagram, ≤ 20 lines. The reader sees the shape before any prose.
2. **One worked example** — the skill running end-to-end on a concrete input. Concrete before abstract.
3. **Distinctive patterns** — only the moves that are unique or near-unique to this skill. Each pattern card carries an **anti-example** (a move that looks similar but is not this pattern). Without an anti-example, the reader cannot tell where this pattern stops.
4. **Library hits** (appendix) — patterns this skill uses that already live in `pattern-library.md`. List as one-liners, do not re-card.
5. **What you can't write down** — Polanyi-edge dimensions where rules fail and example saturation is the only path.
6. **Next action** — one paragraph saying what the reader should do with this report.

Skip any step that does not earn its keep for the chosen audience. For an Author, step 2 (worked example) is usually skippable.

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

A pattern is not a section title. It is a move that can be reused. Following Christopher Alexander, a pattern must describe a **recurring** problem in a **context** with **forces** that make the solution non-obvious. Without forces, you have a tip, not a pattern.

**Default everything to `candidate`.** A move seen in only the current skill is a candidate, not a pattern, even if it feels powerful. Only mark `pattern` when you can list at least 2 *unrelated* skills you have personally analyzed where this exact move appears. Citing `pattern-library.md` does not count as a sighting — the library is a seed, not independent evidence.

Good pattern cards include:

- Plain name
- What bad result it prevents
- **Forces** — the specific tensions that make *this* solution non-obvious. The forces must be specific enough that a sibling pattern (same skill, different move) would have *different* forces. If your forces could be copy-pasted onto another pattern, you have not found the real forces yet.
- **Evidence of recurrence** — list the skills where you have actually seen this move, with paths. Default to `candidate`.
- **Anti-example (Marton variation)** — one concrete move that looks similar but is *not* this pattern. Without an anti-example the reader cannot tell where the pattern stops. If you cannot construct one, the pattern's boundary is still vague — keep it as candidate.
- When to use it
- How it works
- Where it usually lives in the skill package
- What it costs
- What it combines with
- A real example from the analyzed skill
- **Should this be a platform feature? (Norvig check)** — if every skill copies this same move, flag as *deficiency marker*, not long-term reusable move.
- **Reflection-in-action note** — *situation-specific* warning: name a concrete scenario where applying this pattern would mislead. Generic disclaimers ("don't apply blindly") fail this field — they add no information.

Use `references/pattern-library.md` for seed patterns and naming style. Be reluctant about adding new patterns. When in doubt, leave the move as a *candidate* in the report and revisit after analyzing a second skill.

### 5. Produce both Markdown and structured data

When the user asks for a pattern library, produce:

- A Markdown version for people to read.
- A JSON or YAML version for later retrieval and composition.

Use `references/output-schema.yaml` for the structured shape. It is fine to include only the fields that are supported by evidence.

#### Match depth to the reader (expertise reversal effect)

Worked-example traces and full pattern cards help a new reader build schemas, but waste time for someone who already has them. Default to two layers:

- **Quick path** at the top — pattern names + one-line gist + reflection-in-action warning. For readers who already know the territory.
- **Full path** below — worked example, package layout, expanded pattern cards. For new readers.

Do not duplicate; the quick path links into the full path. If the user signals they are experienced ("I wrote skills like this — give me only the moves"), drop the full path.

#### What you can't write down

Some moves in a good skill are taste, rhythm, or aesthetic — when to let the agent stay quiet, what tone fits the user, when a worked example is enough vs. when a rule is needed. Polanyi's point — "we know more than we can tell" — applies. When you hit a dimension that resists rules, say so explicitly and recommend *more examples instead of more rules* for that dimension. Do not pretend you captured it.

### 6. When helping write a new skill

Start from the problem the skill is meant to prevent. Follow backward design (Wiggins): goal first, evidence second, plan third.

1. **Name the default bad AI behavior** — the failure you would observe if the skill did not exist.
2. **Define acceptable evidence** — what concrete before/after would prove the skill works? Write the exact scenario, the prompt, and the observable difference in agent output. If you cannot write this, you do not yet know what success means.
3. **Pick 2-5 patterns from the library** that directly close the gap between (1) and (2). Prefer fewer patterns with stronger fit over many patterns that could conceivably help.
4. **Decide what belongs in `SKILL.md` versus `references/` or `scripts/`.**
5. **Keep the first version small enough to test** against the evidence from step 2.
6. **Include at least one pressure scenario** (the test from step 2 plus an adversarial variant) that would make an agent fail without the skill.

Do not generate a huge skill just because many patterns are available. Choose the few that directly fix the failure mode.

#### When the library has no matching pattern

The library is a starting point, not a ceiling. If no existing pattern fits:

1. State the failure mode in one sentence.
2. Name the forces in tension that make the obvious fix wrong.
3. Sketch a candidate move and run it against one real prompt before naming it.
4. Use it in two unrelated skills before promoting it from *candidate* to *pattern*.

Inventing a pattern from one observation is how libraries rot — the GoF lesson. Stay reluctant.

## Quality Bar

Before finishing, check:

- Did you state who the audience is and skip sections that do not earn their keep for that reader?
- Does the output start with a **flow at a glance** (≤ 20-line diagram) and one **worked example** before any pattern card? (Skip worked example for Author audience.)
- Can the user immediately steal at least three concrete moves?
- Did you explain the flow without losing the file/package structure?
- Did you avoid abstract jargon unless it was translated into concrete user-facing language?
- Did every pattern carry **forces specific enough that a sibling pattern would have different forces**? (Generic forces = not yet a pattern.)
- Did every pattern carry an **anti-example**? (No anti-example = boundary still vague = keep as candidate.)
- Did you default to `candidate` and require 2+ unrelated sightings before promoting to `pattern`?
- Did you ask the **Norvig question** — should this be a pattern, or a platform deficiency to fix at the root?
- Did you mark dimensions that resist rules and recommend examples-not-rules for them?
- Did you end with **next action** — what the reader should do with this report?
- Did the structured output match the Markdown instead of drifting into a separate summary?

## Resources

- `references/output-template.md` - Markdown templates for single-skill and batch analysis.
- `references/pattern-library.md` - starter library of reusable skill design patterns.
- `references/output-schema.yaml` - YAML schema for structured pattern output.
- `references/nuwa-example.md` - example extraction that keeps flow, package layout, and reusable patterns without drifting into jargon.
- `references/visual-maps.md` - flowcharts, layer maps, output menu, and scoring rubric for richer explanations.
- `references/worked-example-trace.md` - stage-by-stage example format with teaching principles behind it.
- `references/teaching-version-style.md` - Socratic-narrative output mode for "教学版" / first-principles teaching requests, distinct from pattern extraction.
