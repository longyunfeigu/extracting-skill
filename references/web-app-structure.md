# Web app structure

Use this reference when turning a handbook into a multi-page HTML / web
documentation app, or when writing any handbook page that may be read out of
order.

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
web app is different: readers can land directly on `walkthrough.html`,
`patterns.html`, `design-choices.html`, or `file-map.html`.

Every detail-list page must include this orientation block before the first
detailed card:

1. **一句话总任务。**
   Restate what the AI is doing in this whole run. Reuse the overview page's
   sentence when possible.

2. **一张顶层全景图（code-native，只画大阶段，不展开 stage 节点）。**
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

## Page self-check

- Does each detail page explain the total task before the first detailed card?
- Does each detail page include a top-level diagram when relationships matter?
- Does each detail page include an index table with one-line summaries and
  anchors?
- Does the diagram show topology while the table carries summaries?
- Can a reader land directly on this page and still know what pipeline they are
  looking at?

