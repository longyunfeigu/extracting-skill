# 女娲 · Skill 造人术 解剖手册 · brief

> 这是全本手册的真相源。所有页面（data.js + 7 个 page shell）都从这里取共享 fact / 共享例子 / 共享 ID。任何页面之间不一致以 brief 为准。

## 1. 全局 meta

- **title**：女娲 · Skill 造人术 解剖手册
- **audience**：想偷招的人 / 准备自己写一个"蒸馏某人思维"的 skill / 第一次看见 nuwa 的 AI
- **sourcePath**：/Users/guwanhua/git/nuwa-skill
- **outputMode**：multi-page-web-handbook
- **generatedFor**：让读者看见——我作为 AI 收到"做一个塔勒布的 skill"这个请求，女娲怎么把我从"凭训练语料拼几句名言做角色扮演"拦下来、改写成"6 agent 并行调研 → 3 道检查点对齐 → 三重验证筛模型 → 反推 Agentic Protocol → 独立子 agent 验证"的完整生产线。

## 2. running example（贯穿全本，中途不换）

**用户请求**：「我想做一个塔勒布的 skill。我手里没他的素材，你自己搜吧。」

**为什么选塔勒布**：
- nuwa root SKILL.md 多处用塔勒布举例（Phase 3 Agentic Protocol 反推表 3 例之一、"skin in the game"被点名为高频词）。
- 活人，能演示 Agent 6 时间线的"最近 12 个月动态"。
- voice 鲜明 + 争议大，能演示"内在张力""外部批评""诚实边界"三段的价值。
- `examples/taleb-perspective/SKILL.md` 已经存在 443 行真实产出，每个 stage 都能引真东西，不会写到一半变占位。

**最终产出**：
- `.claude/skills/taleb-perspective/SKILL.md`（~443 行）
- `scripts/`（download_subtitles.sh / srt_to_transcript.py / merge_research.py / quality_check.py，从 nuwa 复制过来）
- `references/research/01-writings.md ~ 06-timeline.md`（6 agent 调研存档）
- `sources/{books,transcripts,articles}/`（一手素材原文）
- 整目录可独立复制到任何 Claude Code 项目就能用，不依赖 nuwa 自己——这是 nuwa 自包含硬要求。

## 3. 共享 fact 池（写每页时回查，不要现编）

### nuwa 的 phase 划分（按 SKILL.md 行号）

| Phase | 名字 | 干什么 | 中间产物 |
|---|---|---|---|
| 0 | 入口分流 | 判断"明确人名"还是"模糊需求" | — |
| 0A | 需求澄清（直接路径） | 确认聚焦方向 / 用途 / 新建或更新 / 本地语料 | — |
| 0B | 需求诊断（模糊路径） | 1-2 轮追问定位 → 推荐 2-3 候选 → 用户选 | 候选清单 |
| 0.5 | 创建 skill 目录 | 在调研之前先建好 `.claude/skills/[name]-perspective/` 全树 | 空目录 + research/ + sources/ 子目录 |
| 1 | 多源信息采集（6 并行 agent） | 著作 / 对话 / 表达 / 他者 / 决策 / 时间线 | `references/research/01-06.md` |
| 1.5 | 调研检查点 | 表格展示来源数 + 关键发现 + 矛盾点，等用户拍板 | 用户确认 |
| 2 | 框架提炼 | 三重验证筛心智模型 / 启发式 / 表达 DNA / 价值观 / 智识谱系 / 诚实边界 | 提炼笔记 |
| 2.5 | 提炼检查点 | 列摘要等用户拍板 | 用户确认 |
| 3 | skill 构建 | 读模板 + 反推 Agentic Protocol + 填充 + 自检 + 写盘 | 完成版 SKILL.md |
| 4 | 质量验证 | 独立 subagent 做 sanity / edge / voice 三类测试 | 验证报告 |
| 5 | 双 agent 精炼 | optimizer + creator 两个视角的改进建议 | 改进版 SKILL.md |

**3 道检查点**：1.5 / 2.5 / 4 —— 都是"在改起来还便宜的时候停一下问用户"。

### 三重验证（Phase 2 核心机制）

候选论点（通常 15-30 个） → 过三道筛 → 心智模型 / 启发式 / 丢

1. **跨域复现**：在 ≥ 2 个不同领域出现
2. **生成力**：能推断此人对新问题的可能立场
3. **排他性**：不是所有聪明人都这样想

三重通过 → 心智模型（取 top 3-7 个）
只通过 1-2 重 → 决策启发式（5-10 条）
0 重通过 → 丢

### 6 agent 并行任务表（Phase 1）

| Agent | 搜什么 | 提取什么 | 输出文件 |
|---|---|---|---|
| 1 著作 | 书 / 长文 / 论文 / newsletter | 反复出现 ≥ 3 次的核心论点 / 自创术语 / 推荐书单 | `01-writings.md` |
| 2 对话 | 播客 / 长视频 / AMA / 深度采访 | 被追问的回答 / 即兴类比 / 改立场的瞬间 / 拒答的题 | `02-conversations.md` |
| 3 表达 | Twitter / 微博 / 即刻 / 短文 | 高频用词句式 / 争议立场 / 幽默方式 | `03-expression-dna.md` |
| 4 他者 | 他人分析 / 书评 / 批评 / 传记 | 外部观察 / 同行对比 / 争议点 | `04-external-views.md` |
| 5 决策 | 重大决策 / 转折点 / 争议行为 | 决策背景 / 事后反思 / 言行一致案例 | `05-decisions.md` |
| 6 时间线 | 出生到现在完整时间线 | 关键里程碑 / 思想转折 / 最近 12 个月动态 | `06-timeline.md` |

### 塔勒布跑完后的真实产出（每页可以引）

**6 个心智模型**：
1. 非对称风险思维
2. 反脆弱偏好
3. Skin in the Game 检验
4. 林迪效应筛选
5. Via Negativa（减法优先）
6. 领域特异性（Mediocristan vs Extremistan）

**9 条决策启发式**（举例）：杠铃策略 / 遍历性检验 / 火鸡问题 / 少数派规则 / 框架重置 / 绿木交易员原则 / 凸性试错 / 预防原则 / 反信号启发式

**Agentic Protocol 反推出来的 5 个"看什么"维度**（从 6 个心智模型反推）：
1. 看风险（尾部风险 / 遍历性）← 模型 1
2. 看脆弱性（压力测试 / 隐藏脆弱点）← 模型 2
3. 看历史（黑天鹅先例 / 火鸡问题检验）← 模型 1 + 4
4. 看叙事（主流叙事 / 反面观点）← 模型 6
5. 看皮肤在场（谁在承担风险 / 激励不对称）← 模型 3

**7 对内在张力**：思想反脆弱 vs 自尊脆弱 / 反学院 vs NYU 教授身份 / 主张减法 vs Twitter 不断增加噪音 / 鼓吹 skin in the game vs 批评比特币时已清仓 / 蔑视社交媒体辩论 vs 最活跃的 Twitter 知识分子 / 推崇沉默 vs 最多话的公知 / 书中倡导谦逊 vs 个人行为绝对傲慢。

**6 条诚实边界**：创造力无法蒸馏 / 公开表达 ≠ 真实想法 / 在不擅长领域会出错（生物学 / 哥德尔定理） / 500 页书里只有 100 页洞察 / 不可证伪的自我保护系统（IYI 标签） / 调研截止日期。

### 横向对照（Agentic Protocol 反推不是写死模板的实证）

| 人物 | 核心心智模型 | 反推的"看什么"维度 |
|---|---|---|
| 塔勒布 | 反脆弱 / Skin in the Game / 林迪 | 看风险 / 看脆弱性 / 看历史 / 看叙事 / 看皮肤在场 |
| 费曼 | 第一性原理 / 对权威怀疑 | 看基本物理或数学约束 / 看官方说法的逻辑漏洞 / 看实验数据 |
| MrBeast | 注意力工程 / 测试迭代 | 看 CTR 和 AVD / 看竞品 Top10 / 看搜索趋势 / 看成本回报 |

三个完全不同领域的人物（思想家 / 物理学家 / 内容创作者），同一个 Agentic Protocol 外壳，"先看什么"全不一样——这就是 Phase 3 反推规则的存在意义。

### 信息源黑名单（永远排除）

- 知乎：洗稿严重、二手转述
- 微信公众号：封闭生态、无法验证
- 百度百科 / 百度知道：信息陈旧

中文渠道只接受：36 氪 / 极客公园 / 晚点 LatePost / 财新 / 第一财经 / 虎嗅 / 少数派 / 机器之心；人物访谈类用小宇宙 / 喜马拉雅原始音频 / B 站原始视频（非搬运号）。

## 4. 7 页的 job 和 voice（page-packets 各自展开）

| 章 | page | job | voice 关键词 |
|---|---|---|---|
| 01 | overview | 给一个完全没见过 nuwa 的人，10 分钟说清楚 nuwa 在干嘛 + 引入塔勒布作为贯穿例子 | 教科书章节 voice：experiential opening + predict 钩子 + 多拍 primer + compare 表 + before/after 卡 |
| 02 | walkthrough | 我（AI）拿到"蒸馏塔勒布"后被 nuwa 一步步拦下来的 14 个 stage，每 stage 用真东西落地 | 编辑杂志体：现场感、preTest 钩子、真材料、Q01/Q02 编号练习、pull-quote |
| 03 | glossary | 9 个核心术语：HOW vs WHAT / 心智模型 / 决策启发式 / 表达 DNA / Agentic Protocol / 三重验证 / 内在张力 / 诚实边界 / 自包含原则 | 5 字段定义、例子先抽象后 |
| 04 | file-map | nuwa 源包 + 生成目录各管什么；哪个文件写错会怎样 | 责任卡 6 字段、操作性 voice |
| 05 | design-choices | 8 个真改变 AI 默认行为的设计选择 | 论辩 voice：5 字段卡 + 3 场景力度对比表 |
| 06 | patterns | 7-8 张可偷招的 pattern card | problem → therefore → solution，附反例 + 代价 + relatedPatterns |
| 07 | apply-it | 给读者自己写类似 skill 的清单 + 起手 prompt | 操作清单 voice、可直接 copy |

## 5. 4 张 SVG 图（每张必须真画 + curl 200 + ≥ 1000 字节）

| 给哪一页 | 文件名 | 画什么 | 不画什么 |
|---|---|---|---|
| overview | `assets/diagrams/overview-flow.svg` | 女娲全流程顶层图（Phase 0 → 0A/0B → 0.5 → 1 → 1.5★ → 2 → 2.5★ → 3 → 4★ → 5），3 道检查点用 ★ 标 | 不画 14 个 stage 的内部细节（会糊一脸） |
| overview | `assets/diagrams/protocol-compare.svg` | 3 列 × 2 行的塔勒布 / 费曼 / MrBeast 横向对照（心智模型 / 反推研究维度） | 不画 protocol 的内部步骤 |
| walkthrough | `assets/diagrams/main-flow.svg` | walkthrough 顶层流程图，5-6 个大方块（采集 → 检查点 → 提炼 → 检查点 → 构建 → 验证 → 精炼） | 不画 14 stage 详情 |
| file-map | `assets/diagrams/package-map.svg` | 左边 nuwa 源包（SKILL.md / references / scripts）+ 右边生成目录 `.claude/skills/taleb-perspective/` 的全树 + 中间箭头标"复制 scripts / 套模板 / 写入研究存档" | 不画文件内部 |
| design-choices | `assets/diagrams/dependencies.svg` | 8 个设计选择之间的依赖网（例：三重验证 funnel 依赖于 6 agent 并行；检查点设计依赖于产物文本可见；反推 Agentic Protocol 依赖于三重验证已通过） | 不画选择内容 |
| patterns | `assets/diagrams/pattern-network.svg` | 7-8 张 pattern card 之间的 relatedPatterns 关系网 | 不画 pattern 内容 |

## 6. 写作 voice 硬规则（每页过一遍）

1. **第一人称 AI**：叙事主语是"我，一个正在使用女娲的 AI"。不写"用户应该这样""开发者会这样"。
2. **概念先解释再用名字**：第一次出现"心智模型 / 三重验证 / Agentic Protocol / 自包含原则"时给一行就地短解（25 字内一口气念得完），不假设读者懂。
3. **每个设计选择都点名它防的坏 AI 输出**：不写"这是好的实践"，写"如果不这样，AI 会做坏成什么样"。
4. **真材料贯穿**：塔勒布在每个 stage 都出真东西——调研片段 / Agent prompt / 三重验证表上的具体候选 / Agentic Protocol 反推 / 7 对张力 / 6 条边界。
5. **跨阶段叙事钩子**：每个 stage 开头"**接上一步：**__"回收上一步，结尾"**下一步靠这个：**__"埋伏笔。第一站用"**从这里开始：**"，最后一站用"**这里把账结清：**"。
6. **反装样**：禁止学者名（"波兰尼边缘""诺维格视角"等）/ 英文术语包装（"Anti-pattern Caricature Risk"等）/ 文学修辞（"信念之刃""祖孙关系"等）/ 中英夹杂（"audience: Reuser"等）/ 工程缩写（"质量门""硬节点""真相源""流水线""信息池"等）。source skill 固有命名（`SKILL.md` / `Phase 0.5` / `Agentic Protocol` / `skin in the game`）保留，但要 inline 解释。

## 7. 共享 ID 表（页面之间互链用）

- **stage IDs**（walkthrough 14 个）：
  - `triage-input` — Phase 0 入口分流
  - `clarify-direct` — Phase 0A 需求澄清
  - `create-dir` — Phase 0.5 创建目录
  - `swarm-launch` — Phase 1 启动 6 agent
  - `agent1-writings` — Phase 1 Agent 1 著作样本
  - `research-checkpoint` — Phase 1.5 检查点
  - `triple-check` — Phase 2.1 三重验证
  - `dna-tension-boundary` — Phase 2.3-2.6 DNA / 张力 / 边界
  - `synthesis-checkpoint` — Phase 2.5 提炼检查点
  - `derive-protocol` — Phase 3 反推 Agentic Protocol
  - `fill-template` — Phase 3 套模板 + 自检 + 写盘
  - `sanity-edge-voice` — Phase 4 三类测试
  - `dual-refine` — Phase 5 双 agent 精炼
  - `deliver` — 交付

- **design choice IDs**：`dc1` ~ `dc8`
  - `dc1` 三道检查点（1.5 / 2.5 / 4）
  - `dc2` 6 agent 并行不串行
  - `dc3` 三重验证 funnel 不是越多越好
  - `dc4` Agentic Protocol 反推 ≠ 写死模板
  - `dc5` 信息源黑名单
  - `dc6` 自包含目录（脚本复制进去）
  - `dc7` 独立子 agent 做验证
  - `dc8` 保留矛盾不洗白

- **pattern IDs**：`p1` ~ `p8`
  - `p1` 三道便宜返工点 checkpoint
  - `p2` 并行采集 + funnel 筛选
  - `p3` 从产物反推协议
  - `p4` 独立验证打破自评偏差
  - `p5` 自包含目录原则
  - `p6` 信息源黑名单 + 来源标记
  - `p7` 保留矛盾 + 明示边界
  - `p8` 入口分流（明确名字 / 模糊需求）

- **term IDs**（glossary 9 个）：自动 slugify
  - `HOW vs WHAT` / `心智模型` / `决策启发式` / `表达 DNA` / `Agentic Protocol` / `三重验证` / `内在张力` / `诚实边界` / `自包含原则`

## 8. 不写的（防止跑题）

- 不写 nuwa 项目的发布历史 / 作者背景 / 致谢。
- 不评价 nuwa 写得好不好——只讲它的设计选择。
- 不和别的 perspective skill 做横向流派对比（除了 3 人 Agentic Protocol 横向对照表）。
- 不重复 nuwa root SKILL.md 的全文——只引被设计选择真正用到的段落。
- 不写宏大愿景（"让 AI 成为人类思维顾问"这种）——只写具体动作。
