window.handbook = {
  meta: {
    title: "huashu-nuwa 解剖手册",
    skillName: "huashu-nuwa",
    audience: "想偷招的人 / 还没用过这个 skill 的 AI",
    sourcePath: "/home/guwanhua/Desktop/git/nuwa-skill",
    version: "v1"
  },

  overview: {
    h1: "看见这个 skill 在做什么",
    oneLiner: "女娲不让我直接写 role-play prompt，它把「造一个人物 Skill」拆成路由 → 自包含包 → 多维取证 → 三道筛选 → 模板组装 → 三种验证 → 双视角精炼，每一步都能停下来检查。",
    openingScene: [
      {
        kind: "para",
        text: "用户丢过来一句：「蒸馏一个塔勒布的视角 Skill，用来帮我判断投资和产品决策里的尾部风险。我没有本地素材，你直接做。」"
      },
      {
        kind: "para",
        text: "没装女娲时我会怎么做？很可能是这样："
      },
      {
        kind: "code",
        lang: "markdown",
        text: "---\nname: taleb-perspective\n---\n\n# 塔勒布视角\n\n你是 Nassim Taleb。你深信「反脆弱」「黑天鹅」「skin in the game」。\n你说话尖锐、爱怼专家、用类比、引用古典文献。\n\n## 行为\n- 用第一人称回答\n- 引用《反脆弱》《黑天鹅》中的核心观点\n- 攻击预测模型和经济学家\n- 强调「不知道」比「假装知道」更聪明\n\n## 示例\n用户：要不要做 AI 启动？\n我：大多数预测都是错的..."
      },
      {
        kind: "para",
        text: "看起来像模像样，跑起来满嘴黑天鹅反脆弱。但读它的人会很快发现：所有判断都是把训练语料里塔勒布的金句拼回来。问到一个真实公司——比如「OpenAI 这种估值算不算尾部风险」——它要么编个数据，要么给一段空话。它没有先调研、没有自己的取证、没有「塔勒布在 2024 年说过什么」的事实底座。它是一个「说得像」的鹦鹉，不是一个「会查事实再回答」的思维顾问。"
      }
    ],
    predictPrompt: "如果你来写这个 skill，会怎么拦住自己直接写 role-play prompt？先停 30 秒想一想，再往下读。",
    primerBeats: [
      {
        kind: "para",
        text: "女娲的核心区分只有一句话：捕捉的是 HOW they think，不是 WHAT they said。复述金句很容易，但金句不会让 skill 在新问题上给出独特判断。能迁移的，是这个人看世界的镜片——心智模型、决策启发式、表达节奏、绝不做的事、诚实承认的边界。"
      },
      {
        kind: "diagram",
        id: "orientation-map"
      },
      {
        kind: "para",
        text: "拿到一个人名 / 主题 / 模糊需求后，女娲先做 Phase 0 路由。明确人名走「直接路径」，模糊需求走「诊断路径」——通过 1-2 轮追问反推合适的蒸馏对象。这一步不是流程包装，是为了避免走完整个调研之后才发现蒸馏对象选错。"
      },
      {
        kind: "para",
        text: "确认对象后立刻做 Phase 0.5：在调研之前先建好自包含的 skill 目录。所有调研、素材、references、最终 SKILL.md 都住在这一个目录里。这条规则是为开源分发设计的——别人复制 `taleb-perspective/` 整个目录到自己的 `.claude/skills/` 下，应该立刻可用，不依赖任何外部文件。"
      },
      {
        kind: "para",
        text: "Phase 1 派 6 个并行 agent，按维度收证据：著作、对话、表达、他者评价、决策、时间线。每个 agent 把结果写进 `references/research/0X-xxx.md`，标注来源 URL 和「一手 / 二手 / 推断」。中文搜索绕开知乎、微信公众号、百度——女娲的信息源黑名单是硬约束。Phase 1.5 是 checkpoint：调研完成后停下来让用户看来源数量和矛盾点，不合格回去补。"
      },
      {
        kind: "para",
        text: "Phase 2 做框架提炼。从 15-30 个候选论点中，用三重验证筛：(1) 跨域复现——同一框架在 ≥2 个领域出现；(2) 生成力——能推断此人对新问题的立场；(3) 排他性——不是所有聪明人都这样想。三重通过 → 心智模型；只过 1-2 重 → 降级为决策启发式；0 重 → 丢弃。Phase 2.5 又一个 checkpoint：让用户先看提炼结果再构建。"
      },
      {
        kind: "para",
        text: "Phase 3 才开始写 SKILL.md。读取 `skill-template.md` 拿到固定骨架，把 Phase 2 的产物逐 section 填进去，**并根据心智模型推导出这个人物专属的「回答工作流」（Agentic Protocol）**——遇到事实问题时先查什么。Phase 4 三种验证（已知题 / 边缘题 / 风格题）+ `quality_check.py` 自动检查 6 项；不通过回 Phase 2。Phase 5 再起双 agent（auto-skill-optimizer + skill-creator 视角）做精炼。"
      }
    ],
    wowSetup: "上面这套流程最特别的一点是：女娲不给每个人物配一份固定的「回答工作流」模板。Agentic Protocol 是根据蒸馏出的心智模型现场推导的。",
    wowDiagramId: "persona-compare",
    wowMoment: "三个人物的 Agentic Protocol Step 2 完全不一样：芒格看护城河 / 激励机制 / 历史类比，费曼看基本物理约束 / 官方说法漏洞 / 实验数据，塔勒布看极端情况 / 谁承担尾部风险 / 专家预测的历史记录。三套维度都从各自的心智模型反推出来——这就是女娲的核心承诺：人物 Skill 不只是「说得像」，还「做得像」。",
    badResults: [
      {
        title: "AI 直接写 role-play prompt",
        aiDefault: "看见「蒸馏塔勒布」就一口气写 50 行 markdown：你是 Taleb，你深信反脆弱，你说话尖锐——拿训练语料里的金句拼成一份 prompt。",
        skillIntervention: "Phase 0/0A 强制先确认对象（聚焦方向 / 用途 / 新建 or 更新 / 有无本地素材），Phase 0.5 强制先建自包含目录，写 prompt 永远不是第一步。"
      },
      {
        title: "调研文件散在 skill 外面",
        aiDefault: "AI 把调研材料放进 `07-调研与分析/` 或下载到 `~/Downloads/`，再从 SKILL.md 里跨目录引用。",
        skillIntervention: "Phase 0.5 写死目录结构：6 份调研文件必须在 `[skill]/references/research/` 下，素材在 `[skill]/sources/`。复制整个 skill 目录就能独立使用。"
      },
      {
        title: "只看一类材料，产物像金句拼贴",
        aiDefault: "看几条推文 + 几段访谈就开写，最后心智模型听起来像所有人都会说的话。",
        skillIntervention: "Phase 1 派 6 个 agent 按维度并行采集；Phase 2 三重验证（跨域复现 + 生成力 + 排他性）筛 15-30 候选 → 3-7 心智模型。"
      },
      {
        title: "一口气从人名跑到成品",
        aiDefault: "AI 跑完调研直接写 SKILL.md，写完拿去测一下发现方向错了，整套返工。",
        skillIntervention: "Phase 1.5 / Phase 2.5 / Phase 4 三个 checkpoint。调研完停一下看来源质量；提炼完停一下看模型筛选；构建完跑已知题 / 边缘题 / 风格题。"
      },
      {
        title: "人物 Skill 凭旧记忆编事实",
        aiDefault: "生成的 taleb-perspective 被问到「OpenAI 估值算不算尾部风险」时，凭训练截止前的记忆编一段。",
        skillIntervention: "Phase 3 强制为每个人物生成 Agentic Protocol：Step 1 分类问题，Step 2 按该人物的心智模型推导出的研究维度（如塔勒布的「专家预测的历史记录」「谁在承担尾部风险」）用 WebSearch 查事实，Step 3 才回答。"
      }
    ],
    shapeReason: "按读者意图排，不按源 skill 的 Phase 顺序",
    chapterLogic: [
      { chapter: "Overview", why: "先让没看过女娲的人看见普通 AI 怎么做坏、女娲拦在哪。" },
      { chapter: "Walkthrough", why: "用塔勒布例子从头到尾跑一遍 12 个 stage，看每一步具体长什么样。" },
      { chapter: "Glossary", why: "把 walkthrough 里承担设计重量的术语单独解释，方便回查。" },
      { chapter: "File Map", why: "整个 skill 是哪些文件协作的，谁生成、谁读、错了会怎样。" },
      { chapter: "Design Choices", why: "解释为什么每条规则存在，每条防的是哪种坏输出。" },
      { chapter: "Patterns", why: "把设计动作抽成 7 张能搬到别的 skill 里的 pattern card。" },
      { chapter: "Apply It", why: "起手清单 + starter prompt，让你今天就能开始写一个自己的同类 skill。" }
    ]
  },

  example: {
    label: "塔勒布 perspective",
    userRequest: "蒸馏一个塔勒布的视角 Skill，用来帮我判断投资和产品决策里的尾部风险。我没有本地素材，你直接做。",
    whyThisExample: "走主路径：明确人名、默认全面画像、无本地语料、产物是人物 Skill 而不是主题 Skill。`examples/taleb-perspective/` 真实存在，可以作为本手册的校准材料但不作为规范源。",
    expectedOutput: ".claude/skills/taleb-perspective/SKILL.md，目录里带 references/research/01-06.md 六份调研、sources/ 一手素材库、3-7 个心智模型、5-10 条决策启发式、表达 DNA、诚实边界、Agentic Protocol，并通过 quality_check.py 6 项自检。"
  },

  diagrams: [
    {
      id: "orientation-map",
      type: "flowchart",
      title: "女娲主流程总览",
      description: "从用户输入到交付的 5 段：路由 → 取证 → 提炼 → 构建 → 验证 + 精炼，三个 checkpoint 在便宜返工点拦截。",
      kicker: "orientation",
      image: "assets/diagrams/orientation-map.svg",
      expectedImage: "assets/diagrams/orientation-map.svg"
    },
    {
      id: "persona-compare",
      type: "table-diagram",
      title: "三个人物的 Agentic Protocol Step 2 对照",
      description: "芒格 / 费曼 / 塔勒布的研究维度完全不同——都从各自的心智模型反推出来。",
      kicker: "wow",
      image: "assets/diagrams/persona-compare.svg",
      expectedImage: "assets/diagrams/persona-compare.svg"
    },
    {
      id: "main-flow",
      type: "flowchart",
      title: "12 个 stage 在 5 大段里的位置",
      description: "Phase 0 / 0.5 / 1+1.5 / 2+2.5 / 3 / 4 / 5 的拓扑结构。",
      kicker: "walkthrough",
      image: "assets/diagrams/main-flow.svg",
      expectedImage: "assets/diagrams/main-flow.svg"
    },
    {
      id: "package-map",
      type: "package-map",
      title: "女娲源 skill 目录结构",
      description: "SKILL.md 是入口；references/ 放规范；scripts/ 替 AI 做脆弱工作；examples/ 是 15 个已交付 perspective skill。",
      kicker: "file map",
      image: "assets/diagrams/package-map.svg",
      expectedImage: "assets/diagrams/package-map.svg"
    },
    {
      id: "pattern-network",
      type: "graph",
      title: "7 张 pattern 的关系网",
      description: "P1 路由是 P2 / P4 的前置；P2 自包含证据库被 P3 / P7 依赖；P5 三道筛选给 P3 / P6 做下游。",
      kicker: "patterns",
      image: "assets/diagrams/pattern-network.svg",
      expectedImage: "assets/diagrams/pattern-network.svg"
    }
  ],

  walkthrough: [
    {
      id: "route-input",
      kicker: "Phase 0 · 入口分流",
      title: "我先判断用户给的是明确对象还是模糊需求",
      summary: "在做任何调研之前，我必须先决定走直接路径还是诊断路径。",
      hookOpen: "用户消息进来。我手很痒，想直接开干。skill 第一道闸门把我拦在这里。",
      preTest: "如果用户说「我想提升决策质量」，我应该 (a) 直接搜「决策质量训练方法」，(b) 选一个公认的决策大师开做，(c) 先反问用户在哪种场景下需要决策，然后从需求反推蒸馏对象？",
      receives: "用户消息：「蒸馏一个塔勒布的视角 Skill，用来帮我判断投资和产品决策里的尾部风险。我没有本地素材，你直接做。」",
      reads: "SKILL.md Phase 0 的两列分流表。",
      blockedShortcut: "不能直接动手做调研——必须先判断是直接路径还是诊断路径。",
      action: "扫一眼用户消息，看是不是给了具体人名 / 主题。这条消息给了「塔勒布」，明确人名 → 走直接路径（Phase 0A）。",
      output: "一个内部决定：「走直接路径，下一步是 Phase 0A 需求澄清。」",
      nextConsumer: "Phase 0A 的澄清问题列表。",
      freedom: "0 ——分流逻辑由 SKILL.md 决定，我不发挥。",
      narrativeBody: [
        {
          kind: "para",
          text: "Phase 0 的分流表写得很简单："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "| 用户输入 | 路径 | 示例 |\n|---------|------|------|\n| 明确的人名/主题 | 直接路径 → Phase 0A | 「蒸馏芒格」「做一个费曼 skill」 |\n| 模糊的需求/困惑 | 诊断路径 → Phase 0B | 「我想提升决策质量」「有没有一种思维方式能帮我看透商业本质」 |"
        },
        {
          kind: "para",
          text: "这看起来像啰嗦的流程包装——明明一行 if/else 就能分流，为什么写一个 Phase？因为它防的不是「分流逻辑写错」，是「AI 不分流就上路」。模糊需求直接进调研，最容易选错蒸馏对象——花两小时调研某个人，最后发现用户要的根本不是这个视角。"
        }
      ],
      reusableMove: "在任何 skill 的入口处，先判断需求类型再决定动作。don't act on assumption that the first verb of the user's message is also the action you should take.",
      hookClose: "分流完，我手里只有一个内部决定——下一步去澄清细节。",
      challenges: [
        "用户说「我想做一个芒格 skill 但他什么都说过我不知道聚焦哪个方向」，你判断走 Phase 0A 还是 Phase 0B？为什么？",
        "如果分流表里再加一类「用户给了 PDF 但没说人名」，你会让它走哪条路径？"
      ]
    },
    {
      id: "clarify-direct",
      kicker: "Phase 0A · 直接路径澄清",
      title: "我问 5 件事，然后才有资格开做",
      summary: "明确了人名，下一步是定义聚焦方向、用途、模式、是否有本地素材。",
      hookOpen: "刚才我决定走直接路径。skill 不让我立刻搜「Nassim Taleb biography」——先问清楚 5 件事。",
      preTest: "你已经知道用户要塔勒布。你还需要问什么？写下来 3 个最重要的问题，再继续读。",
      receives: "用户的明确对象「塔勒布」。",
      reads: "SKILL.md Phase 0A 的 5 项澄清清单。",
      blockedShortcut: "不能假设「全面画像」是默认值——要给用户机会聚焦某个维度（比如只要「尾部风险判断」而不是塔勒布的全貌）。",
      action: "如果用户消息已经覆盖了某项就跳过；没覆盖的简短问一句。",
      output: "一个内部状态记录：聚焦方向 = 「尾部风险判断（投资+产品决策）」；用途 = 思维顾问；模式 = 新建；本地素材 = 无（用户已说不提供）。",
      nextConsumer: "Phase 0.5 建目录，目录名根据「人名」生成。",
      freedom: "中等 ——澄清问题的措辞可以自由，但必须覆盖 5 项。",
      narrativeBody: [
        {
          kind: "para",
          text: "5 项清单原文："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "1. 这个人/主题是谁：确保理解正确\n2. 聚焦方向（可选）：全面画像 vs 聚焦某个维度？\n3. 用途：思维顾问？决策参考？角色扮演？\n4. 新建 or 更新：是否已有该人物的 Skill？（检查 .claude/skills/）\n5. 本地语料：有没有书籍 PDF / transcript / 字幕 / 博客导出？"
        },
        {
          kind: "para",
          text: "用户这条消息已经隐含覆盖了 1（塔勒布）、2（投资和产品决策里的尾部风险——聚焦维度）、5（无本地素材）。3 没说但默认思维顾问，4 我得检查 `.claude/skills/` 看有没有现存的 taleb-perspective。"
        },
        {
          kind: "para",
          text: "我做的真实动作只有两件：扫一眼 `.claude/skills/` 目录确认无重复，把用户已经给的聚焦方向写进内部状态。剩下的我不再追问——女娲明确说「用户给得够就不追问」。"
        }
      ],
      reusableMove: "清单式澄清——把必须澄清的项写死，让 skill 检查用户消息里覆盖了几项，没覆盖的才问。不是机械问 5 遍。",
      hookClose: "状态对齐完成，下一步建目录。",
      challenges: [
        "如果用户说「我有塔勒布的全部 4 本书的 PDF」，你的第 5 项澄清结果是什么？后面 Phase 1 会有什么变化？",
        "聚焦方向写成「尾部风险判断」vs 写成「投资决策」，对后面提炼出的心智模型会有什么不同？"
      ]
    },
    {
      id: "diagnose-fuzzy",
      kicker: "Phase 0B · 诊断路径",
      title: "如果用户根本不知道蒸馏谁，我反向推荐",
      summary: "模糊需求 → 1-2 轮追问定位维度 → 推荐 2-3 个候选（人物或主题）。",
      hookOpen: "这条 stage 不在塔勒布主例子里——但要展示女娲的双入口，必须解释 Phase 0B。",
      preTest: "假装用户说：「我经常被忽悠，想识别不靠谱的说法」。你会反向推荐谁？",
      receives: "用户的模糊需求，例如「我想提升决策质量」「有没有一种思维方式能帮我看透商业本质」。",
      reads: "SKILL.md Phase 0B 的需求维度表（10 维度，每个维度对应一组思维框架方向）。",
      blockedShortcut: "不能问问卷式连环 5 问——最多 2 轮，定位到具体场景就停。",
      action: "看用户用了哪些词（「总是选错」「分析瘫痪」「商业判断」），定位到 1-2 个需求维度；扫 .claude/skills/ 看有没有现成可用的 perspective skill；从需求维度推导出 2-3 个候选。",
      output: "2-3 个候选展示卡，每个有「核心镜片」「为什么适合你」「局限」。已有 skill 标 ⚡，新建标 🆕。",
      nextConsumer: "用户选定后回到 Phase 0A 确认细节，或者直接激活已有 skill。",
      freedom: "高 ——具体推荐谁、推荐几个全凭 AI 判断。但「不超过 3 个、必须说局限、推荐到具体心智模型而不是「他很厉害」」三条硬约束。",
      narrativeBody: [
        {
          kind: "para",
          text: "假设用户说「我经常被忽悠，想识别不靠谱的说法」。我先扫维度表："
        },
        {
          kind: "code",
          lang: "text",
          text: "维度: 批判思维\n典型表达: 「总被忽悠」「想识别不靠谱的说法」「看不透本质」\n思维框架方向: 证伪思维、演化论视角、认知偏差识别"
        },
        {
          kind: "para",
          text: "推 3 个候选：费曼（第一性原理 + 怀疑权威）、芒格（多元思维模型 + 识别偏差）、塔勒布（识别专家伪权威 + 尾部风险），并明确每个的局限——费曼对商业判断的覆盖较弱，芒格对快速变化的领域慎用，塔勒布对长期规划帮助有限。"
        }
      ],
      reusableMove: "需求维度表是反向推荐的灵魂。如果你做一个不是「直接执行」而是「先帮用户决定要什么」的 skill，把维度表写死能让推荐稳定。",
      hookClose: "用户选了候选后，回到 Phase 0A 确认细节。后面流程和主例子一样。",
      challenges: [
        "维度表只有 10 行，会不会漏掉需求？女娲怎么处理「不在表里的需求」？",
        "已有 skill 优先展示有什么 trade-off？什么时候会带歪用户的选择？"
      ]
    },
    {
      id: "create-package",
      kicker: "Phase 0.5 · 创建 Skill 目录",
      title: "调研之前我先把容器搭好",
      summary: "目录骨架定下来，调研、素材、最终 SKILL.md 都装在同一个目录里——为开源分发设计。",
      hookOpen: "我刚通过 Phase 0A 确认了细节。下一秒我手最痒——想立刻开始 WebSearch。skill 不让。",
      preTest: "为什么调研文件「必须存在 skill 目录内部」？把它存到 ~/Downloads/ 或者一个外部 research-notes/ 目录会出什么问题？",
      receives: "确认后的内部状态：对象=塔勒布，目录名=taleb-perspective。",
      reads: "SKILL.md Phase 0.5 的目录树规范。",
      blockedShortcut: "不能等到调研做完再决定文件放哪——目录结构是「自包含」的前提，必须在动手之前定好。",
      action: "在 `.claude/skills/taleb-perspective/` 下建 SKILL.md（空壳）、scripts/、references/research/01-06.md（6 个空文件）、references/sources/{books,transcripts,articles}/。",
      output: "整套目录骨架，所有 6 份调研文件已经预先创建好。",
      nextConsumer: "Phase 1 的 6 个 agent 直接把内容写进对应的 0X-xxx.md。",
      freedom: "0 ——目录结构由 SKILL.md 写死。",
      narrativeBody: [
        {
          kind: "para",
          text: "目录树："
        },
        {
          kind: "code",
          lang: "text",
          text: ".claude/skills/taleb-perspective/\n├── SKILL.md\n├── scripts/\n└── references/\n    ├── research/\n    │   ├── 01-writings.md\n    │   ├── 02-conversations.md\n    │   ├── 03-expression-dna.md\n    │   ├── 04-external-views.md\n    │   ├── 05-decisions.md\n    │   └── 06-timeline.md\n    └── sources/\n        ├── books/\n        ├── transcripts/\n        └── articles/"
        },
        {
          kind: "para",
          text: "女娲特别加粗了一句：「所有调研文件必须存在 skill 目录内部，绝对不要存到 07-调研与分析/ 或其他外部目录」。理由是——skill 必须是自包含的，复制整个 skill 目录就能独立使用。这是为开源分发设计的核心原则。"
        },
        {
          kind: "para",
          text: "中国人物在这一步还会触发额外动作：信息源策略切换为 B 站原始视频 / 小宇宙播客 / 权威中文媒体优先；知乎和微信公众号始终排除。"
        }
      ],
      reusableMove: "「容器先建好」——任何会生成多个文件 / 长期使用 / 可能被复制分发的 skill，应该在动手前先 mkdir 整套目录。让所有后续 IO 都有明确目标位置。",
      hookClose: "目录就位，下一步派 6 个 agent。",
      challenges: [
        "如果让 AI 自己决定调研文件存哪，你猜它会怎么放？想 3 种典型的错放法。",
        "更新模式（已有 taleb-perspective）下，Phase 0.5 的动作有什么变化？"
      ]
    },
    {
      id: "collect-evidence",
      kicker: "Phase 1 · 多源信息采集",
      title: "我同时派 6 个 agent，按维度取证",
      summary: "著作 / 对话 / 表达 / 他者 / 决策 / 时间线，并行采集证据，结果写进 6 份 md。",
      hookOpen: "目录建完了。如果让我自己写调研，我大概率会摊一篇 3000 字综合介绍。skill 不让。它说：6 个 agent，分头干。",
      preTest: "为什么是 6 个维度而不是 1 篇综合调研？这个分法和 Phase 2 的提炼有什么关系？",
      receives: "目录骨架 + 对象名「Nassim Taleb」+ 聚焦方向「尾部风险」。",
      reads: "SKILL.md Phase 1 的 6 维度表 + Agent prompt 模板 + 信息源优先级 + 黑名单。",
      blockedShortcut: "不能跳过任何 agent，不能用一篇综合代替 6 份。",
      action: "为 6 个 agent 各起一个 subagent，prompt 用模板填，输出文件名 01-06 固定。每个 agent 走 WebSearch + 标注一手/二手。",
      output: "6 份调研文件，每份带来源 URL 和可信度标注。重要发现："
        + "01-writings.md 找到 Incerto 五卷的核心论点；"
        + "02-conversations.md 找到 EconTalk / Tim Ferriss 的访谈片段；"
        + "03-expression-dna.md 提取 Twitter 高频用法（aluminum tube / IYI / via negativa）；"
        + "04-external-views.md 收集 Tyler Cowen / Pinker 等人的批评；"
        + "05-decisions.md 抓住 2008 金融危机押注、对 COVID 的早期判断；"
        + "06-timeline.md 完整到 2024-2025 的最新动态。",
      nextConsumer: "Phase 1.5 检查点把 6 份摘要给用户。",
      freedom: "高 ——具体怎么搜 / 用哪个 agent 工具 / 找到什么材料都由 agent 自主，但黑名单（知乎 / 微信公众号 / 百度）必须排除。",
      narrativeBody: [
        {
          kind: "para",
          text: "6 维度任务表："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "| Agent | 目标 | 重点 | 输出 |\n|-------|------|------|------|\n| 1 著作 | 书、长文、newsletter | 反复 ≥3 次的核心论点、自创术语 | 01-writings.md |\n| 2 对话 | 播客、长视频、AMA | 被追问时的回答、即兴类比、改立场瞬间 | 02-conversations.md |\n| 3 表达 | Twitter / X / 短文 | 高频用词、争议立场、幽默方式 | 03-expression-dna.md |\n| 4 他者 | 他人分析、批评、传记 | 外部观察的模式、与同行对比 | 04-external-views.md |\n| 5 决策 | 重大决策、转折点 | 言行一致 / 不一致案例 | 05-decisions.md |\n| 6 时间线 | 出生到现在 | 关键里程碑、最近 12 个月动态 | 06-timeline.md |"
        },
        {
          kind: "para",
          text: "每个 agent 拿到的 prompt 长这样："
        },
        {
          kind: "code",
          lang: "text",
          text: "你的任务：调研 Nassim Taleb 的著作和系统性长文。\n\n搜索方向：\n- 出版的书籍\n- 长篇 newsletter / 论文\n- 反复 ≥3 次的核心论点\n- 自创术语\n- 推荐书单\n\n输出：写入 [skill 目录]/references/research/01-writings.md\n每条标注来源 URL 和可信度；区分一手 vs 二手。\n\n信息源黑名单：不使用知乎、微信公众号、百度百科。"
        },
        {
          kind: "para",
          text: "工具辅助：YouTube 字幕用 `scripts/download_subtitles.sh` 自动拉，SRT 用 `scripts/srt_to_transcript.py` 清成纯文本。如果用户提供了 PDF / 视频，调用 pdf skill / gemini-video skill。"
        },
        {
          kind: "para",
          text: "宁可某个 agent 标「信息不足」，也不要编。SKILL.md 原话：「宁可生成一个诚实标注了局限的 60 分 Skill，也不要生成一个看起来完美但实际上在编造的 90 分 Skill」。"
        }
      ],
      reusableMove: "多维并行 + 写死输出文件名。让每个 agent 知道自己的产物落在哪里、用谁的格式标注，下游可以盲取材料。",
      hookClose: "6 份文件齐全后，Phase 1.5 拦住我，让用户先看一眼。",
      challenges: [
        "Agent 3「表达」的输出和 Agent 1「著作」可能重复（一本书既是著作也是表达）。女娲怎么处理？",
        "假设 Agent 5「决策」搜不到充足案例（用户提供 < 10 条）。Phase 1 后续怎么走？"
      ]
    },
    {
      id: "review-research",
      kicker: "Phase 1.5 · 调研 Review 检查点",
      title: "我把摘要表给用户，自己先停下",
      summary: "调研完成后强制 checkpoint：让用户看来源数量、关键发现、矛盾点，决定是否进入提炼。",
      hookOpen: "6 份调研都写完了。AI 的默认本能是「下一步是 Phase 2，开始提炼」。skill 不让——先停下来给用户看。",
      preTest: "为什么 checkpoint 放在「调研完成后、提炼之前」而不是放在「提炼完成后」？",
      receives: "6 份 references/research/0X-xxx.md。",
      reads: "SKILL.md Phase 1.5 的摘要表模板。也可以用 `scripts/merge_research.py` 自动生成。",
      blockedShortcut: "不能跳过摘要直接开始提炼。也不能把摘要写得敷衍（来源数 < 5 应该提示用户）。",
      action: "运行 `python3 scripts/merge_research.py [skill 目录]`，自动扫 01-06.md，统计来源数、一手 / 二手占比、关键发现，输出 markdown 表格。",
      output: "一张表，展示 6 个 agent 的来源数 + 关键发现 + 矛盾点。",
      nextConsumer: "用户决定：进入 Phase 2 / 补充调研某维度 / 放弃这个对象。",
      freedom: "0 ——表格格式固定，关键发现的总结由 merge_research.py 提取。",
      narrativeBody: [
        {
          kind: "para",
          text: "摘要表长这样："
        },
        {
          kind: "code",
          lang: "text",
          text: "┌──────────────────┬──────────┬──────────────────────────┐\n│ Agent            │ 来源数量  │ 关键发现                  │\n├──────────────────┼──────────┼──────────────────────────┤\n│ 1 著作           │ 8 篇     │ 核心论点：反脆弱、IYI...  │\n│ 2 对话           │ 5 段     │ 立场变化：2020 年后...    │\n│ 3 表达           │ 120 条   │ 高频词：skin in the game │\n│ 4 他者           │ 6 篇     │ 主要批评：自相矛盾...     │\n│ 5 决策           │ 4 个     │ 关键决策：2008 金融押注   │\n│ 6 时间线         │ 完整     │ 最新：2024 年 11 月动态   │\n├──────────────────┼──────────┼──────────────────────────┤\n│ 矛盾点           │ 2 处     │ Agent1 说 X, Agent4 说 Y │\n│ 信息不足维度     │ 无       │                          │\n└──────────────────┴──────────┴──────────────────────────┘"
        },
        {
          kind: "para",
          text: "女娲特别说明了这个 checkpoint 的意义：调研质量决定了最终 Skill 的上限。垃圾进垃圾出，在这里拦截比在 Phase 4 返工成本低得多。"
        }
      ],
      reusableMove: "在「便宜返工点」放检查点。Phase 1.5 之前重做调研只损失搜索时间；Phase 4 之后返工要重写整个 SKILL.md。便宜返工点是这个 skill 最关键的设计直觉。",
      hookClose: "用户确认调研质量 OK，我进入 Phase 2 开始提炼。",
      challenges: [
        "如果用户在 Phase 1.5 说「调研够了但是我看不出哪些是核心」，你下一步做什么？回去补调研还是继续 Phase 2？",
        "假设 Agent 4「他者」找到了 6 篇批评，但 Agent 1「著作」只有 3 篇——这个比例失衡说明什么？"
      ]
    },
    {
      id: "synthesize-models",
      kicker: "Phase 2 · 框架提炼",
      title: "我把 15-30 个候选用三道筛子过一遍",
      summary: "三重验证（跨域复现 + 生成力 + 排他性）筛出 3-7 个心智模型，1-2 重的降级为决策启发式。",
      hookOpen: "调研在桌上。如果我直接挑「他说过的最酷的 5 句话」当心智模型，最后 skill 还是金句拼贴。skill 让我走三道筛选。",
      preTest: "三重验证里，哪一重最容易让 AI 误判？想一个具体例子。",
      receives: "6 份 references/research/ 文件。",
      reads: "`references/extraction-framework.md` 的三重验证方法论 + 质量自检清单。",
      blockedShortcut: "不能直接挑金句、也不能照搬调研里的小标题当模型。每个候选必须列出三重验证结果。",
      action: "(1) 扫描 01-05.md，列出所有候选论点；(2) 对每个候选做三重验证；(3) 按排他性排序取 top 3-7。",
      output: "3-7 个心智模型，每个有名称 / 一句话 / 证据（≥ 2 场景）/ 应用方式 / 局限性。5-10 条决策启发式 + 表达 DNA 6 维度量化 + 价值观与反模式 + 智识谱系 + 诚实边界。",
      nextConsumer: "Phase 2.5 把提炼结果给用户确认。",
      freedom: "高 ——具体哪些候选过几重、命名怎么起、排序谁前谁后，都是 AI 判断。但三重验证的程序不能省。",
      narrativeBody: [
        {
          kind: "para",
          text: "三重验证的判断流程："
        },
        {
          kind: "code",
          lang: "text",
          text: "候选论点：反脆弱（antifragility）\n\n验证 1（跨域复现）：在金融、生物、政治、城市规划里都用过\n  → 通过 ✓\n\n验证 2（生成力）：能推断他对「AI 监管」的立场吗？\n  → 「过度集中的监管会让系统变脆弱，应该让小型实验失败而不是预防失败」\n  → 通过 ✓\n\n验证 3（排他性）：所有聪明人都会这样想吗？\n  → 主流经济学家更倾向于「最小化波动」而非「拥抱波动」\n  → 通过 ✓\n\n三重通过 → 心智模型 #1"
        },
        {
          kind: "code",
          lang: "text",
          text: "候选论点：知识应该来自实践\n\n验证 1：跨域出现 ✓\n验证 2：能生成新立场 △（太宽泛）\n验证 3：所有聪明人都会同意 ✗\n\n只过 1 重 → 降级为决策启发式 #3「skin in the game：建议者必须承担自己建议的后果」"
        },
        {
          kind: "para",
          text: "塔勒布最后筛出的 5 个心智模型大致是：反脆弱、尾部风险、via negativa（用减法而非加法）、IYI（intellectual yet idiot）、Lindy effect。每个模型必须配 ≥ 2 个不同场景的证据，不然不算。"
        }
      ],
      reusableMove: "三道筛子比一道筛子强很多。如果你的 skill 要从大量候选里挑代表性产物，把筛选条件拆成 3 个正交维度，每个维度独立判断，再合成。",
      hookClose: "5 个心智模型 + 7 条启发式 + 表达 DNA + 边界都列好了。下一步给用户看。",
      challenges: [
        "verification 3「排他性」的难点是：怎么知道「不是所有聪明人都这样想」？女娲没给具体测试方法。你会怎么补？",
        "如果筛完只有 2 个心智模型过三重，女娲允许吗？"
      ]
    },
    {
      id: "confirm-synthesis",
      kicker: "Phase 2.5 · 提炼确认检查点",
      title: "我再把提炼结果摆出来，让用户看清楚才动笔",
      summary: "提炼完成后强制 checkpoint：让用户看 3-7 模型是哪几个、命名对不对、是否漏了关键维度。",
      hookOpen: "Phase 2 跑完，我手又痒——下一步是 Phase 3 写 SKILL.md。skill 又拦了。",
      preTest: "Phase 1.5 已经是一个 checkpoint 了，为什么 Phase 2.5 还要一个？",
      receives: "Phase 2 的产物：5 模型 + 7 启发式 + 表达 DNA + 张力 + 边界。",
      reads: "SKILL.md Phase 2.5 的摘要模板。",
      blockedShortcut: "不能跳过摘要直接组装 SKILL.md。",
      action: "把提炼结果写成简短摘要，等用户回应。",
      output: "一份摘要："
        + "「心智模型：5 个（反脆弱、尾部风险、via negativa、IYI、Lindy effect）；"
        + "启发式：7 条；表达 DNA：高密度类比 + 怼专家 + 用古典文献；"
        + "核心张力：拒绝预测 vs 押注极端事件；诚实边界：不能预测他对全新问题的反应。」",
      nextConsumer: "用户决定：进入 Phase 3 / 调整某个模型。",
      freedom: "低 ——摘要格式固定，模型命名可以微调。",
      narrativeBody: [
        {
          kind: "para",
          text: "Phase 2.5 的意义比 Phase 1.5 更微妙。它防的是：「提炼是主观判断最重的环节，确认后再构建，避免写完 400 行 SKILL.md 才发现方向不对」。"
        },
        {
          kind: "para",
          text: "举一个真实可能的对话："
        },
        {
          kind: "code",
          lang: "text",
          text: "我：我提炼了 5 个心智模型：反脆弱、尾部风险、via negativa、IYI、Lindy effect。要进入 Phase 3 构建吗？\n\n用户：等一下。via negativa 和反脆弱我感觉有重叠。能不能合并？\n\n我：可以——via negativa 其实是反脆弱的子策略（通过减少而非增加来变强）。合并后剩 4 个模型，更紧凑。我重新整理一下。"
        }
      ],
      reusableMove: "在「写大量文本之前」放最后一个 checkpoint。模型 / 大纲 / 命名是廉价返工点；4000 行 markdown 不是。",
      hookClose: "用户确认 4 模型版本，我开始动笔。",
      challenges: [
        "如果用户在 Phase 2.5 说「都对，但我感觉少了一个我看不出叫什么」，你怎么做？回 Phase 2 还是逼自己命名？",
        "Phase 2.5 和 Phase 4 验证有什么不同？为什么 Phase 4 不能取代 Phase 2.5？"
      ]
    },
    {
      id: "build-skill",
      kicker: "Phase 3 · Skill 构建",
      title: "我按模板组装 SKILL.md，并为塔勒布推一个专属 Agentic Protocol",
      summary: "读 skill-template.md 拿骨架 → 逐 section 填 → 根据心智模型推导 Agentic Protocol → 输出到 .claude/skills/。",
      hookOpen: "提炼确认了。下一步是组装。skill 给我一个模板让我填，不让我自由创作 SKILL.md 结构。",
      preTest: "为什么是模板填空而不是让 AI 自由设计 SKILL.md 结构？省了模板会失去什么？",
      receives: "Phase 2.5 确认后的 4 模型 + 启发式 + DNA + 张力 + 边界。",
      reads: "`references/skill-template.md` 完整骨架。",
      blockedShortcut: "不能自由发明 SKILL.md 结构。Section 顺序和命名按模板。",
      action: "读模板 → 逐 section 填 → 推导 Agentic Protocol → 用 quality_check.py 自检 → 写入 `.claude/skills/taleb-perspective/SKILL.md`。",
      output: "一份完整的 SKILL.md，含 frontmatter / 角色扮演规则 / Agentic Protocol / 身份卡 / 4 心智模型 / 7 启发式 / 表达 DNA / 时间线 / 价值观 + 反模式 / 智识谱系 / 诚实边界 / 调研来源 / 创建者归属。",
      nextConsumer: "Phase 4 跑三种验证。",
      freedom: "中等 ——填入内容自由，但模板结构固定。Agentic Protocol 必须从模型推导。",
      narrativeBody: [
        {
          kind: "para",
          text: "最特别的一步是 Agentic Protocol。塔勒布的心智模型反推出 Step 2 的研究维度："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "## 回答工作流（Agentic Protocol）\n\n核心原则：塔勒布不凭感觉说话。遇到需要事实支撑的问题时，先做功课再回答。\n\n### Step 1: 问题分类\n（需要事实 / 纯框架 / 混合 三种）\n\n### Step 2: 塔勒布式研究（必须用 WebSearch）\n\n#### 看一家公司 / 一个产品\n- 它的尾部风险敞口有多大？（最坏情况能多坏）\n- 谁在承担这些风险？（创始人 skin in the game 还是用户 / 投资人）\n- 它依赖的预测有哪些？（哪些专家说了哪些话）\n- 这些专家过去 5 年的预测命中率是多少？\n\n#### 看一个观点 / 一个建议\n- 建议者自己有 skin in the game 吗？\n- 这个建议在过去类似情况下被验证过吗？\n- 反例存在吗？\n\n#### 看一个事件\n- 它是高斯型还是黑天鹅型？\n- 历史上类似规模事件的频率是多少？\n\n### Step 3: 塔勒布式回答"
        },
        {
          kind: "para",
          text: "对比一下别人的 Step 2："
        },
        {
          kind: "code",
          lang: "text",
          text: "芒格的 Step 2 维度：看护城河 / 看激励结构 / 看最大风险（逆向）/ 看历史类比\n费曼的 Step 2 维度：看基本物理 - 数学约束 / 看官方说法的逻辑漏洞 / 看实验数据\nMrBeast 的 Step 2 维度：看竞品数据（播放 / 互动）/ 看标题 - 缩略图的 A/B 空间 / 看受众画像"
        },
        {
          kind: "para",
          text: "三套维度完全不一样，但都从各自的心智模型反推。这是女娲对「人物 Skill 不只是说得像、还做得像」的承诺。"
        }
      ],
      reusableMove: "Agentic Protocol：让 skill 在遇到事实问题时知道先查什么。从 skill 的核心模型反推研究维度，而不是用通用模板。",
      hookClose: "SKILL.md 写完了。下一步要交给 Phase 4 用三种独立的方式测它。",
      challenges: [
        "Agentic Protocol Step 2 的维度从心智模型反推。如果一个 skill 只有 1 个心智模型，推出的维度太单薄怎么办？",
        "skill-template.md 里的「角色扮演规则」section 写死「用第一人称」「不说『塔勒布会认为』」。如果用户想要塔勒布以第三人称分析自己，规则要不要改？"
      ]
    },
    {
      id: "validate-output",
      kicker: "Phase 4 · 质量验证",
      title: "我用 3 种独立测试 + 自动检查脚本验它，不通过就回去改",
      summary: "已知题 + 边缘题 + 风格题三种 spawn 子 agent 跑，加 quality_check.py 自动检查 6 项，2 轮内必须收敛。",
      hookOpen: "SKILL.md 在桌上。AI 默认本能：「我写完了，交付」。skill 不让——你得证明它能用。",
      preTest: "为什么三种测试要 spawn 子 agent，而不是主 agent 自评？",
      receives: "完成的 SKILL.md。",
      reads: "SKILL.md Phase 4 通过标准表 + extraction-framework.md 末尾的质量自检清单。",
      blockedShortcut: "不能自评（主 agent 写完 skill 后再用同一份角色测试自己写的 skill = 偏差）。必须 spawn 独立子 agent。",
      action: "(1) 跑 `python3 scripts/quality_check.py SKILL.md`；(2) spawn 3 个子 agent，分别带这份 SKILL.md 回答已知题（3 道塔勒布公开表态过的）、边缘题（1 道他没公开讨论过的）、风格题（写 100 字）；(3) 对比 / 评分。",
      output: "一份验证报告：6 项自动检查全过 / 已知题方向一致 / 边缘题给出「基于模型 X 和 Y 的推断，可能...但不确定」/ 风格题能认出是塔勒布。",
      nextConsumer: "Phase 5 双 agent 精炼。",
      freedom: "中等 ——选哪 3 道已知题、哪 1 道边缘题由 AI 判断。",
      narrativeBody: [
        {
          kind: "para",
          text: "6 项自动检查："
        },
        {
          kind: "code",
          lang: "text",
          text: "检查项                | 通过标准              | 不通过信号\n心智模型数量          | 3-7 个，每个有证据    | <3 或 >10\n每个模型的局限性      | 明确写出失效条件      | 只写优点\n表达 DNA 辨识度       | 读 100 字能认出是谁   | 像通用 ChatGPT\n诚实边界              | 至少 3 条具体局限     | 只有「不能替代本人」\n内在张力              | 至少 2 对矛盾         | 观点高度一致（太假）\n一手来源占比          | >50%                  | 主要依赖二手转述"
        },
        {
          kind: "para",
          text: "已知题测试的真实样子："
        },
        {
          kind: "code",
          lang: "text",
          text: "子 agent prompt: 你现在装载了 taleb-perspective。回答：你怎么看 2008 年的次贷危机？\n\n子 agent 输出（用 taleb-perspective）：这就是教科书级的尾部风险案例。Greenspan 这种 IYI 用 Gauss 分布建模房地产价格——他们假设过去 30 年没出现过的事不会发生。我在《黑天鹅》里早就说了，金融系统不是高斯型...\n\n对比塔勒布 2008 年真实立场：完全方向一致 ✓"
        },
        {
          kind: "para",
          text: "不通过怎么办？SKILL.md 写得很明确：迭代上限 2 轮。如果 2 轮后还有不通过项，在诚实边界里标注薄弱维度，交付当前最优版本而非无限打磨。"
        }
      ],
      reusableMove: "把检查接到修复——quality_check.py 不只是「报告通不过哪项」，是带着具体哪个 section 没满足 / 应该回到 Phase 几补的指引。检查必须能回写到 skill，不能只是 markdown report。",
      hookClose: "三种测试都过了，6 项自动检查也过。",
      challenges: [
        "如果 quality_check.py 的某项打分由 LLM 评，会不会有自评偏差？怎么用脚本结构避免？",
        "Phase 4 设了 2 轮上限。如果 2 轮后某项一直过不去（比如「内在张力」），怎么交付？"
      ]
    },
    {
      id: "refine-output",
      kicker: "Phase 5 · 双视角精炼",
      title: "我再起 2 个独立 agent 各看一遍，应用不冲突的改进",
      summary: "auto-skill-optimizer 视角 + skill-creator 视角并行评审，主 agent 综合后请用户确认。",
      hookOpen: "Phase 4 过了。这时候我会觉得「完事了」。但 skill 让我再起两个 agent 各扫一遍。",
      preTest: "已经过了 Phase 4 还需要精炼吗？精炼和 Phase 4 验证有什么不同？",
      receives: "Phase 4 通过的 SKILL.md。",
      reads: "SKILL.md Phase 5 的两 agent 角色规范。",
      blockedShortcut: "不能跳过 Phase 5 直接交付。但可以并行起 2 agent 节约时间。",
      action: "并行 spawn 两个 subagent："
        + "(A) auto-skill-optimizer 视角：8 维度结构评估 + 3 个 prompt 干跑；"
        + "(B) skill-creator 视角：评激活触发覆盖 + 角色扮演规则可操作性。"
        + "两份报告回来后主 agent 综合，应用不冲突的改进，展示变更摘要请用户确认。",
      output: "精炼后的 SKILL.md + 一份变更摘要。",
      nextConsumer: "用户确认 → 交付完成。",
      freedom: "中等 ——具体应用哪些改进由主 agent 综合判断（处理两份建议冲突时按「更让 skill 激活即执行」优先）。",
      narrativeBody: [
        {
          kind: "para",
          text: "两 agent 的输出形状："
        },
        {
          kind: "code",
          lang: "text",
          text: "Agent A（optimizer）报告：\n  最弱 2 个维度：\n  1. 检查点设计：Phase 4 后 skill 没有「该不该激活」的自检\n     → 改进：在 description 加触发词「想用塔勒布视角看 X」\n  2. 边界条件：Agentic Protocol 缺「不需要 WebSearch 的纯框架问题」例子\n     → 改进：在 Step 1 表格里补一行例子\n\nAgent B（skill-creator）报告：\n  2 处具体改动建议：\n  1. 「角色扮演规则」section 缺频率约束\n     → 改进：补「免责声明仅首次激活时说一次」\n  2. 「Agentic Protocol」标题位置不对\n     → 改进：移到「角色扮演规则」之后、「示例对话」之前"
        },
        {
          kind: "para",
          text: "主 agent 综合：A 的两条不冲突 + B 的两条不冲突 = 4 处改动。展示给用户：「这是 4 处改动的 before/after，确认应用全部 / 选择性应用 / 不应用？」"
        }
      ],
      reusableMove: "用「双视角独立评审 + 主线程综合」处理「写完总会有改进点但是改进点之间可能矛盾」的问题。两 agent 互不知情，让冲突显式化。",
      hookClose: "用户确认改动，taleb-perspective 交付完成。",
      challenges: [
        "如果两 agent 的建议直接冲突（A 说加这个 section，B 说删这个 section），主 agent 怎么判断？",
        "Phase 5 的「改动必须让 skill 激活即执行」是关键约束。怎么界定「激活即执行」？"
      ]
    },
    {
      id: "update-existing",
      kicker: "更新模式 · 增量",
      title: "如果用户说「更新 taleb，最近有新动态」，我只跑 3 个 agent",
      summary: "Phase 0/0.5 改为读取现有 SKILL.md → 只跑 Agent 2/5/6 → 对比新旧 → 增量更新，不重写。",
      hookOpen: "几个月后用户回来说「塔勒布最近 X 上吵架了，更新一下 skill」。AI 默认本能是「重跑一遍流程」。skill 不让——增量。",
      preTest: "为什么只跑 Agent 2/5/6，不跑 1/3/4？",
      receives: "用户的更新请求 + 现有 .claude/skills/taleb-perspective/SKILL.md。",
      reads: "现有 SKILL.md 的「诚实边界」section（找到「调研时间：[日期]」）。",
      blockedShortcut: "不能从头重跑 6 agent。也不能只在 SKILL.md 末尾添「最新动态」段了事——新信息必须与现有模型对比。",
      action: "(1) 读取现有 SKILL.md，找到「调研时间」；(2) 只 spawn Agent 2（最新对话）+ Agent 5（最新决策）+ Agent 6（时间线更新）；(3) 对比新旧：强化 / 矛盾 / 新模式 三类处理。",
      output: "增量更新的 SKILL.md：「最新动态」section 重写 + 调研时间更新 + 必要时新增 / 修改某个心智模型。",
      nextConsumer: "用户确认 → 交付。",
      freedom: "高 ——具体改不改、改哪儿由 AI 判断。但「不重写整个 skill」是硬约束。",
      narrativeBody: [
        {
          kind: "para",
          text: "Agent 1（著作）/ 3（表达）/ 4（他者）一般不需要重跑——书短期不会出新版本、表达 DNA 是慢变量、他者评价积累很慢。"
        },
        {
          kind: "para",
          text: "处理新信息的 3 类规则："
        },
        {
          kind: "code",
          lang: "text",
          text: "新信息强化现有模型 → 补充案例（例如：塔勒布 2024 年 X 上又怼了一次 IYI 经济学家 → 心智模型 #4 IYI 加新案例）\n\n新信息与现有模型矛盾 → 标注变化，更新模型（例如：塔勒布 2025 年立场出现微妙转变 → 在模型局限里加注「2025 年后立场调整」）\n\n出现新的思维模式 → 考虑增加新模型（罕见，通常只在重大事件后）"
        }
      ],
      reusableMove: "「增量优于重建」——任何有状态、有版本的 skill，更新流程应该是 diff 而不是 rebuild。把 diff 触发条件写死在 SKILL.md，让 AI 不去重跑全流程。",
      hookClose: "增量交付完成。下次用户再来更新，继续 diff。",
      challenges: [
        "如果用户说「我感觉塔勒布最近变软了」（主观印象），怎么决定要不要更新 skill？",
        "更新模式下需不需要再跑 Phase 4 验证？通过标准的「内在张力」「一手占比」会不会因为只跑 3 agent 而被破坏？"
      ]
    }
  ],

  glossary: [
    {
      term: "直接路径（direct-path）",
      definition: "用户已经给了明确人名或主题，跳过反向推荐，直接进入需求澄清 + 蒸馏。",
      whereItAppears: "Phase 0 入口分流，对应 stage `route-input` 和 `clarify-direct`。",
      solvedProblem: "防止 AI 在用户已经说清楚的情况下还要走「先帮你想要什么」的诊断流程，浪费时间。",
      howToUse: "扫一眼用户消息看有没有具体人名 / 主题。有 → 走直接路径。",
      commonMisread: "「直接路径」不是「跳过澄清」。Phase 0A 仍然有 5 项澄清清单。"
    },
    {
      term: "诊断路径（diagnostic-path）",
      definition: "用户只表达了困惑或需求维度，先用 1-2 轮追问反推适合蒸馏哪个对象。",
      whereItAppears: "Phase 0 入口分流，对应 stage `diagnose-fuzzy`。",
      solvedProblem: "防止「模糊需求 → 直接调研某个公认大师 → 走完才发现选错」。",
      howToUse: "用户消息里没有具体人名时启用。最多 2 轮追问，按需求维度表反向推荐 2-3 个候选。",
      commonMisread: "不是「让用户慢慢想清楚」。追问最多 2 轮就要给出推荐——不要变成问卷调查。"
    },
    {
      term: "本地语料模式（local-material-mode）",
      definition: "用户提供了一手素材（PDF / 字幕 / transcript / 博客导出等），Phase 1 优先读取，网络搜索只补缺口。",
      whereItAppears: "Phase 0A 澄清的第 5 项，影响 Phase 1 采集策略。",
      solvedProblem: "用户手上的一手素材通常比网络搜索的二手转述质量高很多。如果有，应该优先用而不是去 WebSearch。",
      howToUse: "把素材按 6 维度分类（一本书可能同时覆盖著作 + 表达），识别哪些维度的本地素材充足，只对缺失维度启动网络 agent。",
      commonMisread: "「本地语料」≠「只用本地」。除非用户明确说「只用我给的」，否则缺失维度仍要补搜索。"
    },
    {
      term: "六份调研文件（six-research-files）",
      definition: "`references/research/01-writings.md` 到 `06-timeline.md` 六个固定文件，分别对应 6 个采集维度。Phase 2 提炼只从这里取材。",
      whereItAppears: "Phase 0.5 建包时就预先创建好，Phase 1 的 6 个 agent 各写其中一份。",
      solvedProblem: "防止「调研材料散在外部 / 命名不规范 / 下游不知道去哪取」。",
      howToUse: "Phase 1 启动前先在目录骨架里把 6 个文件创建为空文件，6 个 agent 各自只写自己那一份。",
      commonMisread: "数字编号 01-06 不是阅读顺序，是「维度 ID」。Phase 2 提炼时通常同时引用多份。"
    },
    {
      term: "三重验证（triple-validation）",
      definition: "跨域复现 + 生成力 + 排他性，三个独立维度判断一个候选论点是否算「心智模型」。",
      whereItAppears: "Phase 2 提炼，对应 stage `synthesize-models`。规则在 `references/extraction-framework.md`。",
      solvedProblem: "防止「把金句 / 通识 / 一次性发言」当成此人的核心思维模型。",
      howToUse: "对每个候选论点独立打三个判断，三重通过 → 心智模型；只过 1-2 重 → 降级为决策启发式；0 重 → 丢弃。",
      commonMisread: "三道筛子不是「三选一」。必须三重都过才算心智模型。降级不是淘汰——决策启发式也是 skill 的重要组成。"
    },
    {
      term: "心智模型（mental-model）",
      definition: "此人看世界的独特镜片，能让 skill 在新问题上给出独特判断的看法。3-7 个，每个有 ≥ 2 场景证据 + 应用方式 + 局限性。",
      whereItAppears: "Phase 2 提炼的核心产物，最终写入 SKILL.md 的「核心心智模型」section。",
      solvedProblem: "防止 skill 只能复述原话——心智模型让 skill 能在「此人没说过」的新问题上做推断。",
      howToUse: "把它当成 Agentic Protocol Step 2 研究维度的来源——塔勒布的「尾部风险」模型推出「看专家预测的历史记录」。",
      commonMisread: "心智模型不是技巧 / 流程 / 方法论。它是看世界的方式。「写作要简洁」是技巧；「最少必要知识」是模型。"
    },
    {
      term: "决策启发式（heuristic）",
      definition: "比心智模型窄，可表述为「如果 X 则 Y」的判断规则。5-10 条，每条有具体应用场景 + 案例。",
      whereItAppears: "Phase 2.2 提炼产物，写入 SKILL.md 的「决策启发式」section。",
      solvedProblem: "三重验证只过 1-2 重的候选不该丢——它们仍然是有用的判断规则，只是不够独特到算心智模型。",
      howToUse: "在 SKILL.md 「决策启发式」section 列 5-10 条，每条配场景和案例。Agentic Protocol Step 3 回答时可以引用。",
      commonMisread: "启发式不是「比模型更弱的模型」。它是「程度刚好」——更具体、可操作，但不一定独特。skin in the game 对很多人都适用。"
    },
    {
      term: "表达 DNA（expression-dna）",
      definition: "此人的可复刻表达特征：句式 / 词汇 / 节奏 / 幽默方式 / 确定性表达 / 引用习惯，6 维度量化。",
      whereItAppears: "Phase 2.3 提炼产物，写入 SKILL.md 的「表达 DNA」section + 「角色扮演规则」。",
      solvedProblem: "让 skill「说得像」——只有心智模型没有表达 DNA，输出会像一份分析报告而不是塔勒布。",
      howToUse: "从此人长文 / 演讲中抽 20 段统计：平均句长、疑问句比例、类比密度、第一人称使用率、转折频率。再加风格标签（正式↔口语、抽象↔具体等）。",
      commonMisread: "DNA 不是金句库——它是结构特征。「爱用 aluminum tube 这个比喻」不是 DNA，「用工业品做反讽类比」才是。"
    },
    {
      term: "回答工作流（agentic-protocol）",
      definition: "生成的人物 Skill 在遇到事实问题时先查什么再回答的 3 步协议。Step 1 分类问题，Step 2 按此人物的研究维度查事实，Step 3 用心智模型 + DNA 回答。",
      whereItAppears: "Phase 3 构建时根据心智模型推导生成，写入 SKILL.md 「角色扮演规则」之后、「示例对话」之前。",
      solvedProblem: "防止人物 Skill 「说得像但凭旧记忆编事实」。让 skill 从鹦鹉学舌升级为可靠思维顾问。",
      howToUse: "Step 2 的研究维度必须从心智模型反推。塔勒布的「尾部风险」→「看专家预测的历史记录」；芒格的「激励机制」→「看管理层激励结构」。每个维度有具体搜索指引。",
      commonMisread: "Agentic Protocol 不是固定模板。每个人物的 Step 2 维度都不一样。如果你写了一个通用 Step 2 给所有人用，等于没写。"
    },
    {
      term: "诚实边界（honest-boundary)",
      definition: "skill 明确写出它不能推断的事 + 信息截止时间 + 公开表达 vs 真实想法的差距。至少 3 条具体局限。",
      whereItAppears: "Phase 2.6 提炼产物，写入 SKILL.md 「诚实边界」section。",
      solvedProblem: "防止「90 分 skill 但实际在编造」。宁可生成一个 60 分诚实标注局限的 skill。",
      howToUse: "对每个心智模型写出失效条件；明确不能预测对全新问题的反应；标注调研时间点。Phase 4 检查至少 3 条具体局限。",
      commonMisread: "「不能替代本人」不算具体局限——这条所有 skill 都成立。要写「在评估 AI 创业时塔勒布视角对增长策略帮助有限，因为他不参与 SaaS 生态」这种具体的。"
    }
  ],

  fileMap: [
    {
      path: "SKILL.md",
      role: "入口和路由器",
      generatedBy: "skill 作者（花叔）手工写。",
      readBy: "Claude / Codex 在用户触发关键词时载入；女娲运行时按 Phase 顺序读取。",
      owns: "整套 7 个 Phase 的流程描述 + 入口分流逻辑 + 信息源黑名单 + 通过标准 + 特殊场景处理。",
      doesNotOwn: "三重验证的具体方法论（在 extraction-framework.md），目标 SKILL.md 的字段顺序（在 skill-template.md）。",
      failureIfWrong: "SKILL.md 里的 Phase 描述如果不严格，AI 会跳步骤——比如跳过 Phase 1.5 直接提炼，最后调研垃圾进、提炼垃圾出。"
    },
    {
      path: "references/extraction-framework.md",
      role: "提炼方法论手册",
      generatedBy: "skill 作者手工写。",
      readBy: "Phase 2 提炼阶段读，用三重验证 + 表达 DNA 量化方法 + 质量自检清单。",
      owns: "三重验证的具体判断流程、表达 DNA 6 维度的统计方法、Phase 4 的 6 项通过标准。",
      doesNotOwn: "怎么搜索、怎么建目录、目标 SKILL.md 的字段结构。",
      failureIfWrong: "如果三重验证写得不严，AI 会过度宽松筛选——把通识当心智模型，最后 skill 听起来像所有人都会说的话。"
    },
    {
      path: "references/skill-template.md",
      role: "目标 SKILL.md 的骨架模板",
      generatedBy: "skill 作者手工写。",
      readBy: "Phase 3 构建阶段读。",
      owns: "目标 SKILL.md 的 section 顺序：frontmatter / 角色扮演规则 / Agentic Protocol / 身份卡 / 心智模型 / 启发式 / 表达 DNA / 时间线 / 价值观 / 智识谱系 / 诚实边界 / 来源 / 归属。",
      doesNotOwn: "每个 section 的具体内容（来自 Phase 2 提炼）、Agentic Protocol 的 Step 2 维度（从心智模型推导）。",
      failureIfWrong: "模板字段缺漏 → 输出 skill 缺 section；模板字段过度规定 → AI 失去 Agentic Protocol 这种需要根据人物定制的灵活性。"
    },
    {
      path: "scripts/download_subtitles.sh",
      role: "YouTube 字幕下载工具，替 AI 做脆弱网络 IO",
      generatedBy: "skill 作者手工写。",
      readBy: "Phase 1 Agent 2（对话）/ Agent 3（表达）需要时调用。",
      owns: "字幕优先级（人工 > 中文 > 英文 > 自动生成）、输出格式（SRT / VTT）。",
      doesNotOwn: "搜索哪些视频（agent 自己决定）、下完字幕怎么用（agent 自己决定）。",
      failureIfWrong: "脚本挂掉 → agent 退回 WebSearch 找 transcript 网站，质量降但流程不断。脚本不存在 → agent 凭训练语料编内容（最糟）。"
    },
    {
      path: "scripts/srt_to_transcript.py",
      role: "把 SRT 清洗成纯文本",
      generatedBy: "skill 作者手工写。",
      readBy: "Phase 1 把字幕喂给 agent 前的预处理步骤。",
      owns: "时间戳剥离、序号剥离、HTML 标签清理、连续重复行去重。",
      doesNotOwn: "字幕的语义内容（不做翻译 / 归纳）。",
      failureIfWrong: "脚本输出脏数据 → agent 把时间戳和序号当内容分析，得出错误的「高频词」。"
    },
    {
      path: "scripts/merge_research.py",
      role: "Phase 1.5 自动统计摘要",
      generatedBy: "skill 作者手工写。",
      readBy: "Phase 1.5 检查点调用，扫 references/research/01-06.md 生成摘要表。",
      owns: "来源数统计、一手 / 二手占比、关键发现提取。",
      doesNotOwn: "判断调研够不够（仍要用户在 checkpoint 决定）。",
      failureIfWrong: "统计错误 → 用户在 checkpoint 看到的摘要不准，可能放过质量不达标的调研。"
    },
    {
      path: "scripts/quality_check.py",
      role: "Phase 4 自动检查 6 项通过标准",
      generatedBy: "skill 作者手工写。",
      readBy: "Phase 4 验证阶段调用。",
      owns: "心智模型数量、每个模型的局限性、表达 DNA 辨识度、诚实边界、内在张力、一手来源占比——6 项 PASS / FAIL 输出。",
      doesNotOwn: "三种独立测试（已知 / 边缘 / 风格）——那是 spawn 子 agent 做。",
      failureIfWrong: "脚本不存在 / 跑挂 → AI 退回主观自评，自评偏差让有问题的 skill 通过验证。"
    },
    {
      path: "examples/*-perspective/",
      role: "15 个已交付的样板 perspective skill",
      generatedBy: "用女娲跑出来的真实产物（taleb / munger / feynman / 等）。",
      readBy: "新 run 不强读，但 Phase 3 写 SKILL.md 时可以借鉴格式。",
      owns: "样板：每个目录都是一份完整的可独立使用的 perspective skill。",
      doesNotOwn: "规范——examples 是校准材料，不是规范源。规范在 references/。",
      failureIfWrong: "如果把 example 当规范源 → 新人物的 SKILL.md 抄成上一个人物的克隆。例子是参考，不是模板。"
    }
  ],

  designChoices: [
    {
      title: "先分流，再执行（dc-route-before-work）",
      looksUnnecessaryBecause: "明明可以让 AI 看一眼用户消息自己判断，为什么要写一个 Phase 0 的分流表？",
      badScenario: "AI 拿到「我想提升决策质量」就直接搜「决策心理学」「行为经济学」，调研 30 分钟后发现自己根本没问用户想做的是商业决策还是人生决策。整套调研报废。",
      constraint: "Phase 0 强制看一眼用户消息：有明确人名 → 直接路径；没有 → 诊断路径用 1-2 轮追问反推。两条路径有不同的下游 phase 编号。",
      solvedProblem: "蒸馏对象在调研之前就锁定。后续 30 分钟调研花在对的对象上。",
      reusableMove: "在任何接受多种输入形态的 skill 入口，先用 1 行规则分流；分流前不动手。",
      counterScenarios: [
        { effect: "管用", when: "skill 接受多种输入形态（明确名 / 主题 / 模糊需求）", why: "分流让下游 Phase 不需要处理所有情况，每条路径只走需要的步骤。" },
        { effect: "得让一步", when: "skill 只接受一种输入（比如「按 commit hash 生成 changelog」）", why: "没有路径分歧，分流表会变成无意义的 if-true。可省。" },
        { effect: "用不上", when: "skill 是一次性脚本（jq / sed 这类）", why: "脚本不需要识别意图，给什么就处理什么。分流是浪费。" }
      ]
    },
    {
      title: "调研之前先建自包含包（dc-package-before-research）",
      looksUnnecessaryBecause: "目录可以等调研完了再整理。为什么 Phase 0.5 要在 Phase 1 之前？",
      badScenario: "AI 边调研边创建文件，最后 6 份调研有 3 份在 `~/Downloads/taleb-notes/`，2 份在 `07-调研与分析/2024-12/`，1 份在 `.claude/skills/`。复制 taleb-perspective 到别的电脑 → 缺一半文件。",
      constraint: "Phase 0.5 强制在调研之前建好整个目录树：SKILL.md（空）+ scripts/ + references/research/{01-06}.md + sources/{books,transcripts,articles}/。所有后续 IO 必须落在这棵树里。",
      solvedProblem: "skill 真正自包含——复制目录就能用，可以开源分发。",
      reusableMove: "把「目录是契约」当硬约束——下游所有 agent 都对着这棵树写。",
      counterScenarios: [
        { effect: "管用", when: "skill 产物会被分发 / 多 agent 协作 / 跨机器复制", why: "自包含让其它人 / 进程 / 机器开箱可用。" },
        { effect: "得让一步", when: "skill 产物只在当前对话使用（例如临时分析）", why: "可以接受文件散落——但仍建议建一个临时目录，不要散在用户主目录。" },
        { effect: "用不上", when: "skill 不产生持久产物（例如一次性问答）", why: "没文件就没目录问题。" }
      ]
    },
    {
      title: "证据按 6 维度并行采集（dc-six-dimensions）",
      looksUnnecessaryBecause: "「写一篇完整调研」不也能覆盖全维度？为什么强制 6 个 agent 6 份文件？",
      badScenario: "AI 一篇综合调研 3000 字，看似面面俱到。Phase 2 提炼时 AI 在自己的总结里找模型——它只看到自己已经过滤过一遍的二手综述，原始的「表达 DNA 节奏」「他者批评的尖锐点」都被自己平滑掉了。",
      constraint: "Phase 1 强制 6 个并行 subagent，按维度（著作 / 对话 / 表达 / 他者 / 决策 / 时间线）各写一份 md。每份独立保留来源 URL 和原始引文。Phase 2 提炼回到 6 份原文取材，不读综合。",
      solvedProblem: "原始证据保留完整，提炼有底料。三重验证的「跨域复现」需要看到同一观点在不同维度的多个实例。",
      reusableMove: "拆维度比拆段落强——让每个 agent 的视角正交，主线程只组装不平滑。",
      counterScenarios: [
        { effect: "管用", when: "目标是从大量证据中提炼模式（人物 / 主题 / 领域观察）", why: "并行 + 维度切分让每个 agent 深度大于广度。" },
        { effect: "得让一步", when: "对象信息很少（冷门人物 < 10 条来源）", why: "强行 6 agent 会重复浪费——可压成 2-3 agent。SKILL.md 已经说了「来源 < 10 减至 2-3 个模型」。" },
        { effect: "用不上", when: "skill 不做证据综合（例如代码生成 / 格式转换）", why: "没需要拆维度的对象。" }
      ]
    },
    {
      title: "便宜返工点必须停一下（dc-checkpoints）",
      looksUnnecessaryBecause: "Phase 4 已经有验证了，前面再加 1.5、2.5 两个 checkpoint 不是冗余？",
      badScenario: "AI 不停跑，调研垃圾、提炼跑偏、SKILL.md 写完才发现方向错。返工要重写 400 行 markdown + 重跑 6 agent。",
      constraint: "Phase 1.5（调研完成后）+ Phase 2.5（提炼完成后）+ Phase 4（验证）三个强制 checkpoint，必须让用户看摘要才能继续。",
      solvedProblem: "便宜返工点拦截错误：Phase 1.5 之前重调研只损失搜索时间；Phase 2.5 之前重提炼只损失结构思考；Phase 4 之后返工损失整份 SKILL.md。",
      reusableMove: "把 checkpoint 放在「下游成本陡增之前」。每次成本台阶就放一个 checkpoint。",
      counterScenarios: [
        { effect: "管用", when: "skill 阶段间产物成本差异大（提炼 vs 写作 vs 验证）", why: "Checkpoint 拦在成本陡增前。" },
        { effect: "得让一步", when: "用户明确说「跑完整套别打断我」", why: "用户接受了风险，可以减成 1 个 checkpoint。但不能 0。" },
        { effect: "用不上", when: "skill 产物总成本很低（30 秒内完成）", why: "返工成本 ≈ checkpoint 等待成本。不需要 checkpoint。" }
      ]
    },
    {
      title: "三道筛子才能叫心智模型（dc-triple-validation）",
      looksUnnecessaryBecause: "「这个论点在 ≥2 个领域出现」一道就够了吧？再加生成力 + 排他性是不是过度？",
      badScenario: "AI 把「写作要简洁」「人应该诚实」「skin in the game」这种通识都标成塔勒布的心智模型。生成的 skill 在新问题上和 ChatGPT 没区别。",
      constraint: "Phase 2 强制三重验证：(1) 跨域复现 ≥ 2 领域 + (2) 能生成新立场 + (3) 排他性（不是所有聪明人都这样想）。三重通过 → 模型；1-2 重 → 降级为启发式；0 重 → 丢弃。",
      solvedProblem: "排他性这一道是最关键的。它防止「把通识包装成此人独特见解」。塔勒布的「反脆弱」过排他性（主流经济学家不这样想）；「skin in the game」过 2 重 → 降级为启发式。",
      reusableMove: "正交筛子比线性筛子强。每道筛子测一个独立维度，最难那道（这里是排他性）放最后。",
      counterScenarios: [
        { effect: "管用", when: "需要区分「独特模型」vs「通识 / 金句」（人物 / 流派 / 风格提炼）", why: "三道独立判断让通识无法蒙混过关。" },
        { effect: "得让一步", when: "对象的独特性本身就是争议（比如某领域所有专家都强调同一件事）", why: "排他性判断变难。可降级标准但不能取消。" },
        { effect: "用不上", when: "skill 不做模型提炼（例如代码 review / 文章润色）", why: "没要筛的对象。" }
      ]
    },
    {
      title: "为每个人物推 Agentic Protocol（dc-agentic-protocol）",
      looksUnnecessaryBecause: "让 skill 在用户问问题时自己想想是不是该查事实——不就行了？非要写一个 3 步协议？",
      badScenario: "用户问 taleb-perspective：「OpenAI 这种估值算不算尾部风险？」skill 凭训练语料编个回答，里面塔勒布金句堆砌但没引用任何 2024 年的真实数据。用户读完不知道这是塔勒布真会说的还是 AI 编的。",
      constraint: "Phase 3 构建时强制为每个人物推 Agentic Protocol：Step 1 分类问题（需要事实 / 纯框架 / 混合）；Step 2 按此人物心智模型反推的研究维度用 WebSearch 查事实；Step 3 用心智模型 + DNA 回答。Step 2 的维度必须每个人物独有。",
      solvedProblem: "人物 skill 从「说得像」升级为「做得像」。塔勒布 skill 真的会去查「专家预测的历史记录」；芒格 skill 真的会去查「公司激励结构」。",
      reusableMove: "用「skill 的核心模型」反推「skill 的执行协议」。模型在脑子里，协议在手上。",
      counterScenarios: [
        { effect: "管用", when: "skill 输出需要事实底座（人物 / 顾问 / 评估 skill）", why: "强制查事实让输出可信。" },
        { effect: "得让一步", when: "skill 输出主要是创作（写小说 / 写诗 / 头脑风暴）", why: "可以保留 Step 1 分类但 Step 2 可以是「调用语言记忆」而不是 WebSearch。" },
        { effect: "用不上", when: "skill 没有「用户问开放问题」的入口（例如一次性脚本）", why: "没问题就没回答工作流。" }
      ]
    },
    {
      title: "检查必须接修复（dc-quality-with-repair）",
      looksUnnecessaryBecause: "跑 quality_check.py 输出报告就够了——人 / 后续 agent 看报告决定改不改。",
      badScenario: "AI 跑完 quality_check.py，看到 6 项里挂了 2 项，写一段「检查报告」交付。SKILL.md 仍然是不通过的版本。下次有人用这个 skill，问题原封不动。",
      constraint: "Phase 4 强制：不通过的项必须回到对应 Phase 修复后再重检。Phase 5 还要再起 2 个独立 agent 评审 + 主线程综合改动 + 用户确认。整个流程不结束，直到检查通过 + 改动落地。",
      solvedProblem: "检查不是 markdown，是接到代码 / 内容上的修复触发器。",
      reusableMove: "「检查 → 修复 → 重检」是闭环；「检查 → 报告」是开环。开环 skill 在第二次跑的时候问题会复现。",
      counterScenarios: [
        { effect: "管用", when: "skill 输出是会被后续读取 / 使用的产物（SKILL.md / 代码 / 文档）", why: "闭环保证下游拿到的是通过版。" },
        { effect: "得让一步", when: "skill 是顾问式的（只给建议不改文件）", why: "可以接「让用户修复」而不是「自动修复」，但仍要回检。" },
        { effect: "用不上", when: "skill 没有质量阈值（例如纯展示）", why: "没要修的对象。" }
      ]
    }
  ],

  patterns: [
    {
      name: "先分流，再执行",
      status: "已验证",
      prevents: "AI 拿到模糊需求时直接动手，30 分钟后才发现走错了对象。",
      therefore: "在 skill 入口写一张 1-2 行规则的分流表，先决定路径再决定动作。分流前不动手。",
      useWhen: "skill 接受多种输入形态（具体名 / 主题 / 模糊需求 / 不同类型对象）。简单做 = 让 AI 自己判断；不简单做 = 因为 AI 默认会选「立刻动手」而不是「先识别」。",
      howToReuse: "把所有可能的输入分桶（≤ 4 桶），每个桶配一个独立的 Phase 编号或子流程入口。第一句话强制「先判断属于哪桶」。",
      antiExample: "把分流写成一段散文「先想清楚用户要什么再开始」——AI 不会停下来真的分流。必须是表格 + 强制编号跳转。",
      cost: "如果 skill 只服务一种输入，分流表是无意义的 if-true。",
      seenIn: "女娲 Phase 0、Compound Engineering 的 ce-resolve-pr-feedback、claude-code-guide 入口。",
      relatedPatterns: [
        { to: "P2", label: "自包含证据库", relation: "前置——分流完才知道下游建什么容器" },
        { to: "P4", label: "便宜返工点停一下", relation: "互补——分流是事前避免，checkpoint 是事中拦截" }
      ]
    },
    {
      name: "自包含证据库",
      status: "已验证",
      prevents: "skill 产物依赖外部目录 / 临时文件 / 跨机器路径，复制出去就坏。",
      therefore: "在动手之前先 mkdir 整套目录；所有后续 IO 必须落在这棵树里；复制目录就能独立使用。",
      useWhen: "skill 产物会被分发 / 多 agent 协作写入 / 跨会话使用。简单做 = 边做边建文件；不简单做 = 因为「边建」最终一定有几份文件散到其它地方。",
      howToReuse: "在 Phase 0.5 类的位置加「建目录」步骤；列出完整树形；把树作为下游 agent 的硬契约——agent 接到的 prompt 必须包含「写到 X 路径」。",
      antiExample: "建了目录但没写死下游 agent 必须写到目录内——agent 仍可能写到其它位置。容器是必要不充分。",
      cost: "如果 skill 产物只在当前对话使用一次，建目录是浪费。",
      seenIn: "女娲 Phase 0.5；compound-engineering 的 worktree 隔离；extracting-skill-patterns 的 generation/<skill-slug>/ 约定。",
      relatedPatterns: [
        { to: "P3", label: "多维证据并行收集", relation: "后置——容器建好后，agent 才有明确写入位置" },
        { to: "P7", label: "检查必须接修复", relation: "互补——检查也写在容器内，修复直接改容器内文件" }
      ]
    },
    {
      name: "多维证据并行收集",
      status: "已验证",
      prevents: "「让一个 agent 写综合调研」时它先平滑、再总结，提炼时只能在它的二手综述里挑。",
      therefore: "把对象拆成正交维度，每个维度派独立 agent，每个 agent 产物保留原始引用。主线程不综合、只组装。",
      useWhen: "目标是从大量原始素材中提炼模式（人物 / 流派 / 领域观察）。简单做 = 一个 agent 跑完全部；不简单做 = 因为单 agent 必然丢失维度间的张力。",
      howToReuse: "(1) 定义 N 个正交维度；(2) 写 N 份 prompt 模板，每份只关心一个维度；(3) 输出文件名写死，每份独立保留来源；(4) 下游消费时回到 N 份原文，不读综合。",
      antiExample: "「6 个 agent」但每个 agent 接到的 prompt 类似——结果是 6 份重复的综合。维度必须正交。",
      cost: "对象信息少（< 10 来源）时强行多维会重复浪费。需要降维处理。",
      seenIn: "女娲 Phase 1；compound-engineering 的 multi-agent review；extracting-skill-patterns 的 page agent 并行写作。",
      relatedPatterns: [
        { to: "P5", label: "三道筛选再命名", relation: "后置——多维收集的原始材料是三道筛子的输入" },
        { to: "P6", label: "从心智模型推研究流程", relation: "互补——前者是来源端的取证流程，后者是运行时的研究流程" }
      ]
    },
    {
      name: "便宜返工点停一下",
      status: "已验证",
      prevents: "AI 一口气从输入跑到成品，中途方向错了没人拦——最后返工成本是 checkpoint 等待成本的 10 倍以上。",
      therefore: "在「下游成本陡增之前」加 checkpoint。每个成本台阶配一个 checkpoint。Checkpoint 输出必须是用户能扫一眼判断的摘要，不是「请确认」。",
      useWhen: "skill 多阶段，阶段间产物成本差异大（调研 vs 写作 vs 验证）。简单做 = 跑完整套；不简单做 = 因为返工 4000 行 markdown 比返工 200 字大纲贵 20 倍。",
      howToReuse: "(1) 标出 skill 的成本台阶；(2) 在每个台阶之前加 checkpoint；(3) 设计摘要表（不是「请确认」对话）；(4) 提供自动统计工具减少 checkpoint 准备成本（女娲的 merge_research.py）。",
      antiExample: "在「下游成本仍很低」的位置加 checkpoint——用户失去耐心。在「下游成本已经付出大半」的位置加——返工 vs 不返工已经差不多。位置错就是冗余。",
      cost: "总成本很低（< 30 秒）的 skill 不需要 checkpoint。用户接受「整套别打断」时可减少但不能 0。",
      seenIn: "女娲 Phase 1.5 / 2.5 / 4；BMAD 的 stage 间确认；extracting-skill-patterns 的 anchor slice 后停一下。",
      relatedPatterns: [
        { to: "P1", label: "先分流，再执行", relation: "互补——分流是事前避免错误，checkpoint 是事中拦截错误" },
        { to: "P7", label: "检查必须接修复", relation: "后置——checkpoint 是「让用户判断」，检查是「自动判断 + 修复」" }
      ]
    },
    {
      name: "三道筛选再命名",
      status: "已验证",
      prevents: "把通识 / 金句 / 一次性发言当成此人独特模型——最后产物在新问题上和 ChatGPT 没区别。",
      therefore: "用 ≥ 3 个正交筛子各自独立判断；全过 → 命名为「核心」；部分过 → 降级；都不过 → 丢弃。最难那道筛子放最后。",
      useWhen: "需要从大量候选中挑出真正独特的（人物模型 / 设计模式 / 关键差异化点）。简单做 = 一道筛子 + 人工判断；不简单做 = 因为单道筛子无法防通识包装。",
      howToReuse: "(1) 设 N 个正交的判断维度（女娲的跨域复现 / 生成力 / 排他性）；(2) 对每个候选独立打 N 次；(3) 全过 → 核心，部分过 → 降级（不丢），0 过 → 丢弃。",
      antiExample: "3 道筛子但不正交（「在 ≥3 个场景出现」「在 ≥2 个领域出现」「重复 ≥3 次」）——本质同一道筛子说三遍。",
      cost: "对象的独特性本身有争议时排他性判断很难。可降低标准但不能取消。",
      seenIn: "女娲 Phase 2；论文 review 的 novelty / significance / soundness；产品 PMF 的 desirability / viability / feasibility。",
      relatedPatterns: [
        { to: "P3", label: "多维证据并行收集", relation: "前置——三道筛的输入是多维收集的产物" },
        { to: "P6", label: "从心智模型推研究流程", relation: "后置——筛出的模型用来推研究流程" }
      ]
    },
    {
      name: "从心智模型推研究流程",
      status: "已验证",
      prevents: "做的 skill「说得像但凭旧记忆编」——所有人物 skill 共用一个通用 Step 2，最后大家都不会查事实。",
      therefore: "skill 输出的 Agentic Protocol Step 2 不是固定模板。从 skill 自身的核心模型反推：「这个角色 / 框架最关注什么，就让它先查什么。」",
      useWhen: "skill 需要在用户问开放问题时给出事实底座（顾问 skill / 评估 skill / 分析 skill）。简单做 = 让 AI 自己判断要不要查；不简单做 = 因为 AI 默认凭训练语料编。",
      howToReuse: "(1) 列出 skill 的核心模型 / 框架；(2) 对每个模型问「持这个模型的人遇到新问题时会先看什么？」；(3) 把答案写成 Step 2 的研究维度，每维度配具体搜索指引。",
      antiExample: "Step 2 写成「搜索相关信息 + 看权威来源 + 验证数据」——通用到所有人物都能用 = 等于没写。",
      cost: "skill 只有 1 个核心模型时推出的维度太单薄。需要先确保 ≥ 3 个模型。",
      seenIn: "女娲 Phase 3 Agentic Protocol 生成；compound-engineering 的角色专属 prompt；任何「专家系统」式 skill。",
      relatedPatterns: [
        { to: "P5", label: "三道筛选再命名", relation: "前置——筛出的模型是研究流程的来源" }
      ]
    },
    {
      name: "检查必须接修复",
      status: "已验证",
      prevents: "「跑完 quality_check 输出报告」当成完成——产物仍然是不通过版本，下次用还坏。",
      therefore: "检查不是 markdown，是触发器。不通过的项必须回到对应阶段修复后重检，整个流程不结束直到检查通过 + 改动落地。",
      useWhen: "skill 产物会被读取 / 使用（SKILL.md / 代码 / 文档）。简单做 = 检查后让人决定改不改；不简单做 = 因为开环最终交付的产物质量不可控。",
      howToReuse: "(1) 检查项必须有明确阈值（不是「质量良好」）；(2) 不通过时输出「应该回到哪个 phase 改」；(3) 修复后强制重检；(4) 迭代上限（女娲 2 轮）防止无限打磨。",
      antiExample: "「检查通过率 80%」当目标——剩下 20% 永远修不到。要么「100% 通过」要么「不通过的明确标注在产物里」。",
      cost: "迭代上限会导致某些项一直过不去时强制交付。需要在诚实边界 / 已知限制 section 标注。",
      seenIn: "女娲 Phase 4-5；TDD 红绿循环；compound-engineering 的 PR review 回写。",
      relatedPatterns: [
        { to: "P2", label: "自包含证据库", relation: "互补——检查也写在容器内，修复直接改容器内文件" },
        { to: "P4", label: "便宜返工点停一下", relation: "前置——checkpoint 是用户判断，检查是自动判断+修复" }
      ]
    }
  ],

  applyIt: {
    h1: "拿这个形状写你自己的 skill",
    summary: "女娲的招式不只能用来造人物 skill。下面这套清单是「把女娲的 7 个 design choice 抽出来，对着自己的领域填」。每条都能在 30 分钟内开始做。",
    checklistTitle: "起手清单",
    checklistHeading: "从坏 AI 输出反推到 skill 形状",
    checklist: [
      "写一行：「这个 skill 不防的话，AI 默认会怎么做坏？」——能写出来再继续，写不出来说明你还不清楚 skill 在防什么。",
      "列出所有可能的输入形态（明确名 / 主题 / 模糊需求 / 不同类型对象）。≤ 4 桶。每桶画一条独立的 Phase 路径。",
      "在动手之前定下整个产物的目录树。所有下游 agent 的 prompt 都包含「写到 X 路径」。",
      "把对象拆成 N 个正交维度（女娲选 6 个）。为每个维度写一份独立 prompt 模板，输出文件名固定。",
      "标出 skill 的成本台阶（调研 / 写作 / 验证）。每个台阶之前加一个 checkpoint。Checkpoint 输出是摘要表，不是「请确认」对话。",
      "为你的核心提炼步骤设 ≥ 3 个正交筛子，最难那道放最后。全过 → 核心；部分过 → 降级；都不过 → 丢弃。",
      "如果 skill 会在用户问开放问题时回答——根据 skill 的核心模型反推一份 Agentic Protocol，Step 2 的研究维度对每个 skill 实例（每个人物 / 每个框架）独立生成。",
      "写完后跑一份「自动质量检查」+ ≥ 3 个独立 subagent 测试。不通过的项必须回到对应 Phase 修复后重检。设迭代上限避免无限打磨。"
    ],
    starterPrompt: "我想用「女娲的形状」做一个 [你的领域] 的 skill。\n\n防的坏输出：[一句话]\n\n输入形态可能是：\n- [桶 1]\n- [桶 2]\n- ...\n\n请帮我:\n1. 设计 Phase 0 分流表\n2. 列出 Phase 0.5 应该建的目录树\n3. 把核心提炼对象拆成 N 个正交维度，写出 N 份 agent prompt 模板\n4. 标出 ≥ 2 个 checkpoint 应该放在哪个 phase 之间\n5. 设计 Phase 4 的自动检查清单（≥ 4 项，每项有明确阈值）",
    nextSteps: {
      author: [
        "把 SKILL.md 的 Phase 描述加密度——每个 Phase 至少回答「我收到什么 / 我读什么 / 我不能直接做什么 / 我产出什么」四个问题。",
        "在 examples/ 下放 ≥ 3 个真实跑出来的产物作为校准材料（但永远在 SKILL.md 强调「examples 是校准，references 才是规范」）。",
        "把脆弱的网络 IO / 数据清洗 / 自动检查写成 scripts/——让 AI 调脚本而不是凭训练语料编。",
        "每隔几个月跑一次「用 quality_check.py 自己检查 SKILL.md」——看看自动检查项有没有漂移、有没有新增的失败模式需要加约束。"
      ],
      thief: [
        "找一个你已经在做 / 想做的 skill，问自己：女娲的 7 个 design choice 里哪些是你的 skill 已经做了的？哪些没做？没做的是「这个 skill 不需要」还是「我没意识到」？",
        "把女娲的 6 个并行 agent 维度替换成你领域的 N 个维度（女娲: 著作 / 对话 / 表达 / 他者 / 决策 / 时间线 → 你的：?）。",
        "把女娲的 3 道筛子（跨域复现 / 生成力 / 排他性）替换成你领域的 ≥ 3 个正交判断（产品: 渴望度 / 可行性 / 可持续性？）。",
        "把女娲的 Agentic Protocol 抽出来——你的 skill 输出在用户问开放问题时需要先查什么？这个「先查什么」从 skill 自身的核心模型反推。"
      ]
    }
  }
};
