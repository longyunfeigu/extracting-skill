# Skill handbook spec

Read this file first for every run of this skill. It defines the core contract
for the handbook output and tells the agent which companion reference to load
for each kind of detail.

The output is a multi-page handbook, suitable for a web documentation app, that
walks through how a skill changes an AI's behavior from the perspective of the
AI using it.

For a complete sample handbook, read `examples/web-video-presentation/handbook.md`
for voice calibration. For the rendered web app shape, see
`examples/web-video-presentation/web-app/`.

## Core Idea

The handbook answers one question:

```text
我，一个正在使用这个 skill 的 AI，拿到用户输入后，是怎样被这个 skill
一步步约束、引导、暂停、检查、产出结果的？
```

Write from the agent's visible working path. Use first person ("我") for the AI
using the skill. Do not pretend to expose private hidden thoughts. Show the
auditable path:

- 我收到什么
- skill 要我先读什么
- 我不能直接做什么
- 我为什么要停在这里
- 我产出什么
- 下一步谁会用这个产物
- 这里有什么可复用设计

## What this format produces

The output is always:

- a guide richer than a single Markdown report;
- multi-page content suitable for a manual or web documentation app;
- a stage-by-stage walkthrough anchored on one concrete example;
- concept explanations placed before the names are used;
- the AI's working path as the narrative subject;
- high-level logic first, then lower-level files and rules;
- design choices explained through the bad scenarios they prevent.

## What to read when

Load only the detail file needed for the current part of the work:

| Need | Read |
| --- | --- |
| Overall contract, structure, and routing | `references/handbook-spec.md` |
| Stage walkthrough, terminology explanations, narrative hooks, AI freedom | `references/stage-writing.md` |
| Design choice cards, pattern cards, scenario comparison, pattern links | `references/cards-patterns.md` |
| Multi-page web app structure and page-level orientation | `references/web-app-structure.md` |
| Diagrams, generated illustrations, final self-checks | `references/visuals-and-quality.md` |

Do not load every reference by default. Read this file first, then pull in the
companion file that matches the section being written or reviewed.

## Non-Negotiable Rules Summary

These are the rules. The linked companion files contain the full writing
instructions and examples.

1. **Explain concepts before names.**
   Every source-skill term gets a short local explanation the first time it is
   used in walkthrough, design choices, patterns, or file map. See
   `references/stage-writing.md`.

2. **Start high, then go lower.**
   Move from user intent to AI total task, stage split, intermediate artifacts,
   rule files, and final engineering outputs. For multi-page web pages, each
   detail page also needs its own orientation block. See
   `references/web-app-structure.md`.

3. **The AI using the skill is the subject.**
   Prefer "我拿到文章后..." over "该 skill 会...". The point is to show how the
   skill changes default AI behavior.

4. **Every design choice names the bad scenario.**
   A rule without the bad output it prevents is just advice. See
   `references/cards-patterns.md`.

5. **One concrete example carries the whole handbook.**
   Pick one small representative request and reuse it through every stage.

6. **Each stage teaches, then offers a quick reference.**
   A stage opens with a pre-test, carries real material, ends with challenges,
   and demotes the 7-field checklist into a collapsible quick-reference panel.
   See `references/stage-writing.md`.

7. **Design choice cards compare three scenarios.**
   Each card shows where the choice saves the work, where it constrains too
   much, and where the verdict depends on context. See
   `references/cards-patterns.md`.

8. **Pattern cards have a problem-to-solution break and cross-links.**
   Patterns are a network, not a flat list. See `references/cards-patterns.md`.

9. **Separate accurate diagrams from generated illustrations.**
   Use code-native diagrams for exact relationships and imagegen only for mood
   or conceptual reinforcement. See `references/visuals-and-quality.md`.

10. **Stages connect through narrative hooks.**
    Each stage opens by using what the previous stage saved and ends by naming
    what the next stage can now rely on. See `references/stage-writing.md`.

11. **Use story voice, not document voice.**
    Write for a capable engineer entering this skill's domain for the first
    time. Use scenes and questions before rules. See
    `references/stage-writing.md`.

12. **Every stage makes input, action, output, and AI freedom visible.**
    Show real input and real output. If the AI has creative freedom, show the
    default instinct versus the constrained result. If it has almost no freedom,
    say why. See `references/stage-writing.md`.

## Recommended Handbook Structure

### 1. 先感受它为什么 cool

Give the reader the "wow" moment in 100-200 words. Name the ordinary AI failure
right away.

```markdown
这个 skill 看起来 cool 的地方不是"会写 React"。真正厉害的是：
它不让我从文章直接跳到网页。它先把文章变成能念的稿子，再变成
可开发的节奏计划，再让用户在最便宜的返工点确认，最后才写网页和音频。
```

### 2. 用一个小例子跑完整流程

Pick one representative request and keep it through the whole handbook. Use a
stage table first, then expand important stages in prose.

```markdown
| 阶段 | 我收到什么 | 我被要求读什么 | 我不能直接做什么 | 我产出什么 | 下一步谁用它 |
| --- | --- | --- | --- | --- | --- |
| <stage> | <input> | <reference> | <blocked shortcut> | <output> | <consumer> |
```

### 3. 高层地图

Show one top-down map before file details:

```text
用户意图
  "把文章做成视频"
      │
      ▼
AI 总任务
  把读的内容变成听 + 看 + 点击推进的网页视频
      │
      ▼
阶段
  内容编写 → 用户对齐 → 网页开发 → 音频合成 → 录屏
      │
      ▼
产物
  article.md / script.md / outline.md / Chapter.tsx / narrations.ts
```

### 4. AI 运行轨迹

This is the spine of the handbook. Read `references/stage-writing.md` before
writing it.

Each stage combines:

- a pre-test hook;
- a teaching narrative in first-person AI voice;
- real input and real output material;
- a collapsible 7-field quick reference;
- a reusable move;
- a reader challenge block;
- a narrative handoff into the next stage.

### 5. 文件角色图

For each important file:

```markdown
#### `<file>`

**谁生成它：** <stage or agent>

**谁读取它：** <later stage, script, user, or subagent>

**它管什么：** <decision dimension>

**它不管什么：** <boundaries>

**如果它写错会怎样：** <bad outcome>
```

### 6. 关键设计选择

Pick 5-8 choices that explain the skill's shape. Do not list every rule. Prefer
choices that changed the AI's behavior:

- why the skill does not answer immediately;
- why a checkpoint exists;
- why a file is a source rather than derived;
- why a later phase gets decision power;
- why validation must fix before reporting;
- why a script handles a fragile step.

Read `references/cards-patterns.md` before writing this section.

### 7. 可复用设计模式

Extract only the moves a reader can copy into another skill. Read
`references/cards-patterns.md` before writing this section.

### 8. Visual layer

Plan visuals after the core explanation exists. Read
`references/visuals-and-quality.md` before choosing diagram or image types.

### 9. 多页 HTML / Web App

Organize pages by reader intent, not source file order. Read
`references/web-app-structure.md` before writing or implementing the web app.

