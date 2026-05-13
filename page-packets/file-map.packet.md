# File Map · packet

> Page job：让读者在概念清楚之后看到「女娲这 6 件文件分别管什么决策」——不是「这文件里有什么内容」，而是「它写错会让哪个 Phase 的哪条产出失败」。

## 卡片顺序与排序逻辑

按读者从「入口」走到「最底层素材」的依赖顺序排：

1. **SKILL.md**（已存在 anchor 卡，保留原文）——9 Phase 流水线总谱
2. **`references/extraction-framework.md`**——三重验证方法论，Phase 2 调用
3. **`references/skill-template.md`**——目标 skill 骨架，Phase 3 调用
4. **`scripts/`** 整组——自动化 4 件套，Phase 0.5 / 1 / 1.5 / 4 用
5. **`references/research/`** 目录——6 路并行调研笔记，Phase 1 产出 + Phase 2 取材
6. **`references/sources/`** 目录——一手素材（books / transcripts / articles），Phase 1 写入

第 2、3 张是「方法论 / 模板」层（女娲作者写好的，调用即可）。
第 4 张是「工具」层（脚本不做判断，只做机械工作）。
第 5、6 张是「证据」层（subagent 落地产物 + 用户/网络下载的原始材料）。

排序原则：上一张 ifWrong 失败时，下一张通常救不回来——所以入口卡在最前，素材卡在最后。

## 字段意图（每卡 6 字段）

模仿 anchor 卡（SKILL.md）的形状，6 个字段必须全有：

- `path`——文件 / 目录的相对路径
- `role`——一行职责陈述
- `generatedBy`——谁产出它（女娲作者人 / 使用女娲的 AI / 6 subagent / 用户）
- `readBy`——谁读它（女娲 AI 主 thread / subagent / 脚本 / 用户）
- `itManages`——它管什么**决策维度**（不是描述功能）
- `itDoesntManage`——不管什么（必须给出 → 真负责文件的指针）
- `ifWrong`——写错会发生什么（具体到 Phase 编号 + 失败模式）

## 关键约束

### itManages 必须是决策维度

不是「这文件存了 XXX」，是「这文件决定了 YYY」。
例：`extraction-framework.md` 不是「存了三重验证规则」——它**决定了一条候选论点能不能升级为心智模型**。这就是它管的决策维度。

### itDoesntManage 必须有指针

每张卡都必须把「不管的事」指给真正负责的文件。读者看到「我以为它该管 X」时，能立刻知道去哪查。

例：`skill-template.md` 不管「填什么」（→ Phase 2 提炼结果），它只管「填到哪个 section」。

### ifWrong 必须具体到失败模式

不写「会出问题」「质量下降」。写**哪个 Phase 的哪条产出会怎么坏**。

具体化标尺：
- 引用真实 trace 证据：如 `references/research/01-writings.md` 174 个 URL / 76% 一手 / Bitcoin 反转矛盾点等
- 标 Phase 编号：Phase 1.5 / 2 / 3 / 4 / 5
- 指出具体失败：「Phase 2 提炼基于幻觉数据」「Phase 1.5 摘要数据全假」「Phase 4 自动核对漏检」

### voice：教科书 voice，不是塔勒布

每卡不要复刻 IYI / FRAUD!!!! / 大写英文骂。教学语气、具体、慢。

## 6 张卡逐张设计意图

### Card 1: SKILL.md（anchor 保留）

已存在。**不动它**。直接复制 `web-app/assets/data.js` 当前的 fileMap[0] 进 JS literal。

### Card 2: references/extraction-framework.md

- `role`：升级裁判——告诉 Phase 2 怎么把「候选论点」分级
- `generatedBy`：女娲作者（人）一次写死，不会因为新 case 重写
- `readBy`：使用女娲的 AI（Phase 2 提炼前必读，Phase 3 quality 自检结尾再读一次）
- `itManages`：(a) 三重验证的判定阈值（跨域 ≥2 / 生成力 / 排他性，3 重升心智模型 / 1-2 重降启发式 / 0 重丢弃）（b) 表达 DNA 6 维度量化方法（c) 矛盾的 3 种分类（时间性 / 领域性 / 本质性）（d) 信息不足时的 4 档处理（e) Phase 4 质量自检清单 6 项
- `itDoesntManage`：具体哪条候选论点适用哪一档（→ Phase 1 调研产出 `references/research/01-06.md`）；最终 SKILL.md 的结构（→ `skill-template.md`）
- `ifWrong`：三重验证阈值放宽 → Phase 2 把「长期主义 / 谨慎 / 反共识」这种谁都同意的废话当独特心智模型升级；塔勒布 case 里 trace `extraction-notes.md` 有 6 升 / 2 降 / 12 丢，阈值错位会让 12 个候选论点中至少一半混进核心模型，Phase 4 自评不一定测得出，得到 Phase 5 双 Agent 精炼或更糟到交付才发现 caricature 风险；矛盾分类漏掉本质性张力 → 塔勒布 case 的 Bitcoin 180° 反转 / Pinker 反目 / 学界 vs 反学界这种关键张力被强行调和，skill 不会承认人有 U 型曲线

### Card 3: references/skill-template.md

- `role`：成品骨架——决定 SKILL.md 该有哪些 section / 什么顺序
- `generatedBy`：女娲作者（人）
- `readBy`：使用女娲的 AI（Phase 3 Step 1）
- `itManages`：(a) frontmatter 哪几个 description 字段（来源数 + 模型数 + 触发词）（b) 角色扮演规则的固定文案（用「我」/ 免责声明只首次）（c) Agentic Protocol 必须有 Step 1 / 2 / 3 三段（d) 13 个 section 的顺序（身份卡 → 心智模型 → 启发式 → 表达 DNA → 时间线 → 价值观 → 智识谱系 → 诚实边界 → 调研来源 → 创建者归属）
- `itDoesntManage`：每个 section 填什么（→ Phase 2 提炼结果 + `references/research/`）；Step 2 的研究维度（→ 心智模型反推，由 SKILL.md Phase 3 dc5 规则约束）；section 之间的判断逻辑（→ extraction-framework.md）
- `ifWrong`：缺 Agentic Protocol section → Phase 3 产出的 SKILL.md 没有「先查事实再发言」的工作流，遇到「塔勒布对 2025 AI agents 怎么看」这种新事实题只能凭训练记忆编（这正是 anchor openingScene 第 3 段写的「凭训练记忆给一段 barbell + skin in the game 鸡汤」失败模式）；缺诚实边界 section → Phase 4 quality_check.py 第 4 项 honest_boundary 计数为 0 直接 FAIL；调研来源 section 没有一手 / 二手分级位 → Phase 4 第 6 项「一手来源占比 > 50%」无法自动核对，塔勒布 case 76% 一手这个数验证不出来

### Card 4: scripts/（4 件套）

- `role`：自动化工具组——把机械工作（下字幕 / 清 SRT / 数来源 / 验通过项）从主 thread 里剥离
- `generatedBy`：女娲作者（人）一次写好
- `readBy`：使用女娲的 AI（Phase 0.5 / 1 / 1.5 / 4 直接调用 bash / python）
- `itManages`：(a) `download_subtitles.sh` 字幕优先级序（人工 > 中文 > 英文 > 自动）（b) `srt_to_transcript.py` 清洗规则（去时间戳 / 序号 / HTML / 连续重复行）（c) `merge_research.py` Phase 1.5 摘要表的统计口径（来源数 / 一手占比 / 矛盾点）（d) `quality_check.py` Phase 4 自动核对的 6 项硬阈值
- `itDoesntManage`：调研内容质量（→ subagent prompt 设计在 SKILL.md Phase 1）；字幕翻译准确度（→ YouTube 平台本身）；候选论点的升降级（→ extraction-framework.md）
- `ifWrong`：`merge_research.py` 统计口径不对 → Phase 1.5 摘要表给的「来源数」「一手占比」就假，hard checkpoint 基于假数据放行 → Phase 2 提炼基于幻觉数据展开（这正是塔勒布 trace 里发生的：merge_research.py 把 Agent 6 时间线误判为 0 来源，因为脚本只数「来源 URL」字眼）；`quality_check.py` 心智模型数量阈值写死 3-7 但 section 标题匹配规则错 → Phase 4 整条 6/6 PASS 但实际心智模型 section 是空的；`download_subtitles.sh` 优先级反了拿到 YouTube 自动字幕代替人工 → Phase 1 Agent 2 / 3 拿到全是错词的 transcript，表达 DNA 句式指纹（平均句长 / 类比密度）测出来全假

### Card 5: references/research/（6 份调研笔记 + extraction-notes.md）

- `role`：证据底盘——Phase 1 6 路并行的产出，Phase 2 取材的唯一来源
- `generatedBy`：6 个并行 subagent（Phase 1 fan-out）+ 主 thread（Phase 2 写 extraction-notes.md）
- `readBy`：主 thread Phase 2 提炼时逐文件读；`merge_research.py` 扫描统计；下游 page agent 写 walkthrough 时回查
- `itManages`：(a) 每个维度的来源 URL 列表 + 一手 / 二手 / 推断分级（b) 反复出现 ≥3 次的核心论点登记（c) 自创术语清单（d) 矛盾点 / 立场变化（不和稀泥地记下来）（e) 调研覆盖度自评（信息不足维度声明）（f) prompt injection 等安全事件留痕
- `itDoesntManage`：候选论点的升降级判定（→ extraction-framework.md）；调研约束本身（→ SKILL.md Phase 1 信息源黑名单 + subagent prompt 模板）；下载到本地的原始 PDF / SRT（→ `references/sources/`）
- `ifWrong`：subagent 把结果只放进对话历史不落文件 → Phase 1.5 `merge_research.py` 扫不到内容统计为 0 来源 / 0 一手，hard checkpoint 误判调研失败要求重跑（实际有但不在这）；一手 / 二手分级标错 → Phase 4 第 6 项「一手来源占比 > 50%」核对失真，塔勒布 case 实际 76% 但可能被写成 40% FAIL 触发不必要的 Phase 2→4 返工；矛盾点漏记 → Phase 2 提炼出来的「智识谱系」section 把 Pinker 标成「持续推荐」（实际 2018 后已反目），用户拿这个 skill 问「塔勒布怎么看 Pinker」会得到事实错误回答

### Card 6: references/sources/（books / transcripts / articles）

- `role`：一手素材池——比网络二手转述高一档权重的原始材料
- `generatedBy`：用户（提供本地素材时）+ `download_subtitles.sh` 拉的 YouTube 字幕 + 网络下载（Z-Library / 播客 transcript 站）
- `readBy`：Phase 1 6 个 subagent（本地语料优先模式时直接读 PDF / SRT）；pdf / gemini-video skill（若已安装则调用读取）
- `itManages`：(a) `books/` 整本 PDF（如 *Antifragile* / *Skin in the Game* 原文）（b) `transcripts/` 清洗后的纯文本访谈（如 Lex Fridman / Joe Rogan / EconTalk）（c) `articles/` 长文 PDF / HTML（如塔勒布 Medium Incerto 全集 / Edge.org 原文）（d) 素材的「真实性级别」——一手素材在 SKILL.md Phase 1 信息源优先级表里权重最高
- `itDoesntManage`：从素材里提炼什么（→ subagent 写入 `references/research/`）；素材是否可用作为升心智模型的证据（→ extraction-framework.md 三重验证）
- `ifWrong`：目录空但 SKILL.md 诚实边界谎称「基于一手素材」→ Phase 5 双 Agent 精炼如果不抽查目录会放行，交付后用户问「你引用的塔勒布原话出处在哪」时取不到本地证据（塔勒布 trace 里目录确实空——transcripts / books / articles 都是 0 字节，调研 76% 一手靠 Medium / Edge.org 在线 URL 兑现，TRACE.md 已诚实标 high-cost 路径未走）；如果开源分发时用户把 skill 目录复制走但 `sources/` 留在本地 → 复制后的 skill 自包含原则（dc1）被破坏，新用户拿到 skill 没有原始证据可查；本地语料优先模式下 PDF 路径错放外部目录（如 `~/Downloads/`）→ Phase 1 subagent 找不到，回退到网络搜索，本地一手素材优势丢失
