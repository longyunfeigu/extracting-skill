---
name: extracting-skill-patterns
description: Use when studying, reverse-engineering, comparing, or learning from one or many AI skill packages, SKILL.md files, Claude/Codex skills, prompt workflows, or agent playbooks; use when the user wants reusable skill design patterns, a skill pattern library, Markdown plus JSON/YAML outputs, skill handbook/manual content, or help choosing patterns for a new skill.
---

# Extracting Skill Patterns

## Overview

Turn impressive skills into reusable design moves. Do not merely summarize what a skill says; explain what bad AI behavior it prevents, how it makes the agent behave differently, and which parts can be reused when writing new skills.

The output should feel like a creator's working notes: clear, concrete, and easy to steal from. **No academic name-dropping, no decorative metaphors, no fake-jargon, no English-Chinese mash-ups.** Plain words win every time. See the **反装样自检** at the end of this document — it is non-negotiable.

## Workflow

Use `references/visual-maps.md` when the user wants a richer explanation, a diagram, or a teachable version of the method.
Use `references/worked-example-trace.md` when the analyzed skill has a multi-stage workflow, or when the user asks for examples, stage-by-stage input/output, or a more intuitive explanation.
Use `references/HANDBOOK-FORMAT.md` when the user wants a skill 手册 / 解剖手册 / handbook / manual, multi-page HTML content, or a frontend documentation app structure.

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

### 3. Write human notes first

Use `references/output-template.md` for the main Markdown output.

Write in the user's language. If the user asks in Chinese, use natural Chinese headings like "它在防什么坏结果" and "我能偷走哪几招."

#### Output mode routing (do this before writing anything)

Two choices: **what genre** and **for whom**.

**Genre** — pattern extraction (default), **teaching version** (Socratic narrative), or **skill handbook** (AI first-person walkthrough manual). These are different documents, not different sections.

- If the user asks for "教学版", "讲清楚原理", "first-principles explanation", "let me understand it deeply", or compares your output unfavorably to a Socratic tutorial — switch to teaching version.
- If the user asks for "手册", "解剖手册", "handbook", "manual", "多个 HTML 文件", "文档站", "前端 web 应用", or wants the explanation from the perspective of the AI using the skill — switch to skill handbook.

**Audience** (only for pattern extraction) — same extraction is wrong for different readers:

| 给谁看 | 想要什么 | 不想要什么 |
|---|---|---|
| **skill 作者** | 用陌生人视角检查"我以为读者懂其实不懂"的盲点、平台缺陷信号、写不下来的部分、直接的改进建议 | 给作者讲他自己 skill 的入门例子、把作者发明的术语再解释一遍、把他自己写过的招整理一遍发给他看 |
| **新手** | 先看一个具体例子怎么跑，再讲招式；每招配一个反例 | 12 条招式速记列表（看不出哪条重要） |
| **想偷招的人** | 这个 skill 独到的招 + 为什么不能简单做 + 什么时候这招会坑你；老实告诉我这招在别处见过没 | 针对作者本人的改进建议 / 太长的流程图 |

For teaching version, audience is implicitly 新手; do not add audience headers — the genre serves the audience by construction.

For skill handbook, audience is implicitly a curious skill learner / reuser. The narrative subject is **我，一个正在使用这个 skill 的 AI**. The handbook must explain concepts before using their names, move from high-level intent to low-level files, and explain every major design by the bad scenario it prevents.

If the user does not say genre or audience, ask in one line. Default for ambiguous cases: **pattern extraction, audience 想偷招的人**.

When the user wants multiple genres, produce them as separate documents with clear cross-links — do not interleave.

#### If genre = teaching version: stop here, branch out

The rest of this SKILL.md (sections 3.x onward — teaching order, pattern cards, structured output, quality bar) is **for pattern extraction only**. They will mislead a teaching version writer — for example, the "Flow at a glance first" rule below is correct for pattern extraction's 新手 audience, but explicitly **forbidden** for teaching version (it spoils derivation).

For teaching version: open `references/teaching-version-style.md` and follow that document instead. Its section structure (一、先感受问题 → 二、你会怎么修 → ... → 十、最好的学习方式), voice rules, flow-diagram-placement rules, and what-to-skip list are the canonical guidance. Come back here only for "这是设计选择还是平台该补的功能" judgment (section 4) and "写不下来的部分" handling (section 5) — both apply to teaching version's content but not to its form.

Quality bar for teaching version (different from the pattern-extraction quality bar at the end of this document):

- Did the reader **invent** the design before seeing it? (Not "did I describe the design clearly"?)
- Does every section land on a "你已经独立发明了 X" moment, or on a `>` blockquote stating the principle?
- Does each tradeoff appear as a comparison table with a "适合谁" final row?
- Are flow diagrams (if any) placed at section "看一眼别人怎么做" or end-of-document, **never at top**?
- Does each diagram node carry a one-line "为什么" annotation that re-fires the matching narrative section?
- Does the "最好的学习方式" section give the reader a 30-minute concrete practice — not a generic "go try it"?

If both quality bars feel relevant to one document, you are interleaving genres. Split into two documents.

#### If genre = skill handbook: stop here, branch out

The rest of this SKILL.md (sections 3.x onward — teaching order, pattern cards, structured output, quality bar) is **for pattern extraction only**. It will make a handbook feel like a dressed-up report.

For skill handbook: open `references/HANDBOOK-FORMAT.md` and follow that document instead. Its canonical shape is: cool moment → one concrete example → high-level map → AI first-person run trace → file role map → design choices → reusable patterns → visual layer plan → optional multi-page HTML / web app structure.

Quality bar for skill handbook:

- Does the first page explain why the skill is cool without assuming file knowledge?
- Does every important concept get explained before it is used heavily?
- Is the AI using the skill the narrative subject?
- Does the document move from user intent to low-level files?
- Does every major design choice name the bad scenario it prevents?
- Does one concrete example carry the whole walkthrough? **该例子的真实文本 / 代码 / prompt 在每个 stage 都出现一次以上吗？只在开头露脸不算贯穿。**
- Does every stage say what the AI received, read, avoided, produced, and handed off?
- Are exact flows / file maps / truth-source maps kept as code-native diagrams instead of generated bitmap images?
- If imagegen illustrations are proposed, does each one have a clear learning purpose and avoid exact text-heavy labels?
- Can the reader steal at least three concrete design moves?

**教学密度自检（防止 handbook 退化成参考卡）：**

- 每个 stage 开头有 **pre-test hook** 吗？写法是「你和我同坐一椅」叠合，不是「你是这个 AI」切 POV？读者在读 narrative 前先猜一遍？
- 每个 stage 主体（narrativeBody）至少含一个**真实材料**（真实文本片段 / 真实 prompt / 真实命令输出 / 真实代码）？还是仍然只有「按 X.md 改写 Y」这种描述？没有真材料 = 没有 show，只有 tell。
- 7 字段（received / read / blocked / action / output / next / reusable move）是否折叠成「快速参考」面板，让叙事成为默认阅读路径？把 7 字段当主体 = 退化成参考卡。
- 每个 stage 末尾有 **challenges 块**吗？视觉断开 + 「🤔 你的练习」标签 + 一句明确「不是 AI 内心独白」的提示？challenges 是真实边界（agent 真的会卡的地方）还是凑数的题目？
- 每个 design choice 有 3 个 **counterScenarios** 吗？三个场景的 effect 不全是「救你」吗？至少有一个反向判断（绑你 / 部分让位 / 完全失效）？
- 每个 pattern card 有 **`Therefore` 视觉断点**吗？problem 和 solution 之间是否有让读者停一秒的明显视觉转折？
- 每个 pattern 至少有 1 个 **relatedPatterns 链接**吗？N 张 card 之间是网络还是孤岛？relation 字段是具体关系（搭配用 / 前置 / 区别于 / 下游接管）还是泛泛「相关」？

如果以上 7 条任何一条没过——这份 handbook 仍是 reference card 装成 handbook，不是真教案。回去补，不要交付。

参考标杆：reference handbook + Crafting Interpreters 的共情叙事 / Challenges + A Pattern Language 的 Therefore + cross-link + DDIA 的 multi-scenario trade-off。Bret Victor explorable explanation 那一档是上限，可选不强求。

---

The remainder of this SKILL.md applies to **pattern extraction** only.

#### Teaching order for pattern extraction

Inside the output, follow this order — do not invert it:

1. **Domain primer (人话先说一遍)** — 100~200 字，用 **0 行业黑话** 写：这个 skill 在做什么 / 关键产物 / 文件 / 概念有哪些 / 它们之间什么关系（A 是 B 的源、A 派生出 B、A 喂给 B 之类）。**判断标准：把这一段单独抽出来给一个完全没读过原 skill 的人看，他能看懂这个 skill 在做什么吗？** 看不懂就重写。读者读完这段，应该已经认识 Quick Path / Flow / pattern card 里会出现的所有 domain 术语；剩下要消化的只是你抽出来的设计层概念。**这一段必须有**——哪怕受众是 skill 作者，它顺便检测原 skill 的入口段落是否对陌生人友好。
2. **Soul one-liner (一句话讲清这个 skill)** — 80~150 字。回答三件事：(a) 这个 skill 的**根信念**是什么（"它把世界看作 X" / "它认为 Y 是错的" / "它的核心动作是 Z"）；(b) 它把**原料 / 流程 / 决策权**拆成了几条独立轴；(c) **谁是真相源，谁派生，谁允许漂**。判断标准：如果你只能给读者留一段话，这就是那一段。**写不清这段不是模板缺陷，是关于原 skill 的发现**——要在"老实承认的不足"段标"原 skill 没把设计哲学讲清楚"，不要伪装成"已经写了"。Domain primer 说"是什么"，Soul one-liner 说"为什么这样"。
3. **Flow at a glance** — 一张 ASCII 图，≤ 20 行。读者先看到形状，再读文字。**仅时间序，仅此而已**——拓扑、信息流、决策来源在下一步。
4. **Topology map (拓扑视图，非时间轴)** — 至少一张**非时间轴关系图**，三选一：
   - **权威拓扑图** — 哪些产物是源 / 哪些派生 / 谁允许漂。单向箭头标"谁喂给谁"或"谁以谁为准"。
   - **决策来源层级图** — 根信念 → 推论决策 → 具体 pattern card 编号。让读者看到 N 张 pattern card 之间的来源关系。
   - **信息流图** — 原始素材怎么被切成几条独立轴 / 每轴管什么决策维度 / 每轴落到哪个文件。

   **必须做：仅有 Flow at a glance 时间序流程图不够**。LLM 遇到难以可视化的结构会回退到文字堆砌——这一步是为了让你停下来想清楚。每个节点 / 边都要带一行"为什么这样"的注解，否则 ASCII 会变成空方框图。

   如果 skill 同时需要多种维度，可以**合并画一张图**（比如权威拓扑 + 信息流叠在一起），只要每种维度仍清晰可辨。
5. **One worked example** — the skill running end-to-end on a concrete input. Concrete before abstract.
6. **Distinctive patterns** — only the moves that are unique or near-unique to this skill. Each pattern card carries a **反例（看着像但不是这招）**. Without it, the reader cannot tell where this pattern stops.
7. **Library hits** (appendix) — patterns this skill uses that already live in `pattern-library.md`. List as one-liners, do not re-card.
8. **写不下来的部分** — 哪些维度规则失效，只能靠多看例子学。
9. **下一步** — 一段话告诉读者拿到这份报告该干嘛。

Skip any step that does not earn its keep for the chosen audience. For 作者 audience, step 5 (worked example) is usually skippable. **Domain primer / Soul one-liner / Topology map 三步都必须有** —— 它们防止"自己懂了忘了别人不懂"+ 防止文字堆砌。

Prefer this vocabulary:

| If you are tempted to write about | Say |
| --- | --- |
| competing tensions | Why it has to be this way |
| strict rules | What it does not let the agent get away with |
| behavior control | How it changes the agent's behavior |
| file and context layout | Where it puts the moving parts |
| deliverables | Outputs |
| reusable theory | Reusable move / design pattern |

Keep the user's useful details. If a skill has a flow, file layout, and extracted patterns, include all three.

### Teaching layer

When the extraction uses a term that is not obvious, explain it before moving on. Do not explain a term by repeating the term.

**"Obvious" 的判断标准是陌生读者，不是你自己的直觉。** 你已经读完整份 SKILL.md，每个 domain 词在你脑子里都激活了上下文 —— **自己懂了忘了别人不懂**。判断一个词需不需要解释的方法：把这份 extraction 给**没读过原 skill 的人**看，他读到这个词时是否需要往回翻？需要 = 不 obvious = 解释。

**Domain 术语**（原 skill 自己用的文件名 / 产物名 / 工具名）和**设计层术语**（你抽出来的概念）都适用此标准；不要因为前者"在原 skill 里到处出现"就默认读者一定懂。

Domain primer（教学顺序步骤 1）是"批量"消化 domain 术语的地方；Glossary 是"参考查询"。两个都要有。

For each important concept, include:

- **人话解释** - what this means in plain language.
- **怎么判断** - how to recognize it in a skill.
- **为什么重要** - what bad output it prevents.
- **小例子** - one concrete example from the analyzed skill.

Example:

```text
心智模型：不是"这个人说过的观点"，而是他反复用来判断问题的看法。
怎么判断：换一个新问题，这个看法还能帮他推出一个答案。
例子：芒格的"逆向思考"不是一句口号，而是遇到投资、人生、产品问题时都先问"怎样会失败"。
```

### Worked example trace

For any skill with phases, checkpoints, or routing, include one running example that follows the workflow end to end.

The example should show:

- **用户输入** - the concrete request that starts the skill.
- **这一步收到** - what the agent has at that stage.
- **这一步做了** - what the skill tells the agent to do.
- **这一步产出** - what gets produced or saved.
- **学到的招** - the reusable move demonstrated by that stage.

Do this especially when the output contains abstract labels like "synthesis," "research review," "quality validation," or "Agentic Protocol."

### 4. Extract reusable design patterns

A pattern is not a section title. It is a move that can be reused. **A pattern must describe a recurring problem in a context, with specific tensions that make the obvious solution wrong.** Without those tensions, you have a tip, not a pattern.

**Default everything to `候选`.** A move seen in only the current skill is 候选, not 已确认, even if it feels powerful. Only mark `已确认` when you can list at least 2 *unrelated* skills you have personally analyzed where this exact move appears. Citing `pattern-library.md` does not count as a sighting — the library is a seed, not independent evidence.

A pattern card has **6 main fields + 2 optional**. 11-field cards encourage box-checking; 6 fields force you to actually think:

1. **它防什么坏结果** — bad AI behavior or output, specific
2. **为什么不能简单做** — the *specific* tensions making this solution non-obvious. If your tensions could fit a sibling pattern in the same skill, they are too generic — find the real ones.
3. **反例（看着像但不是这招）** — one concrete move that looks similar but is *not* this pattern. Without it the boundary is vague — keep status: 候选.
4. **什么时候用 + 怎么用** — triggering situation + reusable shape (2-4 lines).
5. **什么时候这招会坑你 / 代价** — *one specific scenario* where applying this pattern blindly misleads + what it costs (time / tokens / user attention / dependencies). Generic disclaimers ("don't apply blindly") fail this field.
6. **在哪几个 skill 里见过 + 真实例子** — list skills with paths where you have *actually* seen this move + 1 specific example with line numbers. Default: 候选 unless 2+ *unrelated* sightings.

Optional:

- **这是设计选择还是平台该补的功能** — if every skill copies this same move, mark "平台该补".
- **和谁一起用** — combines with which other patterns.

Use `references/pattern-library.md` for seed patterns and naming style. Be reluctant about adding new patterns. When in doubt, leave the move as `候选` and revisit after analyzing a second skill.

### 5. Produce both Markdown and structured data

When the user asks for a pattern library, produce:

- A Markdown version for people to read.
- A JSON or YAML version for later retrieval and composition.

Use `references/output-schema.yaml` for the structured shape. It is fine to include only the fields that are supported by evidence.

#### Match depth to the reader

Worked-example traces and full pattern cards help a new reader build mental models, but waste time for someone who already has them. Default to two layers:

- **Quick path** at the top — pattern names + one-line gist + when-it-will-坑-you warning. For readers who already know the territory.
- **Full path** below — worked example, package layout, expanded pattern cards. For new readers.

Do not duplicate; the quick path links into the full path. If the user signals they are experienced ("I wrote skills like this — give me only the moves"), drop the full path.

#### 写不下来的部分

Some moves in a good skill are taste, rhythm, or aesthetic — when to let the agent stay quiet, what tone fits the user, when a worked example is enough vs. when a rule is needed. **有些事写不下来。** When you hit a dimension that resists rules, say so explicitly and recommend *more examples instead of more rules* for that dimension. Do not pretend you captured it.

### 6. When helping write a new skill

Start from the problem the skill is meant to prevent. **倒着设计：先想结果，再想中间。**

1. **Name the default bad AI behavior** — the failure you would observe if the skill did not exist.
2. **Define acceptable evidence** — what concrete before/after would prove the skill works? Write the exact scenario, the prompt, and the observable difference in agent output. If you cannot write this, you do not yet know what success means.
3. **Pick 2-5 patterns from the library** that directly close the gap between (1) and (2). Prefer fewer patterns with stronger fit over many patterns that could conceivably help.
4. **Decide what belongs in `SKILL.md` versus `references/` or `scripts/`.**
5. **Keep the first version small enough to test** against the evidence from step 2.
6. **Include at least one pressure scenario** (the test from step 2 plus an adversarial variant) that would make an agent fail without the skill.

Do not generate a huge skill just because many patterns are available. Choose the few that directly fix the failure mode.

#### When the library has no matching pattern

The library is a starting point, not a ceiling. If no existing pattern fits:

1. State the failure mode in one sentence.
2. Name the tensions that make the obvious fix wrong.
3. Sketch a candidate move and run it against one real prompt before naming it.
4. Use it in two unrelated skills before promoting it from `候选` to `已确认`.

**一个观察就发明 pattern 是模式库腐烂的开始。** Stay reluctant.

## Quality Bar

Before finishing, check:

- Did you state who the audience is and skip sections that do not earn their keep for that reader?
- Did you start with a **Domain primer**（100~200 字，0 行业黑话）before anything else? Domain primer 必须有——它防止"自己懂了忘了别人不懂"，对所有受众都适用。
- 把 **Quick Path + Domain primer** 给一个**没读过原 skill 的人**看——每个名词他都能看懂吗？看不懂的进 Domain Glossary 并 inline 解释一次。判断"obvious"的标准是陌生读者，不是作者直觉。
- Did you write a **Soul one-liner**（80~150 字）summarizing this skill's **根信念 + 它把世界拆成了什么 + 谁是真相源谁派生**？写不清就老实在"老实承认的不足"段标"原 skill 没把设计哲学讲清楚"，不要伪装成已写过。
- Did you produce at least one **Topology map**（非时间轴：权威拓扑 / 决策来源 / 信息流 三选一或合并）beyond the Flow at a glance？仅有时间序流程图不够 —— LLM 用文字堆砌补救可视化是最常见的失败模式。每个节点 / 边都有一行"为什么"的注解吗？
- Does the output follow the order: **Domain primer → Soul one-liner → Flow at a glance → Topology map → Worked example → Patterns**? (Worked example 是唯一可跳的；Soul / Topology 必须有。)
- Can the user immediately steal at least three concrete moves?
- Did you explain the flow without losing the file/package structure?
- Did you avoid abstract jargon unless it was translated into concrete user-facing language?
- Did every pattern carry **specific tensions that a sibling pattern would have differently**? (Generic tensions = not yet a pattern.)
- Did every pattern carry a **反例（看着像但不是这招）**? (No 反例 = boundary still vague = keep as 候选.)
- Did you default to `候选` and require 2+ unrelated sightings before promoting to `已确认`?
- Did you ask **"这是设计选择还是平台该补的功能"** for each pattern?
- Did you mark dimensions that resist rules and recommend examples-not-rules for them?
- Did you end with **下一步** — what the reader should do with this report?
- Did the structured output match the Markdown instead of drifting into a separate summary?

### 反装样自检（写完逐条扫，命中就改）

LLM 写模式提取报告时有"显得专业"的本能——会用学者名 / 英文术语 / 文学修辞包装普通观察。**这一节就是反这个。逐条扫，命中就改**：

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

如果这 6 类哪一类有命中——**回去把整段重写**，不要只换词。装样语言往往是装样思维的副产品；只换词改不到根。

判定违规标准：把报告给一个**英语好的工程师朋友**读 5 分钟，问他"读完你能不能跟另一个朋友用大白话讲一遍"——讲不出 = 装样语言遮蔽了内容，回去重写。

## Resources

- `references/output-template.md` - Markdown templates for single-skill and batch analysis.
- `references/pattern-library.md` - starter library of reusable skill design patterns.
- `references/output-schema.yaml` - YAML schema for structured pattern output.
- `references/nuwa-example.md` - example extraction that keeps flow, package layout, and reusable patterns without drifting into jargon.
- `references/visual-maps.md` - flowcharts, layer maps, output menu, and scoring rubric for richer explanations.
- `references/worked-example-trace.md` - stage-by-stage example format with teaching principles behind it.
- `references/teaching-version-style.md` - Socratic-narrative output mode for "教学版" / first-principles teaching requests, distinct from pattern extraction.
- `references/HANDBOOK-FORMAT.md` - AI first-person skill handbook format for "手册" / "解剖手册" / multi-page documentation requests.
- `references/handbook-example-web-video-presentation.md` - sample handbook page for `web-video-presentation`, used to calibrate voice and structure.
- `references/handbook-web-video-presentation-full.md` - complete handbook sample for `web-video-presentation`, useful when generating a full manual or web documentation structure.
