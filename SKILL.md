---
name: extracting-skill-patterns
description: Use when studying or reverse-engineering an AI skill package (SKILL.md, Claude/Codex skills, prompt workflows, agent playbooks) and the user wants a multi-page web handbook / 解剖手册 / manual / documentation app explaining how the skill makes an AI behave differently.
---

# Extracting Skill Patterns — Web Handbook Mode

## Overview

This skill has one job: turn a skill package into a **multi-page web handbook** that walks through how the skill makes an AI behave differently — written from the perspective of the AI using it.

The output is never a flat report. It is a structured handbook: cool moment → one concrete example → high-level map → AI first-person run trace → file role map → design choices → reusable patterns → visual layer → multi-page web app structure.

For the core handbook contract, read `references/handbook-spec.md` first. That file routes to the smaller detail references only when they are needed. Everything in this `SKILL.md` is the prep work that feeds into that contract.

The output should feel like a creator's working notes: clear, concrete, easy to steal from. **No academic name-dropping, no decorative metaphors, no fake-jargon, no English-Chinese mash-ups.** See **反装样自检** at the end — non-negotiable.

## Workflow

### 1. Treat the input as a skill package

The input may be a single `SKILL.md`, a skill directory, or a folder containing many skills.

Start by mapping the package:

- Find every `SKILL.md`.
- Note `references/`, `scripts/`, `assets/`, `examples/`, `tests/`, and metadata files.
- Read the entry `SKILL.md` first.
- Read referenced files only when they explain the skill's design. Do not swallow every large reference by default.
- If scripts exist, inspect what jobs they take away from the agent.

For a batch, analyze representative skills first, then scan the rest for repeated structures.

### 2. Read like a skill designer

For each skill, answer these questions in plain language:

- What was the wow moment?
- What bad AI output is this skill trying to prevent?
- Why is the process this heavy?
- What does it force the agent to do before answering?
- What does it stop the agent from doing lazily?
- How does the skill run from start to finish?
- Where does it put knowledge, examples, scripts, and evidence?
- Which terms would a smart reader still not understand?
- Which move can be reused in another skill?
- When would this move be too heavy or wrong?
- **这是设计选择，还是平台该补的功能？** 如果每个 skill 都在重复同一个动作打补丁，这就不是 pattern，是平台缺陷——老实标"平台该补"，不要包装成可复用的 pattern。

Preserve three layers. Do not drop any of them:

1. **How it runs** - the flow, phases, gates, loops, and handoffs.
2. **How it is packaged** - `SKILL.md`, references, scripts, examples, tests, outputs.
3. **What design moves it contains** - reusable patterns that can help future skills.

### 3. Pick one concrete example to anchor the handbook

Before writing anything, choose **one small request** that will run through the whole handbook. The example must be:

- short enough to keep in working memory;
- specific enough to produce real text / code / prompts at each stage;
- representative of the skill's typical use, not an edge case.

The handbook will reuse this example end-to-end. Switching examples midstream is the most common failure mode — decide once, then commit.

### 4. Write the handbook

Open `references/handbook-spec.md` and follow it. That file is the canonical core spec — it summarizes the non-negotiable rules, recommended structure, and which detail reference to read for each section.

Key shape to remember while writing:

- **First-person AI voice.** The narrative subject is 我，一个正在使用这个 skill 的 AI.
- **Concept before name.** Explain every domain term before using it as if obvious. For exact rules, read `references/stage-writing.md`.
- **High to low.** User intent → AI 总任务 → stage split → 中间产物 → 约束文件 → 工程产物.
- **Bad scenario for every design choice.** No rule appears without naming the bad output it prevents. For card shapes, read `references/cards-patterns.md`.
- **One example throughout.** The example from step 3 shows up at every stage with real material (text excerpt / prompt / command / code).
- **Code-native diagrams for accuracy, imagegen only for mood.** Never use imagegen for diagrams with precise labels. For visual rules and final self-checks, read `references/visuals-and-quality.md`.
- **Narrative hooks between stages.** 每个 stage 开头一句 **接上一步：** 回收上一步存的钱，结尾一句 **下一步靠这个：** 埋下一步要花的钱。没有这两个钩子，stage 之间是物料流不是故事，读者合上书只记得文件名。详见 `references/stage-writing.md` Rule 10。

For the multi-page web app structure, read `references/web-app-structure.md`, then use `examples/web-video-presentation/web-app/` as a rendered sample.

### 5. 画图（不是可选步骤）

如果输出是 web app 或多页 handbook，**每个明细页面必须配一张顶层 SVG 图**——这是 `references/web-app-structure.md` 的 Page-level orientation 硬要求，不是装饰。具体：

- `walkthrough` 页 → 顶层流程图（5-6 个大方块，不展开 stage 细节）。
- `file-map` 页 → 包结构图 / 真相源图。
- `design-choices` 页 → 选择之间的依赖图（如果它们有依赖）。
- `patterns` 页 → pattern 关系网（从 relatedPatterns 字段画）。

**「写了 metadata 等于画了图」是最常见的失败模式。** data.js 的 `diagrams: []` 数组只放 title / type / description 不算完成——site.js 检测到 `image` 字段为空时**会静默跳过 `<img>` 标签**：页面不报错、HTTP 200、左侧导航还在——但读者打开页面看到的是一个孤立标题加描述，下面空着。

所以硬规则：

- `diagrams[]` 每个条目必须有 `image: "assets/diagrams/<name>.svg"` 字段，指向**真实存在的 SVG 文件**。
- SVG 文件必须真画出来——参考 `examples/web-video-presentation/web-app/assets/diagrams/` 的样式约定（viewBox、配色、marker 箭头、字号）。
- 落盘前必须做两件事：
  1. `ls web-app/assets/diagrams/` 看每个 image 引用都有对应文件。
  2. `python3 -m http.server` 起服务后**逐个 curl 每个 SVG**——HTTP 200 + 非零字节 = 渲染会出图。只测页面 200 不够，因为页面 200 时图可能是空的。

## Quality Bar

Run the full quality bar in `references/visuals-and-quality.md` before delivering. The handbook-specific writing rules live in `references/stage-writing.md`; design choice and pattern self-checks live in `references/cards-patterns.md`.

Then run the universal anti-pretentious check below.

### 反装样自检（写完逐条扫，命中就改）

LLM 写这类报告时有"显得专业"的本能——会用学者名 / 英文术语 / 文学修辞包装普通观察。**这一节就是反这个。逐条扫，命中就改**：

- **我有没有给一个普通动作起英文名让它显得高深？**
  - "Anchor-First Fan-Out" → "先做透一个再放手"
  - "Single Source of Truth at Runtime Edge" → "离运行时最近的那份当真，其它对齐它"
  - "Capability Graceful Degradation Pipeline" → "按能力排档：最强的方式优先，没有就退一档"
  - "Decision Deferral by Information Cliff" → "决定延后到信息齐了再做"
  - "Quality Gate" / "质量门" → "必须通过的检查"
  - "Anti-pattern Caricature Risk" → "学风格学过头变成丑化"
- **我有没有引用学者名加分量？**
  - "诺维格视角下" / "波兰尼边缘" / "斯韦勒认知负荷" / "马顿变异" / "GoF 教训" / "Wiggins 倒着设计" / "Christopher Alexander 模式" → 直接说道理，不引学者
- **我有没有用文学修辞代替具体说明？**
  - "最锋利的一刀" / "硬关卡" / "硬节点" / "守卫" / "诅咒" / "翻车" / "祖孙关系" / "祖先决策" / "灵魂深处" / "信念之刃" → 删掉，说事实
- **我有没有把简单的二选一包装成"哲学层级"？**
  - "决策应当下放到拥有最多决策依据的那一刻" → "这个决定让谁做：手头信息最全的那个人"
  - "信息悬崖" → "前段不知道、后段才知道的事"
  - "信息的多维度坍缩" → "几件事被挤进一份文件里"
- **我有没有发明新名词显得我抓住了什么本质？**
  - "运行时距离" / "权威坍缩" / "节奏轴 / 落地轴 / 信息密度轴" → 用最普通的说法描述
  - 检查方法：你新造的词，能不能用 5 个现有词的组合换掉而不丢信息？能就换。
- **中英文夹杂能不能去掉？**
  - "audience: Reuser" → "给谁看：想偷招的人"
  - "candidate" / "pattern" → "候选" / "已确认"
  - "Norvig check" → "这是设计选择还是平台该补的功能"
  - "Polanyi edges" → "写不下来的部分"
  - "Reflection-in-action" → "什么时候这招会坑你"
  - "Forces" → "为什么不能简单做"
  - "Anti-example" → "反例"
  - "heuristic" → "决策启发式"（或具体看上下文：经验规则）
  - "self-evaluation bias" → "自己写的自己评天然会偏好评好分"
  - "air-gapped" → "不联网的机器"
  - "section" → "段" / "一节" / "那一段"（按上下文）
  - "fan-out" → "扇出去 / 一对多发"——能说清就别用 fan-out
- **就地短解（Rule 1）是不是又用了一个行话解释行话？**
  - ❌ `Checkpoint Plan (硬节点 hard gate)` —— "硬节点" "hard gate" 都是新行话
  - ✅ `Checkpoint Plan (文本都在手里、还没写代码的时候停一下，问用户 5 件事)` —— 用大白话或具体场景
  - 检查方法：把短解读给一个没看过这个 skill 的朋友听，他能不能用自己的话复述一遍。复述不出 = 行话解释行话，回去重写。
- **我有没有用工程师之间的 3 字缩写代替具体描述？** （Rule 11 的负面 checklist）
  - "硬节点" / "硬规则" / "硬性" / "硬要求" → "必须停下来对齐，跳过就坏 / 不能讨价还价的规则 / 不能省的一条"
  - "流水线" → "从头到尾这一连串步骤 / 整套流程"
  - "返工成本" → "改回去要花多少时间 / 改起来贵不贵 / 改回去的代价"
  - "真相源" → "出现冲突时以这个为准"
  - "锚点" / "风格锚点" → "拿来对齐别的东西的那一个标杆"
  - "降级" → "做不到最好就退一档"
  - "信息池" → "这一章能挂的事实列表"
  - "漂移" / "退化" → "悄悄变得对不上了 / 缩成"
  - "失败模式" → "做坏了的样子"
  - "贵活" → "改起来贵的步骤 / 在动手做贵的事之前（反过来表达：在改起来还便宜的时候）"
  - "质量门" → "必须通过的检查 / 不能绕过的检查"
  - "拦截" → "停下来 / 在……处停一下"
  - "校准目标" → "参考样板（写完应该长这样）"
  - "污染" → "带偏 / 影响 / 误导"
  - "下游" / "下游接管" / "上游" → "后面的步骤 / 后面接着用 / 前面那一步"
  - "落盘" → "存进文件 / 写到磁盘"
  - "接错" → "做错 / 接的位置不对"
  - "入口路由" → "入口和总开关 / 第一个被读的文件，决定后面读哪些"
  - 检查方法：把这一段读给一个不在这个领域里的工程师朋友，他会不会停顿问"什么意思？"——会就换掉。注意 source skill 的固有文件名 / 阶段名（`narrations.ts` / `Checkpoint Plan` / `Phase 1.1`）不算工程缩写，那些是该 skill 自己的命名，必须保留——但要用大白话讲清楚它在干什么。

- **我有没有用『3 个字 + → + 1 个字』这种工程化动词缩写说话？**（命令式压缩）
  - "三重过 → 心智模型；1-2 重 → 启发式；0 重 → 丢" → "三个标准都通过 → 算心智模型；只通过 1-2 个 → 退一档变成决策启发式；一个都没通过 → 不要"
  - "过 X 重" / "升 X" / "降 X" / "丢" / "推" / "走" 这种单字动词在筛选 / 分档 / 处理流程中连用 → 用「通过 / 退一档 / 算 / 不要 / 进 / 走到」这类完整动词
  - 检查方法：把那段筛选 / 分档逻辑读出声——如果听起来像在念命令行参数（"过 3 重升模型"），就是工程压缩，回去用人说话的方式写。

如果这 7 类哪一类有命中——**回去把整段重写**，不要只换词。装样语言往往是装样思维的副产品；只换词改不到根。

**一次性替换的陷阱：** 用 `replace_all` 把"质量门 → 必须通过的检查"批量换完之后，要重读改过的那几段——很容易出现"不可绕过的必须通过的检查"这种双重否定，或者"5 个 段 都要改"这种残留空格。批量替换只是第一步，重读上下文才是终点。

**反向自查（Read-aloud test）：** 写完一段之后读出声给身边人听——如果对方追问"这一段是什么意思"或者你自己念到一半停顿了，就是装样语言遮蔽了内容，回去重写。

判定违规标准：把报告给一个**英语好的工程师朋友**读 5 分钟，问他"读完你能不能跟另一个朋友用大白话讲一遍"——讲不出 = 装样语言遮蔽了内容，回去重写。

## Resources

- `references/handbook-spec.md` — required first read; core handbook contract, rule summary, recommended structure, and routing to detail references.
- `references/stage-writing.md` — stage walkthrough writing rules: local term explanations, pre-test hooks, real materials, narrative handoffs, story voice, and AI freedom.
- `references/cards-patterns.md` — design choice cards and pattern cards: bad scenarios, counter scenarios, therefore breaks, and related pattern links.
- `references/web-app-structure.md` — multi-page web app structure and page-level orientation blocks for detail pages.
- `references/visuals-and-quality.md` — diagram/image rules and final quality bar.
- `examples/` — handbooks already produced for specific skills. **They are calibration targets, not templates.** Read one to feel the format in action; do not copy its content or structure into a new handbook. Future analyses can add more entries under `examples/<skill-name>/`.
  - `examples/web-video-presentation/handbook.md` — complete sample handbook (markdown). Read the first 1-2 sections for voice calibration; read it in full when modeling a complete manual.
  - `examples/web-video-presentation/web-app/` — rendered multi-page web app (index.html + pages/ + assets/). Reference shape when the user wants the handbook as a web documentation app.
