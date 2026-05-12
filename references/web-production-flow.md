# Web production flow

Use this reference when the requested output is a multi-page web handbook or
documentation app. Its purpose is to prevent a common bad result: writing one
long `handbook.md`, then mechanically translating it into pages with the same
voice everywhere.

## Core Rule

For web mode, `handbook.md` is an export, not the source of truth.

The source of truth is:

```text
handbook-brief.md
  global facts, one running example, page map, shared IDs, diagrams, links

page-packets/
  overview.packet.md
  walkthrough.packet.md
  glossary.packet.md
  file-map.packet.md
  design-choices.packet.md
  patterns.packet.md
  apply-it.packet.md
```

The web app is assembled from the brief and page packets. A single-file
`handbook.md` may be generated after that as a readable export.

## Why this exists

Different pages have different jobs:

- Overview invites the reader in and names the ordinary AI failure.
- Walkthrough teaches by scenes, real artifacts, and first-person AI movement.
- File map explains responsibilities and what breaks when files drift.
- Design choices argue from bad scenarios and tradeoffs.
- Patterns give reusable cards a reader can steal.
- Glossary slows down on terms without blocking the walkthrough.
- Apply-it turns the lesson into a small authoring checklist.

If one Markdown voice is written first, these pages flatten into the same prose
shape. The web app becomes a document viewer instead of a designed handbook.

## Flow

### 1. Create `handbook-brief.md`

Write a compact source plan before any long prose:

- source skill path and package map;
- one running example;
- total task in one sentence;
- stage IDs and one-line summaries;
- term IDs and short local explanations;
- design choice IDs and bad scenarios;
- pattern IDs and related pattern links;
- required diagrams and where each appears;
- page list and each page's job;
- known risks, missing evidence, and assumptions.

Keep it factual. Do not write the final page prose here.

### 2. Write one anchor slice

Before producing every page, write a small anchor slice:

- overview opening;
- one walkthrough stage;
- one pattern card;
- one file-role card;
- one page shell with navigation and visual density.

Use the anchor to set voice, density, and component shape. Later pages should
reuse its level of specificity, not copy its wording.

#### 2a. Checkpoint：写完 anchor slice 停下来问用户

anchor slice 一旦完成，**主 thread 不要继续写任何完整页面**。停下来问用户：剩下 7 页要继续串行写，还是 fan-out 给 sub-agent 并行。同时给出自己的建议（按下表的判断条件），不要只把问题甩给用户。

| 走法 | 怎么做 | 什么时候选 |
| --- | --- | --- |
| 串行 | 主 thread 按顺序写下一个 packet → 渲染该页 → 再下一个 | 写 anchor slice 的时候频繁回头改 `handbook-brief.md`，或者 voice / density 在样本之间反复调——真相源或形状还没稳。这时候并行会让 7 个 sub-agent 同时基于一份不稳定的契约工作，editor pass 要修的东西比省下来的时间多 |
| 并行 sub-agent | 在**一条 message** 里同时调用 7 个 `Agent` 工具（每页一个），让它们并发跑；产出回到主 thread 做 editor pass | anchor slice 一两遍就收敛、没有暴露 brief 问题，IDs / running example / 术语和 voice / density 都已经稳定 |

并行时 `Agent` 工具的调用形状：

- `subagent_type`：`general-purpose`（需要写文件 + 跑 bash 起服务 verify SVG，read-only agent 不够用）
- `model`：`opus`（路由到当前 Opus 4.7；这个任务对 voice / 概念解释要求高，sonnet / haiku 容易写出 AI slop 被反装样自检挑出来）
- `prompt`：必须自包含，包括
  - 该页的 `page packet`（job / voice / must-include / must-avoid / self-check）
  - `handbook-brief.md` 的完整内容（共享 IDs / running example / 术语 / 图表清单）
  - **anchor slice 里对应该页的那个组件作为风格锚点**：overview 页拿 overview opening；walkthrough 页拿那一个 walkthrough stage 样本；patterns 页拿那张 pattern card；file-map 页拿那张 file-role card；所有页都拿 page shell 做导航和视觉密度参照
  - 指向 `references/stage-writing.md`、`references/cards-patterns.md`、`references/visuals-and-quality.md` 的硬规则，以及 `SKILL.md` 末尾的反装样自检
  - 该页的产出位置（`web-app/pages/<page>.html` 或 `page-packets/<page>.packet.md`）

**不要用 team 模式。** 本任务是单向交付——每个 sub-agent 拿到 brief + 对应锚点 + packet → 产出该页 → 结束。没有需要双向对话的协调。Team 模式的消息往返开销解决不了任何 brief 已经解决的协调问题，只会拖慢。

主 thread 收齐所有 sub-agent 的产出后，**必须做 editor pass**（见 step 5）——sub-agent 之间看不到彼此的输出，IDs 漂移 / 重复段落 / cross-link 断链都靠 editor pass 兜底。

### 3. Produce page packets

Each page packet is a self-contained handoff for a page agent. It includes:

```markdown
# <page>.packet

**Page job:** <what this page helps the reader do>
**Reader state:** <what the reader already knows or may not know>
**Voice:** <how this page should sound>
**Inputs:** <brief fields, source files, stage IDs, pattern IDs>
**Must include:** <orientation, diagrams, cards, tables, real material>
**Must avoid:** <bad page-specific output>
**Packet output:** <structured data or prose blocks the web app will render>
**Self-check:** <page-specific checks>
```

如果 step 2a 选了串行，主 thread 顺序写每个 packet 并渲染对应页。
如果选了并行，主 thread 不写完整 packet——把 packet 模板和必含字段直接传给每个 sub-agent，让它在自己的 sub-thread 里生成 packet + 该页内容。

### 4. Page agent roles

| Page | Writing style | Must not become |
| --- | --- | --- |
| Overview | short, concrete, high-level; starts with why the skill is worth studying | a table of contents |
| Walkthrough | scene-by-scene; first-person AI voice; real inputs and outputs | a 7-field checklist list |
| Glossary | slow, precise concept cards; examples before abstract labels | a dumping ground for unexplained terms |
| File map | responsibility map; who writes, who reads, what breaks | a directory listing |
| Design choices | argumentative; each choice names the bad scenario and tradeoff | generic best practices |
| Patterns | reusable cards; problem, therefore break, reuse, cost, links | renamed section headings |
| Apply it | practical authoring moves and pressure scenarios | motivational advice |

### 5. Editor pass

After packets exist, run an editor pass before building the web app:

- one running example stays consistent across pages;
- stage IDs, term IDs, design choice IDs, and pattern IDs match the brief;
- every detail page has page-level orientation;
- every diagram named in a packet has a real asset plan;
- every page has a distinct job and voice;
- no page depends on another page to explain its first important term;
- cross-links point to existing pages or anchors;
- repeated paragraphs are removed instead of copied across pages.

### 6. Assemble web and Markdown

Build the web app from the page packets first. Treat page packets like source
material and the web pages like a rendering layer.

Only after the web app structure is coherent, generate `handbook.md` as a
linear export:

- preserve the same IDs and headings;
- collapse page-specific navigation into normal Markdown headings;
- keep page-specific voice when possible;
- do not make the Markdown export the next run's source of truth.

## Self-check

Before delivery, answer these checks explicitly:

- Is `handbook.md` described as an export rather than the web source?
- Is there a `handbook-brief.md` or equivalent source plan?
- Does each page have a page packet with job, voice, inputs, must-include, and self-check?
- Could two page agents work without editing the same packet?
- 写完 anchor slice 之后是否真的停下来问了用户并行还是串行？（不要默默替用户决定，也不要默默全程串行到底）
- 如果走了并行：sub-agent 是不是用了 `model: "opus"` + `subagent_type: "general-purpose"`，prompt 是不是自包含了 brief + anchor slice 对应组件 + packet 模板？
- Does the walkthrough page still follow `references/stage-writing.md`?
- Do design choices and patterns still follow `references/cards-patterns.md`?
- Does every detail page still follow `references/web-app-structure.md` orientation rules?
- Did the editor pass check ID consistency and repeated prose?

