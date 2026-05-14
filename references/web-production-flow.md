# Web production flow

Use this reference only when the requested output is a multi-page web handbook
or documentation app. It exists to prevent one bad result: writing a long
`handbook.md` and then slicing it into pages that all sound the same.

## Core rule

For web mode, `handbook.md` is an export. The source is:

```text
generation/<skill-slug>/
  handbook-brief.md
  page-packets/
  index.html
  pages/
  assets/
    data.js
    site.js
    styles.css
    diagrams/
```

`<skill-slug>` is derived from the source skill's `name:` field. Use ASCII
letters, digits, and hyphens only.

## 1. Scaffold first

Run the scaffold before writing full page prose:

```bash
bash scripts/scaffold-web-app.sh generation/<skill-slug> \
  --title="<Skill Name> 解剖手册" \
  --skill-name="<Skill Name>" \
  --source-path="<source skill path>"
```

The scaffold owns the stable HTML shells, renderer, CSS, starter `data.js`, and
empty `assets/diagrams/` directory. For normal runs, fill `assets/data.js` and
add SVGs. Edit `site.js`, page shells, or CSS only when the schema, page list, or
visual system actually changes.

## 2. Write `handbook-brief.md`

Create a compact source plan before any long prose. Include:

- source path and package map;
- ordinary-view pain scan from `references/handbook-spec.md`;
- one running example;
- total task in one sentence;
- stage IDs and one-line summaries;
- cross-stage mechanism threads;
- term IDs and short explanations;
- design choice IDs and bad scenarios;
- pattern IDs and related links;
- required diagrams and where each appears;
- page list and each page's job;
- risks, missing evidence, and assumptions.

Keep this factual. It is source material, not final page copy.

## 3. Write one anchor slice

Before producing every page, write a small anchor slice:

- overview opening;
- one walkthrough stage;
- one pattern card;
- one file-role card;
- one rendered page shell.

Use it to set voice, density, field names, and visual expectations. If the
anchor exposes problems in the brief, fix the brief before continuing.

After the anchor slice, decide whether to continue serially or split page work.
Choose serial work when the brief or voice is still moving. Choose parallel page
work only when each page can update a disjoint key in `assets/data.js` without
creating merge files.

## 4. Produce page packets

Each page packet is a self-contained handoff. Do not clone the same packet seven
times with different titles.

```markdown
# <page>.packet

**Page job:** <what this page helps the reader do>
**Reader state:** <what the reader already knows or may not know>
**Voice:** <how this page should sound>
**Page-specific standard:** <concrete checks for this page>
**Evidence shape:** <examples, tables, snippets, traces, cards, diagrams>
**Failure mode:** <most likely bad version of this page>
**Pain scan rows used:** <which rows from the brief this page consumes>
**Inputs:** <brief fields, source files, stage IDs, pattern IDs>
**Must include:** <orientation, diagrams, cards, tables, real material>
**Must avoid:** <page-specific bad output>
**Packet output:** <structured data or prose blocks rendered by the web app>
**Self-check:** <page-specific checks>
```

Page jobs:

| Page | Must do | Common failure |
| --- | --- | --- |
| Overview | show the ordinary failure first, then explain the skill's map | table of contents or abstract praise |
| Walkthrough | show what I receive, do, produce, constrain, and hand off at each stage | checklist with no scene or evidence |
| Glossary | explain design-heavy terms through concrete values and links back to stages | isolated dictionary |
| File map | show who writes, reads, owns, and can break each important file | directory listing |
| Design choices | name the bad output, rule, solved problem, and counter-case | generic best practices |
| Patterns | turn source moves into reusable cards with cost and counter-case | renamed section headings |
| Apply it | turn the handbook into small skill-authoring moves | motivational advice |

For `walkthrough.packet`, add a short **Mechanism threads** block. Each relevant
stage should say which thread it touches.

## 5. Page voice gate

After each page is drafted, run the voice gate before marking it done.

- Use `references/voice-gate-examples.md` to scan high-exposure fields.
- Use `references/voice-style-gate.md` for anti-jargon, teaching voice, and
  read-aloud checks.
- Fix blocking issues. Do not report them as unresolved work unless the user
  explicitly asked for a review only.

If an independent reviewer is available and appropriate, use it for high-
exposure fields only. Otherwise run the same checklist yourself.

## 6. Editor pass

Before delivery, verify:

- one running example stays consistent;
- stage, term, design-choice, and pattern IDs match the brief;
- each detail page has orientation before detailed cards;
- every diagram named in `data.js` points to a real SVG;
- every page has a distinct job and voice;
- no page depends on another page to define its first important term;
- cross-links point to existing pages or anchors;
- repeated paragraphs are removed;
- no extra JS data files remain under `generation/<skill-slug>/`.

## 7. Build and verify

Serve the generated directory locally. Check page load, then check diagram
assets directly:

```bash
python3 -m http.server --directory generation/<skill-slug> 8000
```

For each `image: "assets/diagrams/<name>.svg"` in `data.js`, verify HTTP 200 and
non-zero bytes. Page 200 is not enough; missing diagrams can fail silently.

Only after the web app is coherent, generate `handbook.md` as a linear export if
the user wants one. Do not use that export as the next run's source.
