# Skill 解剖手册格式

Use this reference for every run of this skill. It defines the only output format
the skill produces: a multi-page handbook (可作为 web 文档站结构) that walks
through how a skill runs from the perspective of the AI using it.

For a complete sample handbook, read `examples/web-video-presentation/handbook.md`
(the first 1-2 sections are enough for voice calibration). Samples live under
`examples/<skill-name>/` and are calibration targets, not templates — do not
copy their content or stage structure into a new handbook.
For the rendered web app shape, see `examples/web-video-presentation/web-app/`.

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

## Non-Negotiable Rules

### 1. First explain the concept, then use the name

Every domain term from the source skill must be introduced before it is used as
if the reader already knows it.

术语介绍分两层。**第一层 mandatory，第二层 when useful。**

#### 第一层（mandatory）· 就地短解

任何领域术语**第一次**在 walkthrough / design-choices / patterns / file-map
的正文里出现时，必须带就地短解。写法二选一：

- **行内括号：** `` `script.md` (能念出口的口播节拍稿) ``
- **stage 开头的概念预告小段：**
  > 这一步会用到 `SCRIPT-STYLE.md`、节拍稿、节拍点——分别是 <一句> /
  > <一句> / <一句>。

**就地短解的写法规则：**

- **长度软指导：一行内（中文约 25 字以内），一口气念得完。** 超过这个长度
  说明这个术语承担的设计重量大，promote 到第二层 concept card，不要硬塞
  50 字到行内括号里。
- **不能用行话解释行话。** ❌ `Checkpoint Plan (硬节点 hard gate)`——"硬节点"
  "hard gate"都是新行话；✅ `Checkpoint Plan (文本都在手里、还没写代码的最
  便宜返工点)`。
- **目的是让读者不离开当前段落就能跟上**——不允许把读者推到 glossary 页查。
  Glossary 是深度参考，不是就地短解的替代品。

Bad（违反第一层）：

```text
我先生成 script.md，按 SCRIPT-STYLE.md 三层标准改写，注意保留节拍点。
```

Good（满足第一层）：

```text
我先生成 `script.md`（能念出口的口播节拍稿），按 `SCRIPT-STYLE.md`
（口播稿三层标准：形式 / 风骨 / 念出来）改写，注意保留 `---` 切的节拍点
（每个节拍点大致对应一个 step）。
```

#### 第二层（when useful）· 5 字段 concept card

只有少数（1-3 个）真正承担设计重量、第一层一句话讲不清的核心术语，值得
展开成 5 字段 card：

```markdown
#### `<term>`

**人话解释：** <one plain explanation>

**它出现在哪个场景：** <the concrete moment where the AI needs it>

**它解决什么问题：** <bad output or confusion it prevents>

**我作为 AI 怎么用它：** <how the skill makes the agent use it>

**容易误解：** <what it is not>
```

Card 通常单独成节，或集中进 glossary 章。哪些术语值得 promote 到 card？
判定标准：**这个术语如果误解了，整本手册后面好几个 stage 都会跟着误解。**
比如 `narrations.ts`（运行时真相源），它不是简单一个文件名，是整个 skill
"谁说了算"那条逻辑的具象——值得 card。`script.md` 是中间产物，就地短解
够了。

#### Glossary 页的定位

Glossary 是**深度卡片集合**，给想系统过一遍术语的读者用。它**不替代**
正文里的就地短解——读者读 walkthrough 时不应该被迫跳出去查。Glossary 页
的 lede 也不能写"先读这一章再去 Walkthrough"——这是把责任推给读者。
正确的关系是：walkthrough 里有就地短解保证当下读得动，glossary 里有 card
保证想深究时找得到。两层都要有。

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

#### 2.1 多页 web 版本：每个明细页面必须自含 page-level 高层 orientation

整本手册"先高后低"在单文件 Markdown 里靠章节顺序就够。多页 web 版本不一样
——读者会直接从搜索 / 链接 / 好奇心落到 `walkthrough.html` `patterns.html`
`design-choices.html`，前面的高层铺垫他全没看见。

因此，每一个"明细列表型"页面（walkthrough / patterns / design-choices /
file-map），在**第一张详细卡片之前**，必须有一个 page-level orientation 区块，
由这三件构成（按这个顺序排）：

1. **一句话总任务。** 复述这条流水线上 AI 在干的事。可以直接复用 overview
   页那句。让落到这页的读者第一眼就知道"我在哪条流水线上"。

2. **一张顶层全景图（code-native，只画大阶段，不展开 stage 节点）。**
   - walkthrough 页：流程图。3-6 个大盒子代表大阶段，每个盒子标"阶段名 ·
     N stages"，节点之间用箭头表示推进关系。**不要**把全部 stage 当节点画上
     去——14 个节点带文字会变成噪声，图的全部价值是让大脑 1 秒看懂拓扑。
   - patterns 页：pattern 关系网络图，按 Rule 8 的 `relatedPatterns` 边画。
   - design-choices 页：可选。如果设计选择之间有依赖关系，画依赖图；否则跳过。
   - file-map 页：包结构图 / 真相源图。

3. **一张全索引表（一行摘要 + 锚点跳转）。**
   walkthrough 页：N 行表，每行 `stage 名 — 一行 summary`，点击跳到下面的
   详细卡。表负责"每段具体干啥"——图说不下的文字摘要由它扛。
   patterns / design-choices 页同理。

**图和表的分工要清晰**：图负责"形状 / 拓扑 / 我在哪段"，表负责"摘要 / 跳转 /
每段干啥"。不要让一张图同时承担拓扑和明细——14 个节点带文字一定会糊。

**错位症状（这就是为什么要加这条规则）：** 读者落到 walkthrough.html，第一眼
看见 stage 1 的详细卡——他既不知道总共多少 stage、也不知道这是流水线的哪
一段、也没看见流程图。等他翻到最底下才看见流程图，但前面的卡片细节已经全
咽下去，flow 在记忆里没有锚点。

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

### 10. Stage 之间必须用叙事钩子串成因果链

同样一份事实，写成"我产出 X → 下一步用 X"是物料流；写成"上一步存的钱
在这里花/这一步存了什么钱，下一步要靠它做什么"是故事。

物料流的代价：读者合上手册，记得住一串文件名，记不住 skill 为什么这样
设计。每个 stage 闭环、独立、可读，但整本书不留下一个连贯的因果链。

要求：每个 stage 在正文里有两个钩子，分别开头和结尾。

```markdown
### 5.X <stage name>

**接上一步：** <一两句：上一步存的钱在这里花 / 这一步可以做什么 / 不用做什么>

<原有正文 + 7 字段速查 + 真实材料 + challenges>

**这里能偷的招：** ...

**下一步靠这个：** <一两句：这一步存了什么钱 / 下一步要靠这个做什么 / 不靠这个会怎么坏>
```

第一站把"接上一步"换成"**从这里开始：**"。最后一站把"下一步靠这个"
换成"**这里把账结清：**"。

**写法准则：**

- 一两句，不要写成一段。
- 写"这一步可以做什么 / 不用做什么"，不要写"skill 拦着我不让我 X"。
  钩子的作用是让读者站在收益方，不是站在拦路虎对面。
- 5.X 结尾的"下一步靠这个"和 5.X+1 开头的"接上一步"必须说同一件事——
  5.X 那边在埋钩子，5.X+1 这边在接同一个钩子。两边对不上，链就断了。

**反例：**

- ❌ `**接上一步：** 上一步我做了 X。`（这是物料流换了个标签）
- ✅ `**接上一步：** 上一步我留下了 X，所以这一步我能 Y 而不是只能 Z。`
- ❌ `**下一步靠这个：** 下一步要 checkpoint。`（只描述下一步在做什么）
- ✅ `**下一步靠这个：** 现在所有东西都还是文本，改一次几乎不花时间。等
  React 写完、CSS 调完、音频合成完，任何一个方向错了改回去都要重来一遍。
  所以下一步必须停。`

**整本书读完应该形成的弧：** 这个 AI 从"老想抄近路"到"明白每个停顿都
在赎前面的债"。如果读完只记得文件名，没记得这条弧，钩子没起作用——
回去重写。

### 11. 讲故事的声音，不是文档的声音

前面 10 条规则管"该写什么"。Rule 11 管"用什么声音写"。

**读者画像（必须先固定）：** 默认读者是个想偷招的同行——但他**第一次接触
这个 skill 解决的那个问题领域**。他能看懂 React、能看懂 markdown、能看懂
shell 脚本，但他不知道"为什么这个 skill 用 4 个阶段不是 3 个"、不知道
`narrations.ts` 在这条流水线上承担什么。所以你不是写给"已经懂的工程师"，
是写给"想懂但还没进来的工程师"。

这条画像不固定，下面所有要求都会被绕过——AI 会本能写给"跟自己一样懂的人"，
因为那样最省事。

#### 11.1 一段一件事

**坏写法（一段 4 件）：**
> 我现在拿到的是 article.md，skill 不让我直接开建项目，让我先按 SCRIPT-STYLE.md
> 把它改成 script.md，理由是书面文章不能直接念，后面的章节切分还要靠这一步埋的
> 节拍点。

**好写法（拆 4 段，每段一件）：**
> 我手里有一份 article.md。用户的请求是"做成视频"。
>
> 第一秒我的本能是打开编辑器开始写 React 组件。
>
> skill 不让。它说先停——这份文章不能直接搬到视频上念。
>
> 为什么不能？因为书面句子念出来卡：长被动、修饰从句、转折词——人开口说话
> 不长这样。

读者一次只能消化一件事。把"做什么 / 为什么 / 怎么做 / 谁用"塞一段，读者
会跳着扫，记不住任何一件。

#### 11.2 用问句或场景把读者拉进来，不要用规则开头

**坏写法（规则在前）：**
> 自检必须接修复——审阅清单不接修复动作只是仪式。

**好写法（场景在前）：**
> 你和我盯着这份草稿。reviewer 报告里有 3 项 fail。
>
> 你下一步是什么？
>
> 我的本能是把这 3 项 fail 抄到回复里告诉用户"自检发现这些问题"——
> 听起来很专业，对吧？但 skill 把这种做法叫"装饰"——我只是把问题转了一手
> 给用户，没修任何东西。

每个 stage 开头已经有 pre-test 套路（Rule 6），Rule 11 是要求这种"先场景、
再规则"的节奏渗透到正文段段，不只是 stage 开头。

#### 11.3 工程缩写不替代描述

工程师之间习惯用 3 字压缩来高效沟通："硬节点"、"流水线"、"返工成本"、
"真相源"、"锚点"、"降级"、"信息池"。这些词**对工程师之间**是清晰的，
对刚进领域的读者是黑话——他得先猜这个词在这个 skill 里指什么。

替换表（这些是常见高发词，不限于此）：

| 工程缩写 | 写出来的样子 |
|---|---|
| 硬节点 / 硬规则 / 硬性 | 必须停下来对齐，跳过就坏 |
| 流水线 | 从头到尾这一连串步骤 |
| 返工成本 | 改回去要花多少时间 / 改起来贵不贵 |
| 真相源 | 出现冲突时以这个为准 |
| 锚点 / 风格锚点 | 拿来对齐别的东西的那一个标杆 |
| 降级 | 做不到最好就退一档 |
| 信息池 | 这一章能挂的事实列表 |
| 漂移 / 退化 | 悄悄变得对不上了 |
| 失败模式 | 做坏了的样子 |
| 入口和路由 | 第一个被读的文件，决定后面读哪些 |

**适用范围：** 这条针对的是**手册作者自己的写作选词**，不是 source skill 里
的术语名。source skill 给文件起名叫 `narrations.ts`、给流程段起名叫
"Phase 1.1"、给硬节点起名叫 "Checkpoint Plan"——这些是 source skill 的
固有名词，**必须保留原名**，但要用大白话讲清楚它在干什么（Rule 1 的就地短解）。

#### 11.4 例子先，抽象后

**坏顺序：**
> 这一步用"双源原则"——节奏源和细节源分别管不同维度，下游章节实现两边都要查。

**好顺序：**
> 我手里有两份东西：能念的口播稿 `script.md`，和用户给的原文 `article.md`。
>
> skill 不让我把 article.md 删掉——虽然我"已经把它改成 script.md 了"看起来
> 它没用了。
>
> 为什么留？因为后面写每一章网页时，画面里要挂具体数字（64% / 89%）、
> 引用、案例——这些 script.md 里没有，被压成口语化的"准确率提了一截"。
> 我要回原文找。
>
> 这条规则在 CHAPTER-CRAFT.md 里有个名字，叫"双源原则"。

抽象在最后给读者，作为"刚才你看到的那个具体情况，我们叫它 X"——这样
"X" 对读者来说是已经经历过的事，不是凭空冒出来的名词。

#### 自检（写完每章扫一遍）

- 把整段拷出来，问一个不在这个 skill 领域里的工程师朋友："你读完这一段，
  能不能用自己的话讲一遍这一步在做什么？"讲不出 = 失败。
- grep 你自己的草稿，看有没有上表里的高发词。有就重写。
- 段落首句是规则还是场景？规则开头 = 重排，把场景挪到前面。

### 12. 每个 stage 必须把"输入 / AI 干什么 / 产出 / AI 自由度"四件事讲清楚

Rule 6 要求每个 stage 有真实材料；Rule 12 进一步要求那些真材料**结构化地
回答 4 个具体问题**。

读者读完每一段叙事，闭眼应该能背出：

1. **这一步 AI 干什么** —— 写代码 / 写文本 / 跑命令 / 问用户 / 自检 / 等用户
   答 / 其它哪一种动作。一个动词。
2. **AI 拿到什么输入** —— 具体的文件或数据，标明来自上游哪个 stage。
3. **AI 产出什么** —— 具体的文件或数据，标明给下游哪个 stage 用。
4. **AI 在这一步有多大自由度** —— 几乎没自由（机械搬运）/ 有限自由（被
   规则文件夹住）/ 创作自由（画面、动画、文案）。

如果读者读完只能复述"按 X.md 走一遍"这种抽象描述，这一段就是漏的——
不管它有多长。

#### 12.1 输入和产出必须各自用真材料展示，不能只命名

**不能写：** "输入是 outline 第 1 章段落"。
**要写：** 把那个段落的真实 markdown 内容摘出来贴在叙事里。

**不能写：** "产出 Chapter.tsx"。
**要写：** 把 Chapter.tsx 真实代码贴一段（最关键的一两个分支就够，不要
全文）。

每个 stage 叙事至少展示：

- 一段真实输入（摘自上游产出物或外部来源）
- 一段真实产出（本 stage 写出来的东西）

输入和产出都抽象掉，读者就不知道这一步到底输入什么、产出什么——这条
stage 漏了 12.1。

#### 12.2 AI 有创作自由的 stage 必须展示"默认本能 vs 被约束后"

读者读 walkthrough 时心里有一个本能疑问：

> "AI 自由发挥，不会乱写吗？"

每个让 AI **写代码、写文本、写设计、写文案**的 stage，叙事里必须明确
回答这个疑问。三步：

1. **承认 AI 默认会发散。** 一句话点出来：AI 默认本能会怎么写——选凭感觉
   漂亮的颜色 / 凭直觉的动画 / 凭审美的装饰 / 朗读腔语气 / 越多 emoji 越
   "友好"。**先说 AI 不被约束会出什么样**，再说 skill 怎么约束。
2. **指出 skill 怎么把 AI 的选择空间卡死。** 通常是这几种之一（或几种叠加）：
   - 一份规则文件（决策树 / 边界表 / 红线清单）
   - 主题变量 / 模板锁住颜色字体
   - 反模式清单显式禁掉 AI 默认审美
   - 一份每次必读的 prompt 文件让 AI 在写之前先看原则
3. **至少给一个真 before/after 对比。** 默认 AI 会写什么 vs 被约束后写什么。
   一处对比就够——多了反而看不进去，读者会跳读。

下面是一个 Rule 12.2 的微缩样例（不是模板，是形状）：

```markdown
AI 默认本能会这样写 64% → 89% 这一 step：

\`\`\`tsx
{step === 2 && (
  <p className="fade-in">准确率从 64% 提到 89%</p>
)}
\`\`\`

CHAPTER-CRAFT.md 的「关系 → 动作」决策树不许。64% → 89% 是「对比 + 增长」
关系——决策树指定的动作是「两个数字同时呈现 + 颜色对比 + 中间一个上升符号」。
AI 没得挑：

\`\`\`tsx
{step === 2 && (
  <div className="ov-compare">
    <div className="ov-num ov-num-old">64<sup>%</sup></div>
    <div className="ov-arrow">↗</div>
    <div className="ov-num ov-num-new">89<sup>%</sup></div>
  </div>
)}
\`\`\`
```

#### 12.3 几乎没创作自由的 stage 要主动说"这里没什么发散"

不是所有 stage 都需要 12.2 的笼子。

如果这一步 AI **几乎没自由**——比如把 `script.md` 切成 `narrations.ts` 数组，
顺序 / 长度 / 语义都已经被上游钉死，AI 在这里干的不是创作，是搬运——
那叙事里必须主动说一句：

> "这一步 AI 几乎没发散空间，因为 script.md 已经把每一句话、关键数字、
> 语气钉死了。AI 在这里能做的事只有：(1) 顺序按 step 0..N 排；(2) 数组长度
> 等于 step 数；(3) 关键短语不能丢。"

为什么必须主动说？因为读者读到这一 stage 会本能担心"这里 AI 是不是也会
乱写"。明确说"这里没创作自由"就让读者放心，把注意力放回真正会发散
的 stage（比如写 Chapter.tsx）。

不说 = 读者每读一个新 stage 都要重新评估"这里有没有笼子"，认知负担高。

#### 自检（每个 stage 写完扫一遍）

- 读者闭眼能背出"AI 干什么 / 输入 / 产出 / 自由度"四件事吗？背不出 = 漏。
- 输入和产出各有一段真材料吗？还是只命名没内容？
- 这一步 AI 有没有创作自由？如果有，叙事里有没有至少一处"默认本能 vs
  被约束后"的 before/after？
- 如果几乎没创作自由，叙事里有没有主动说"这里没发散空间，因为上游已经
  把 X 钉死"？

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
- **就地短解自检（Rule 1 第一层）：** walkthrough / design choices / patterns / file map 里，每个领域术语第一次出现时，旁边有 5-25 字就地短解吗？读者是否不离开当前段落就能跟上？还是被迫去 glossary 页查？
- **Page-level orientation 自检（Rule 2.1）：** 多页 web 版本里，每个明细页面（walkthrough / patterns / design-choices / file-map）的第一张详细卡之前，有没有 (a) 一句话总任务 + (b) 顶层全景图 (code-native，只画大阶段) + (c) 全索引表？还是详细卡一上来就糊一脸？
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

**Pre-test / narrative material / challenges 自检（Rule 6）：**

- 每个 stage 开头有 pre-test hook 吗？写法是「你和我同坐一椅」叠合，不是「你是这个 AI」切 POV？
- 每个 stage 的主体（narrativeBody）至少含一个真实材料：文本片段 / 真实 prompt / 命令输出 / 代码样本？还是仍是「按 X.md 改写 Y」这种描述？
- 7 字段（received / read / blocked / action / output / next / reusable move）是否折叠成「快速参考」面板，让叙事成为默认阅读路径？
- 每个 stage 末尾有 challenges 块吗？视觉断开 + 「🤔 你的练习」标签 + 一句「不是 AI 内心独白」的提示？challenges 是真实边界（agent 真的会卡的地方）还是凑数？

**Stage 四要素 + 发散框架自检（Rule 12）：**

- 每个 stage 读完，读者闭眼能背出「AI 干什么 / 输入是什么 / 产出是什么 / AI 自由度有多大」四件事吗？背不出 = 这一段叙事漏了。
- 输入和产出**各自**有真材料展示吗？不是只命名 "input is outline 段落"，而是把那段 markdown / 代码 / JSON 真的摘出来贴在叙事里？
- AI 在这一步有创作自由的 stage（写代码 / 写文案 / 写设计），叙事里有没有至少一处「AI 默认本能 vs 被约束后」的 before/after 对比？读者读完应该明白"AI 不会乱写，因为这里被 X 锁住了"。
- AI 在这一步几乎没创作自由的 stage（机械搬运 / 切分 / 抽取），叙事里有没有**主动说**"这一步几乎没发散空间，因为上游 X 已经把 Y 钉死"？没主动说 = 读者每读一个新 stage 都要重新评估认知负担。

**Design choice 多视角自检（Rule 7）：**

- 每个 design choice 有 3 个 counterScenarios 吗？
- 三个场景的 effect 不全是「救你」吗？至少有一个是「绑你 / 部分让位 / 完全失效」之类的反向判断？
- 每个 counter 的「为什么」是具体的、可以被反驳的，还是泛泛「视情况」？

**Pattern 网络自检（Rule 8）：**

- 每个 pattern card 有 `therefore` 字段做 problem→solution 视觉断点吗？
- 每个 pattern 至少有 1 个 relatedPatterns 链接吗？9 张 card 之间是网络还是孤岛？
- relation 字段是具体关系（搭配用 / 前置 / 区别于 / 下游接管 / 对照 / 可能冲突）还是泛泛的「相关」？

**叙事钩子自检（Rule 10）：**

- 每个 stage 开头有 `**接上一步：**` 一行钩子吗？（第一站用 `**从这里开始：**`）
- 每个 stage 结尾有 `**下一步靠这个：**` 一行钩子吗？（最后一站用 `**这里把账结清：**`）
- 钩子的语气是"这一步可以做什么 / 不用做什么"，还是"被 skill 拦着不让做"？后者要重写。
- 5.X 结尾的"下一步靠这个"和 5.X+1 开头的"接上一步"说的是同一件事吗？两边对不上 = 链子断了。
- 整本书读完，能不能口述出一条"AI 从想抄近路到明白每个停顿在赎债"的弧？只能复述文件名 = 钩子没起作用。
