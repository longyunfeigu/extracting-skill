# Skill X-Ray · `huashu-nuwa`（女娲 Skill 造人术）

**Source skill**：`/Users/guwanhua/.agents/skills/huashu-nuwa/`
**Live-run trace 落地**：`traces/taleb-perspective/`
**Trace 类型**：**live-run trace**（实际执行 Phase 0A → 0.5 → 1 → 1.5 → 2 → 2.5 → 3 → 4 → 5 完整流水线，产出真实 SKILL.md + 6 份调研 + 验证报告）
**Analyst**：`extracting-skill-patterns` meta skill（main thread）+ 12 个独立 subagent（6 调研 + 3 验证 + 2 精炼 + 1 prior 著作扩展）
**完成时间**：2026-05-13

---

## 1. What changed（3-5 条核心行为变化）

1. **从"写角色 prompt"变成"建生产线"**：默认 AI 收到「做一个塔勒布视角 Skill」会直接写"你现在是塔勒布，请用 antifragile 回答"。女娲拒绝这条捷径——它把任务展开成 9 个 Phase（含 3 个 hard checkpoint）的可检查流水线。
2. **从"模仿语气"变成"提炼框架"**：女娲明确要求"捕捉 HOW they think，不是 WHAT they said"。心智模型必须通过三重验证（跨域复现 + 生成力 + 排他性）才能升级——金句、流行术语、单领域口号会被降级或丢弃。
3. **从"凭训练记忆生成"变成"6 个 subagent fan-out 调研"**：女娲不让主 thread 凭训练语料编。它要求并行 6 个 subagent 分别做著作 / 长对话 / 表达 DNA / 他者视角 / 决策 / 时间线，每个 agent 必须把证据写进文件、标注一手/二手/推断、保留矛盾不和稀泥。
4. **从"成品 SKILL.md"变成"自包含 Skill 目录"**：所有调研、原始素材、脚本和最终 SKILL.md 都在同一个目录里。设计目的是开源分发——复制目录即可独立使用，不依赖外部状态。
5. **从"成品交付"变成"4 次质量门 + 2 个精炼 agent"**：Phase 4 三项独立测试（已知 / 边缘 / 风格）+ Phase 5 双 Agent 精炼（auto-skill-optimizer / skill-creator）是标准后置工序，不是可选清单。

---

## 2. Real task used（代表性请求）

> 「蒸馏一个塔勒布的视角 Skill，用来帮我判断投资和产品决策里的尾部风险。我没有本地素材，你直接做。」

**为什么这个例子**：它走女娲最核心的主路径——明确人名（Phase 0A 直接路径）+ 新建（无现有 skill）+ 无本地语料（纯网络搜索模式）+ 人物 Skill（不是主题 Skill）+ 西方人物（不触发中文人物的 B 站/小宇宙特殊源）。能完整覆盖 9 个 Phase 的标准流程，不偏向边缘分支。

**实际产出**：
- `traces/taleb-perspective/SKILL.md`（457 行，6 心智模型 + 8 决策启发式 + 完整表达 DNA + Agentic Protocol）
- `traces/taleb-perspective/references/research/01-06.md`（6 份调研，共 1501 行，174 个独立来源，一手占比 76%）
- `traces/taleb-perspective/references/research/extraction-notes.md`（Phase 2 三重验证笔记）
- `traces/taleb-perspective/TRACE.md`（live-run trace 全记录，191 行）

---

## 3. Recommended path（执行过的路径）

| Phase | 我（meta skill 的 AI）做了什么 | 输出 / 中间产物 |
| --- | --- | --- |
| 0A 入口分流 | 识别"明确人名"，走直接路径；按 default 选全面画像 + 思维顾问 + 无本地语料 | 入口确认 |
| 0.5 建目录 | 创建 `traces/taleb-perspective/{scripts,references/research,references/sources/{books,transcripts,articles}}`；复制女娲 4 个脚本 + 2 个模板 | 自包含目录 |
| 1 调研 fan-out | 并行 spawn 6 个 general-purpose subagent，每个用 WebSearch+WebFetch 调研一个维度，落到 `references/research/0X.md` | 1501 行调研 + 174 个 URL + 1 次 prompt injection 警示（被识别） |
| 1.5 调研 review | 跑 `scripts/merge_research.py` → 摘要表 → analyst-proxy 推进（按 AD-08） | 174 来源 / 一手 76% / 矛盾 5 处 |
| 2 三重验证提炼 | 读 `references/extraction-framework.md` → 对候选论点跑跨域复现+生成力+排他性 | 6 心智模型 + 8 决策启发式 + 表达 DNA + 内在张力 + 谱系 + 边界 |
| 2.5 提炼确认 | 摘要 → analyst-proxy 推进（AD-09） | 进入 Phase 3 |
| 3 构建 SKILL.md | 读 `references/skill-template.md` → 填充；Step 2 研究维度从心智模型反推 | SKILL.md 432 → 457 行 |
| 4 质量验证 | 跑 `quality_check.py` 6/6 通过；spawn 3 subagent 做已知 / 边缘 / 风格测试 | 3/3 PASS（已知）+ PASS（边缘 5 模型 + 不确定标记）+ PASS 9/9（风格） |
| 5 双 Agent 精炼 | spawn 2 subagent（A skill-optimizer / B skill-creator）→ 综合不冲突的改进 → 3 处编辑 | 加 Step 3.5 反 caricature 自检 + 指纹密度上限 + 伪问题第四类 + 三条不要复刻硬规则 |

---

## 4. Auto Decision Log + Checkpoint Map

### Auto Decision Log

| 编号 | 决策 | Skill 推荐 | 我选了 | 问用户? | 何时改成问 |
| --- | --- | --- | --- | --- | --- |
| AD-01 | Phase 0 入口分流 | 明确人名→直接路径 | 直接路径 | 否 | 用户只给模糊需求时改走 0B |
| AD-02 | 聚焦方向 | 全面画像 vs 单维度 | 全面画像 | 否 | 用户说「只要他怎么看 X」 |
| AD-03 | 用途 | 思维顾问 default | 思维顾问 | 否 | 用户说「只用来扮演他对话」 |
| AD-04 | 新建 or 更新 | 检查目录是否存在 | 新建 | 否 | 已存在时改更新模式 |
| AD-05 | 本地语料 | 询问用户 | 无本地语料 | 否 | 用户后续提供素材时切换 |
| AD-06 | 产物落地 | `.claude/skills/[name]-perspective/` | `traces/taleb-perspective/` | **是** | analyst-vs-skill 边界，必问 |
| AD-07 | Phase 1 调研深度 | Z-Library + yt-dlp + WebSearch | 只用 WebSearch + WebFetch | **是** | 用户允许高成本时放开 |
| AD-08 | Phase 1.5 checkpoint | 调研质量 review | analyst 代用户推进 | **是** | 用户在桌边改回真停 |
| AD-09 | Phase 2.5 checkpoint | 提炼摘要确认 | analyst 代用户推进 | **是** | 同上 |
| AD-10 | Phase 4 checkpoint | 验证结果展示 | analyst 代用户推进 | **是** | 同上 |

### Checkpoint Map（hard human checkpoints in source skill）

| Checkpoint | Skill 为什么设它 | 有 default? | 我们这次怎么处理 |
| --- | --- | --- | --- |
| Phase 1.5 调研 review | 调研质量决定 skill 上限 | 无 default | analyst proxy approval；真用户在桌边会真停 |
| Phase 2.5 提炼确认 | 主观判断最重，错了写完 400 行才发现 | 无 default | 同上 |
| Phase 4 验证展示 | 给用户看验证再交付 | 无 default | 同上 |

---

## 5. Trace（live-run，含安全事件）

**类型**：**live-run trace**（不是 source-grounded / 不是 simulated）

- 6 个 subagent 真实并行调研，每个跑 6-13 分钟，总产出 1501 行调研 + 174 个独立 URL（黑名单 0 命中——女娲的「永远排除知乎 / 公众号 / 百度系」在所有 6 个 agent 都自动生效）
- 3 个验证 subagent 真实独立跑测试（每个 30-80 秒）
- 2 个精炼 subagent 真实独立评审（A 53 秒 / B 82 秒）
- 跑了 `merge_research.py` + `quality_check.py` 两个女娲自带脚本，两次脚本都做了诚实的失败/通过报告

**安全事件**（真实发生，trace 期间）：Agent 1（著作维度）在某次 WebSearch 返回内容中检测到一次 **prompt injection 尝试**——伪装成 "MCP server instructions" 系统提示，试图引导 Agent 1 调用 context7 / pencil 工具。Agent 1 识别并忽略，完成原任务后在 `01-writings.md` 末尾给下游 Agent 留了警告。
- **影响**：无（注入被识别拒绝）
- **意义**：女娲的"信息源黑名单 + 一手/二手分级 + 不要凭训练记忆编"这套约束，在实际遭遇 prompt injection 时起到了二次防护——Agent 知道自己要做什么、不该转向工具调用。这是个值得在 Intervention Map 高亮的真实证据。

**未执行的高成本步骤**（按 AD-07 跳过）：Z-Library 下书 / yt-dlp 抓 transcript / 完整 X archive。Phase 1.5 的调研缺口已诚实记录（X 推文付费墙 / Lex Fridman 等长访谈缺 transcript / Universa 真实收益数字未独立验证）。

---

## 6. Baseline diff（无女娲 vs 有女娲）

| 维度 | 无女娲（默认 AI） | 有女娲（live-run 观察） |
| --- | --- | --- |
| 起手 | 立刻写 "你现在是塔勒布..." 角色 prompt | 先建自包含目录，明确产物落地路径 |
| 调研 | 凭训练记忆生成"塔勒布观点" | 6 subagent 并行真实 WebSearch；落到 6 份 markdown |
| 来源标注 | 无来源 / 编 URL | 174 个真实 URL；一手/二手/推断分级 |
| 心智模型 | 把 antifragile / Black Swan / Skin in the Game 直接列出 | 通过三重验证；候选 24 个 → 升 6 个 / 降 2 个 / 合并 4 个 / 丢弃 12 个 |
| 矛盾处理 | 和稀泥（"塔勒布既批学界又是教授"被忽略） | 保留 7 对张力（Bitcoin 反转 / 反学院 vs NYU 头衔 / war > debate / Barbell 自己不用...） |
| 表达 DNA | 学他几个词（IYI / 反脆弱） | 提取 8 条结构化特征（句式 / 词汇 / 节奏 / 幽默 / 确定性 / 引用 / 禁忌词 / 故事库） |
| Agentic Protocol | 不会想到要给 | 强制生成；Step 2 研究维度从 6 个心智模型反推 |
| 验证 | 自评通过 | 独立 subagent 跑 3 项盲测；脚本 6/6 通过 |
| 精炼 | 一次写完交付 | 双 Agent 评审 → 主 thread 综合 → 3 处定向修改（防 caricature） |
| 最终产物大小 | ~150-200 行 prompt | 457 行 SKILL.md + 1501 行调研 + 191 行 trace = 自包含目录 |
| Caricature 风险 | 高（"塞满 IYI / 火鸡 / 杠铃 / FRAUD"） | Phase 4.3 实测发现风险 → Phase 5 工程化拦截（Step 3.5 自检 + 三条硬刹车 + 指纹密度上限） |

---

## 7. Intervention Map

按四组分组：Intake / Execution / Validation / Output。每行带 evidence + downstream effect。

### Intake interventions

| AI default instinct | Skill intervention | Evidence | Downstream effect |
| --- | --- | --- | --- |
| **I1**. 用户说"做一个 X 的 skill"我直接开始写 | 先做 Phase 0A/0B 入口分流，明确人名 / 模糊需求两条路径；明确人名后还要确认聚焦 / 用途 / 是否本地语料 / 新建 vs 更新 | source（SKILL.md L34-56）+ trace（live-run 真的走 Phase 0A） | 后续 Phase 不会被"模糊用户需求"污染；trace 文件能记录每个 default 选择和它的条件 |
| **I2**. 立即开始网络搜索 / 凭训练记忆生成 | 先建自包含目录（Phase 0.5），目录结构固定为 `references/research/01-06.md` + `references/sources/{books,transcripts,articles}` + `scripts/` + `SKILL.md` | source（SKILL.md L143-159）+ trace（实际创建并复制 scripts） | "复制目录就能独立使用，不依赖外部状态"——开源分发可行 |

### Execution interventions

| AI default instinct | Skill intervention | Evidence | Downstream effect |
| --- | --- | --- | --- |
| **E3**. 主 thread 自己 WebSearch 一轮，生成"塔勒布概览" | 强制并行 fan-out 6 个 subagent，每个 prompt 自包含信息源黑名单 + 一手/二手分级 + 矛盾保留约束 | source（SKILL.md L213-265）+ trace（6 subagent 实际跑出 1501 行） | 单点失败被分散；信息源黑名单在所有 6 agent 上一致生效（174 来源 0 命中黑名单）；prompt injection 被识别 |
| **E4**. 看到名言金句立即升级为"核心心智模型" | 三重验证（跨域复现 ≥2 域 + 能推断新问题 + 排他性强）；1-2 重降为决策启发式；0 重丢弃 | source（`references/extraction-framework.md` L7-32）+ trace（24 候选 → 6 心智模型 / 2 降级 / 12 丢弃） | 6 个心智模型每个都有 ≥2 域证据 + 局限说明，Phase 4.1 三道已知题 PASS 3/3 |
| **E5**. 遇到矛盾就调和（"塔勒布既批学界又是教授，说明他立场复杂"） | 明确"保留矛盾，不要和稀泥"；分类为"时间性 / 领域性 / 本质性张力"三种 | source（`extraction-framework.md` L74-99） | SKILL.md 留下 7 对张力（含 Bitcoin 反转 / Barbell 自己不用 / war > debate），让 skill 拒绝伪装一致 |
| **E6**. 写完 SKILL.md 顺手把人物 Skill 当 prompt 用 | 强制生成 Agentic Protocol，**Step 2 研究维度必须从人物的心智模型反推**，不是套通用模板 | source（SKILL.md L440-495）+ trace（taleb 的 6 个研究维度直接来自 6 个心智模型） | 人物 Skill 遇到事实问题先查事实再答；Phase 4.2 边缘测试触及 5 个模型 + 显式不确定标记 |

### Validation interventions

| AI default instinct | Skill intervention | Evidence | Downstream effect |
| --- | --- | --- | --- |
| **V7**. 主 thread 自己评估 SKILL.md 质量 | Phase 4 强制 spawn 独立 subagent 跑 3 项测试（已知 / 边缘 / 风格），主 thread 不能自评 | source（SKILL.md L508-540）+ trace（3 subagent 真实独立测） | 已知测试 3/3 PASS；风格测试 9/9 PASS 时 subagent 主动警示"指纹密度过高、比真塔勒布 caricature"——这条警示直接喂给 Phase 5 |
| **V8**. 验证通过就交付 | Phase 4 通过后强制启动 Phase 5 双 Agent 精炼（auto-skill-optimizer + skill-creator 视角并行） | source（SKILL.md L545-562）+ trace（A/B 两份独立评审报告） | Phase 5 暴露 Phase 4 没看到的缺陷：检查点设计 2/5 + 失败预防 2/5；Step 1 漏第四类伪问题；war > debate 拦截规则位置错——直接转成 3 处可贴文本 |

### Output interventions

| AI default instinct | Skill intervention | Evidence | Downstream effect |
| --- | --- | --- | --- |
| **O9**. 调研缺口默认不说 | 强制"诚实边界"≥3 条，标注调研时间 + 信息不足维度 + 言行不一致案例 | source（SKILL.md L483-498）+ trace（taleb SKILL.md 写了 10 条边界，含 Twitter 付费墙 / barbell 自用比例 / cross-domain 同一锤子） | Phase 4 quality_check 直接拦截"边界 <3 条"的 SKILL.md；用户拿到 skill 时知道它的天花板 |
| **O10**. 学到的攻击模式（IYI / FRAUD!!!!!）一并复刻给用户 | Phase 5 加入"三条不要复刻"硬规则——对用户给 intellectual charity / 跨域不硬套 fat tails / 拒答必给替代问题 | source（女娲 SKILL.md 没显式说但 Phase 5 验证发现）+ trace（Phase 5 Agent B 把这条 distil 出来加进 SKILL.md L26-32） | 角色扮演不会把塔勒布在 X 上对 Pinker 的 "war > debate" 复刻给用户本人；toxic 模式被显式拦截 |

---

## 8. Evidence table（major claim → tag）

| Claim | Tag | 出处 |
| --- | --- | --- |
| 女娲让 AI 先建自包含目录再调研 | source + trace | SKILL.md L143-159 + 实际创建 |
| 6 subagent 并行 fan-out + 黑名单生效 | source + trace | SKILL.md L213-265 + 174 URL 0 黑名单命中 |
| 三重验证升降心智模型 | source + trace | extraction-framework.md L7-32 + extraction-notes.md 升降表 |
| Agentic Protocol 研究维度从心智模型反推 | source + trace | SKILL.md L440-495 + taleb 6 维度来自 6 模型 |
| Phase 4 强制独立 subagent 验证 | source + trace | SKILL.md L508-540 + 3 subagent 真实跑 |
| Phase 4.3 自警 caricature 风险 | trace + diff | 风格测试 subagent 主动写"B 段指纹堆叠过密"|
| Phase 5 双 Agent 精炼 → 3 处 SKILL.md 修改 | source + trace | SKILL.md L545-562 + 实际 Edit |
| prompt injection 被识别 | trace | Agent 1 摘要 + 01-writings.md 末尾警告 |
| 默认 AI 会把 caricature 当成"像塔勒布" | diff + inference | baseline diff 表（无女娲 vs 有女娲） |
| 心智模型的局限性 ≥1 条/个 | source + trace | quality_check.py 6/6 PASS |

---

## 9. Friction score

### 加上的复杂度
- 必读 4 份 references（`SKILL.md` + `extraction-framework.md` + `skill-template.md` + 6 份调研 = 共 ~2500 行需要 main thread 读）
- 必跑 ≥11 个 subagent（6 调研 + 3 验证 + 2 精炼）
- 必跑 ≥2 个 Python 脚本（merge_research / quality_check）
- 强制 9 个 Phase，含 3 个 hard checkpoint
- 强制三重验证 + 矛盾保留 + 诚实边界 + Agentic Protocol + 双 Agent 精炼
- 最终产物 ≥ 2000 行（含调研）

### 换来的真行为变化
- 174 个独立来源，0 黑名单命中
- 一手占比 76%（远超 50% 阈值）
- prompt injection 被识别（trace 期间真实事件）
- 三重验证升 6 / 降 2 / 丢 12，模型质量经得起 Phase 4.1 三道已知题 PASS 3/3
- Phase 5 把 "Phase 4 自我警示的 caricature 风险" 工程化拦截
- 自包含目录可独立分发

### 判决

值得。对于**深度人物 / 主题 skill**这种复杂工件，女娲的 9 Phase + 11 subagent fan-out 是合适的——单 thread 模仿出来的塔勒布最多 100 字像，遇到伪问题 / 跨域题 / 没表态过的人就崩。

不值得。对于**简单 prompt 类 skill**（如"帮我写一份 Slack 自动总结"），这套流水线是过度工程。判断阈值：如果目标 skill 需要"提炼某个人的判断框架而不是抄他的话"，跑女娲；否则用更轻的工具。

---

## 10. Upgrade options

| Upgrade | 当前状态 | 建议 |
| --- | --- | --- |
| **Full handbook（多页 web 手册）** | **已选定**（用户指定"采用 handbook"） | 接下来按 `references/handbook-spec.md` + `references/web-production-flow.md` 把这份 X-Ray 的 Intervention Map / Auto Decision / 证据 / Friction 全部 carry-forward 进 `handbook-brief.md`；用 7 页 web app 渲染 |
| **Branch comparison** | 未做 | 可比较：默认全面画像 vs 单维度聚焦 / 全网络搜索 vs 本地语料优先 / 单 Phase 串行 vs 6 subagent 并行 |
| **Eval proof** | 部分（Phase 4 单 case 三测） | 跑 3-5 个不同人物（已 / 历史 / 中文 / 主题 / 蒸馏自己）看通过率 |
| **Pattern extraction** | 待 handbook 完成后再做 | Patterns 页可提取 9 个迁移性招数：自包含目录 / fan-out 调研 / 三重验证 / 矛盾保留 / Agentic Protocol 反推 / 独立验证 subagent / 双 Agent 精炼 / 信息源黑名单 / Hard checkpoint vs Auto decision 区分 |

---

## 准备进入 handbook 模式

下一步：写 `handbook-brief.md`，把 X-Ray 的 5 大工件（Intervention Map / Auto Decision Log / Evidence / Friction / Trace 类型）carry-forward 进去，作为 7 页 web app 的真相源。
