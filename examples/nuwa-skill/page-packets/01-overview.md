# Page packet · 01 Overview

## Job（这一页要干的唯一事）

把一个完全没看过 nuwa 的读者带到这本手册——10 分钟内让他/她说："我大概知道这个 skill 在干嘛，也知道为什么值得继续往下读。"

具体回答 4 件事，按 site.js overview 渲染顺序：
1. **domainPrimer**：这个 skill 在做什么（0 行业黑话，给完全不懂的人看）
2. **oneLiner + wowMoment + badResultPrevented**：先感受一下——AI 默认会做坏成什么样、skill 怎么改写
3. **example**：引入塔勒布作为贯穿全本的具体例子
4. **whyThisShape**：这本手册的 7 章为什么这么排

## Voice（这一页的写作语气）

- **第一人称 AI**：用"我（AI）"作主语
- **不卖关子**：把 wow moment 直接讲出来，别留到 Walkthrough 才揭
- **重对照不重抽象**：讲"AI 默认会怎样"vs"skill 怎么改写"，不讲哲学
- **不引学者名 / 不发明术语 / 不工程缩写 / 不中英夹杂**

## Inputs（写之前必读）

- `handbook-brief.md` 全文（特别是 §2 running example + §3 共享 fact + §6 voice 规则）
- nuwa root `SKILL.md` 行 1-100（核心理念 + Phase 0 入口 + Phase 1 6 agent 任务表）
- nuwa root `SKILL.md` 行 440-500（Phase 3 Agentic Protocol 反推规则 + 推导表 3 例）
- `examples/taleb-perspective/SKILL.md` 行 50-100（Step 2 5 维度落地）

## Required material（这一页必须出现的真东西）

- 塔勒布的"看风险 / 看脆弱性 / 看历史 / 看叙事 / 看皮肤在场" 5 维度——证 Agentic Protocol 反推存在
- 横向对照：塔勒布 / 费曼 / MrBeast 三人的"看什么"完全不同——证不是写死模板
- 三重验证 funnel（候选 → 心智模型 / 启发式 / 丢）+ 至少举一个塔勒布的例子（如"反脆弱"过三重）
- 三道检查点（Phase 1.5 / 2.5 / 4）名字 + 一行说什么时候停
- 独立 subagent 做质量验证（避免自评偏差）—— Phase 4 的关键设计
- 自包含原则（生成目录可独立复制，不依赖 nuwa 本身）—— Phase 0.5 的关键设计

## Required cross-links（这一页应该指向哪里）

- domainPrimer 末尾点名 Walkthrough（"详细 14 个 stage 见下一章"）
- example 末尾点名"会贯穿整本手册——后面 Walkthrough 的每一阶段都用塔勒布落地，中途不换"
- whyThisShape 列 7 章 + 各章主题——把 Glossary、Design Choices、Patterns 的读者承诺都讲一下

## Self-check（写完逐条扫）

1. 一个完全没读过 nuwa 的人，看完这一页能不能用 3-5 句话给朋友讲清楚 nuwa 是干嘛的？
2. wowMoment 是不是"具体到 1-2 个会让人意外的细节"，而不是空泛的"很妙"？
3. badResultPrevented 是不是说出了 4 种具体的 AI 本能（不是 1 种泛泛而谈）？
4. 塔勒布的 5 维度是不是被真东西列出来了（而不是只说"反推存在"）？
5. 反装样自检 7 条扫一遍：没起英文名 / 没引学者名 / 没文学修辞 / 没哲学层级包装 / 没发明新名词 / 没中英夹杂 / 没工程 3 字缩写
6. 每段读出声不会卡——不出现"质量门""硬节点""真相源""流水线"
7. Agentic Protocol / SKILL.md / Phase 0.5 / skin in the game 这些 source skill 固有命名保留 OK，但第一次出现时旁边给了 1 行短解
