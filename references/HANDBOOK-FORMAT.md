# Skill 解剖手册格式

Use this reference when the user asks for a "手册", "解剖手册", "handbook",
"manual", "多页面 HTML", "文档站", or wants to understand how a skill runs through
one concrete example. This is a third genre. It is not a pattern extraction report
and not a teaching-version essay.

For a short style sample, read `handbook-example-web-video-presentation.md`.
For a complete sample handbook, read `handbook-web-video-presentation-full.md`.

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

## When To Use

Use handbook mode when the user wants:

- a guide that is richer than a single Markdown report;
- a multi-page manual or web app content structure;
- a stage-by-stage walkthrough with a concrete example;
- concept explanations before names are used;
- the AI's working path as the narrative subject;
- high-level logic first, then lower-level files and rules;
- design choices explained through the bad scenarios they prevent.

Do not use this mode when the user only asks for a compact pattern list. Use
pattern extraction for that. Do not use it when the user asks for "教学版" or
"first-principles"; use `teaching-version-style.md` for that.

## Non-Negotiable Rules

### 1. First explain the concept, then use the name

Every domain term from the source skill must be introduced before it is used as
if the reader already knows it.

Bad:

```text
script.md 是口播稿。
```

Good:

```text
我先生成 `script.md`。你可以把它理解成给视频用的口播节拍稿：
它不是摘要，而是后面每次点击推进时要念出来的内容。
```

For each important term, include a concept card when useful:

```markdown
#### `<term>`

**人话解释：** <one plain explanation>

**它出现在哪个场景：** <the concrete moment where the AI needs it>

**它解决什么问题：** <bad output or confusion it prevents>

**我作为 AI 怎么用它：** <how the skill makes the agent use it>

**容易误解：** <what it is not>
```

### 2. Start high, then go lower

The handbook should descend like this:

```text
用户意图
  → AI 总任务
  → 阶段拆分
  → 中间产物
  → 约束文件
  → 工程产物 / 输出物
```

Never start with a low-level file if the reader does not yet know what the whole
skill is trying to accomplish.

### 3. The AI using the skill is the subject

Prefer:

```text
我拿到文章后，不能马上写网页。skill 先让我把文章改成能念出来的 `script.md`。
```

Avoid:

```text
该 skill 会生成 `script.md`。
```

The goal is to show how the skill changes default AI behavior.

### 4. Every design choice must name the bad scenario

For each meaningful rule, explain:

- 看起来为什么多此一举
- 不这样会坏在哪里
- skill 怎么约束我
- 这个约束解决了什么问题
- 能偷走哪招

Template:

```markdown
### <design choice>

**看起来多此一举的地方：** <why a reader may think this is unnecessary>

**坏场景：** <what the AI would likely do without this rule>

**skill 怎么约束我：** <the concrete instruction, checkpoint, file split, or validation>

**解决的问题：** <the user-facing or production-facing problem it prevents>

**可偷的招：** <the reusable design move>
```

### 5. Concrete example carries the whole handbook

Pick one small request and reuse it through the whole document. Do not switch
examples midstream.

The example should be short enough that the reader can keep it in working memory:

```text
我有一篇文章，讲 GPT Image 新模型的文字渲染能力。
帮我做成一个 3 分钟 B 站风格视频网页。
```

Every stage should point back to this example.

### 6. Each stage opens with a pre-test, carries real material, ends with challenges

A handbook is a teaching document, not a structured reference card. To stop the
handbook from degrading into "fill 7 boxes per stage," each stage must:

**Open with a pre-test hook (reader-AI alignment, not POV switch).**
Use "你和我同坐一椅" framing so the reader is invited to *guess* the next move
before reading what the AI did. Do **not** address the reader directly with "你
是这个 AI"—that switches POV. The main narrative continues "我...".

```markdown
**先猜一遍：** 设想你和我坐同一把椅子上。<具体当前状态描述>。
你下一步的本能是 <X> 还是 <Y>？写下来再读下面我（被 skill 拦着的 AI）实际怎么走。
```

**Carry concrete material in the narrative.**
The 7-field structure (received / read / blocked / action / output / next /
reusable move) is reference data, not teaching. Each stage's main body must
include at least one of:

- a real text excerpt (article rewritten into script, outline section, narrations.ts code)
- a real prompt the AI sends to the user (Checkpoint Plan questions, Audio reroute fork)
- a real command or output trace (scaffold.sh invocation, mmx synthesize log)
- a real markdown / JSON / TS sample showing the actual artifact shape

The 7 fields are demoted to a collapsible "快速参考" panel below the narrative.
A reader who wants a checklist can expand it; the default reading mode is
narrative.

**End with challenges block (POV switch with clear visual break).**
Challenges naturally address the reader as a future skill author, not the AI
running this skill. To prevent POV pollution of the main narrative:

- Challenges must be in a visually distinct block (border, color shift, "🤔 你的练习" label).
- The block label must say something like "不是 AI 的内心独白——是给读这本手册的你的题"
  to make the speaker switch obvious.
- 3-4 questions per stage, drawn from real edge cases the skill has actually
  encountered (not fabricated for the sake of having challenges).

```markdown
🤔 你的练习（不是 AI 的内心独白——是给读这本手册的你的题。先想再读下一阶段。）

1. <边界 challenge: 用户给的输入超出了 stage 1 分流表覆盖的情况, 怎么办?>
2. <冲突 challenge: 这条规则和那条规则在某场景下冲突, 优先级是什么?>
3. <代价 challenge: 这条规则的成本在某规模下不划算, 该不该简化?>
4. <边缘 challenge: stage 没明确说的边界, 怎么判断?>
```

### 7. Design choice cards must include 3-scenario counter-comparison

Single-perspective design advice is misleading. Each design choice must include
a `counterScenarios` array—three concrete scenarios where the choice救 / 绑 /
取决于 / 失效。Pattern from *Designing Data-Intensive Applications*: same
mechanism, different workloads, different verdicts.

```markdown
### <design choice>

**看起来多此一举的地方：** ...
**坏场景：** ...
**skill 怎么约束我：** ...
**解决的问题：** ...
**可偷的招：** ...

**不同场景下的力度对比：**

| 场景 | 效果 | 为什么 |
|---|---|---|
| <典型场景> | 救你 | <为什么这是它的甜区> |
| <边缘场景> | 绑你 / 部分让位 / 应简化 | <为什么这个场景下它反而是负担> |
| <反例场景> | 完全失效 / 取决于 | <为什么这个场景下规则空转或要看具体> |
```

Allowed `effect` values: 救你 / 绑你 / 部分让位 / 部分过度 / 应简化 / 可以跳过 / 取决于 / 完全失效 / 完全多余 / 完全冗余 / 可能绑你 / 可以放宽。

### 8. Pattern cards must have a Therefore: break + cross-links

Patterns are not arranged in a flat list. Each pattern card needs:

- **A `therefore` field** rendered as a visual breakpoint between the problem
  (`prevents`) and the solution (`useWhen` / `howToReuse`). This is the
  "stop and think for one second" moment from *A Pattern Language*. Without
  this break, problem and solution blur together.
- **A `relatedPatterns` array** that links the card to other pattern cards in
  the same handbook. Each link has `to` (pattern id like "P4"), `label`
  (pattern name), and `relation` (a phrase like "搭配用：...", "前置：...",
  "区别于：...", "下游接管：..."). This turns 9 isolated cards into a network
  the reader can navigate.

```markdown
### <pattern name> · 状态：候选

**它防什么坏结果（problem）：** ...

❖ &nbsp; ❖ &nbsp; ❖

**Therefore:** <one-line pivot from problem to solution>

❖ &nbsp; ❖ &nbsp; ❖

**什么时候用 / 为什么不能简单做：** ...
**怎么复用：** ...
**反例：** ...
**代价：** ...
**在哪几个 skill 里见过：** ...

**和哪些 pattern 一起读：**
- → P4 便宜返工点 checkpoint（搭配用：分流后通常要走 checkpoint 才进昂贵实现）
- → P8 审阅清单接修复（搭配用：分流的产出每一份都要走自检 → 修复闭环）
```

`relation` 写法建议：「搭配用：」「前置：」「区别于：」「下游接管：」「对照：」「可能冲突：」——一两个词点出关系性质，避免泛泛 "相关"。

### 9. Separate accurate diagrams from generated illustrations

A handbook can use visuals, but do not treat all visuals the same.

Use **code-native diagrams** for relationships that must be accurate:

- stage flow;
- data flow;
- file dependency maps;
- source-of-truth maps;
- checkpoint placement;
- generated artifact lineage.

Use Mermaid, SVG, HTML/CSS, or another repo-native format for these. The point is
correctness, searchability, and future edits.

Use **imagegen illustrations** for visuals that help the reader feel the idea:

- cover art;
- cool-moment opener;
- concept metaphor;
- stage mood image;
- product mockup of the future handbook UI.

Do not use imagegen for diagrams that require precise labels, exact arrows, or
maintainable file paths. Generated bitmap text is too easy to get wrong and too
hard to update.

When a handbook benefits from imagegen, include a visual plan before generating
assets:

```markdown
### <asset name>

**用途：** <where the image appears and what understanding it helps>

**类型：** imagegen | Mermaid | SVG | HTML/CSS

**为什么用这种类型：** <accuracy vs mood reason>

**Prompt / 图内容：** <for imagegen, a production prompt; for code diagrams, exact nodes>

**避免：** <text errors, fake logos, decoration that misleads, etc.>
```

For imagegen prompts, prefer no embedded text unless the exact text is short and
non-critical. Let surrounding Markdown carry exact labels.

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

Use a stage table, then expand each important stage in prose.

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

This is the spine of the handbook. Each stage now combines a teaching narrative
with a structured reference (per Rule 6):

```markdown
### <stage name>

**先猜一遍 · pre-test：** 设想你和我坐同一把椅子上。<具体当前状态>。
你下一步的本能是 <X> 还是 <Y>？写下来再读下面我（被 skill 拦着的 AI）实际怎么走。

**叙事 · 我（AI）实际怎么走：**

<para> 我现在拿到的是 <具体 input，引用 the running example>。</para>

<para> skill 让我读 <reference 文件>，要我 <action 概述>。</para>

<para> 这一步真实材料：</para>

```<lang>
<真实代码 / 真实 prompt / 真实命令 / 真实 JSON / 真实表格>
```

<para> <对真实材料的 3-5 句解读：为什么这样 / 反例是什么 / 边界在哪>。</para>

<details>
<summary>快速参考（7 字段速查）</summary>

- 这一步收到什么：<input>
- skill 让我读什么：<references>
- 我不能直接做什么：<blocked shortcut>
- 我做什么：<action>
- 我产出什么：<output>
- 下一步谁用它：<next consumer>

</details>

**这里能偷的招：** <reusable move>

────────
🤔 你的练习（不是 AI 的内心独白——是给读这本手册的你的题。先想再读下一阶段。）

1. <边界 challenge：用户给的输入超出了 stage 1 分流表覆盖的情况, 怎么办?>
2. <冲突 challenge：这条规则和那条规则在某场景下冲突, 优先级是什么?>
3. <代价 challenge：这条规则的成本在某规模下不划算, 该不该简化?>
4. <边缘 challenge：stage 没明确说的边界, 怎么判断?>
```

The narrative section is the default reading path. The 7-field box is a
collapsed quick-reference panel for readers who want a checklist view. This
matches Crafting Interpreters' "main text + sidebar + Challenges" pattern.

### 5. 文件角色图

For each important file:

```markdown
#### `<file>`

**谁生成它：** <stage or agent>

**谁读取它：** <later stage, script, user, or subagent>

**它管什么：** <decision dimension>

**它不管什么：** <boundaries>

**如果它写错会怎样：** <failure>
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

### 7. 可复用设计模式

Extract only the moves a reader can copy into another skill. Each card now uses
the Therefore-pivot + cross-link shape from Rule 8:

```markdown
### <pattern name> · 状态：候选

**它防什么坏结果（problem）：** ...

❖ &nbsp; ❖ &nbsp; ❖

**Therefore:** <one-line pivot from problem to solution>

❖ &nbsp; ❖ &nbsp; ❖

**什么时候用 / 为什么不能简单做：** ...

**怎么复用（详细）：** ...

**反例（看着像但不是这招）：** ...

**什么时候这招会坑你 / 代价：** ...

**在哪几个 skill 里见过：** ...

**和哪些 pattern 一起读：**
- → P<n> <pattern name>（搭配用 / 前置 / 区别于 / ...：<relation 一句话>）
- → P<n> <pattern name>（...：...）
```

The `❖ ❖ ❖` divider is the *A Pattern Language* visual breakpoint. It tells the
reader to stop one second between problem and solution—prediction-then-verify
instead of passive consumption. The `relatedPatterns` cross-link section turns
isolated cards into a navigable network.

Design choice cards (Section 6) follow a parallel shape with `counterScenarios`
table (Rule 7) instead of `relatedPatterns`.

### 8. Visual layer

Plan visuals after the core explanation exists. A good default set:

```text
1. 高层流程图          code-native
2. 文件关系 / 真相源图  code-native
3. AI 运行轨迹图       code-native
4. 手册封面图          imagegen
5. 1-2 张概念隐喻图    imagegen
```

Structure diagrams explain. Generated images invite and reinforce.

### 9. 如果要做成多页 HTML / Web App

The handbook pages should be organized by reader intent, not source file order:

```text
<Skill Name>
├─ 先感受一下
│  ├─ 为什么 cool
│  └─ 一个小例子
├─ 我怎么被 skill 带着跑
│  ├─ 总流程
│  ├─ 阶段 1
│  ├─ 阶段 2
│  └─ ...
├─ 文件怎么协作
│  ├─ 文件地图
│  └─ 真相源
├─ 关键设计
│  ├─ 设计选择 1
│  └─ ...
├─ 能偷的招
└─ 自己写一个类似 skill
```

Use structured cards for repeated shapes: stage cards, concept cards, file-role
cards, design-choice cards, and pattern cards.

## Quality Bar

Before finishing a handbook, check:

- Does the first page explain why the skill is cool without assuming file knowledge?
- Does every important term get explained before it is used heavily?
- Is the AI using the skill the narrative subject?
- Does the document move from user intent to low-level files?
- Does every major design choice name the bad scenario it prevents?
- Does one concrete example carry the whole walkthrough? (该例子的真实文本 / 代码 /
  prompt 在每个 stage 都出现一次以上吗？只在开头露脸不算贯穿。)
- Does every stage say what the AI received, read, avoided, produced, and handed off?
- Are file roles explained by responsibility, not just path name?
- Are accurate relationship diagrams kept code-native instead of generated as bitmaps?
- If imagegen is used, does each image have a clear learning purpose and avoid exact text-heavy labels?
- Can the reader steal at least three concrete design moves?
- Is this distinct from both pattern extraction and teaching version?

**Pre-test / narrative material / challenges 自检（Rule 6）：**

- 每个 stage 开头有 pre-test hook 吗？写法是「你和我同坐一椅」叠合，不是「你是这个 AI」切 POV？
- 每个 stage 的主体（narrativeBody）至少含一个真实材料：文本片段 / 真实 prompt / 命令输出 / 代码样本？还是仍是「按 X.md 改写 Y」这种描述？
- 7 字段（received / read / blocked / action / output / next / reusable move）是否折叠成「快速参考」面板，让叙事成为默认阅读路径？
- 每个 stage 末尾有 challenges 块吗？视觉断开 + 「🤔 你的练习」标签 + 一句「不是 AI 内心独白」的提示？challenges 是真实边界（agent 真的会卡的地方）还是凑数？

**Design choice 多视角自检（Rule 7）：**

- 每个 design choice 有 3 个 counterScenarios 吗？
- 三个场景的 effect 不全是「救你」吗？至少有一个是「绑你 / 部分让位 / 完全失效」之类的反向判断？
- 每个 counter 的「为什么」是具体的、可以被反驳的，还是泛泛「视情况」？

**Pattern 网络自检（Rule 8）：**

- 每个 pattern card 有 `therefore` 字段做 problem→solution 视觉断点吗？
- 每个 pattern 至少有 1 个 relatedPatterns 链接吗？9 张 card 之间是网络还是孤岛？
- relation 字段是具体关系（搭配用 / 前置 / 区别于 / 下游接管 / 对照 / 可能冲突）还是泛泛的「相关」？
