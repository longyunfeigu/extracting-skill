# Visuals and quality bar

Use this reference when planning diagrams, generated illustrations, final
handbook review, or web app review.

## 9. Separate accurate diagrams from generated illustrations

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

## Recommended visual layer

Plan visuals after the core explanation exists. A good default set:

```text
1. 高层流程图          code-native
2. 文件关系图          code-native
3. AI 运行轨迹图       code-native
4. 手册封面图          imagegen
5. 1-2 张概念隐喻图    imagegen
```

Structure diagrams explain. Generated images invite and reinforce.

## 对照用真表格，不要散文

教科书 Overview 的 wow moment 经常涉及 2+ 个东西的对照（不同人 → 不同行为 / 不同输入 → 不同产出 / 默认 vs 优化）。**这种对照必须用真表格——SVG diagram type=`compare` 或 HTML table——不能用散文叙述。**

为什么：散文叙述对照逼读者把文字在脑子里转成表才能体会差异，认知负担高。真表格让眼睛自己走一遍，"哦原来如此"是看出来的，不是说出来的。

具体规则：

- 同一段位置上 2+ 个实体的横向对比 → SVG 表格（cols = 实体，rows = 维度）。
- 同一实体在多个时间点的状态变化 → SVG 时间轴 + 状态卡。
- before / after 对照 → 双卡（左边 before / 右边 after，颜色对比明显）。
- 一对多 / 多对一 → SVG 网状图或 ER 图，不要文字罗列。

**判定违规**：你的 wow moment 里出现了 ≥ 3 个并列项（"A 是 X / Y / Z；B 是 P / Q / R；C 是 M / N / O"）但没配图——这就是散文做对照，回去画 SVG。

校准样板见 `examples/nuwa-skill/web-app/assets/diagrams/protocol-compare.svg`——3 列 × 2 行（核心心智模型 / 反推研究维度）的塔勒布 / 费曼 / MrBeast 对照。

## 占位 metadata ≠ 完成（写了 diagrams[] 不等于画了图）

这是 web app 输出最常见的失败模式：

- AI 在 `data.js` 的 `diagrams: []` 数组里写了 title / type / description 字段——觉得"画图这件事已经做完了"。
- 但 `image: "assets/diagrams/*.svg"` 字段没填、或者填了但**对应 SVG 文件根本不存在**。
- site.js 的 `diagramBlock()` 检测到 `image` 为空时**静默跳过 `<img>` 标签**——页面不报错、HTTP 200、左侧导航还在——但 overview.html / walkthrough.html / file-map.html / design-choices.html 打开后看到的是一个孤立的"先看大流水线 · 顶层流程图"标题加一段描述，下面空着。

所以硬规则：

- `diagrams[]` 每个条目必须配 `image:` 字段指向真实存在的 SVG 文件。
- 落盘前 `ls web-app/assets/diagrams/` 看每个 image 引用都对得上文件。
- 起本地 http server 之后**逐个 curl 每个 SVG 文件**——HTTP 200 + 非零字节 = 渲染会出图。**只测页面 200 不够**，因为页面 200 时图可能完全是空的。
- 验证方法：用浏览器打开页面，或者用 `curl -s url | wc -c` 看 SVG 字节数 > 1000。少于这个数说明 SVG 是空壳。

## Quality Bar

Before finishing a handbook, check:

- Does the first page explain why the skill is cool without assuming file knowledge?
- Does every important term get explained before it is used heavily?
- **就地短解自检：** walkthrough / design choices / patterns / file map 里，每个领域术语第一次出现时，旁边有 5-25 字就地短解吗？
- **Page-level orientation 自检：** 多页 web 版本里，每个明细页面（**overview** / walkthrough / patterns / design-choices / file-map）的第一张详细卡之前，有没有一句话总任务、顶层全景图、全索引表？Overview 特别要求至少 1 张 orientation 图（嵌在 primer 第 1 拍后）+ 1 张 compare 图（如有横向对比）。
- **图渲染自检（不是 metadata 检查）：** `data.js` 的 `diagrams[]` 每条都有 `image:` 字段吗？字段指向的 SVG 文件真实存在吗？起本地 server 后逐个 curl 每张 SVG，HTTP 200 且非零字节吗？没做这一关 = 图可能就是没画。
- Is the AI using the skill the narrative subject?
- Does the document move from user intent to low-level files?
- Does every major design choice name the bad scenario it prevents?
- Does one concrete example carry the whole walkthrough?
- Does every stage say what the AI received, read, avoided, produced, and handed off?
- Are file roles explained by responsibility, not just path name?
- Are accurate relationship diagrams kept code-native instead of generated as bitmaps?
- If imagegen is used, does each image have a clear learning purpose and avoid exact text-heavy labels?
- Can the reader steal at least three concrete design moves?
- For web mode, does the work use `handbook-brief.md` plus page packets as the
  source, with `handbook.md` only as an export?
- Do the pages have distinct jobs and writing voices instead of one Markdown
  voice split into files?

## Overview 教科书章节自检

承重墙是 Overview——读者前 10 分钟。逐条扫，命中任何一条就回去重写：

- 1.2 opening scene 是 6-10 个 narrative block 让读者**亲眼看到** AI 在没有这个 skill 时的失败模式，还是只在用一句话**陈述** AI 的本能？后者要重写——展示比陈述强 5 倍。
- 1.3 predict prompt 存在吗？在 opening scene 之后、primer 之前？问得够具体让读者真能写出猜测，还是泛泛"想一下"？
- 1.4 primer 是 5-9 拍 narrative blocks 还是一坨 >300 字段落？后者必须拆。
- 1.4 primer 第 1 拍之后嵌了一张 orientation SVG 图吗？没有 = 读者没地图 = 重写。
- 1.5 wow moment 涉及 2+ 个东西对照时，用了 SVG 表格还是散文叙述？散文 = 工作笔记 voice = 重写为 SVG。
- 1.6 bad results 是 3-5 张 before/after 双行卡（aiDefault + nuwaIntercept），还是扁平 bullet 列表？扁平 = 落不到地 = 重写。
- 1.8 whyThisShape 是 `shapeReason`（一句逻辑）+ `chapterLogic`（结构化列表），还是一段把 7 章串起来的 TOC 散文？后者重写。
- 把 Overview 单独拿给一个**完全没读过源 skill 的朋友**看，他读完能用 3-5 句话给另一个朋友讲清楚源 skill 在干嘛吗？讲不清 = opening scene 或 primer 不够具体 = 重写。

## Pre-test / narrative material / challenges self-check

- 每个 stage 开头有 pre-test hook 吗？写法是「你和我同坐一椅」叠合，不是「你是这个 AI」切 POV？
- 每个 stage 的主体至少含一个真实材料：文本片段 / 真实 prompt / 命令输出 / 代码样本？
- 7 字段是否折叠成「快速参考」面板，让叙事成为默认阅读路径？
- 每个 stage 末尾有 challenges 块吗？视觉断开 + 「🤔 你的练习」标签 + 一句「不是 AI 内心独白」的提示？
- challenges 是真实边界，还是凑数？

## Stage four-part self-check

- 每个 stage 读完，读者闭眼能背出「AI 干什么 / 输入是什么 / 产出是什么 / AI 自由度有多大」四件事吗？
- 输入和产出**各自**有真材料展示吗？
- AI 在这一步有创作自由的 stage，叙事里有没有至少一处「AI 默认本能 vs 被约束后」的 before/after 对比？
- AI 在这一步几乎没创作自由的 stage，叙事里有没有主动说"这一步几乎没发散空间，因为上游 X 已经把 Y 钉死"？

## Design choice self-check

- 每个 design choice 有 3 个 counter scenarios 吗？
- 三个场景的 effect 不全是「救你」吗？
- 每个 counter 的「为什么」是具体的、可以被反驳的，还是泛泛「视情况」？

## Pattern network self-check

- 每个 pattern card 有 `therefore` 字段做 problem-to-solution 视觉断点吗？
- 每个 pattern 至少有 1 个 relatedPatterns 链接吗？
- relation 字段是具体关系（搭配用 / 前置 / 区别于 / 下游接管 / 对照 / 可能冲突）还是泛泛的「相关」？

## Narrative hook self-check

- 每个 stage 开头有 `**接上一步：**` 一行钩子吗？第一站用 `**从这里开始：**`。
- 每个 stage 结尾有 `**下一步靠这个：**` 一行钩子吗？最后一站用 `**这里把账结清：**`。
- 钩子的语气是"这一步可以做什么 / 不用做什么"，还是"被 skill 拦着不让做"？后者要重写。
- 5.X 结尾的"下一步靠这个"和 5.X+1 开头的"接上一步"说的是同一件事吗？
- 整本书读完，能不能口述出一条"AI 从想抄近路到明白每个停顿在赎债"的弧？
