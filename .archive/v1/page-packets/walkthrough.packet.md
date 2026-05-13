# walkthrough.packet

**Page job:** 用“蒸馏塔勒布”跑完整流程，展示我被女娲怎样一步步拦住默认捷径。

**Reader state:** 已知道女娲不是角色扮演 prompt 生成器，但还没看到具体阶段。

**Voice:** 第一人称 AI 工作路径。每个 stage 先让读者猜，再展示我实际怎么走。

**Inputs:** stages from `handbook-brief.md`, `SKILL.md`, `references/extraction-framework.md`, `references/skill-template.md`, scripts.

**Must include:** 9 个 stage；每个 stage 有 preTest、narrativeBody、quickref 字段、reusableMove、challenges。

**Must avoid:** 只列阶段表；把 7 字段速查当正文；把 subagent 并行写成当前运行环境真的启动了。

**Packet output:** `handbook.walkthrough` and `main-flow` diagram.

**Self-check:** 每个 stage 都有一个真实材料片段：prompt、目录树、agent 分工、筛选表、模板片段或命令。

**Voice gate:** 扫每个 stage 的 `hookOpen`、`reusableMove`、`narrativeBody` 第一段。
