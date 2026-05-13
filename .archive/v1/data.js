window.handbook = {
  meta: {
    title: "女娲 Skill 造人术解剖手册",
    skillName: "女娲 Skill 造人术",
    audience: "想偷招的人 / 还没用过这个 skill 的 AI",
    sourcePath: "/Users/guwanhua/git/nuwa-skill",
    outputMode: "multi-page-web-handbook",
    version: "v1",
    generatedFor: "看清女娲怎样把一个人名、主题或模糊需求，变成有证据、有边界、能调用的人物 Skill。"
  },

  overview: {
    h1: "看见女娲在做什么",
    oneLiner: "普通 AI 拿到“帮我做一个某某视角 Skill”，很容易直接写一份像角色扮演 prompt 的文件。女娲把这件事改成一条可检查的生产线：先确认对象，再保存证据，再提炼框架，最后验证这个 Skill 能不能面对新问题工作。",
    openingScene: [
      { kind: "para", text: "先看一件很常见的坏事。用户说：“帮我做一个塔勒布的视角 Skill，我想用来判断投资风险。”" },
      { kind: "para", text: "不用女娲时，我很容易马上开始写：“你现在是塔勒布，请用反脆弱、黑天鹅、皮肤在场来回答问题。”看起来命中了关键词。" },
      { kind: "para", text: "问题从第二轮开始露出来。用户问：“最近这家公司债务结构变了，还能投吗？”我没有查最新事实，只用旧印象讲一段风险很大、要反脆弱。话很像，判断却没有证据。" },
      { kind: "para", text: "再坏一点，我会把所有聪明人都会同意的话塞进去：长期主义、逆向思考、保持谨慎、不要过度自信。删掉塔勒布三个字，这份 Skill 还是能套给芒格、费曼、任何人。" },
      { kind: "para", text: "还有一种坏法更隐蔽。我会挑几句名言堆起来，像是“语气像了”。但 Skill 遇到一个新问题时，不知道先看尾部风险、激励结构、历史极端案例，还是先看别的。它只能模仿，不会工作。" },
      { kind: "para", text: "这就是女娲要防的默认结果：像一个人说话，却没有那个人的判断流程；有很多结论，却没有证据库存；写得很完整，却不承认它不知道什么。" },
      { kind: "list", items: [
        "没有证据：它不知道哪些材料是一手、哪些只是别人转述。",
        "没有筛选：它把金句、常识、真正的心智模型混在一起。",
        "没有检查点：它从人名一路写到成品，中间没有让用户确认方向。",
        "没有事实流程：它遇到最新问题时凭记忆编。"
      ]}
    ],
    predictPrompt: "如果你来修这个问题，会先加什么？是让 AI 写得更像这个人，还是让它先搜更多资料，还是给成品加免责声明？先写下你的猜测，再看女娲把任务拆成了哪几段。",
    primerBeats: [
      { kind: "para", text: "女娲的起点很朴素：人物 Skill 不是语气包。它要让 AI 用另一个人的框架看新问题。" },
      { kind: "diagram", id: "orientation-map" },
      { kind: "para", text: "所以我一进来不能直接写成品。女娲先让我判断用户是在点名一个人，还是只说了一个困惑。点名就走直接路径；只说困惑，就先诊断需求，再推荐蒸馏对象。" },
      { kind: "para", text: "确认对象后，我还不能调研。我要先建一个自包含目录。后面的六份调研、原始素材、脚本和最后的 SKILL.md 都放进去。这样这个 Skill 被复制到别的机器上时，不会丢证据。" },
      { kind: "para", text: "调研不是“搜几篇文章”。女娲把证据拆成六个角度：著作、长对话、碎片表达、他者视角、决策记录、时间线。每个角度都写到单独文件里。" },
      { kind: "para", text: "提炼阶段只从这些文件里取材料。一个观点要成为心智模型，必须通过三道检查：它在多个领域出现过；它能推断新问题；它不是所有聪明人都会这么想。" },
      { kind: "para", text: "写成品时，女娲不只写“他怎么说话”。它还要生成回答工作流：遇到需要事实支撑的问题，人物 Skill 先查哪些事实，再用自己的框架回答。" },
      { kind: "para", text: "最后还有验证。已知问题看方向是否一致，陌生问题看它是否会承认不确定，风格测试看它是不是又滑回通用 AI。检查发现问题，要回去修，不是把 fail 列给用户看。" }
    ],
    wowSetup: "最能看出女娲价值的地方，是同一个“事实问题”到了不同人物 Skill 里，研究入口会不一样。下面用一张表看：同样问“这家公司还能不能投”，女娲不会给所有人物写同一套搜索清单。",
    wowDiagramId: "persona-compare",
    wowMoment: "女娲真正生成的不是“说话像某人”的外壳，而是“这个人遇到事实问题会先看什么”的路线。塔勒布先看尾部风险和谁承担后果；芒格先看激励和反面案例；费曼先拆到可验证的基本事实。",
    badResults: [
      {
        title: "把人物 Skill 写成角色扮演 prompt",
        aiDefault: "我直接写“你现在是某某，请用他的语气回答”。第一轮像，第二轮开始空。",
        skillIntervention: "女娲先建证据库，再提炼心智模型，最后才写 SKILL.md。语气只是其中一层。"
      },
      {
        title: "把金句当心智模型",
        aiDefault: "我看到一句很有名的话，就把它升成核心框架。",
        skillIntervention: "女娲要求三重验证。不能跨领域复现、不能推断新问题、没有排他性的观点，不允许升格。"
      },
      {
        title: "一口气跑完整个项目",
        aiDefault: "用户点名塔勒布，我马上调研、提炼、写成品，中间不让用户看来源和方向。",
        skillIntervention: "女娲设置调研 review 和提炼确认。前面错，就在还便宜的时候改。"
      },
      {
        title: "调研结果散在外面",
        aiDefault: "我把临时笔记放在别的目录，最后只交付一个 SKILL.md。",
        skillIntervention: "女娲要求所有调研文件在 Skill 目录内部。复制整个目录，就能带走证据。"
      },
      {
        title: "遇到最新事实直接编",
        aiDefault: "人物 Skill 面对最新公司、政策、产品时，凭训练记忆写一段。",
        skillIntervention: "女娲生成 Agentic Protocol。需要事实的问题先查，再用人物框架判断。"
      }
    ],
    shapeReason: "按读者想偷招的顺序排，不按源文件顺序排",
    chapterLogic: [
      { chapter: "01 Overview", why: "先看普通 AI 怎么做坏，再讲女娲为什么要拆成证据、提炼、构建、验证。" },
      { chapter: "02 Walkthrough", why: "读者已经知道大形状，接着用塔勒布例子看我作为 AI 每一步怎么被约束。" },
      { chapter: "03 Glossary", why: "流程里出现的重词单独解释，避免读者把心智模型、启发式、表达 DNA 混在一起。" },
      { chapter: "04 File Map", why: "概念清楚后再看文件职责，读者才知道每份文件为什么存在。" },
      { chapter: "05 Design Choices", why: "文件和流程都看过后，再判断哪些规则是设计选择，不是随手写的流程。" },
      { chapter: "06 Patterns", why: "把具体选择抽成别的 skill 也能用的招。" },
      { chapter: "07 Apply It", why: "最后才给起手清单，因为读者已经知道每条清单背后防的坏结果。" }
    ]
  },

  example: {
    label: "塔勒布贯穿例子",
    userRequest: "蒸馏一个塔勒布的视角 Skill，用来帮我判断投资和产品决策里的尾部风险。我没有本地素材，你直接做。",
    whyThisExample: "它走女娲最核心的主路径：明确人物、新建 Skill、无本地素材、网络调研、人物视角，而不是主题 Skill 或更新已有 Skill。",
    expectedOutput: "`.claude/skills/taleb-perspective/SKILL.md`，并带上 `references/research/01-06.md` 六份调研文件、来源记录、心智模型、决策启发式、表达 DNA、诚实边界、回答工作流和质量验证结果。"
  },

  diagrams: [
    {
      id: "orientation-map",
      type: "orientation",
      kicker: "orientation",
      title: "从一句请求到可运行人物 Skill",
      description: "女娲把任务拆成五段：分流、存证、收集、提炼、验证。",
      image: "assets/diagrams/orientation-map.svg"
    },
    {
      id: "persona-compare",
      type: "compare",
      kicker: "compare",
      title: "同一个事实问题，不同人物先查的东西不同",
      description: "Agentic Protocol 由人物的心智模型反推，不是同一张通用搜索清单。",
      image: "assets/diagrams/persona-compare.svg"
    },
    {
      id: "main-flow",
      type: "flow",
      kicker: "walkthrough map",
      title: "女娲运行主流程",
      description: "9 个 stage 分成确认、证据、提炼、构建、验证五段。",
      image: "assets/diagrams/main-flow.svg"
    },
    {
      id: "package-map",
      type: "package",
      kicker: "package map",
      title: "文件怎么协作",
      description: "入口、方法论、模板、脚本、调研文件和 examples 各自承担不同责任。",
      image: "assets/diagrams/package-map.svg"
    },
    {
      id: "pattern-network",
      type: "network",
      kicker: "pattern network",
      title: "7 个可复用设计招之间的关系",
      description: "分流、存证、检查点、三重验证和修复闭环互相支撑。",
      image: "assets/diagrams/pattern-network.svg"
    }
  ],

  walkthrough: [
    {
      id: "route-input",
      phase: "Phase 0 · 入口分流",
      title: "先判断用户到底给了什么",
      summary: "我不能把所有请求都当“明确人名”处理。女娲先让我分清：用户是在点名，还是只说了一个困惑。",
      hookOpen: "用户刚把请求发来。现在还没有任何目录、调研和成品，最容易犯的错是直接开写。",
      preTest: "设想你和我坐同一把椅子上。用户说：“我想提升决策质量，有没有一种思维方式能帮我？”你下一步是开始蒸馏芒格，还是先问一轮？先猜一下。",
      narrativeBody: [
        { kind: "para", text: "我收到的第一个东西可能不是人名。它可能只是一句困惑，比如“我总是做错商业判断”。" },
        { kind: "para", text: "女娲先让我看入口表。明确人名走直接路径；模糊困惑走诊断路径。这个分叉很早，因为后面的成本很高。" },
        { kind: "code", lang: "markdown", text: "| 用户输入 | 路径 | 示例 |\n| --- | --- | --- |\n| 明确的人名/主题 | 直接路径 | 蒸馏塔勒布 |\n| 模糊的需求/困惑 | 诊断路径 | 我想提升决策质量 |" },
        { kind: "para", text: "我们的贯穿例子是“蒸馏塔勒布”。这是明确人物，所以我不用推荐候选，也不用问“你更偏商业决策还是人生决策”。" },
        { kind: "para", text: "但如果用户只说“我想看透风险”，女娲会让我先定位需求，再推荐 2-3 个候选，比如塔勒布、芒格或一个风险决策主题 Skill。" }
      ],
      receives: "用户的第一句话，可能是人名、主题，也可能是模糊需求。",
      reads: "SKILL.md Phase 0 入口分流表。",
      blockedShortcut: "不能把模糊需求直接当成某个人名；也不能推荐 10 个候选让用户自己筛。",
      action: "判断直接路径或诊断路径。明确对象就进入确认；模糊需求最多问 1-2 轮，再给 2-3 个候选。",
      output: "一条明确的入口路径。",
      nextConsumer: "Phase 0A 需求澄清，或 Phase 0B 候选推荐。",
      freedom: "中等。我可以判断用户表达是否足够清楚，但不能跳过分流。",
      reusableMove: "复杂 skill 的第一步不是做事，而是确认原料形态。原料不同，后面的生产线就不同。",
      hookClose: "现在我知道这是明确人物请求。下一步能问更少的问题，只确认会影响调研和产物的几件事。",
      challenges: [
        "用户说“做个反脆弱视角”，这算明确主题还是模糊需求？你会怎么确认？",
        "用户说“帮我用马斯克想想”，但其实想解决写作问题。你会直接蒸馏马斯克还是先诊断？",
        "候选推荐里已有 Skill 和新蒸馏对象同时出现，为什么已有 Skill 要优先展示？"
      ]
    },
    {
      id: "clarify-direct",
      phase: "Phase 0A · 需求澄清",
      title: "明确人名后，只问会改变产物的问题",
      summary: "用户点名塔勒布后，我要确认用途、范围、新建或更新、本地素材。用户说“就做”时，女娲允许用默认值继续。",
      hookOpen: "上一步已经确认是明确人物。现在不是继续闲聊，而是收齐会影响目录、调研和模板的信息。",
      preTest: "用户说“蒸馏塔勒布，直接做”。你会继续追问很多细节，还是按默认值推进？先写下你的判断。",
      narrativeBody: [
        { kind: "para", text: "女娲要我问的不是问卷，而是四类会改变后续动作的事实：这个人是谁、聚焦方向、用途、新建还是更新。" },
        { kind: "para", text: "还有一个问题很重要：用户手上有没有本地素材。一本书、一个完整访谈 transcript、视频字幕，往往比搜索摘要更有价值。" },
        { kind: "code", lang: "text", text: "塔勒布例子的确认结果：\n人物：Nassim Nicholas Taleb\n方向：全面画像，重点风险与不确定性\n用途：思维顾问，判断投资和产品决策\n模式：新建 Skill\n本地素材：无，走纯网络搜索" },
        { kind: "para", text: "如果用户说“就做塔勒布”，女娲不让我反复追问。默认全面画像、思维顾问、无本地素材，直接推进。" },
        { kind: "para", text: "这一步看起来短，但它决定 Phase 1 的收集方式。用户提供本地素材，我会先读本地材料，再搜索缺口；没有素材，才走六路网络调研。" }
      ],
      receives: "明确人物或主题，以及用户给出的用途和素材说明。",
      reads: "SKILL.md Phase 0A 需求澄清规则。",
      blockedShortcut: "不能因为想严谨就把用户拖进长问卷；也不能忽略本地素材。",
      action: "确认用途、范围、新建或更新、本地语料；信息足够时用默认值推进。",
      output: "一份可执行的蒸馏设定。",
      nextConsumer: "Phase 0.5 创建 Skill 目录。",
      freedom: "低到中等。我可以选择不追问，但不能省掉素材模式判断。",
      reusableMove: "只问会改变下一步动作的问题。问不改变动作的问题，是把用户精力花在装样子上。",
      hookClose: "现在调研策略已经定了。下一步先建目录，不让证据散落在会话或临时文件里。",
      challenges: [
        "用户给了两本塔勒布的书 PDF，但要求“也顺便搜最近动态”。这属于哪种素材模式？",
        "用户说“做一个 2026 最新塔勒布 Skill”，但没有本地素材。Phase 1 哪个维度要加重？",
        "用户已经有旧的 `taleb-perspective`，这一步应该怎样改变后续流程？"
      ]
    },
    {
      id: "create-package",
      phase: "Phase 0.5 · 创建目录",
      title: "调研前先把证据要住在哪里定下来",
      summary: "女娲要求先创建 Skill 目录和 research/sources 结构。每个调研 agent 都把结果写到目录内部。",
      hookOpen: "上一步定了对象和模式。如果我现在直接搜网页，证据会散在聊天记录里，后面很难复查。",
      preTest: "你和我已经确认要新建塔勒布 Skill。下一步是先搜索资料，还是先建 `.claude/skills/taleb-perspective/`？为什么？",
      narrativeBody: [
        { kind: "para", text: "女娲在调研前就让我建目录。原因很简单：所有证据都要跟最后的 Skill 一起走。" },
        { kind: "code", lang: "text", text: ".claude/skills/taleb-perspective/\n├── SKILL.md\n├── scripts/\n└── references/\n    ├── research/\n    │   ├── 01-writings.md\n    │   ├── 02-conversations.md\n    │   ├── 03-expression-dna.md\n    │   ├── 04-external-views.md\n    │   ├── 05-decisions.md\n    │   └── 06-timeline.md\n    └── sources/\n        ├── books/\n        ├── transcripts/\n        └── articles/" },
        { kind: "para", text: "注意这不是整理癖。女娲有一条硬规则：不存文件的调研等于没做。" },
        { kind: "para", text: "如果我只把结果写在回复里，Phase 2 提炼时就没有可复查的证据。更糟的是，用户把这个 Skill 目录复制给别人时，别人只拿到结论，拿不到来源。" },
        { kind: "para", text: "这一步还会根据人物类型切换信息源策略。中国人物优先 B 站原始视频、小宇宙播客和权威中文媒体；知乎、微信公众号、百度百科始终排除。" }
      ],
      receives: "确认后的蒸馏设定。",
      reads: "SKILL.md Phase 0.5 目录结构和完成检查。",
      blockedShortcut: "不能先调研后整理；不能把 research 文件放到 skill 目录外。",
      action: "创建自包含目录，准备 research 和 sources 子目录，标记本地语料或网络搜索模式。",
      output: "一个能承载证据和最终 SKILL.md 的目录。",
      nextConsumer: "Phase 1 六路信息采集。",
      freedom: "低。目录结构基本固定。",
      reusableMove: "先决定证据住在哪里，再开始收集证据。这样后面每个结论都有地方回查。",
      hookClose: "目录已经在，六路调研不会丢。下一步每个维度只负责自己的证据，不互相抢活。",
      challenges: [
        "用户想把 Skill 开源。为什么自包含目录比单个 SKILL.md 更重要？",
        "如果用户给了 transcript 文件，你会放进 `sources/transcripts/` 还是直接摘录到 research？",
        "调研中发现一个很好的 PDF，应该只引用 URL，还是下载到 sources？什么情况下必须下载？"
      ]
    },
    {
      id: "collect-evidence",
      phase: "Phase 1 · 多源信息采集",
      title: "六个角度收集证据，不让语录独占视野",
      summary: "女娲把调研拆成著作、对话、表达、他者、决策、时间线。每个维度写一份文件，并标注来源可信度。",
      hookOpen: "目录准备好了。现在可以调研，但不能只搜“塔勒布 名言”或“塔勒布 思想总结”。",
      preTest: "如果只给你 30 分钟调研塔勒布，你最想先看什么？书、访谈、推文、别人评价，还是重大决策？为什么单看一种会出问题？",
      narrativeBody: [
        { kind: "para", text: "女娲把调研拆成六份文件。这个拆分会逼我从不同证据形态看同一个人。" },
        { kind: "code", lang: "markdown", text: "| 文件 | 负责什么 |\n| --- | --- |\n| 01-writings.md | 书、长文、系统性观点 |\n| 02-conversations.md | 播客、长访谈、被追问时怎么想 |\n| 03-expression-dna.md | 社交媒体、短文、语气和句式 |\n| 04-external-views.md | 批评、书评、他者观察 |\n| 05-decisions.md | 真实决策和行为记录 |\n| 06-timeline.md | 时间线、思想变化、最近动态 |" },
        { kind: "para", text: "塔勒布这个例子里，著作能给出反脆弱、黑天鹅、遍历性这些核心概念。长访谈会暴露他被追问时怎么拒绝问题。外部批评会提醒我：他的攻击性表达不是在所有场景都适合。" },
        { kind: "para", text: "每个来源都要标清楚可信度。本人著作和长访谈权重最高，二手转述只能参考。发现矛盾时保留矛盾，不要把它抹平。" },
        { kind: "para", text: "这里脚本也开始有用。视频有字幕就用 `download_subtitles.sh` 抓字幕，再用 `srt_to_transcript.py` 清洗成文本。脚本替我处理容易出错的机械活。" }
      ],
      receives: "自包含目录、调研模式、目标人物。",
      reads: "SKILL.md Phase 1 信息源策略和六个 agent 任务；scripts 工具说明。",
      blockedShortcut: "不能只看名言、只看二手总结，或把来源可信度混在一起。",
      action: "按六个维度收集材料，写入 `references/research/01-06.md`，标注一手、二手、推断和矛盾。",
      output: "六份可复查的调研文件。",
      nextConsumer: "Phase 1.5 调研 review 检查点。",
      freedom: "中等。我可以选择具体来源，但每个维度的输出文件和可信度标注不能省。",
      reusableMove: "把“调研”拆成互补证据形态。一个维度很强，不代表其它维度可以空着。",
      hookClose: "现在我手里不是一团搜索摘要，而是六个证据抽屉。下一步先看抽屉够不够满，再决定能不能提炼。",
      challenges: [
        "某个人没有社交媒体，`03-expression-dna.md` 怎么办？空着、补访谈口吻，还是标注信息不足？",
        "二手传记说 A，长访谈本人说 B。你会选一边，还是把矛盾写进 research？",
        "为什么“最近 12 个月动态”要放在时间线维度，而不是最后交付时随手补？"
      ]
    },
    {
      id: "review-research",
      phase: "Phase 1.5 · 调研 review",
      title: "调研结束后先停，别急着提炼",
      summary: "女娲要求展示来源数量、关键发现、矛盾点和信息不足维度。用户确认质量后，才进入框架提炼。",
      hookOpen: "六份调研文件都有了。我的本能是马上总结心智模型，但女娲让我先停。",
      preTest: "你手里有六份 research 文件。下一步是直接提炼 6 个模型，还是先给用户看一张调研质量表？这一步有什么用？",
      narrativeBody: [
        { kind: "para", text: "女娲把这里设成检查点，因为调研质量决定最终 Skill 的上限。证据不足时，后面写得越完整越危险。" },
        { kind: "para", text: "`merge_research.py` 会扫描六份 research 文件，统计来源数量、一手/二手标记、关键发现和缺失维度。" },
        { kind: "code", lang: "bash", text: "python3 scripts/merge_research.py .claude/skills/taleb-perspective" },
        { kind: "code", lang: "text", text: "Agent        来源数量  关键发现\n著作         12        Incerto / 反脆弱 / 遍历性\n对话         8         被追问时拒绝坏问题\n表达         120       短句、攻击性、古典引用\n他者         7         主要批评：过度战斗模式\n决策         5         公开行动和投资偏好\n时间线       完整       最新动态已覆盖\n矛盾点        2处       表达攻击性 vs 可用场景\n信息不足维度   无" },
        { kind: "para", text: "如果用户看到“来源数很少”或“时间线缺失”，这时补调研最便宜。等我已经写完 SKILL.md，再发现证据薄，通常要回到 Phase 1 重做。" },
        { kind: "para", text: "这一步不是把责任推给用户。我要给清楚的质量判断：哪些维度够，哪些维度薄，薄的地方会怎样影响最终 Skill。" }
      ],
      receives: "六份 research 文件。",
      reads: "SKILL.md Phase 1.5 检查点；scripts/merge_research.py。",
      blockedShortcut: "不能把“调研完成”直接等同于“可以提炼”；不能隐藏缺失维度。",
      action: "生成调研质量摘要，展示来源、关键发现、矛盾和缺口，请用户确认是否补调研。",
      output: "用户确认过的调研质量状态。",
      nextConsumer: "Phase 2 框架提炼。",
      freedom: "低。必须停，但我可以给出是否建议补调研的判断。",
      reusableMove: "在证据阶段停一次。前面证据薄，后面所有漂亮结构都是空的。",
      hookClose: "用户确认调研够用后，我才能把证据变成模型。下一步开始筛，不能把所有观点都收进来。",
      challenges: [
        "总来源数只有 8 条，但用户说继续。你会怎样在后续诚实边界里写？",
        "某维度缺失，但另外几个维度很强。什么时候可以继续，什么时候必须补？",
        "review 表里有矛盾点，为什么不是坏事？"
      ]
    },
    {
      id: "synthesize-models",
      phase: "Phase 2 · 框架提炼",
      title: "三道筛子把金句和模型分开",
      summary: "女娲要求先读 extraction-framework。一个观点只有跨域复现、能推断新问题、有排他性，才升成心智模型。",
      hookOpen: "证据够了。现在最危险的不是材料太少，而是我太想把材料都写进成品。",
      preTest: "塔勒布说过“不要过平均四英尺深的河”。这是心智模型、启发式，还是只是一个例子？先判断，再看女娲怎么筛。",
      narrativeBody: [
        { kind: "para", text: "女娲让我先读 `references/extraction-framework.md`。这份文件的核心是三重验证。" },
        { kind: "code", lang: "text", text: "候选观点：反脆弱偏好\n1. 跨域复现：投资、健康、组织、知识判断里都出现\n2. 生成力：面对新系统时，能推断他会先问“受压会变强还是崩溃”\n3. 排他性：不是所有聪明人都会把压力当成筛选机制\n结论：升为心智模型" },
        { kind: "code", lang: "text", text: "候选观点：保持谨慎\n1. 跨域复现：常见\n2. 生成力：太泛，无法推出独特判断\n3. 排他性：几乎所有聪明人都会同意\n结论：不升为心智模型，最多写进普通风险提醒" },
        { kind: "para", text: "这样做会让我少写很多看起来正确的话。少写不是损失。人物 Skill 最怕的是“什么都对，但什么都不像这个人”。" },
        { kind: "para", text: "只通过一两个标准的观点，也不是全丢。它可以降成决策启发式，比如“先看最坏情况会不会让你出局”。这比心智模型窄，但能触发具体行动。" },
        { kind: "para", text: "同时我还要提炼表达 DNA、价值观、反模式、内在张力和智识谱系。它们让 Skill 不只是会判断，也知道怎样开口、怎样拒绝、哪里可能失效。" }
      ],
      receives: "用户确认过的 research 文件。",
      reads: "references/extraction-framework.md；01-writings.md 到 05-decisions.md。",
      blockedShortcut: "不能把名言、常识、单场景观点都升成心智模型。",
      action: "列候选观点，逐个跑跨域复现、生成力、排他性三道筛；通过者升模型，部分通过者降启发式。",
      output: "3-7 个心智模型、5-10 条启发式、表达 DNA、价值观、反模式、诚实边界草稿。",
      nextConsumer: "Phase 2.5 提炼确认和 Phase 3 构建。",
      freedom: "高。这里需要判断，但判断必须回到 research 证据。",
      reusableMove: "不要急着命名模型。先让候选观点通过几个会让它变硬的检查。",
      hookClose: "现在我有了真正的框架，而不是素材堆。下一步把这些框架装进模板，并让人物 Skill 知道遇到事实问题先查什么。",
      challenges: [
        "一个观点很有名，但只在一本书里出现。你会怎么处理？",
        "三重验证里“排他性”为什么重要？如果去掉它会怎样？",
        "表达 DNA 和心智模型冲突时，哪个决定回答内容，哪个决定说法？"
      ]
    },
    {
      id: "build-skill",
      phase: "Phase 3 · Skill 构建",
      title: "按模板写成品，但研究流程要从人物模型里推出来",
      summary: "女娲读取 skill-template.md 写 SKILL.md。最关键的是 Agentic Protocol：事实问题先查什么，由人物的心智模型反推。",
      hookOpen: "上一阶段已经筛出模型和启发式。现在可以写成品，但不能把模板当填空题填完就算。",
      preTest: "如果塔勒布 Skill 遇到“最近日元贬值，是机会还是风险”，它应该直接回答，还是先查？如果查，查什么？",
      narrativeBody: [
        { kind: "para", text: "`references/skill-template.md` 给了成品结构：frontmatter、角色扮演规则、身份卡、心智模型、启发式、表达 DNA、时间线、诚实边界和来源。" },
        { kind: "para", text: "女娲新增的一段最关键：回答工作流。它让人物 Skill 碰到需要事实的问题时，先做功课。" },
        { kind: "code", lang: "markdown", text: "## 回答工作流（Agentic Protocol）\n\n### Step 1: 问题分类\n需要事实的问题 → 先研究再回答\n纯框架问题 → 直接用心智模型回答\n混合问题 → 先获取案例事实，再用框架分析\n\n### Step 2: 塔勒布式研究\n- 看尾部风险：最坏情况有多坏？\n- 看遍历性：重复很多次会不会某次出局？\n- 看皮肤在场：谁承担后果？\n- 看主流叙事：所有人是否说同一件事？" },
        { kind: "para", text: "这不是通用搜索清单。它来自塔勒布的模型。如果是芒格，我会查护城河、激励结构、反面案例。换成费曼，我会查基本事实、实验数据和权威说法的漏洞。" },
        { kind: "para", text: "所以这一步的目标不是“把资料整理好看”。目标是让生成的 Skill 激活后知道先做什么、什么情况下必须查事实、什么时候可以直接用框架回答。" }
      ],
      receives: "已确认的模型、启发式、表达 DNA、边界和来源。",
      reads: "references/skill-template.md；SKILL.md Phase 3 Agentic Protocol 生成指引。",
      blockedShortcut: "不能只写角色语气；不能给所有人物同一套研究维度。",
      action: "按模板组装 SKILL.md，并根据人物心智模型生成事实研究维度。",
      output: "草稿版 `taleb-perspective/SKILL.md`。",
      nextConsumer: "Phase 4 质量验证。",
      freedom: "中等。结构固定，但人物研究维度必须由模型推导。",
      reusableMove: "模板固定骨架，核心流程按对象生成。这样既稳定，又不会把所有人物写成同一个人。",
      hookClose: "成品草稿已经有了。下一步不能直接交付，要看它面对已知题、陌生题和风格题时会不会露馅。",
      challenges: [
        "如果一个人物没有明确的事实研究习惯，Agentic Protocol 怎么写？",
        "为什么“免责声明仅首次激活时说一次”属于可用性设计，而不是法律文字？",
        "主题 Skill 没有人物语气，模板里哪些部分要删或改？"
      ]
    },
    {
      id: "validate-output",
      phase: "Phase 4 · 质量验证",
      title: "检查发现问题，要回到文件里修",
      summary: "女娲用已知测试、边缘测试、风格测试和 quality_check.py 检查成品。fail 不是汇报素材，是返工入口。",
      hookOpen: "SKILL.md 草稿写出来了。我的本能是交付，但女娲把“写完”和“可用”分开。",
      preTest: "你会怎样判断一个塔勒布 Skill 真的能用？看它会不会说“反脆弱”，够不够？",
      narrativeBody: [
        { kind: "para", text: "女娲要求三类测试。已知测试拿他公开回答过的问题，看方向是否一致。边缘测试拿他没明确讨论过的问题，看 Skill 是否会适度不确定。风格测试看 100 字回答是不是又变成通用 AI。" },
        { kind: "para", text: "`quality_check.py` 则扫结构：心智模型数量、局限性、表达 DNA、诚实边界、内在张力、一手来源占比。" },
        { kind: "code", lang: "bash", text: "python3 scripts/quality_check.py .claude/skills/taleb-perspective/SKILL.md" },
        { kind: "code", lang: "text", text: "心智模型数量  PASS  6个心智模型\n模型局限性    PASS  有局限性标注\n表达DNA       PASS  表达DNA特征: 6项\n诚实边界      PASS  4条\n内在张力      PASS  3处\n一手来源占比   PASS  >50%" },
        { kind: "para", text: "如果检查失败，我不能把 fail 列表转发给用户当交付说明。女娲要求回到 Phase 2 或 Phase 3 修文件，再跑验证。" },
        { kind: "para", text: "这一步也规定了迭代上限。最多来回两轮。两轮后仍薄弱，就在诚实边界里说明，不假装已经完美。" }
      ],
      receives: "草稿版 SKILL.md。",
      reads: "SKILL.md Phase 4 通过标准；scripts/quality_check.py；references/extraction-framework.md 质量自检。",
      blockedShortcut: "不能把检查当仪式；不能检查失败却不回写修复。",
      action: "跑已知题、边缘题、风格题和脚本检查；修掉 blocking issue 后再展示验证结果。",
      output: "通过验证或明确标注薄弱边界的 Skill。",
      nextConsumer: "Phase 5 双视角精炼或最终交付。",
      freedom: "中等。测试题可选，但通过标准不能改。",
      reusableMove: "检查必须接修复。只报告问题，不改产物，是把工作退回给用户。",
      hookClose: "现在 Skill 已经不是草稿。最后一步可以精炼触发条件和可操作性；如果是更新旧 Skill，则只补最新维度。",
      challenges: [
        "已知测试方向一致，但风格测试很像通用 AI。你回到哪个阶段修？",
        "quality_check.py 通过了，但你肉眼发现来源多是二手。脚本结果和判断冲突时怎么办？",
        "两轮修复后仍然缺少一手来源，是继续无限调研，还是交付并写清边界？"
      ]
    },
    {
      id: "refine-or-update",
      phase: "Phase 5 · 精炼和更新",
      title: "交付不是终点，更新也不是重写",
      summary: "新 Skill 通过后，女娲用两个视角做后置精炼；旧 Skill 更新时，只补最新对话、决策和时间线，不全量重写。",
      hookOpen: "验证通过后，已经可以交付。但女娲还有两个收尾动作：精炼新 Skill，或按更新模式维护旧 Skill。",
      preTest: "如果用户一个月后说“塔勒布最近有新动态，帮我更新”，你会重跑六个维度，还是只查部分维度？",
      narrativeBody: [
        { kind: "para", text: "女娲的 Phase 5 是后置精炼。一个视角看工作流清晰度、边界条件、检查点；另一个视角看触发条件、角色规则和缺失信息。" },
        { kind: "para", text: "这里的原则还是一样：建议必须能改进文件。只说“加强可操作性”没有用，必须给出具体文本改动。" },
        { kind: "para", text: "更新旧 Skill 时，女娲不重写全部内容。它先读旧 SKILL.md 的调研时间，再只启动最新对话、最新决策、时间线三个维度。" },
        { kind: "code", lang: "text", text: "更新模式只看：\n- Agent 2：最新对话\n- Agent 5：最新决策\n- Agent 6：时间线更新\n\n对比结果：\n新信息强化旧模型 → 补案例\n新信息冲突旧模型 → 标注变化并更新模型\n出现新模式 → 考虑新增模型" },
        { kind: "para", text: "这让维护成本可控。不是每次有新动态都推倒重来，而是只查可能改变人物判断的部分。" }
      ],
      receives: "通过验证的新 Skill，或已有 Skill 的更新请求。",
      reads: "SKILL.md Phase 5 双 Agent 精炼；更新已有 Skill 规则。",
      blockedShortcut: "不能把精炼变成泛泛建议；不能把更新模式做成全量重写。",
      action: "新建时应用不冲突的精炼建议；更新时读取旧边界，只补最新对话、决策和时间线。",
      output: "可交付的新 Skill，或增量更新后的旧 Skill。",
      nextConsumer: "用户安装和调用。",
      freedom: "中等。可以决定哪些建议值得应用，但不能无证据改核心模型。",
      reusableMove: "新建和更新不是同一种工作。更新要找变化，不是重做一遍自己已经知道的事。",
      hookClose: "这一步把账结清：女娲交付的不是一段漂亮 prompt，而是一份有证据、有更新路径、能被验证的 Skill。",
      challenges: [
        "一个新访谈和旧模型冲突。你会删掉旧模型，还是记录观点演化？",
        "触发条件写得太宽，会造成什么坏结果？太窄又会怎样？",
        "后置精炼提出 6 条建议，你为什么不应该全部照单全收？"
      ]
    }
  ],

  glossary: [
    {
      term: "直接路径",
      definition: "用户已经点名对象，例如“蒸馏塔勒布”。我只确认用途、范围、是否更新和有没有素材。",
      whereItAppears: "Walkthrough 01 和 02。",
      solvedProblem: "防止我把明确请求拖成诊断问卷。",
      howToUse: "看到明确人名后，我用默认值推进，不继续问不改变动作的问题。",
      commonMisread: "不是“不问问题”。它只是不问不会改变后续流程的问题。"
    },
    {
      term: "诊断路径",
      definition: "用户只说困惑，我先反推适合蒸馏谁。例如“总是做错商业判断”可能推荐芒格、塔勒布或商业决策主题。",
      whereItAppears: "Walkthrough 01。",
      solvedProblem: "防止用户没点名时，我替他随便选一个人物。",
      howToUse: "最多追问 1-2 轮，定位需求维度，再给 2-3 个差异明显的候选。",
      commonMisread: "不是咨询流程。它只服务于选对蒸馏对象。"
    },
    {
      term: "本地语料模式",
      definition: "用户给书、字幕、文章或备忘录时，我先读这些原文，再用网络搜索补缺口。",
      whereItAppears: "Walkthrough 02 和 04。",
      solvedProblem: "防止我忽略用户手里质量更高的一手材料。",
      howToUse: "把素材放进 `sources/`，标注哪些维度已覆盖，缺的维度再搜索。",
      commonMisread: "不是“只用本地资料”。除非用户明确要求，否则本地优先，网络补充。"
    },
    {
      term: "六份调研文件",
      definition: "`01-writings.md` 到 `06-timeline.md` 六个证据抽屉，分别存著作、对话、表达、他者、决策、时间线。",
      whereItAppears: "Walkthrough 03 和 04。",
      solvedProblem: "防止证据散在会话里，后面提炼时查不回来。",
      howToUse: "每个维度写进自己的文件，并标出来源类型和可信度。",
      commonMisread: "不是为了目录好看。它决定后面每个模型是否能回查证据。"
    },
    {
      term: "三重验证",
      definition: "一个候选观点要升成心智模型，必须跨多个领域出现，能推断新问题，并且不是所有聪明人都会同意。",
      whereItAppears: "Walkthrough 06。",
      solvedProblem: "防止我把金句、常识和真正的框架混在一起。",
      howToUse: "对“反脆弱偏好”这样的候选逐项检查，通过三项才升模型。",
      commonMisread: "不是打分表。它是让观点变硬的三个问题。"
    },
    {
      term: "心智模型",
      definition: "塔勒布的“反脆弱偏好”就是心智模型：看一个系统时先问它受压会变强还是崩溃。",
      whereItAppears: "Walkthrough 06 和 07。",
      solvedProblem: "让人物 Skill 面对新问题时能生成判断，而不是复述旧话。",
      howToUse: "写回答工作流时，把模型转成事实研究维度。",
      commonMisread: "不是名言，也不是建议。它必须能改变看问题的顺序。"
    },
    {
      term: "决策启发式",
      definition: "比心智模型窄的判断规则，例如“先看最坏情况会不会让你出局”。",
      whereItAppears: "Walkthrough 06 和 07。",
      solvedProblem: "保留有用但不够升格的观点，不让它们挤占核心模型位置。",
      howToUse: "遇到具体场景时作为快速判断规则触发。",
      commonMisread: "不是低质量内容。它只是适用范围比心智模型窄。"
    },
    {
      term: "表达 DNA",
      definition: "塔勒布怎样开口、转折、攻击、拒绝问题，例如短句、格言体、确定性强、古典引用。",
      whereItAppears: "Walkthrough 04、06、07 和 08。",
      solvedProblem: "防止成品会判断但说话像通用 AI。",
      howToUse: "写角色规则和风格测试时，用它判断回答是否有辨识度。",
      commonMisread: "不是模仿名人口头禅。过度模仿会变成表演。"
    },
    {
      term: "回答工作流",
      definition: "人物 Skill 遇到问题后先分类。需要事实的问题先查，再用人物框架回答。",
      whereItAppears: "Walkthrough 07。",
      solvedProblem: "防止人物 Skill 面对最新事实时凭旧记忆编。",
      howToUse: "由心智模型反推研究维度。塔勒布查尾部风险和皮肤在场，芒格查激励和反面案例。",
      commonMisread: "不是给所有人物同一张搜索清单。"
    },
    {
      term: "诚实边界",
      definition: "Skill 明确写出哪些事做不到，例如不能替代本人直觉，不能覆盖调研时间之后的新变化。",
      whereItAppears: "Walkthrough 06、08 和 09。",
      solvedProblem: "防止成品看起来完整，却在薄弱维度上装确定。",
      howToUse: "当来源少、维度缺失或两轮验证后仍薄弱时，把限制写进边界。",
      commonMisread: "不是免责声明模板。它要具体指出哪里薄、为什么薄。"
    }
  ],

  fileMap: [
    {
      path: "SKILL.md",
      role: "入口文件，决定女娲怎样分流、调研、提炼、构建、验证和更新。",
      generatedBy: "仓库作者维护。",
      readBy: "使用女娲的 AI 每次进入任务时先读。",
      owns: "主流程、检查点、信息源策略、agent 分工、特殊场景。",
      doesNotOwn: "心智模型三重验证的详细解释和成品模板细节。",
      failureIfWrong: "入口错了，后面所有 reference 和 scripts 都会被错误调用。"
    },
    {
      path: "references/extraction-framework.md",
      role: "提炼方法论，告诉我怎样从证据里筛出真正的心智模型。",
      generatedBy: "女娲技能作者。",
      readBy: "Phase 2 提炼和 Phase 4 自检。",
      owns: "三重验证、表达 DNA 量化、矛盾处理、信息不足处理、质量自检。",
      doesNotOwn: "具体人物的内容和最终 SKILL.md 模板。",
      failureIfWrong: "我会把常识、金句和薄证据都写成核心模型。"
    },
    {
      path: "references/skill-template.md",
      role: "成品人物 Skill 的骨架。",
      generatedBy: "女娲技能作者。",
      readBy: "Phase 3 构建成品时读取。",
      owns: "frontmatter、角色规则、身份卡、模型、启发式、表达 DNA、时间线、诚实边界和来源结构。",
      doesNotOwn: "该人物到底有哪些模型；这些要从 research 里提炼。",
      failureIfWrong: "每个生成 Skill 的形状会漂，用户安装后触发和使用方式不稳定。"
    },
    {
      path: "scripts/download_subtitles.sh",
      role: "从 YouTube 下载字幕，优先人工字幕，再退到自动字幕。",
      generatedBy: "女娲技能作者。",
      readBy: "Phase 1 收集视频/访谈素材时由 AI 调用。",
      owns: "字幕下载的机械流程和语言优先级。",
      doesNotOwn: "字幕内容是否可信，仍要在 research 里标注来源。",
      failureIfWrong: "视频材料会卡在手工下载，或抓到不合适语言的字幕。"
    },
    {
      path: "scripts/srt_to_transcript.py",
      role: "把 SRT/VTT 清洗成可读 transcript。",
      generatedBy: "女娲技能作者。",
      readBy: "Phase 1 处理字幕后调用。",
      owns: "去时间戳、序号、HTML 标签、连续重复行。",
      doesNotOwn: "对 transcript 的观点提炼。",
      failureIfWrong: "调研文件会混进时间戳和重复行，后面提炼难以阅读。"
    },
    {
      path: "scripts/merge_research.py",
      role: "生成 Phase 1.5 调研 review 摘要。",
      generatedBy: "女娲技能作者。",
      readBy: "六份 research 文件完成后调用。",
      owns: "来源数量、关键发现、矛盾标记、缺失维度的摘要。",
      doesNotOwn: "最终是否继续推进，这仍要结合用户确认和 AI 判断。",
      failureIfWrong: "检查点会变成手写印象，漏掉薄弱维度。"
    },
    {
      path: "scripts/quality_check.py",
      role: "自动检查成品 SKILL.md 的结构质量。",
      generatedBy: "女娲技能作者。",
      readBy: "Phase 4 验证时调用。",
      owns: "模型数量、局限性、表达 DNA、诚实边界、内在张力、一手来源标记等结构检查。",
      doesNotOwn: "内容是否真的像这个人；已知题和边缘题还要人工判断。",
      failureIfWrong: "成品可能缺少边界或模型数量异常，却被误交付。"
    },
    {
      path: "examples/*-perspective/SKILL.md",
      role: "已蒸馏人物 Skill 的参考样本。",
      generatedBy: "女娲历史运行结果。",
      readBy: "读者校准女娲能产出什么；本手册只作例子，不当规范源。",
      owns: "真实人物 Skill 的成品形态和效果示例。",
      doesNotOwn: "女娲当前流程的规则；规则仍以 SKILL.md 和 references 为准。",
      failureIfWrong: "如果把 examples 当规范，旧产物里的偶然写法会被误复制到新 run。"
    }
  ],

  designChoices: [
    {
      title: "入口先分流，而不是马上开始蒸馏",
      looksUnnecessaryBecause: "用户都说想要一个思维顾问了，似乎直接开始找资料更快。",
      badScenario: "我把“我想提升决策质量”直接理解成某个热门人物，最后做出的 Skill 和用户真正问题不匹配。",
      constraint: "女娲先分直接路径和诊断路径。模糊需求最多追问 1-2 轮，再给 2-3 个候选。",
      solvedProblem: "蒸馏对象先对齐，后面几十分钟到几小时的调研才不会用错方向。",
      reusableMove: "先判断请求类型，再进入昂贵流程。",
      counterScenarios: [
        { effect: "管用", when: "用户只描述困惑，不知道该蒸馏谁。", why: "分流能把需求翻译成候选对象。" },
        { effect: "可以简化", when: "用户明确说“就做塔勒布，别问”。", why: "只确认素材和新建/更新，不继续追问。" },
        { effect: "用不上", when: "输入已经是完整 research 包和指定模板。", why: "对象和范围已经被外部规格锁定。" }
      ]
    },
    {
      title: "调研前先创建自包含目录",
      looksUnnecessaryBecause: "先搜资料再整理，好像更自然。",
      badScenario: "我把证据放在临时笔记或聊天里，最后只剩一个 SKILL.md，别人拿到成品却无法复查。",
      constraint: "Phase 0.5 先创建 `.claude/skills/<name>/references/research/` 和 `sources/`，所有调研文件必须写在里面。",
      solvedProblem: "Skill 被复制、开源或更新时，证据和成品一起走。",
      reusableMove: "先给证据定住地址，再开始收集。",
      counterScenarios: [
        { effect: "管用", when: "要生成可分发的 skill 包。", why: "自包含目录让分发后仍能查证据。" },
        { effect: "得让一步", when: "用户只是要一份一次性分析报告。", why: "可以不建完整 skill 目录，但仍要保存来源清单。" },
        { effect: "反而碍事", when: "任务只是解释一个已有 SKILL.md。", why: "不需要创建新人物 Skill 目录。" }
      ]
    },
    {
      title: "六个维度收集证据",
      looksUnnecessaryBecause: "一本代表作或几场访谈看起来已经足够理解一个人。",
      badScenario: "我只看长文，成品有概念但没语气；只看社交媒体，成品有语气但没框架。",
      constraint: "女娲固定拆成著作、对话、表达、他者、决策、时间线六份 research 文件。",
      solvedProblem: "人物 Skill 同时有系统思想、即时反应、外部盲点和真实行为。",
      reusableMove: "把“研究对象”拆成几种互补证据，不让单一材料决定全部判断。",
      counterScenarios: [
        { effect: "管用", when: "公众人物材料丰富。", why: "六个维度能互相校验。" },
        { effect: "可以松点", when: "冷门人物公开信息很少。", why: "维度可以保留，但每个维度要标注信息不足。" },
        { effect: "用不上", when: "主题 Skill 不模拟某个人。", why: "表达 DNA 和个人时间线要改成流派对比。" }
      ]
    },
    {
      title: "调研和提炼各停一次",
      looksUnnecessaryBecause: "我已经在工作了，停下来问用户会打断节奏。",
      badScenario: "证据薄或模型方向错，AI 还是一路写到 400 行 SKILL.md，最后返工很贵。",
      constraint: "Phase 1.5 展示调研质量；Phase 2.5 展示提炼摘要。用户确认后才继续。",
      solvedProblem: "方向错误在还便宜时暴露，不滚到成品阶段。",
      reusableMove: "在最便宜的返工点停一下。",
      counterScenarios: [
        { effect: "管用", when: "项目耗时长、主观判断多。", why: "检查点能防止长链条跑偏。" },
        { effect: "可以简化", when: "用户明确授权自动完成。", why: "可以用默认继续，但要在汇报里说明默认值。" },
        { effect: "没必要", when: "只是修一个已有 Skill 的触发词。", why: "没有长调研和提炼链条。" }
      ]
    },
    {
      title: "三重验证筛心智模型",
      looksUnnecessaryBecause: "读完材料后，哪些观点重要似乎一眼能看出来。",
      badScenario: "我把“保持谨慎”这种所有人都同意的话写成塔勒布核心模型，最后没有辨识度。",
      constraint: "候选观点必须跨域复现、能生成新判断、有排他性。三项都过才升模型。",
      solvedProblem: "核心模型少而硬，能面对新问题工作。",
      reusableMove: "先设计筛选标准，再给观点命名。",
      counterScenarios: [
        { effect: "管用", when: "需要从大量材料里提炼少数核心框架。", why: "三道筛能压掉常识和金句。" },
        { effect: "得让一步", when: "材料很少但用户仍要做。", why: "可减少模型数量，并把推测写进边界。" },
        { effect: "用不上", when: "任务只是整理原文摘要。", why: "摘要不需要把观点升成可运行模型。" }
      ]
    },
    {
      title: "回答工作流由人物模型反推",
      looksUnnecessaryBecause: "所有人物遇到事实问题，先搜索最新信息就行。",
      badScenario: "每个生成 Skill 都查同一套公司新闻、市场数据、人物背景，人物之间只有语气不同。",
      constraint: "Step 2 的研究维度必须来自该人物心智模型。塔勒布查尾部风险，芒格查激励，费曼查可验证事实。",
      solvedProblem: "人物 Skill 不只说得像，也按这个人的关注顺序做功课。",
      reusableMove: "把核心模型转成工具使用前的检查清单。",
      counterScenarios: [
        { effect: "管用", when: "Skill 会回答包含最新事实的问题。", why: "先查什么决定了判断质量。" },
        { effect: "看情况", when: "人物资料里没有稳定研究偏好。", why: "可以写较短流程，并明确不确定。" },
        { effect: "用不上", when: "Skill 只做固定格式转换。", why: "不需要人物式研究路径。" }
      ]
    },
    {
      title: "质量检查必须接修复",
      looksUnnecessaryBecause: "把 fail 列出来给用户看，似乎已经很透明。",
      badScenario: "我告诉用户“缺少诚实边界、表达 DNA 不够”，但 SKILL.md 还是原样没改。",
      constraint: "已知测试、边缘测试、风格测试和 `quality_check.py` 发现问题后，必须回到对应阶段修复。",
      solvedProblem: "检查从装饰变成返工入口，成品真的变好。",
      reusableMove: "任何检查清单都要绑定修复动作。",
      counterScenarios: [
        { effect: "管用", when: "成品会被用户长期调用。", why: "未修问题会在真实使用中反复出现。" },
        { effect: "可以简化", when: "只是给用户看一个草稿方向。", why: "可以标注草稿，但不能叫交付。" },
        { effect: "反而碍事", when: "用户明确只要问题清单，不要你改。", why: "这时修复动作不是本轮目标。" }
      ]
    }
  ],

  patterns: [
    {
      name: "先分流，再执行",
      status: "候选",
      prevents: "一个 skill 用同一套动作处理人名、主题和模糊困惑，最后入口错、后面全错。",
      therefore: "先判断原料形态，再启动昂贵流程。",
      useWhen: "用户输入形态会改变后续路径，比如新建/更新、本地/网络、人物/主题。",
      howToReuse: "在 SKILL.md 前 1/5 写一张入口表：输入长什么样、走哪条路径、什么时候反问。",
      antiExample: "写一句“根据用户需求灵活处理”。这没有分流，也不能阻止 AI 乱猜。",
      cost: "入口表要维护。新场景出现时，要补进表里。",
      seenIn: "女娲 Phase 0；web-video-presentation 的输入类型分流。",
      relatedPatterns: [
        { to: "P2", label: "自包含证据库", relation: "下游接管：分流后决定证据放在哪里。" },
        { to: "P4", label: "便宜返工点停一下", relation: "搭配用：分流之后常常要设置确认点。" }
      ]
    },
    {
      name: "自包含证据库",
      status: "候选",
      prevents: "成品能跑，但证据散在会话、临时目录或外部笔记里，后续无法复查和更新。",
      therefore: "让证据和成品住在同一个可复制目录里。",
      useWhen: "skill 产物需要分发、开源、长期维护，或后续会基于证据更新。",
      howToReuse: "在流程早期创建 `references/`、`sources/`、`scripts/`，并规定“不写文件的调研等于没做”。",
      antiExample: "最后附一份来源列表，但没有保存研究过程和中间证据。",
      cost: "前期会慢一点；目录结构过重时，小任务会显得笨。",
      seenIn: "女娲 Phase 0.5；多个 perspective examples 的 research 结构。",
      relatedPatterns: [
        { to: "P3", label: "多维证据并行收集", relation: "前置：证据库先建好，多个维度才有固定出口。" },
        { to: "P7", label: "检查必须接修复", relation: "搭配用：修复时能回到证据文件查原因。" }
      ]
    },
    {
      name: "多维证据并行收集",
      status: "候选",
      prevents: "AI 只看一种材料，产物偏成语录包、书摘包或外部评价包。",
      therefore: "把证据拆成互补视角，每个视角写自己的文件。",
      useWhen: "要还原一个人、一种组织实践或复杂方法论，而不是摘要单篇文章。",
      howToReuse: "先列 4-7 个证据维度，每个维度写目标、来源优先级、输出文件和可信度标注。",
      antiExample: "让一个 agent “综合调研某人”。这个任务太宽，结果通常是搜索摘要。",
      cost: "维度多会增加管理成本。冷门对象要允许缺维度并写清边界。",
      seenIn: "女娲六个 research 文件。",
      relatedPatterns: [
        { to: "P5", label: "三道筛选再命名", relation: "下游接管：多维证据进入筛选。" },
        { to: "P6", label: "从心智模型推研究流程", relation: "搭配用：证据维度决定模型，模型再决定回答流程。" }
      ]
    },
    {
      name: "便宜返工点停一下",
      status: "候选",
      prevents: "AI 一路跑到昂贵阶段才发现方向错，用户只好推倒重来。",
      therefore: "在改起来最便宜的时候，让用户确认最会影响后续成本的事。",
      useWhen: "流程里存在从文本到代码、从证据到成品、从草稿到分发的成本跃迁。",
      howToReuse: "找出 1-3 个成本跃迁点，在那里展示摘要、默认值和建议，而不是问开放大题。",
      antiExample: "每一步都问用户。那不是检查点，是把工作拆成许多打断。",
      cost: "会牺牲一点速度；用户已授权全自动时，要用默认值继续并说明。",
      seenIn: "女娲 Phase 1.5 和 Phase 2.5。",
      relatedPatterns: [
        { to: "P1", label: "先分流，再执行", relation: "前置：入口选错时，检查点能早拦。" },
        { to: "P7", label: "检查必须接修复", relation: "搭配用：停下来发现问题后必须改。" }
      ]
    },
    {
      name: "三道筛选再命名",
      status: "候选",
      prevents: "AI 急着给观点起漂亮名字，把常识和金句包装成核心方法论。",
      therefore: "先让观点过筛，再决定它有没有资格被命名。",
      useWhen: "任务要求从材料中提炼“原则、模型、框架、方法”。",
      howToReuse: "定义 2-4 个通过标准。没过全项就降级、标注或丢弃，不要硬塞进核心列表。",
      antiExample: "先列 10 个标题，再给每个标题找证据。",
      cost: "会丢掉一些看起来好看的内容；作者需要接受“少但硬”。",
      seenIn: "女娲 extraction-framework 三重验证。",
      relatedPatterns: [
        { to: "P3", label: "多维证据并行收集", relation: "前置：筛选需要多维证据供它检查。" },
        { to: "P6", label: "从心智模型推研究流程", relation: "下游接管：筛出的模型会生成回答流程。" }
      ]
    },
    {
      name: "从心智模型推研究流程",
      status: "候选",
      prevents: "所有人物 Skill 遇到事实问题都查同一套资料，只有语气不同。",
      therefore: "让模型决定工具使用前要看哪些事实。",
      useWhen: "Skill 会在真实世界问题上做判断，而这些问题需要最新或外部事实。",
      howToReuse: "对每个核心模型问一句：如果这个模型要负责判断，它会先查什么证据？把答案写进回答工作流。",
      antiExample: "写“必要时先搜索相关信息”。这句话没有告诉 AI 搜什么。",
      cost: "模型提炼错了，研究流程也会错。它依赖前面筛选质量。",
      seenIn: "女娲 Agentic Protocol 生成指引；taleb-perspective 示例。",
      relatedPatterns: [
        { to: "P5", label: "三道筛选再命名", relation: "前置：只有硬模型才适合推导研究流程。" },
        { to: "P3", label: "多维证据并行收集", relation: "对照：Phase 1 是生成 Skill 前的调研，Agentic Protocol 是 Skill 使用时的调研。" }
      ]
    },
    {
      name: "检查必须接修复",
      status: "候选",
      prevents: "检查报告很完整，但产物没有变化，问题被原样交给用户。",
      therefore: "把 fail 项当返工入口，不当交付内容。",
      useWhen: "流程有自检、reviewer、测试、脚本检查或质量门。",
      howToReuse: "在每个检查后写明：fail 时回到哪一阶段、修哪个文件、是否需要再跑检查。",
      antiExample: "“以下是自检发现的问题，请用户确认。”如果文件没改，这只是转述。",
      cost: "会延长交付时间。对于草稿评审，应明确说这是草稿，不假装已完成。",
      seenIn: "女娲 Phase 4；extracting-skill 的 page voice gate。",
      relatedPatterns: [
        { to: "P2", label: "自包含证据库", relation: "搭配用：修复时能回证据库找依据。" },
        { to: "P4", label: "便宜返工点停一下", relation: "下游接管：检查点发现的问题要被修掉。" }
      ]
    }
  ],

  applyIt: {
    h1: "拿女娲的形状写你自己的 skill",
    summary: "不要从“我要写哪些章节”开始。先写清普通 AI 会怎么做坏，再决定入口怎么分流、证据住哪里、哪些地方必须停、检查失败回到哪里修。",
    checklistTitle: "起手清单",
    checklistHeading: "从坏 AI 输出反推 skill 形状",
    checklist: [
      "写一句坏结果：不用这个 skill，AI 最可能交付什么看似正确但实际没用的东西？",
      "列输入形态：用户可能给明确对象、模糊需求、已有材料、更新请求，分别走哪条路？",
      "决定证据位置：哪些中间文件必须保存在包内，复制出去仍能复查？",
      "拆证据维度：不要让一种材料独占判断，至少列出 3 个互补来源。",
      "设计筛选标准：什么内容能升为核心模型，什么只能降级，什么要丢掉？",
      "放检查点：找出改起来最便宜、但会影响后面成本的位置。",
      "写失败回路：每个检查失败时，回到哪个阶段修哪个文件？",
      "给成品一个使用时流程：如果成品会处理事实问题，它应该先查什么？",
      "写诚实边界：哪些维度信息不足，哪些能力不能提取，调研截止到哪一天？"
    ],
    starterPrompt: "我要写一个能生成/维护某类复杂产物的 skill。请先不要写 SKILL.md。\n\n先帮我回答这些问题：\n1. 普通 AI 不用这个 skill 会怎样做坏？给 3 个具体坏场景。\n2. 用户输入会有哪些形态？每种输入走哪条路径？\n3. 这个 skill 需要保存哪些中间证据或产物，才能被复查和更新？\n4. 哪些判断必须通过筛选标准，不能凭感觉命名？\n5. 哪些阶段最适合停下来让用户确认，因为此时返工最便宜？\n6. 检查失败后，应该回到哪个阶段修？\n\n基于这些答案，再设计 skill 的流程、文件结构和验证方式。",
    nextSteps: {
      author: [
        "把现有 skill 的第一段改成入口分流表，先覆盖最常见的 3 种输入。",
        "找一处现在最容易返工的阶段，加一个小检查点和默认继续规则。",
        "把至少一个“检查清单”改成“检查失败后回到哪个文件修”。"
      ],
      thief: [
        "偷 Phase 0：先分直接路径和诊断路径。",
        "偷 Phase 0.5：先建自包含目录，再调研。",
        "偷 Phase 2：给核心概念设计筛选标准，再命名。",
        "偷 Phase 4：检查结果必须回写修复，不只汇报。"
      ]
    }
  }
};
