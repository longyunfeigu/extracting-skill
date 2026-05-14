# Skill handbook spec

Read this file first only when producing a multi-page handbook or web
documentation app. It defines the content contract. `references/web-production-flow.md`
defines how to turn that contract into files.

The handbook answers:

```text
我，一个正在使用这个 skill 的 AI，拿到用户输入后，是怎样被这个 skill
一步步约束、引导、暂停、检查、产出结果的？
```

Before answering from inside the skill, answer from outside it:

```text
普通用户或默认 agent 以为这个任务难在哪里？
真正会让工作错位、返工、失控的地方在哪里？
这个 skill 用哪些机制提前处理掉？
```

Use first person for the agent's visible working path. Do not invent private
hidden thoughts. Show auditable actions, files, checks, and outputs.

## Ordinary-view pain scan

Write this into `handbook-brief.md` before page prose:

```markdown
## Ordinary-view pain scan

| Ordinary assumption | Real friction | First visible symptom | Skill mechanism | Where it appears |
| --- | --- | --- | --- | --- |
| <what the task seems to be about> | <deeper workflow pain> | <first visible drift> | <file/rule/script/checkpoint that catches it> | <stage/page/reference> |
```

Use the scan in two places:

- Overview turns it into the opening problem.
- Walkthrough turns important rows into "错位症状 -> 机制 -> 现场证据".

Do not paste the table as reader-facing prose.

## Required layers

Every handbook preserves three layers:

1. **How the skill runs:** phases, gates, loops, handoffs, validation.
2. **How it is packaged:** entry file, references, scripts, assets, tests,
   examples, outputs.
3. **What design moves it contains:** reusable patterns, costs, and counter-
   cases.

## Page map

Organize by reader intent, not source file order.

| Page | Job | Common failure |
| --- | --- | --- |
| Overview | make a new reader understand the ordinary failure and high-level map | table of contents, abstract praise, or source terms before the problem |
| Walkthrough | show the agent moving stage by stage through one running example | checklist with no scene, real material, or handoff |
| Glossary | explain design-heavy terms through concrete values | isolated dictionary |
| File map | show which files own which decisions and what breaks when they drift | directory listing |
| Design choices | explain why major rules exist and what bad output they block | generic best practices |
| Patterns | extract reusable skill-writing moves | renamed section headings |
| Apply it | help the reader write a similar skill | motivational advice |

Each detail page should orient a direct-link reader before the first detailed
card:

- total task in one sentence;
- top-level diagram when relationships matter;
- index table with one-line summaries and anchors.

## Overview standard

Overview is the entry point. A reader who has never seen the source skill should
leave with a 3-5 sentence explanation of what the skill does.

Before writing Overview, consume the ordinary-view pain scan. The opening scene
must stay in the reader's language: show what a default agent or normal user
would get wrong before introducing source-skill terms, file names, phase names,
or the skill's own solution.

Required sections:

1. **Hero:** concrete h1 and lede. Show default AI behavior versus skill-shaped
   behavior. Do not praise the skill abstractly.
2. **Opening scene:** 6-10 short narrative blocks showing the failure mode before
   naming the source skill's solution.
3. **Predict prompt:** ask the reader to guess the fix before revealing the
   skill's mechanism.
4. **Primer beats:** 5-9 short beats that build the domain map. Include an
   orientation diagram after the first beat.
5. **Wow moment:** if comparing 2+ entities, use a real table or SVG compare
   diagram. Do not make the reader assemble the comparison from prose.
6. **Bad results prevented:** 3-5 before/after cards with `aiDefault` and
   `skillIntervention`.
7. **Running example:** user request, why this example represents the main path,
   and expected output.
8. **Why this shape:** one sentence for the ordering logic and a structured
   `chapterLogic` list.

## Walkthrough standard

Read `references/stage-writing.md` before writing Walkthrough.

Each stage includes:

- pre-test hook;
- first-person execution narrative;
- real input and output material;
- concrete mismatch or workflow pain it catches;
- cross-stage mechanism thread, if any;
- collapsible stage quick reference;
- reusable move;
- reader challenge block;
- handoff to the next stage.

## Glossary standard

Glossary is not a replacement for local term explanations. In prose, explain a
term before using it. In Glossary, expand only terms that carry design weight.

Each term card needs:

- concrete example value;
- stage where it appears;
- problem or confusion it prevents;
- how the agent uses it;
- easy-to-confuse contrast.

## File Map Standard

For each important file, explain:

```markdown
#### `<file>`

**Who writes it:** <stage or script>
**Who reads it:** <later stage, script, user, or validator>
**What it owns:** <decision dimension>
**What it does not own:** <boundary>
**What breaks if wrong:** <bad outcome>
```

## Design Choices and Patterns

Read `references/cards-patterns.md` before writing these pages.

Pick only the choices and patterns that explain the skill's shape. Do not list
every rule.

Good choices usually explain:

- why the skill does not answer immediately;
- why a checkpoint exists;
- why a file is a source rather than derived;
- why a later phase gets decision power;
- why validation must fix before reporting;
- why a script handles a fragile step.

## Visual Layer

Read `references/visuals-and-quality.md` before planning diagrams.

- Use code-native diagrams for exact relationships.
- Use generated images only for mood or conceptual reinforcement.
- Every diagram referenced in `data.js` must point to a real file.

## Final checks

- Does Overview show ordinary pain before source-skill mechanics?
- Does one running example carry the handbook?
- Does every important term get a local explanation before heavy use?
- Does Walkthrough show input, action, output, freedom, pain caught, and handoff?
- Does the package map explain responsibilities rather than list paths?
- Does every design choice name the bad output it prevents?
- Can the reader steal at least three concrete design moves?
