# Full handbook spec

Use this file only when the user asks to upgrade a Skill X-Ray into a full
handbook or web documentation app. The default workflow starts in
`references/xray-flow.md`, not here.

This file defines the core contract for the full handbook output and tells the
agent which companion reference to load for each kind of detail.

The full handbook expands the X-Ray. It should carry forward:

- the representative task;
- the recommended path;
- the Auto Decision Log;
- the Intervention Map;
- the evidence table;
- the friction verdict.

Do not start a full handbook from a blank page map. Start from the behavior
changes already captured in the X-Ray.

For web app output, the source of truth is not one long `handbook.md`. The
source is `handbook-brief.md` plus page packets. `handbook.md` may be generated
afterwards as a linear export. Read `references/web-production-flow.md` before
writing web pages.

If example outputs are present in the skill folder, use them only for optional
calibration. Do not treat examples as schema, writing rules, or source of truth.
If an example conflicts with this file or another reference, the reference wins.

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

The full handbook output is:

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
| Default X-Ray workflow, Auto Decision Log, evidence tags | `references/xray-flow.md` |
| Intervention Map row shape and evidence rules | `references/intervention-map.md` |
| Overall contract, structure, and routing | `references/handbook-spec.md` |
| Stage walkthrough, terminology explanations, narrative hooks, AI freedom | `references/stage-writing.md` |
| Design choice cards, pattern cards, scenario comparison, pattern links | `references/cards-patterns.md` |
| Web production flow, page packets, page agents, Markdown export | `references/web-production-flow.md` |
| Multi-page web app structure and page-level orientation | `references/web-app-structure.md` |
| 页面视觉规范（字体 / 配色 / 组件长什么样） | `references/web-app-visuals.md` |
| Diagrams, generated illustrations, final self-checks | `references/visuals-and-quality.md` |
| Voice gate, anti-jargon, teaching voice, read-aloud checks | `references/voice-style-gate.md` |
| Voice gate reviewer examples | `references/voice-gate-examples.md` |

Do not load every reference by default. In full handbook mode, read this file
first, then pull in the companion file that matches the section being written or
reviewed.

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

13. **Web mode uses brief plus page packets.**
    Do not write one complete `handbook.md` and translate it into pages. Create
    `handbook-brief.md`, write page packets with distinct page jobs and voices,
    run an editor pass, then assemble the web app. `handbook.md` is only a
    later export. See `references/web-production-flow.md`.

14. **Every page passes a local voice gate before the final editor pass.**
    反装样自检、去 AI 味自检、朗读可行性检查是每页 / 每章写完后的出门门槛，
    不是全书写完后的清理工作。先修局部文风问题，再做全书级一致性检查。See
    `references/voice-style-gate.md` and `references/web-production-flow.md`.

15. **The Intervention Map remains visible.**
    Overview uses it for before/after cards, Walkthrough shows where each
    intervention appears in the trace, Design choices explain why interventions
    exist, and Patterns extract only interventions that transfer.

## Recommended Handbook Structure

For full handbook mode, treat this structure as the page map. First carry
forward the X-Ray artifacts, then create the source plan and page packets
described in `references/web-production-flow.md`; then render the pages below.
For Markdown-only output, this structure can be written directly as one file.

### 1. Overview — 教科书章节标准

Overview 是承重墙。一个完全没看过源 skill 的读者，应该能在读完这一页后给朋友用 3-5 句话讲清楚这个 skill 在干嘛。

**这一节不是 creator 风格的总结。**"用一段密集段落把整个 skill 总结一遍"是工作笔记 voice，会让读者关掉。教科书 voice 必须刻意安排读者的前 10 分钟。

下面 8 个子节是写 Overview 时必填的字段和形状。**字段定义以下面为准**。不要从 example 反推 schema。

#### 1.1 Hero — 一句话框架

- `eyebrow`：章节标签（如 "Overview · 章 01"）
- `h1`：具体框架（如 "看见女娲在做什么"），不要写 "为什么这个 skill 值得看" 这种空泛标题
- `oneLiner`（lede）：最多 3 句，搭好这一章要解的张力。**展示 AI 默认会怎样 vs skill 让它怎样**——不要写抽象赞美。

#### 1.2 Opening scene — 先让读者看到失败模式，再命名

- 6-10 个 narrative block（段落 + 列表）让读者**亲眼看到** AI 在没有这个 skill 时会出的坏结果。
- 写成具体对话或 trace：「我让 AI 做 X。它说 Y。然后我问 Z。它开始飘——」
- **这一节里不许引入源 skill 的术语**。只展示问题，从读者的位置看。
- 字段：`overview.openingScene` (array of narrative blocks)。
- 反例：「拿到 X，AI 的本能是 Y——表面像，实际错」——这是陈述失败模式，不是展示。

#### 1.3 Predict prompt — 读者预测钩子

- 一个问题，2-3 句话。
- 强迫读者在看 skill 的答案之前，先写下自己的修法猜测。
- 字段：`overview.predictPrompt` (string)。
- 这个钩子要放在 openingScene 之后、primer 之前——读者已经看到问题，但还没看到答案。

#### 1.4 Domain primer — 多拍 + 嵌入 orientation 图

- 把 primer 拆成 5-9 个拍子（narrative block）。每拍一个想法、一段（或一个短列表）。
- **必须在第 1 拍之后嵌入一张顶层 SVG orientation 图**——`{kind: "diagram", id: "..."}`。没有图，读者就没有地图。
- 字段：`overview.primerBeats` (array of narrative blocks, including at least one `kind: "diagram"`)。
- **禁止：单一 `domainPrimer` 字段是 >300 字的一段。** 一坨长段落是工作笔记 voice 的最强信号，必须拆。

#### 1.5 Wow moment — 对照用真表格，不要散文

- `wowSetup`（2-3 句）：把读者带回到 opening scene 的具体问题，预告下面要展示什么。
- **如果 wow 涉及 2+ 个东西的对照**（不同输入 → 不同产出 / 不同人 → 不同行为 / 默认 vs 优化），**必须用真表格**——SVG diagram type=`compare`，或 HTML table。不能用散文叙述。
- 为什么：散文对照逼读者把文字转成脑子里的表才能体会差异；真表格让眼睛自己走一遍，"哦原来如此"是看出来的不是说出来的。
- `wowMoment`（2-3 句）：从表格里提炼出读者应该记住的一句话。
- 字段：`overview.wowSetup` (string), `handbook.diagrams[]` 中至少一个 `type: "compare"`, `overview.wowMoment` (string)。

#### 1.6 Bad results prevented — before/after 卡，不是 bullet 列表

- 3-5 张卡。每张卡两行：`aiDefault`（不用这个 skill 会发生什么）+ `skillIntervention`（这个 skill 怎么具体拦）。
- **不要写成一个 "防 X / 防 Y / 防 Z" 的扁平 list。** before/after 配对才让规则落地。
- 字段：`overview.badResults` (array of `{title, aiDefault, skillIntervention}`)。

#### 1.7 Running example — 引入贯穿全本的例子

- 这是后面 Walkthrough / Design Choices / Patterns 都要用的同一个例子。在这里设定，中途不换。
- 三张卡：用户请求 / 为什么挑这个例子 / 预期产出。
- 末尾 callout 提醒读者：这个例子会在每个 stage 出现。
- 字段：`handbook.example` (object with `userRequest`, `whyThisExample`, `expectedOutput`)。

#### 1.8 Why this shape — 结构化列表，不是 TOC 散文

- `shapeReason`：**一句话**讲排序逻辑（如 "按读者意图排，不按源文件顺序"）。
- `chapterLogic`：结构化列表——每章 `{chapter: "01 ...", why: "..."}`。"why" 必须说**为什么这一章排在这个位置**，不只是描述内容。
- **禁止**：一段把 7 章串起来的散文（"先在 Overview...，再在 Walkthrough...，然后..."）——这是 TOC 散文，且 site.js 已经自动渲染了 TOC 卡片，不需要再用文字版重复。
- 字段：`overview.shapeReason` (string), `overview.chapterLogic` (array)。

#### Overview voice 终极测试

把 Overview 单独拿出来，给一个**完全没看过源 skill 的朋友**读。
- 读完他能不能用 3-5 句话给另一个朋友讲清楚源 skill 在干嘛？讲不清 → 1.2 opening scene 或 1.4 primer 不够具体。
- 他读到哪一节最想跳过？跳过的那一节就是没做好 pacing 的——多半是 1.4 primer 一坨没拆 / 1.5 wow 用散文做对照 / 1.6 bad results 写成扁平 list。
- 他读完后有没有自己的预测被验证 / 被打破的感觉？没有 → 1.3 predict prompt 缺失或问得太泛。

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
