# Web production flow

Use this reference when the requested output is a multi-page web handbook or
documentation app. Its purpose is to prevent a common bad result: writing one
long `handbook.md`, then mechanically translating it into pages with the same
voice everywhere.

## Core Rule

For web mode, `handbook.md` is an export, not the source of truth.

Every run lives under `generation/<skill-slug>/`, where `<skill-slug>` is a
kebab-case identifier of the source skill (ASCII letters, digits, hyphens). All
source files and the rendered web app sit together:

```text
generation/
└─ <skill-slug>/
   ├─ handbook-brief.md
   │   global facts, one running example, page map, shared IDs, diagrams, links
   ├─ page-packets/
   │   overview.packet.md
   │   walkthrough.packet.md
   │   glossary.packet.md
   │   file-map.packet.md
   │   design-choices.packet.md
   │   patterns.packet.md
   │   apply-it.packet.md
   ├─ index.html
   ├─ pages/
   └─ assets/
```

The web app is assembled from the brief and page packets. A single-file
`handbook.md` may be generated after that as a readable export (also under
`generation/<skill-slug>/`).

Scaffold the shell first:

```bash
bash scripts/scaffold-web-app.sh generation/<skill-slug> \
  --title="<Skill Name> 解剖手册" \
  --skill-name="<Skill Name>" \
  --source-path="<source skill path>"
```

The scaffold creates the stable page shells, renderer, CSS, starter `data.js`,
and empty `assets/diagrams/` directory. For the standard seven-page handbook,
do not regenerate these files by hand. Fill
`generation/<skill-slug>/assets/data.js` and add real SVGs; edit
`assets/site.js` only when the schema or page set changes.

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

### 0. Scaffold the fixed web shell

Run `scripts/scaffold-web-app.sh` before writing any full page prose. This
prevents the agent from spending context on boilerplate HTML, repeated page
shells, and renderer wiring.

Expected fixed files (under `generation/<skill-slug>/`):

```text
generation/<skill-slug>/
  index.html
  pages/{overview,walkthrough,glossary,file-map,design-choices,patterns,apply-it}.html
  assets/
    data.js
    site.js
    styles.css
    diagrams/.gitkeep
```

For normal runs, page work means updating `assets/data.js` and adding SVGs.
The HTML shells and renderer are infrastructure, not per-page writing output.

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

anchor slice 一旦完成，**主 thread 不要继续写任何完整页面**。停下来问用户：剩下 7 页要继续串行写，还是分给 page agent 并行。同时给出自己的建议（按下表的判断条件），不要只把问题甩给用户。

| 走法 | 怎么做 | 什么时候选 |
| --- | --- | --- |
| 串行 | 主 thread 按顺序写下一个 packet → 渲染该页 → 再下一个 | 写 anchor slice 的时候频繁回头改 `handbook-brief.md`，或者 voice / density 在样本之间反复调——真相源或形状还没稳。这时候并行会让 7 个 page agent 同时基于一份不稳定的契约工作，editor pass 要修的东西比省下来的时间多 |
| 并行 page agent | 如果当前运行环境支持安全的并行写文件，把每页分给一个 page agent；每页产出先过 page voice gate，全部通过后回到主 thread 做 editor pass | anchor slice 一两遍就收敛、没有暴露 brief 问题，IDs / running example / 术语和 voice / density 都已经稳定 |

并行时 page agent 的任务形状：

- agent 必须能写文件并运行必要的本地验证；
- prompt 必须自包含，包括
  - 该页的 `page packet`（job / voice / must-include / must-avoid / self-check）
  - `handbook-brief.md` 的完整内容（共享 IDs / running example / 术语 / 图表清单）
  - **anchor slice 里对应该页的那个组件作为风格锚点**：overview 页拿 overview opening；walkthrough 页拿那一个 walkthrough stage 样本；patterns 页拿那张 pattern card；file-map 页拿那张 file-role card；所有页都拿 page shell 做导航和视觉密度参照
  - 指向 `references/stage-writing.md`、`references/cards-patterns.md`、`references/visuals-and-quality.md`、`references/voice-style-gate.md` 的硬规则
  - **该页的产出位置**：page agent 直接 patch `generation/<skill-slug>/assets/data.js` 里对应那一 key（walkthrough 页 patch `handbook.walkthrough`，patterns 页 patch `handbook.patterns`，file-map 页 patch `handbook.fileMap`，依此类推）。**不要新建任何独立 JS 文件**（如 `page-data/walkthrough.js`、`generation/<skill-slug>/assets/walkthrough-rest.js`）等主线程后续合并——HTML 只 `<script src="../assets/data.js">`，独立 JS 文件不会被加载，最后变成 1000+ 行死代码污染下一次校准。如果担心多个 page agent 同时 patch `data.js` 互相覆盖，就由主线程在 fan-out 之前先把 `data.js` 准备好骨架（每个 key 留空数组 / 空对象），page agent 按 key 精确替换；不要绕开这个文件
  - 要求该页完成前先过 page voice gate：列出发现的问题，修掉 blocking issues，再返回最终页面内容

**不要用 team 模式。** 本任务是单向交付——每个 page agent 拿到 brief + 对应锚点 + packet → 产出该页 → 结束。没有需要双向对话的协调。Team 模式的消息往返开销解决不了任何 brief 已经解决的协调问题，只会拖慢。

主 thread 收齐所有 page agent 的产出后，先确认每页都通过 page voice gate，再做最终
**editor pass**（见 step 5）——page agent 之间看不到彼此的输出，IDs 漂移 / 重复段落 /
cross-link 断链都靠 editor pass 兜底。

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
**Voice gate:** 高曝光字段优先交给**独立 reviewer** 扫一遍；如果当前环境不能启用独立 reviewer，就显式按 `references/voice-gate-examples.md` 顶部「高曝光字段必扫清单」逐项自检。reviewer 或自检都要对照「7 类高频违反」并跑朗读测试，输出 blocking issues，writer 修完才算页完成。
```

如果 step 2a 选了串行，主 thread 顺序写每个 packet 并渲染对应页。
如果选了并行，主 thread 不写完整 packet——把 packet 模板和必含字段直接传给每个 page agent，让它在自己的 context 里生成 packet + 该页内容。

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

### 4a. Page voice gate

每页 / 每章写完后立刻过 voice gate，过不了就当这页没写完。不要等 7 页都写完才清文风债。

#### 形状（必须，不是可选）

writer 写完一页 → 主线程**起一个新的 reviewer**（如果当前环境支持）——只扫这一页的「高曝光字段」（见 `references/voice-gate-examples.md` 顶部清单）。reviewer 不重写，只输出 blocking issues + 改后建议。writer 拿这份输出修一遍，再标完成。如果当前环境不能启用 reviewer，就按同一清单做显式自检并修掉 blocking issues。

**为什么不能 writer 自审高曝光字段：**

假共情、假深刻、自我标榜、万能模板、排比堆砌这几类问题，正是 LLM 写完会主观觉得「挺好」的地方。writer 跑自审天然有自评偏差，拦不住。reviewer 是新 context，没有「我刚才花了多大力气写」的心理负担，能照出来。

#### gate 检查的三件事

1. **反装样自检** — 学者名、英文包装、文学修辞、发明术语、中英夹杂、行话解释行话。完整清单在 `references/voice-style-gate.md`。
2. **去 AI 味自检** — 密集汇报腔、数字名词堆叠、破折号锁链、规则先行、很久不转向读者；额外扫假共情、假深刻、自我标榜、万能模板、排比堆砌。完整清单在 `references/voice-style-gate.md`。
3. **朗读可行性检查** — 长句、长段、缺少自然停顿、念到中途必须换气的句子。

reviewer **不需要把这三项都从头扫一遍**——按 `references/voice-gate-examples.md` 的「7 类高频违反」对照反例先扫一轮（这是最常踩的 7 类），再从 `references/voice-style-gate.md` 抽查 5 项做兜底。**对照反例库比对抽象规则有效得多**——拿写完的段对着右边改后例比，比对着左边抽象描述准。

#### reviewer 调用形状

并行模式下，如果当前环境支持，主线程为每个 writer 配一个 reviewer（7 页并行 = 7 writer + 7 reviewer）：

- `prompt` 必含：
  - 要扫的页内容（从 `generation/<skill-slug>/assets/data.js` 的对应 key 读取）
  - `references/voice-gate-examples.md` 的「高曝光字段必扫清单」对应这一页的那一行
  - `references/voice-gate-examples.md` 的「7 类高频违反」对照反例
  - `references/voice-style-gate.md` 的完整检查清单（兜底抽查用）
  - 输出形状要求（blocking issues + 改后建议，**不重写整页**）

#### reviewer 输出形状

```text
Blocking issues
1. <字段位置，如 patterns[0].prevents>:
   原句：...
   命中：类 X（或 `references/voice-style-gate.md` 的某条规则）
   建议：...

Non-blocking notes
- <可选改进，不阻塞页完成>
```

writer 拿这份输出修一遍，再标"页完成"。reviewer 不重写整页——writer 知道自己的设计意图，reviewer 替写会破坏意图。

#### 控制 reviewer 工作范围

只扫高曝光字段，**不扫全页**。次要字段（如 walkthrough 七字段速查、challenges 题目、relatedPatterns 的 relation 字段）由 writer 自审，由最终 editor pass 兜底——避免 reviewer 调用成本雪崩。

### 5. Editor pass

After packets exist and every page has passed the page voice gate, run an
editor pass before building the web app:

- one running example stays consistent across pages;
- stage IDs, term IDs, design choice IDs, and pattern IDs match the brief;
- every detail page has page-level orientation;
- every diagram named in a packet has a real asset plan;
- every page has a distinct job and voice;
- no page depends on another page to explain its first important term;
- cross-links point to existing pages or anchors;
- repeated paragraphs are removed instead of copied across pages;
- **没有死的数据文件留下**：`generation/<skill-slug>/assets/` 下除 `data.js / site.js / styles.css / diagrams/` 之外不应该有任何 JS 数据文件；`page-data/` 或 `generation/<skill-slug>/page-data/` 这种目录不应该存在。如果有，说明 page agent 写了独立中间文件等主线程合并，但合并完忘了删——留着就会变成下一次跑这个 skill 时的「校准目标」，把后续 run 带歪。验证方法：在输出目录里查找 `page-data/*.js`、`assets/*-rest.js`、`assets/__*_rest.js`，应该零结果。

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

- Did `scripts/scaffold-web-app.sh` create `generation/<skill-slug>/` before page prose was written?
- Were fixed shell files left alone unless the schema or page list changed?
- Is `handbook.md` described as an export rather than the web source?
- Is there a `handbook-brief.md` or equivalent source plan?
- Does each page have a page packet with job, voice, inputs, must-include, and self-check?
- Did every page pass the page voice gate before final editor pass?
- Voice gate 的 reviewer 真的是**独立 reviewer**（不是 writer 自审）？如果当前环境不能启用独立 reviewer，是否至少用 `references/voice-gate-examples.md` 的「高曝光字段必扫清单」+「7 类高频违反」做了显式自检？writer 是不是真按 blocking issues 修了一轮？
- Could two page agents work without editing the same packet?
- 写完 anchor slice 之后是否真的停下来问了用户并行还是串行？（不要默默替用户决定，也不要默默全程串行到底）
- 如果走了并行：page agent 是否能写文件和运行验证？prompt 是不是自包含了 brief + anchor slice 对应组件 + packet 模板？
- 如果走了并行：page agent 是不是把产出直接 patch 进了 `generation/<skill-slug>/assets/data.js` 的对应 key？有没有任何独立 JS 数据文件残留（`page-data/*.js`、`assets/*-rest.js`、`assets/__*_rest.js`）？
- Does the walkthrough page still follow `references/stage-writing.md`?
- Do design choices and patterns still follow `references/cards-patterns.md`?
- Does every detail page still follow `references/web-app-structure.md` orientation rules?
- Did the editor pass check ID consistency and repeated prose?
