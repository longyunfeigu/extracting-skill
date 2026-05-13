# 女娲 Skill 造人术 · handbook brief

## Source package

- Source path: `/Users/guwanhua/git/nuwa-skill`
- Entry skill: `SKILL.md`
- Core references:
  - `references/extraction-framework.md`
  - `references/skill-template.md`
- Scripts:
  - `scripts/download_subtitles.sh`
  - `scripts/srt_to_transcript.py`
  - `scripts/merge_research.py`
  - `scripts/quality_check.py`
- Examples: 15 completed perspective skills under `examples/*-perspective/SKILL.md`
- Distribution/readme files: `README.md`, localized README files, `skills-lock.json`

## Total task

我拿到一个人名、主题，或一段模糊需求后，不是直接写一个像角色扮演 prompt 的文件；女娲让我先确认对象，建自包含目录，六路收集证据，用三道筛选出真正能迁移到新问题上的心智模型，再把这些材料写成一个可以触发、会查事实、会承认边界的人物 Skill。

## Running example

- User request: `蒸馏一个塔勒布的视角 Skill，用来帮我判断投资和产品决策里的尾部风险。我没有本地素材，你直接做。`
- Why this example: 它是女娲的主路径：明确人名、默认全面画像、网络调研模式、人物 Skill，而不是主题 Skill 或更新已有 Skill。
- Expected output: `.claude/skills/taleb-perspective/SKILL.md`，内部带 `references/research/01-06.md` 六份调研文件、来源记录、3-7 个心智模型、5-10 条决策启发式、表达 DNA、诚实边界、Agentic Protocol，以及通过质量检查后的交付说明。

## Stage IDs

| ID | Summary |
| --- | --- |
| route-input | 判断用户给的是明确对象还是模糊需求。 |
| clarify-direct | 明确人名后确认用途、范围、新建或更新、本地素材。 |
| create-package | 调研前先建自包含 skill 目录。 |
| collect-evidence | 按六个维度收集证据，缺什么补什么。 |
| review-research | 调研完成后先停，让用户看来源质量和信息缺口。 |
| synthesize-models | 用三重验证筛掉金句、常识和薄证据。 |
| build-skill | 按模板写 SKILL.md，并为具体人物生成研究式回答流程。 |
| validate-output | 用已知题、边缘题、风格题和脚本检查，修完再交付。 |
| refine-or-update | 交付后做双视角精炼；更新旧 Skill 时只补最新维度。 |

## Terms

| ID | Term | Short explanation |
| --- | --- | --- |
| direct-path | 直接路径 | 用户已经说清要蒸馏谁。 |
| diagnostic-path | 诊断路径 | 用户只说困惑，我先反推适合蒸馏谁。 |
| local-material-mode | 本地语料模式 | 用户给书、字幕、文章，我优先读这些原文。 |
| six-research-files | 六份调研文件 | 六个角度的证据库存，后面提炼只从这里取。 |
| triple-validation | 三重验证 | 跨域复现、能生成新判断、有排他性。 |
| mental-model | 心智模型 | 能让人物在新问题上给出独特判断的看法。 |
| heuristic | 决策启发式 | 比心智模型窄，但能触发具体行动的判断规则。 |
| expression-dna | 表达 DNA | 这个人怎么开口、转折、停顿、拒绝。 |
| agentic-protocol | 回答工作流 | 生成的人物 Skill 遇到事实问题时先查什么。 |
| honest-boundary | 诚实边界 | skill 明确承认哪些事不能推断。 |

## Design choices

| ID | Bad scenario |
| --- | --- |
| dc-route-before-work | 模糊需求直接进调研，最后蒸馏对象不对。 |
| dc-package-before-research | 调研文件散在外部目录，Skill 复制出去就坏。 |
| dc-six-dimensions | 只看语录或长文，产物像名言拼贴。 |
| dc-checkpoints | AI 一口气从人名跑到成品，中途方向错没人拦。 |
| dc-triple-validation | 把所有聪明人都会同意的话写成某人的独特模型。 |
| dc-agentic-protocol | 人物 Skill 面对最新事实时凭旧记忆编。 |
| dc-quality-with-repair | 检查只变成报告，问题没有回写到 Skill。 |

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
| orientation-map | `web-app/assets/diagrams/orientation-map.svg` | Overview primer |
| persona-compare | `web-app/assets/diagrams/persona-compare.svg` | Overview wow |
| main-flow | `web-app/assets/diagrams/main-flow.svg` | Walkthrough |
| package-map | `web-app/assets/diagrams/package-map.svg` | File map |
| pattern-network | `web-app/assets/diagrams/pattern-network.svg` | Patterns |

## Page jobs

- Overview: 让完全没看过女娲的人先看见普通 AI 会怎样做坏，再看见女娲把“造一个 Skill”拆成可检查的生产线。
- Walkthrough: 用塔勒布例子跑完整流程，展示我作为 AI 在每个阶段收到什么、读什么、不能直接做什么、产出什么。
- Glossary: 把 walkthrough 里承担设计重量的词单独解释。
- File map: 讲清文件职责、谁写谁读、错了会怎样。
- Design choices: 讲女娲为什么这样设计，尤其是每条规则防的坏输出。
- Patterns: 抽出可以搬到其他 skill 的设计招数。
- Apply it: 给读者一份写同类 skill 的起手清单。

## Assumptions and risks

- 本手册分析当前本地 `/Users/guwanhua/git/nuwa-skill`，没有重新联网确认仓库远端最新状态。
- `examples/taleb-perspective/SKILL.md` 已存在，本手册把它当作运行例子的校准材料，不把 example 当规范源。
- 本次环境不允许为页面写作另起子代理，所以 page voice gate 用本线程按 `voice-style-gate.md` 自检完成。
