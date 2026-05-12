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

## 占位 metadata ≠ 完成（写了 diagrams[] 不等于画了图）

这是 web app 输出最常见的失败模式：

- AI 在 `data.js` 的 `diagrams: []` 数组里写了 title / type / description 字段——觉得"画图这件事已经做完了"。
- 但 `image: "assets/diagrams/*.svg"` 字段没填、或者填了但**对应 SVG 文件根本不存在**。
- site.js 的 `diagramBlock()` 检测到 `image` 为空时**静默跳过 `<img>` 标签**——页面不报错、HTTP 200、左侧导航还在——但 walkthrough.html / file-map.html / design-choices.html 打开后看到的是一个孤立的"先看大流水线 · 顶层流程图"标题加一段描述，下面空着。

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
- **Page-level orientation 自检：** 多页 web 版本里，每个明细页面（walkthrough / patterns / design-choices / file-map）的第一张详细卡之前，有没有一句话总任务、顶层全景图、全索引表？
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

