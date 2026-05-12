# Web app visuals

Use this reference when implementing the rendered web app — `styles.css`,
per-page CSS, fonts, color, layout chrome, and the visual treatment of every
component named in `references/web-app-structure.md`.

Other references describe **content shape**（什么字段、几个 section、orientation
是什么）。This file describes **页面长什么样**——字体、配色、stage 编号多大、
code block 有没有 mac chrome、pull-quote 用什么修辞、challenges 区怎么编号。

## Scope (2026-05)

校准目标是 `examples/nuwa-skill/web-app/`。当前迁移状态：

- **walkthrough.html — 编辑杂志体（已校准）**。Noto Serif SC 大标题 + 巨号斜体
  stage 编号 + 暗色代码块 mac chrome + italic pull-quote + Q01/Q02 编号练习。
  这是这一节描述的目标形状。
- overview / glossary / file-map / design-choices / patterns / apply-it — 米色
  现代编辑体（旧版）。会逐页迁移；在迁移完成之前，校准目标是混合状态。

新写一个 skill 的 web app 时，如果只能跟一页对齐视觉，跟 walkthrough.html。

## 视觉论点（visual thesis）

一句话：**这是一本印出来的书，不是一个 docs 站**。读者读 walkthrough 应该有
读长文特稿的呼吸感——大开本、留白多、字号大、段落慢、视觉锚点是 stage 编号和
pull quote 不是侧边导航。

具体几条：

- 字体先讲故事。Noto Serif SC 担正文和大标题，JetBrains Mono 只在代码 / 元信息
  里出现。Inter / Roboto / 系统 sans 不上场。
- 配色克制到只有一个强调色（深红 #8a1c0f）。其它都是纸色 + 墨色梯度。
- 视觉锚点只用 typography 不用阴影。stage 编号用 96-168px 的斜体大数字做锚——
  比加边框、加阴影、加圆角的卡片化处理更安静也更有分量。
- 代码块是反差插入。整页是纸色，代码块是 #161210 暗底——这一对反差让代码不需
  要边框、不需要 label 就能被一眼定位。

如果你发现自己在加渐变、加阴影、加多色系——回到这一条重读。

## Tokens

写进 styles.css 顶部的 `:root`（如果是 walkthrough scoped，写进
`body[data-page="walkthrough"]`）：

```css
/* paper / ink */
--paper: #f6f1e6;            /* 主背景，纸色 */
--paper-2: #ede6d4;          /* 次级表面：pretest / quickref / challenges */
--ink: #1a1410;              /* 正文 */
--ink-2: #4a3f33;            /* 次级文本：summary 斜体、lede */
--ink-mute: #8a7a66;         /* 弱文本：eyebrow、masthead meta */
--rule: #d8cdb6;             /* 分隔线、卡片边界 */

/* single accent — oxblood，全本只这一种强调色 */
--accent: #8a1c0f;
--accent-soft: rgba(138, 28, 15, 0.08);
--accent-line: rgba(138, 28, 15, 0.35);

/* dark inset：代码块专用 */
--night: #161210;
--night-2: #221c18;
--night-text: #ece3d0;
--night-mute: #948876;
--night-rule: #2e2620;

/* fonts */
--serif: "Noto Serif SC", "Source Han Serif SC", "Songti SC", "STSong",
         Georgia, "Times New Roman", serif;
--sans:  "PingFang SC", "Hiragino Sans GB", -apple-system, BlinkMacSystemFont,
         "Segoe UI", "Microsoft YaHei", sans-serif;
--mono:  "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
```

正文是 serif，font-size 17.5px，line-height 1.78。eyebrow / kicker / 元信息
是 sans，11-12px，letter-spacing 0.22-0.32em，uppercase。代码 / inline code 是
mono。

**禁止**：把 sans 用在正文段落（会立刻变成现代 docs 风格，丢掉本书的气质）。
**禁止**：在 walkthrough 页里出现第二种强调色（蓝 / 绿 / 紫等）。一个 accent
就够了，多了就稀。

## 组件形状

### Masthead（顶栏）

不是侧边栏，是顶端横条。

- 左边：`❖ 女娲 · 解剖手册` + `章 02 / Walkthrough`（kicker，sans uppercase 11px
  letter-spacing 0.22em）
- 右边：`UI Mock · v1` 之类的版本信息
- 下方一条 1px 分隔线（var(--rule)）

❖ 是单 accent 字符，不要换 emoji 或别的符号——这是一种贯穿全本的"印记"。

### Hero

- 高度大：上下 padding 80-96px。
- `eyebrow`：sans，accent 色，11-12px，letter-spacing 0.32em，uppercase，
  后面跟一段 64px 的横线。
- `h1` title：serif，font-weight 900，clamp(56px, 9vw, 132px)，line-height 0.95，
  letter-spacing -0.03em，max-width 14ch（让标题两行折）。
- `subtitle`：serif italic，22-30px，line-height 1.4，max-width 28ch。
- `lede` 正文 prose：serif 18px line-height 1.8，max-width 56ch。允许 1-2 段。
  其中关键词用 `<strong>` + 一条黄色 highlight 背景：
  `background: linear-gradient(transparent 60%, rgba(232, 200, 90, 0.45) 60%)`。
- 末尾一条 96px 的黑色短横线 hero-rule 收尾。

### Index bar（全 N 个阶段索引）

- 一个 sans uppercase 的小 label：`全 14 个阶段 · 点击跳转`。
- 下面一个 `grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))` 的
  网格，每个 item：左斜体 accent 色数字编号，右 serif 14.5px 标题。
- hover：accent-soft 背景 + 左 padding 10px 推进（轻微位移）。
- item 之间用 1px var(--rule) 分隔，不要用卡片化处理。

**禁止**：用阴影、圆角卡片来包 index item——会破坏报章感。

### Stage（核心组件）

每个 stage 是一个 section，padding 80-120px 上下。各 stage 之间用 1px
var(--rule) 分隔。

#### stage-head

三栏 grid：`minmax(160px, 1fr) minmax(0, 720px) minmax(80px, 1fr)`。

- 左栏：**巨号斜体数字** `01`-`14`，serif italic 900，clamp(96px, 14vw, 168px)，
  line-height 0.85，accent 色，text-align right，letter-spacing -0.03em。这是
  视觉锚点，跨页一致出现。
- 中栏：kicker（sans uppercase）+ title（serif 700，28-40px）+ summary
  （serif italic 20px，左边 2px accent 竖线，padding-left 20px）。
- 右栏：留空（视觉呼吸用，不要塞元信息进去）。

#### pretest（先猜一遍）

- `--paper-2` 背景 + 左 3px var(--ink) 实心竖线（不是 accent 色）。
- 右上角一个 56px 斜体大 `?` 字符，opacity 0.1——做装饰底图，不喧宾夺主。
- label：sans uppercase 10.5px letter-spacing 0.24em：`先猜一遍 · pre-test`。
- body：serif 16px line-height 1.72。

#### narrative（正文叙事）

- serif 17.5px line-height 1.85。
- `<strong>` 默认 ink 色 700；但**段首第一个 strong 是 accent 色**——
  `.narrative p strong:first-child { color: var(--accent); }`。这是用来强调
  「问题 / 默认 AI 本能 / 女娲的反推」这种关键开头词的。
- 列表：`list-style: none` + `padding-left: 0`，每个 `<li>` 用 `position: relative;
  padding-left: 28px;` + `::before { content: "—"; color: var(--accent); }`
  做 em-dash 项目符号。

#### code-block（暗色代码块）

整本里最强的反差插入。

- 背景 `var(--night)`，圆角 6px，左右 margin -8px（让它略微超出正文宽度）。
- 顶部 `code-chrome` 横条：左边 3 个 10px mac 风圆点
  （红 #e86d60 / 黄 #e8c460 / 绿 半透明），右边 sans uppercase 10.5px 的语言标签
  `MARKDOWN` / `BASH` / `ASCII` 等。
- pre 内容：mono 12.5px line-height 1.7，color var(--night-text)，
  white-space: pre，padding 22px 24px。
- 阴影：`0 24px 40px -24px rgba(26, 20, 16, 0.35)`——只在底部投一道很轻的暖
  阴影，不要四周等距的 material shadow。

### move（pull-quote 形式的「这里能偷的招」）

不是 callout box，是一段 pull quote。

- 上下两条 1px var(--ink) 黑线，padding 36px 上下。
- 左上角一个 140px 的斜体 accent 色 `"` 字符，opacity 0.18，绝对定位 top: -38px
  left: -24px——做大引号水印。
- label：sans uppercase 11px letter-spacing 0.28em accent 色：`这里能偷的招`。
- body：serif italic 500，22px，line-height 1.55，max-width 36ch，ink 色。
  内容写得像一句格言，不要写成一个总结句。

### quickref（七字段速查 collapsed details）

7 字段不是默认阅读路径——叙事才是。所以 quickref 折叠成 `<details>`。

- 1px var(--rule) 边框 + 4px 圆角。
- summary：sans uppercase 11.5px letter-spacing 0.18em：`七字段速查 · Stage metadata`。
  右边一个 `+` / `−` 切换标记（serif 22px accent 色，靠 `[open]` selector 切）。
- 展开后每行两栏：左 140px 的 qr-label（sans uppercase 11px accent 色），右
  qr-body（serif 15px line-height 1.65 ink-2 色）。
- 行之间用 1px var(--rule) 上分隔。

### challenges（练习区，明确给读者不是 AI）

每个 stage 末尾。和正文有视觉断开——不能让读者以为这是 AI 内心独白的延伸。

- `--paper-2` 背景 + 4px 圆角。
- 顶部一条 3px 实心 accent 横线（绝对定位 top: 0 left: 36px right: 36px）——
  这是「划过来分隔正文 / 练习」的标志。
- 标题：serif italic 700，24px，accent 色：`你的练习`。
- sub：sans italic 12px，ink-mute 色：`不是 AI 的内心独白——是给读这本手册的你
  的题。先想再读下一阶段。`
- list 用 CSS counter：`Q01` `Q02` `Q03`——serif italic 900，18px，accent 色，
  绝对定位左侧。每题 padding-left 56px。

**禁止**：用 emoji（🤔 等）做练习区标识。Q01/Q02 编号已经够强；emoji 会破坏
报章感。

### end-mark（章尾标记）

- 三个 ❖ 字符，serif 28px，accent 色，letter-spacing 0.6em。
- 下面一段 serif italic ink-mute 色：`章 02 / Walkthrough — 完`。
- 居中。

## site.js 渲染层的约束

walkthrough 页面渲染时**不要走默认 layout()**（layout 会强制套侧边栏）。直接
渲染进 `#app` / `<main>`。其它页面继续走 layout()——sidebar 留给那些页。

stage 字段映射（不能少）：

| stage 字段 | 渲染位置 |
| --- | --- |
| `id` | section 锚点 |
| `title` | stage-title h2 |
| `summary` | stage-summary（italic 左竖线） |
| `preTest` | pretest 区 |
| `narrativeBody[]` | narrative 主体（para / list / code / diagram） |
| `reusableMove` | move pull-quote |
| `receives` / `reads` / `blockedShortcut` / `action` / `output` / `nextConsumer` | quickref 七行 |
| `challenges[]` | challenges Q01/Q02 编号列表 |

## 自检

写完一个 walkthrough 页面之后：

- 翻开浏览器，第一眼看到的是 stage 编号那个 96-168px 斜体大数字吗？看不到 → typography 不够分量，回去检查 clamp 值有没有被覆盖。
- 整页只有一种强调色（深红）吗？出现了第二种 → 回去删掉。
- 代码块周围是不是纸色 + 暗块的强反差？如果代码块也是浅色（边框 + 浅灰底）= 没装上 night tokens，回去修。
- pull-quote 那段读起来像一句格言吗？还是像一句总结？是总结 → 重写 reusableMove 字段直到它能独立成句。
- challenges 区是不是和正文有视觉断开（背景色 + 顶部 accent 横线）？没断开 → 读者会以为这是 AI 内心独白，回去补 challenges-rule。
- 朗读 hero 的 h1 + subtitle + lede——能不能一口气念完不停顿？念到中间要停 = 字号 / 行距 / max-width 没调好，节奏跟不上。

## 校准样板

`examples/nuwa-skill/web-app/pages/walkthrough.html` 渲染后的页面 +
`examples/nuwa-skill/web-app/assets/styles.css` 里 `body[data-page="walkthrough"]`
作用域内的 CSS + `examples/nuwa-skill/web-app/assets/site.js` 里 `walkthrough()`
渲染器。三处任何一处对不上，就以校准目标为准。
