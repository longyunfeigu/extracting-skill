# Starter Skill Design Pattern Library

Use these as seed patterns. Rename them in the user's language when that makes the output easier to understand.

## Trigger And Routing

### Entry Split

**It prevents:** Treating every user request as the same task.

**Use it when:** One skill supports multiple starting points, such as "I know the person" vs "I only know my problem."

**How it works:** First classify the request, then send it down the right path.

**Watch out:** Too many routes become a decision tree nobody follows.

### Ask Less, Decide Sooner

**It prevents:** Turning discovery into an endless questionnaire.

**Use it when:** The agent needs user context but should keep momentum.

**How it works:** Limit clarification to one or two targeted questions, then make a recommended choice.

**Watch out:** Do not use this when the wrong assumption could cause real harm.

## Research And Evidence

### Multi-Source Evidence

**It prevents:** Building a skill from one article, one transcript, or one convenient summary.

**Use it when:** The skill depends on accurate understanding of a person, domain, market, API, or practice.

**How it works:** Split evidence into dimensions. For a person, this might be writings, conversations, expression, outside criticism, decisions, and timeline.

**Watch out:** This is heavy. Use it when quality matters more than speed.

### Source Quality Ladder

**It prevents:** Treating first-hand sources and recycled summaries as equal.

**Use it when:** The output could become confident but wrong.

**How it works:** Rank sources. Prefer primary material, long-form originals, real decisions, and direct data. Mark weak sources.

**Watch out:** Do not pretend source ranking removes the need for judgment.

### Keep Contradictions

**It prevents:** Smoothing away the most interesting or important evidence.

**Use it when:** People, organizations, or domains contain real tension.

**How it works:** Record contradictions as signal. Separate time-based changes, context-based differences, and unresolved tension.

**Watch out:** Do not use "contradiction" as an excuse to avoid making a useful synthesis.

## Synthesis

### Three-Gate Filtering

**It prevents:** Promoting generic advice into a core model.

**Use it when:** The agent must decide which ideas are central enough to become part of a skill.

**How it works:** Keep a candidate only if it appears across contexts, generates useful predictions, and distinguishes this person or method from generic wisdom.

**Watch out:** Some practical rules are useful even if they are not deep models. Put those under heuristics instead.

### Operating System

**It prevents:** Producing a vibe, persona, or quote collection instead of a working way to think.

**Use it when:** The skill should act like a perspective, mentor, reviewer, or expert lens.

**How it works:** Combine mental models, decision rules, expression style, things to reject, and honest limits.

**Watch out:** It can become over-personalized. Keep the user's task more important than the persona.

### Model-To-Action Translation

**It prevents:** Leaving the skill as theory.

**Use it when:** The skill has concepts that must change behavior.

**How it works:** Turn each model into "when you see X, do Y, avoid Z."

**Watch out:** If every idea becomes a rule, the skill becomes rigid.

## Answering And Execution

### Research Before Answering

**It prevents:** Answering fact-sensitive questions from stale training memory.

**Use it when:** The skill discusses current companies, people, products, markets, laws, platforms, or benchmarks.

**How it works:** Classify the question. If facts matter, gather fresh evidence before applying the skill's perspective.

**Watch out:** Do not force web research for timeless framework questions.

### Checkpoint Before Expensive Work

**It prevents:** Doing hours of work in the wrong direction.

**Use it when:** A subjective synthesis or long build follows an uncertain stage.

**How it works:** Show a compact summary, ask for confirmation, then continue.

**Watch out:** Too many checkpoints make the skill feel bureaucratic.

### Tool Takes The Fragile Step

**It prevents:** Rewriting error-prone parsing, counting, conversion, or validation by hand.

**Use it when:** A repeatable step can be made deterministic.

**How it works:** Put the brittle operation in `scripts/` and tell the agent when to run it.

**Watch out:** State environment requirements and test the script.

## Packaging

### Self-Contained Skill Package

**It prevents:** A skill that only works on the author's machine because evidence or tools are elsewhere.

**Use it when:** The skill may be copied, installed, shared, or reused later.

**How it works:** Keep entry instructions, references, scripts, examples, and evidence inside the skill folder.

**Watch out:** Do not pack huge raw data into context. Store it, but load only what is needed.

### Progressive Disclosure

**It prevents:** Loading hundreds of lines the agent does not need.

**Use it when:** A skill has multiple modes, frameworks, examples, or heavy reference material.

**How it works:** Keep `SKILL.md` as the routing and core workflow. Move details to named reference files.

**Watch out:** The entry file must clearly say when to read each reference.

## Safety And Quality

### Honest Boundary

**It prevents:** A skill pretending to know more than it can know.

**Use it when:** The skill is based on inference, public information, stale data, or partial evidence.

**How it works:** Say what the skill cannot do, what information is missing, and when the user should verify.

**Watch out:** Boundaries should be specific, not a generic disclaimer.

### Red Flag List

**It prevents:** The agent rationalizing its way around the skill.

**Use it when:** The skill enforces discipline or blocks tempting shortcuts.

**How it works:** Name the thoughts or phrases that mean "stop, you are about to violate the workflow."

**Watch out:** Red flags must match real failure modes, not imagined ones.

### Pressure Test

**It prevents:** Shipping a skill that sounds clear but fails under realistic use.

**Use it when:** The skill changes agent behavior, especially under speed, uncertainty, or authority pressure.

**How it works:** Try prompts that would normally make the agent skip the process. Revise until the skill holds.

**Watch out:** Do not leak the expected answer into the test.
