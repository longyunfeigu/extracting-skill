# patterns.packet

**Page job:** 把女娲的设计动作抽成 7 张能搬到其他 skill 的 pattern card。

**Reader state:** 想偷招，不一定想照搬整个女娲。

**Voice:** 紧凑、可复用、有成本。problem 和 solution 之间要有 Therefore 视觉断点。

**Inputs:** brief 的 patterns 表、`references/cards-patterns.md`、design choices 的对应位置。

**Must include:** 7 张 card（P1 先分流再执行 / P2 自包含证据库 / P3 多维证据并行收集 / P4 便宜返工点停一下 / P5 三道筛选再命名 / P6 从心智模型推研究流程 / P7 检查必须接修复）。每张：prevents / therefore / useWhen / howToReuse / antiExample / cost / seenIn / relatedPatterns。

**Must avoid:** 把源 skill 的章节标题改名成 pattern；所有 pattern 都说"适用于复杂任务"。

**Packet output:** `handbook.patterns` 和 pattern-network diagram 元数据。

**Self-check:** 每个 pattern 至少连 1 个其它 pattern，relation 说清关系类型（前置 / 后置 / 互补 / 对照）。

**Voice gate:** 扫每张卡的 prevents、therefore、antiExample。
