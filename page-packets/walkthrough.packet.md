# walkthrough.packet

**Page job**：用塔勒布例子从 Phase 0A 走到 Phase 5，第一人称展示「我（用女娲的 AI）拿到了什么 → 被要求读什么 → 不能直接做什么 → 产出什么」。9 个 stage 串成一条因果链，让读者闭眼能背出每一步的输入 / 行动 / 产出 / 自由度，并看到女娲在哪里替我拦住捷径。

**Voice**：第一人称 AI 视角（"我（用女娲的 AI）..."），教科书 teaching voice。**不复刻塔勒布表达 DNA**——不堆 IYI / FRAUD / 火鸡 / Hammurabi 这类塔勒布指纹词；塔勒布的概念只在它作为**产物**出现时被引用（例如 s50-refine 引"指纹密度上限"作为 Phase 5 改出来的规则）。

**Inputs**：
- `handbook-brief.md` § Stage IDs / Diagram IDs / Term IDs / Pattern IDs
- `xray.md` § 3 Recommended path + § 5 Trace
- `traces/taleb-perspective/TRACE.md`（live-run 真实记录）
- `web-app/assets/data.js` s10-fanout（anchor，形状参考）
- 源 skill `SKILL.md`

**Must include**：
- 9 个 stage，顺序 s00 → s05 → s10 → s15 → s20 → s25 → s30 → s40 → s50
- 每个 stage 3-7 个 narrative block + 7 字段 + challenge + handoff
- s10-fanout 整段从 anchor slice 原样保留
- 3 个 hard checkpoint（s15 / s25 / s40）明确标出 + analyst proxy approval（AD-08/09/10）
- 塔勒布真实材料贯穿：174 来源 / 76% 一手 / 24 候选→6 模型 / Phase 4.1 PASS 3/3 / Phase 4.3 自警 caricature / Phase 5 改了哪 3 处
- reusableMove 指向有效 pattern id（p1-p12 见 brief）
- 嵌入相关 diagram id（orientation-map / fanout-map / three-fold-gate / checkpoint-vs-auto / protocol-derive）

**Must avoid**：
- 不复刻塔勒布 voice（no IYI / FRAUD!!!!!! / 火鸡 / 杠铃 当 handbook 自己的表达）
- 不把 narrative 替换成只列字段（7 字段是 quick-reference，narrative 是承重）
- 不让 stage 长度悬殊（每个 narrativeBody 约 200-350 字）
- 不把 Phase 5 写成"再 spawn 几个 agent"——重点是它**发现了什么**（caricature 风险）+ **改了什么具体规则**（Step 3.5 自检 + 三条硬刹车 + 伪问题第四类）

**Self-check 报告**：
- [x] 9 个 stage 齐全且顺序正确（s00→s05→s10→s15→s20→s25→s30→s40→s50）
- [x] 每个 stage narrativeBody 3-7 block（实际 4-6 block）
- [x] 7 字段（whatIGet / mustRead / cantShortcut / mineProduce / whoUsesNext / reusableMove / handoff）+ pretest + challenge 齐全
- [x] s15 / s25 / s40 三个 hard checkpoint 明确标出 + 写明 proxy approval（AD-08/09/10）+ 真用户在桌边会真停
- [x] 塔勒布真实材料贯穿：用户原话「我没有本地素材，你直接做」（s00）/ 6 subagent 任务表（s10）/ 174 来源 76% 一手（s15）/ 24 候选→升 6 降 2 丢 12（s20）/ 6 心智模型反推 6 维度（s30）/ Phase 4.1 PASS 3/3、Phase 4.3 caricature 自警（s40）/ Step 3.5 + 三条硬刹车 + 伪问题第四类（s50）
- [x] reusableMove 全部指向 brief Pattern IDs 列表里的有效 id
- [x] handbook voice 不复刻塔勒布 DNA：没有 FRAUD!!!! / IYI 当感叹号 / war > debate 这类塔勒布段子句式当 handbook 自身表达

**字数**：总 narrativeBody 约 2400 字 + 字段约 1800 字，合计 ~4200 字，落在 4000-5000 字目标内。
