# Patterns 页 · packet

> **真相源**：`handbook-brief.md` § Pattern IDs + `xray.md` § 7 / § 10 + `traces/taleb-perspective/TRACE.md`
> **页面 job**：把 12 个 pattern 写成"读完就能拷进自己 skill"的工具——每张卡必须跨域可迁移 + 每条 goodSign 指 trace 真实事件 + relatedPatterns 形成 network 不是 star
> **Voice 约束**：教科书 voice 工具化。不复刻塔勒布 DNA。读者是要去写自己 skill 的工程师。

---

## 设计原则（指导 12 张卡的形状）

1. **不重复 anchor**：p2-subagent-fanout 已写好，保形不动。其余 11 张参照它的 8 字段结构。
2. **跨域举例**：reuseWhen ≥3 个，且要跳出"调研类 skill"——code review、ETL 流水线、设计系统、文档生成、PR 自动化都该出现。
3. **goodSign = trace 真实事件**：不是泛泛"trace 证明了"，是"174 来源 0 黑名单命中 / Phase 4.3 风格 subagent 主动报 caricature / merge_research.py 误报 Agent 6 / Phase 5 把 toxic war 上提 3 行"这种具体片段。
4. **cost 字段不空**：每条都给出 token / 复杂度 / 维护负担 / 心理成本中至少一项的具体代价。
5. **relatedPatterns 是 network**：12 个节点应有 ≥15 条边，且每条边的 relation 字段说明关系类型——依赖 / 互补 / 上下层 / 同类不同颗粒 / 反向制衡。

---

## 12 张卡的内容大纲（先写大纲再编 JS literal）

### p1-self-contained-dir · Skill 目录自包含

- **problem**：skill 的调研、素材、脚本、最终产物散在系统不同位置——开源分发时复制目录拿不到证据，别人无法独立运行。
- **therefore**：在 Phase 0.5 强制建固定目录结构（`scripts/` + `references/research/` + `references/sources/{books,transcripts,articles}` + `SKILL.md`），所有产物只许写进目录内，禁止引用外部绝对路径。
- **reuseWhen**：(a) 任何要开源 / 给别人复用的 skill；(b) ETL 流水线把中间产物落在 `data/intermediate/` 而不是 `/tmp`；(c) 设计系统把 token / 字体 / icon 放进同一 package 不依赖 CDN；(d) ML 实验目录自包含 `requirements.txt` + `data/` + `model/`，别人 clone 就能复现。
- **cost**：磁盘膨胀（taleb trace 单 case 就 2000+ 行 markdown）；复制脚本而不是 symlink 意味着脚本升级时多个 trace 间不同步。
- **bad**：开源后用户 clone 下来，发现 SKILL.md 引用 `~/.cache/research/xxx.md` 不存在；或者 skill 凭训练记忆生成"塔勒布观点"，没有证据文件可查。
- **goodSign**：trace AD-06 用户把产物落地点从 `.claude/skills/` 改到 `traces/taleb-perspective/`——skill 适应任意根目录是因为内部只用相对路径。
- **relatedPatterns**：→ p4-source-truth（自包含目录里哪份是真相源？packets 是源 / 渲染产物不是）；→ p2-subagent-fanout（fan-out 的 subagent 产出必须落进目录的 `references/research/`，不是回 message）。

### p2-subagent-fanout · 复制 anchor 不改

保留 data.js 中的现有内容。

### p3-blacklist-prompt · 信息源黑名单进 prompt 不靠后置过滤

- **problem**：你想让 6 个并行 subagent 都不要引知乎 / 公众号 / 百度搜索结果，但主 thread 拿到产出后再过滤，等于 6 倍 token 白烧 + 黑名单源已经污染过 subagent 的判断。
- **therefore**：黑名单作为硬约束写进**每个 subagent 自己的 prompt** ——"WebSearch 时如果首批结果含 zhihu.com / mp.weixin / baidu，跳过它们重搜"。不靠主 thread 后置过滤。
- **reuseWhen**：(a) Code review subagent 的 "ignore generated files" 规则直接写进 prompt 而不是 review 后 diff；(b) 文档生成 agent 的"禁用过期 API 命名空间"在 prompt 里禁用，不在最终 markdown 里 sed；(c) 设计稿审查 agent 的"禁用 #FF0000 纯红"作为约束传入而非事后取色比对；(d) 安全扫描 agent 的"忽略 vendor/ 和 node_modules/"在调用时声明而不是结果过滤。
- **cost**：每个 subagent prompt 都要把黑名单复制一遍——12 个 subagent 改一处黑名单要改 12 个文件（除非有 prompt 模板抽象）。
- **bad**：调研结果里 174 个 URL 有 1/3 来自被禁源 → 主 thread 后置过滤后只剩 2/3 → 当初不如直接告诉 subagent 跳过。或更糟：主 thread 漏过滤，知乎金句被当一手证据写进 SKILL.md。
- **goodSign**：trace § 5 "174 来源 0 黑名单命中"——6 个 subagent prompt 都独立内嵌了黑名单，主 thread 不需要事后清洗。
- **relatedPatterns**：→ p2-subagent-fanout（依赖：fan-out 是 p3 的载体——没有 N 个 subagent 谈不上"在每个 prompt 里塞黑名单"）；→ p12-do-not-replicate（同类不同颗粒：p3 防"进来的脏数据"，p12 防"出去的脏模式"，都是 prompt 前置约束）。

### p4-source-truth · 真相源 = packets/brief 不是渲染产物

- **problem**：当 handbook 同时有 markdown 原稿 + 渲染好的 HTML / web app / PDF，作者改 HTML 是最直接的，但下次再生成时改动会丢。哪份是真相不明导致协作崩溃。
- **therefore**：在项目根写明"真相源 = `page-packets/*.packet.md` + `handbook-brief.md`，`web-app/assets/data.js` 是渲染层，`handbook.md` 是 export"。Pull request 只许改源，不许直接改渲染产物。
- **reuseWhen**：(a) TypeScript 项目 `.ts` 是源 `.d.ts` 是产物——禁止手改 `.d.ts`；(b) 数据可视化 dashboard 改 SQL 不改 dashboard 截图；(c) 多语言文档以英文 markdown 为源，其他语言由翻译流水线生成；(d) 设计系统的 Figma 是源 / 导出的 SVG 是产物，颜色冲突时认 Figma。
- **cost**：增加一层"哪份是源"的认知负担；新人 onboard 时容易直接改渲染产物结果改动被覆盖；需要在 README 多写两段。
- **bad**：7 个 page agent 同时 patch data.js，结果 brief 里说 12 个 pattern，data.js 里只有 11 个——下次重新渲染时缺的那个又回来，3 小时调试白做。
- **goodSign**：handbook-brief.md 第 3 行明确"真相源 = 本文件 + page packets。data.js 是渲染层"——后续 7 个 page agent 都改 data.js 但不改 brief，brief 仍是单一权威。
- **relatedPatterns**：→ p1-self-contained-dir（互补：p1 解决"产物在哪"，p4 解决"哪份产物算数"，一起回答"复制目录后如何独立运转"）；→ p11-dual-reviewer（上下层：精炼时双 reviewer 给的是 diff 建议，主 thread 综合时认源不认产物）。

### p5-three-fold-promotion · 概念升级要过硬关卡

- **problem**：subagent 调研出 24 个看起来像"核心心智模型"的候选概念。如果按"出现频率高就是核心"，会把"长期主义 / 谨慎"这种谁都同意的废话写进 SKILL.md，skill 一离开本人语境就崩。
- **therefore**：升级到"心智模型"必须过三道关卡：(1) 跨域复现 ≥2 域；(2) 能从此模型推断作者对**新问题**的立场（生成力）；(3) 不是所有聪明人都会这样想（排他性）。0-1 重降为决策启发式或合并；3 重才能升核心。
- **reuseWhen**：(a) 提取代码库的"核心 abstraction"——只有跨 3+ 模块复用 + 能预测新功能形状 + 不是行业通用模板才算 core；(b) 用户访谈做 persona——一个 pain point 要 3+ 用户提到 + 能预测他下次行为 + 不是通用人性才升 core persona；(c) 公司文化文档"核心价值观"——三道关排掉"我们追求卓越"这类通用废话；(d) 学术文献综述区分"主流共识" vs "此学者独特贡献"。
- **cost**：三道关筛选时费心——taleb case 24 候选筛到 6 核心，丢了 12 个，每个丢弃决定都要写理由（`extraction-notes.md`）。心理成本：作者可能舍不得丢自己挖出来的"金句"。
- **bad**：把"反脆弱"和"长期主义"并列写进 SKILL.md → Phase 4.1 已知测试里塔勒布对 Bitcoin 的真实立场（black paper estimate "exactly zero"）和 skill 输出对不上 → 用户用了一周发现"它说什么都对，就是没塔勒布味道"。
- **goodSign**：trace Phase 2 "24 候选 → 升 6 / 降 2 / 合并 4 / 丢 12"，且 Phase 4.1 三道已知题 PASS 3/3——三重验证筛出的 6 个模型经得起独立 subagent 盲测。
- **relatedPatterns**：→ p6-keep-contradiction（互补：p5 决定"什么升核心"，p6 决定"升核心后遇到反例怎么办"，两个一起做才不和稀泥）；→ p7-protocol-derive（依赖：p7 反推研究维度要从 p5 升出的核心模型出发，p5 筛错 p7 整体错）。

### p6-keep-contradiction · 遇矛盾保留张力分三类

- **problem**：调研发现塔勒布既反学院又是 NYU 教授；2017 年挺 Bitcoin 2021 年估值 "exactly zero"；写书强调 "war > debate"。默认 AI 会编一个调和叙事（"立场复杂 / 与时俱进"）把矛盾抚平——skill 失去张力，回答任何问题都圆滑无棱。
- **therefore**：把矛盾分类为**时间性张力**（立场随时间反转）/ **领域性张力**（学界内外两面）/ **本质性张力**（言行不一致），三类都写进 SKILL.md "内在张力" 段。要求 skill 在回答时承认这些矛盾，不要装统一。
- **reuseWhen**：(a) 产品访谈用户对功能的爱憎并存——分"早期 vs 后期 / 工作场景 vs 个人场景 / 嘴上说 vs 实际用"三类记录，不调和；(b) 公司战略文档承认"我们既要 A 又要 B"的本质张力，不假装没有 trade-off；(c) 文学批评保留作者作品间的自相矛盾；(d) 投后访谈区分创始人"愿景叙事 vs 实际操盘"两个层面。
- **cost**：写 SKILL.md 时心理负担大——承认"我们这个 skill 不会假装作者立场一致"需要勇气；用户读到张力段会问"那这个 skill 到底替谁说话"——要解释清楚。
- **bad**：编出"塔勒布是一位学界内的反学界派"这种调和句 → skill 遇到"诺奖经济学家联名建议央行" 时给出"我们要尊重专家但也要警惕"的中间派回答 → 真塔勒布会喷 IYI + LTCM exhibit A，skill 形象崩。
- **goodSign**：trace § 2 "保留 7 对张力（Bitcoin 反转 / 反学院 vs NYU 头衔 / war > debate / Barbell 自己不用...）"——Phase 4.2 边缘题 skill 输出含"我对 LLM 的判断是宏观尾部观察，不是给你的个人 timing"这种主动承认局限的句子。
- **relatedPatterns**：→ p5-three-fold-promotion（互补：p5 决定升核心 p6 决定怎么记录核心间冲突——一起防"看起来精炼实际和稀泥"）；→ p12-do-not-replicate（区别于：p6 保留作者**真实**的内部矛盾，p12 拦截作者的 toxic 外部模式，两者方向不同别混）。

### p7-protocol-derive · 工作流维度从心智模型反推

- **problem**：写完 SKILL.md 后给 Agentic Protocol 加"研究步骤"，最容易抄通用搜索模板（who / what / when / where）——但人物 skill 遇到事实题时，"通用模板"等于让 AI 凭训练记忆编。
- **therefore**：Agentic Protocol 的 Step 2 研究维度**逐条从核心心智模型反推**——塔勒布有 Antifragility，就有"维度 B 看暴露"；有 Mediocristan/Extremistan，就有"维度 A 看分布"。心智模型与研究维度一一对应。
- **reuseWhen**：(a) Code review skill 的检查清单从架构原则反推（DDD 项目 review 维度 = 边界 / 聚合 / 一致性，不是通用"性能 / 安全 / 风格"模板）；(b) 用户研究 skill 的访谈大纲从产品假设反推；(c) 数据分析 skill 的指标选取从业务模型反推，不套通用 funnel；(d) 安全审计 skill 的威胁建模从系统架构反推，不全跑 OWASP top 10。
- **cost**：写 protocol 比抄模板慢——要先确认核心模型稳定再反推；核心模型一变 protocol 全部要改（耦合代价）。
- **bad**：套通用 "fact-check Step：搜索 author + topic + year" → 塔勒布 skill 被问 "Bitcoin 是不是数字黄金"，按通用模板搜出主流观点 → 给出与 black paper 相反的回答。
- **goodSign**：trace Phase 3 "Step 2 研究维度从塔勒布 6 心智模型反推——A 看分布 / B 看暴露 / C 看 SITG / D 看路径 / E 看时间 / F 看干预"——这 6 个维度套用到 Phase 4.2 边缘题（32 岁工程师 AI 准备）时，输出触及 5 个模型，而不是套通用职业建议模板。
- **relatedPatterns**：→ p5-three-fold-promotion（依赖：p7 必须等 p5 筛出真核心才能反推，否则反出来的维度全是金句）；→ p10-independent-validator（互补：p7 决定 skill 怎么查事实，p10 验证 skill 真的能查；两者一上一下闭环）。

### p8-checkpoint-vs-default · Auto vs Hard 区分

- **problem**：流水线设了 10 个"等用户确认"的点，AI 实际跑时全部按 default 推过去——质量门变摆设。或反过来，每个点都真停，用户被打断 10 次直接关掉。
- **therefore**：明确划分两类：**Auto Decision**（有 default 可推进，记进 log）vs **Hard Checkpoint**（无 default，必须问用户）。Hard checkpoint 设计时禁止给 default 选项。两类决策都进入 Auto Decision Log 文档但前缀不同。
- **reuseWhen**：(a) CI/CD 流水线区分"自动 merge"（lint pass）vs "需人工 approve"（prod deploy），后者禁止 auto-approve；(b) 数据处理 ETL 区分"schema drift 自动适配"vs "schema breaking change 必须 DBA 确认"；(c) 客服 bot 区分"FAQ 自动回答"vs "退款决策必须人工"；(d) 自动驾驶分级——L2 自动决策清单 / L3 需要人接管清单 分开列。
- **cost**：每个决策点都要判定"是 Auto 还是 Hard"——设计阶段费心；如果用户 unavailable，hard checkpoint 会卡住整条流水线（需要 p9 配套）。
- **bad**：女娲若把 Phase 1.5 调研 review 设成 "Auto-推进 if 来源 >100"，那 trace 里 174 来源会自动过 → Agent 6 时间线维度被 merge_research.py 误判 0 来源 → 没人发现，Phase 2 在缺时间线证据下硬提炼。
- **goodSign**：trace § 4 "Auto Decision Log 10 条 + Checkpoint Map 3 条" 明确区分——5 个 AD 真按 default 推进（AD-01 到 05），5 个 AD 问过用户记录（AD-06 到 10），3 个 hard checkpoint 都标注"无 default"且都进入 proxy approval 流程（不会被默认跳过）。
- **relatedPatterns**：→ p9-proxy-checkpoint（依赖：p8 定义 Hard，p9 定义"Hard 但用户不在时怎么办"，p9 是 p8 在 live-run 场景的扩展）；→ p4-source-truth（互补：所有 proxy 决策都要写进 Auto Decision Log 这份**源文件**，渲染产物里看到的"已确认"不算数）。

### p9-proxy-checkpoint · live-run analyst proxy 处理

- **problem**：Hard checkpoint 设计时假设用户在桌边——但 skill 被嵌入 live-run（自动 demo / overnight batch / 团队异步评审）时用户不在，整条流水线卡死或被默默跳过。
- **therefore**：live-run 时由 analyst（执行 skill 的 AI 或评审者）扮演 user proxy 推进，但**所有 proxy 决定明确记进 Auto Decision Log 并标注 "analyst proxy approval"**。下次真用户回来可以审计每个 proxy 决定。
- **reuseWhen**：(a) Overnight batch 任务遇到"需 ops 确认"步骤时由 oncall AI 代决，但事件单写明谁代决了；(b) PR 自动 merge bot 在 reviewer offline 24h 后代 approve，但 PR 描述里加 "auto-merged in absence of reviewer X"；(c) 自动化测试遇到 flaky test 时由 runner 代 retry 但记录"代决 retry 3 次"；(d) 跨时区团队的产品评审会议异步进行，缺席方由 chair proxy 投票并标注。
- **cost**：增加审计开销——每个 proxy 决定都要写理由；若 proxy 自己也错了，回看时多一层不确定（是 skill 错还是 proxy 错）；需要明确的"proxy 的判断标准"避免随心代决。
- **bad**：女娲在 trace 中如果不区分"真用户确认" vs "analyst proxy 推进"，X-Ray 会读成"3 个 hard checkpoint 都过了"——但实际上 3 个都没真停过，Hard vs Auto 区别在这次 trace 没被验证过。这是个真实的缺陷需要诚实暴露。
- **goodSign**：trace § 7 "AD-08 / AD-09 / AD-10 三个 hard checkpoint 都标 analyst proxy approval"——X-Ray § 4 + handbook 已知风险表都诚实写"3 个 hard checkpoint 都被 proxy 推进，差异在这次 trace 没真停下过"，proxy 没被隐瞒。
- **relatedPatterns**：→ p8-checkpoint-vs-default（依赖：p9 是 p8 在 live-run 的特化——只有先有 Hard 概念才需要 proxy）；→ p4-source-truth（互补：proxy 决定写进 Auto Decision Log 这份源文件，是 p4 的具体应用——真相源不在"产物看起来通过了"，在 log 里写谁批的）。

### p10-independent-validator · 验证必须独立 subagent

- **problem**：主 thread 写完 SKILL.md 自己评估"质量挺好"——但主 thread 经过 1500 行调研已经被自己产出污染，看不出 caricature / 漏关键模型 / 风格过浓。自评几乎一定通过。
- **therefore**：Phase 4 强制 spawn 独立 subagent 跑 3 项盲测（已知 / 边缘 / 风格）。subagent 只拿 SKILL.md 不拿调研笔记，模拟"用户首次激活 skill"的体验。主 thread 不许自评。
- **reuseWhen**：(a) Code review 不让作者自己 approve；(b) 自动化测试用独立 runner 不复用编译环境；(c) 内部安全审计聘外部第三方；(d) 论文同行评审 double-blind，作者主审都不看身份；(e) 产品功能上线前 dogfooding 让没参与开发的同事先用。
- **cost**：N 倍 token（每个验证 subagent 都要重新装载 SKILL.md 上下文）；时间增加（taleb case 3 subagent 30-80 秒）；若验证发现问题要回头改，闭环成本翻倍。
- **bad**：主 thread 自评 → "我觉得塔勒布 skill 挺像" → 发布 → 用户首问 "Bitcoin 怎么看" → skill 给出与 black paper 相反的回答 → 退货。
- **goodSign**：trace § 5 "Phase 4.3 风格测试 subagent **主动警示** B 段指纹密度过浓 / 比真塔勒布 caricature"——独立 subagent 看出主 thread 看不出的问题，这条警示直接喂给 Phase 5 精炼，成为后续硬刹车的依据。
- **relatedPatterns**：→ p11-dual-reviewer（同类不同阶段：p10 在验证阶段一次性独立测，p11 在精炼阶段用双视角并行评——都是"不让主 thread 自评"思路但作用点不同）；→ p2-subagent-fanout（同类不同用：fan-out 在 p2 用于调研收集，在 p10 用于验证盲测，证明 fan-out 不只是调研工具）。

### p11-dual-reviewer · 双视角精炼

- **problem**：Phase 4 验证通过就发布——但单个验证视角只能看到一个维度的问题。auto-skill-optimizer 看结构，看不到激活触发的漏洞；skill-creator 看激活触发，看不到检查点设计的弱。
- **therefore**：Phase 5 并行 spawn 2 个独立 subagent（A 视角 = 结构 + 工作流 / B 视角 = 激活 + 失败预防），主 thread 把两份评审 diff 合并——去重高度重合的建议，冲突时认证据更具体的一方。
- **reuseWhen**：(a) PR 双 reviewer（一个看架构一个看实现）；(b) 用户研究双方法（量化访谈 + 质性观察并行）；(c) 投资尽调（财务尽调 + 业务尽调团队独立出报告，合伙人综合）；(d) 法律合同双律师评审（一方代表己方利益 / 一方扮演 devil's advocate）。
- **cost**：2× subagent token；主 thread 综合时要识别"哪些重合 / 哪些冲突 / 哪些一方说错"——需要判断力，不能机械合并；如果两个视角真完全独立，可能重叠很少 → 工作量翻倍而非减半。
- **bad**：单 reviewer 通过 → 发布 → Phase 4 没看到的缺陷暴露：检查点设计 2/5 + 失败预防 2/5 + Step 1 漏第四类伪问题 + war > debate 拦截规则放错位置 → 这些只有第二个视角看得见。
- **goodSign**：trace § 5 Phase 5 "Agent A 给出'三条硬刹车'，Agent B 给出'指纹密度上限 + 三条不要复刻'，主 thread 识别高度重合 → 合并而不是各写一遍 → 最终应用 3 处编辑"——两视角形成互补合力。
- **relatedPatterns**：→ p10-independent-validator（同类不同阶段：p10 一次测 / p11 双视角评——validator 抓 pass/fail，dual reviewer 抓 nuance）；→ p12-do-not-replicate（下游接管：p11 把"toxic war 拦截规则位置错"识别出来，p12 把"三条不要复刻"作为产物落地）。

### p12-do-not-replicate · 显式拦截源人物 toxic 模式

- **problem**：调研提炼出作者的所有"表达 DNA"，AI 会顺手把 toxic 部分（塔勒布对学者发 "FRAUD!!!!!" / war > debate）也复刻给用户——skill 把用户当沙袋打。
- **therefore**：在 SKILL.md "角色扮演规则" 段显式列**三条"不要复刻"硬规则**——(1) 对用户给 intellectual charity 不当 IYI；(2) 跨域不硬套核心模型（不到处 fat tails）；(3) 拒答必给替代问题不甩 "ngmi"。这三条作为 Step 3.5 自检的硬约束。
- **reuseWhen**：(a) Code style 复刻只学结构不学注释里的脏话；(b) 客服话术学专家口吻但拦截"看你的问题就知道你没读文档"这种 condescending；(c) 写作风格 skill 模仿海明威短句但不复刻 misogyny；(d) 设计风格 skill 学 Apple 极简但不复刻"挑剔用户智商"的文案口吻。
- **cost**：要先识别"哪些是 toxic 模式"——这需要 Phase 4 / Phase 5 已经把指纹拆开看；硬规则可能过严反而抹平作者真锋利的部分，平衡点不好找；用户可能反过来抱怨"你的塔勒布 skill 不够塔勒布"——要预备解释为什么这是 feature 不是 bug。
- **bad**：skill 复刻 "war > debate" 给用户 → 用户问"你觉得我的投资策略稳吗" → skill 回"你这是 IYI 思维 / 你没 SITG / 滚去读 Antifragile" → 用户不会用第二次。这是 caricature 最危险的形态——不是不像作者，而是太像作者的攻击模式。
- **goodSign**：trace Phase 5 "Agent B 把'三条不要复刻'distil 出来加进 SKILL.md L26-32"——这条规则是 Phase 5 精炼阶段从 Phase 4.3 caricature 警示反推的，trace 中明确记录了拦截动作。
- **relatedPatterns**：→ p11-dual-reviewer（前置：p11 的视角差识别 toxic 模式，p12 把识别转成硬规则——精炼 → 落地）；→ p3-blacklist-prompt（同类不同方向：p3 拦"进来的脏数据"，p12 拦"出去的脏模式"，都是 prompt 前置约束的两个方向）；→ p6-keep-contradiction（区别于：p6 保留作者**内部**矛盾不调和，p12 拦截作者**对外**毒性不复刻，两个表面像但作用对象不同别混）。

---

## relatedPatterns network 自检

边数统计（确保不是 star 形）：

- p1 ↔ p4, p2 → 2 条边
- p2 ↔ p3, p10, p1 → 3 条边
- p3 ↔ p2, p12 → 2 条边
- p4 ↔ p1, p11, p8, p9 → 4 条边
- p5 ↔ p6, p7 → 2 条边
- p6 ↔ p5, p12 → 2 条边
- p7 ↔ p5, p10 → 2 条边
- p8 ↔ p9, p4 → 2 条边
- p9 ↔ p8, p4 → 2 条边
- p10 ↔ p11, p2, p7 → 3 条边
- p11 ↔ p10, p12, p4 → 3 条边
- p12 ↔ p11, p3, p6 → 3 条边

总边数 ≈ 16 条（去重后），形成 network 不是 star。无单一节点被所有人指向。

---

## Voice 自检

- 不复刻塔勒布 DNA：全文无 IYI / FRAUD / 反脆弱 等术语作为修辞，只在 goodSign 引用 trace 时点到。
- 教科书 voice：每条都以"问题—therefore—复用场景—代价—证据"为骨架，工具书结构。
- 跨域举例 ≥3：每条 reuseWhen 都包含至少一个非调研类 skill 的场景（ETL / CI/CD / 设计系统 / Code review / 安全 / 客服 / 写作风格等）。
- goodSign 都指 trace 具体事件，无"trace 证明了"这类空话。
