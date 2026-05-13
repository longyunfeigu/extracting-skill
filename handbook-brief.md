# 女娲 Skill 造人术 · handbook brief

> **真相源**：本文件 + `page-packets/*.packet.md`。`web-app/assets/data.js` 是渲染层，`handbook.md` 仅作最后线性导出，不是源。
> **carry-forward from**：`xray.md`（10 节 X-Ray，含 Intervention Map / Auto Decision Log / Evidence / Friction / Trace）

---

## X-Ray summary

女娲拒绝了"AI 收到『做一个塔勒布视角 skill』就直接写一份角色 prompt"的捷径，把这件事改造成 9-Phase 可检查流水线（含 3 个 hard checkpoint + 11 个独立 subagent）。最终交付不是 1 份 prompt，是**自包含目录**——心智模型经三重验证、证据带一手/二手分级、表达 DNA 结构化拆解、Agentic Protocol 研究维度从心智模型反推、独立 subagent 验证 + 双 Agent 精炼把 caricature 风险工程化拦截。

**Behavior-change claim**：默认 AI 把"人物 Skill"做成"语气包"，最多 100 字像；女娲让它变成"运行的认知操作系统"——遇到新问题、伪问题、跨域题，知道先做什么、什么时候停、什么时候承认不知道。

---

## Source skill 包 map

- 源路径：`/Users/guwanhua/.agents/skills/huashu-nuwa/`
- 入口：`SKILL.md`（645 行，9 Phase 流水线）
- 方法论引用：
  - `references/extraction-framework.md`（三重验证 / 表达 DNA 量化 / 矛盾处理 / 质量自检清单）
  - `references/skill-template.md`（人物 Skill 标准骨架）
- 脚本：
  - `scripts/download_subtitles.sh` —— YouTube 字幕下载（人工 > 中文 > 英文 > 自动）
  - `scripts/srt_to_transcript.py` —— SRT 转纯文本（去时间戳 / 序号 / HTML）
  - `scripts/merge_research.py` —— Phase 1.5 摘要表自动生成
  - `scripts/quality_check.py` —— Phase 4 通过标准自动核对（6 项）
- 示例：`examples/` 下 15 个完成的 perspective skill（munger / feynman / taleb / paulgraham / naval / mrbeast / steve-jobs / 张一鸣 等）
- 多语 README + skills-lock.json + 三张视觉素材

---

## Live-run trace 落地

- `traces/taleb-perspective/`（不污染全局 `.claude/skills/`，AD-06 已确认）
- `TRACE.md` 191 行：Auto Decision Log + Checkpoint Map + 每个 Phase 的实际执行记录 + 1 次 prompt injection 安全事件
- `references/research/01-06.md`（1501 行，174 URL，76% 一手）
- `references/research/extraction-notes.md`（Phase 2 三重验证表）
- `SKILL.md` 457 行（Phase 5 后定稿；quality_check.py 6/6 PASS）

---

## Total task（一句话）

我拿到「做一个 X 的视角 Skill」请求后，不是直接写一份角色扮演 prompt——女娲让我先确认对象、建自包含目录、6 路并行收集证据、用三道筛选出真正能迁移到新问题上的心智模型，再把这些材料写成一个会触发、会查事实、会承认边界、能扛 Phase 4 三测和 Phase 5 双精炼的 SKILL.md。

---

## Running example（贯穿全 handbook）

- **用户请求**：「蒸馏一个塔勒布的视角 Skill，用来帮我判断投资和产品决策里的尾部风险。我没有本地素材，你直接做。」
- **为什么这个例子**：走女娲最核心主路径——明确人名 + 新建 + 无本地语料 + 西方人物 + 人物 Skill（非主题）。能完整覆盖 9 个 Phase 的标准流，不偏向边缘分支。
- **期望产出**：`traces/taleb-perspective/SKILL.md` + 6 份调研笔记 + Agentic Protocol + 三测验证 + 双精炼 - 全部在同一目录。
- **实际产出**：见 X-Ray § 2。

---

## Recommended path 和 Auto Decision Log

直接 carry-forward from `xray.md` § 3 + § 4。10 条 AD 记录中：5 条无需问用户（按 default 推进）+ 5 条问过用户并记录（产物落地 / 调研深度 / 3 个 checkpoint 真停还是 proxy 推进）。

---

## Intervention Map rows（5-9 行 carry-forward）

完整版见 `xray.md` § 7。简要版（每行 = AI 默认 / Skill 干预 / 证据 / 下游影响）：

- **I1** 直接开始写 → Phase 0A/0B 入口分流 + 4 个确认问题
- **I2** 立即搜索/凭记忆 → Phase 0.5 建自包含目录
- **E3** 主 thread 自己搜一轮 → 6 subagent 并行 fan-out + 黑名单一致生效
- **E4** 看到金句升核心模型 → 三重验证（升 6 / 降 2 / 丢 12）
- **E5** 遇矛盾就调和 → 强制保留 7 对张力
- **E6** 把 SKILL.md 当 prompt 用 → 强制生成 Agentic Protocol + 研究维度反推
- **V7** 主 thread 自评 → Phase 4 强制独立 subagent 三测
- **V8** 验证通过就交付 → Phase 5 强制双 Agent 精炼
- **O9** 调研缺口默认不说 → 强制诚实边界 ≥3 条
- **O10** 学到的攻击模式一并复刻 → Phase 5 拦截"三条不要复刻"

---

## Evidence table（major claims）

见 `xray.md` § 8。10 条主张全部有 source + trace 或 source + trace + diff 标签。

---

## Friction verdict

值得（复杂人物/主题 skill）；不值得（简单 prompt 类 skill）。判断阈值 = 是否需要提炼判断框架而不只是抄话。见 `xray.md` § 9。

---

## Stage IDs（贯穿 Walkthrough 页）

| Stage ID | 一句话总结 |
| --- | --- |
| `s00-intake` | Phase 0A/0B 入口分流——明确人名走 Phase 0A，模糊需求走 Phase 0B 诊断推荐 |
| `s05-scaffold` | Phase 0.5 建自包含目录（`scripts/` + `references/research/` + `references/sources/{books,transcripts,articles}`） |
| `s10-fanout` | Phase 1 六个 subagent 并行（著作 / 长对话 / 表达 DNA / 他者视角 / 决策 / 时间线） |
| `s15-review` | Phase 1.5 调研质量 review checkpoint（hard） |
| `s20-extract` | Phase 2 三重验证提炼心智模型 / 启发式 / 表达 DNA / 张力 / 谱系 / 边界 |
| `s25-confirm` | Phase 2.5 提炼摘要确认 checkpoint（hard） |
| `s30-build` | Phase 3 用 skill-template.md 构建 SKILL.md + Agentic Protocol（研究维度反推） |
| `s40-verify` | Phase 4 独立 subagent 三测（已知 / 边缘 / 风格）+ quality_check.py |
| `s50-refine` | Phase 5 双 Agent 精炼（auto-skill-optimizer + skill-creator）综合不冲突的改进 |

---

## Term IDs（Glossary 页本地解释）

| Term ID | 短解释 |
| --- | --- |
| `t-skill` | "Skill" 在这里 = 一个 markdown 文件 + 一组配套资源，能让 AI 在收到特定触发词时切换到不同的"角色 / 工作流"。女娲产的"人物 Skill"是 AI 拿到这份文件后用某个人的框架答问题。 |
| `t-mental-model` | 心智模型 = 一个人**看世界的镜片**。塔勒布用 Mediocristan/Extremistan 二分看任何变量；芒格用激励看任何机构。三重验证保证它不是金句、不是单领域口号。 |
| `t-heuristic` | 决策启发式 = "如果 X 则 Y" 的快速规则。比心智模型颗粒细一档。Barbell 是启发式（实施工具），Antifragility 是心智模型（看问题的镜片）。 |
| `t-expression-dna` | 表达 DNA = 此人写 100 字让人立刻认出他的指纹。包括句式 / 词汇 / 节奏 / 幽默 / 确定性 / 引用习惯 / 禁忌词。 |
| `t-agentic-protocol` | Agentic Protocol = 人物 Skill 的"工作流大脑"。规定遇到需要事实的问题时，先做哪种研究再答。Step 2 研究维度必须**从此人的心智模型反推**，不是套通用模板。 |
| `t-three-fold` | 三重验证 = 升级到"心智模型"的硬关卡：(1) 跨域复现 ≥2 域；(2) 能推断此人对新问题的立场；(3) 不是所有聪明人都会这样想。 |
| `t-honest-boundary` | 诚实边界 = 此 skill 做不到什么的明确清单。包括调研时间 / 信息不足维度 / 言行不一致案例 / 跨域盲点。最少 3 条，没有边界的 Skill 是 IYI。 |
| `t-checkpoint` | Hard checkpoint = 女娲明确要求停下来等用户确认的点（Phase 1.5 / 2.5 / 4）。区别于 Auto Decision（有 default 可继续）。 |
| `t-caricature` | Caricature = 模仿账号产物，指纹堆得过密反而失真。Phase 5 拦截：指纹密度上限 + 反 caricature 自检 + 三条不要复刻硬规则。 |
| `t-iyi` | IYI（Intellectual Yet Idiot）= 塔勒布自创词，指"学历光鲜 / 没承担过决策后果 / 一阶逻辑对二阶不懂 / 喜欢 nudge 别人"的专家阶层。skill 复现时强烈使用但要避免对用户本人贴标签。 |

---

## Design choice IDs（5-8 个关键选择 + bad scenario）

| Choice ID | 设计选择 | 它防的坏结果 |
| --- | --- | --- |
| `dc1-self-contained` | 所有调研 / 素材 / 脚本 / SKILL.md 必须在 skill 目录内部 | 调研散在外部，开源时复制目录拿不到证据，skill 变成"飘在空中"的 prompt |
| `dc2-fanout` | 强制 6 subagent 并行，不让主 thread 自己跑 | 单 thread 凭训练记忆生成 → 没真实来源 + 标不出一手/二手 + 容易 cherry-pick |
| `dc3-three-fold` | 三重验证才能升心智模型 | 把金句和真信念混在一起，"长期主义/逆向思考/谨慎" 这种谁都同意的废话被当成 X 的"独特视角" |
| `dc4-keep-contradiction` | 矛盾保留不和稀泥 | 编一个调和叙事，把"X 既批学界又是教授"装成"立场复杂"——实际丢失了张力，skill 不会承认人有 U 型曲线 |
| `dc5-agentic-derive` | Agentic Protocol 研究维度必须从心智模型反推 | 套通用搜索清单（who/what/when/where），人物 skill 遇到事实题就凭记忆编，变成"鹦鹉学舌" |
| `dc6-checkpoint-vs-default` | 区分 Hard checkpoint vs Auto Decision；checkpoint 不给 default | "调研质量 review" 给个 default 就被自动跳过 → 垃圾进垃圾出在 Phase 2 才发现，返工成本高 |
| `dc7-independent-validation` | Phase 4 必须 spawn 独立 subagent 三测 | 主 thread 自评有偏差，"我觉得挺像塔勒布"——独立 subagent 才能识破 caricature |
| `dc8-dual-agent-refine` | Phase 5 双 Agent 精炼，主 thread 综合 | 单视角评审看不到自己的盲点；auto-skill-optimizer 看结构、skill-creator 看激活，两个视角互补 |

---

## Pattern IDs（迁移到别的 skill 也能用的招数）

| Pattern ID | 一句话招数 | 相关 Pattern 链接 |
| --- | --- | --- |
| `p1-self-contained-dir` | 一个 skill 的产物全部留在它自己的目录里 | → p4-source-truth |
| `p2-subagent-fanout` | 主 thread 不要自己搜——分给 N 个并行 subagent，每个 prompt 自包含约束 | → p3-blacklist-prompt |
| `p3-blacklist-prompt` | 信息源黑名单写进 subagent prompt，不靠后置过滤 | → p2-subagent-fanout |
| `p4-source-truth` | 真相源是 packets / brief，不是渲染产物（handbook.md 是 export 不是源） | → p1-self-contained-dir |
| `p5-three-fold-promotion` | 概念升级要过硬关卡（跨域 + 生成力 + 排他性），不是看出现频率 | → p6-keep-contradiction |
| `p6-keep-contradiction` | 遇到证据冲突保留矛盾，分时间性 / 领域性 / 本质性张力 | → p5-three-fold-promotion |
| `p7-protocol-derive` | 工作流的研究维度从核心心智模型反推，不套通用模板 | → p5-three-fold-promotion |
| `p8-checkpoint-vs-default` | 区分"自动选择 default 推进" vs "Hard checkpoint 必须问用户" | → p9-proxy-checkpoint |
| `p9-proxy-checkpoint` | live-run 时若用户不在，analyst 代用户推进，所有 proxy 决定记进 Auto Decision Log | → p8-checkpoint-vs-default |
| `p10-independent-validator` | 验证必须 spawn 独立 subagent，主 thread 不能自评 | → p11-dual-reviewer |
| `p11-dual-reviewer` | 精炼用双视角并行 reviewer，主 thread 综合不冲突的改进 | → p10-independent-validator |
| `p12-do-not-replicate` | 提炼来源人物的 toxic 模式（war > debate 等）显式拦截不复刻 | — |

---

## Diagrams plan

| Diagram ID | 类型 | 在哪一页 | 表现什么 |
| --- | --- | --- | --- |
| `d1-orientation` | orientation map | Overview § primer | 9 个 Phase 分成 5 段（确认 / 存证 / 提炼 / 构建 / 验证） |
| `d2-fanout` | flow + 分支 | Walkthrough Phase 1 | 主 thread → 6 subagent 并行 → 6 份调研文件 |
| `d3-three-fold` | gate diagram | Walkthrough Phase 2 + Design Choices dc3 | 候选论点 → 三重验证 → 升 / 降 / 丢三个出口 |
| `d4-checkpoint-map` | comparison（hard vs auto） | Design Choices dc6 + Walkthrough | 5 个 auto decision vs 3 个 hard checkpoint 并列 |
| `d5-protocol-derive` | arrow map | Walkthrough Phase 3 + Design Choices dc5 | 6 心智模型 → 6 研究维度（一一对应箭头） |
| `d6-package-map` | package map | File Map 页 | SKILL.md / extraction-framework.md / skill-template.md / scripts / references/research/ / sources/ 互相协作 |
| `d7-pattern-network` | pattern graph | Patterns 页 | 12 个 pattern 节点 + cross-link 边（不是平表） |
| `d8-intervention-card` | before/after compare | Overview § wow + Design Choices | 10 个 Intervention 选 3-5 做 before/after 卡 |

---

## 7 页 Web app 列表（每页 job）

| Page | Job |
| --- | --- |
| Overview | 让没看过女娲的读者读完能 3-5 句话给朋友讲清楚它在干嘛——从默认 AI 失败模式开场，到 Phase 5 的精炼为止 |
| Walkthrough | 用塔勒布例子从 Phase 0A 走到 Phase 5，每段第一人称展示「我（用女娲的 AI）拿到了什么 → 被要求读什么 → 不能直接做什么 → 产出什么」 |
| Glossary | 12 个术语本地解释（skill / 心智模型 / 启发式 / 表达 DNA / Agentic Protocol / 三重验证 / 诚实边界 / checkpoint / caricature / IYI / Hard vs Auto / proxy approval） |
| File Map | 6 个关键文件的职责图（谁生成它 / 谁读它 / 它管什么 / 不管什么 / 写错了会怎样） |
| Design Choices | 8 个关键设计选择（每个带 bad scenario + 三种场景对比） |
| Patterns | 12 个迁移性招数（network + cross-link） |
| Apply it | 一份"自己造一个 skill"的起手清单 + 5 个压力测试场景 |

---

## 已知风险 / missing evidence / 假设

| 风险 / 缺口 | 影响 | 怎么对冲 |
| --- | --- | --- |
| 只跑了一个 case（塔勒布），其他人物 / 主题 / 中文 / 更新模式没 live-run | Intervention Map 的 evidence 有偏 | 在 X-Ray § 10 标 "Eval proof" 为可选 upgrade；handbook 里说"已确认在塔勒布 case" |
| 高成本动作没执行（Z-Library 下书 / yt-dlp 字幕） | 完整 transcript 没拿到（Lex Fridman / Joe Rogan 等） | TRACE.md 已诚实标缺口；handbook 在 walkthrough Phase 1 提一句"高成本路径走 source-grounded" |
| 3 个 hard checkpoint 都被 analyst proxy 推进 | "Hard checkpoint vs Auto Decision" 的差别在这次 trace 没真停下过 | handbook 在 walkthrough 显式说"如果是真用户在桌边，这 3 个点会真停"，并在 Design Choices dc6 用 hypothetical scenario 说明 |
| X 推文 402 付费墙限制 | Agent 3 表达 DNA 部分要靠交叉验证 | 已在 SKILL.md 诚实边界写入 |
| prompt injection 是单一事件 | 不能从 N=1 推论这是常态 | 在 walkthrough Phase 1 当作"trace 真实事件"展示，不当作"女娲的标准防护机制" |
| caricature 风险只在塔勒布 case 暴露 | 其他人物可能有不同失败模式 | Design Choices dc7 + dc8 + Patterns p12 全部呼应这条；handbook 不假设 Phase 5 一定能拦截所有 caricature |

---

## 给 page agents 的统一约束（如走并行）

- **真相源**：本文件 + `page-packets/<page>.packet.md` + anchor slice 对应组件
- **写入目标**：直接 patch `web-app/assets/data.js` 的对应 key（**不要**新建独立 JS 数据文件如 `page-data/*.js`、`assets/walkthrough-rest.js`）
- **保留 IDs**：Stage IDs / Term IDs / Choice IDs / Pattern IDs 必须用本 brief 定义的 slug
- **塔勒布例子**：从 § Running example 一段开始，整个 handbook 不换例子
- **塔勒布表达 DNA**：handbook 写作 voice 不是塔勒布——是教科书的教学 voice（"我作为使用女娲的 AI..."），不要复刻 IYI / FRAUD!!!!!
- **必读 references**：`stage-writing.md`（walkthrough）/ `cards-patterns.md`（design choices + patterns）/ `voice-style-gate.md`（每页过 gate）/ `web-app-visuals.md`（视觉一致）
- **不要做**：不要复制 examples 当 schema；不要把诚实边界藏起来；不要装"女娲是完美的"——X-Ray 里诚实暴露的 caricature 风险等要保留进 handbook
