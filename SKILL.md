---
name: extracting-skill-patterns
description: Use when studying or reverse-engineering an AI skill package (SKILL.md, Claude/Codex skills, prompt workflows, agent playbooks) and the user wants a multi-page web handbook, 解剖手册, manual, or documentation app explaining how the skill changes an AI's behavior.
---

# Extracting Skill Patterns

## Purpose

Turn a skill package into a multi-page handbook that explains how the skill
changes an AI's behavior. The handbook is written from the perspective of the
AI using the skill, not from the perspective of a maintainer describing files.

The default output is a web documentation app. A linear `handbook.md` can be
generated afterwards as an export, but it is not the source of truth for web
mode.

## Start Here

1. Read `references/handbook-spec.md` first. It is the core contract and routes
   to the smaller references.
2. If producing a web app, read `references/web-production-flow.md` before
   writing page prose.
3. Load only the reference needed for the current section. Do not read every
   reference or copy from existing examples by default.

## Workflow

### 1. Map the source package

Treat the input as a single `SKILL.md`, a skill directory, or a folder of
skills. Build a package map before interpreting the skill:

- find every `SKILL.md`;
- note `references/`, `scripts/`, `assets/`, `examples/`, `tests/`, and metadata
  files;
- read the entry `SKILL.md` first;
- read referenced files only when they explain the skill's design;
- inspect scripts to see which fragile jobs they take away from the agent.

For a batch, analyze representative skills first, then scan the rest for
repeated structures.

### 2. Read like a skill designer

Answer these questions in plain language:

- What bad AI output does this skill prevent?
- What does it force the AI to do before answering?
- What shortcuts does it block?
- How does the workflow run from user request to final output?
- Where does it put knowledge, examples, scripts, assets, and validation?
- Which terms would a smart reader still not understand?
- Which design moves can be reused in another skill?
- Which moves are actually platform gaps, not reusable skill patterns?

Preserve three layers in the handbook:

1. how the skill runs: phases, gates, loops, handoffs;
2. how it is packaged: entry file, references, scripts, assets, tests, outputs;
3. what design moves it contains: reusable patterns and their costs.

### 3. Pick one running example

Choose one small representative request before writing pages. Reuse it through
the entire handbook with real material: prompt excerpts, intermediate text,
commands, file snippets, or generated artifacts.

Do not switch examples midstream. If the first example cannot carry an
important stage, pick a better example before writing long prose.

### 4. Create the web source plan

Every run writes its artifacts into a per-skill directory under `generation/`:

```text
generation/
└─ <skill-slug>/        # kebab-case slug of the source skill
   ├─ handbook-brief.md
   ├─ page-packets/
   ├─ index.html
   ├─ pages/
   └─ assets/
```

`<skill-slug>` is a kebab-case identifier derived from the source skill's
`name:` field (e.g. `nuwa-skill`, `web-video-presentation`). Use ASCII letters,
digits, and hyphens only — no spaces, no CJK characters in the path.

For web mode, scaffold the fixed web shell before writing full pages:

```bash
bash scripts/scaffold-web-app.sh generation/<skill-slug> \
  --title="<Skill Name> 解剖手册" \
  --skill-name="<Skill Name>" \
  --source-path="<source skill path>"
```

Then create, all under `generation/<skill-slug>/`:

- `handbook-brief.md`: package map, one running example, page map, shared IDs,
  terms, stages, design choices, patterns, diagrams, assumptions;
- `page-packets/`: one packet per page with page job, reader state, inputs,
  required material, voice, page-specific standard, evidence shape, failure
  mode, and self-check;
- one anchor slice: overview opening, one walkthrough stage, one pattern card,
  one file-role card, and one rendered page shell.

Use the anchor slice to stabilize voice and density before producing the rest of
the pages.

### 5. Produce pages

Write pages from `handbook-brief.md` and page packets, not from a finished
Markdown report. For the standard web app, update
`generation/<skill-slug>/assets/data.js` and add SVG files under
`generation/<skill-slug>/assets/diagrams/`. Leave the scaffolded HTML,
renderer, and CSS alone unless the schema or page list actually changes.
Do not treat page packets as a uniform form with different titles: each packet
must state what counts as evidence for that page and what bad page shape it is
blocking.

If the runtime supports safe parallel page work, pause after the anchor slice
and ask the user whether to continue serially or fan out page work. If parallel
work is not available or the user declines, continue serially.

### 6. Add real diagrams

Every detail page that relies on relationships needs a top-level SVG diagram.
`diagrams[]` metadata is not enough. Each diagram entry in `data.js` must point
to a real file:

```js
image: "assets/diagrams/<name>.svg"
```

Before delivery:

- list `generation/<skill-slug>/assets/diagrams/`;
- verify every referenced SVG exists;
- serve the web app locally and `curl` each SVG path for HTTP 200 and non-zero
  bytes;
- open the pages or otherwise verify that diagrams render, not only that pages
  return 200.

### 7. Run gates before delivery

Each page must pass its local voice gate before the final editor pass. Use
`references/voice-style-gate.md` for the full checks and
`references/voice-gate-examples.md` for reviewer examples.

After page gates, run the editor pass from `references/web-production-flow.md`:

- one running example stays consistent;
- stage, term, design-choice, and pattern IDs match the brief;
- detail pages have orientation blocks;
- diagrams are real assets, not placeholders;
- pages have distinct jobs and voices;
- repeated paragraphs are removed;
- cross-links point to existing pages or anchors.

## Non-Negotiables

- Write in first person as the AI using the skill: "我拿到..." rather than
  "该 skill 会...".
- Explain each important concept before using the source skill's name for it.
- Move from user intent to AI task, then stages, artifacts, files, and rules.
- Every design choice must name the bad output it prevents.
- Keep one concrete example across the whole handbook.
- Use code-native diagrams for exact relationships. Use generated images only
  for mood or conceptual reinforcement.
- Do not rely on examples as specification. References define the rules; samples
  are only optional calibration material.
- Avoid academic name-dropping, decorative metaphors, fake jargon, and
  English-Chinese mashups unless quoting source file names or source terms.

## Resources

- `references/handbook-spec.md` — required first read; core handbook contract,
  page structure, and routing to detail references.
- `references/web-production-flow.md` — web source plan, fixed scaffold, page
  packets, page gates, editor pass, and Markdown export rules.
- `references/web-app-structure.md` — multi-page web app structure and
  page-level orientation requirements.
- `references/web-app-visuals.md` — visual rules for the rendered app:
  typography, layout, component shapes, and CSS constraints.
- `references/stage-writing.md` — walkthrough writing rules: local term
  explanations, pre-test hooks, real material, narrative handoffs, story voice,
  and AI freedom.
- `references/cards-patterns.md` — design-choice and pattern-card rules: bad
  scenarios, counter scenarios, problem-to-solution breaks, and related links.
- `references/visuals-and-quality.md` — diagram/image rules and final quality
  checks.
- `references/voice-style-gate.md` — complete style gate: anti-jargon,
  anti-AI-voice, teaching voice, and read-aloud checks.
- `references/voice-gate-examples.md` — concrete reviewer examples for the most
  common voice-gate failures.
- `scripts/scaffold-web-app.sh` — creates a static handbook skeleton at any
  target directory (use `generation/<skill-slug>/`) from
  `assets/web-app-template/`.
- `assets/web-app-template/` — fixed page shells, renderer, CSS, starter
  `data.js`, and empty `assets/diagrams/` directory.
