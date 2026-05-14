# design-choices.packet

**Page job:** 解释女娲 7 个关键设计选择为什么存在，每条拆成"AI 准备做什么 → skill 怎么改 → 结果如何"三幕。

**Reader state:** 已看完流程，想知道哪些规则值得偷、为什么不能省。

**Voice:** 争辩式。先承认这条规则看起来多余，再展示不做会怎样。

**Inputs:** brief 的 design choices 表、`references/cards-patterns.md`、Phase 0/0.5/1/1.5/2/3/4 的对应文本。

**Must include:** 7 个 choice（dc-route-before-work / dc-package-before-research / dc-six-dimensions / dc-checkpoints / dc-triple-validation / dc-agentic-protocol / dc-quality-with-repair）。每条三幕（badScenario / constraint / solvedProblem）+ looksUnnecessaryBecause + reusableMove + 3 个 counterScenarios（管用 / 让一步 / 用不上）。

**Must avoid:** 通用最佳实践；只说"提升质量"不说防了什么坏结果。

**Packet output:** `handbook.designChoices`。

**Self-check:** 每个 choice 的"用不上"counter scenario 不是"管用 + 程度更小"，必须真的是另一种情况下该规则反而是错的。

**Voice gate:** 扫每个 choice 的 badScenario 和 constraint。
