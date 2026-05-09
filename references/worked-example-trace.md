# Worked Example Trace

Use this reference when a skill has multiple stages and the reader would understand it better through one concrete run.

## Why This Exists

Several teaching traditions point in the same direction:

- **Worked examples**: show a solved process step by step so beginners are not forced to learn the concept and solve the task at the same time.
- **Case method**: put the learner inside a concrete decision, not outside it reading abstractions.
- **First principles of instruction**: start with a real problem, show the skill, let the learner apply it, then help them carry it into future work.
- **Cognitive apprenticeship**: make expert thinking visible through modeling, scaffolding, reflection, and gradual independence.
- **Experiential learning**: move from concrete experience to reflection, then to a reusable idea and a next experiment.

Translated for skill extraction:

```text
不要只说“它有六路调研和三重验证”。
拿一个具体输入，比如“蒸馏乔布斯”，跑一遍：
这个阶段吃什么、AI 做什么、吐出什么、这一招以后怎么复用。
```

## When To Include It

Always include a worked example trace when:

- the skill has 4+ stages;
- the skill uses checkpoints, routing, loops, or validation;
- the output contains abstract labels the user may not understand;
- the user asks “它到底怎么跑” or “每阶段输入输出是什么”;
- the goal is to teach the user how to write similar skills later.

Skip it when the skill is tiny and the flow is obvious.

## Template

```markdown
### 用一个例子跑完整流程

**例子输入：** <user request>

| 阶段 | 这一阶段拿到什么 | AI 要做什么 | 这一阶段产出什么 | 你能学到哪招 |
| --- | --- | --- | --- | --- |
| 入口分流 | <input> | <decision/action> | <route/decision> | <pattern> |
| 收集材料 | <available files/sources> | <read/search/ask> | <notes/files> | <pattern> |
| 提炼 | <notes> | <filter/synthesize> | <models/rules> | <pattern> |
| 检查点 | <summary> | <show/ask/fix> | <approved direction> | <pattern> |
| 生成 | <approved design> | <write/build> | <final output> | <pattern> |
| 验证 | <final output> | <test/review> | <pass/fail/fixes> | <pattern> |
```

## Good Example Trace Rules

- Use one concrete request all the way through. Do not switch examples midstream.
- Show intermediate outputs, not just final results.
- Keep each row short enough to scan.
- Include file paths when the stage writes files.
- Explain the reusable move in each row.
- If a stage is subjective, show the decision criteria.

## Bad Example Trace

```text
阶段 1：调研。
阶段 2：提炼。
阶段 3：生成。
```

Why bad: it names phases but does not show what goes in, what happens, or what comes out.

## Better Example Trace Shape

```text
阶段：三重验证
拿到什么：15 个候选观点
AI 做什么：逐个问“跨场景出现吗？能判断新问题吗？独特吗？”
产出什么：5 个心智模型 + 8 条决策启发式
你能学到哪招：不要把漂亮话直接升格成核心模型
```
