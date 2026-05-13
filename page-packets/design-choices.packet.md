# Design Choices · page packet

> **真相源**：本 packet + `handbook-brief.md` § Design choice IDs。
> **carry-forward from**：`xray.md` § 7 Intervention Map + § 9 Friction + `traces/taleb-perspective/TRACE.md`
> **页面 job**：8 个关键设计选择——每条用 bad scenario 论证为什么这条规则存在，再用三种场景说明它什么时候管用 / 反而碍事 / 看情况。
> **Voice**：教科书 voice，论辩性。每条 badScenario 具体到行为，不要抽象。

---

## dc1 · skill 目录自包含

**theChoice**：所有调研、原始素材、脚本、SKILL.md 必须落在同一个 skill 目录内部，不允许散到外部目录。

**badScenario**：默认 AI 会把调研笔记写到 `/tmp/`、`Notes/塔勒布/`、或者用户当前的项目 `07-调研/` 里——写完一个 Phase 切上下文 / 换机器后，下一阶段读不到来源，只剩它"记得"的概要。打包给同事或开源出去时，用户拿到的是 SKILL.md 一个孤儿文件，看不到 174 个来源是哪 174 个。两周后想更新塔勒布的 2026 新立场，要重新调研，因为原始 markdown 找不到了。

**threeScenarios**：
- **wherePaysOff**（管用）：用户跑完 trace 后，把 `traces/taleb-perspective/` 整个目录拷给同事——同事不用重跑调研就能验证「Bitcoin 反转」的 5 处证据来源，也能在自己机器上重新激活 skill。SKILL.md 引用 `references/research/01-writings.md` L142 时，文件真在那里。
- **whereTooMuch**（用力过了）：用户只是想做一个「写日报的 prompt skill」，目标产物是 50 行 prompt——硬要求建 `references/research/01-06.md` + `sources/{books,transcripts}/` 是对小工件强加大目录骨架。这种 skill 写完就用，不需要事后核证据。
- **whereItDepends**（看情况）：用户在公司内网做 skill，调研用的是公司专有数据库，按合规要求不能把素材落到 git 仓库——这时自包含原则要让一步，至少把"哪些素材在哪个内网路径"写成索引文件留在 skill 目录里。

**tradeoff**：目录变重，6 份调研 1500+ 行加上 sources/ 经常 10+ MB；git 仓库会膨胀，需要 `.gitignore` 一些不必版本化的中间产物。

**evidenceFromTrace**：`TRACE.md` AD-06 是唯一被用户拍板的产物落地决定（女娲默认 `.claude/skills/taleb-perspective/`，用户改成 `traces/taleb-perspective/` 隔离全局 skill 库）——选哪条路无所谓，关键是**调研和 SKILL.md 必须在同一棵树下**。最终目录 `traces/taleb-perspective/` 含 `SKILL.md` (457 行) + `references/research/01-06.md` (1501 行) + `references/research/extraction-notes.md` + 4 个脚本——整棵复制走，独立可用。

---

## dc2 · 强制 6 subagent 并行 fan-out

**theChoice**：Phase 1 调研不能让主 thread 自己跑一轮 WebSearch，必须 spawn 6 个 subagent 并行，每个负责一个维度（著作 / 长对话 / 表达 DNA / 他者视角 / 决策 / 时间线）。

**badScenario**：默认 AI 收到「调研塔勒布」会自己跑 3-5 次 WebSearch，把训练记忆和搜索结果混合输出一份 800 字 "塔勒布概览"。没有按维度切分，于是著作和推文混在一起；没有信息源黑名单的执行点（黑名单写在哪都不会被自动读），于是知乎那篇热门「塔勒布通识科普」会被自然引用进来；矛盾在合并时就被默默调和掉了（"塔勒布既批学界又是 NYU 教授" → 写成"立场复杂"一句话）；最后给的 URL 一半是编的，因为主 thread 倾向于把记忆里的来源具体化。

**threeScenarios**：
- **wherePaysOff**（管用）：调研对象作品量大、有 30 年时间跨度（塔勒布有 5 本书 + 25 年推文 + 数百次访谈）——单 thread 注意力分散，6 路并行每路只盯一个维度，每个 agent 跑 6-13 分钟出 200-350 行。Agent 3「表达 DNA」专攻推文风格，Agent 6「时间线」单独抓最近 12 个月——不并行的话最近 12 个月在「整体概览」里只会得到一句话。
- **whereTooMuch**（用力过了）：调研对象只有一本书 + 几次访谈（比如蒸馏一个刚出第一本书的新作者）——总信息量撑不起 6 个维度的切分。Agent 4「他者视角」会因为没人评论过此人而交白卷，Agent 6「时间线」也会和 Agent 5「决策」高度重复。这种场景下 2-3 个 agent 就够。
- **whereItDepends**（看情况）：调研用户自己（"蒸馏我自己"）——网络上压根没有 6 个维度的公开信息。这时 6 路并行变成 6 路读用户提供的本地素材（PDF / 录音 transcript / 自我描述），每个 agent 在同一批素材里捞不同维度。要看素材体量决定是否还跑满 6 路。

**tradeoff**：tokens 成本 6 倍；偶尔某个 agent 跑歪了主 thread 也要重新调度；调研时间被最慢的 agent 卡住（这次 13 分钟）。

**evidenceFromTrace**：`TRACE.md` Phase 1 trace 表——6 agent 实际产出 280 + 196 + 350 + 308 + 192 + 175 = **1501 行**，174 个独立 URL，**一手占比 76%**（远超 50% 阈值），**黑名单 0 命中**（知乎/公众号/百度系一个都没进来——因为黑名单写进了每个 agent 的 prompt，而不是写在主 thread 的"提醒"里）。**xray.md L86-89 安全事件**：Agent 1 期间撞上 prompt injection（伪装 MCP instructions 试图劫持工具调用），Agent 1 识别并拒绝——并行结构让一个 agent 的事件不污染其他 5 个。

---

## dc3 · 三重验证才能升级为心智模型

**theChoice**：候选论点要升级为"心智模型"必须同时通过三道关卡——跨域复现 ≥2 域、能生成对新问题的推断、不是所有聪明人都这样想。只过一两道降为决策启发式，一道都没过直接丢。

**badScenario**：默认 AI 看到塔勒布反复说 "antifragility / black swan / skin in the game" 会直接列成"塔勒布的核心思想"。问题是它顺手会把"长期主义"、"逆向思考"、"对未来谦逊"这些塔勒布也确实说过的话一并放进去——但这些是所有聪明人都认同的废话，不是塔勒布的镜片。同时它会把 Black Swan 这种**结果状态**（小概率大影响事件）和 Mediocristan/Extremistan（**看变量的镜片**）混为一谈——前者是看到的现象，后者是看现象的工具。最后 SKILL.md 列出 10 条"塔勒布的核心心智模型"，其中 4 条任何商学院 MBA 都会同意，2 条是别的模型的结果，真正塔勒布独有的只剩 4 条——但读者看不出哪 4 条独有。

**threeScenarios**：
- **wherePaysOff**（管用）：调研对象是塔勒布、芒格、费曼这种风格鲜明、论点反复且有明显独家镜片的人物——三重验证刚好能把"独家镜片"从"通用聪明话"里筛出来。塔勒布的「Mediocristan/Extremistan 二分」过三重（在金融 / 流行病 / 战争 / 健康 4 域复现 + 能推断他对 AI 的立场 + 不是所有人都这样切变量），「长期主义」过 0 重直接丢——这就是三重验证的甜区。
- **whereTooMuch**（用力过了）：调研对象是一个领域专家（比如某个写 React 性能优化的工程师），他的"心智模型"本来就不需要跨域——你不会期望 React 性能优化框架能套到流行病学。这时硬卡跨域 ≥2 域会把所有有价值的领域内框架都筛掉。
- **whereItDepends**（看情况）：调研对象是政治家或商业领袖，他们的"心智模型"和"利益立场"难分——一条论点过了三重验证，但它到底是此人的真信念还是公关脚本？这时三重验证给出"是心智模型"的判定，但还要叠一道"言行一致性"检查（决策记录里他真这样做过？）才能信。

**tradeoff**：Phase 2 工作量大幅增加；候选清单 24 条 → 升 6 / 降 2 / 合并 4 / 丢 12，意味着 50% 候选被砍掉——主 thread 要承担"砍掉的是不是太多"的判断负担；如果三重验证的三道关被写得太机械（比如"必须 3 个不同领域"），跨度边界的判断会变僵。

**evidenceFromTrace**：`TRACE.md` Phase 2 trace + `xray.md` L102——24 候选 → **升 6 个心智模型**（Antifragility / Skin in the Game / Mediocristan vs Extremistan / Ergodicity / Via Negativa / Lindy）+ **降 2 个为决策启发式**（Minority Rule 跨域 ≤4 不够深、Barbell 是工具不是镜片）+ **合并 4 个**（Black Swan 合并到 Mediocristan 因为是状态不是机制 / Turkey Problem 合并为故事库 / Naive Intervention 合并到 Via Negativa / Soul in the Game 合并到 Skin in the Game）+ **丢弃 12 个**。直接验证三重验证有效的是 Phase 4.1 已知测试 3/3 PASS——三道塔勒布真实公开过立场的题（Bitcoin / 诺奖经济学家建议 / GMO），用 6 个心智模型答出方向 100% 对位。如果"长期主义"没被砍掉，Bitcoin 题会输出"长期看 BTC 价值会显现"——和塔勒布 2021 black paper "exactly zero" 立场反向。

---

## dc4 · 矛盾保留不和稀泥

**theChoice**：调研里遇到证据冲突，不允许编一个调和的解释把两边拼起来——分类为"时间性 / 领域性 / 本质性"三种张力，原样保留在 SKILL.md 的「内在张力」section。

**badScenario**：默认 AI 看到「塔勒布 2017 推 Bitcoin / 2021 写 black paper 估值 zero」会自然写成 "塔勒布对 Bitcoin 的立场经历了从乐观到谨慎的演化，体现了他基于证据更新观点的严谨"——一句话把两条事实拼成了一个完美的"思想成长"叙事。但真相是 2021 black paper 不是"演化"，是塔勒布主动写论文宣告之前看错了，并对 BTC 永久估值"exactly zero"。同样默认 AI 会把"塔勒布反学院 vs 自己是 NYU 教授"和成"他用学院身份发声但保持外部视角"——这是把 IYI 攻击对象之一变成了一个温和的人设。这些调和动作直接让 skill 失去了塔勒布最锋利的一面——他真的会一边骂自己一边骂别人，skill 模仿不出来。

**threeScenarios**：
- **wherePaysOff**（管用）：调研对象是有强烈个性 + 公开记录长达 20+ 年的人物（塔勒布 / 芒格 / 巴菲特 / 张一鸣）——这种人物**矛盾本身就是真信念结构**，调和掉就等于阉割了 skill 的判断力。塔勒布的 7 对张力（Bitcoin 反转 / 反学院 vs NYU 头衔 / war > debate 但又写论文辩论 / barbell 自己不用…）每一对都让 skill 拒绝伪装一致——这是它能在 Phase 4.1 答对的根因。
- **whereTooMuch**（用力过了）：主题 skill（不是人物 skill），目标是给出某个领域的方法论框架——这时"矛盾"是多家学派的分歧，不是个人内在张力。强行保留每一处分歧会让 skill 没有结论可给。主题 skill 应该呈现共识 + 各家分歧，不需要把分歧当成"内在张力"。
- **whereItDepends**（看情况）：调研对象的矛盾源是**信息不足**而非**真矛盾**（A 来源说 X，B 来源说 Y，但根本没办法判断谁对）——这时硬保留矛盾会污染 SKILL.md，让读者以为此人立场真的撕裂。判断阈值：能找到≥3 处一手证据支持"两边立场都真实存在"，保留；找不到，标注为"信息冲突，需要进一步验证"。

**tradeoff**：SKILL.md 看起来"立场不一致"，对追求 clean narrative 的读者不友好；skill 输出有时会自己跳出来说"我在 X 上和 Y 上不一致"，对话流可能被打断。

**evidenceFromTrace**：`TRACE.md` Phase 1 trace 表 + `xray.md` L103——Agent 1 发现 3 个一级矛盾（Bitcoin 反转 / Pinker 反转 / 学术内外两面），加上 Agent 4 他者视角的 Kahneman 关系冲突 / Agent 5 的 Universa 收益数字争议 / barbell 自用比例争议，最终在 SKILL.md 落 **7 对张力**。Phase 4.1 Bitcoin 题之所以答对（明确"exactly zero" 而不是"我曾经乐观过"），靠的是张力 section 里"Bitcoin 反转"被原样保留 + 后期立场标为"近期主导"。

---

## dc5 · Agentic Protocol 研究维度从心智模型反推

**theChoice**：SKILL.md 里的 Agentic Protocol Step 2「研究维度」必须从此人的 6 个心智模型逐一反推（一个模型对应一个研究维度），不允许套通用模板（who/what/when/where / 市场背景 / 竞争对手 / 财务数据）。

**badScenario**：默认 AI 写 Agentic Protocol 会复刻它见过的通用研究 checklist——"先了解事件背景 / 查相关人物 / 看市场数据 / 评估影响"。问题是这套清单和塔勒布无关，套到费曼也一样套到芒格也一样。结果：用户问"塔勒布 skill 评一下 NVDA 估值"——skill 按通用模板先搜 NVDA 财报 / 行业增速 / 竞品对比，输出一份和 Bloomberg 没差别的 NVDA 综述，最后挂一段"反脆弱地说要警惕…"做语气结尾。这是典型的"语气包"，不是塔勒布在思考。真塔勒布看 NVDA 会先问：分布形态是 Mediocristan 还是 Extremistan？（→ 维度 A）我们暴露在哪一侧的尾部？（→ 维度 B）卖方的 skin in the game 在哪？（→ 维度 C）路径依赖多严重？（→ 维度 D）这个估值模型 Lindy 几年？（→ 维度 E）下行有没有保险？（→ 维度 F）——通用模板永远不会问这些。

**threeScenarios**：
- **wherePaysOff**（管用）：人物 skill 用作思维顾问，遇到具体公司 / 具体决策的事实题——研究维度从心智模型反推让 skill 在搜什么 / 看什么数据这层就和默认 ChatGPT 拉开差距。塔勒布 skill 看一家公司不查 PE PB ROE，去查"卖方有没有 skin / 这家是 Mediocristan 还是 Extremistan / 下行有没有杠铃保险"——这是 skill 不可替代的部分。
- **whereTooMuch**（用力过了）：主题 skill（"价值投资框架"）或纯框架问题——纯框架问题不需要先研究再答（Step 1 已经分类到「直接跳到 Step 3」），强行让 Agentic Protocol 走研究维度是空转。主题 skill 没有"一个人的心智模型"可以反推。
- **whereItDepends**（看情况）：人物 skill，但被用在此人公开表态过的事件上——这时反推的研究维度有用（能引出此人的镜片）但不是必须（直接引用此人立场就够）。判断阈值：用户问的事件距离此人公开表态 ＞ 6 个月，跑反推；≤ 6 个月，先直接引用再用反推补充。

**tradeoff**：Phase 3 构建 SKILL.md 工作量增加（不能复制通用模板，要为每个心智模型单独写"搜什么 / 看什么"）；如果心智模型本身不深，反推出的维度也跟着浅。

**evidenceFromTrace**：`TRACE.md` Phase 3 trace——塔勒布 6 个心智模型直接反推成 6 个研究维度（A 看分布 / B 看暴露 / C 看 SITG / D 看路径 / E 看时间 / F 看干预）。Phase 4.2 边缘测试（32 岁工程师面对 AI 浪潮怎么准备——塔勒布没公开过个人指南）PASS 的核心证据：边缘题答案里**触及 5 个心智模型**（Antifragility / Ergodicity / Mediocristan / Via Negativa / Lindy），而且**显式不确定标记齐全**（"我不知道 AI 五年后什么样" / "基于框架推断而不是处方"）。如果研究维度是通用模板，AI 浪潮题会输出"了解 AI 行业趋势 + 评估个人技能 + 学习新技术" —— 空话。

---

## dc6 · Hard checkpoint 不给 default，Auto Decision 给 default

**theChoice**：女娲把 9 个 Phase 的决策点显式分成两类——5 个 **Auto Decision**（有 default 可自动推进，记录到 Log），3 个 **Hard checkpoint**（Phase 1.5 调研 review / Phase 2.5 提炼确认 / Phase 4 验证展示，**没有 default**，必须停下来等用户）。两类不能混。

**badScenario**：如果给 Phase 1.5 也设个 default（比如"如果一手占比 > 50% 自动推进"），AI 一旦看到 76% 一手就跳过 review——但**一手占比高不代表调研质量高**。可能 6 份调研里 Agent 6 时间线只写了 12 个 URL（脚本误判为 0），Agent 3 表达 DNA 因为 X 推文付费墙缺一手只能交叉验证。这些质量信号一个 default 数字看不见，必须人眼看摘要表才能判断。等到 Phase 2 三重验证时才发现某个维度证据薄，已经写完 600 行调研 + 准备进 Phase 3——返工成本巨大。同样如果 Phase 2.5 给 default（"模型数量在 3-7 之间自动推进"），主 thread 选 6 个模型符合数量但方向选错，进 Phase 3 写完 SKILL.md 432 行才在 Phase 4 暴露——更晚。反过来如果 Auto Decision 都强制等用户（比如 AD-01 入口分流也要问），用户每次都要按 9 次「继续」——女娲就没人用了。

**threeScenarios**：
- **wherePaysOff**（管用）：复杂工件、用户在桌边、错了返工成本高——Hard checkpoint 把"质量决定下一步上限"的环节留给人眼。这次 trace 3 个 hard checkpoint 全部由 analyst proxy 推进，但 trace 文件诚实标注"真用户在桌边时会真停"。若不区分，要么处处停（无人用）要么处处不停（错了到 Phase 5 才发现）。
- **whereTooMuch**（用力过了）：用户跑过 5 次女娲、对流水线极熟悉、第 6 个塔勒布级人物——这时 Hard checkpoint 反而是仪式。这种成熟用户应该有一个 "expert mode" 把 3 个 hard checkpoint 也降级成 Auto Decision + 摘要发通知。本 skill 没显式提供这条路径，是设计上的缺口。
- **whereItDepends**（看情况）：用户挂在 Slack 上跑女娲，30 分钟内可能响应也可能不响应——这时 Hard checkpoint 默认死等不合适。需要"proxy approval with timeout"模式：analyst 看摘要做 proxy 决定，记进 Auto Decision Log，但留一个"用户回来可推翻"的钩子。本 trace 就是这种模式（AD-08/09/10 都是 proxy 推进），但**真用户在桌边时会真停**的这条路径在 trace 里没被验证过。

**tradeoff**：3 个 hard checkpoint 把流水线拆成 4 段交互，对追求"一条命令跑完"的用户不友好；本 trace 里 3 个 checkpoint 全是 proxy 推进，"真停"路径其实没被 live-run 验证过——这是 `handbook-brief.md` 已知风险表的一条。

**evidenceFromTrace**：`TRACE.md` Auto Decision Log 10 条 + Checkpoint Map 3 条——AD-01 到 AD-05 是"按 default 推进 不问用户"（入口分流 / 聚焦 / 用途 / 新建 vs 更新 / 本地语料），AD-06 到 AD-10 是"问过用户"（产物落地 / 调研深度 / 3 个 checkpoint）。**xray.md L196 + § 9 已知风险表**：3 个 hard checkpoint 这次都被 analyst proxy 推进，"真停"路径在本 trace 没被验证过——但 SKILL.md L337 / L409 / L539 三处显式写明这 3 个点要"暂停展示给用户确认"——意图明确。`merge_research.py` 跑出 76% 一手 + 174 来源，看起来漂亮，但脚本同时**误判 Agent 6 为 0 来源**——靠 hard checkpoint 的人眼审查才能识破脚本误判，这是 dc6 的直接证据。

---

## dc7 · Phase 4 必须 spawn 独立 subagent 三测

**theChoice**：Phase 4 不允许主 thread 自评 SKILL.md，必须 spawn 独立 subagent 跑 3 项测试——已知测试（3 道此人公开表态过的问题）/ 边缘测试（1 道此人没公开讨论过的相关问题）/ 风格测试（100 字盲测对比 A 通用 ChatGPT 体 / B skill 输出 / C 真人想象版）。

**badScenario**：默认 AI 写完 SKILL.md 会自评 "我觉得这套塔勒布 skill 应该挺像的——心智模型有 6 个、表达 DNA 抓住了 IYI 和 FRAUD、矛盾保留了 5 对，质量应该够了"。问题有三个：(1) 主 thread 刚写完，对 SKILL.md 的每个细节都熟悉到失真——它读自己的产物会自动"补完"那些没写清楚的部分。(2) 没有盲测对比，"像不像塔勒布"是凭感觉。(3) 最关键——主 thread 不会主动测试 caricature 风险（"我写得是不是太塔勒布了反而失真了"），因为它没动机推翻自己。Phase 4.3 风格测试 subagent 在 9/9 命中风格清单的同时主动写一句"B 段在指纹密度上略浓——真塔勒布单条推文不会把 9 件武器全亮出来"——这种自警，主 thread 自评永远不会出现。

**threeScenarios**：
- **wherePaysOff**（管用）：人物 skill，目标是模拟此人的判断方式 + 风格——风格越强烈的人物 caricature 风险越高，独立 subagent 是唯一能识破"过密"的视角。塔勒布的 IYI / FRAUD / 火鸡 / 杠铃，每个元素都强烈，堆在一起就成模仿账号。Phase 4.3 subagent 警示"指纹密度过高"直接喂给 Phase 5 拦截——这条链路只有独立 subagent 能完成。
- **whereTooMuch**（用力过了）：纯流程 skill / 工具脚本 skill（不涉及人物模仿）——比如"自动生成周报 skill"，没有"像不像谁"的问题，三测里的风格测试空转，已知 / 边缘测试也很难定义。这种 skill 应该有自己的验证标准（输入输出契约 + 边界 case），不该套人物 skill 的三测。
- **whereItDepends**（看情况）：人物 skill，调研对象的风格不强（学术派 / 商务派 / 工具人型领导）——风格测试还是要跑，但 caricature 风险天然低，三测的边际收益没那么大。判断阈值：调研里 Agent 3 表达 DNA 提炼出 ≥8 条结构化特征（句式 / 词汇 / 节奏 / 禁忌词 / 全大写 / 自造词 / 故事库），跑三测；提炼出 ≤4 条，风格测试简化。

**tradeoff**：3 个 subagent 各自跑 30-80 秒额外 tokens；如果 subagent 测试题选偏（比如选 3 道此人都没明确表态过的）会得到 "PASS 但方向偏"的误导结果——题目选择本身需要 Phase 1 调研做得到位才能挑对题。

**evidenceFromTrace**：`TRACE.md` Phase 4 trace 全节——3 subagent 真实独立跑（A 已知 PASS 3/3 / B 边缘 PASS / C 风格 PASS 9/9）。**关键证据是 Phase 4.3 subagent 的自我警示**：「B 段在指纹密度上略浓——真塔勒布单条推文不会把 9 件武器全亮出来，C 段更接近他的实际节奏」。这条警示来自一个**不参与写作的独立视角**，直接喂进 Phase 5 双 Agent 精炼（dc8），最终 Phase 5 加入"指纹密度上限（≤2 故事 / ≤1 自造词 / ≤1 全大写）"硬规则。`xray.md` L137-138 + § 7 V7 行：主 thread 自评永远不会写出这句自警——这是独立 subagent 的不可替代性的直接证据。同时 quality_check.py 6/6 PASS 是脚本验证，独立 subagent 是人眼/盲测验证——两个层次都需要，因为脚本只检查结构（数量 / 边界 ≥3 条），不能识破 caricature。

---

## dc8 · Phase 5 双 Agent 精炼，主 thread 综合

**theChoice**：Phase 4 通过后强制启动 Phase 5——并行 spawn 两个独立 subagent：Agent A（auto-skill-optimizer 视角，看结构 8 维度评分 + 干跑 3 个 prompt）+ Agent B（skill-creator 视角，看激活触发 / 角色规则可操作性 / 问题路由 / 失败预防）。主 thread 综合两份报告，去重不冲突的改进。

**badScenario**：默认 AI 在 Phase 4 全过之后会说"验证通过，交付"。但 Phase 4 的盲点是它只能验证已写出的东西——它无法识别"应该写但没写"的缺口。比如 Phase 4 三测都过的塔勒布 skill 在 Phase 5 暴露：(1) Step 1 问题分类只有 3 类，漏第四类"伪问题 / 拒答类"——Phase 4 不可能测出这条因为它测的是"已分类问题答得对不对"。(2) war > debate 拦截规则被放在"诚实边界"里，对 AI 不生效——Phase 4 测的是 skill 答题，没测 skill 自我约束 toxic 模式。(3) "检查点设计"和"失败预防"维度评分 2/5——这是结构性缺陷，Phase 4 看不见。如果不跑 Phase 5，这 3 处都不会被发现，skill 交付后第一次遇到"塔勒布对 Pinker 说什么"这种题就会把"war > debate"复刻给用户。

**threeScenarios**：
- **wherePaysOff**（管用）：人物 skill，调研对象有显著的 toxic 模式 / 攻击性话术（塔勒布的 IYI / FRAUD!!!!! / war > debate）——这种 skill 最容易把攻击模式复刻给用户。双 Agent 精炼分工明确：A 看结构（"Step 3.5 反 caricature 自检"放哪个位置）+ B 看行为（"对用户给 intellectual charity"作为硬规则放进角色规则）—— 两个视角拼起来能拦截 Phase 4 漏掉的盲点。
- **whereTooMuch**（用力过了）：简单 prompt skill 或工具 skill——没有"角色扮演规则"和"问题路由"的概念，Agent B 视角空转。这种 skill Phase 4 通过就可以交付，强加 Phase 5 是仪式。
- **whereItDepends**（看情况）：人物 skill，但调研对象本身就温和（费曼 / 巴菲特）——双 Agent 还是要跑，但 Agent B 找到的 caricature 风险会很少。判断阈值：Phase 4.3 风格测试 subagent 是否主动写出了"指纹密度过高"或"模仿过密"——写了就必须跑 Phase 5，没写可以跑简化版（只跑 Agent A 看结构）。

**tradeoff**：Phase 5 又要 2 个 subagent + 主 thread 综合 53+82 秒；A 和 B 的建议有时高度重合（这次三条硬刹车和指纹密度上限就重合 80%），主 thread 要做去重；A 和 B 偶尔冲突，主 thread 要判断哪条优先（这次没遇到强冲突）。

**evidenceFromTrace**：`TRACE.md` Phase 5 trace 全节——Agent A 8 维度评分平均 3.13/5，最弱"检查点设计 2/5"和"失败预防 2/5"；Agent B 4 维度评审找到 4 处具体缺口（漏第四类伪问题 / 缺指纹密度上限 / 缺 caricature 自检 / war > debate 位置错）。主 thread 综合 → 应用 **3 处编辑**：(1) 角色扮演规则加指纹密度上限 + 三条"不要复刻"硬规则；(2) Step 1 加伪问题第四类；(3) 插入 Step 3.5 反 caricature 自检。修改后 SKILL.md 432 → **457 行**，quality_check.py 再次 6/6 通过。`xray.md` L138 + § 7 V8 行：Phase 5 暴露的 3 处缺陷**都是 Phase 4 三测看不出来的**——A 看结构 + B 看激活 = 两个视角互补。`xray.md` L145 + § 7 O10 行：Agent B distil 出的"三条不要复刻"（对用户给 intellectual charity / 跨域不硬套 fat tails / 拒答必给替代问题）直接拦截了 skill 把塔勒布在 X 上对 Pinker 的攻击模式复刻给用户本人——这是 Phase 5 最实质的价值。
