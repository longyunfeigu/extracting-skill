# Teaching Version (教学版) Style

A "teaching version" is **not** a pattern catalog or extraction report. It is a Socratic narrative that walks the reader to invent the solution before showing the implementation.

Use this mode when the user says "教学版" / "teaching version" / "讲清楚原理" / asks for first-principles explanation. The default extraction report (audience: Author/Reuser) is the wrong genre for this request.

Reference: see `~/Documents/Obsidian Vault/30_研究/learn-crewai/S01-教学版-ReAct循环.md` and `S04-教学版-结构化输出.md` for canonical examples of this style.

## Core principle

> 让读者先发明，再看答案。

The reader's brain is more engaged when reconstructing the design than when reading it. Every section that can be turned into "你会怎么做" → "你刚才独立发明了 X" should be turned that way.

## Section structure (rough template, adapt as needed)

1. **一、先感受问题** — A concrete user-facing failure. Make the reader feel the pain that motivates the design. Use a specific input/output, not "系统会出 bug" abstractions.
2. **二、你会怎么修** — Invite the reader to invent the fix. List 2-4 instincts they would have, why each instinct partially works and where it breaks.
3. **三、等等，为什么 X** — Surface the counter-intuitive part. Anticipate the reader's confusion ("你可能会想：……") and answer it from first principles, not from authority.
4. **四、还有更狠的吗 / 还重要吗** — Extend or contextualize. Either show a more powerful variant, or argue for the design's continued relevance against newer alternatives.
5. **五、副作用 / 陷阱** — Honest tradeoffs. What goes wrong with the design? When is it the wrong choice? Use comparison tables for tradeoff visibility.
6. **六、为什么不直接 Y 就好** — Refute the obvious counter-design. The reader will think "why not just do Y" — answer it before they ask.
7. **七、看一眼别人怎么做** — Verify the reader's invention against the actual implementation. Show real code snippets / config / SKILL.md sections. **This comes near the end, not at the start.**
8. **八、把这节课压成一句话** — Compress the entire lesson to one quotable sentence. Then list the 2-4 底层观察 that make it work.
9. **最好的学习方式** — One concrete, actionable practice the reader can do in 30 minutes that locks in the lesson.
10. **下一步** — Pointer to the next lesson or related material.
11. **Footer** — Link back to the source material; acknowledge what the teaching version skipped (it is a complement to, not a replacement for, the source-code-level reference).

Sections may merge or split. The order I→VIII should not invert.

## Voice and rhetoric

| Move | Example phrase |
|---|---|
| Invite participation | "假设这个问题交给你" / "先别看别人怎么做" |
| Anticipate confusion | "等等，..." / "你可能会想：..." / "听起来合理。**它不行。**" |
| Reveal punchline | "如果你想到这五步，恭喜——你已经独立发明了 X" |
| Lock in insight | bold the turning point sentence; then a `>` blockquote with the principle |
| Concrete analogy | chess board, dictionary, translator, papers and advisors — invent one per concept |
| Tradeoff table | always with a "适合谁/什么时候选" final row that exposes the underlying design choice |
| One-line landing | "**就这样**" / "**就这么一行**" — a sentence on its own line, after a long buildup |
| Honest concession | "这一关靠人的判断，没有自动化兜底" — never pretend a hard part is solved when it isn't |

Avoid:
- Pattern card formats. Anti-pattern for this genre.
- "First, ... Second, ... Third, ..." machine-listing without narrative motivation.
- Jargon-first introduction. Always: concrete failure → derive concept → name it last.
- Long "Quick Path" lists at top. The whole text is the path.
- **Flow diagrams at the top.** A flow diagram given before derivation spoils the discovery — the reader skips the推导 and memorizes the answer. The reader's brain is supposed to *build* the flow as the narrative unfolds, not receive it pre-built.

## Flow diagrams in teaching versions

If the source skill has a multi-phase flow worth diagramming, the diagram is allowed — but with two constraints:

**Placement.** Put the diagram in one of two places, never at the top:

1. **Inside the "看一眼别人怎么做" section** (typically Section VII–IX), as the visualization that confirms what the reader has just derived. Reader earns the diagram by walking through the推导 first.
2. **At the very end as a "速查 / review card"**, after "下一步". Acceptable when you expect the reader to come back for a second pass.

**Annotation density.** A teaching-version diagram is *not* a labels-only flowchart. Every node and edge should carry a one-line "为什么" that maps back to a derivation in the narrative. Examples:

- Bad: `Phase 1.5  调研 Checkpoint`
- Good: `▣ Phase 1.5  调研 Checkpoint  ◄── 成本拐点 ①  廉价信息 → 昂贵提炼，在这里拦垃圾比在 Phase 2 之后便宜 10x`

- Bad: `Phase 4  Subagent QA × 3 测`
- Good: `▢ Phase 4  独立 Subagent 三测   不传主 agent 上下文 ← 架构性独立`

The annotations should be the same one-liners the narrative used. When a reader scans the diagram, each annotation should re-fire the推导 from the corresponding section. The diagram is a "visual receipt" of the derivation, not a reference card from a different document.

If you cannot annotate a node with a one-line "why" from the narrative, that node was not actually taught — either teach it in a section first, or remove it from the diagram.

## Length

A teaching version typically runs 400-700 lines for a single conceptual unit. Long is fine **if every line teaches**. If a line is summary or restatement, cut it.

If the source skill has many phases / many concepts, write **one teaching version per central insight**, not one giant teaching version covering everything. The S01-S20 series is a good example: each lesson is one concept.

## What to skip

The teaching version does not include:
- Complete file/package layout listings (those live in the source-code reference).
- Exhaustive config option tables.
- Pattern-library cards (those live in the extraction report).
- Audience headers — teaching versions are by default for **Learners** who want first-principles understanding.

If the user wants both a teaching version AND a pattern extraction, produce them as separate documents with clear cross-links.

## Closure

Every teaching version ends by **giving the reader back agency** — the "最好的学习方式" section is not optional. A teaching version that doesn't tell the reader what to do next has failed; the reader will close the tab feeling informed but inert.
