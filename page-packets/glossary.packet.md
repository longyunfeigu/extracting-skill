# glossary.packet

**Page job**：读者在 walkthrough / design choices / patterns 中遇到陌生术语时来这页慢镜头查清楚——不是堆字典条目，是把每个术语和塔勒布 trace 中的真实场景绑定。

**Reader state**：读完 overview 知道女娲大形状，可能在 walkthrough 第 3-4 个 stage 撞上「心智模型 vs 启发式」「Hard checkpoint vs Auto Decision」「caricature」等术语。

**Voice**：教科书慢镜头 voice——definition ≤ 80 字（精确不啰嗦），example 必须来自塔勒布 trace 实材料，notTheSameAs 字段给锐利区分。**不复刻塔勒布表达 DNA**（不写 IYI / FRAUD / 等级 >> 当作 handbook 自身用词；只在 t-iyi 那一条引用 IYI 作为塔勒布产物词概念）。

**Inputs**：
- `handbook-brief.md` Term IDs 表（已给短解释）
- `xray.md` § 7 Intervention Map（每个术语对应的 intervention 行）
- `traces/taleb-perspective/references/research/extraction-notes.md`（t-mental-model / t-heuristic / t-three-fold 的源材料）
- `/Users/guwanhua/.agents/skills/huashu-nuwa/references/extraction-framework.md`（三重验证源头）

**Must include**：12 个 term，每个字段 `{term, shortLabel, id, definition, example, notTheSameAs, whyItMatters}` 齐全。12 个 id 按 brief 严格对齐：
- t-skill / t-mental-model / t-heuristic / t-expression-dna / t-agentic-protocol / t-three-fold
- t-honest-boundary / t-checkpoint / t-caricature / t-iyi
- t-fanout / t-proxy-approval

**Must avoid**：
- definition 写成同义反复（"心智模型就是 mental model"）
- example 只列名（"如 Antifragility"）不给上下文
- 超过 3 个 example 来自塔勒布 trace 以外（至少 11/12 来自 trace）
- 把塔勒布 voice 渗进 handbook voice
- notTheSameAs 字段空着——这个字段是 glossary 防混淆的核心

**Packet output**：在 `web-app/assets/data.js` 中 patch `handbook.glossary` 数组（12 个 term object）。

**Self-check（page voice gate）**：
- 12 term id 严格按 brief
- 每个 definition ≤ 80 字
- 每个 example 来自塔勒布 trace 实材
- notTheSameAs 给出锐利区分（t-mental-model vs t-heuristic 颗粒度 / t-caricature vs t-iyi 方向 / t-checkpoint hard vs auto 差异）
- 没有塔勒布表达 DNA 渗入

**写作说明**：原计划由独立 page agent 写，但 glossary agent 在 API 层面 socket 异常关闭失败。由主 thread 直接根据 brief Term IDs 表 + extraction-framework.md + trace 实材撰写，避免重新 spawn 再失败。Voice 与其他 6 个 page packet 保持一致（教科书 voice，非塔勒布 voice）。
