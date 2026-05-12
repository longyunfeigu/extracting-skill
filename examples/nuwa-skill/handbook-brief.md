# 女娲 · Skill 造人术 解剖手册 · brief

> 这一份是全本手册的真相源。所有页面（data.js + 8 个 page shell）都从这里取共享 fact、共享例子、共享 ID。任何页面之间不一致以 brief 为准。

## 1. 全局 meta

- **title**: 女娲 · Skill 造人术 解剖手册
- **audience**: 想偷招的人 / 准备自己写一个"蒸馏一个人"的 skill 的人 / 第一次看见 nuwa 的 AI
- **sourcePath**: /home/guwanhua/Desktop/git/nuwa-skill
- **outputMode**: multi-page-web-handbook
- **generatedFor**: 让读者看见——当我作为 AI 拿到"做一个塔勒布的 skill"这个请求，女娲是怎么把我从"凭训练语料拼几句名言做角色扮演"拦下来、改写成"6 agent 并行调研 → 3 道检查点对齐 → 三重验证筛模型 → 反推 Agentic Protocol → 独立子 agent 验证"的完整生产线的。

## 2. running example（贯穿全本，中途不换）

**用户请求**：「我想做一个塔勒布的 skill。我手里没有他的素材，就你自己搜吧。」

**为什么是塔勒布**：
- nuwa root SKILL.md 多处用塔勒布举例（Phase 3 Agentic Protocol 推导表 3 例之一、"skin in the game"被点名为高频词）
- 活人，能演示 Agent 6 时间线的"最近 12 个月动态"
- voice 鲜明 + 争议大，能演示"内在张力""外部批评""诚实边界"三个 section 的价值
- `examples/taleb-perspective/SKILL.md` 已经存在 ~440 行真实产出，每个 stage 都能引真东西，不会写到一半变占位

**最终产出**：
- `.claude/skills/taleb-perspective/SKILL.md`（~440 行）
- `scripts/`（download_subtitles.sh / srt_to_transcript.py / merge_research.py / quality_check.py，从 nuwa 复制过来）
- `references/research/01-writings.md ~ 06-timeline.md`（6 agent 调研存档）
- `sources/{books,transcripts,articles}/`（一手素材原文）
- 整目录可独立复制到任何 Claude Code 项目就能用，不依赖 nuwa 自己——这是 nuwa "自包含" 硬要求

## 3. 共享 fact 池（写每页时回查，不要现编）

### nuwa 的 phase 划分（按 SKILL.md 行号）

| Phase | 名字 | 干什么 | 中间产物 |
|---|---|---|---|
| 0 | 入口分流 | 判断"明确人名"还是"模糊需求" | — |
| 0A | 需求澄清（直接路径） | 确认聚焦方向 / 用途 / 新建或更新 / 本地语料 | — |
| 0B | 需求诊断（模糊路径） | 1-2 轮追问定位 → 推荐 2-3 候选 → 用户选 | 候选清单 |
| 0.5 | 创建 skill 目录 | 在调研前建好 `.claude/skills/[name]-perspective/` 全树 | 空目录 + research/ + sources/ 子目录 |
| 1 | 多源信息采集（6 并行 agent） | 著作 / 对话 / 表达 / 他者 / 决策 / 时间线 | `references/research/01-06.md` |
| 1.5 | 调研 review 检查点 | 表格展示来源数 + 关键发现 + 矛盾点，等用户拍板 | 用户确认 |
| 2 | 框架提炼 | 三重验证筛心智模型 / 启发式 / 表达 DNA / 价值观 / 智识谱系 / 诚实边界 | 提炼笔记 |
| 2.5 | 提炼确认检查点 | 列摘要等用户拍板 | 用户确认 |
| 3 | skill 构建 | 读模板 + 反推 Agentic Protocol + 填充 + 自检 + 写盘 | 完成版 SKILL.md |
| 4 | 质量验证 | 独立 subagent 做 sanity / edge / voice 三类测试 | 验证报告 |
| 5 | 双 agent 精炼 | optimizer + creator 两个视角的改进建议 | 改进版 SKILL.md |

**3 道检查点**：1.5 / 2.5 / 4 —— 都是"在改起来还便宜的时候停一下问用户"。

### 三重验证（Phase 2 核心机制）

候选论点（通常 15-30 个） → 过三道筛 → 心智模型

1. **跨域复现**：在 ≥ 2 个不同领域出现
2. **生成力**：能推断此人对新问题的可能立场
3. **排他性**：不是所有聪明人都这样想

**三重过** → 心智模型（取 top 3-7 个）
**只过 1-2 重** → 决策启发式（5-10 条）
**0 重通过** → 丢

### 塔勒布跑完后的产物（用真东西举例）

- **6 个心智模型**（不是 7、不是 5）：
  1. 非对称风险思维
  2. 反脆弱偏好
  3. Skin in the Game 检验
  4. 林迪效应筛选
  5. Via Negativa（减法优先）
  6. 领域特异性
- **9 条决策启发式**（举例：杠铃策略 / 遍历性检验 / 火鸡问题 / 少数派规则 / 框架重置 / 绿木交易员原则 / 凸性试错 / 预防原则 / 反信号启发式）
- **Agentic Protocol 的 5 个"看什么"维度**（从 6 个心智模型反推）：
  1. 看风险（尾部风险 / 遍历性）← 模型 1
  2. 看脆弱性（压力测试 / 隐藏脆弱点）← 模型 2
  3. 看历史（黑天鹅先例 / 火鸡问题检验）← 模型 1 + 4
  4. 看叙事（主流叙事 / 反面观点）← 模型 6
  5. 看皮肤在场（谁在承担风险 / 激励不对称）← 模型 3
- **7 对内在张力**：思想反脆弱 vs 自尊脆弱 / 反学院 vs 自己是 NYU 教授 / 主张减法 vs Twitter 不断增加噪音 / 鼓吹 skin in the game vs 批评比特币时已清仓 / 蔑视社交媒体辩论 vs 最活跃的 Twitter 知识分子 / 推崇沉默 vs 最多话的公知 / 书中倡导谦逊 vs 个人行为绝对傲慢
- **6 条诚实边界**：创造力无法蒸馏 / 公开表达 ≠ 真实想法（线上线下人格差距）/ 在不擅长领域会出错（进化生物学 / 哥德尔定理）/ 500 页里只有 100 页洞察 / 不可证伪的自我保护系统（IYI 标签）/ 调研截止 2026-04-04

### 横向对照（用来证 wow moment 不是孤例）

| 人物 | Agentic Protocol 的"看什么"维度 |
|---|---|
| 塔勒布 | 看风险 / 看脆弱性 / 看历史 / 看叙事 / 看皮肤在场 |
| 费曼 | 第一性原理拆解 / 看实验数据 / 看类比 / 看盲区 |
| MrBeast | 看 CTR 和 AVD / 看竞品 Top10 / 看搜索趋势 / 看制作成本回报 |

三个完全不同领域的人物（思想家 / 物理学家 / 内容创作者），同一个 Agentic Protocol 外壳，"先看什么"全不一样——这是 nuwa Phase 3 反推不是写死模板的实证。

## 4. 7 个页面的 job 和 voice（page-packets 各自展开）

| 章 | page | job | voice 关键词 |
|---|---|---|---|
| 01 | overview | 给一个完全没看过 nuwa 的人一个能说清楚的版本，并把塔勒布作为贯穿例子引入 | 平铺直叙、第一人称 AI、不卖关子 |
| 02 | walkthrough | 我（AI）拿到"蒸馏塔勒布"后被 nuwa 一步步拦下来的 14 个 stage，每 stage 用塔勒布真东西落地 | 现场感、preTest 钩子、用真材料 |
| 03 | glossary | 8-10 个核心术语：HOW vs WHAT / 心智模型 / 决策启发式 / 表达 DNA / Agentic Protocol / 三重验证 / 内在张力 / 诚实边界 / 自包含原则 | 5 字段定义、用塔勒布举例 |
| 04 | file-map | root SKILL.md / 2 references / 4 scripts / 生成目录各管什么 | 责任卡 6 字段、写错会怎样 |
| 05 | design-choices | 8 个真改变了 AI 行为的设计选择 | 5 字段卡 + 3 场景力度对比 |
| 06 | patterns | 7-8 张可偷招的 pattern card | problem → therefore → solution + 反例 + 代价 |
| 07 | apply-it | 给读者自己写类似 skill 的清单 + 起手 prompt | 清单形式、可直接 copy |

## 5. 4 张 SVG 图（每张必须真画 + curl 200 + 非零字节）

| 给哪一页 | 文件名 | 画什么 | 不画什么 |
|---|---|---|---|
| walkthrough | `assets/diagrams/main-flow.svg` | Phase 0 → 0A/0B → 0.5 → 1 → 1.5★ → 2 → 2.5★ → 3 → 4★ → 5 的拓扑，3 个检查点标★ | 不画 14 个 stage 的内部细节（会糊） |
| file-map | `assets/diagrams/package-map.svg` | 左边 nuwa 源包结构（SKILL.md / references/ / scripts/）+ 右边生成目录 `.claude/skills/taleb-perspective/` 的全树 + 中间箭头标"复制 scripts / 套模板 / 产出研究存档" | 不画文件内的细节 |
| design-choices | `assets/diagrams/dependencies.svg` | 8 个设计选择互相依赖的网（例：三重验证 funnel 依赖 6 agent 并行；检查点设计依赖于产物大小可见性；反推 Agentic Protocol 依赖三重验证已通过） | 不画选择本身的解释 |
| patterns | `assets/diagrams/pattern-network.svg` | 7-8 张 pattern card 之间的 relatedPatterns 关系网 | 不画 pattern 内容 |

## 6. 写作 voice 硬规则（每页过一遍）

1. **第一人称 AI**：叙事主语是"我，一个正在使用女娲的 AI"。不写"用户应该这样""开发者会这样"。
2. **概念先解释再用名字**：第一次出现"心智模型 / 三重验证 / Agentic Protocol / 自包含原则"时给一行就地短解，不假设读者懂。
3. **每个设计选择都点名它防的坏 AI 输出**：不写"这是好的实践"，写"如果不这样，AI 会做坏成什么样"。
4. **真材料贯穿**：塔勒布在每个 stage 都出真东西——调研片段 / Agent prompt / 三重验证表上的具体候选 / Agentic Protocol 反推 / 7 对张力 / 6 条边界。
5. **跨阶段叙事钩子**：每个 stage 开头"接上一步：__"回收上一步，结尾"下一步靠这个：__"埋伏笔。
6. **反装样**：禁止学者名（"波兰尼边缘""诺维格视角"等）/ 英文术语包装（"Anti-pattern Caricature Risk"等）/ 文学修辞（"信念之刃""祖孙关系"等）/ 中英夹杂（"audience: Reuser"等）/ 工程缩写（"质量门""硬节点""真相源""流水线""信息池"等）。固有命名（`SKILL.md` / `Phase 0.5` / `Agentic Protocol` / `skin in the game`）保留但要 inline 解释。

## 7. 共享 ID 表（页面之间互链用）

- **stage IDs**（walkthrough 14 个）：`triage-input` / `clarify-direct` / `create-dir` / `swarm-launch` / `agent1-writings` / `research-checkpoint` / `triple-check` / `derive-protocol` / `synthesis-checkpoint` / `fill-template` / `dry-run` / `sanity-edge-voice` / `dual-refine` / `deliver`
- **design choice IDs**（design-choices 8 个）：`dc1` ~ `dc8`
- **pattern IDs**（patterns 7-8 个）：`p1` ~ `p8`
- **term IDs**（glossary 8-10 个）：自动 slugify

## 8. 不写的（防止跑题）

- 不写 nuwa 项目的发布历史 / 作者背景 / 致谢
- 不评价 nuwa 写得好不好——只讲它的设计选择
- 不和别的 perspective skill 做横向流派对比（除了 3 人 Agentic Protocol 横向表）
- 不重复 nuwa root SKILL.md 的全文——只引被设计选择真正用到的段落
