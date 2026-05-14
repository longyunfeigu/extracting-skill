# huashu-nuwa · handbook brief

## Source package

- Source path: `/home/guwanhua/Desktop/git/nuwa-skill`
- Entry skill: `SKILL.md` (name: `huashu-nuwa`)
- Core references:
  - `references/extraction-framework.md` — 三重验证方法论 + 质量自检清单
  - `references/skill-template.md` — 目标人物 Skill 骨架模板
- Scripts:
  - `scripts/download_subtitles.sh` — YouTube 字幕下载（优先人工/中文/英文/自动）
  - `scripts/srt_to_transcript.py` — SRT 清洗为纯文本
  - `scripts/merge_research.py` — 扫描 research/01-06.md，生成 Phase 1.5 检查点表
  - `scripts/quality_check.py` — Phase 4 自动检查 SKILL.md 是否过 6 项标准
- Examples: 15 个已完成的 perspective skill（`examples/*-perspective/`），包括 taleb、munger、feynman、karpathy、musk、jobs、graham、naval、mrbeast、trump、ilya、张雪峰、张一鸣、孙宇晨；外加一个 x-mastery-mentor 主题 skill
- 分发/说明文件：`README.md` + 4 语 README + `skills-lock.json` 风格的发布材料

## Total task

我拿到一个人名、主题、或一段模糊需求后，不是直接写一个像角色扮演 prompt 的文件；女娲先让我**确认对象**、**建自包含的 skill 目录**、**派 6 个并行 agent 收集证据**、**用三重验证从 15-30 个候选里筛出 3-7 个真正能迁移到新问题上的心智模型**，再把这些材料写成一个**会触发 / 会查事实 / 会承认边界**的人物 Skill，并跑已知题 / 边缘题 / 风格题三种验证才交付。

## Running example

- User request: `蒸馏一个塔勒布的视角 Skill，用来帮我判断投资和产品决策里的尾部风险。我没有本地素材，你直接做。`
- Why this example: 走的是女娲主路径——明确人名、默认全面画像、无本地语料（纯网络搜索）、产出人物 Skill 而不是主题 Skill；调研、提炼、构建、验证、精炼五段都跑得到，且 `examples/taleb-perspective/` 真实存在可作为校准材料。
- Expected output: `.claude/skills/taleb-perspective/SKILL.md`，目录里带 `references/research/01-06.md` 六份调研、`sources/` 一手素材库、3-7 个心智模型、5-10 条决策启发式、表达 DNA、诚实边界、Agentic Protocol，并通过 `quality_check.py` 的 6 项自检。

## Stage IDs

| ID | Summary |
| --- | --- |
| route-input | Phase 0 判断输入是明确对象还是模糊需求，分流到直接路径或诊断路径。 |
| clarify-direct | Phase 0A 明确人名后确认聚焦方向、用途、新建/更新、是否有本地语料。 |
| diagnose-fuzzy | Phase 0B 用 1-2 轮追问定位需求维度，推荐 2-3 个候选（人物或主题）。 |
| create-package | Phase 0.5 在调研之前建好自包含的 skill 目录骨架。 |
| collect-evidence | Phase 1 派 6 个并行 agent 按维度（著作/对话/表达/他者/决策/时间线）采集证据。 |
| review-research | Phase 1.5 调研完成后停下来，让用户看来源数量、关键发现、矛盾点。 |
| synthesize-models | Phase 2 用三重验证（跨域复现、生成力、排他性）筛 15-30 候选 → 3-7 模型。 |
| confirm-synthesis | Phase 2.5 提炼完成后停下来，让用户确认心智模型、启发式、表达 DNA。 |
| build-skill | Phase 3 按 skill-template.md 组装 SKILL.md，并为该人物推导 Agentic Protocol。 |
| validate-output | Phase 4 跑已知题 + 边缘题 + 风格题 + quality_check.py，不通过返工。 |
| refine-output | Phase 5 双 agent 精炼（auto-skill-optimizer + skill-creator 视角）。 |
| update-existing | 更新模式：只跑 agent 2/5/6，与现有模型对比，增量更新而非重写。 |

## Terms

| ID | Term | Short explanation |
| --- | --- | --- |
| direct-path | 直接路径 | 用户给了明确的人名/主题。 |
| diagnostic-path | 诊断路径 | 用户只描述了困惑，需要先反推合适的蒸馏对象。 |
| local-material-mode | 本地语料模式 | 用户提供书 / 字幕 / 文章原文，优先于网络搜索。 |
| six-research-files | 六份调研文件 | `01-writings.md` 到 `06-timeline.md`，后续提炼只从这里取材。 |
| triple-validation | 三重验证 | 跨域复现 + 生成力 + 排他性，三重通过才算心智模型。 |
| mental-model | 心智模型 | 能让人物在新问题上给出独特判断的看法（3-7 个）。 |
| heuristic | 决策启发式 | 比心智模型窄，可表述为「如果 X 则 Y」的判断规则（5-10 条）。 |
| expression-dna | 表达 DNA | 句式 / 词汇 / 节奏 / 幽默方式 / 引用习惯的可复刻特征。 |
| agentic-protocol | 回答工作流 | 生成的人物 Skill 遇到事实问题时先查什么再回答的 3 步协议。 |
| honest-boundary | 诚实边界 | skill 明确写出哪些事它不能推断、哪些信息已经过时。 |

## Design choices

| ID | Bad scenario |
| --- | --- |
| dc-route-before-work | 模糊需求直接进调研，蒸馏对象不对，整套调研白做。 |
| dc-package-before-research | 调研文件散在 `07-调研与分析/` 等外部目录，skill 复制出去就坏。 |
| dc-six-dimensions | 只看一篇长文或一堆金句，产物像名言拼贴。 |
| dc-checkpoints | AI 一口气从人名跑到成品，中途方向错没人能在便宜返工点拦下。 |
| dc-triple-validation | 把所有聪明人都会同意的话写成某人的独特模型。 |
| dc-agentic-protocol | 人物 Skill 面对最新事实时凭旧训练语料编。 |
| dc-quality-with-repair | 检查结果只写成报告，问题没有回写到 SKILL.md。 |

## Patterns

| ID | Name | Links |
| --- | --- | --- |
| P1 | 先分流，再执行 | P2, P4 |
| P2 | 自包含证据库 | P3, P7 |
| P3 | 多维证据并行收集 | P5, P6 |
| P4 | 便宜返工点停一下 | P1, P7 |
| P5 | 三道筛选再命名 | P3, P6 |
| P6 | 从心智模型推研究流程 | P5 |
| P7 | 检查必须接修复 | P2, P4 |

## Diagrams

| ID | File | Appears |
| --- | --- | --- |
| orientation-map | `generation/nuwa-skill/assets/diagrams/orientation-map.svg` | Overview primer |
| persona-compare | `generation/nuwa-skill/assets/diagrams/persona-compare.svg` | Overview wow |
| main-flow | `generation/nuwa-skill/assets/diagrams/main-flow.svg` | Walkthrough |
| package-map | `generation/nuwa-skill/assets/diagrams/package-map.svg` | File map |
| pattern-network | `generation/nuwa-skill/assets/diagrams/pattern-network.svg` | Patterns |

## Page jobs

- Overview: 让完全没看过女娲的人先看见普通 AI 怎样把"造一个人物 skill"做坏，再看见女娲把它拆成"路由 → 自包含包 → 多维取证 → 三道筛选 → 模板组装 → 三种验证 → 双视角精炼"的可检查生产线。
- Walkthrough: 用塔勒布例子跑完整流程，展示我作为 AI 在每个阶段收到什么、读什么、被拦在哪个 checkpoint、产出什么。
- Glossary: 把 walkthrough 里承担设计重量的词（三重验证、agentic protocol、表达 DNA、自包含证据库等）单独解释。
- File map: 讲清 SKILL.md / references/extraction-framework.md / references/skill-template.md / scripts/ / examples/ 各管什么、谁写谁读、错了会怎样。
- Design choices: 讲女娲为什么设计 7 个关键约束，每条规则防的是哪种坏输出。
- Patterns: 把女娲的设计动作抽成 7 个可搬到其他 skill 的 pattern card。
- Apply it: 给读者一份写同类 skill 的起手清单（先分流 → 建自包含包 → 列维度 → 设检查点 → 设三道筛选 → 推工作流 → 闭环检查与修复）。

## Assumptions and risks

- 本手册分析当前本地 `/home/guwanhua/Desktop/git/nuwa-skill`，没有联网确认仓库远端最新状态。
- `examples/taleb-perspective/SKILL.md` 已存在，本手册把它当作运行例子的校准材料，不把 example 当规范源。
- 本次只到 handbook-brief.md 阶段，page-packets/ 和 data.js 的页内容不在本轮交付范围。
- 路径约定按新规范使用 `generation/nuwa-skill/`，验证 scaffold + brief 阶段路径正确。
