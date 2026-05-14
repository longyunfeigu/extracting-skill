# walkthrough.packet

**Page job:** 用"蒸馏塔勒布"跑完 12 个 stage，展示我作为 AI 被女娲一步步拦住默认捷径。

**Reader state:** 已知道女娲不是 role-play prompt 生成器，但还没看见具体阶段是什么样的。

**Voice:** 第一人称 AI 工作路径。每个 stage 先让读者猜（preTest），再展示我实际怎么走。

**Inputs:** brief 的 stage 表、`SKILL.md` 各 Phase、`references/extraction-framework.md` 三重验证、`references/skill-template.md` 模板字段、4 个 scripts。

**Must include:** 12 个 stage（route-input / clarify-direct / diagnose-fuzzy / create-package / collect-evidence / review-research / synthesize-models / confirm-synthesis / build-skill / validate-output / refine-output / update-existing）。每个 stage 有 preTest、narrativeBody（≥ 1 个真实材料片段：prompt 截段 / 目录树 / agent 任务表 / 筛选过程 / 模板片段 / 命令）、reusableMove、quickRef 七字段、challenges。

**Must avoid:** 只列阶段名；把七字段速查当正文；把并行 6 agent 写成当前主线程真的同时跑了 6 个进程。

**Packet output:** `handbook.walkthrough` + `handbook.diagrams` 的 main-flow 元数据。

**Self-check:** 每个 stage 至少一个真实材料片段，不是抽象描述。

**Voice gate:** 扫每个 stage 的 hookOpen、reusableMove、narrativeBody 第一段。
