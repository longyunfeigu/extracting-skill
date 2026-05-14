window.handbook = {
  meta: {
    title: "女娲造人 Skill 解剖手册",
    skillName: "女娲造人",
    audience: "想偷招的人 / 正在使用这个 skill 的 AI",
    sourcePath: "/home/guwanhua/Desktop/git/nuwa-skill",
    version: "v1"
  },

  overview: {
    h1: "它不是让 AI 扮演名人，而是让 AI 先做完造 skill 的苦工",
    oneLiner: "女娲把一个人名或模糊需求，变成一套有证据、有边界、能处理新问题的人物 skill 生产线。",
    openingScene: [
      {
        kind: "para",
        text: "先不要看 Nuwa 的阶段名。想象一个默认 AI 收到请求：帮我做一个乔布斯 skill，用来审视产品设计和战略取舍。"
      },
      {
        kind: "para",
        text: "它最容易马上写一段漂亮的角色设定：少量传记事实、几句熟悉语录、一些像乔布斯的短句。用户一眼会觉得有味道。"
      },
      {
        kind: "para",
        text: "问题会在第一次新问题里露出来。问它 Vision Pro 现在值不值得买，它可能凭旧记忆回答，还说得很像乔布斯。"
      },
      {
        kind: "para",
        text: "这种失败不是语气问题。它没有证据链，没有来源质量判断，没有把观点筛成可迁移的模型，也没有在事实会变的时候先查资料。"
      },
      {
        kind: "para",
        text: "女娲处理的是这个错位：用户以为要的是一个会说话的人设，真正需要的是一个能被安装、能复用、能承认不知道什么的思维工具。"
      },
      {
        kind: "list",
        items: [
          "它先问这是明确人名，还是模糊需求。",
          "它先建 skill 目录，再让研究写进固定文件。",
          "它用六个维度取证，不让一篇文章代表一个人。",
          "它在调研后和提炼后各停一次，让用户看质量。",
          "它最后还测试生成的 skill，而不是交付一篇好看的 SKILL.md。"
        ]
      }
    ],
    predictPrompt: "如果你来修这个默认 AI，你会先加什么？更多语录？更像的语气？还是先规定它必须保存哪些证据？先写下答案，再看 Nuwa 的机制。",
    primerBeats: [
      {
        kind: "para",
        text: "Nuwa 的核心动作是把一个人的公开材料，压缩成一个可运行的判断系统。这里的可运行，不是会输出名人口吻，而是面对新问题时知道先查什么、用什么模型判断、哪里必须犹豫。"
      },
      {
        kind: "diagram",
        id: "main-flow"
      },
      {
        kind: "para",
        text: "心智模型是这个人反复使用的看问题方式。比如乔布斯的聚焦即说不，不只是一句名言。它会影响产品线取舍、功能裁剪、团队资源分配。"
      },
      {
        kind: "para",
        text: "决策启发式更像快捷规则。它不一定够深，但能指导行动。比如遇到功能列表时先问能砍掉什么。"
      },
      {
        kind: "para",
        text: "表达 DNA 不是贴几句口癖。它包括句式、节奏、确定性、类比来源、禁忌词。删掉名字后，读者仍能感到这是同一个判断系统在说话。"
      },
      {
        kind: "para",
        text: "诚实边界是信任来源。Nuwa 要求生成的 skill 写清楚信息截止时间、公开表达和真实想法的差距、哪些维度只是推断。"
      },
      {
        kind: "para",
        text: "Agentic Protocol 是成品 skill 里的行动流程。遇到需要事实的问题，它不允许直接凭记忆回答，而是先按这个人的模型去查对应事实。"
      }
    ],
    wowSetup: "最有意思的地方在 Agentic Protocol。Nuwa 不是给所有人物套同一套搜索清单，而是从心智模型反推研究维度。乔布斯、芒格、MrBeast 看到同一个产品问题，会先查的东西不一样。",
    wowDiagramId: "agentic-compare",
    wowMoment: "这就是 Nuwa 从角色扮演变成 skill 生成器的瞬间：它让生成物继续拥有行动规则。成品 skill 不只回答得像，还会先做这个人会重视的功课。",
    badResults: [
      {
        title: "语录拼贴",
        aiDefault: "从传记和公开语录里挑几句，写成很像的开场白。",
        skillIntervention: "用跨域复现、生成力、排他性三道筛，只让能处理新问题的观点进入心智模型。"
      },
      {
        title: "弱来源装强来源",
        aiDefault: "把百科、摘要、评论和本人原文混在一起，语气一样自信。",
        skillIntervention: "明确来源优先级和黑名单，要求区分一手、二手和推断。"
      },
      {
        title: "研究说做了但拿不出来",
        aiDefault: "口头汇总研究结果，后面写 skill 时无法回溯证据。",
        skillIntervention: "每个研究方向必须写入 `references/research/` 的固定文件。"
      },
      {
        title: "写完才发现方向错了",
        aiDefault: "研究完直接写 400 行 SKILL.md，用户只能在最后返工。",
        skillIntervention: "调研后停一次，提炼后再停一次。确认质量和模型，再进入构建。"
      },
      {
        title: "事实问题凭旧记忆回答",
        aiDefault: "保持角色口吻回答当前公司、产品、市场问题，但事实可能过时。",
        skillIntervention: "生成的 Agentic Protocol 要求遇到事实敏感问题先查资料，再按人物模型判断。"
      }
    ],
    shapeReason: "章节按读者想解决的问题排，不按 Nuwa 源文件顺序排。",
    chapterLogic: [
      { chapter: "Overview", why: "先让读者看见默认 AI 会怎么坏，再讲 Nuwa 的整体形状。" },
      { chapter: "Walkthrough", why: "用一个乔布斯请求跑完整流程，展示我每一步被什么约束。" },
      { chapter: "Glossary", why: "把心智模型、表达 DNA、Agentic Protocol 这些词讲成可操作的东西。" },
      { chapter: "File Map", why: "说明文件职责，避免把目录树误读成设计。" },
      { chapter: "Design Choices", why: "解释为什么这些规则不是装饰，而是在拦具体坏结果。" },
      { chapter: "Patterns", why: "把 Nuwa 的招拆成可复制的 skill 写作模式。" },
      { chapter: "Apply It", why: "最后把模式压成起手清单，方便写自己的 skill。" }
    ]
  },

  example: {
    label: "乔布斯产品战略 skill ",
    userRequest: "帮我蒸馏一个乔布斯 skill，用来审视产品设计和战略取舍。",
    whyThisExample: "它是明确人名路径，又需要产品判断、表达风格、当前事实研究。Nuwa 的主要机制都会被用到。",
    expectedOutput: "一个自包含的 `steve-jobs-perspective/` skill 包，里面有研究文件、最终 SKILL.md、Agentic Protocol、诚实边界和验证结果。"
  },

  diagrams: [
    {
      id: "main-flow",
      type: "flow",
      kicker: "流程图",
      title: "Nuwa 从请求到交付的阶段",
      description: "两个检查点把昂贵工作分开：先验收研究，再确认提炼方向。",
      image: "assets/diagrams/main-flow.svg"
    },
    {
      id: "package-map",
      type: "file-map",
      kicker: "文件关系",
      title: "Nuwa 包和生成物的责任边界",
      description: "`SKILL.md` 管流程，references 管方法，scripts 管脆弱步骤，examples 只做校准。",
      image: "assets/diagrams/package-map.svg"
    },
    {
      id: "agentic-compare",
      type: "comparison",
      kicker: "对比图",
      title: "同一个事实问题，不同人物会查不同东西",
      description: "Agentic Protocol 的研究维度来自人物模型，不是固定搜索模板。",
      image: "assets/diagrams/agentic-compare.svg"
    },
    {
      id: "pattern-network",
      type: "network",
      kicker: "模式网络",
      title: "8 个可偷走的 skill 设计模式",
      description: "取证、检查点、提炼、协议、验证不是散点，它们互相接力。",
      image: "assets/diagrams/pattern-network.svg"
    }
  ],

  walkthrough: [
    {
      id: "stage-entry",
      phase: "Phase 0",
      kicker: "入口分流",
      title: "先判断用户到底给了什么",
      summary: "我先把请求分成明确对象和模糊需求两条路，不把所有用户都推进同一个问卷。",
      hookOpen: "我收到的是一个明确人名加用途的请求，所以不需要推荐候选。",
      preTest: "你先猜一遍：收到乔布斯这个名字后，下一步应该马上开始搜资料，还是先确认用途？",
      narrativeBody: [
        { kind: "para", text: "我手里的输入是：帮我蒸馏一个乔布斯 skill，用来审视产品设计和战略取舍。这里已经有明确对象，也有用途。Nuwa 把它送进直接路径。" },
        { kind: "code", lang: "text", text: "明确的人名/主题 -> 直接路径 -> Phase 0A\n模糊的需求/困惑 -> 诊断路径 -> Phase 0B" },
        { kind: "para", text: "这一步表面是在分类。它真正挡住的是默认 AI 的一视同仁：明明用户已经给了对象，还继续问十个问题；或者用户只有模糊痛点，却直接乱推荐一个名人。" }
      ],
      reusableMove: "先按用户起点分路。明确对象少问，模糊需求先诊断。",
      receives: "用户请求：蒸馏乔布斯，用于产品设计和战略取舍。",
      reads: "`SKILL.md` Phase 0 和 Phase 0A。",
      blockedShortcut: "不能马上写乔布斯人设，也不能把用户拖进长问卷。",
      action: "判断这是直接路径，并保留用途作为后续研究权重。",
      output: "路径：直接蒸馏。聚焦方向：产品设计和战略取舍。",
      painPoint: "入口没分清，后面所有研究维度都会偏。",
      mechanismThread: "Route -> Confirm -> Package。",
      nextConsumer: "需求确认阶段用它决定默认范围。",
      freedom: "limited",
      hookClose: "路径定下来后，下一步不是搜资料，而是确认目标边界。",
      challenges: [
        "如果用户只说我想提升决策质量，你会推荐人物还是主题？",
        "如果用户说就做乔布斯，不给用途，你会默认什么？",
        "什么时候追问会帮忙，什么时候只是拖慢？"
      ]
    },
    {
      id: "stage-confirm",
      phase: "Phase 0A",
      kicker: "需求确认",
      title: "确认对象、用途、材料和更新模式",
      summary: "我把后面会影响研究方向的几个变量先钉住。",
      hookOpen: "我知道这是乔布斯直接路径，但还不知道是否全面画像、是否有本地材料、是否已有旧 skill。",
      preTest: "如果用户已经给了用途，你会继续追问到很细，还是给出默认并推进？",
      narrativeBody: [
        { kind: "para", text: "Nuwa 的规则是：确认人物、聚焦方向、用途、新建还是更新、有没有本地一手素材。用户没有更多信息时，默认全面画像、思维顾问、无本地语料，然后继续。" },
        { kind: "code", lang: "markdown", text: "确认项：\n1. 人物：Steve Jobs\n2. 聚焦方向：产品设计 / 战略取舍\n3. 用途：思维顾问\n4. 模式：新建\n5. 本地语料：未提供，走网络搜索" },
        { kind: "para", text: "注意这里的本地语料不是礼貌问题。Nuwa 把用户提供的一手材料排在最高权重，因为完整原文通常比搜索摘要更可靠。" }
      ],
      reusableMove: "只问会改变后续工作的变量。能默认就默认，别把确认变成问卷。",
      receives: "直接路径和用户用途。",
      reads: "`SKILL.md` Phase 0A。",
      blockedShortcut: "不能忽略本地一手材料，也不能在信息足够时继续盘问。",
      action: "确认或默认五个变量。",
      output: "一个可执行的蒸馏任务说明。",
      painPoint: "用途没定，六路调研会平均用力，最终 skill 不知道该服务什么问题。",
      mechanismThread: "Confirm -> Research weighting -> Template filling。",
      nextConsumer: "创建目录和研究任务用它命名、分配重点。",
      freedom: "limited",
      hookClose: "目标边界够用了。现在先建容器，防止研究材料散掉。",
      challenges: [
        "如果用户提供一本 PDF 和两段采访 transcript，哪些研究维度可以少搜？",
        "如果是更新已有 skill，为什么不能重做全部流程？",
        "聚焦方向太窄时，诚实边界要怎么写？"
      ]
    },
    {
      id: "stage-package",
      phase: "Phase 0.5",
      kicker: "先建容器",
      title: "在调研前创建自包含 skill 包",
      summary: "我先建目录和固定文件位置，让后面的研究有地方写。",
      hookOpen: "人物和用途已经确认。Nuwa 要求我先创建 skill 目录，再开始研究。",
      preTest: "你可能会想先搜索一小时，最后再整理文件。Nuwa 为什么反过来？",
      narrativeBody: [
        { kind: "para", text: "我先准备目标包结构。这样做的目的不是整洁，而是让每个研究 agent 的结果都能被后面的检查点读取。" },
        { kind: "code", lang: "text", text: ".claude/skills/steve-jobs-perspective/\n├── SKILL.md\n├── scripts/\n└── references/\n    ├── research/\n    │   ├── 01-writings.md\n    │   ├── 02-conversations.md\n    │   ├── 03-expression-dna.md\n    │   ├── 04-external-views.md\n    │   ├── 05-decisions.md\n    │   └── 06-timeline.md\n    └── sources/" },
        { kind: "para", text: "这一步挡住的是口头研究。没有文件，Phase 1.5 就没法检查来源数量、薄弱维度和矛盾点。"
        }
      ],
      reusableMove: "先建结果容器，再分配工作。让每个后续步骤有可检查的文件目标。",
      receives: "确认后的任务说明。",
      reads: "`SKILL.md` Phase 0.5。",
      blockedShortcut: "不能把调研写到外部临时目录，也不能只在对话里总结。",
      action: "创建自包含目录结构。",
      output: "目标 skill 包骨架。",
      painPoint: "材料散落时，后面只能凭印象综合，无法验收。",
      mechanismThread: "Package -> Evidence files -> Merge summary。",
      nextConsumer: "六路调研阶段把结果写入这些路径。",
      freedom: "almost-none",
      hookClose: "文件位置已经钉住。下一步开始按六个角度收集证据。",
      challenges: [
        "如果 skill 要开源，哪些材料必须留在包里？",
        "如果原始视频很大，应该放进 sources 还是只放 transcript？",
        "什么时候 examples 不能当规范？"
      ]
    },
    {
      id: "stage-research",
      phase: "Phase 1",
      kicker: "六路调研",
      title: "从六个方向看同一个人",
      summary: "我把乔布斯拆成著作、对话、表达、外部评价、决策、时间线六个证据面。",
      hookOpen: "文件槽位已经准备好。现在每个方向必须写入自己的研究文件。",
      preTest: "如果只能挑一个来源，你会读传记、演讲，还是访谈？Nuwa 的答案是：不能只挑一个。",
      narrativeBody: [
        { kind: "para", text: "Nuwa 不允许一篇权威传记代表整个人。长文能看系统思想，访谈能看临场反应，社交媒体和短文能看表达习惯，外部评价能看盲点，重大决策能看言行是否一致，时间线能看变化。" },
        { kind: "code", lang: "markdown", text: "| Agent | 输出文件 | 看什么 |\n| 1 著作 | 01-writings.md | 核心论点、自创术语 |\n| 2 对话 | 02-conversations.md | 被追问时怎么想 |\n| 3 表达 | 03-expression-dna.md | 高频词、句式、争议表达 |\n| 4 他者 | 04-external-views.md | 批评、盲点、同行对比 |\n| 5 决策 | 05-decisions.md | 行动和声称是否一致 |\n| 6 时间线 | 06-timeline.md | 演化和最近动态 |" },
        { kind: "para", text: "每份文件都要标注来源和可信度。Nuwa 还明确排除知乎、微信公众号、百度百科这类容易污染研究的来源。"
        }
      ],
      reusableMove: "把研究拆成互补维度。每个维度都有文件目标和证据类型，不靠记忆汇总。",
      receives: "skill 包骨架和研究目标。",
      reads: "`SKILL.md` Phase 1、来源优先级、信息源黑名单。",
      blockedShortcut: "不能只读一本书、一个采访或一个二手总结。",
      action: "按六个方向搜集和保存证据。",
      output: "`references/research/01-06*.md` 六份研究文件。",
      painPoint: "单一来源会制造一个看似完整但很薄的人物模型。",
      mechanismThread: "Evidence split -> Source quality -> Research review。",
      nextConsumer: "Phase 1.5 读取这些文件做质量摘要。",
      freedom: "creative",
      hookClose: "研究文件写完后，Nuwa 不让我直接提炼。先验收材料。",
      challenges: [
        "如果 Agent 4 的外部批评和 Agent 1 的本人表达冲突，你会删哪边？",
        "如果最近 12 个月没有动态，诚实边界怎么处理？",
        "本地素材和网络搜索冲突时，怎么标置信度？"
      ]
    },
    {
      id: "stage-review",
      phase: "Phase 1.5",
      kicker: "研究检查点",
      title: "在提炼前停下来验收证据质量",
      summary: "我先把来源数量、关键发现、矛盾点和薄弱维度摆出来。",
      hookOpen: "我手里有六份研究文件。本能会直接开始总结。Nuwa 不让。",
      preTest: "研究已经做完，看起来可以写了。你会先问哪一个质量问题？",
      narrativeBody: [
        { kind: "para", text: "这一步表面是在汇报。真正挡住的是垃圾进垃圾出。研究材料质量决定最终 skill 上限，在这里拦比写完后返工便宜得多。" },
        { kind: "code", lang: "bash", text: "python3 scripts/merge_research.py .claude/skills/steve-jobs-perspective" },
        { kind: "code", lang: "text", text: "Agent        来源数量  关键发现\n著作         8        聚焦、端到端控制、死亡过滤器\n对话         5        现场反应、类比、拒绝方式\n矛盾点       2处      早期封闭平台与后期 App Store 转向\n信息不足维度 无       -" },
        { kind: "para", text: "用户确认调研质量可以，我才进入提炼。用户指出某个维度薄弱，就补充那一维，不把问题推迟到最终交付。"
        }
      ],
      reusableMove: "在昂贵的主观综合前设一个便宜返工点。",
      receives: "六份研究文件。",
      reads: "`scripts/merge_research.py`、Phase 1.5 检查点格式。",
      blockedShortcut: "不能研究完就写最终 skill。",
      action: "生成研究质量摘要并等待确认或补充。",
      output: "调研质量表和补充研究决策。",
      painPoint: "来源不足、矛盾未标注、维度缺失会污染后面的模型选择。",
      mechanismThread: "Research files -> Checkpoint -> Synthesis permission。",
      nextConsumer: "提炼阶段只在确认后的证据基础上工作。",
      freedom: "limited",
      hookClose: "证据质量通过后，下一步才开始决定哪些观点配叫心智模型。",
      challenges: [
        "总来源数少于 10 条时，你会继续硬做还是降低期望？",
        "如果用户很急，检查点能不能跳过？代价是什么？",
        "矛盾是错误还是信号？什么时候是两者之一？"
      ]
    },
    {
      id: "stage-synthesis",
      phase: "Phase 2",
      kicker: "框架提炼",
      title: "把漂亮观点筛成能工作的模型",
      summary: "我用三重验证区分心智模型、决策启发式和一次性观点。",
      hookOpen: "研究质量已确认。现在我手里有很多候选观点，但不是每个都能进入核心。",
      preTest: "聚焦、品味、现实扭曲力场、A Player、死亡过滤器都很有名。你会全放进核心模型吗？",
      narrativeBody: [
        { kind: "para", text: "Nuwa 让我先读 `references/extraction-framework.md`。它规定一个观点要成为心智模型，必须通过三道测试。" },
        { kind: "code", lang: "markdown", text: "三道测试：\n1. 跨域复现：至少出现在两个不同领域。\n2. 有生成力：能推断此人对新问题的可能立场。\n3. 有排他性：不是所有聪明人都会这样想。\n\n三个都过 -> 心智模型。\n只过一两个 -> 决策启发式。\n一个都不过 -> 不纳入。" },
        { kind: "para", text: "比如聚焦即说不可以用于产品线、功能裁剪、战略优先级，能推断乔布斯会如何审视一个臃肿产品，也有明显的乔布斯色彩。它可以进入核心模型。" },
        { kind: "para", text: "相反，有些好听的表达可能只在一个场合出现。它们可以成为案例或语气材料，但不该变成核心模型。"
        }
      ],
      reusableMove: "给候选观点设置升级标准。不要让好句子自动变成核心规则。",
      receives: "确认后的研究材料和候选观点。",
      reads: "`references/extraction-framework.md`。",
      blockedShortcut: "不能把名言、标签和传记事件全部写进模型列表。",
      action: "列候选、三重验证、排序取 3-7 个模型，其余降级或丢弃。",
      output: "心智模型、决策启发式、表达 DNA、价值观、张力和边界草稿。",
      painPoint: "提炼阶段最容易把熟悉度误当成重要性。",
      mechanismThread: "Candidate ideas -> Triple validation -> Skill sections。",
      nextConsumer: "提炼检查点展示这些草稿给用户确认。",
      freedom: "creative",
      hookClose: "候选模型筛出来了，但 Nuwa 还不让我写最终文件。先让用户看提炼方向。",
      challenges: [
        "一个观点只通过跨域复现，没有排他性，应该放在哪里？",
        "如果一个模型非常独特但证据少，怎么处理？",
        "表达 DNA 和心智模型混在一起时，怎么拆开？"
      ]
    },
    {
      id: "stage-synthesis-check",
      phase: "Phase 2.5",
      kicker: "提炼检查点",
      title: "在写最终 SKILL.md 前确认方向",
      summary: "我把模型名、启发式、表达特征、核心张力和边界先给用户看。",
      hookOpen: "我已经提炼出乔布斯的候选操作系统。现在最危险的是自信地写错重点。",
      preTest: "你觉得检查点应该给用户看全文草稿，还是只看提炼摘要？",
      narrativeBody: [
        { kind: "para", text: "Nuwa 要求我展示摘要，而不是先写完整 skill。这个摘要足够让用户判断方向，又不会把返工成本拉高。" },
        { kind: "code", lang: "markdown", text: "提炼结果摘要：\n- 心智模型：聚焦即说不、端到端控制、连点成线、死亡过滤器、现实扭曲力场、技术与人文交汇\n- 决策启发式：先做减法、一句话定义、A Player 自我增强\n- 表达 DNA：短句、二元判断、强类比、极高确定性\n- 核心张力：极致品味与高压管理、封闭控制与平台生态\n- 诚实边界：公开信息推断、不能替代直觉、近期事实需查证" },
        { kind: "para", text: "如果用户指出缺了某个关键模型，我回到 Phase 2 调整。这个阶段的目标不是展示勤奋，而是避免后面的模板填充沿着错误方向变得更漂亮。"
        }
      ],
      reusableMove: "在主观判断最重、但还没进入长文实现的地方停一下。",
      receives: "提炼草稿。",
      reads: "`SKILL.md` Phase 2.5。",
      blockedShortcut: "不能跳过用户确认直接构建最终 SKILL.md。",
      action: "展示提炼摘要，确认或回到 Phase 2。",
      output: "被确认的模型、启发式、表达 DNA 和边界。",
      painPoint: "方向错了，最终 skill 越完整越难改。",
      mechanismThread: "Synthesis draft -> User checkpoint -> Template filling。",
      nextConsumer: "构建阶段把确认后的内容填进模板。",
      freedom: "limited",
      hookClose: "方向确认后，模板才开始有用。下一步把内容做成可安装 skill。",
      challenges: [
        "如果用户说不像乔布斯，但没有具体指出问题，你会怎么回到证据？",
        "如果用户要更多模型，什么时候应该拒绝？",
        "摘要需要多少细节才够确认方向？"
      ]
    },
    {
      id: "stage-build",
      phase: "Phase 3",
      kicker: "Skill 构建",
      title: "用模板生成可运行的 SKILL.md",
      summary: "我把确认后的提炼结果填进模板，并从模型反推 Agentic Protocol。",
      hookOpen: "内容方向已确认。现在我要读模板，把结果组装成真正能被安装的 skill。",
      preTest: "一个模板最容易被误用成填空题。Nuwa 里面哪一段最不能机械复制？",
      narrativeBody: [
        { kind: "para", text: "我读取 `references/skill-template.md`。模板负责 frontmatter、角色规则、身份卡、心智模型、启发式、表达 DNA、时间线、价值观、边界和来源。" },
        { kind: "para", text: "最不能机械复制的是 Agentic Protocol。Nuwa 要求我从人物模型反推研究维度。乔布斯评产品，要看体验、设计细节、技术路线、市场时机。芒格评公司，会更关心护城河、激励机制和逆向风险。" },
        { kind: "code", lang: "markdown", text: "## 回答工作流（Agentic Protocol）\n\n### Step 1: 问题分类\n需要事实的问题 -> 先研究再回答\n纯框架问题 -> 直接用心智模型回答\n混合问题 -> 先获取案例事实，再用框架分析\n\n### Step 2: 乔布斯式研究\n- 看产品体验\n- 看设计细节\n- 看技术路线\n- 看市场时机" },
        { kind: "para", text: "这样生成出来的 Jobs skill 遇到 Vision Pro 这类问题，不会直接凭记忆说话。它会先查最新评测、价格、留存、生态和竞品，再用乔布斯的模型判断。"
        }
      ],
      reusableMove: "模板负责完整性，协议负责运行方式。别让模板把所有人物压成同一个工作流。",
      receives: "确认后的提炼内容。",
      reads: "`references/skill-template.md`、Phase 3 Agentic Protocol 生成指引。",
      blockedShortcut: "不能只填角色人设，也不能把研究维度写成通用搜索相关信息。",
      action: "生成最终 `SKILL.md`，并加入人物特定工作流。",
      output: "`steve-jobs-perspective/SKILL.md`。",
      painPoint: "没有 Agentic Protocol，成品 skill 会在事实问题上退回旧记忆。",
      mechanismThread: "Confirmed models -> Template -> Generated protocol。",
      nextConsumer: "验证阶段用最终 SKILL.md 做测试。",
      freedom: "creative",
      hookClose: "文件写完还没结束。Nuwa 要我用问题测试它是否真的工作。",
      challenges: [
        "如果人物没有明确产品模型，Agentic Protocol 怎么推导？",
        "如果用户只要角色扮演，是否还需要事实研究步骤？",
        "模板默认规则和人物表达冲突时，以哪个为准？"
      ]
    },
    {
      id: "stage-validate",
      phase: "Phase 4-5",
      kicker: "验证和精炼",
      title: "用问题测试生成物，而不是只读一遍",
      summary: "我用已知题、边界题和风格题测试，再做结构精炼。",
      hookOpen: "最终 SKILL.md 已经生成。本能会交付。Nuwa 要我先验证。",
      preTest: "你会怎么判断一个人物 skill 合格？读起来像，还是能在新问题上表现出边界？",
      narrativeBody: [
        { kind: "para", text: "Phase 4 用三类题测试：已知测试看方向是否和公开立场一致；边缘测试看未知问题上是否过度确定；风格测试看 100 字回答是不是通用 AI 味。" },
        { kind: "code", lang: "bash", text: "python3 scripts/quality_check.py .claude/skills/steve-jobs-perspective/SKILL.md" },
        { kind: "para", text: "脚本检查结构项：心智模型数量、模型局限、表达 DNA、诚实边界、内在张力、一手来源占比。脚本不能替代判断，但能抓住容易漏掉的硬项。" },
        { kind: "para", text: "通过后，Phase 5 再从 skill 可操作性和触发条件角度精炼。它要求改动必须让 skill 激活后更知道先做什么，而不是单纯加内容。"
        }
      ],
      reusableMove: "把验证写进交付流程。结构脚本查硬项，问题测试查行为。",
      receives: "最终 SKILL.md。",
      reads: "`scripts/quality_check.py`、Phase 4 验证标准、Phase 5 双 Agent 精炼标准。",
      blockedShortcut: "不能把看起来完整当作行为正确。",
      action: "运行结构检查，做三类行为测试，必要时回到 Phase 2 修复。",
      output: "通过的 skill 或带诚实边界的当前最优版本。",
      painPoint: "人物 skill 可以很像、很长、很完整，但仍然在未知问题上胡说。",
      mechanismThread: "Generated skill -> Tests -> Refinement -> Delivery。",
      nextConsumer: "用户拿到可安装的 skill 包。",
      freedom: "limited",
      hookClose: "Nuwa 交付的不是一篇说明，而是一个经过证据、提炼和验证约束的 skill 包。",
      challenges: [
        "如果两轮迭代后仍有不通过项，为什么不无限打磨？",
        "脚本通过但风格测试失败，问题更可能在哪一段？",
        "怎么把验证失败写进诚实边界，而不是藏起来？"
      ]
    }
  ],

  glossary: [
    {
      term: "心智模型",
      definition: "一个人反复用来判断问题的看法。它不是一句他说过的话，而是可以迁移到新问题的镜片。",
      whereItAppears: "Phase 2 三重验证，最终人物 skill 的核心章节。",
      solvedProblem: "防止把熟悉语录和漂亮观点误当成核心能力。",
      howToUse: "遇到候选观点时，检查它是否跨场景出现、能推断新问题、具有独特性。",
      commonMisread: "不要把所有名言都叫心智模型。只在一个场景出现的观点通常只能做案例或启发式。"
    },
    {
      term: "决策启发式",
      definition: "做判断时的快捷规则，通常能写成如果看到 X，就先做 Y。",
      whereItAppears: "Phase 2.2 和最终 `SKILL.md` 的决策启发式章节。",
      solvedProblem: "防止 skill 只有理论，不能指导下一步行动。",
      howToUse: "把没有完全通过三重验证、但有案例支撑的规则降级放在这里。",
      commonMisread: "它不是低质量内容。它只是比心智模型更具体、更靠近场景。"
    },
    {
      term: "表达 DNA",
      definition: "这个人说话和写作的习惯，包括句式、节奏、确定性、类比和不用的词。",
      whereItAppears: "Phase 2.3、最终人物 skill 的表达 DNA 章节。",
      solvedProblem: "防止角色回答变成通用 AI 口吻，或只会重复口癖。",
      howToUse: "把研究里的语言特征转成可执行风格规则，例如先结论、短句、高确定性。",
      commonMisread: "不是越像模仿秀越好。过量口癖会变成 caricature。"
    },
    {
      term: "诚实边界",
      definition: "skill 明确写出自己不知道什么、哪些是推断、信息截止到什么时候。",
      whereItAppears: "Phase 2.6、最终 `SKILL.md`、验证失败后的交付说明。",
      solvedProblem: "防止公开资料不足时还装成完整人格。",
      howToUse: "把薄弱维度、二手来源、近期变化、公开表达和真实想法的差距写清楚。",
      commonMisread: "不是一句泛泛的免责声明。边界必须具体到维度。"
    },
    {
      term: "Agentic Protocol",
      definition: "成品 skill 自己的行动流程。它告诉 AI 遇到不同问题时先分类、先查什么、再怎么回答。",
      whereItAppears: "Phase 3 构建阶段，放在角色规则之后。",
      solvedProblem: "防止人物 skill 在当前事实问题上凭旧记忆编。",
      howToUse: "从人物的心智模型反推研究维度，而不是套通用搜索清单。",
      commonMisread: "它不是附加说明。它决定成品 skill 是否能可靠工作。"
    },
    {
      term: "六路调研",
      definition: "把一个人的证据拆成著作、对话、表达、他者评价、重大决策和时间线六个方向。",
      whereItAppears: "Phase 1，多源信息采集。",
      solvedProblem: "防止用一个来源理解整个人。",
      howToUse: "每个方向写入对应研究文件，后面检查点只读这些文件。",
      commonMisread: "不是越多越好，而是每一路要看到不同真相。"
    },
    {
      term: "来源质量阶梯",
      definition: "不同来源有不同可信度。用户提供的一手素材、本人原文、长访谈和实际决策优先。",
      whereItAppears: "Phase 1 信息源优先级和黑名单。",
      solvedProblem: "防止弱来源用强语气进入最终 skill。",
      howToUse: "每条信息标注一手、二手或推断，中文来源排除知乎、微信公众号和百度百科。",
      commonMisread: "来源排序不能替代判断。它只是让判断不把材料混成一团。"
    },
    {
      term: "自包含 skill 包",
      definition: "复制整个 skill 目录就能独立使用，研究、来源、脚本、最终 SKILL.md 都在里面。",
      whereItAppears: "Phase 0.5 创建目录和 File Map。",
      solvedProblem: "防止 skill 依赖作者机器上的外部临时文件。",
      howToUse: "调研必须写进 `references/research/`，素材放进 `sources/`，脚本放进 `scripts/`。",
      commonMisread: "不是把所有大文件都塞进上下文，而是把可追溯材料放在包里。"
    }
  ],

  fileMap: [
    {
      path: "SKILL.md",
      role: "Nuwa 的入口和行为合同。",
      generatedBy: "作者维护，不由运行时生成。",
      readBy: "执行 Nuwa 的 agent。",
      owns: "入口分流、阶段顺序、检查点、研究规则、构建规则、验证规则。",
      doesNotOwn: "具体人物的所有研究内容和最终人物 skill 的详细模板。",
      failureIfWrong: "Agent 会跳过关键停顿，或者把角色模仿当成 skill 生成。"
    },
    {
      path: "references/extraction-framework.md",
      role: "把原始材料提炼成模型的方法说明。",
      generatedBy: "作者维护。",
      readBy: "Phase 2 提炼阶段和质量自检阶段。",
      owns: "三重验证、表达 DNA 方法、矛盾处理、信息不足处理、质量自检清单。",
      doesNotOwn: "具体某个人的模型答案。",
      failureIfWrong: "好听观点会被升级成核心模型，矛盾会被抹平。"
    },
    {
      path: "references/skill-template.md",
      role: "最终人物 skill 的结构模板。",
      generatedBy: "作者维护。",
      readBy: "Phase 3 构建阶段。",
      owns: "frontmatter、角色规则、身份卡、模型、启发式、表达 DNA、时间线、边界、来源结构。",
      doesNotOwn: "人物特定研究维度和具体内容。",
      failureIfWrong: "生成的 skill 缺 section，或触发条件不完整。"
    },
    {
      path: "scripts/download_subtitles.sh",
      role: "从 YouTube 下载字幕，优先人工字幕和中文英文。",
      generatedBy: "作者维护。",
      readBy: "需要视频 transcript 的研究阶段。",
      owns: "字幕获取的命令流程和语言优先级。",
      doesNotOwn: "字幕内容的可信度判断。",
      failureIfWrong: "访谈和演讲材料难以转成可研究文本。"
    },
    {
      path: "scripts/srt_to_transcript.py",
      role: "把 SRT 或 VTT 清洗成可读 transcript。",
      generatedBy: "作者维护。",
      readBy: "研究阶段处理字幕素材时调用。",
      owns: "去时间戳、去序号、去 HTML 标签、连续重复行去重。",
      doesNotOwn: "语义总结和模型提炼。",
      failureIfWrong: "研究文件会充满时间戳和重复行，后面提炼成本变高。"
    },
    {
      path: "scripts/merge_research.py",
      role: "生成 Phase 1.5 的研究质量摘要。",
      generatedBy: "作者维护。",
      readBy: "研究检查点。",
      owns: "扫描六份研究文件、统计来源、提取关键发现、检测显式矛盾标记。",
      doesNotOwn: "判断某个模型是否成立。",
      failureIfWrong: "检查点会变成主观汇报，看不出来源薄弱和缺失维度。"
    },
    {
      path: "scripts/quality_check.py",
      role: "检查最终 SKILL.md 的结构通过项。",
      generatedBy: "作者维护。",
      readBy: "Phase 4 质量验证。",
      owns: "心智模型数量、局限、表达 DNA、诚实边界、内在张力、一手来源占比这些硬项。",
      doesNotOwn: "回答质量、人物判断是否真的像。",
      failureIfWrong: "结构缺陷容易被漂亮 prose 遮住。"
    },
    {
      path: "generated-skill/references/research/01-06*.md",
      role: "每个生成 skill 的研究证据层。",
      generatedBy: "Phase 1 六路调研。",
      readBy: "Phase 1.5、Phase 2、最终来源附录。",
      owns: "每个维度的原始发现、来源、置信度和矛盾。",
      doesNotOwn: "最终模型排序。",
      failureIfWrong: "提炼阶段没有可追溯证据，只能凭印象写。"
    },
    {
      path: "examples/*-perspective/SKILL.md",
      role: "已生成的人物或主题 skill 示例。",
      generatedBy: "Nuwa 历史运行结果或作者整理。",
      readBy: "读者和维护者，用来校准输出形状。",
      owns: "示例效果和已跑通的结构样子。",
      doesNotOwn: "Nuwa 的规范。规范在入口 skill 和 references 里。",
      failureIfWrong: "读者会复制样例表面，而不是复制背后的行为控制。"
    }
  ],

  designChoices: [
    {
      title: "入口先分流，不把所有请求都当成蒸馏人名",
      looksUnnecessaryBecause: "看起来只是多一个判断表，直接问用户要蒸馏谁也能开始。",
      badScenario: "用户只有模糊需求时，AI 硬塞一个名人；用户已经给了明确对象时，AI 又问太多无关问题。",
      constraint: "Phase 0 先区分明确人名和模糊需求。明确对象走直接路径，模糊需求最多追问 1-2 轮再推荐候选。",
      solvedProblem: "让后续研究目标和用户问题匹配，不把诊断工作和蒸馏工作混在一起。",
      reusableMove: "在技能入口处按用户起点分路，而不是按作者心里的理想流程分路。",
      counterScenarios: [
        { when: "人物或主题很明确", effect: "管用", why: "少问，直接推进，用户不会被流程拖住。" },
        { when: "高风险医疗或法律建议", effect: "得让一步", why: "少问不一定安全，必须补足关键背景。" },
        { when: "一次性玩笑角色扮演", effect: "用不上", why: "用户只要一段语气文本，不需要完整入口诊断。" }
      ]
    },
    {
      title: "调研前先建目录",
      looksUnnecessaryBecause: "很多人习惯先搜资料，等有结果再整理文件。",
      badScenario: "研究散在对话、临时笔记和浏览器里，后面无法验收，也无法把 skill 复制给别人。",
      constraint: "Phase 0.5 先创建自包含目录，六个研究方向必须写入 `references/research/`。",
      solvedProblem: "让证据从一开始就变成可检查、可复用、可分发的包内材料。",
      reusableMove: "先规定成果物的位置，再开始做容易散开的探索工作。",
      counterScenarios: [
        { when: "要做长期复用的 skill", effect: "管用", why: "后续检查和开源分发都依赖稳定文件。" },
        { when: "只做 20 分钟快速评估", effect: "可以简化", why: "可以只建一个临时 research.md，不必六份文件。" },
        { when: "完全在线、无文件系统的聊天环境", effect: "用不上", why: "没有可写目录，只能用结构化回答替代。" }
      ]
    },
    {
      title: "六路调研而不是一个来源总结",
      looksUnnecessaryBecause: "读一本传记或几篇长文似乎已经能抓住人物核心。",
      badScenario: "Skill 只反映某个作者眼里的乔布斯，忽略临场反应、争议、行为和观点演化。",
      constraint: "Phase 1 把研究拆成著作、对话、表达、他者评价、决策、时间线六个方向。",
      solvedProblem: "让人物理解同时覆盖说了什么、怎么说、怎么做、别人怎么看、随时间如何变化。",
      reusableMove: "把复杂对象拆成能互相纠错的证据面。",
      counterScenarios: [
        { when: "公开人物、有大量资料", effect: "管用", why: "多源能显著减少单一叙事偏差。" },
        { when: "冷门人物公开信息很少", effect: "得让一步", why: "六路可能凑不齐，要减少模型数量并加强边界。" },
        { when: "纯主题工具箱", effect: "看情况", why: "要按流派或子领域重分维度，而不是照搬六路人物调研。" }
      ]
    },
    {
      title: "两个检查点挡住昂贵返工",
      looksUnnecessaryBecause: "检查点会打断节奏，尤其是 agent 已经能继续写。",
      badScenario: "研究质量差或提炼方向错，但最终 SKILL.md 写得很完整，用户只能大面积返工。",
      constraint: "Phase 1.5 展示调研质量，Phase 2.5 展示提炼摘要。用户确认后才进入下一阶段。",
      solvedProblem: "把返工放在成本低的位置。",
      reusableMove: "在材料质量和主观判断这两个地方停，而不是等到最终产物后停。",
      counterScenarios: [
        { when: "长期可复用的 skill", effect: "管用", why: "一次确认可以省掉整份 skill 的重写。" },
        { when: "用户明确要求全自动", effect: "得让一步", why: "可以把检查点变成记录和假设，不要求立即回复。" },
        { when: "小修一个已有 section", effect: "没必要", why: "变更范围很小，检查点成本超过收益。" }
      ]
    },
    {
      title: "三重验证才允许叫心智模型",
      looksUnnecessaryBecause: "读者可能觉得模型名只是表达方式，不需要这么严格。",
      badScenario: "每句名言都被包装成模型，最终 skill 看起来丰富，其实没有判断力。",
      constraint: "候选观点必须跨域复现、有生成力、有排他性。只过一两个就降级为启发式。",
      solvedProblem: "让核心模型少而硬，避免通用聪明话占据中心。",
      reusableMove: "给概念升级设置门槛，尤其是在容易被漂亮语言诱惑的任务里。",
      counterScenarios: [
        { when: "人物视角、专家视角 skill", effect: "管用", why: "核心模型直接决定后续回答质量。" },
        { when: "操作手册型 skill", effect: "可以松点", why: "有些规则只要可执行，不需要独特性。" },
        { when: "短期风格改写 prompt", effect: "用不上", why: "目标不是判断新问题，而是改写一段文本。" }
      ]
    },
    {
      title: "Agentic Protocol 从人物模型推导",
      looksUnnecessaryBecause: "成品 skill 已经有模型和风格了，似乎可以直接回答。",
      badScenario: "人物 skill 遇到当前事实问题时，保持口吻但编旧信息。",
      constraint: "Phase 3 要把人物模型转成问题分类和研究维度。需要事实的问题必须先查再回答。",
      solvedProblem: "让成品 skill 在事实敏感场景里保持可靠，而不是只保持语气。",
      reusableMove: "把知识结构转成行动流程。模型不是展示品，要改变 agent 的下一步。",
      counterScenarios: [
        { when: "活人、公司、产品、市场问题", effect: "管用", why: "事实变化会直接影响答案。" },
        { when: "抽象人生建议", effect: "不用做", why: "没有当前事实依赖，直接用模型就够。" },
        { when: "没有联网或工具环境", effect: "得让一步", why: "要改成要求用户提供事实，或明确边界。" }
      ]
    },
    {
      title: "脚本接管脆弱检查",
      looksUnnecessaryBecause: "来源数、section 数、字幕清洗这些事人眼也能看。",
      badScenario: "Agent 手动数错来源、漏掉边界 section，或者把字幕时间戳带进研究材料。",
      constraint: "`download_subtitles.sh`、`srt_to_transcript.py`、`merge_research.py`、`quality_check.py` 分别处理可自动化的步骤。",
      solvedProblem: "把重复、易错、格式化的工作从模型判断里拿出来。",
      reusableMove: "凡是能被确定性检查的脆弱步骤，优先交给脚本。",
      counterScenarios: [
        { when: "有文件系统和可运行脚本", effect: "管用", why: "能直接减少手工错误。" },
        { when: "脚本环境不可控", effect: "看情况", why: "要写清依赖和失败替代路径。" },
        { when: "一次性短回答", effect: "没必要", why: "脚本成本比错误风险更高。" }
      ]
    }
  ],

  patterns: [
    {
      name: "按用户起点分路",
      status: "可复用",
      prevents: "把明确请求和模糊需求都塞进同一个流程，导致该问的不问、不该问的问太多。",
      therefore: "先判断用户已经给了什么，再决定下一步是推进、确认还是推荐候选。",
      useWhen: "一个 skill 有多种入口，例如明确对象、模糊目标、更新已有成果、只用本地材料。",
      howToReuse: "在 `SKILL.md` 开头放入口表。每条路径写清触发条件、最少确认项、默认值和下一阶段。",
      antiExample: "只是列触发词，不说明不同触发词会改变流程。",
      cost: "路径太多会没人执行。超过三四条时要合并。",
      seenIn: "Nuwa 的 Phase 0，直接路径和诊断路径。",
      relatedPatterns: [
        { to: "p4", label: "便宜返工点", relation: "搭配用：分流后的方向通常要在检查点确认。" },
        { to: "p8", label: "边界写进产物", relation: "下游接管：分流判断会影响最终边界。" }
      ]
    },
    {
      name: "六路取证",
      status: "可复用",
      prevents: "从一个方便来源就开始总结复杂对象。",
      therefore: "把证据拆成互相补足、互相纠错的几个面。",
      useWhen: "skill 依赖对人物、领域、组织或市场的深度理解。",
      howToReuse: "先写证据维度表。每个维度有搜索目标、提取重点、输出文件和来源要求。",
      antiExample: "把六个 agent 都派去搜同一类文章，只是数量更多。",
      cost: "慢，耗上下文。冷门对象要缩小维度并加重诚实边界。",
      seenIn: "Nuwa 的著作、对话、表达、他者、决策、时间线六个研究 agent。",
      relatedPatterns: [
        { to: "p3", label: "来源质量阶梯", relation: "前置：多源不等于都可信。" },
        { to: "p4", label: "便宜返工点", relation: "搭配用：多源结果需要先验收再综合。" }
      ]
    },
    {
      name: "来源质量阶梯",
      status: "可复用",
      prevents: "把本人原文、二手总结和推测放在同一置信度里。",
      therefore: "先给材料分层，再让强材料决定核心判断。",
      useWhen: "输出会影响长期判断，或事实错误会让 skill 变得不可信。",
      howToReuse: "在 skill 里写清来源等级、优先级、黑名单和标注规则。让研究文件记录来源类型。",
      antiExample: "只说优先权威来源，但不告诉 agent 哪些来源该排除。",
      cost: "会减少可用材料数量。资料少时要降低模型数量。",
      seenIn: "Nuwa 的用户一手素材最高权重、中文来源黑名单、信息不足处理。",
      relatedPatterns: [
        { to: "p2", label: "六路取证", relation: "搭配用：多路证据需要质量分层。" },
        { to: "p8", label: "边界写进产物", relation: "下游接管：弱来源最后要进入诚实边界。" }
      ]
    },
    {
      name: "便宜返工点",
      status: "可复用",
      prevents: "等到最终产物完整后才发现材料差或方向错。",
      therefore: "在昂贵工作之前停一下，只展示足够判断方向的摘要。",
      useWhen: "后面要进入长文、代码、视频、设计或主观综合。",
      howToReuse: "找两个地方：材料质量刚形成时、核心判断刚形成时。每个点只展示摘要和风险，不展示完整产物。",
      antiExample: "每一步都请用户确认，导致流程变成审批链。",
      cost: "会打断自动化。全自动模式要改成记录假设，而不是等待用户。",
      seenIn: "Nuwa 的 Phase 1.5 调研检查点和 Phase 2.5 提炼检查点。",
      relatedPatterns: [
        { to: "p1", label: "按用户起点分路", relation: "搭配用：分路后确认方向。" },
        { to: "p5", label: "三关筛选", relation: "前置：筛选结果进入第二个检查点。" }
      ]
    },
    {
      name: "三关筛选",
      status: "可复用",
      prevents: "把好听、熟悉、权威的话直接升级成核心规则。",
      therefore: "概念要升格，必须通过明确标准。",
      useWhen: "skill 要提炼原则、模型、判断标准或专家视角。",
      howToReuse: "为核心概念写 2-4 个升级条件。没完全通过的内容降级，不要硬删。",
      antiExample: "只按作者喜欢程度排序模型。",
      cost: "会把一些有用但不够深的东西挤出去。给它们安排启发式或案例位置。",
      seenIn: "Nuwa 的跨域复现、生成力、排他性三重验证。",
      relatedPatterns: [
        { to: "p2", label: "六路取证", relation: "前置：没有多源证据就无法判断跨域复现。" },
        { to: "p6", label: "模型变行动协议", relation: "下游接管：通过的模型会生成研究维度。" }
      ]
    },
    {
      name: "模型变行动协议",
      status: "可复用",
      prevents: "skill 有理论但不会改变 agent 的下一步。",
      therefore: "每个核心模型都要能推导出某类行动、检查或研究维度。",
      useWhen: "生成的 skill 要在未来问题里继续工作，而不是只输出一段文本。",
      howToReuse: "在最终 skill 里写问题分类、触发条件、工具要求、研究维度和回答方式。研究维度必须来自模型。",
      antiExample: "写一段通用的先搜索相关信息，再回答。",
      cost: "会让成品 skill 更长，也要求工具可用。无工具环境要提供替代路径。",
      seenIn: "Nuwa 生成的乔布斯 Agentic Protocol：看产品体验、设计细节、技术路线、市场时机。",
      relatedPatterns: [
        { to: "p5", label: "三关筛选", relation: "前置：只有真模型才值得推导行动。" },
        { to: "p8", label: "边界写进产物", relation: "搭配用：工具不可用时必须说明边界。" }
      ]
    },
    {
      name: "脚本接管脆弱步骤",
      status: "可复用",
      prevents: "让模型手工做格式清洗、数量统计和结构检查，结果经常漏。",
      therefore: "能确定性处理的步骤，放到 `scripts/`。",
      useWhen: "任务包含重复解析、文件扫描、计数、格式转换或硬性检查。",
      howToReuse: "把脚本的输入、输出、失败条件写在 skill 里。让 agent 知道什么时候调用。",
      antiExample: "有脚本但 skill 不说什么时候用，最后还是靠模型手工做。",
      cost: "脚本有运行环境依赖，需要维护和测试。",
      seenIn: "Nuwa 的字幕下载、字幕清洗、调研合并、质量检查脚本。",
      relatedPatterns: [
        { to: "p4", label: "便宜返工点", relation: "搭配用：脚本可以生成检查点摘要。" },
        { to: "p8", label: "边界写进产物", relation: "可能冲突：脚本失败时不能假装检查完成。" }
      ]
    },
    {
      name: "边界写进产物",
      status: "可复用",
      prevents: "skill 看起来全知，实际上依赖公开资料和推断。",
      therefore: "把不知道什么、资料弱在哪、信息截止时间写进最终交付物。",
      useWhen: "skill 基于不完整资料、公开信息、推断或会变化的现实。",
      howToReuse: "在最终产物加固定边界 section。边界来自研究缺口、来源质量、验证失败和时间性。",
      antiExample: "最后加一句仅供参考。",
      cost: "会让输出显得不那么神奇，但更可信。",
      seenIn: "Nuwa 的诚实边界、冷门人物处理、活人最新动态处理。",
      relatedPatterns: [
        { to: "p3", label: "来源质量阶梯", relation: "前置：弱来源决定边界内容。" },
        { to: "p6", label: "模型变行动协议", relation: "搭配用：事实会变时先查，查不到就说边界。" }
      ]
    }
  ],

  applyIt: {
    h1: "把 Nuwa 的形状偷到你的 skill 里",
    summary: "不要照搬六路调研。先问你的 skill 最容易制造什么坏结果，再挑 2-4 个机制。",
    checklistTitle: "起手清单",
    checklistHeading: "从坏 AI 输出反推到 skill 形状",
    checklist: [
      "写下默认 AI 会怎么偷懒。用可观察症状写，不要写抽象缺点。",
      "判断用户入口有几种。明确对象、模糊需求、更新已有结果是否需要不同路径。",
      "给探索工作规定文件位置。后面要检查的东西，前面必须保存下来。",
      "在昂贵工作前放一个检查点。让用户或脚本能看到材料质量和方向。",
      "给核心概念设置升级标准。不要让好听的话直接进入中心。",
      "把核心模型转成行动协议。问：它会改变 agent 下一步做什么？",
      "把可计数、可解析、可转换的脆弱步骤放进脚本。",
      "把不知道什么写进最终产物，而不是藏在交付说明里。"
    ],
    starterPrompt: "我想写一个 skill，目标是 <任务>。\n\n先不要写 SKILL.md。\n请先帮我找默认 AI 在这个任务里最容易出现的 5 个坏结果。每个坏结果要写：\n- 用户以为问题是什么\n- 真正会错在哪里\n- 第一个可观察症状是什么\n- skill 可以用什么机制拦住\n- 这个机制应该放在 SKILL.md、references、scripts、examples 还是 tests\n\n然后只挑 2-4 个最必要机制，给我一个最小可测试的 skill 结构。",
    nextSteps: {
      author: [
        "检查你的 `SKILL.md` 是否承担了太多细节。能移到 references 或 scripts 的，不要塞在入口。",
        "给每个检查点写明用户看到什么，下一阶段以什么为准。",
        "把 examples 标成校准材料，不要让读者误以为 examples 是规范。",
        "为脚本写清输入、输出和失败处理。"
      ],
      thief: [
        "先偷入口分流和检查点。这两个通常最便宜，也最能改变行为。",
        "如果你的 skill 依赖研究，偷六路取证的形状，但按你的领域重分维度。",
        "如果你的 skill 要长期使用，偷 Agentic Protocol，让成品知道什么时候先查资料。",
        "不要偷完整 Nuwa 流程到小任务里。小任务只需要两三个机制。"
      ]
    }
  }
};
