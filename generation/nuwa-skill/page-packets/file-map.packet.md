# file-map.packet

**Page job:** 让读者看清女娲文件的分工：哪些是入口、哪些是规范、哪些是模板、哪些脚本替 AI 做脆弱工作、哪些是 example 校准用。

**Reader state:** 知道有 `SKILL.md`，但不清楚 references / scripts / examples 在运行时各管什么。

**Voice:** 职责地图。每张卡回答"谁生成、谁读取、管什么、不管什么、写错会怎样"。

**Inputs:** brief 的 package map、`SKILL.md`、`references/extraction-framework.md`、`references/skill-template.md`、4 个 scripts、`examples/*-perspective/`。

**Must include:** package-map diagram + 8 个文件卡：SKILL.md / references/extraction-framework.md / references/skill-template.md / scripts/download_subtitles.sh / scripts/srt_to_transcript.py / scripts/merge_research.py / scripts/quality_check.py / examples/*-perspective/。

**Must avoid:** 单纯目录列表；把所有文件写成"辅助材料"。

**Packet output:** `handbook.fileMap` 和 package-map diagram 元数据。

**Self-check:** 每个 file card 的 failureIfWrong 都是具体后果，例如"调研文件存到 `07-调研与分析/` 等外部目录后，复制 skill 出去就坏"。

**Voice gate:** 扫每个 file 的 role 和 failureIfWrong。
