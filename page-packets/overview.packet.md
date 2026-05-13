# overview.packet

**Page job**：让没看过女娲的读者读完能 3-5 句话给朋友讲清楚它在干嘛——从默认 AI 失败模式开场，到 Phase 5 的精炼为止。

**Voice**：教科书教学 voice（第一人称"我作为使用女娲的 AI..."是 walkthrough 的；overview 用第三人称冷静叙述）。不复刻塔勒布表达 DNA（不写 IYI / FRAUD / 火鸡 / Hammurabi / 全大写）。

**Inputs**：
- `handbook-brief.md`（X-Ray summary / Intervention Map rows）
- `xray.md` § 7 Intervention Map + § 6 Baseline diff
- `web-app/assets/data.js` overview anchor slice（第 1 张 badResults）

**Must include**：5 张 badResults 卡，每张 `title` + `aiDefault` + `skillIntervention`。覆盖方向：
1. 角色 prompt 化（anchor 已有）
2. 金句当心智模型 → E4 三重验证
3. 矛盾调和 → E5 保留 7 对张力
4. 凭训练记忆生成 → O9 + Phase 5 第四类伪问题
5. Caricature 指纹堆叠 → Phase 4.3 实测 + Phase 5 双精炼

**Must avoid**：复刻塔勒布表达 DNA；抽象口号；只点 Phase 而不说机制；自造 handbook 术语。

**Packet output**：见 message 末尾 JS literal（patch `overview.badResults` key）。

**Self-check（page voice gate）**：
- [x] 5 张卡，每张 aiDefault + skillIntervention 合计 ≤ 200 字
- [x] 无塔勒布 DNA 渗入（无 IYI / FRAUD / 等级 >> / 全大写）
- [x] 每张 aiDefault 落到行为细节（不是判断）
- [x] 每张 skillIntervention 指出具体 Phase + 机制
- [x] 4 个新方向各 1 张，且与 § 7 Intervention Map 对应行 evidence 一致
