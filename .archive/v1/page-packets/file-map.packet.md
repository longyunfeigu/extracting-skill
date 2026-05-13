# file-map.packet

**Page job:** 让读者看见女娲的文件如何分工，尤其是哪些文件是证据、哪些文件是模板、哪些脚本替 AI 做脆弱工作。

**Reader state:** 读者知道有 `SKILL.md`，但不知道 references/scripts/examples 在运行里各管什么。

**Voice:** 职责地图。每张卡都回答“谁生成、谁读取、管什么、不管什么、写错会怎样”。

**Inputs:** package map, `SKILL.md`, `references/*`, `scripts/*`, examples.

**Must include:** package-map diagram and 8 file cards.

**Must avoid:** 单纯目录列表；把所有文件写成“辅助材料”。

**Packet output:** `handbook.fileMap` and `package-map` diagram.

**Self-check:** 每个 file card 的 `failureIfWrong` 都必须是具体后果。

**Voice gate:** 扫每个 file 的 `role` 和 `failureIfWrong`。
