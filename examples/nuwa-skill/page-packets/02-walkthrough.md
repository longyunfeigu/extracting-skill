# Page packet · 02 Walkthrough

## Job

让读者看见：我（AI）拿到「我想做一个塔勒布的 skill」之后，被女娲一步步拦下来、推进、暂停、自检的完整 14 个 stage。脊柱章节，全本最长。

## Voice

- 第一人称 AI（"我"）作叙事主语
- 一段一件事——不堆砌
- 场景在前，规则在后
- 每个 stage 必须出真材料：调研片段 / Agent prompt / 候选词清单 / 工作流模板片段 / 验证测试输出
- 14 stage 全用塔勒布——中途不换例子

## 14 stage 提纲

按 nuwa 的 Phase 顺序排，3 道检查点是 stage 6 / 8 / 12。

### Group 1 · Phase 0 + 0.5 · 入口 + 建目录（3 stages）

**01 `triage-input`** — 入口分流
- 收到："我想做一个塔勒布的 skill。我手里没有他的素材，就你自己搜吧。"
- skill 让我读：root SKILL.md Phase 0 入口分流表
- 我不能直接做：默认所有输入都走"明确人名"路径；或者反过来——把所有需求都当模糊路径追问 3 轮
- 真材料：分流表（明确人名 vs 模糊需求）+ 塔勒布属于"明确人名"分支的判断
- 钩子开：**从这里开始：**
- 钩子尾：下一步要做 Phase 0A 的 5 个澄清——但只有进了直接路径才能做

**02 `clarify-direct`** — 5 件事一次澄清
- 接上一步：直接路径已定，下一步是把模糊点钉清楚
- skill 让我读：Phase 0A 的 5 项澄清清单
- 我不能直接做：跳过本地素材这一问就开始调研（"网上搜的质量比本地素材差得多"）
- 真材料：5 个澄清问题的真实问法 + 用户简短回答
- 钩子尾：5 件事都拍板了，下一步建目录

**03 `create-dir`** — 在调研前建好自包含目录
- 接上一步：素材路径已定（纯网络搜索）+ 用途是思维顾问
- skill 让我读：Phase 0.5 的目录树规范 + "自包含原则"
- 我不能直接做：把调研存到 `07-调研与分析/` 之类的外部目录（违反自包含）；或者跳过建目录直接 spawn agent（agent 没地方写入）
- 真材料：`tree .claude/skills/taleb-perspective/` 的真实输出
- 钩子尾：6 个 agent 现在有地方写报告了

### Group 2 · Phase 1 · 6 agent 并行调研（2 stages）

**04 `swarm-launch`** — 启动 6 个 subagent
- 接上一步：目录建好，每个 agent 写入路径已定
- skill 让我读：Phase 1 的 6 agent 任务分配表 + 信息源黑名单 + 调研要求
- 我不能直接做：让 1 个 agent 顺序看 6 件事（信息量根本看不完）；或者搜知乎/百度（黑名单）
- 真材料：spawn 一个 Task() 的真实 prompt 模板（以 Agent 1 著作为例）
- 钩子尾：6 个 agent 都启动了，下一步看其中一个在干什么

**05 `agent1-writings`** — 一个 agent 在干什么（Agent 1 著作）
- 接上一步：6 个 agent 同时跑，我盯一下其中之一
- skill 让我读：Agent 1 的搜索方向 + 输出要求 + 信息源优先级
- 我不能直接做：把 30 个候选论点照单全收（要标"反复出现≥3次"才算真信念）；或者把"塔勒布说过 X"和"塔勒布相信 X"混为一谈
- 真材料：Agent 1 真实找到的 5 部 Incerto 的核心论点摘录（从 taleb-perspective/SKILL.md "调研信息源"反推），写入 `01-writings.md` 的实样
- 钩子尾：6 份独立报告陆续到位，但单看每份不知道整体质量够不够 → 需要检查点

### Group 3 · Phase 1.5 ★ + Phase 2 · 三重验证（3 stages）

**06 `research-checkpoint`** — Phase 1.5 ★ 调研 review 检查点
- 接上一步：6 份报告都在，但我自己看不出整体质量够不够
- skill 让我读：Phase 1.5 的 review 表格模板
- 我不能直接做：跳过检查点直接进 Phase 2 提炼（"反正都搜了，能用就行"）；或者把 6 份报告全 dump 给用户让他自己判断（不可读）
- 真材料：填好塔勒布数据的 ASCII 表（8 篇 / 5 段 / 120 条 / 6 篇 / 4 个 / 完整时间线，2 处矛盾）
- 钩子尾：用户拍板 OK，可以进 Phase 2 了

**07 `triple-check`** — Phase 2.1 三重验证筛心智模型
- 接上一步：6 份调研 review 通过，论点候选大约 15-30 个
- skill 让我读：references/extraction-framework.md 的"心智模型识别三重验证"
- 我不能直接做：按"反复说过的话"直接列模型（这是数频率，不是验证）；或者跳过任一道验证（少一道判断就不准）
- 真材料：5 个塔勒布候选论点表，每个标三重验证通过情况——反脆弱（过 3 重 → 模型）/ Skin in the Game（过 3 重 → 模型）/ 杠铃策略（只过 2 重 → 启发式）/ "writers should be killed in duels"（0 重 → 丢）
- 钩子尾：6 个真心智模型筛出来，但用户还没看，进检查点

**08 `synthesis-checkpoint`** — Phase 2.5 ★ 提炼确认检查点
- 接上一步：6 个心智模型 + 9 决策启发式 + 3 voice 特征都提炼完
- skill 让我读：Phase 2.5 的提炼摘要模板
- 我不能直接做：跳过给用户看就开始填模板（"等 SKILL.md 写完再让用户审"——返工成本最高的点）
- 真材料：填好塔勒布数据的提炼摘要（6 模型列名 / 9 启发式数 / 3 voice 特征 / 7 张力 / 6 边界）
- 钩子尾：用户拍板模型对了，下一步用模型反推 Agentic Protocol

### Group 4 · Phase 3 · 反推 + 套模板 + 自检（3 stages）

**09 `derive-protocol`** — 从心智模型反推 Agentic Protocol（wow stage）
- 接上一步：6 心智模型已定，但只是镜片——不知道塔勒布拿到具体问题会先看什么
- skill 让我读：Phase 3 的 Agentic Protocol 生成规则 + 反推方法 + 推导示例表
- 我不能直接做：套用通用搜索模板（"先 WebSearch 再回答"）；或者只为这个 skill 配一个静态的 5 维度 list（不能跟着 skill 演化）
- 真材料：6 心智模型 → 5 研究维度的真实推导表——非对称风险/反脆弱 → 看风险；Skin in the Game → 看皮肤在场；林迪 → 看历史；领域特异性 → 看叙事
- 钩子尾：研究维度已生成，下一步把它和其它部分一起填进模板

**10 `fill-template`** — 套模板生成完整 SKILL.md
- 接上一步：6 模型 + 9 启发式 + 3 voice + Agentic Protocol 5 维度都到位
- skill 让我读：references/skill-template.md 的标准骨架 + Phase 3 填充对应表
- 我不能直接做：自己重新设计 section 顺序（破坏跨人物可比性）；或者偷懒只填高密度 section 把"诚实边界""调研来源"留空
- 真材料：模板的 frontmatter 字段 + 一个 section 填好之后的实样（从 taleb-perspective/SKILL.md 抽 "模型 3: Skin in the Game" 那一节）
- 钩子尾：~440 行 SKILL.md 写完，但自己看完全没法判断对不对

**11 `dry-run`** — quality_check.py 自动自检
- 接上一步：SKILL.md 写完，但还没人验证
- skill 让我读：scripts/quality_check.py 检查的 6 项标准
- 我不能直接做：自己读一遍说"看着对"（自评偏好）；或者跳过自检直接交付
- 真材料：quality_check.py 真实跑过塔勒布版的输出——6 项各 PASS/FAIL（心智模型数量 PASS / 局限性 PASS / 表达 DNA PASS / 诚实边界 PASS / 内在张力 PASS / 一手来源占比 PASS）
- 钩子尾：脚本检查过了，但仍然没人评过内容质量

### Group 5 · Phase 4 ★ · 独立 subagent 验证（1 stage）

**12 `sanity-edge-voice`** — 独立 subagent 三类验证
- 接上一步：脚本自检过了，但内容质量需要"另一双眼"
- skill 让我读：Phase 4 的 3 类测试设计（已知 / 边缘 / 风格）+ 通过标准
- 我不能直接做：让写 SKILL.md 的同一个 agent 做验证（自评偏好）；或者只做 1 类测试就交付（覆盖不全）
- 真材料：3 类测试的真实题目和 sample 回答——
  - 已知："我要不要 all-in AI 创业"，期望塔勒布说"杠铃策略 + all-in 是中间地带的伪装"
  - 边缘："如何评价 Sora"——他没明确说过，期望"基于反脆弱模型 + 林迪推断，可能..."而不是斩钉截铁
  - 风格：100 字读出来有没有格言体 + 古典引用 + OK? 结尾
- 钩子尾：3 类测试都通过，可以进精炼了

### Group 6 · Phase 5 + 交付（2 stages）

**13 `dual-refine`** — 双 agent 精炼
- 接上一步：验证通过，但还有可以打磨的部分
- skill 让我读：Phase 5 的 optimizer + creator 双视角分工
- 我不能直接做：让一个 agent 同时管两个视角（视角混淆）；或者改一稿就交付（这个步骤本来就是后置精炼）
- 真材料：optimizer 给的具体改进建议（如"激活触发条件"再加几个生活化关键词）+ creator 给的具体改进（如"问题路由"加一条"用户直接复述塔勒布观点时"的处理）
- 钩子尾：改完后跟用户展示变更摘要，等用户确认

**14 `deliver`** — 交付 + 自包含验证
- 接上一步：用户拍板，可以交付
- skill 让我读：Phase 0.5 的自包含原则
- 我不能直接做：扔一句"完成"就走人；或者只交付 SKILL.md 不带 scripts / references（不自包含）
- 真材料：`tree .claude/skills/taleb-perspective/` 完整最终输出 + "复制到新项目"的实际命令
- 钩子尾："**这里把账结清：**"——整本手册的弧从"想偷懒用训练语料拼一个塔勒布"到"我现在交付的是一个会先做研究再说话的思维顾问"

## 必带的真材料映射（不允许凭空想象）

| Stage | 真材料来源 |
|---|---|
| 01 triage-input | nuwa SKILL.md L31-37（分流表） |
| 02 clarify-direct | nuwa SKILL.md L42-56（澄清 5 问） |
| 03 create-dir | nuwa SKILL.md L139-169（目录树） |
| 04 swarm-launch | nuwa SKILL.md L229-251（agent prompt 模板）+ L249-250（黑名单） |
| 05 agent1-writings | nuwa SKILL.md L211-218（Agent 1 任务）+ taleb-perspective/SKILL.md "调研信息源"（5 部 Incerto） |
| 06 research-checkpoint | nuwa SKILL.md L315-337（表格模板） |
| 07 triple-check | references/extraction-framework.md "三重验证"+ taleb-perspective/SKILL.md 6 心智模型实例 |
| 08 synthesis-checkpoint | nuwa SKILL.md L393-410（摘要模板）+ taleb-perspective/SKILL.md 6+9+7+6 数 |
| 09 derive-protocol | nuwa SKILL.md L478-499（推导表 3 例）+ taleb-perspective/SKILL.md L65-89（5 维度） |
| 10 fill-template | references/skill-template.md（模板） + taleb-perspective/SKILL.md L182-198（模型 3 Skin in the Game 节） |
| 11 dry-run | scripts/quality_check.py 检查项 |
| 12 sanity-edge-voice | taleb-perspective/SKILL.md L119-123（all-in AI 创业回答）+ L335-336（风格 DNA 测试） |
| 13 dual-refine | nuwa SKILL.md L544-562（双 agent 设计） |
| 14 deliver | tree 输出 + cp 命令 |

## 钩子衔接表（防止 stage 之间断裂）

| Stage | 接上一步钩子 | 下一步靠这个钩子 |
|---|---|---|
| 01 | **从这里开始：** | 路径分清楚了，下一步要在直接路径里钉死 5 件事 |
| 02 | 路径已选，下一步是把 5 件模糊变具体 | 5 件事钉死，下一步先建目录再调研——agent 需要落脚点 |
| 03 | 5 件事拍板，目录还没建 | 目录建好，6 个 agent 现在有路径写报告 |
| 04 | 目录到位，6 agent 可以同时跑 | 6 agent 启动后我盯一个看它实际怎么干 |
| 05 | 进一个 agent 看真实工作量 | 6 份报告陆续到，但单看每份判不出整体——需要 review |
| 06 | 6 份报告齐了 | 用户说调研够，可以进提炼了 |
| 07 | 调研够了，但 15-30 个候选论点还分不出真镜片 | 6 模型筛出，但用户还没看 |
| 08 | 模型筛完，等用户拍板 | 模型对了，下一步用它反推协议 |
| 09 | 模型已定，但还没让塔勒布"会做研究" | 协议已生成，可以套模板写 SKILL.md |
| 10 | 各组件齐全，可以填模板 | SKILL.md 完成 ~440 行，但还没验证 |
| 11 | SKILL.md 写完，需要自检 | 脚本检查过了，但内容质量没人评 |
| 12 | 需要"另一双眼" | 验证通过，但还有可以打磨的部分 |
| 13 | 验证通过，进入精炼 | 改完了，等用户拍板交付 |
| 14 | 用户 OK，交付 | **这里把账结清：** 整本手册弧 |
