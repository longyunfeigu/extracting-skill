# file-map.packet

**Page job:** Show which file owns which decision and what breaks when it drifts.

**Reader state:** The reader may have a directory tree but not responsibility boundaries.

**Voice:** Operational. "This file owns X, not Y."

**Evidence shape:** Package diagram plus file role cards.

**Failure mode:** Plain directory listing.

**Pain scan rows used:** Saved research files, examples copied without reasons, scripts handling fragile steps.

**Inputs:** Source package file list, scripts, references.

**Must include:** `SKILL.md`, extraction framework, template, scripts, research files, examples.

**Must avoid:** Treating generated examples as specification.

**Packet output:** `handbook.fileMap[]` and `package-map.svg`.

**Self-check:** Each card says who writes, who reads, owns, does not own, and failure consequence.
