# Output Templates

Use these templates as shapes, not forms to fill mechanically. Keep the language natural.

The templates are ordered for **Reuser** audience by default. For **Author** audience, drop sections marked `(skip for Author)`. For **Learner** audience, expand the worked example.

## Single Skill Package

```markdown
## Skill: <name>

> **Audience:** <Author / Learner / Reuser> · **Source:** <path>

### Flow at a glance

\`\`\`
<≤ 20-line ASCII diagram. Show entry → phases → checkpoints → output.
Mark cost cliffs (where rework gets expensive) and caps (max iteration).>
\`\`\`

### One worked example  *(skip for Author)*

**Input:** <a concrete user request>

| Stage | Got | Did | Produced | Move learned |
| --- | --- | --- | --- | --- |
| <stage> | <input> | <action> | <output> | <reusable move> |

### What bad result it prevents
<The concrete failure. Make it specific. "AI writes fake expert voice made of quotes and vibes" beats "low quality output">

### Why the design has to be this heavy
<List 2-4 force-pairs in tension and how the skill resolves each. Keep them specific to this skill, not generic.>

### Distinctive patterns (only the moves unique-ish to this skill)

<3-5 pattern cards using the Design Pattern Card template below. If a move is already in pattern-library.md, do NOT re-card it — list it under "Library hits" instead.>

### Library hits  *(one-liner each, no cards)*
- **<existing pattern name>** — used in <where>, no new variation worth carding.

### Glossary  *(skip for Author)*
| 概念 | 人话解释 | 怎么判断 | 小例子 |
| --- | --- | --- | --- |
| <term> | <do not explain the term with itself> | <how to recognize it> | <example from the skill> |

### What you can't write down  *(Polanyi edges)*
| Dimension | Why rules fail here | How to learn it instead |
| --- | --- | --- |
| <dim> | <why> | <which examples to study, how many> |

### Where things live
- `SKILL.md`: <what belongs here>
- `references/`: <what belongs here>
- `scripts/`: <what is automated>
- `examples/`: <what examples prove or teach>

### Honest gaps  *(stand on giants' shoulders)*
1. **<lens, e.g. Norvig>**: <specific gap>
2. **<lens, e.g. Sweller / expertise reversal>**: <specific gap>
3. ...

### Next action
<One paragraph. What should the reader do tomorrow with this report?
- For Author: which 1-2 changes to consider, in priority order.
- For Learner: which 1-2 example files to read next, in order.
- For Reuser: which 1-2 patterns to copy into the new skill, with file paths.>
```

## Design Pattern Card

```markdown
### <Pattern name>  ·  status: candidate | pattern

**Prevents:** <bad AI behavior or bad output, specific>

**Forces:** <the *specific* tensions making this solution non-obvious. If your forces could fit a sibling pattern in the same skill, they are too generic — find the real ones.>

**Evidence of recurrence:** <skills (with paths) where you have actually seen this move. Default: candidate. Promote to pattern only with 2+ unrelated sightings — pattern-library.md does NOT count as a sighting.>

**Anti-example (where this pattern stops):** <a concrete move that looks similar but is *not* this pattern. Without this, the boundary is vague — keep status: candidate.>

**Use when:** <triggering situation, specific>

**How:** <reusable shape, 2-4 lines>

**Lives in:** <SKILL.md / references / scripts / examples / tests>

**Cost:** <time, tokens, user attention, dependencies>

**Combines with:** <other patterns>

**Reflection-in-action warning:** <one *concrete* scenario where applying this pattern blindly misleads. Generic disclaimers fail this field.>

**Norvig check:** <pattern, OR platform-deficiency-marker. Justify in one line.>

**Real example:** <skill name + path + 1-2 line note>
```

## Quick Path Pattern Card (for experienced readers)

```markdown
- **<Pattern name>** — <one-line gist>. ⚠️ <reflection-in-action warning, one line>.
```

Use the quick path when the user already knows the territory. Skip worked examples; link to the full card only if asked.

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
