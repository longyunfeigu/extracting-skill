# Stage writing rules

Use this reference when writing or reviewing the stage walkthrough, terminology
explanations, narrative handoffs, or any section where the AI's step-by-step
working path is the main subject.

## 1. First explain the concept, then use the name

Every domain term from the source skill must be introduced before it is used as
if the reader already knows it.

术语介绍分两层。**第一层 mandatory，第二层 when useful。**

### 第一层（mandatory）· 就地短解

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

### 第二层（when useful）· 5 字段 concept card

只有少数（1-3 个）真正承担设计重量、第一层一句话讲不清的核心术语，值得
展开成 5 字段 card：

```markdown
#### `<term>`

**定义：** <一个具体的"值"作为解释主体，不是抽象描述>

**它在哪个 stage 出现：** <Walkthrough 第 N 阶段，那一段真正用到它的位置>

**它解决什么问题：** <bad output or confusion it prevents>

**我作为 AI 怎么用它：** <那个 stage 里真实发生的动作，引用 walkthrough 里同一份真材料>

**容易误解：** <what it is not，最好对比另外一个相近术语>
```

Card 通常单独成节，或集中进 glossary 章。哪些术语值得 promote 到 card？
判定标准：**这个术语如果误解了，整本手册后面好几个 stage 都会跟着误解。**

#### 关键写法：用具体的值，不要用抽象定义

5 字段 card 最常见的坏写法是把每个字段写成抽象描述——「他遇到新问题用的镜片 / Phase 2.1 产物 / 让 skill 能面对新问题做判断 / 三重验证筛 / 不是观点也不是建议」。读完五条全是抽象名词堆叠，读者闭眼能背但不知道任何一个具体的值长什么样。

正确的写法是 **「定义」字段直接用一个真值作为主体**——例如解释「心智模型」时不要写"他看世界的镜片"，要写：

> 塔勒布的「反脆弱偏好」——他看一个系统时先问的不是"这个能不能优化"，而是"它受压会变强还是崩溃"。同一个问题，普通人本能问前者，他本能问后者。
>
> 更具体一点：他判断一个系统时，不先看它现在多成功、多稳定、多高效，而是看它面对压力和不确定性时的反应。如果一点波动就毁掉它，那是脆弱；如果波动只让它疼一下但能逼它学习、进化、获得机会，那才是他真正偏好的结构。

这一个具体值就同时回答了"这是什么"+"它和别的有什么区别"——抽象定义做不到。

后面 4 个字段必须用同一个具体值（或同一组具体值）贯穿——「它在哪个 stage 出现」直接 link 到 walkthrough 里那个真值出现的位置（"Walkthrough 07 三重验证里——反脆弱过了跨域复现 + 生成力 + 排他性三道筛"），「我作为 AI 怎么用它」复用 walkthrough 里那段真表格的字段，「容易误解」用同一个值做对比（"反脆弱不是他相信的事——那是价值观；不是他给的建议——那是启发式"）。

判定违规：5 字段里出现 ≥ 3 个「Phase X 的产物 / 数量 / 占比」这类元描述但没有任何一个真值——抽象定义 = 没说清楚。

### Glossary 页的定位

Glossary 是**深度卡片集合**，给想系统过一遍术语的读者用。它**不替代**
正文里的就地短解——读者读 walkthrough 时不应该被迫跳出去查。Glossary 页
的 lede 也不能写"先读这一章再去 Walkthrough"——这是把责任推给读者。
正确的关系是：walkthrough 里有就地短解保证当下读得动，glossary 里有 card
保证想深究时找得到。两层都要有。

**Glossary 不是孤立词典。** 每条术语必须 link 回 walkthrough 里它真出现的那个
stage——「这一段在 Walkthrough 07 那段三列筛选表里实际跑了一遍」。读者从
glossary 跳回 walkthrough 看到真表格、从 walkthrough 跳到 glossary 看到深度解释，
两边互相印证。Glossary 和 walkthrough 之间互不引用 = 抽象孤岛。

## 6. Each stage opens with a pre-test, carries real material, ends with challenges

A handbook is a teaching document, not a structured reference card. To stop the
handbook from degrading into "fill 7 boxes per stage," each stage must:

### Open with a pre-test hook

Use "你和我同坐一椅" framing so the reader is invited to guess the next move
before reading what the AI did. Do **not** address the reader directly with
"你是这个 AI"—that switches POV. The main narrative continues "我...".

```markdown
**先猜一遍：** 设想你和我坐同一把椅子上。<具体当前状态描述>。
你下一步的本能是 <X> 还是 <Y>？写下来再读下面我（被 skill 拦着的 AI）实际怎么走。
```

### Carry concrete material in the narrative

The 7-field structure is reference data, not teaching. Each stage's main body
must include at least one of:

- a real text excerpt;
- a real prompt the AI sends to the user;
- a real command or output trace;
- a real markdown / JSON / TS sample showing the actual artifact shape.

The 7 fields are demoted to a collapsible "快速参考" panel below the narrative.
A reader who wants a checklist can expand it; the default reading mode is
narrative.

### End with a challenges block

Challenges address the reader as a future skill author, not the AI running this
skill. To prevent POV pollution of the main narrative:

- Challenges must be in a visually distinct block.
- The block label must say something like "不是 AI 的内心独白——是给读这本手册的你的题".
- Include 3-4 questions per stage, drawn from real edge cases the skill has
  actually encountered.

```markdown
🤔 你的练习（不是 AI 的内心独白——是给读这本手册的你的题。先想再读下一阶段。）

1. <边界 challenge: 用户给的输入超出了 stage 1 分流表覆盖的情况, 怎么办?>
2. <冲突 challenge: 这条规则和那条规则在某场景下冲突, 优先级是什么?>
3. <代价 challenge: 这条规则的成本在某规模下不划算, 该不该简化?>
4. <边缘 challenge: stage 没明确说的边界, 怎么判断?>
```

## 10. Stage 之间必须用叙事钩子串成因果链

同样一份事实，写成"我产出 X → 下一步用 X"是物料流；写成"上一步存的钱
在这里花/这一步存了什么钱，下一步要靠它做什么"是故事。

每个 stage 在正文里有两个钩子，分别开头和结尾。

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
- 5.X 结尾的"下一步靠这个"和 5.X+1 开头的"接上一步"必须说同一件事。

**反例：**

- ❌ `**接上一步：** 上一步我做了 X。`（这是物料流换了个标签）
- ✅ `**接上一步：** 上一步我留下了 X，所以这一步我能 Y 而不是只能 Z。`
- ❌ `**下一步靠这个：** 下一步要 checkpoint。`（只描述下一步在做什么）
- ✅ `**下一步靠这个：** 现在所有东西都还是文本，改一次几乎不花时间。等
  React 写完、CSS 调完、音频合成完，任何一个方向错了改回去都要重来一遍。
  所以下一步必须停。`

整本书读完应该形成的弧：这个 AI 从"老想抄近路"到"明白每个停顿都在赎
前面的债"。如果读完只记得文件名，没记得这条弧，钩子没起作用。

## 11. 讲故事的声音，不是文档的声音

**读者画像（必须先固定）：** 默认读者是个想偷招的同行——但他**第一次接触
这个 skill 解决的那个问题领域**。他能看懂 React、能看懂 markdown、能看懂
shell 脚本，但他不知道"为什么这个 skill 用 4 个阶段不是 3 个"、不知道
`narrations.ts` 在这条流水线上承担什么。

### 11.1 一段一件事

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

### 11.2 用问句或场景把读者拉进来，不要用规则开头

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

### 11.3 工程缩写不替代描述

工程师之间习惯用 3 字压缩来高效沟通："硬节点"、"流水线"、"返工成本"、
"真相源"、"锚点"、"降级"、"信息池"。这些词对刚进领域的读者是黑话。

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

这条针对的是**手册作者自己的写作选词**，不是 source skill 里的术语名。
source skill 的固有名词必须保留原名，但要用大白话讲清楚它在干什么。

### 11.4 例子先，抽象后

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

## 12. 每个 stage 必须把"输入 / AI 干什么 / 产出 / AI 自由度"四件事讲清楚

读者读完每一段叙事，闭眼应该能背出：

1. **这一步 AI 干什么** —— 写代码 / 写文本 / 跑命令 / 问用户 / 自检 / 等用户答。
2. **AI 拿到什么输入** —— 具体的文件或数据，标明来自上游哪个 stage。
3. **AI 产出什么** —— 具体的文件或数据，标明给下游哪个 stage 用。
4. **AI 在这一步有多大自由度** —— 几乎没自由 / 有限自由 / 创作自由。

### 12.1 输入和产出必须各自用真材料展示，不能只命名

**不能写：** "输入是 outline 第 1 章段落"。
**要写：** 把那个段落的真实 markdown 内容摘出来贴在叙事里。

**不能写：** "产出 Chapter.tsx"。
**要写：** 把 Chapter.tsx 真实代码贴一段（最关键的一两个分支就够，不要全文）。

每个 stage 叙事至少展示：

- 一段真实输入（摘自上游产出物或外部来源）
- 一段真实产出（本 stage 写出来的东西）

### 12.2 AI 有创作自由的 stage 必须展示"默认本能 vs 被约束后"

每个让 AI **写代码、写文本、写设计、写文案**的 stage，叙事里必须明确回答
"AI 自由发挥，不会乱写吗？"

1. 承认 AI 默认会发散。
2. 指出 skill 怎么把 AI 的选择空间卡住。
3. 至少给一个真 before/after 对比。

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

### 12.3 几乎没创作自由的 stage 要主动说"这里没什么发散"

如果这一步 AI **几乎没自由**——比如把 `script.md` 切成 `narrations.ts` 数组，
顺序 / 长度 / 语义都已经被上游钉死——叙事里必须主动说一句：

> 这一步 AI 几乎没发散空间，因为 script.md 已经把每一句话、关键数字、
> 语气钉死了。AI 在这里能做的事只有：(1) 顺序按 step 0..N 排；(2) 数组长度
> 等于 step 数；(3) 关键短语不能丢。

不说 = 读者每读一个新 stage 都要重新评估"这里有没有笼子"，认知负担高。

## Stage self-check

- 读者闭眼能背出"AI 干什么 / 输入 / 产出 / 自由度"四件事吗？
- 输入和产出各有一段真材料吗？还是只命名没内容？
- 这一步 AI 有没有创作自由？如果有，叙事里有没有至少一处"默认本能 vs 被约束后"？
- 如果几乎没创作自由，叙事里有没有主动说"这里没发散空间，因为上游已经把 X 钉死"？
- 每个 stage 开头有 `**接上一步：**` 一行钩子吗？第一站用 `**从这里开始：**`。
- 每个 stage 结尾有 `**下一步靠这个：**` 一行钩子吗？最后一站用 `**这里把账结清：**`。
- 写完这个 stage 后有没有立刻过 page voice gate？也就是反装样自检、去 AI 味自检、
  朗读可行性检查。去 AI 味要额外扫假共情、假深刻、自我标榜、万能模板、
  排比堆砌。命中 blocking issue 要先修，不要留到整章写完再统一清。
