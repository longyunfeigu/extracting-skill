# Output Templates

Use these templates as shapes, not forms to fill mechanically. Keep the language natural.

## Single Skill Package

```markdown
## Skill: <name>

### 这个 skill 为什么让人眼前一亮
<The moment that made the skill feel different from a normal prompt.>

### 它在防什么坏结果
<Say the concrete failure. Example: "AI writes a fake expert voice made of quotes and vibes.">

### 它为什么要这样设计
<Explain why the process, files, or checks exist. Keep the tensions concrete.>

### 先把关键概念讲清楚

| 概念 | 人话解释 | 怎么判断 | 小例子 |
| --- | --- | --- | --- |
| <term> | <do not explain the term with itself> | <how to recognize it> | <example from the skill> |

### 它逼 AI 先做什么
- <Action the agent must do first>
- <Action it must record or show>
- <Action it must verify>

### 它不让 AI 怎么偷懒
- <Lazy shortcut it blocks>
- <Fake confidence it blocks>
- <Missing evidence it blocks>

### 它是怎么跑起来的
1. <entry / routing>
2. <context gathering>
3. <main work>
4. <checkpoint / review>
5. <build / answer>
6. <validation / handoff>

### 用一个例子跑完整流程

**例子输入：** <a concrete user request>

| 阶段 | 这一阶段拿到什么 | AI 要做什么 | 这一阶段产出什么 | 你能学到哪招 |
| --- | --- | --- | --- | --- |
| <stage> | <input/context> | <action> | <output/file/decision> | <reusable move> |

### 它把东西放在哪里
- `SKILL.md`: <what belongs here>
- `references/`: <what belongs here>
- `scripts/`: <what is automated>
- `examples/`: <what examples prove or teach>
- `tests/`: <what is tested, if present>

### 我能偷走哪几招
1. **<plain pattern name>** - <one sentence>
2. **<plain pattern name>** - <one sentence>
3. **<plain pattern name>** - <one sentence>

### 哪些地方太重
<When this skill's design would be too slow, too much, or too rigid.>
```

## Design Pattern Card

```markdown
### <Pattern name>

**它防的是：** <bad AI behavior or bad output>

**适合用在：** <triggering situation>

**怎么做：** <the reusable shape>

**通常放在：** <SKILL.md / references / scripts / examples / tests>

**代价：** <time, tokens, user waiting, complexity, dependencies>

**适合搭配：** <other patterns>

**例子：** <specific skill and how it used this move>
```

## Batch Pattern Library

```markdown
## Skill 设计模式库

### 最大发现
- <theme across many skills>
- <theme across many skills>

### 模式

<Pattern cards, grouped by purpose: triggering, research, synthesis, validation, packaging, output.>

### 组合用法
- **For research-heavy skills:** <patterns>
- **For discipline-enforcing skills:** <patterns>
- **For creative generation skills:** <patterns>
- **For tool-heavy skills:** <patterns>

### 发现的问题
- <missing validation>
- <unclear trigger>
- <overloaded SKILL.md>
```
