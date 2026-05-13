# Recommended Trace X-Ray

Use this reference first. It defines the default output for this skill.

The goal is to show how a skill changes AI behavior on one real task. Do not
start by writing a full handbook. Start by producing a compact X-Ray backed by
source evidence, trace evidence, and an Intervention Map.

## Default output

Produce a `Skill X-Ray` with these sections:

1. **What changed** — 3-5 bullets naming the behavior changes the skill causes.
2. **Real task used** — the representative request and why it was chosen.
3. **Recommended path** — the path followed through the skill.
4. **Auto Decision Log + Checkpoint Map** — recommended choices made without
   asking, plus places the skill would require human confirmation.
5. **Trace** — trace type and observed, source-grounded, delegated, or simulated
   execution path.
6. **Baseline diff** — default AI behavior vs skill-guided behavior.
7. **Intervention Map** — default instincts paired with skill interventions.
8. **Evidence table** — source / trace / diff / inference for major claims.
9. **Friction score** — complexity added vs value gained.
10. **Upgrade options** — full handbook, branch comparison, eval proof, pattern
   extraction.

Keep it short enough that the user can decide whether a larger artifact is
worth producing.

## Recommended path policy

Choose the recommended/default option and continue. Do not stop just because a
skill exposes a choice. A choice is not the same as a checkpoint.

Ask only when:

- no recommended/default option exists;
- the action is destructive, external, irreversible, high-cost, or high-risk;
- the analyzed skill explicitly says the user must confirm and gives no
  recommended path;
- the user asked to review before continuing.

Use this distinction:

| Situation | Behavior |
| --- | --- |
| Recommended/default option exists and is safe | Auto-select it and log the choice |
| Skill requires human review or subjective selection | Mark a checkpoint; do not pretend it was completed |
| Recommended path is high-cost or external | Use source-grounded/delegated trace, or ask before live execution |
| User explicitly requested subagents/delegation | Use delegated trace when available and label it clearly |

When choosing automatically, write one Auto Decision Log row:

```markdown
| Decision | Chosen | Why recommended | Asked user? | Ask condition |
| --- | --- | --- | --- | --- |
| Output mode | Skill X-Ray first | User is inspecting the process, not requesting final publishing | No | User asks for full handbook |
```

For required stops, write one Checkpoint Map row:

```markdown
| Checkpoint | Why it stops | Default available? | What the X-Ray does |
| --- | --- | --- | --- |
| Research review | Skill requires human judgment before synthesis | No | Marked as hard checkpoint; trace continues as source-grounded |
```

## Pick the real task

Use a task that is:

- representative of normal skill use;
- small enough to trace in one run;
- concrete enough to produce files, prompts, choices, or outputs;
- capable of showing at least three interventions.

If the user gave a task, use it. If not, infer one from the skill description
and label it `inferred representative task`.

Avoid edge cases for the first X-Ray. Edge cases belong in branch comparison or
eval proof upgrades.

## Trace types

Start every X-Ray trace with one label:

| Trace type | Meaning | Typical use |
| --- | --- | --- |
| `live-run trace` | The skill path was actually executed | Safe local scripts, small file transforms, cheap read-only actions |
| `source-grounded trace` | The path was followed from instructions without executing expensive or external steps | Broad research, downloads, account actions, large fan-out |
| `delegated trace` | User explicitly requested subagents/delegation and delegates inspected independent surfaces | Complex skill packages with workflow, assets, scripts, and examples |
| `simulated trace` | Behavior was inferred because execution was not possible | Missing credentials, unavailable tools, unsafe operations |
| `baseline trace` | A no-skill comparison was run or inferred | Baseline diff and eval proof |

Delegated trace is evidence about the X-Ray analysis process. It is not proof
that the analyzed skill's own runtime succeeded unless the delegate actually ran
that runtime.

## Capture the trace

Prefer a real trace when safe and feasible. Capture:

- files and references read;
- files and references skipped;
- tools or scripts called;
- intermediate artifacts created;
- recommended choices made automatically;
- shortcuts the skill prevented;
- final output or output sketch.

If real execution is not possible, use a simulated trace and mark it clearly:

```text
Trace type: simulated from source instructions
Reason: running the skill requires external credentials
```

Do not present simulated behavior as observed behavior.

If using source-grounded or delegated trace, say which high-cost or hard-gated
steps were not executed and why.

## Baseline diff

Add a light baseline. The baseline can be:

- an actual no-skill run, when cheap and safe;
- a short no-skill prompt output;
- an inferred default AI instinct, clearly tagged as inference.

Use a paired table:

```markdown
| Without skill | With skill |
| --- | --- |
| Directly summarizes `SKILL.md` | Builds a package map first |
| Treats examples as templates | Uses references as the rule source |
| Starts full handbook by default | Produces X-Ray first, then offers upgrades |
```

The baseline is not a benchmark unless you actually ran both sides. Label the
evidence honestly.

## Evidence tags

Every major claim needs one of these tags:

| Tag | Meaning |
| --- | --- |
| `source` | Stated in `SKILL.md`, a reference, script, or template |
| `trace` | Observed during the live, source-grounded, delegated, simulated, or baseline trace |
| `diff` | Observed by comparing without-skill and with-skill behavior |
| `inference` | Reasoned from source or trace but not directly observed |

Use the weakest honest tag. If a claim is only inferred, say so.

## Friction score

End the X-Ray with a practical judgment:

```markdown
### Friction score

**Added friction**
- Reads 4 extra references.
- Creates 2 intermediate artifacts.
- Requires a diagram existence check.

**Value gained**
- Prevents treating examples as rule sources.
- Makes automatic choices visible.
- Separates source claims from trace evidence.

**Verdict**
Worth it for complex skills; too heavy for tiny prompt-only skills.
```

The score is qualitative. The point is not precision; the point is to decide
whether the skill's ceremony buys real behavior change.

## Upgrade ladder

Offer upgrades only after the X-Ray:

| Upgrade | Use when |
| --- | --- |
| Full handbook | The user wants a polished manual or web app |
| Branch comparison | Important choices have multiple plausible paths |
| Eval proof | The user wants confidence across several tasks |
| Pattern extraction | The user wants reusable skill-design moves |

Do not silently upgrade. Ask or wait for the user to request it.

## X-Ray self-check

- Did the run use one real representative task?
- Did recommended choices continue automatically?
- Did the Auto Decision Log record those choices?
- Did hard human checkpoints stay visible instead of being silently skipped?
- Does the trace type say whether this was live-run, source-grounded,
  delegated, simulated, or baseline?
- Does the Intervention Map show behavior changes, not just workflow steps?
- Are source, trace, diff, and inference claims clearly separated?
- Does the baseline diff avoid pretending that inferred behavior was observed?
- Does the friction score say when the skill is too heavy?
- Did the output offer upgrades instead of defaulting to a full handbook?
