# Design choice and pattern cards

Use this reference when writing or reviewing the handbook sections for key
design choices and reusable skill design patterns.

## 4. Every design choice must name the bad scenario

For each meaningful rule, explain:

- 看起来为什么多此一举
- 不这样会坏在哪里
- skill 怎么约束我
- 这个约束解决了什么问题
- 能偷走哪招

Template:

```markdown
### <design choice>

**看起来多此一举的地方：** <why a reader may think this is unnecessary>

**坏场景：** <what the AI would likely do without this rule>

**skill 怎么约束我：** <the concrete instruction, checkpoint, file split, or validation>

**解决的问题：** <the user-facing or production-facing problem it prevents>

**可偷的招：** <the reusable design move>
```

## 7. Design choice cards must include 3-scenario counter-comparison

Single-perspective design advice is misleading. Each design choice must include
three concrete scenarios where the choice 救 / 绑 / 取决于 / 失效.

```markdown
### <design choice>

**看起来多此一举的地方：** ...
**坏场景：** ...
**skill 怎么约束我：** ...
**解决的问题：** ...
**可偷的招：** ...

**不同场景下的力度对比：**

| 场景 | 效果 | 为什么 |
|---|---|---|
| <典型场景> | 救你 | <为什么这是它的甜区> |
| <边缘场景> | 绑你 / 部分让位 / 应简化 | <为什么这个场景下它反而是负担> |
| <反例场景> | 完全失效 / 取决于 | <为什么这个场景下规则空转或要看具体> |
```

Allowed `effect` values: 救你 / 绑你 / 部分让位 / 部分过度 / 应简化 / 可以跳过 /
取决于 / 完全失效 / 完全多余 / 完全冗余 / 可能绑你 / 可以放宽。

## 8. Pattern cards must have a Therefore break and cross-links

Patterns are not arranged in a flat list. Each pattern card needs:

- **A `therefore` field** rendered as a visual breakpoint between the problem
  (`prevents`) and the solution (`useWhen` / `howToReuse`).
- **A `relatedPatterns` array** that links the card to other pattern cards in
  the same handbook. Each link has `to` (pattern id like "P4"), `label`
  (pattern name), and `relation` (a phrase like "搭配用：...", "前置：...",
  "区别于：...", "下游接管：...").

```markdown
### <pattern name> · 状态：候选

**它防什么坏结果（problem）：** ...

❖ &nbsp; ❖ &nbsp; ❖

**Therefore:** <one-line pivot from problem to solution>

❖ &nbsp; ❖ &nbsp; ❖

**什么时候用 / 为什么不能简单做：** ...
**怎么复用：** ...
**反例：** ...
**代价：** ...
**在哪几个 skill 里见过：** ...

**和哪些 pattern 一起读：**
- → P4 便宜返工点 checkpoint（搭配用：分流后通常要走 checkpoint 才进昂贵实现）
- → P8 审阅清单接修复（搭配用：分流的产出每一份都要走自检 → 修复闭环）
```

`relation` 写法建议：「搭配用：」「前置：」「区别于：」「下游接管：」
「对照：」「可能冲突：」——一两个词点出关系性质，避免泛泛 "相关"。

## Recommended design choice section

Pick 5-8 choices that explain the skill's shape. Do not list every rule. Prefer
choices that changed the AI's behavior:

- why the skill does not answer immediately;
- why a checkpoint exists;
- why a file is a source rather than derived;
- why a later phase gets decision power;
- why validation must fix before reporting;
- why a script handles a fragile step.

## Recommended pattern section

Extract only the moves a reader can copy into another skill.

```markdown
### <pattern name> · 状态：候选

**它防什么坏结果（problem）：** ...

❖ &nbsp; ❖ &nbsp; ❖

**Therefore:** <one-line pivot from problem to solution>

❖ &nbsp; ❖ &nbsp; ❖

**什么时候用 / 为什么不能简单做：** ...

**怎么复用（详细）：** ...

**反例（看着像但不是这招）：** ...

**什么时候这招会坑你 / 代价：** ...

**在哪几个 skill 里见过：** ...

**和哪些 pattern 一起读：**
- → P<n> <pattern name>（搭配用 / 前置 / 区别于 / ...：<relation 一句话>）
- → P<n> <pattern name>（...：...）
```

The `❖ ❖ ❖` divider tells the reader to stop one second between problem and
solution. The `relatedPatterns` cross-link section turns isolated cards into a
navigable network.

Design choice cards follow a parallel shape with a `counterScenarios` table
instead of `relatedPatterns`.

## Cards self-check

- Does every major design choice name the bad scenario it prevents?
- Does every design choice have three counter scenarios?
- Are all three scenario effects positive? If yes, rewrite at least one as a
  real constraint, partial fit, or failure case.
- Is each "why" specific enough to argue with?
- Does every pattern card have a `therefore` field?
- Does every pattern link to at least one related pattern?
- Does each relation say what kind of relationship it is, not just "related"?

