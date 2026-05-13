# Web app visuals

Use this reference when implementing the rendered web app — `styles.css`,
per-page CSS, fonts, color, layout chrome, and the visual treatment of every
component named in `references/web-app-structure.md`.

Other references describe **content shape**（什么字段、几个 section、orientation
是什么）。This file describes **页面长什么样**——字体、配色、stage 编号多大、
code block 有没有 mac chrome、pull-quote 用什么修辞、challenges 区怎么编号。

## 适用范围

本文件描述以下两套视觉规范——CSS tokens、字体、字号、组件形状、字段映射都在下面具体节里：

- **编辑杂志体（用于 walkthrough）**：Noto Serif SC 大标题 + 巨号斜体 stage 编号 + 暗色代码块 mac chrome + italic pull-quote + Q01/Q02 编号练习。详见下方「Tokens」+「组件形状」节。
- **戏剧三幕体（用于 design-choices）**：每个 dc 一出三幕——红印 Act I 设定 (badScenario) → 绿印 Act II 转折 (constraint) → 黑印 Act III 余波 (solvedProblem)。详见下方「Design Choices 页（戏剧三幕）」节。

其它页面（overview / glossary / file-map / patterns / apply-it）目前使用旧的米色现代编辑体。新写 skill 时如果有动力，可以也迁移到上述两套之一；若保留旧风格，本文件不强约束。

`examples/` 下有渲染好的样本可以扫一眼感受最终效果——但**规则以本文件为准**。example 跟本文件冲突时以本文件为准；example 是产出，不是规范源。

## 视觉论点（visual thesis）

一句话：**这是一本印出来的书，不是一个 docs 站**。读者读 walkthrough 应该有
读长文特稿的呼吸感——大开本、留白多、字号大、段落慢。左侧 sidebar 负责全站
导航；右侧正文的视觉锚点是 stage 编号和 pull quote。

具体几条：

- 字体先讲故事。Noto Serif SC 担正文和大标题，JetBrains Mono 只在代码 / 元信息
  里出现。Inter / Roboto / 系统 sans 不上场。
- 配色克制到只有一个强调色（深红 #8a1c0f）。其它都是纸色 + 墨色梯度。
- 右侧正文的视觉锚点只用 typography 不用阴影。stage 编号用 96-168px 的斜体大
  数字做锚——比加边框、加阴影、加圆角的卡片化处理更安静也更有分量。左侧
  sidebar 是全站导航 chrome，要保留，但它不是 walkthrough 正文的视觉主角。
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

### Masthead（右侧正文顶栏）

它在右侧正文区域内，不替代全站左侧 sidebar。walkthrough 页面仍然保留和 index
一致的左侧菜单栏；masthead 只是正文自己的章节横条。

- 左边：`❖ <Skill Name> · 解剖手册` + `章 02 / Walkthrough`（kicker，sans uppercase 11px
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
  「问题 / 默认 AI 本能 / 这个 skill 的反推」这种关键开头词的。
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

## Design Choices 页（戏剧三幕）

design-choices 页的视觉立意一句话：**每个设计选择是 AI 一次本能动作被改写的瞬间，写成一出三幕戏**。

读者读完一个 dc 应该有看完一段短剧的感觉——红幕拉开（AI 默认会走的路）→ 绿幕转折（skill 拦下来改）→ 黑幕余波（账省在了哪里）。这套形状反掉了"card grid + 字段标签"那种 spec doc 风，因为 spec doc 风让 10 张卡读着像一坨；三幕戏让每个 dc 自带叙事节奏。

### 新增 tokens

在 styles.css 顶部的 `:root` 已有 paper / ink / accent 之外补 3 个色：

```css
/* 三幕 + counter 三色 */
--green: #2d6e4e;            /* Act II 转折 + counter 管用 */
--green-soft: rgba(45, 110, 78, 0.05);
--amber: #94701f;            /* counter 得让一步 / 用力过了 / 可以简化 */
--gray: #5a4a3e;             /* counter 用不上 — 用灰避免和 accent 红混淆 */
```

**为什么 counter 失效色是灰不是红**：accent 红 (#8a1c0f) 已经承担"AI 默认会做"的语义。如果 counter 失效再用红，读者会把"这一招在某场景失效"误读成"这一招本身坏"——但这两件事不一样。失效是"在某地形上空转"，是中性的关闭信号，用灰更准确。

### Hero / 全章引语

- `kicker`：sans uppercase 12px letter-spacing 0.18em ink-mute：`Design Choices · Three-Act Edition`
- `h1`：serif 600，clamp(36px, 4.6vw, 52px)，letter-spacing -0.012em，max-width 24ch。
  关键词三色染：
  - `<span class="ai-bad">设定</span>` → accent 红
  - `<span class="skill-good">转折</span>` → green
  - 普通 `余波` → ink 默认
- `lede`：serif 16px line-height 1.75 ink-2，最多 4 行。用 italic em 高亮三幕的关键词
  （AI 准备做什么 / skill 拦下来怎么改 / 结果如何）。

### dc-head（每个 dc 的章号 + 标题）

- 两栏 flex：`<dc-num>` mono 13px letter-spacing 0.18em ink-mute uppercase（`DC 01`），
  `<dc-title>` serif 600 28px ink。`flex: 1` 让标题撑开。
- 上面一条 2px var(--ink) 实线分隔（`border-top: 2px solid var(--ink)`）。第一个 dc 不要这条线。

### dc-opening（引子 italic）

把 looksUnnecessaryBecause 渲染成 italic 引子段，左侧 3px var(--ink-mute) 实线，
padding-left 22px，max-width 64ch。serif 16.5px italic line-height 1.75。

这是读者读完 dc-title 之后的第一段反对意见——它要让读者先在心里说"对，这个 skill 这一停好像多余啊"，
然后三幕戏开演才能把这个怀疑翻过来。

### acts 三幕 timeline（核心组件）

3 column grid（`grid-template-columns: 1fr 1fr 1fr`，gap 36px）。窄屏（< 880px）
fallback 单列堆叠，箭头隐藏。

每个 act 自上而下：

1. **act-stamp 印章**：inline-flex，padding 6px 14px，border 1.5px，align-self flex-start。
   左边一个 serif 16px 700 的罗马数字（`I` / `II` / `III`），右边 mono 11px uppercase 700
   letter-spacing 0.14em 的中英双行标签（`设定 · SETUP` / `转折 · TURN` / `余波 · AFTERMATH`）。
   印章只有 border + 文字，没有 fill——保持轻盈。
2. **act-title**：serif 18px 600 line-height 1.4 ink。统一的三句话标题：
   - Act I：「AI 准备做什么」
   - Act II：「skill 拦下来怎么改」
   - Act III：「结果如何」
3. **act-body**：padding 18 20 20，border-top 1.5px 实色（红/绿/黑），背景对应淡 5% 染色。
   sans 14px line-height 1.78 ink。这里渲染对应字段全文（badScenario / constraint / solvedProblem）。

**配色映射**（CSS class on act）：
- `.act.setup` → accent 红 stamp + accent-soft 5% bg + accent border-top
- `.act.turn` → green stamp + green-soft 5% bg + green border-top
- `.act.aftermath` → ink stamp + paper-2 bg + ink border-top

**→ 箭头**：`.act:not(:last-child)::after { content: "→"; position: absolute; top: 18px; right: -28px; font-size: 28px; color: var(--ink-mute); }`。
箭头位置在 stamp 行高度（top: 18px）右侧 28px gap 里。窄屏 stack 时 `display: none`。

**禁止**：让三幕中任意一幕变成 card 化处理（圆角 + 阴影 + 多边框）——会丢掉报章感。
border-top + 背景染色 + stamp 已经够区分三幕，多了反而稀。

### curtain（这一招换个地方一样能用 · reusableMove）

三幕之后的 ink 反色块——同样的招换个 skill 也能用，单独写一句话存下来。

- ink 实色背景，paper 字色。padding 24 28，max-width 940px。
- label：sans 12px paper-3 色：`这一招换个地方一样能用`。
  前置一个 accent 红 ▼ 字符（不是 emoji）。
  不要用 mono / uppercase / 戏剧术语副标（旧版的「落幕笔记 · CURTAIN NOTE」已删——它是装样的中英重复 + 戏剧化术语，新版去掉了）。
- body：serif 16px italic 500 line-height 1.78。reusableMove 字段直接渲染——这一段
  应该读起来像一句格言，不是总结。

### encore（换三个地形重演 · counterScenarios）

curtain 下面隔一条 1px dashed rule，标题：

- label：mono 11.5px letter-spacing 0.14em ink-mute uppercase：`换三个地形把这出戏重演`
- hint：serif 13px italic ink-mute：`同一出戏在不同舞台演出来效果不一样——管用的舞台、得让一步的舞台、彻底用不上的舞台。`

scenes grid：`grid-template-columns: repeat(3, 1fr)` gap 12px（窄屏 1 列）。每个 scene
是一张轻 card：

- 白底 + 1px var(--rule) 边框 + **左 5px 实色 border 染色**：救→green / 让位→amber / 失效→gray
- 背景对应淡 5% 染色（green-soft / rgba(148,112,31,0.05) / rgba(90,74,62,0.05)）
- 右上角一个 mono 9px ink-mute 的小标 `Scene`（绝对定位 top 14 right 14）
- effect chip：mono 10.5px letter-spacing 0.1em uppercase 700，色对应三色
- when：sans 13px 500 line-height 1.55 ink
- why：sans 13px ink-2 line-height 1.65

**CSS class 用 `[data-effect*="..."]` 选择器**：

```css
.scene[data-effect*="管用"] { border-left-color: var(--green); background: var(--green-soft); }
.scene[data-effect*="得让一步"], .scene[data-effect*="用力过"], .scene[data-effect*="可以简化"],
.scene[data-effect*="不用做"], .scene[data-effect*="可以松"], .scene[data-effect*="看情况"],
.scene[data-effect*="也许碍事"] {
  border-left-color: var(--amber); background: rgba(148,112,31,0.05);
}
.scene[data-effect*="用不上"], .scene[data-effect*="没必要"], .scene[data-effect*="反而碍事"] {
  border-left-color: var(--gray); background: rgba(90,74,62,0.05);
}
```

这一组 `*=` 通配符匹配让 effect 字段写「反而碍事 / 可以简化」这种 OR 组合也能正确染色。
新写 effect 值时**只用 cards-patterns.md 第 55 行附近 allowed 列表里的词**，不要发明新词。
旧 example 里的 `救你 / 完全失效 / 部分让位` 等老术语在历史 example 里仍能渲染（旧 CSS 还在自己的副本里），但新生成的 skill 一律走这里的新词。

### 字段映射（不能少）

| dc 字段 | 渲染位置 |
| --- | --- |
| `title` | dc-title |
| `looksUnnecessaryBecause` | dc-opening italic 引子 |
| `badScenario` | Act I 设定 / 红印 |
| `constraint` | Act II 转折 / 绿印 |
| `solvedProblem` | Act III 余波 / 黑印 |
| `reusableMove` | curtain note 反色块 |
| `counterScenarios[].effect` | scene data-effect 属性（染色） |
| `counterScenarios[].when` | scene-when |
| `counterScenarios[].why` | scene-why |

**禁止**：在 design-choices 页里出现「字段名 label + 内容」的 spec 表风格。三幕戏 +
落幕笔记 + 重演已经把字段语义化了，读者不需要看到 `looksUnnecessaryBecause:` 这种
key 名。

### 自检

design-choices 页写完后：

- 三幕的 stamp（罗马数字 I / II / III）三种颜色（红 / 绿 / 黑）一眼能区分吗？
  能 → 形状对了。看不清 → 检查 border / color。
- 中间的 → 箭头在桌面宽度（≥ 880px）下出现在 Act I 和 Act II / Act II 和 Act III
  之间吗？没出现 → 检查 `.act:not(:last-child)::after`，可能 `position: relative`
  被覆盖了。
- 三幕里 act-body 等高吗？应该等高——`align-items: stretch` + `flex: 1` 的 act-body
  会自动撑齐。其中一幕特别长导致另两幕跟着拉很多空白？这是预期——dc10 等组合卡
  的 constraint 字段比 badScenario 长很多时，会出现两幕较空。在阅读上仍 OK，但
  视觉上要接受这个不平衡（不是 bug）。
- curtain 的反色块（ink 背底 paper 字）能不能从纸色背景上一眼跳出来？跳不出 →
  ink token 错了或背景错了。
- scene 三种颜色（绿 / 琥珀 / 灰）能从 paper 背景上区分吗？特别是灰色"用不上"——
  和 ink-mute 是不是太近混淆了？混淆 → 调整 gray 到 #4a3a2e 加深一档。
- 整页朗读 hero h1 + lede + 一个 dc-opening + 三幕 act-body——能不能读得通？
  读到三幕之间 act-body 衔接处突然变密 → 字段写得太密，回去看是不是该拆。

### 渲染样本

如果想看戏剧三幕体在 HTML/CSS/JS 三层落地后长啥样，可看 `examples/nuwa-skill/web-app/pages/design-choices.html` 渲染结果 + `assets/styles.css` 里 design-card / acts / curtain / encore 作用域内的 CSS + `assets/site.js` 里 `designChoicesPage()` 渲染器。

**规则以本文件「Design Choices 页（戏剧三幕）」节为准**。如果样本三处（HTML / CSS / JS）内部不一致，那是 example 自身的 bug，要修 example；不是 spec 模糊。

## site.js 渲染层的约束

walkthrough 页面渲染时**必须走默认 `layout()`**，让左侧 sidebar 和其它页面保持
一致。把编辑杂志体正文作为 `layout("Walkthrough", content)` 的 `content` 传入，
并在 content 内包一层 `.page`：

```html
<main>
  <div class="page">
    <!-- masthead / hero / index / stages -->
  </div>
</main>
```

CSS 可以在 `body[data-page="walkthrough"] main` 上取消默认 padding，让 `.page` 自己
控制右侧正文宽度；但**不要**把 `#app` 改成 `display: block`，也不要绕开
`layout()` 直接渲染进 `#app`，否则 sidebar 会消失。walkthrough 的 serif 字体和
纸张色只服务右侧正文；如果 body 级 token 会影响 sidebar，需要在
`body[data-page="walkthrough"] .sidebar` 里把 sidebar 的 sans 字体和导航 token
复原。

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

- 左侧 sidebar 还在吗？并且字体 / 间距是否仍像 index 页的导航 chrome？看不到或
  变成正文 serif 风格 → 回去检查是否绕开了 `layout()`，或 CSS 是否覆盖了 sidebar。
- 翻开浏览器，第一眼看到的是 stage 编号那个 96-168px 斜体大数字吗？看不到 → typography 不够分量，回去检查 clamp 值有没有被覆盖。
- 整页只有一种强调色（深红）吗？出现了第二种 → 回去删掉。
- 代码块周围是不是纸色 + 暗块的强反差？如果代码块也是浅色（边框 + 浅灰底）= 没装上 night tokens，回去修。
- pull-quote 那段读起来像一句格言吗？还是像一句总结？是总结 → 重写 reusableMove 字段直到它能独立成句。
- challenges 区是不是和正文有视觉断开（背景色 + 顶部 accent 横线）？没断开 → 读者会以为这是 AI 内心独白，回去补 challenges-rule。
- 朗读 hero 的 h1 + subtitle + lede——能不能一口气念完不停顿？念到中间要停 = 字号 / 行距 / max-width 没调好，节奏跟不上。

## 渲染样本

如果想看编辑杂志体在 HTML/CSS/JS 三层落地后长啥样，可看 `examples/nuwa-skill/web-app/pages/walkthrough.html` 渲染结果 + `assets/styles.css` 里 `body[data-page="walkthrough"]` 作用域内的 CSS + `assets/site.js` 里 `walkthrough()` 渲染器。

**规则以本文件「Tokens」+「组件形状」节 + 上面字段映射表为准**。如果样本三处内部不一致，那是 example 自身的 bug，要修 example；不是 spec 模糊。
