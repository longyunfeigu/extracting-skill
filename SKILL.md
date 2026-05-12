---
name: extracting-skill-patterns
description: Use when studying or reverse-engineering an AI skill package (SKILL.md, Claude/Codex skills, prompt workflows, agent playbooks) and the user wants a multi-page web handbook / 解剖手册 / manual / documentation app explaining how the skill makes an AI behave differently.
---

# Extracting Skill Patterns — Web Handbook Mode

## Overview

This skill has one job: turn a skill package into a **multi-page web handbook** that walks through how the skill makes an AI behave differently — written from the perspective of the AI using it.

The output is never a flat report. It is a structured handbook: cool moment → one concrete example → high-level map → AI first-person run trace → file role map → design choices → reusable patterns → visual layer → multi-page web app structure.

For the core handbook contract, read `references/handbook-spec.md` first. That file routes to the smaller detail references only when they are needed. Everything in this `SKILL.md` is the prep work that feeds into that contract.

**The output is a textbook chapter for a smart reader who has not seen the source skill**——not creator's working notes for someone already in the same shop. The reader's first 10 minutes (Overview) is the load-bearing chapter, so it gets the heaviest scaffolding:

- 先让读者亲眼看到那个失败模式（experiential opening），再给它命名；
- domain primer 拆成 5-9 个拍子，中间嵌入一张顶层 orientation 图，禁止一坨 >300 字的段落；
- wow moment 涉及 2+ 个东西的对照时必须用真表格（SVG 或 HTML table），不能用散文叙述；
- 每个"防的坏 AI 输出"配一张 before/after 卡，左边「不用这个 skill 会发生」，右边「这个 skill 怎么拦」；
- 在 primer 开始之前给一个 predict 钩子，让读者先写下自己的猜测再读下文；
- whyThisShape 用结构化列表逐章说排序逻辑，不能写成一段把 7 章串成一句的 TOC 散文。

详见 `references/handbook-spec.md` 的 Overview 形状规范，校准样板见 `examples/nuwa-skill/web-app/`（教科书标准，2025-05 重写）。

**No academic name-dropping, no decorative metaphors, no fake-jargon, no English-Chinese mash-ups.** See **反装样自检** at the end — non-negotiable.

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

### 4. Build the source plan before writing pages

Open `references/handbook-spec.md` and follow it. For web app output, also read `references/web-production-flow.md` before writing long prose.

**Do not write one full `handbook.md` and then translate it into web pages.** In web mode, `handbook.md` is an export, not the source of truth.

Create the source artifacts first:

- `handbook-brief.md` — global facts, one running example, page map, shared IDs, diagrams, links.
- `page-packets/` — one packet per page, each with its own page job, writing voice, inputs, required material, and self-check.
- anchor slice — overview opening + one walkthrough stage + one pattern card + one file-role card + one page shell, used to set density and voice.

Then 写 / 组装 web 页面：**先写完 anchor slice**（overview opening + 一个 walkthrough stage + 一张 pattern card + 一张 file-role card + 一个 page shell），**停下来问用户剩下 7 页要串行还是 fan-out 给 sub-agent 并行**。并行时 sub-agent 用 `model: "opus"`、`subagent_type: "general-purpose"`，prompt 自包含 brief + anchor slice 对应组件 + 该页 packet 模板；产出回到主 thread 做 page voice gate 和 editor pass。判断条件、调用形状和"不要 team 模式"的理由见 `references/web-production-flow.md` 的 step 2a。

Key shape to remember while writing:

- **First-person AI voice.** The narrative subject is 我，一个正在使用这个 skill 的 AI.
- **Concept before name.** Explain every domain term before using it as if obvious. For exact rules, read `references/stage-writing.md`.
- **High to low.** User intent → AI 总任务 → stage split → 中间产物 → 约束文件 → 工程产物.
- **Bad scenario for every design choice.** No rule appears without naming the bad output it prevents. For card shapes, read `references/cards-patterns.md`.
- **One example throughout.** The example from step 3 shows up at every stage with real material (text excerpt / prompt / command / code).
- **Code-native diagrams for accuracy, imagegen only for mood.** Never use imagegen for diagrams with precise labels. For visual rules and final self-checks, read `references/visuals-and-quality.md`.
- **Narrative hooks between stages.** 每个 stage 开头一句 **接上一步：** 回收上一步存的钱，结尾一句 **下一步靠这个：** 埋下一步要花的钱。没有这两个钩子，stage 之间是物料流不是故事，读者合上书只记得文件名。详见 `references/stage-writing.md` Rule 10。
- **Page voice gate before moving on.** 每页 / 每章写完后先过反装样自检、去 AI 味自检、朗读可行性检查，并按检查结果修一轮；不要把这些局部文风问题都留给最终 editor pass。

For the multi-page web app structure, read `references/web-app-structure.md`, then use `examples/web-video-presentation/web-app/` as a rendered sample.

### 5. Run page voice gates, then the editor pass

Before moving from one completed page/chapter to the next, run the page voice gate from `references/web-production-flow.md`:

- 反装样自检：有没有学者名、英文包装、文学修辞、发明术语、中英夹杂、行话解释行话；
- 去 AI 味自检：有没有密集汇报腔、数字名词堆叠、破折号锁链、规则先行、没有转向读者；
- 朗读可行性检查：有没有长句、长段、喘不过气的句子、缺少自然停顿。

The voice gate is not a report-only step. Findings must be fixed in that page before it is considered done.

After every page has passed its local gate, run the final editor pass from `references/web-production-flow.md`:

- one running example stays consistent across pages;
- every page has a distinct job and voice;
- stage IDs / term IDs / pattern IDs / design choice IDs match the brief;
- repeated paragraphs are removed instead of copied across pages;
- cross-links point to existing pages or anchors.

### 6. 画图（不是可选步骤）

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

The writing checks below are also used earlier as the per-page voice gate. Do not wait until final delivery to run them.

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

### 去 AI 味自检 / 教学语气自检（和反装样自检并列，写完逐条扫，命中就改）

**反装样自检管「哪些词不能写」，这一节管「怎么写出教学语气」。**

LLM 写完一段感觉"密度高、信息量大"——这正是 AI 味的源头。同样的内容，写成「工程师向工程师汇报」是 AI 味；写成「老师带学生一步步看」就是教学。**教学语气比 AI 味版本长 1.5-2 倍是正常成本**，不要为了"紧凑"把它压回 AI 味。

教学语气可观察的几个特征：

- 一句话只承担一件事
- 句子之间留呼吸（允许「停一下」「展开一点」「我们先想想」）
- 不时转向读者（「我们」「你」「想象一下」）
- 数字和名词不堆在一起当摘要
- 段落开头允许场景慢起，不要规则先行

#### Anchor: AI 味 vs 教学语气整段对照

**AI 味（156 字，注意一段塞了 4-5 件事）：**

> **3 道检查点：Phase 1.5 / 2.5 / 4。** 整个流程中间停 3 次等用户拍板——看 6 agent 调研质量够不够 / 看蒸馏出的心智模型对不对 / 看验证结果接不接受。这不是流程的装饰：AI 自己看不出哪一步走偏了，必须让用户在改起来还便宜的时候卡一下。在写完 440 行 SKILL.md 之后才发现『方向不对』，返工成本要高得多。

**教学语气（约 300 字，1.9 倍）：**

> 整个流程里有三个停顿点。分别在 Phase 1.5、Phase 2.5 和 Phase 4。
>
> 我们先一起想一下——为什么要在这三个地方刻意停？
>
> 因为有一个事实：AI 自己看不出方向走没走偏。它能不停往下产出东西，但产出对不对，它没把握。所以必须有外人介入。
>
> 这三个停顿点做的事是同一件：把当前阶段的产出整理成一张表，让用户在三十秒内看完。表给到用户之后，AI 就停下来，不再往下做。
>
> 第一个停顿在调研之后。问的是：这六份调研够不够，要不要再补？
>
> 第二个停顿在蒸馏之后。问的是：我从塔勒布身上提出来的这些心智模型，像不像他本人？
>
> 第三个停顿在验证之后。问的是：我跑出来的三类测试结果，你能不能接受？
>
> 注意一个细节——这三个停顿点都选在「东西还都是文字、改起来不费劲」的时间点。你想象一下：如果四百多行的 SKILL.md 都写完了，才发现方向不对，再回头改就贵得多。所以停在前面，停在还便宜的时候。

#### 6 项具体自检

1. **一句话只承担一件事。**
   - 检查方法：把段拆成单句念。一句话需要在两处停顿才能念完 = 塞了两件事，拆成两句。
   - ❌ "三重验证完，6 心智模型 + 9 启发式 + 3 voice 特征 + 7 内在张力 + 6 诚实边界都提炼出来了"
   - ✅ "蒸馏做完之后，我手里多了几样东西。它们是：六个心智模型、九条决策启发式、三个语气特征、七组内在张力、六条诚实边界。"

2. **数字+名词不在正文里堆成摘要。**
   - 「6 心智模型 / 9 启发式 / 3 voice 特征」这种堆叠只在快速参考 panel 或 summary 字段允许；正文里必须把每一项展开成一两句人话。
   - 检查方法：这串数字-名词，一个**没读过这个 skill** 的朋友能不能猜出每一项大概是什么？猜不出 = 工程汇报，回去展开。

3. **破折号锁链拆成多句。**
   - 一段里出现 2 个以上破折号 = 一段塞了多件事。
   - 检查方法：数破折号。超过 2 个就改。
   - ❌ "停 3 次等用户拍板——看 6 agent 调研质量够不够 / 看蒸馏出的心智模型对不对 / 看验证结果接不接受"
   - ✅ "停三次，每次让用户回答一个问题。第一次问的是六份调研够不够。第二次问的是心智模型像不像他本人。第三次问的是测试结果能不能接受。"

4. **每隔几段必须转向读者。**
   - 教学不是单向汇报。要用「我们先一起想 / 你想象一下 / 注意这里 / 你可能会问 / 这就解释了为什么」这类话把读者拉进来。
   - 检查方法：一整页 ctrl-F 找「你」「我们」——一次都没出现 = 从未转向读者，回去补几处。
   - ✅ 节奏样本：「在我继续讲之前，我们先想一下——如果跳过这一步会怎样？」「注意这里有个容易踩的坑：……」

5. **段落开头允许慢起，不要规则先行。**
   - ❌ "这是 3 道检查点的第二道。"
   - ✅ "现在我们走到第二个停顿点。回想一下，第一个停顿点是在调研之后——我们当时问的是「调研够不够」。第二个停顿点问的不一样……"

6. **节奏词不要省。**
   - AI 味会把「也就是说 / 换句话说 / 这样一来 / 你看 / 这就解释了 / 接下来 / 不过 / 但是」省掉，让句子干练。教学语气恰恰要靠这些词撑出节奏。
   - 检查方法：相邻两句之间没有连接词 = 读者得自己脑补关系，认知负担升高。回去补一个最自然的连词。

#### 朗读测试（最后一道）

写完一段，**真念出声**。判定标准很简单：**念到段末不用换气**。中间憋不住要停下来喘 = AI 味没去干净，回去拆句。

## Resources

- `references/handbook-spec.md` — required first read; core handbook contract, rule summary, recommended structure, and routing to detail references.
- `references/stage-writing.md` — stage walkthrough writing rules: local term explanations, pre-test hooks, real materials, narrative handoffs, story voice, and AI freedom.
- `references/cards-patterns.md` — design choice cards and pattern cards: bad scenarios, counter scenarios, therefore breaks, and related pattern links.
- `references/web-production-flow.md` — web handbook production flow: `handbook-brief.md`, page packets, page agents, per-page voice gates, editor pass, and Markdown export rules.
- `references/web-app-structure.md` — multi-page web app structure and page-level orientation blocks for detail pages.
- `references/web-app-visuals.md` — 页面视觉规范（typography / 配色 / 组件形状）。校准目标是 `examples/nuwa-skill/web-app/pages/walkthrough.html` 的编辑杂志体（2026-05）。
- `references/visuals-and-quality.md` — diagram/image rules and final quality bar.
- `examples/` — handbooks already produced for specific skills. **They are calibration targets, not templates.** Read one to feel the format in action; do not copy its content or structure into a new handbook. Future analyses can add more entries under `examples/<skill-name>/`.
  - `examples/nuwa-skill/web-app/` — **教科书标准的 Overview 校准目标**（2025-05 重写）。看 `pages/overview.html` 渲染效果 + `assets/data.js` 的 schema 实例（openingScene / predictPrompt / primerBeats + 嵌入图 / wowSetup + compare 表格 + wowMoment / badResults before-after / shapeReason + chapterLogic）。**新写 Overview 优先参考这一份**。
  - `examples/web-video-presentation/handbook.md` — 早期工作笔记标准的完整 markdown 样本。voice 偏密、信息为主、视觉较少。当用户明确要 "creator's notes" 节奏时可参考；做教科书 Overview 不要照这个抄。
  - `examples/web-video-presentation/web-app/` — 早期工作笔记标准的渲染 web app。可以参考其 site.js 渲染引擎和 walkthrough / patterns / design-choices / file-map 几页的形状，但 Overview 不要照这个抄。
