# Stage writing rules

Use this reference when writing or reviewing the Walkthrough page: the part of
the handbook that shows how the agent moves through the skill step by step.

## Core shape

Each stage should teach before it lists metadata. The reader should be able to
answer six questions after reading the stage:

1. What do I do here?
2. What input do I have?
3. What output do I produce?
4. How much freedom do I have?
5. What concrete mismatch or drift does this stage catch?
6. Which later stage or mechanism relies on this?

In `handbook.walkthrough[]`, the metadata can look like:

```js
{
  id: "stage-03",
  title: "...",
  summary: "...",
  receives: "...",
  reads: "...",
  blockedShortcut: "...",
  action: "...",
  output: "...",
  painPoint: "step、口播、mp3、录屏推进四条线容易漂开",
  mechanismThread: "`narrations.ts` -> `audio-segments.json` -> mp3 -> Auto next()",
  nextConsumer: "...",
  freedom: "limited | creative | almost-none"
}
```

## Explain terms before names

When a source-skill term first appears in walkthrough, design choices, patterns,
or file map, add a short local explanation. Do not make the reader jump to
Glossary just to keep reading.

Good:

```text
我先生成 `script.md`（能念出口的口播节拍稿），再按 `---` 切出的节拍点
（每个节拍点大致对应一个 step）拆章节。
```

Bad:

```text
我先生成 script.md，按 SCRIPT-STYLE.md 三层标准改写，注意保留节拍点。
```

Only promote 1-3 terms to full Glossary cards. Promote a term when
misunderstanding it would make several later stages confusing.

## Use first-person execution voice

Walkthrough uses "我" because the page shows the agent being guided by the
skill. Do not keep saying "我作为 AI"; the reader already knows the speaker.

Good:

```text
我手里有 6 份调研文件。

第一秒我想挑最醒目的 5 句话，把它们包装成心智模型。

skill 不让。它要求每个候选都过三道筛。
```

Bad:

```text
我作为 AI agent 在此阶段根据 skill protocol 执行 framework synthesis。
```

Use neutral labels in quick-reference rows. Use direct "你" only in reader
challenge blocks, not in the agent's main execution narrative.

## Start with a pre-test

Open important stages by asking the reader to guess the next move before seeing
what the skill forces.

```markdown
**先猜一遍：** 设想你和我坐同一把椅子上。<当前状态>。
你下一步的本能是 <X> 还是 <Y>？写下来再读下面我实际怎么走。
```

Do not write "你是这个 AI"; that changes the point of view.

## Carry real material

Each stage narrative must include at least one real artifact:

- a source excerpt;
- a prompt sent to the user;
- a command or output trace;
- a Markdown / JSON / TS sample showing the artifact shape.

Input and output should usually each get a concrete excerpt. Naming a file is not
enough.

The metadata rows belong in a collapsible "阶段速查" panel below the narrative.
The default reading path is the story plus evidence.

## Name the pain, then show the mechanism

Do not stop at "I did A, produced B, and handed it to C." Important stages need
the mismatch they catch.

Ask:

- What would visibly go wrong first if I skipped this?
- Which later rework does this step avoid?
- Which file, rule, script, or checkpoint catches the mismatch?
- Is this one part of a cross-stage mechanism thread?

Template:

```markdown
这一步表面是在 <动作>。真正挡住的是 <具体错位症状>。

如果直接 <默认做法>，最先露出的症状会是 <可观察结果>。

skill 的处理是 <机制>：<文件 / 规则 / 脚本> 先钉住 <维度>，
后面的 <stage / 文件 / 命令> 只读这一个来源。
```

Pull pain points from `handbook-brief.md` instead of inventing new ones per
stage. Overview and Walkthrough should explain the same task pain from different
angles.

## Show freedom level

For creative stages, show default instinct versus constrained result.

````markdown
默认本能会这样写：

```tsx
<p>准确率从 64% 提到 89%</p>
```

skill 不让这样写。它把 64% -> 89% 判成 "对比 + 增长"，所以画面必须同时呈现
两个数字、颜色差异和上升动作。
````

For almost-mechanical stages, say why there is little freedom:

```text
这一步几乎没发散空间。`script.md` 已经把顺序、关键数字和语气钉住了。
我只需要按 step 顺序填进数组，并保证数组长度等于页面 step 数。
```

## Connect stages

Each stage should have a short opening and closing handoff.

```markdown
**接上一步：** <上一步留下了什么，所以这一步可以做什么>

<stage narrative>

**这里能偷的招：** <one reusable move>

**下一步靠这个：** <这一步让下一步不用重新判断什么>
```

First stage uses `**从这里开始：**`. Last stage uses
`**这里把账结清：**`.

The closing handoff for stage N and the opening handoff for stage N+1 should say
the same thing from two sides.

## End with reader challenges

Challenges are for the human reader as a future skill author. Put them in a
visually distinct block so they do not sound like the agent's inner monologue.

Use 3-4 concrete questions from real edge cases:

- boundary the stage does not fully cover;
- conflict between two rules;
- cost case where the rule may be too heavy;
- missing input or weak evidence case.

## Self-check

- Does the stage answer the six core questions?
- Are important terms explained before use?
- Does the narrative use first-person execution voice without repeating
  "我作为 AI"?
- Are input and output backed by real material?
- Does the stage name the visible mismatch it catches?
- If creative, does it show default instinct versus constrained result?
- If mechanical, does it say why there is little freedom?
- Do the handoffs create a clear cause-and-effect chain?
