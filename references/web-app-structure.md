# Web app structure

Use this reference when turning a handbook into a multi-page HTML / web
documentation app, or when writing any handbook page that may be read out of
order.

Before writing page prose, read `references/web-production-flow.md`. Web mode
uses `handbook-brief.md` plus page packets as source material. A single
`handbook.md` is a later export, not the page-writing source.

Before writing page prose, create the fixed shell with:

```bash
bash scripts/scaffold-web-app.sh generation/<skill-slug> \
  --title="<Skill Name> 解剖手册" \
  --skill-name="<Skill Name>" \
  --source-path="<source skill path>"
```

`<skill-slug>` is a kebab-case identifier of the source skill. The whole run
lives under `generation/<skill-slug>/` — handbook brief, page packets, the
rendered web app, and all diagrams sit together so a single run is self-
contained.

The generated `index.html`, `pages/*.html`, `assets/site.js`, and
`assets/styles.css` are stable infrastructure. For a normal seven-page handbook,
do not rewrite them for each chapter; put page content in `assets/data.js` and
diagram files in `assets/diagrams/`.

**视觉规范在另一份文件里。** 这一份只讲页面**结构**（orientation block / index
table / 卡片字段 / 跨页 voice）。**字体 / 配色 / stage 编号长啥样 / code block
长啥样 / pull-quote 怎么排** 见 `references/web-app-visuals.md`。

## Start high, then go lower

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

## Page-level orientation

In a single Markdown handbook, chapter order can carry orientation. A multi-page
web app is different: readers can land directly on `overview.html`,
`walkthrough.html`, `patterns.html`, `design-choices.html`, or `file-map.html`.

Every detail-list page must include this orientation block before the first
detailed card:

1. **一句话总任务。**
   Restate what the AI is doing in this whole run. Reuse the overview page's
   sentence when possible.

2. **一张顶层全景图（code-native，只画大阶段，不展开 stage 节点）。**
   - **Overview page: 至少一张 orientation 图嵌在 primer 第 1 拍之后；如果有 2+ 个东西的横向对照，再加一张 compare 图。详见 `references/handbook-spec.md` 的 Overview 形状规范。**
   - Walkthrough page: flow chart with 3-6 large boxes, each labeled
     `阶段名 · N stages`.
   - Patterns page: pattern relationship graph, drawn from `relatedPatterns`.
   - Design choices page: dependency graph only if choices depend on each
     other.
   - File map page: package map / source-of-truth map.

3. **一张全索引表（一行摘要 + 锚点跳转）。**
   Walkthrough page: N rows, each `stage 名 — 一行 summary`, each linking to the
   detailed card. Patterns and design choices use the same idea.

**图和表的分工要清晰**：图负责"形状 / 拓扑 / 我在哪段"，表负责"摘要 / 跳转 /
每段干啥"。不要让一张图同时承担拓扑和明细。

错位症状：读者落到 walkthrough.html，第一眼看见 stage 1 的详细卡——他既不知道
总共多少 stage、也不知道这是哪一段、也没看见流程图。

## Recommended multi-page app structure

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
│  └─ 出现冲突时以哪个文件为准
├─ 关键设计
│  ├─ 设计选择 1
│  └─ ...
├─ 能偷的招
└─ 自己写一个类似 skill
```

Use structured cards for repeated shapes:

- stage cards;
- concept cards;
- file-role cards;
- design-choice cards;
- pattern cards.

## Page packet responsibilities

Each page should be written from its own packet, not copied from a single
Markdown chapter. The packet fixes what the page is responsible for and what
voice it should use.

| Page | Responsibility | Voice |
| --- | --- | --- |
| Overview | why this skill matters, one example, high-level promise | **教科书章节标准**：experiential opening 让读者亲眼看到失败模式 + predict 钩子 + 多拍 primer 含 orientation 图 + wow 用真表格做对照 + before/after 卡。详见 `references/handbook-spec.md` 第 1 节。**不是** "short, concrete, inviting" 的工作笔记 voice。 |
| Walkthrough | how the AI moves stage by stage | scene-based, first-person, evidence-heavy |
| Glossary | explain terms that carry design weight | slow, precise, example-first |
| File map | show which files own which decisions | operational, responsibility-focused |
| Design choices | explain why rules exist and what they prevent | argumentative, tradeoff-aware |
| Patterns | extract reusable moves | compact, reusable, cost-aware |
| Apply it | help the reader write a similar skill | practical, checklist-like |

Different voices are expected. Consistency comes from the shared
`handbook-brief.md`, IDs, running example, diagrams, and editor pass.

## Page self-check

- Does each detail page explain the total task before the first detailed card?
- Does each detail page include a top-level diagram when relationships matter?
- **Overview 特别检查：opening scene 是否展示了失败模式（不是陈述）？primer 是否拆成 5-9 拍且嵌入了 orientation 图？wow moment 涉及 2+ 对照时是否用了真表格而不是散文？bad results 是否是 before/after 卡而不是扁平 list？**
- Does each detail page include an index table with one-line summaries and
  anchors?
- Does the diagram show topology while the table carries summaries?
- Can a reader land directly on this page and still know what pipeline they are
  looking at?
- Does each page come from a page packet with a distinct job and voice?
- Is `handbook.md` treated as an export rather than the web source?
