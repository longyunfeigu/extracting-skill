---
name: extracting-skill-patterns
description: Use when studying or reverse-engineering an AI skill package (SKILL.md, Claude/Codex skills, prompt workflows, agent playbooks) and the user wants a multi-page web handbook / 解剖手册 / manual / documentation app explaining how the skill makes an AI behave differently.
---

# Extracting Skill Patterns — Web Handbook Mode

## Overview

This skill has one job: turn a skill package into a **multi-page web handbook** that walks through how the skill makes an AI behave differently — written from the perspective of the AI using it.

The output is never a flat report. It is a structured handbook: cool moment → one concrete example → high-level map → AI first-person run trace → file role map → design choices → reusable patterns → visual layer → multi-page web app structure.

For the full format spec, read `references/HANDBOOK-FORMAT.md`. Everything in this file is the prep work that feeds into that format.

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

Open `references/HANDBOOK-FORMAT.md` and follow it. That file is the canonical format spec — its 9 non-negotiable rules, recommended structure, multi-page web app skeleton, and quality bar are the contract.

Key shape to remember while writing:

- **First-person AI voice.** The narrative subject is 我，一个正在使用这个 skill 的 AI.
- **Concept before name.** Explain every domain term before using it as if obvious.
- **High to low.** User intent → AI 总任务 → stage split → 中间产物 → 约束文件 → 工程产物.
- **Bad scenario for every design choice.** No rule appears without naming the bad output it prevents.
- **One example throughout.** The example from step 3 shows up at every stage with real material (text excerpt / prompt / command / code).
- **Code-native diagrams for accuracy, imagegen only for mood.** Never use imagegen for diagrams with precise labels.
- **Narrative hooks between stages.** 每个 stage 开头一句 **接上一步：** 回收上一步存的钱，结尾一句 **下一步靠这个：** 埋下一步要花的钱。没有这两个钩子，stage 之间是物料流不是故事，读者合上书只记得文件名。详见 `references/HANDBOOK-FORMAT.md` Rule 10。

For the multi-page web app structure, see `examples/web-video-presentation/web-app/` as a rendered sample.

## Quality Bar

Run the full quality bar in `references/HANDBOOK-FORMAT.md` before delivering. The handbook-specific self-checks (Rule 6 pre-test / narrative material / challenges; Rule 7 design choice multi-scenario; Rule 8 pattern network) are in that file.

Then run the universal anti-pretentious check below.

### 反装样自检（写完逐条扫，命中就改）

LLM 写这类报告时有"显得专业"的本能——会用学者名 / 英文术语 / 文学修辞包装普通观察。**这一节就是反这个。逐条扫，命中就改**：

- **我有没有给一个普通动作起英文名让它显得高深？**
  - "Anchor-First Fan-Out" → "先做透一个再放手"
  - "Single Source of Truth at Runtime Edge" → "离运行时最近的那份当真，其它对齐它"
  - "Capability Graceful Degradation Pipeline" → "按能力排档：最强的方式优先，没有就降级"
  - "Decision Deferral by Information Cliff" → "决定延后到信息齐了再做"
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
- **就地短解（Rule 1）是不是又用了一个行话解释行话？**
  - ❌ `Checkpoint Plan (硬节点 hard gate)` —— "硬节点" "hard gate" 都是新行话
  - ✅ `Checkpoint Plan (文本都在手里、还没写代码的时候停一下，问用户 5 件事)` —— 用大白话或具体场景
  - 检查方法：把短解读给一个没看过这个 skill 的朋友听，他能不能用自己的话复述一遍。复述不出 = 行话解释行话，回去重写。
- **我有没有用工程师之间的 3 字缩写代替具体描述？** （Rule 11 的负面 checklist）
  - "硬节点" / "硬规则" / "硬性" → "必须停下来对齐，跳过就坏"
  - "流水线" → "从头到尾这一连串步骤"
  - "返工成本" → "改回去要花多少时间 / 改起来贵不贵"
  - "真相源" → "出现冲突时以这个为准"
  - "锚点" / "风格锚点" → "拿来对齐别的东西的那一个标杆"
  - "降级" → "做不到最好就退一档"
  - "信息池" → "这一章能挂的事实列表"
  - "漂移" / "退化" → "悄悄变得对不上了"
  - "失败模式" → "做坏了的样子"
  - 检查方法：把这一段读给一个不在这个领域里的工程师朋友，他会不会停顿问"什么意思？"——会就换掉。注意 source skill 的固有文件名 / 阶段名（`narrations.ts` / `Checkpoint Plan` / `Phase 1.1`）不算工程缩写，那些是该 skill 自己的命名，必须保留——但要用大白话讲清楚它在干什么。

如果这 6 类哪一类有命中——**回去把整段重写**，不要只换词。装样语言往往是装样思维的副产品；只换词改不到根。

判定违规标准：把报告给一个**英语好的工程师朋友**读 5 分钟，问他"读完你能不能跟另一个朋友用大白话讲一遍"——讲不出 = 装样语言遮蔽了内容，回去重写。

## Resources

- `references/HANDBOOK-FORMAT.md` — canonical handbook format spec (9 rules, recommended structure, quality bar). The contract this skill follows for **any** input skill.
- `examples/` — handbooks already produced for specific skills. **They are calibration targets, not templates.** Read one to feel the format in action; do not copy its content or structure into a new handbook. Future analyses can add more entries under `examples/<skill-name>/`.
  - `examples/web-video-presentation/handbook.md` — complete sample handbook (markdown). Read the first 1-2 sections for voice calibration; read it in full when modeling a complete manual.
  - `examples/web-video-presentation/web-app/` — rendered multi-page web app (index.html + pages/ + assets/). Reference shape when the user wants the handbook as a web documentation app.
