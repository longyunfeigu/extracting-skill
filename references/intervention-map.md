# Intervention Map

Use this reference before writing the Skill X-Ray or any full handbook upgrade.

An Intervention Map answers the most important question:

```text
What would the AI normally do, and what does the skill make it do instead?
```

This is stronger than a workflow walkthrough. A workflow says what happened in
order. An Intervention Map shows what behavior changed.

## Row shape

Use this table shape by default:

```markdown
| AI default instinct | Skill intervention | Evidence | Downstream effect |
| --- | --- | --- | --- |
| Directly summarize `SKILL.md` | Build a package map before interpreting behavior | source + trace | Reader sees runtime behavior, not just file headings |
```

For complex cases, use the expanded shape:

```markdown
### I3. Examples are not the rule source

**AI default instinct:** Copy structure from the nearest polished example.

**Skill intervention:** Treat examples as optional calibration and use
references as the rule source.

**Evidence:** source (`SKILL.md` says references define rules), trace (agent
loaded `references/handbook-spec.md` before inspecting examples).

**Downstream effect:** The output follows the current schema instead of
reproducing stale sample artifacts.

**Confidence:** high
```

## Evidence field

Use the same evidence tags as `references/xray-flow.md`:

- `source`: stated in skill files;
- `trace`: observed during the recommended path;
- `diff`: observed in without-skill vs with-skill comparison;
- `inference`: reasoned but not observed.

Prefer rows with source or trace evidence. Inference-only rows are allowed, but
they must be labeled as weaker.

## What counts as an intervention

An intervention must change an AI action. Good rows usually involve verbs:

- read before writing;
- choose recommended and log it;
- build a package map;
- run a script instead of rewriting code;
- verify a real asset exists;
- preserve one running example;
- separate source claims from inferred claims;
- stop treating examples as specification.

Bad rows are vague traits:

- improves quality;
- makes the output better;
- adds rigor;
- uses a better structure;
- helps the reader understand.

If the right side does not name a concrete action, rewrite it.

## Recommended size

For a normal Skill X-Ray, include 5-9 rows. Fewer than 5 usually means the
analysis is still too shallow. More than 9 usually means the map is turning into
a workflow table.

Group rows when needed:

- **Intake interventions** — what the skill makes the AI read or decide first.
- **Execution interventions** — how the skill changes the work path.
- **Validation interventions** — how the skill prevents false completion.
- **Output interventions** — how the skill changes the final artifact.

## Example rows

```markdown
| AI default instinct | Skill intervention | Evidence | Downstream effect |
| --- | --- | --- | --- |
| Directly summarize `SKILL.md` | Build a package map first | source | The analysis includes scripts, references, assets, and tests |
| Treat examples as templates | Use references as the rule source | source | Stale examples cannot silently define the output |
| Start a full handbook immediately | Produce a Skill X-Ray first | source | The user sees behavior change before committing to a large artifact |
| Stop at every exposed choice | Choose recommended/default and log it | source + inference | The run stays fast without hiding automatic decisions |
| Treat required confirmation as just another option | Split auto choices from hard checkpoints | source + trace | The X-Ray shows where the skill can continue alone and where human judgment is required |
| Claim a full run when only source analysis happened | Label trace type before behavior claims | trace | The reader can distinguish live execution from source-grounded, delegated, or simulated analysis |
| Consider `diagrams[]` metadata enough | Verify real SVG files exist | source | Visual output does not silently omit diagrams |
```

## Use in the X-Ray

The X-Ray should surface the Intervention Map directly, not bury it in prose.
Use it to drive:

- `What changed`;
- `Baseline diff`;
- `Friction score`;
- upgrade recommendations.

If a claim cannot connect to a row, either add a row with evidence or remove the
claim.

## Use in full handbook mode

When upgrading to a full handbook:

- Overview uses the strongest 3-5 rows as before/after cards.
- Walkthrough shows when each intervention appears in the trace.
- Design choices explain why the intervention exists and what bad output it
  prevents.
- Pattern cards extract only interventions that transfer to other skills.

The full handbook expands the Intervention Map. It should not replace it with a
generic stage list.

## Self-check

- Does each row show a changed AI action?
- Is the left side a plausible default AI shortcut?
- Is the right side a concrete skill-imposed action?
- Does the evidence field distinguish source, trace, diff, and inference?
- Are inference-only rows marked weaker?
- Can the reader understand the skill's value by reading only this map?
