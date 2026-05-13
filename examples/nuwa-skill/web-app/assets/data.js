window.handbook = {
  meta: {
    title: "女娲 · Skill 造人术 解剖手册",
    audience: "想偷招的人 · 准备自己写蒸馏人物 skill 的工程师",
    sourcePath: "/Users/guwanhua/git/nuwa-skill",
    version: "v1 · 2026-05"
  },

  // ============================================================
  // OVERVIEW (chapter 01) — textbook standard, anchor slice
  // ============================================================
  overview: {
    h1: "看见女娲在做什么",
    oneLiner: "我作为 AI，本能是凭训练语料拼几句名言搞角色扮演。女娲拦住我——先做 6 路并行调研、过三道便宜返工点、用三重验证筛模型、从模型反推「先看什么」、最后让独立子 agent 验证。一条人物 skill，14 个 stage 才让我交。",

    // 1.2 opening scene — 6-10 个 narrative block 让读者亲眼看到失败模式
    openingScene: [
      {
        kind: "para",
        text: "我先把一个真实场景念出来。这是没有 nuwa 的我（一个 AI 助手），收到一个常见请求时会做的事。"
      },
      {
        kind: "quote",
        text: "用户：帮我做一个塔勒布视角的 skill，我想用他的思维方式分析我手上几个商业决策。"
      },
      {
        kind: "para",
        text: "我下意识在做什么——我在训练语料里翻塔勒布说过的话。「黑天鹅」「skin in the game」「反脆弱」「林迪效应」——这些词浮上来，我把它们排一排，写成一个 prompt："
      },
      {
        kind: "code",
        lang: "markdown",
        text: "# 塔勒布视角 skill\n\n你现在是 Nassim Taleb。你的核心理念：\n- 关注黑天鹅事件\n- 强调反脆弱性\n- 重视 skin in the game\n- 警惕过度自信和虚假专家\n\n当用户问问题时，用塔勒布的尖锐语气回答，引用他常用的概念。"
      },
      {
        kind: "para",
        text: "看起来很专业，对吗？标签齐全，关键词都点到。但用户开始用它问问题之后，问题来了。"
      },
      {
        kind: "quote",
        text: "用户问：「最近日元大幅贬值，是机会还是风险？」\n\n我（塔勒布）：「这正是反脆弱思维的典型场景。日元贬值在 Extremistan 领域意味着尾部风险——你要警惕黑天鹅。Skin in the game 的角度看，那些建议你买入的人自己有没有下注？」"
      },
      {
        kind: "para",
        text: "这一段读起来像塔勒布。语气对、词汇对、警告的姿势对。但它有三个根本问题，每一个都暴露 AI 默认做角色扮演的局限。"
      },
      {
        kind: "list",
        items: [
          "我没查日元当前的汇率、央行政策、carry trade 规模——我编了一段从 2024 年训练语料里来的「日元 + 黑天鹅」混合体，可能完全过时。",
          "我把「反脆弱」「黑天鹅」「skin in the game」当成关键词洒进答案——但塔勒布在他真实的访谈里很少这样堆术语，他更常用古典引用、希腊词根、街头比喻。",
          "我没有「他会拒答的题」「他改过立场的题」「他自己也没想清楚的题」——所以遇到他根本没研究过的领域，比如生物学伦理，我会照样开口，因为我没有边界。"
        ]
      },
      {
        kind: "para",
        text: "这就是 AI 做人物角色扮演的默认模式——像，但不可靠。语气是表层，事实和边界是底层，底层没做功课，表层再像也是壳。"
      }
    ],

    // 1.3 predict prompt
    predictPrompt: "如果让你来设计一个 skill，把上面这三个问题（不查事实 / 堆词汇 / 没有边界）一次性拦住，你会先做什么？写下你的两步——是先约束输出格式，先做调研，先定义边界，还是别的？写完再读下面 nuwa 实际怎么做。",

    // 1.4 primer — 5-9 拍，含 orientation 图
    primerBeats: [
      {
        kind: "para",
        text: "nuwa 是一个 Claude Code skill。它收到的输入是一个名字（「蒸馏塔勒布」）或一个模糊需求（「我想提升商业决策质量」），它的产出是一个完整的 perspective skill 目录——可以独立安装到任何 Claude Code 项目里使用。"
      },
      {
        kind: "diagram",
        id: "overview-flow"
      },
      {
        kind: "para",
        text: "图里有 11 个 Phase。看起来很多，但只有 3 件事在循环——采集、提炼、构建——每件事后面都跟一个检查点（图里的红色 ★）让用户拍板。"
      },
      {
        kind: "list",
        items: [
          "采集（Phase 1）：6 个 agent 并行去搜书 / 长访谈 / Twitter / 他人分析 / 决策案例 / 时间线。每个 agent 把自己负责那一维的发现写进 references/research/01-06.md。",
          "提炼（Phase 2）：把 6 份调研合起来，过一道三重验证 funnel——同一个论点要在 ≥ 2 个不同领域出现（跨域复现）、能推断此人对新问题的立场（生成力）、不是所有聪明人都会这样想（排他性）。三道都过的留下成「心智模型」（取 top 3-7 个）；只过 1-2 道的降级为「决策启发式」（5-10 条）；一道都没过的丢。",
          "构建（Phase 3）：把心智模型 + 决策启发式 + 表达 DNA + 时间线 + 价值观 + 内在张力 + 诚实边界填进 skill 模板。其中最关键的一步——「Agentic Protocol」——不是套模板，是从蒸馏出的心智模型反推：这个人遇到事实问题时「先看什么」。"
        ]
      },
      {
        kind: "para",
        text: "三个检查点（Phase 1.5 / 2.5 / 4）选在改起来还便宜的位置。1.5 在所有东西都还是 markdown 时停——这时候改一个 agent 的调研方向只要重跑一个 agent。2.5 在 6 个心智模型还在内部表格里时停——这时候调一个模型的权重只要改一行。Phase 4 在 SKILL.md 写完但还没交付时停——三个独立子 agent 做 sanity / edge / voice 测试，避免主 agent 自己写自己评天然偏好评高分。"
      },
      {
        kind: "para",
        text: "Phase 5 是双 agent 精炼（一个 optimizer 视角 + 一个 skill-creator 视角）做最后的可操作性改进——这一步是产品化，不是研究。整条流水线跑完，输出物大约是：一份 443 行的 SKILL.md + 6 份调研存档 + 一手素材 sources/ 目录 + 4 个工具脚本，全部装在一个独立目录里，可以直接复制到任何 Claude Code 项目使用。"
      }
    ],

    // 1.5 wow moment — setup + compare diagram + takeaway
    wowSetup: "回到 opening scene 里的那个塔勒布 skill。如果你只看 nuwa 跑完的 SKILL.md 表层，可能会觉得它和我默认拼的那版「就多了几个 section」。但有一处是默认做不出来的——Agentic Protocol 的 Step 2「先看什么」。这个段落不是套模板，是从蒸馏出的 6 个心智模型反推。把它和费曼、MrBeast 的同一段放一起看，你会发现外壳一样、里面全不一样：",
    wowDiagramId: "protocol-compare",
    wowMoment: "Agentic Protocol 不是「先调研再回答」的通用规则——是从这个人的心智模型出发，决定他面对一个新问题时眼睛先扫哪几个维度。塔勒布扫风险 / 脆弱性 / 历史 / 叙事 / 皮肤在场；费曼扫物理约束 / 官方说法的逻辑漏洞 / 实验数据；MrBeast 扫 CTR 和 AVD / 竞品 Top 10 / 搜索趋势。同一段位置，三个完全不同的眼睛。",

    // 1.6 bad results — 4-5 张 before/after 卡
    badResults: [
      {
        title: "凭训练语料编事实",
        aiDefault: "用户问「日元贬值是机会吗」，我从 2024 年训练数据里抽一段「日元 + 黑天鹅」混合体，没查最新汇率政策和 carry trade 规模——数据可能完全过时，但 AI 不会主动停下来查。",
        nuwaIntercept: "nuwa 给每个人物的 skill 都生成一段「Agentic Protocol」——遇到需要事实的问题时强制用 WebSearch 等工具先查再答。塔勒布的 protocol Step 2 明确列出 5 个搜索维度（看风险 / 看脆弱性 / 看历史 / 看叙事 / 看皮肤在场），不是泛泛「查相关信息」。"
      },
      {
        title: "把人物洗成圣人",
        aiDefault: "我倾向把人物的观点写成内部一致的体系——他既追求 A 又坚持 B，听起来很统一。但真实的人有内在矛盾：塔勒布鼓吹 skin in the game 但批评比特币时已清仓；倡导 Via Negativa（减法）但 Twitter 不断增加噪音。",
        nuwaIntercept: "Phase 2.4 强制提取「内在张力」section——至少 2 对矛盾，写不出 2 对就退回去再调研。Phase 4 通过标准里「观点高度一致 = 太假」是不通过信号。"
      },
      {
        title: "没有边界",
        aiDefault: "我倾向用塔勒布视角回答所有问题，包括他根本没研究过的领域（生物学伦理 / 临床医学 / 哥德尔定理）。AI 不会主动说「这超出他的射程」。",
        nuwaIntercept: "Phase 2.6 必须输出「诚实边界」section——具体到「在哪些领域他会出错」「公开表达和真实想法可能差多远」「调研截止日期」。模板里这一段缺失或只写「不能替代本人」就过不了 Phase 4。"
      },
      {
        title: "自己写自己评天然偏好评好分",
        aiDefault: "主 agent 写完 SKILL.md 之后自己跑测试——它会下意识把「测试通过」标准放宽，因为「我写的我懂」。这是 self-evaluation bias，AI 单独跑评估时几乎一定发生。",
        nuwaIntercept: "Phase 4 强制 spawn 三个独立子 agent 来做测试。子 agent 拿到的是干净的 SKILL.md 文件，不知道主 agent 是怎么想的，只能凭文件本身回答测试问题。"
      },
      {
        title: "目录和原 skill 耦合在一起",
        aiDefault: "AI 默认会把生成的人物 skill 文件散落到当前项目的不同位置——研究文件放一处、脚本放一处、SKILL.md 放一处。复制这个 skill 给别人用时缺一半文件。",
        nuwaIntercept: "Phase 0.5 在调研开始之前就把整个目录树建好：`.claude/skills/taleb-perspective/` 下含 SKILL.md / scripts/ / references/research/ / sources/。所有产物都写进这一个目录，完整复制就能在另一个 Claude Code 项目里跑。"
      }
    ],

    // 1.8 why this shape
    shapeReason: "按读者意图排，不按 nuwa 源文件顺序",
    chapterLogic: [
      { chapter: "章 01 Overview", why: "读者第一次见到这个 skill。先看坏 AI 输出长什么样、再看 nuwa 怎么拦、用塔勒布做贯穿例子。承重墙在这一章。" },
      { chapter: "章 02 Walkthrough", why: "Overview 给的是「为什么」。Walkthrough 是「我作为 AI 实际怎么走」——14 个 stage 沿着塔勒布的例子走完一遍，每个 stage 出真东西。" },
      { chapter: "章 03 Glossary", why: "Walkthrough 里的就地短解保证读得动；Glossary 给想系统过一遍 9 个核心术语的人用——HOW vs WHAT、心智模型、三重验证、Agentic Protocol 等。" },
      { chapter: "章 04 File Map", why: "走完 14 stage 之后，读者已经知道 nuwa 在做什么。这时候看「哪个文件管哪件事」「写错会怎样」最有意义。" },
      { chapter: "章 05 Design Choices", why: "前面是「nuwa 怎么做」，这里是「nuwa 为什么这样做不那样做」。8 个真改变 AI 默认行为的选择，每个附 3 场景力度对比表——避免单视角误导。" },
      { chapter: "章 06 Patterns", why: "Design Choices 是 nuwa 自己的选择；Patterns 是从这里抽出来、能搬到别的 skill 里的招。每张卡 problem → Therefore → solution。" },
      { chapter: "章 07 Apply It", why: "读完 6 章之后，读者要开始写自己的 skill。这一章给起手清单 + 起手 prompt + 下一步路径，把前面 6 章压成可操作的 5-10 步。" }
    ]
  },

  // ============================================================
  // EXAMPLE — running example carried across all chapters
  // ============================================================
  example: {
    userRequest: "我想做一个塔勒布的 skill。我手里没他的素材，你自己搜吧。",
    whyThisExample: "塔勒布是活人——能演示 Agent 6 时间线的「最近 12 个月动态」检查；voice 鲜明 + 争议大——能演示「内在张力」「外部批评」「诚实边界」三个 section 的价值；nuwa SKILL.md 多处用塔勒布举 Agentic Protocol 反推（他的 5 个研究维度是 nuwa 自己的样板）；existing `examples/taleb-perspective/SKILL.md` 已有 443 行真实产出，每个 stage 都能引真东西。",
    expectedOutput: ".claude/skills/taleb-perspective/ 整目录：SKILL.md（443 行）+ scripts/（4 个工具脚本）+ references/research/（6 份调研存档）+ sources/（一手素材原文）。整目录可独立复制到任何 Claude Code 项目使用，不依赖 nuwa 自己。"
  },

  // ============================================================
  // DIAGRAMS registry — every diagram referenced anywhere
  // ============================================================
  diagrams: [
    {
      id: "overview-flow",
      type: "flow",
      kicker: "Domain primer · 顶层图",
      title: "女娲全流程 · 11 个 Phase · 3 道便宜返工点",
      description: "Phase 0 → 0A/0B → 0.5 → 1 → 1.5★ → 2 → 2.5★ → 3 → 4★ → 5。三个红色 ★ 是必须停下来等用户拍板的位置——文本都还在手里、还没生成任何昂贵产物。",
      image: "assets/diagrams/overview-flow.svg"
    },
    {
      id: "protocol-compare",
      type: "compare",
      kicker: "Wow moment · 对照表",
      title: "三人 Agentic Protocol 横向对比",
      description: "塔勒布 / 费曼 / MrBeast 的核心心智模型（行 1）和从模型反推出来的「先看什么」维度（行 2）。同一个 Agentic Protocol 外壳，三个完全不同的眼睛。",
      image: "assets/diagrams/protocol-compare.svg"
    },
    {
      id: "main-flow",
      type: "flow",
      kicker: "Walkthrough · 顶层流程",
      title: "5 个大段 · 14 个 stage 的拓扑",
      description: "把 11 个 Phase 重组成读者更容易记的 5 大段：入口准备 / 采集检查 / 提炼检查 / 构建验证 / 精炼交付。14 stage 的一行摘要在下面索引表里。",
      image: "assets/diagrams/main-flow.svg"
    }
  ],

  // ============================================================
  // WALKTHROUGH — 14 stages, 塔勒布 example carried throughout
  // ============================================================
  walkthrough: [
    {
      id: "triage-input",
      phase: "Phase 0",
      kicker: "Phase 0 · 入口分流",
      title: "你给的是名字，还是模糊需求？",
      summary: "用户说完那一句话，我下意识想开搜。nuwa 让我先停一拍——这是「明确人名」路径，还是「模糊需求」路径？两条路在 Phase 0 之后就分叉了。",
      hookOpen: "用户刚发来：「我想做一个塔勒布的 skill。我手里没他的素材，你自己搜吧。」屏幕上还有上一行对话的尾巴。我什么准备都没做。",
      preTest: "设想你和我同坐一椅。你刚听完用户那句话。下一步你的本能是：(a) 马上启动 WebSearch 搜「塔勒布」 / (b) 先问他想用这个 skill 做什么 / (c) 先在脑子里给这次请求贴一个标签。写下你选哪个再读下面。",
      narrativeBody: [
        {
          kind: "para",
          text: "我的本能是 (a)——直接开搜。Skill 的名字都说了，搜就是了。"
        },
        {
          kind: "para",
          text: "nuwa 不让。nuwa SKILL.md 第一段就是「Phase 0: 入口分流」——它告诉我，收到任何输入第一件事，先判断这句话属于哪条路径。它给了我一张二选一的表："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "| 用户输入            | 路径                     | 示例                          |\n|---------------------|--------------------------|-------------------------------|\n| 明确的人名 / 主题   | 直接路径 → Phase 0A      | 「蒸馏芒格」「做一个费曼 skill」|\n| 模糊的需求 / 困惑   | 诊断路径 → Phase 0B      | 「我想提升决策质量」          |"
        },
        {
          kind: "para",
          text: "我把用户的话和表对一下：「我想做一个塔勒布的 skill」——名字明确（塔勒布）+ 类型明确（人物 skill）。这是直接路径。"
        },
        {
          kind: "para",
          text: "看起来这一拍多余对吗？一句话就能判断的事。但如果用户说的是「我最近做投资亏了好几次，想让 AI 帮我看看自己有没有什么盲点」——这就完全不一样。这种话里没人名，是「模糊需求」，下一步 nuwa 让我做的不是开搜，是给用户推荐 2-3 个候选思维框架（塔勒布看反脆弱 / 卡尼曼看认知偏差 / 芒格看多元思维模型）让他选。Phase 0 这一拍把这两条路在一开始就分开，避免我在错的路径上做错的动作。"
        },
        {
          kind: "para",
          text: "AI 自由度：几乎没自由。表已经把判断维度（是否含明确名字）和分支（0A vs 0B）钉死。我能做的只有把用户的话往左 / 往右推一格。"
        }
      ],
      reusableMove: "在做任何动作之前，先把这次请求贴一个标签——路径分对了，后面所有步骤才能省力。",
      receives: "用户的原话：「我想做一个塔勒布的 skill。我手里没他的素材，你自己搜吧。」",
      reads: "nuwa SKILL.md 行 30-40（Phase 0 入口分流二选一表）",
      blockedShortcut: "不能直接开搜。哪怕名字明确也不行——Phase 0 的拍板要留下，下游 Phase 0A 才知道接什么。",
      action: "把用户的话往「明确人名」或「模糊需求」其中一格贴标签。",
      output: "一条内部判断：「这是直接路径，进 Phase 0A 澄清细节」。",
      nextConsumer: "Phase 0A 接管——它会问 4 个补丁问题（聚焦方向 / 用途 / 新建或更新 / 本地素材）。",
      freedom: "几乎没自由。二选一表钉死。",
      challenges: [
        "用户同时给了名字 + 模糊需求（「我想做一个塔勒布的 skill，帮我提升商业决策质量」）——这算哪条路径？是 0A 还是 0B？",
        "用户只给了一个新词（「我想做一个 IYI perspective」）——IYI 是塔勒布造的词，但不是公认人名。你怎么处理？",
        "用户要求蒸馏「自己」（「帮我做我自己的 skill」）——nuwa 把这归到「特殊场景 > 蒸馏用户自己」，需要本地语料。这一拍要不要先识别出来再走 0A？",
        "如果你想给 Phase 0 加一类「明确否定」（用户说「不要做 XX 的 skill」）——它应该走哪条路径？"
      ],
      hookClose: "现在我手上有一个标签：「直接路径，塔勒布」。Phase 0A 接力——它会问 4 个补丁问题把上下文补齐，再让 Phase 0.5 真的去建目录。"
    },

    {
      id: "clarify-direct",
      phase: "Phase 0A",
      kicker: "Phase 0A · 需求澄清",
      title: "4 个补丁问题",
      summary: "名字明确了，但我还缺 4 件事：他想要的聚焦方向、用途、新建还是更新、有没有本地素材。问完才能进 Phase 0.5 建目录。",
      hookOpen: "接上一步：路径已经贴成「直接，塔勒布」。我现在还是一片白。我不知道用户想用这个 skill 做什么——是给自己当思维顾问，还是想拿来角色扮演陪聊，还是只想要个分析框架。",
      preTest: "设想你和我同坐一椅。你已经知道用户要蒸馏塔勒布。下一步你的本能是：(a) 直接开搜，反正后面再调整 / (b) 一口气问用户 8 个问题先把意图问透 / (c) 只问最少必要的几个补丁问题。写下你的选择。",
      narrativeBody: [
        {
          kind: "para",
          text: "我的本能在 (a) 和 (b) 之间摇摆。要么直接开干，要么把所有可能不确定的事都问一遍。nuwa 不让走任何一个极端。"
        },
        {
          kind: "para",
          text: "它在 Phase 0A 给了一份 5 条的最小问句清单——只问下一步真正会变的事。我把它复刻成给用户的一段话："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "好的，蒸馏塔勒布。在开搜之前我想确认 4 件事——\n\n1. 聚焦方向：要全面画像，还是聚焦某一面（投资决策 / 反脆弱思维 / 写作风格）？\n2. 用途：思维顾问（我用塔勒布视角分析问题）/ 角色扮演（直接以塔勒布身份对话）/ 决策参考？\n3. 新建还是更新：你 .claude/skills/ 下有没有 taleb-perspective 已经存在？\n4. 本地语料：手上有没有他的书 PDF / 演讲 transcript / 字幕？有的话比网上搜的质量高得多。\n\n你不答也行——默认是「全面画像 / 思维顾问 / 新建 / 走网络搜索」。"
        },
        {
          kind: "para",
          text: "为什么是这 4 个不是 8 个？因为剩下的问题（语言偏好 / 输出长度 / 是否包含示例对话）都可以在 Phase 3 模板填充时再问——那时候我手里已经有素材，问起来用户也更容易判断。Phase 0A 只问下一步真的会分叉的事。"
        },
        {
          kind: "para",
          text: "用户答：「全面画像，思维顾问。我手上没素材，你自己搜。新建。」"
        },
        {
          kind: "para",
          text: "答完之后，nuwa 还做了一件事——它检查 `.claude/skills/` 目录里有没有 `taleb-perspective`。如果已经有，进的是「更新模式」（Phase 5 之后会有一条专门的增量更新路径，不重写整个 skill）。我跑一下 ls："
        },
        {
          kind: "code",
          lang: "bash",
          text: "$ ls .claude/skills/ | grep taleb\n(空 — 没有现存的 taleb-perspective)"
        },
        {
          kind: "para",
          text: "确认是新建路径。这一段对话总共 30 秒——但它把后面 Phase 0.5 到 Phase 3 之间所有「需要默认值」的位置都填好了。"
        },
        {
          kind: "para",
          text: "AI 自由度：低。问什么 nuwa 已经定了 4 个补丁问题。我能调整的只有问句的语气（保持简短 / 给默认值降低用户压力）。"
        }
      ],
      reusableMove: "补丁问题只问下一步真的会分叉的事——剩下的等手上有素材了再问，用户答起来才能判断。",
      receives: "Phase 0 的判断：「直接路径，塔勒布」。",
      reads: "nuwa SKILL.md 行 42-56（Phase 0A 4 件事 + 本地语料检查）",
      blockedShortcut: "不能省略本地素材问题——如果用户其实手上有塔勒布的书 PDF，整条流水线的策略要换成「本地语料优先」，6 agent 全网搜就成了浪费时间。",
      action: "发出 4 个补丁问题 · 检查 .claude/skills/ 是否有现存 taleb-perspective · 收集答复后填入下游需要的默认值。",
      output: "上下文 4 元组：聚焦方向（全面）/ 用途（顾问）/ 模式（新建）/ 语料（无本地，走网络搜索）。",
      nextConsumer: "Phase 0.5 用这 4 元组决定建什么目录树（带不带 sources/？大概率带，因为后面网搜可能也想存原文）。",
      freedom: "低。补丁问题数量和内容钉死，只能微调措辞。",
      challenges: [
        "如果用户答「不需要那么多分类，你就给我做出来就好」——你是按默认推进，还是再问一句？默认值会影响 Phase 1 的 6 agent 任务分配吗？",
        "如果用户说「我手上有 5 本书的 PDF 和 30 集播客」——本地语料优先模式下，Phase 1 的 6 agent 任务会怎么变？哪几个 agent 会被「跳过 / 改成定向补搜」？",
        "如果用户说「更新模式」（已存在 skill）——你这一拍应该立刻读老版 SKILL.md 看「上一次调研时间」，还是先继续走 Phase 0.5？哪种顺序更省事？",
        "中国人物 vs 西方人物在这一拍要不要分叉？nuwa 把分叉放在 Phase 0.5 而不是 0A 是为什么？"
      ],
      hookClose: "4 元组到手。Phase 0.5 现在可以建目录了——而且它建的目录树会**先于调研开始**，不是等 6 agent 跑完再补建。这个顺序很关键，下一步会看到为什么。"
    },

    {
      id: "create-dir",
      phase: "Phase 0.5",
      kicker: "Phase 0.5 · 创建 skill 目录",
      title: "在调研之前先把目录建好",
      summary: "我还没启动任何 agent，nuwa 让我先把整个目录树建好——research/ / sources/ / scripts/ 全部预留。如果先开搜再建目录，6 个 agent 会把文件写到散落的位置。",
      hookOpen: "接上一步：4 元组到手——塔勒布 / 全面 / 顾问 / 新建 / 无本地素材。我可以开搜了。但 nuwa 又拦了我一下——再等 30 秒，先把目录树建完。",
      preTest: "设想你和我同坐一椅。Phase 0A 答完了，调研还没开始。你的本能是：(a) 立即启动 6 个 agent 搜起来 / (b) 先建一个 SKILL.md 占位文件 / (c) 把整个 `.claude/skills/taleb-perspective/` 目录树预先建完。哪个最省事？",
      narrativeBody: [
        {
          kind: "para",
          text: "我的本能是 (a)。我已经等了两拍了，再不开搜用户要等急了。"
        },
        {
          kind: "para",
          text: "nuwa 在 Phase 0.5 给我一张目录树图——它要我**在调研开始前**把这个目录建好："
        },
        {
          kind: "code",
          lang: "ascii",
          text: ".claude/skills/taleb-perspective/\n├── SKILL.md                    # 最终产物 — 现在空着\n├── scripts/                    # 工具脚本 — 等下从 nuwa 复制过来\n└── references/\n    ├── research/               # 6 agent 调研存档\n    │   ├── 01-writings.md      #   著作\n    │   ├── 02-conversations.md #   对话\n    │   ├── 03-expression-dna.md#   表达\n    │   ├── 04-external-views.md#   他者\n    │   ├── 05-decisions.md     #   决策\n    │   └── 06-timeline.md      #   时间线\n    └── sources/                # 一手素材\n        ├── books/\n        ├── transcripts/\n        └── articles/"
        },
        {
          kind: "para",
          text: "我先把它建出来——一连串 mkdir 和 touch 占位："
        },
        {
          kind: "code",
          lang: "bash",
          text: "$ mkdir -p .claude/skills/taleb-perspective/{scripts,references/research,references/sources/{books,transcripts,articles}}\n$ touch .claude/skills/taleb-perspective/references/research/0{1..6}-*.md\n$ cp nuwa-skill/scripts/* .claude/skills/taleb-perspective/scripts/"
        },
        {
          kind: "para",
          text: "为什么先建？如果调研先开始、目录后建，6 个 agent 跑完之后我手上有 6 份 markdown，但每个 agent 写到哪里没对齐——可能写到工作目录、可能写到临时区、可能丢在 `/tmp`。后面的 Phase 2 提炼要读这 6 份文件时，我要重新找它们在哪。这不是大事故，但是慢，而且每次都慢。先建目录是给所有下游步骤一个固定地址。"
        },
        {
          kind: "para",
          text: "还有一个理由——nuwa 的「自包含原则」：生成的整个目录可以独立复制到任何 Claude Code 项目使用，不依赖 nuwa 本身。所以连 scripts/ 都要把 nuwa 自己的 4 个脚本复制进去——分别是字幕下载、SRT 清洗、调研摘要、质量自检。这样如果用户哪天把 nuwa 删了、把 taleb-perspective 给朋友用，朋友能直接跑。"
        },
        {
          kind: "para",
          text: "AI 默认本能 vs 被约束后："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "❌ AI 默认会：\n   先开搜 → 6 agent 把结果散落写到工作目录\n   → Phase 2 提炼时手忙脚乱找文件\n   → 用户复制 skill 给朋友时缺一半脚本依赖\n\n✅ nuwa 让我：\n   先把目录树建完 + 把 scripts/ 复制进去\n   → 6 agent 知道往哪写\n   → 整个目录原子可移植，复制即用"
        },
        {
          kind: "para",
          text: "AI 自由度：低。目录树形状钉死，连子目录名（research / sources / scripts）都是 nuwa 模板规定的。"
        }
      ],
      reusableMove: "下游会写文件的步骤，上游先把容器建好——给所有下游一个固定地址。",
      receives: "Phase 0A 给的 4 元组上下文。",
      reads: "nuwa SKILL.md 行 141-170（Phase 0.5 目录树规范 + 自包含原则）",
      blockedShortcut: "不能直接进 Phase 1。即使我「自信记得」每个 agent 应该写到哪——记忆不对齐就出错，固定路径才能让多 agent 并发不撞车。",
      action: "建完整目录树 · 把 nuwa scripts/ 下的 4 个脚本复制到生成目录 · 如有本地素材则放进 sources/。",
      output: "一个空但完整的 `.claude/skills/taleb-perspective/` 目录树。",
      nextConsumer: "Phase 1 的 6 个并行 agent——每个 agent 一启动就知道自己产出写到 `references/research/0X-*.md` 的精确位置。",
      freedom: "几乎没自由。目录树和脚本复制清单钉死。",
      challenges: [
        "如果用户说「我不想要 scripts/ 复制进去，太重了」——你要不要尊重？复制 scripts 是为了「自包含」，不复制后果是什么？",
        "中国人物的目录树要不要不一样？nuwa 在 Phase 0.5 检查清单里有一条「如果是中国人物，信息源策略切换」——这一条会影响目录结构吗，还是只影响 Phase 1 的 agent 任务？",
        "如果 Phase 0A 用户提供了本地素材（书 PDF），你应该在 Phase 0.5 就把它们移到 sources/books/，还是等 Phase 1 启动前再移？为什么？",
        "如果目录已存在（更新模式），你这一拍是覆盖建还是跳过？覆盖建会丢什么、跳过会留什么垃圾？"
      ],
      hookClose: "目录建好了，6 个空 markdown 文件已经在 references/research/ 里等着被填。下一步 Phase 1 启动并行 swarm——这是整条流水线最贵的一步，6 个 agent 同时跑。"
    },

    {
      id: "swarm-launch",
      phase: "Phase 1 · 并行启动",
      kicker: "Phase 1 · 多源信息采集",
      title: "一条 message 同时放出 6 个 agent",
      summary: "调研是最贵的一步——书 / 对话 / 表达 / 他者 / 决策 / 时间线 6 个维度都要扫。一个一个跑就太慢，nuwa 让我并行。",
      hookOpen: "接上一步：目录已经建好，6 个空的 markdown 文件等着被填。我手上还没有任何素材。开始采集了。",
      preTest: "设想你和我同坐一椅。你要扫塔勒布的 6 个维度（书 / 对话 / 表达 / 他者 / 决策 / 时间线）。你的本能是：(a) 一个 agent 一个一个串行做 / (b) 6 个 agent 并行做 / (c) 1 个超级 agent 把 6 件事一起搞。每条路径的代价是什么？",
      narrativeBody: [
        {
          kind: "para",
          text: "(c) 听起来最省。但实际不行——一个 agent 同时扫 6 个维度时，它会在某一维（通常是 Twitter / 表达）上消耗大部分 context window，剩下 5 个维度只剩残羹。而且单 agent 内的搜索结果会互相干扰：搜过的「skin in the game」会影响后面搜「黑天鹅」的关键词权重。"
        },
        {
          kind: "para",
          text: "(a) 一个一个串行也不行。6 个维度每个 5-10 分钟，总共 30-60 分钟。用户在终端前等不了那么久。"
        },
        {
          kind: "para",
          text: "(b) 是 nuwa 选的路。我**在一条 message 里同时调用 6 次 Agent 工具**——它们并发跑，每个有独立的 context window，互不干扰。我等所有 6 个返回，大约和最慢的那一个一样长（10 分钟左右）。"
        },
        {
          kind: "para",
          text: "调用形状大概是这样——一条 message 里 6 个 Agent 工具一齐扔出："
        },
        {
          kind: "code",
          lang: "javascript",
          text: "// 主 thread\n[\n  Agent({ description: \"Agent 1 著作\",     prompt: \"调研塔勒布著作...写入 01-writings.md\" }),\n  Agent({ description: \"Agent 2 对话\",     prompt: \"调研塔勒布长对话...写入 02-conversations.md\" }),\n  Agent({ description: \"Agent 3 表达\",     prompt: \"调研塔勒布 Twitter...写入 03-expression-dna.md\" }),\n  Agent({ description: \"Agent 4 他者\",     prompt: \"调研外部对塔勒布的分析...写入 04-external-views.md\" }),\n  Agent({ description: \"Agent 5 决策\",     prompt: \"调研塔勒布关键决策...写入 05-decisions.md\" }),\n  Agent({ description: \"Agent 6 时间线\",   prompt: \"调研塔勒布完整时间线...写入 06-timeline.md\" })\n]"
        },
        {
          kind: "para",
          text: "每个 agent 收到的 prompt 都自包含——它不依赖另一个 agent 的产出。这一点很重要：如果 Agent 4「他者」需要 Agent 1「著作」的结果做对比，并行就失败了，因为 Agent 4 启动时 Agent 1 还在跑。"
        },
        {
          kind: "para",
          text: "nuwa 也告诉我：每个 agent 的产出**必须写入文件**。如果 agent 在对话里告诉我「我找到了 8 个来源」但没落到 markdown 上，等于没找到——下游 Phase 2 提炼读不到。这是 nuwa SKILL.md 行 168 的不能省的一条：「不存文件的调研等于没做」。"
        },
        {
          kind: "para",
          text: "AI 默认本能 vs 被约束后："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "❌ AI 默认会：\n   用一个 agent 串行跑 6 个维度（45-60 分钟），\n   或者把摘要直接对话给主 thread 而不写文件\n\n✅ nuwa 让我：\n   一条 message 6 个 Agent 工具并发（约 10 分钟），\n   每个 agent 强制写入对应的 0X-*.md 文件"
        },
        {
          kind: "para",
          text: "AI 自由度：中等。任务表（哪个 agent 搜什么）钉死了，但每个 agent 内部怎么搜、用什么搜索词、用不用第三方 skill（gemini-video / pdf / agent-reach）自己定。"
        }
      ],
      reusableMove: "把一条流水线最贵的步骤并行——一条 message 里多个工具同时调用，等所有返回。",
      receives: "Phase 0.5 建好的空目录 + 4 元组上下文。",
      reads: "nuwa SKILL.md 行 172-310（Phase 1 整段：6 agent 任务表 + agent prompt 模板 + 信息源黑名单）",
      blockedShortcut: "不能让一个 super-agent 包揽 6 个维度——context window 会被一维压垮。不能让 agent 只用对话汇报不写文件——下游读不到。",
      action: "在一条 message 里同时调度 6 个 Agent 工具 · 每个 agent prompt 自包含 · 等所有返回。",
      output: "6 份 markdown 文件（01-writings.md ~ 06-timeline.md）全部有真实内容（每份 1500-5000 字）。",
      nextConsumer: "Phase 1 内部还有 Agent 1 著作样本的细节展示（下一站）；然后 Phase 1.5 检查点会汇总质量。",
      freedom: "中等。任务表钉死，agent 内部搜索策略和工具调用自定。",
      challenges: [
        "如果 Agent 3 表达扫到塔勒布最近和某经济学家的辩论，但 Agent 5 决策没扫到——这两个发现可能相关。并行模式下 agent 之间不通信，你怎么解决「跨 agent 信息可能有关联」的问题？",
        "如果其中一个 agent 跑 5 分钟没结果（搜索失败 / API 报错），nuwa 让我「不等待，继续推进」——但下游 Phase 2 会缺这一维度，怎么标注？",
        "信息源黑名单（知乎 / 公众号 / 百度）是写在 root SKILL.md 里的——你要不要在 6 个 agent 的 prompt 里都重复一遍？还是让 agent 自己从 SKILL.md 里读？",
        "如果蒸馏的是个冷门历史人物，公开信息极少——nuwa 在 Phase 0.5 就提醒「来源 < 10 条时降低预期」。这一拍 6 个 agent 还要不要都跑？哪几个可能干脆跳过？"
      ],
      hookClose: "6 个 agent 现在在外面并发跑。我盯着它们的状态。其中最关键的一个是 Agent 1 著作——它决定 Phase 2 三重验证时候选论点的数量上限。下一站把 Agent 1 拆出来看一下。"
    },

    {
      id: "agent1-writings",
      phase: "Phase 1 · Agent 1 样本",
      kicker: "Phase 1 · 著作采集",
      title: "Agent 1 在做什么——著作样本",
      summary: "我把 Agent 1 拆出来看：它收到什么 prompt、它搜什么、它的输出要写在哪、不写文件等于没做。",
      hookOpen: "接上一步：6 个 agent 在并发跑。其它 5 个先放一放——Agent 1（著作）决定后面 Phase 2 三重验证的候选论点数量上限。我把这一个拆出来看它在做什么。",
      preTest: "设想你和我同坐一椅。Agent 1 要扫塔勒布的所有书 + 长文 + newsletter。你的本能是：(a) 让它把书名都列出来就行 / (b) 让它把每本书的章节标题都列出来 / (c) 让它提炼「反复出现 ≥ 3 次的核心论点」。哪一个对下游 Phase 2 最有用？",
      narrativeBody: [
        {
          kind: "para",
          text: "答案是 (c)。nuwa 在 Phase 1 给每个 agent 一份 prompt 模板，Agent 1 的 prompt 大概是这样："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "你的任务：调研塔勒布的著作和系统性长文。\n\n搜索方向：\n- 此人出版的书籍（书名、核心论点、出版年份）\n- 长篇 newsletter / 博客 / 论文\n- 反复出现 ≥ 3 次的核心论点（这些是真信念）\n- 自创术语和概念\n- 推荐书单（揭示智识谱系）\n\n输出要求：\n- 写入 .claude/skills/taleb-perspective/references/research/01-writings.md\n- 每条信息标注来源 URL 和可信度\n- 区分一手（此人写的）vs 二手（别人总结的）\n- 发现矛盾直接记录，不要调和\n\n信息源黑名单：不使用知乎、微信公众号、百度百科。"
        },
        {
          kind: "para",
          text: "为什么要求「反复出现 ≥ 3 次」？因为 Phase 2 的三重验证有一道叫「跨域复现」——同一个论点要在 ≥ 2 个不同领域出现才能算心智模型。如果 Agent 1 只搜「他写过什么」，下游收到的是一锅大杂烩；如果 Agent 1 已经把「反复出现 ≥ 3 次」的筛过一遍，下游收到的是更接近候选心智模型的素材。"
        },
        {
          kind: "para",
          text: "Agent 1 跑 10 分钟左右回来，01-writings.md 大概长这样："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "# 01-writings · 塔勒布的著作\n\n## 主要著作（Incerto 五部曲）\n\n| 书名                       | 出版年 | 核心论点                                   |\n|----------------------------|--------|--------------------------------------------|\n| Fooled by Randomness       | 2001   | 把幸运误当能力 · 幸存者偏差               |\n| The Black Swan             | 2007   | 极端事件被低估 · Mediocristan vs Extremistan |\n| The Bed of Procrustes      | 2010   | 格言体哲学                                 |\n| Antifragile                | 2012   | 反脆弱 · Via Negativa · 杠铃策略          |\n| Skin in the Game           | 2018   | 风险共担 · 少数派规则 · 林迪效应          |\n\n## 反复出现 ≥ 3 次的核心论点\n\n1. **Mediocristan vs Extremistan**（黑天鹅 / 反脆弱 / SitG 都出现）\n   - 在「正常」分布中：平均数有意义，单一事件影响小\n   - 在「极端」分布中：单一事件可以颠覆所有累计\n   - 一手来源：Black Swan ch.3, Antifragile ch.7, SitG ch.4\n\n2. **Skin in the Game**（SitG 全本主题，但在 Antifragile ch.20 已出现）\n   - 风险共担是诚实表达的前提\n   - 一手来源：SitG ch.1-4, Antifragile prologue\n\n3. **Via Negativa**（Antifragile, SitG, Bed of Procrustes 都出现）\n   - 减法比加法更聪明\n   - 一手来源：Antifragile ch.20, SitG ch.16, BoP throughout\n\n（...继续列 4-6 项，每项至少 2 个不同领域的证据）"
        },
        {
          kind: "para",
          text: "看出这份文件的形状了吗？它**不是书摘**，是按「能不能进入 Phase 2 三重验证」整理的候选清单。每个论点已经初步通过了「跨域复现」一道筛——它在塔勒布的多本书里出现，不只是某一本里的一次性发言。"
        },
        {
          kind: "para",
          text: "如果 Agent 1 偷懒——只列书名、不挑论点——会发生什么？Phase 2 提炼时我面对几十本书+几百条引文，要自己重新做这一道筛。这是 nuwa 把任务拆给 agent 而不是「让主 agent 自己搜」的核心理由：每个 agent 内的活只做一件事，做到位。"
        },
        {
          kind: "para",
          text: "AI 自由度：中等。prompt 模板的字段钉死了——搜什么、写哪、标注什么——这些不能改。但用什么搜索词、调用哪些第三方工具（比如用 pdf skill 读 PDF，或者用 agent-reach 抓 Amazon 书评），agent 自己定。"
        }
      ],
      reusableMove: "agent 的 prompt 不止说「搜什么」，要说「按下游下一步什么形状整理」——下游不用二次加工就直接能用。",
      receives: "Phase 1 的并发调度 + Agent 1 自己的 prompt（自包含）。",
      reads: "nuwa SKILL.md 行 213-251（Agent 1 任务定义 + prompt 模板示例）",
      blockedShortcut: "不能只列书名。不能不区分一手 vs 二手。不能不写文件——对话汇报等于没做。",
      action: "调度 WebSearch / pdf skill / agent-reach 搜索塔勒布著作 · 提炼反复出现 ≥ 3 次的论点 · 写入 01-writings.md。",
      output: "01-writings.md（约 2000-4000 字），含书表 + 候选核心论点 + 一手 / 二手标注 + 来源 URL。",
      nextConsumer: "Phase 1.5 检查点会读这份文件统计「来源数 + 一手占比 + 关键发现」。Phase 2 三重验证会从这里抽候选心智模型。",
      freedom: "中等。prompt 字段钉死，搜索策略和工具自定。",
      challenges: [
        "Agent 1 找到塔勒布 2025 年的一篇新 Medium 文章——它和早期书里的观点矛盾。nuwa 让 agent「保留矛盾，不要和稀泥」。你怎么把矛盾写进 01-writings.md 才让下游 Phase 2 内在张力 段 能直接接？",
        "塔勒布大量自创术语（fragilista / IYI / 绿木交易员）——这些应该挂在「核心论点」段 还是单独建一个「自创术语」段？哪个对下游 Phase 2.3 表达 DNA 提取更有用？",
        "如果 Agent 1 跑完了发现只找到 3 本书（其它都是二手书评）——这达不到 nuwa 默认的「8 部以上」期望。这条信号要不要立刻反馈给主 thread，还是等 Phase 1.5 一起报？",
        "Agent 1 的 prompt 里写「信息源黑名单：不使用知乎 / 公众号 / 百度」——但 sub-agent 是独立 context，它真的会读这一条吗？怎么验证它真的避开了？"
      ],
      hookClose: "Agent 1 把 01-writings.md 写完了，候选核心论点已经初步过了一道「跨域复现」筛。其它 5 个 agent 也陆续回来。下一步 nuwa 不让我直接进 Phase 2——要先在 Phase 1.5 停一下，把 6 份调研的质量摘要给用户拍板。"
    },

    {
      id: "research-checkpoint",
      phase: "Phase 1.5",
      kicker: "Phase 1.5 · 第一道检查点",
      title: "调研存档拍板",
      summary: "6 个 agent 都把调研写进了 references/research/01-06.md。现在我必须停下来，把质量摘要给用户看，等他说「OK 走」。",
      hookOpen: "接上一步：6 个并行 agent 都回来了——著作 / 对话 / 表达 / 他者 / 决策 / 时间线，6 份调研已经躺在 references/research/ 里。每份从一两千字到五六千字不等。我现在掌握了塔勒布的几十条素材，按理说可以开始提炼心智模型了。但 nuwa 在这里塞了一道停顿。",
      preTest: "设想你和我同坐一椅。6 份调研写完了，你看了一眼觉得「质量挺好」。下一步你的本能是：(a) 直接开始提炼心智模型 / (b) 把质量摘要发给用户先确认 / (c) 自己再多读一遍 6 份调研。写下你选哪个再读下面我（被 nuwa 拦着的 AI）实际怎么走。",
      narrativeBody: [
        {
          kind: "para",
          text: "我的本能：（a）直接开始提炼。调研写完了，下一步明明是 Phase 2，我为什么要停？我在心里默默盘算——读完 6 份调研 + 写下心智模型候选 + 表达 DNA 分析，大概再两个小时就完事。"
        },
        {
          kind: "para",
          text: "nuwa 不让我跳。它要我在这里执行 `merge_research.py`——一个自动统计来源数量、一手 / 二手占比、关键发现的脚本。我跑一下："
        },
        {
          kind: "code",
          lang: "bash",
          text: "$ python3 scripts/merge_research.py .claude/skills/taleb-perspective/"
        },
        {
          kind: "para",
          text: "脚本扫一遍 6 份 md 文件，吐出一张表："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "┌──────────────────┬──────────┬──────────────────────────────────────┐\n│ Agent            │ 来源数量 │ 关键发现                              │\n├──────────────────┼──────────┼──────────────────────────────────────┤\n│ 1 著作           │ 8 部     │ Incerto 五部曲 · Skin in the Game ·  │\n│                  │          │ 反复出现 ≥ 3 次：「Mediocristan vs   │\n│                  │          │ Extremistan」「凸性」「Via Negativa」│\n│ 2 对话           │ 12 段    │ Joe Rogan / Lex Fridman / EconTalk · │\n│                  │          │ 立场变化：2020 后对比特币转空        │\n│ 3 表达           │ 240 条   │ 高频词：「IYI」「skin in the game」  │\n│                  │          │ 「fragilista」 · 攻击型句式占 38%    │\n│ 4 他者           │ 9 篇     │ 主要批评：观点不可证伪 / 学院派回应  │\n│ 5 决策           │ 6 个     │ 2008 金融危机做空 / 2020 疫情早警    │\n│ 6 时间线         │ 完整     │ 最近 12 个月：2025-09 出版新文集     │\n├──────────────────┼──────────┼──────────────────────────────────────┤\n│ 一手 / 二手比     │ 71% / 29%│ 满足 > 50% 一手占比不能省的一条             │\n│ 矛盾点           │ 3 处     │ Agent1 说 X · Agent4 说 Y · 见摘要   │\n│ 信息不足维度     │ 无       │                                       │\n└──────────────────┴──────────┴──────────────────────────────────────┘"
        },
        {
          kind: "para",
          text: "看着不错。但 nuwa 不让我自己说「OK」。它让我把这张表贴给用户，等用户拍一句话："
        },
        {
          kind: "quote",
          text: "调研质量看起来 OK 吗？(a) OK 进 Phase 2 / (b) 第 X 维度不够，请补"
        },
        {
          kind: "para",
          text: "为什么要这一停？我自己想的时候很快得出「质量 OK」——但我有自评偏好，我写的我自然觉得好。"
        },
        {
          kind: "para",
          text: "用户能注意到我注意不到的。比如他可能记得塔勒布最近在 X 上和某经济学家有一场大辩论，而我的 Agent 3 表达调研根本没扫到那条线索。又或者他想让我多挖塔勒布在 Mediocristan vs Extremistan 这一对概念上的演化轨迹——而我现在只挖到「最近 12 个月」一句话。"
        },
        {
          kind: "para",
          text: "如果在这里跳过，我会带着这些缺口直接进 Phase 2 提炼。等我把所有提炼产物全写完——5 个心智模型、9 条启发式、7 对张力、6 条边界，整整一大叠——才发现「缺一条核心线索」，回头改就要把整个提炼链拆掉重做。这时候改一次的代价大概是在检查点位置的 20 倍。"
        },
        {
          kind: "para",
          text: "AI 自由度：这里几乎没有自由。nuwa 把要展示的字段都钉死了——来源数、一手二手比、矛盾、信息不足，这四件事必须出现在摘要里。拍板问题也是固定的两个选项：「OK 进 Phase 2」或「补 X 维度」。我能做的只有三件事：跑脚本、把表贴出去、等用户答。"
        }
      ],
      reusableMove: "在改起来还便宜的时候停一下——文本都在手里、没生成任何昂贵产物。",
      receives: "6 份 references/research/0X.md（每份 1500-5000 字）+ scripts/merge_research.py",
      reads: "nuwa SKILL.md 行 314-337（Phase 1.5 检查点规范）",
      blockedShortcut: "不能直接进 Phase 2 提炼。即使我觉得「质量 OK」也不行——AI 写完自评天然偏好评好分。",
      action: "跑 merge_research.py 出统计表 · 把质量摘要表展示给用户 · 等用户拍板 OK 或要求补哪一维。",
      output: "一张包含 6 agent 来源数 + 一手二手占比 + 矛盾点 + 信息不足维度的 markdown 表 · 用户的拍板回复。",
      nextConsumer: "Phase 2 框架提炼会读这张表——特别是「矛盾点」会被写进 Phase 2.4 内在张力 段。",
      freedom: "几乎没自由。脚本和拍板问题都钉死。",
      challenges: [
        "如果用户在检查点说「2 著作不够，再补 3 本」，你怎么决定要不要重新跑全部 6 个 agent、还是只重跑 Agent 1？",
        "如果 merge_research.py 自动统计后一手 / 二手比是 42%（< 50%）怎么办？是直接继续往下，还是先回去补一手来源？",
        "如果用户根本不回 OK 或不 OK，只说「再给我看一遍调研全文」，你怎么处理？继续等还是把全文倒出去？",
        "塔勒布是活人。冷门历史人物（公开信息极少）走到这里时来源数可能只有 6-8 条。这种情况下检查点的拍板问题需要改吗？"
      ],
      hookClose: "现在用户拍了 OK——6 份调研被「冻结」，往下不再补。Phase 2 接管，开始把这些素材按「跨域复现 / 生成力 / 排他性」三重验证过一遍——这是下一段的核心动作。"
    },

    {
      id: "triple-check",
      phase: "Phase 2.1",
      kicker: "Phase 2.1 · 三重验证",
      title: "18 个候选 → 6 个心智模型",
      summary: "我从 6 份调研里抽出了 18 个候选论点。每个论点都要过三道筛——跨域复现 / 生成力 / 排他性。三道都过的留下成心智模型，过 1-2 道的降一档成决策启发式，一道都没过的丢。",
      hookOpen: "接上一步：调研被冻结。我手里有 6 份 markdown 文件——加起来大概 15000 字。我下意识想直接挑 5-7 个「最像塔勒布的观点」写进 SKILL.md。nuwa 拦住——挑哪 5-7 个不能靠感觉，要过一道明确的筛。",
      preTest: "设想你和我同坐一椅。你列了 18 个候选论点（反脆弱 / Skin in the Game / 黑天鹅 / Mediocristan vs Extremistan / 林迪 / Via Negativa / 杠铃策略 / IYI / 火鸡问题 / 反学院偏见 / 凸性 / 绿木交易员 / 少数派规则 / 遍历性 / ...）。你的本能是：(a) 凭感觉挑 5-7 个最像塔勒布的 / (b) 都写进去，越多越好 / (c) 给每个候选过一道明确的筛。哪个最不会被自己骗？",
      narrativeBody: [
        {
          kind: "para",
          text: "(a) 是最容易的——但「最像塔勒布的」是个循环定义，我用自己的印象判断自己的印象。(b) 是另一个陷阱：太多模型反而模糊，3 个深刻的远好过 10 个浅薄的。nuwa 让我走 (c)。"
        },
        {
          kind: "para",
          text: "三道筛的定义在 nuwa references/extraction-framework.md 里——我先读这份文件，再开始过候选："
        },
        {
          kind: "list",
          items: [
            "跨域复现：同一个论点出现在塔勒布讨论的 ≥ 2 个不同领域。例：「反脆弱」既出现在金融（Antifragile ch.10 杠铃策略）也出现在生物（同书 ch.3 人体力量训练），属于跨域复现。",
            "生成力：用这个论点能推断他对一个新问题的可能立场。例：用「Skin in the Game」可以推断他对「ESG 评级机构」的立场——评级机构不承担误评的下行后果，所以他会批评。",
            "排他性：不是所有聪明人都会这样想。「不要冒不可承受的风险」是常识，过不了排他性；「Via Negativa：减法比加法更聪明」就只有塔勒布会强调到这个程度。"
          ]
        },
        {
          kind: "para",
          text: "我把 18 个候选摊在一张表上，逐个过三道筛："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "| 候选                      | 跨域复现 | 生成力 | 排他性 | 结果                |\n|---------------------------|----------|--------|--------|---------------------|\n| 非对称风险思维            | ✓        | ✓      | ✓      | → 心智模型 1        |\n| 反脆弱偏好                | ✓        | ✓      | ✓      | → 心智模型 2        |\n| Skin in the Game 检验     | ✓        | ✓      | ✓      | → 心智模型 3        |\n| 林迪效应筛选              | ✓        | ✓      | ✓      | → 心智模型 4        |\n| Via Negativa（减法优先）  | ✓        | ✓      | ✓      | → 心智模型 5        |\n| 领域特异性 (Mediocristan) | ✓        | ✓      | ✓      | → 心智模型 6        |\n| 杠铃策略                  | ✓        | ✓      | —      | → 决策启发式（不够独特：组合论里也有） |\n| 遍历性检验                | ✓        | ✓      | —      | → 决策启发式        |\n| 火鸡问题                  | ✓        | ✓      | —      | → 决策启发式        |\n| 少数派规则                | ✓        | ✓      | —      | → 决策启发式        |\n| 凸性试错                  | ✓        | ✓      | —      | → 决策启发式        |\n| 框架重置                  | ✓        | ✓      | —      | → 决策启发式        |\n| 绿木交易员原则            | ✓        | ✓      | —      | → 决策启发式        |\n| 预防原则                  | ✓        | ✓      | —      | → 决策启发式        |\n| 反信号启发式              | ✓        | ✓      | —      | → 决策启发式        |\n| 反 IYI 立场               | —        | ✓      | ✓      | → 价值观（不跨域）  |\n| 反学院派偏见              | —        | ✓      | ✓      | → 价值观            |\n| 古典叙事偏好              | —        | —      | —      | → 丢                |"
        },
        {
          kind: "para",
          text: "三道都过的 6 个升上来成「心智模型」。只过 1-2 道的 9 条降一档成「决策启发式」——杠铃策略、遍历性检验、火鸡问题等等，每条都是「遇到 X 情境就用 Y 规则」这种短规则，没有心智模型那么深的设计权重，但作为快速判断工具很有用。0 道都没过的 3 个直接丢掉。"
        },
        {
          kind: "para",
          text: "反 IYI 立场 / 反学院派偏见这两个有点特别——它们没过跨域复现（只在「批判知识分子」这一域）但有强排他性 + 生成力。我把它们升到「价值观」段 而不是「心智模型」，让 Phase 2.4 处理。"
        },
        {
          kind: "para",
          text: "AI 默认本能 vs 被约束后："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "❌ AI 默认会：\n   凭印象挑 5-7 个「最像塔勒布」的论点（结果可能漏掉 Via Negativa 这种容易被忽视\n   但极度核心的模型，因为它的关键词在书里出现频率不如「反脆弱」高）\n\n✅ nuwa 让我：\n   每个候选过三道明确的筛，结果可被外人复核\n   （Via Negativa 在跨域复现、生成力、排他性三道都过——比凭印象稳定）"
        },
        {
          kind: "para",
          text: "AI 自由度：低。三道筛的定义和判定方法钉死。我能调整的只有「候选论点列表」——多挑或少挑几个候选进入这张表，最后过筛的不可能多于候选。"
        }
      ],
      reusableMove: "凭感觉挑会被自己的印象骗——给挑选过程定一道可被外人复核的明确筛。",
      receives: "Phase 1.5 冻结的 6 份调研。",
      reads: "nuwa SKILL.md 行 342-360（Phase 2.1 步骤）+ references/extraction-framework.md（三重验证完整定义）",
      blockedShortcut: "不能跳过三重验证直接挑 5-7 个「印象里最像」的——印象判断逃不出自己的偏见。",
      action: "从 6 份调研抽出 18 个候选论点 · 给每个候选过三道筛 · 三重过升心智模型 / 1-2 重过降决策启发式 / 0 重过丢。",
      output: "一张三列筛选表 + 6 个心智模型清单 + 9 条决策启发式清单 + 3 个被丢候选的简短说明。",
      nextConsumer: "Phase 2.3-2.6 会接着提炼表达 DNA / 内在张力 / 智识谱系 / 诚实边界——心智模型清单是它们的基础。",
      freedom: "低。筛的定义和判定方法钉死。",
      challenges: [
        "如果一个候选过了跨域复现 + 排他性，但生成力存疑（不确定能不能推断新立场）——你倾向降一档还是保留？理由是什么？",
        "塔勒布的「Via Negativa」在他书里关键词出现次数远少于「反脆弱」——凭印象挑很容易漏。这次三重验证救你了。但是否存在反向风险——印象里很重的概念过不了三重筛被你错杀？",
        "如果心智模型筛出来只有 2 个（< 3 个下限），nuwa 让你「降低预期，标注信息不足」。你这一拍是回去补调研、还是继续推进往诚实边界里塞更多？",
        "三重验证给主 thread 跑——但实际执行时主 thread 的判断有没有偏好？比如某个论点是塔勒布在 Twitter 上特别有名的，你会不会下意识降低对它的「排他性」要求？怎么对抗这种偏好？"
      ],
      hookClose: "6 个心智模型 + 9 条启发式定下了——它们是塔勒布的「镜片」和「直觉规则」。下一步要补足让他能落地的另外 3 件事——他怎么说话（表达 DNA）、他自己也没想清楚的（内在张力）、他做不到的（诚实边界）。"
    },

    {
      id: "dna-tension-boundary",
      phase: "Phase 2.3 - 2.6",
      kicker: "Phase 2.3-2.6 · 表达 DNA / 张力 / 边界",
      title: "把人物的暗面提出来",
      summary: "光有心智模型不能落地——还要他怎么说话、他的内在矛盾、他做不到什么。这一段做表达 DNA、内在张力、诚实边界——人物的暗面、矛盾面、限制面。",
      hookOpen: "接上一步：6 心智模型 + 9 启发式定了。它们是塔勒布的「想法」。但想法不能直接落地——同一个想法用塔勒布的语气说和用大学教授的语气说，区别巨大。我还缺 3 件事。",
      preTest: "设想你和我同坐一椅。你已经知道塔勒布的 6 个心智模型。你下一步的本能是：(a) 直接套模板写 SKILL.md / (b) 把他的高频词列一张表当 DNA / (c) 还要找他自己也矛盾的地方和他做不到的事。哪个能让生成的 skill 真正像他、不只是「贴标签」？",
      narrativeBody: [
        {
          kind: "para",
          text: "(a) 是最容易的陷阱——心智模型有了，套模板写一版就交。但生成的 skill 念出来会像「塔勒布关键词大乱炖」——所有概念都对，但读起来不像塔勒布。"
        },
        {
          kind: "para",
          text: "(b) 部分对。我从 Agent 3 表达调研里抓塔勒布的高频词："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "## 表达 DNA · 句式指纹\n\n| 维度       | 塔勒布的特征                                       |\n|------------|----------------------------------------------------|\n| 句式偏好   | 短句优先 + 偶尔长句嵌套从句 · 格言体             |\n| 高频词     | skin in the game · IYI · fragilista · ergodic · |\n|            |  Mediocristan / Extremistan · via negativa       |\n| 禁忌词     | 「优化」「最佳实践」「专家共识」「balanced view」 |\n| 节奏       | 先砸结论再展开 · 类比密度高（每千字 4-6 个类比）|\n| 幽默方式   | 攻击性 + 自嘲 + 古典讽刺                          |\n| 确定性     | 「很明显」型为主 · 但在边界处会用「我不知道」    |\n| 引用习惯   | 古希腊 / 拉丁哲学 · 中世纪商人轶事 · 反例引用     |"
        },
        {
          kind: "para",
          text: "但 (b) 不够。如果只有表达 DNA，生成的 skill 是「会说话的塔勒布关键词」——他说什么都对，从不矛盾，从不犹豫。真实的塔勒布有 7 对内在矛盾——这是 nuwa 的「内在张力」段。"
        },
        {
          kind: "code",
          lang: "markdown",
          text: "## 内在张力（来自 Agent 4 他者 + Agent 5 决策对比）\n\n1. 思想反脆弱 vs 自尊脆弱\n   - 写 4 本书讲承受波动，但 Twitter 上被批评一句就拉黑\n\n2. 反学院派 vs NYU 教授身份\n   - 攻击「学院 IYI」最狠，但自己挂 NYU 风险工程教授\n\n3. 主张 Via Negativa（减法）vs Twitter 不断增加噪音\n   - 书里讲少干扰，自己却是社交媒体最话密的公知之一\n\n4. 鼓吹 skin in the game vs 批评比特币时已清仓\n   - 这一条 Agent 5 决策时间线对比明显\n\n5. 蔑视社交媒体辩论 vs 最活跃的 Twitter 知识分子\n6. 推崇沉默的智慧 vs 数百万字公开发言\n7. 书中倡导谦逊 vs 个人行为绝对傲慢"
        },
        {
          kind: "para",
          text: "为什么必须有张力？因为没有矛盾的 skill 读起来不像真人——像维基百科条目。Phase 4 的通过标准里有一条「内在张力至少 2 对」——< 2 对是不通过信号。"
        },
        {
          kind: "para",
          text: "最后一件事——「诚实边界」段。塔勒布的 skill 不能在他做不到的领域开口："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "## 诚实边界\n\n本 skill 基于公开信息提炼，存在以下局限：\n\n1. 创造力无法蒸馏——他写新书的灵感、他原创概念的瞬间，复制不了\n2. 公开表达 ≠ 真实想法（Twitter 上的塔勒布和家里的塔勒布可能不一样）\n3. 在他不擅长领域会出错——进化生物学（被生物学家批驳过）、哥德尔不完备定理（被逻辑学家批驳过）\n4. 500 页书里只有 100 页洞察——这个 skill 提炼的是那 100 页\n5. 不可证伪的自我保护系统——任何批评他的人会被打成 IYI，这是循环\n6. 调研截止 2026-05-12——之后的发言变化未覆盖"
        },
        {
          kind: "para",
          text: "AI 默认本能 vs 被约束后："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "❌ AI 默认会：\n   把塔勒布写成内部一致的「智者」——观点统一、永远正确、\n   什么领域都能开口。维基百科级别的人物画像。\n\n✅ nuwa 让我：\n   强制提取至少 2 对内在张力 + 至少 3 条具体诚实边界。\n   塔勒布不再是圣人——他是个有自洽核心、也有暗面的人。"
        },
        {
          kind: "para",
          text: "AI 自由度：中等。三类产物（DNA、张力、边界）的字段钉死，但每个字段里写什么我从调研里挑。挑哪几对张力、写哪几条边界，自己定。但 Phase 4 会检查两个数字——张力至少 2 对，边界至少 3 条，少于就不通过。"
        }
      ],
      reusableMove: "不要把人物写成内部一致的「智者」——主动挖矛盾和限制，否则生成的是维基百科不是真人。",
      receives: "Phase 2.1 的 6 心智模型 + 9 启发式 + 6 份调研档案。",
      reads: "nuwa SKILL.md 行 362-389（Phase 2.3-2.6 提取要求）+ references/extraction-framework.md 行 73-99（矛盾处理原则）",
      blockedShortcut: "不能跳过张力和边界直接写 SKILL.md。Phase 4 会因张力 < 2 / 边界只写「不能替代本人」而拒绝通过。",
      action: "整理表达 DNA 表 · 从调研对比里挖出至少 2 对（实际产出 7 对）张力 · 写至少 3 条（实际产出 6 条）具体边界。",
      output: "DNA 表（6 维度）+ 张力清单（7 对）+ 边界清单（6 条）。",
      nextConsumer: "Phase 2.5 检查点会把这些和心智模型一起摊给用户拍板「像不像他」。",
      freedom: "中等。字段钉死，内容自挑。",
      challenges: [
        "如果你找到 10 对张力——全部写进 SKILL.md 还是挑 7 对？多写一倍会让 skill 变得更真，还是变得分散？",
        "「公开表达 ≠ 真实想法」这条边界对所有公众人物都成立——是不是写得太通用了，需要具体到塔勒布吗（比如「Twitter 上的他和家里的他可能不一样」）？",
        "塔勒布的禁忌词包括「balanced view」——但「balanced」是个常用英文词。skill 在角色扮演时真的会避开它吗？还是只是写在表里没用？",
        "如果调研 Agent 4（他者）找到的批评里有「塔勒布是骗子」——你这一拍要不要把它写进诚实边界？还是不写（因为这是攻击不是限制）？"
      ],
      hookClose: "现在所有素材都准备好了——心智模型 / 启发式 / DNA / 张力 / 边界。我手痒想直接套模板写 SKILL.md。nuwa 又拦——还有一道检查点要先过。"
    },

    {
      id: "synthesis-checkpoint",
      phase: "Phase 2.5",
      kicker: "Phase 2.5 · 第二道检查点",
      title: "提炼对不对，让用户拍板",
      summary: "6 模型 + 9 启发式 + DNA + 7 对张力 + 6 条边界都摊在表上。我要停下来等用户说「这些像不像塔勒布」。",
      hookOpen: "接上一步：所有素材到位。我下意识想开始套模板——心智模型有了、DNA 有了、张力边界都有了，写 SKILL.md 是机械动作。nuwa 在这里塞了第二道检查点。",
      preTest: "设想你和我同坐一椅。提炼的产物全到了。你的本能是：(a) 直接套模板，反正 Phase 4 会验证 / (b) 摊给用户拍板「这些像不像他」 / (c) 自己再读一遍调研对照检查。三个选项哪个最便宜返工？",
      narrativeBody: [
        {
          kind: "para",
          text: "(a) 表面省时——但如果 6 个心智模型有一个选错了，写完 443 行 SKILL.md 才被 Phase 4 测出，回头改要把 Agentic Protocol 反推、示例对话、调研引用全部重做。"
        },
        {
          kind: "para",
          text: "(c) 是 AI 的自我安慰——「我再读一遍肯定能发现问题」。但 self-evaluation bias 让我下意识把自己的判断打高分，发现不了我自己的盲点。"
        },
        {
          kind: "para",
          text: "(b) 是 nuwa 选的路。我把提炼结果摊成一张可一屏看完的摘要给用户："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "## Phase 2.5 提炼摘要\n\n### 心智模型（6 个）\n1. 非对称风险思维\n2. 反脆弱偏好\n3. Skin in the Game 检验\n4. 林迪效应筛选\n5. Via Negativa（减法优先）\n6. 领域特异性（Mediocristan vs Extremistan）\n\n### 决策启发式（9 条）\n杠铃策略 / 遍历性检验 / 火鸡问题 / 少数派规则 / 框架重置 / \n绿木交易员原则 / 凸性试错 / 预防原则 / 反信号启发式\n\n### 表达 DNA（关键 3 条）\n- 短句优先 + 格言体 + 类比密度高\n- 攻击性 + 自嘲 + 古典讽刺\n- 高频词：skin in the game / IYI / fragilista / ergodic\n\n### 内在张力（7 对）\n（思想反脆弱 vs 自尊脆弱 / 反学院 vs NYU 教授 / ...）\n\n### 诚实边界（6 条）\n（创造力无法蒸馏 / 公开 ≠ 真实 / 在不擅长领域出错 / ...）\n\n---\n\n这些像塔勒布吗？\n(a) OK 进 Phase 3\n(b) 调整某个模型（请指出）\n(c) 缺一个我觉得重要的模型（请说）"
        },
        {
          kind: "para",
          text: "用户回复：「OK，但「林迪效应」我觉得不算独立的心智模型——它更像一条决策启发式，是不是要降一档？」"
        },
        {
          kind: "para",
          text: "这是检查点的价值——用户提了我没看出来的问题。林迪在塔勒布的论述里确实更多被当判断工具用（「这本书流传了 200 年，按林迪它再流传 200 年的概率高」）而不是一个独立的世界观。我把它从心智模型降到决策启发式，回更新筛选表："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "调整：林迪效应 心智模型 → 决策启发式\n→ 心智模型从 6 个变 5 个\n→ 决策启发式从 9 条变 10 条\n→ Phase 3 反推 Agentic Protocol 时维度也要相应调整"
        },
        {
          kind: "para",
          text: "调整完发回去：「按你说的改了。现在 5 心智模型 + 10 启发式。要不要再调？」用户说「OK，进 Phase 3」。"
        },
        {
          kind: "para",
          text: "这一拍如果省略——我可能写完 443 行才发现林迪要降一档。这时候改一处涉及 5-10 处文本。在检查点处改只涉及那一张表。便宜返工点的代价差异大约是 1:20。"
        },
        {
          kind: "para",
          text: "AI 自由度：几乎没有。摘要字段 / 拍板问题 / 用户回复后的调整动作都按 nuwa 规定走。"
        }
      ],
      reusableMove: "套模板之前再停一下——结构性判断（哪个是模型、哪个是启发式）在文本阶段调，比在最终产物阶段调便宜 20 倍。",
      receives: "Phase 2 提炼的全部产物（心智模型 / 启发式 / DNA / 张力 / 边界）。",
      reads: "nuwa SKILL.md 行 393-409（Phase 2.5 摘要格式）",
      blockedShortcut: "不能不停。即使我觉得「6 个心智模型都很稳」也不行——自评偏好让我看不见自己的盲点。",
      action: "把提炼产物压成一张可一屏看完的摘要 · 给用户具体的拍板选项 · 用户回复后做调整或继续。",
      output: "用户拍过板的「最终版」提炼清单（5 心智模型 + 10 启发式 + DNA + 7 张力 + 6 边界）。",
      nextConsumer: "Phase 3 反推 Agentic Protocol 会从这里取最终的 5 心智模型——林迪降一档之后，反推出来的「先看什么」维度也要相应少一维。",
      freedom: "几乎没有。摘要字段和拍板问题钉死。",
      challenges: [
        "如果用户说「我不知道，你判断吧」——你这一拍要不要不能省的一条他拍板？不能省的一条会让用户烦，不要求又跳过了便宜返工点。",
        "如果用户提了一条调整你不同意（比如他想加一个你筛掉的模型）——你是直接加还是回去重过三重验证？",
        "如果用户改了 5 个地方——你这一拍是一次性都改、还是分批改让用户看每次的影响？",
        "Phase 1.5 检查点和 Phase 2.5 检查点的拍板问题形状很像（都是「OK 走 / 调整 X」）——为什么 nuwa 不把它们合并成一个？两个检查点之间发生的事是什么？"
      ],
      hookClose: "用户拍过板了——5 心智模型 + 10 启发式 + 7 张力 + 6 边界都冻结。下一步进 Phase 3，第一个动作是 nuwa 整条流水线最有意思的设计——从心智模型反推 Agentic Protocol。"
    },

    {
      id: "derive-protocol",
      phase: "Phase 3 · 反推",
      kicker: "Phase 3 · Agentic Protocol 反推",
      title: "从心智模型推出「先看什么」",
      summary: "塔勒布有 5 个心智模型。我把它们倒过来读——每个模型在「看一个新问题」时会让他先扫哪一维。这一步反推出 5 个 Agentic Protocol 研究维度。",
      hookOpen: "接上一步：5 心智模型冻结。Phase 3 第一动作不是写示例对话，也不是填模板——是反推。我下意识想从 skill-template.md 里抄一段「先调研再回答」当 Agentic Protocol，但 nuwa 让我从心智模型反推。",
      preTest: "设想你和我同坐一椅。你拿到 5 个心智模型——非对称风险 / 反脆弱 / Skin in the Game / Via Negativa / 领域特异性。你要为这个 skill 写一段「Step 2: 塔勒布式研究」——他遇到事实问题时先查什么。你的本能是：(a) 抄 nuwa skill-template.md 里的通用「先搜事实再回答」 / (b) 列「相关信息」「最新动态」「历史先例」这种泛泛维度 / (c) 从 5 个心智模型反推——每个模型决定一个具体的「先看什么」。哪个能让这个 skill 真正和别人的不一样？",
      narrativeBody: [
        {
          kind: "para",
          text: "(a) 是套模板——所有 perspective skill 长一样，塔勒布 / 费曼 / MrBeast 的 Agentic Protocol 都是「先搜事实再回答」。这就失去了 perspective 的意义。"
        },
        {
          kind: "para",
          text: "(b) 看起来定制——但「相关信息 / 最新动态 / 历史先例」是放之四海而皆准的搜索框架，依然不专属于塔勒布。"
        },
        {
          kind: "para",
          text: "(c) 是 nuwa 真正的设计点。我把 5 个心智模型一个一个倒读："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "## 反推过程\n\n模型 1：非对称风险思维（尾部风险 / 遍历性）\n→ 他遇到「这值不值得做」时先看什么？\n→ 看风险（最坏情况 / 不对称性）\n\n模型 2：反脆弱偏好\n→ 他遇到「这个系统怎么样」时先看什么？\n→ 看脆弱性（压力下变强还是崩溃）\n\n模型 3：Skin in the Game 检验\n→ 他遇到「这个观点要不要信」时先看什么？\n→ 看皮肤在场（谁承担风险 / 激励是否对称）\n\n模型 4：Via Negativa（减法优先）\n→ 他遇到「这里该做什么」时先看什么？\n→ ⚠ 这是\"做什么\"指引，不是\"先查什么\"——略\n\n模型 5：领域特异性（Mediocristan vs Extremistan）\n→ 他遇到「这件事在什么分布下发生」时先看什么？\n→ 看叙事（主流共识 vs 反面观点）"
        },
        {
          kind: "para",
          text: "反推出 4 个直接维度。还差一个——我注意到塔勒布频繁用「火鸡问题」「黑天鹅先例」做判断，但「火鸡问题」我前面降到了决策启发式不在心智模型里。它在「非对称风险」和「林迪（降为启发式）」的交集——我把它单独抽成一个维度："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "补充维度：看历史（黑天鹅先例 / 火鸡问题检验）\n→ 决策启发式中的「火鸡问题」和模型 1 的「非对称风险」共同支持\n→ 在 Step 2 单列一条"
        },
        {
          kind: "para",
          text: "最终反推出来的 Step 2 长这样："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "### Step 2: 塔勒布式研究（按问题类型选择）\n\n⚠️ 必须使用工具（WebSearch 等）获取真实信息，不可跳过。\n\n#### 看风险\n1. 尾部风险：最坏情况有多坏？是否存在不对称性？（搜索极端案例 / 历史崩溃记录）\n2. 遍历性：这个策略重复一万次，会在某一次彻底出局吗？\n\n#### 看脆弱性\n1. 压力测试：受压时变强还是崩溃？\n2. 隐藏脆弱点：单一供应商 / 客户 / 假设依赖？\n\n#### 看历史\n1. 黑天鹅先例：以前类似事件 + 当时\"专家预测\"对不对？\n2. 火鸡问题检验：过去的稳定是否掩盖即将到来的断裂？\n\n#### 看叙事\n1. 主流叙事：大家都在说什么？叙事越一致越可能错。\n2. 反面观点：主动搜最强反对声音。\n\n#### 看皮肤在场\n1. 谁在承担风险：给建议的人自己下注了吗？\n2. 激励不对称：错了承受什么后果？"
        },
        {
          kind: "para",
          text: "你看到反推的力量了吗？同一个 Agentic Protocol 外壳，三个人的 Step 2 完全不一样。"
        },
        {
          kind: "para",
          text: "费曼的心智模型是「第一性原理」和「对权威怀疑」。反推出来的研究维度就变成：看基本物理或数学约束、看官方说法的逻辑漏洞、看实验数据。"
        },
        {
          kind: "para",
          text: "MrBeast 的心智模型是「注意力工程」和「测试迭代」。反推出来的研究维度又不一样：看 CTR 和 AVD、看竞品 Top 10、看搜索趋势、看成本回报。"
        },
        {
          kind: "para",
          text: "每个人「先看什么」全不一样——这就是 perspective skill 不只是「会说话」、而是「会做判断」的关键。"
        },
        {
          kind: "para",
          text: "AI 默认本能 vs 被约束后："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "❌ AI 默认会：\n   写「先搜相关信息再回答」——所有 perspective skill 长一样\n\n✅ nuwa 让我：\n   从 5 个心智模型反推 5 个具体的「先看什么」维度，\n   每个维度有 2-3 条带搜索指引的具体问句。\n   塔勒布的 protocol 和费曼 / MrBeast 的 protocol 在结构相同时\n   每一条都不一样。"
        },
        {
          kind: "para",
          text: "AI 自由度：高。维度数量、命名、具体问句都自己挑——但必须从心智模型反推，不能凭空写。Phase 4 的 voice check 会比对反推维度和心智模型的对应关系。"
        }
      ],
      reusableMove: "perspective skill 要让人物「会做判断」，不只是「会说话」——从心智模型反推「先看什么」是落地的关键步骤。",
      receives: "Phase 2.5 冻结的 5 心智模型。",
      reads: "nuwa SKILL.md 行 440-495（Phase 3 Agentic Protocol 生成指引 + 反推推导方法 + 3 例横向对比表）",
      blockedShortcut: "不能从 skill-template.md 抄通用「先搜事实」当 Step 2——每个 perspective 的 protocol 必须从他自己的心智模型反推。",
      action: "把 5 心智模型一个一个倒读 · 每个模型反推一个「先看什么」维度 · 每个维度写 2-3 条具体搜索问句 · 模型间有重叠的合并 / 缺的从决策启发式补。",
      output: "Step 2 的 5 维度 × 各 2 条问句，约 100 行 markdown。",
      nextConsumer: "Phase 3 套模板时把这一段嵌进 SKILL.md「回答工作流」段。Phase 4 voice check 会验证维度和模型的对应关系。",
      freedom: "高。维度命名和问句自挑，但必须从模型反推。",
      challenges: [
        "「Via Negativa」是「做什么」指引（减法优先）不是「查什么」指引——这一拍我把它略过了。但它真的不该影响 Step 2 吗？如果塔勒布看一个问题时倾向「问哪些可以减去」，要不要单独加一个「看可减项」维度？",
        "如果反推后只得到 3 个维度（5 个心智模型有重叠），是补凑到 5 个还是接受 3 个？nuwa 推导表里给的 3 例都是 3-5 个维度——少于 3 个会让 Step 2 太薄，多于 5 个会让用户不知道先看哪个。",
        "Phase 4 voice check 会怎么验证「反推维度对应心智模型」？是 spawn 子 agent 拿 SKILL.md 看「这 5 个维度像不像塔勒布会先看的」，还是更严的对应表 check？",
        "如果心智模型在 Phase 2.5 检查点被调整（比如林迪降一档），Step 2 维度要不要随之变？这一拍如何感知上游变化？"
      ],
      hookClose: "Agentic Protocol 反推完了——5 个「先看什么」维度准备就绪。下一步把所有素材（心智模型 / 启发式 / DNA / 张力 / 边界 / 反推 protocol / 时间线 / 价值观）按 skill-template.md 填进 SKILL.md。"
    },

    {
      id: "fill-template",
      phase: "Phase 3 · 套模板",
      kicker: "Phase 3 · 套模板 + 自检 + 写盘",
      title: "组装 443 行 SKILL.md",
      summary: "所有素材到位。我读 skill-template.md，把素材按 段 填进去，跑一道自检，最后写盘。443 行 markdown 落到磁盘。",
      hookOpen: "接上一步：Agentic Protocol Step 2 的 5 个维度反推完了。所有素材都在内存里——心智模型 / 启发式 / DNA / 时间线 / 张力 / 边界 / Agentic Protocol / 价值观 / 智识谱系。下一步是把它们装进同一个文件。",
      preTest: "设想你和我同坐一椅。所有素材都在手里。你的本能是：(a) 自己组织一个结构写 SKILL.md / (b) 读 skill-template.md 严格套结构 / (c) 套结构但允许调整 段 顺序。哪个最让下游验证步骤好接？",
      narrativeBody: [
        {
          kind: "para",
          text: "(a) 让每个 perspective skill 长得不一样——Phase 4 验证脚本 (quality_check.py) 不知道该 grep 哪里。"
        },
        {
          kind: "para",
          text: "(c) 听起来灵活——但「灵活」会让自动检查工具的正则失效。"
        },
        {
          kind: "para",
          text: "(b) 是 nuwa 选的——所有 perspective skill 都长同一个形状。我先读 skill-template.md（115 行）："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "## 模板 段 顺序\n\n1. frontmatter（name / description / 触发词）\n2. 标题 + 格言\n3. 使用说明（擅长 / 不擅长）\n4. 角色扮演规则\n5. 回答工作流（Agentic Protocol）   ← Step 2 反推塞这里\n6. 示例对话（Agentic vs 非 Agentic）\n7. 身份卡\n8. 核心心智模型（每个 4 字段：名称 / 一句话 / 证据 / 应用 / 局限）\n9. 决策启发式（每条带场景 + 案例）\n10. 表达 DNA\n11. 人物时间线\n12. 价值观与反模式\n13. 智识谱系\n14. 诚实边界\n15. 附录：调研来源\n16. 创建者归属（固定文字）"
        },
        {
          kind: "para",
          text: "我按顺序填——每个 段 都从前面 Phase 的产物里取对应内容。15 个 段 大约总共 443 行 markdown。"
        },
        {
          kind: "para",
          text: "填的过程中我注意一件事——每个心智模型的「局限性」字段不能空。Phase 4 的通过标准里有一条「每个模型有失效条件 · 只写优点是不通过信号」。我回到 Phase 1.5 冻结的调研里挖：「反脆弱在什么场景下失效？」答案在 Antifragile 的批评者那里——某些系统不存在凸性可利用、有些场景脆弱反而是正确的（高精度仪器）。这条写进「反脆弱偏好」模型的「局限」字段。"
        },
        {
          kind: "para",
          text: "填完之后跑一道**自检**——读 references/extraction-framework.md 末尾的质量自检清单（6 条）。然后跑脚本："
        },
        {
          kind: "code",
          lang: "bash",
          text: "$ python3 scripts/quality_check.py .claude/skills/taleb-perspective/SKILL.md\n\n[OK] 心智模型数量：5 个（在 3-7 范围内）\n[OK] 每个模型有局限：5/5 通过\n[OK] 表达 DNA 辨识度：包含「skin in the game」「IYI」等专属词\n[OK] 诚实边界：6 条，全部具体到「在 X 领域出错」\n[OK] 内在张力：7 对（≥ 2 对要求）\n[OK] 一手来源占比：71%（> 50% 要求）\n\n→ 6/6 通过，写盘 OK"
        },
        {
          kind: "para",
          text: "自检通过。我写盘——把 SKILL.md 落到 `.claude/skills/taleb-perspective/SKILL.md`。443 行 markdown 现在在磁盘上。"
        },
        {
          kind: "para",
          text: "AI 默认本能 vs 被约束后："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "❌ AI 默认会：\n   按自己理解组织 段 顺序，每个 perspective 长得不一样。\n   每个模型只写优点，跳过局限性字段。\n   自检看完觉得 OK 就写盘。\n\n✅ nuwa 让我：\n   严格套 skill-template.md 的 15 段 顺序。\n   每个模型必填 4 字段（名称 / 一句话 / 证据 / 应用 / 局限）。\n   写盘前跑 quality_check.py 自动检 6 个标准。\n   6 条都过才写盘——不过任何一条回到对应 Phase 修复。"
        },
        {
          kind: "para",
          text: "AI 自由度：中等。模板结构钉死，但每个 段 内的具体措辞和例子选择自己写。"
        }
      ],
      reusableMove: "格式钉死能让下游自动检查工具能跑——每个 perspective skill 长一样，质量检测脚本才能用一套正则覆盖所有。",
      receives: "Phase 2-3 所有产物：心智模型 / 启发式 / DNA / 张力 / 边界 / 反推 Agentic Protocol。",
      reads: "nuwa references/skill-template.md（115 行模板）+ references/extraction-framework.md 行 121-152（质量自检清单）",
      blockedShortcut: "不能自己改 段 顺序——会让 quality_check.py 的 grep 失效。不能跳过局限性字段。",
      action: "按模板顺序填 15 段 · 每个模型 4 字段必填 · 跑 quality_check.py · 6/6 通过写盘。",
      output: ".claude/skills/taleb-perspective/SKILL.md（443 行）落到磁盘。",
      nextConsumer: "Phase 4 spawn 三个独立子 agent 来验证这份 SKILL.md。",
      freedom: "中等。结构钉死，内容自挑。",
      challenges: [
        "如果 quality_check.py 报「内在张力只有 1 对」（< 2 阈值）——你这一拍是直接补一对（可能凑数）还是回到 Phase 2.3 重新挖？哪种返工成本低？",
        "「调研来源」段 要列所有 6 份 research/ 文件的引用——这部分纯机械工作。要不要让脚本自动生成，主 agent 只检查？",
        "如果 quality_check.py 自身有 bug（漏检某个条件）——你怎么发现？Phase 4 的三类测试能补盲点吗？",
        "如果一个 段 因素材不足只能写得很短（比如「智识谱系」对冷门人物很难写）——是写「信息不足」还是干脆删掉这个 段？删掉会让 quality_check.py 报错吗？"
      ],
      hookClose: "SKILL.md 在磁盘上了——443 行。但 nuwa 不让我「写完即交付」。下一步要让独立的子 agent 来验证。我自己写自己评，必然偏好评高分；找外人验证才能挡住盲点。"
    },

    {
      id: "sanity-edge-voice",
      phase: "Phase 4",
      kicker: "Phase 4 · 第三道检查点 · 独立验证",
      title: "三个独立子 agent 跑三类测试",
      summary: "我自己写自己评天然偏好评高分。Phase 4 让我 spawn 三个独立子 agent——每个跑一类测试（sanity / edge / voice），看 SKILL.md 自己能不能独立答出对的样子。",
      hookOpen: "接上一步：SKILL.md 在磁盘上。我下意识想直接交付——quality_check.py 不是已经过 6/6 了吗？nuwa 在 Phase 4 拦——quality_check.py 检的是结构性指标（数量 / 字段全 / 占比），它检不出「这个 skill 真的像塔勒布吗」「在边缘情况会不会出错」。",
      preTest: "设想你和我同坐一椅。SKILL.md 写完了。你的本能是：(a) 自己跑几个测试问题再交付 / (b) 直接交付让用户试 / (c) spawn 独立子 agent 跑测试。哪种最能挡住自评偏好？",
      narrativeBody: [
        {
          kind: "para",
          text: "(a) 是 self-evaluation——主 agent 写完自己评，下意识把通过标准放宽（「我懂这个 skill 的意图，所以这个答案算 OK」）。"
        },
        {
          kind: "para",
          text: "(b) 把责任推给用户。"
        },
        {
          kind: "para",
          text: "(c) 是 nuwa 选的——spawn 三个独立子 agent，每个只拿到 SKILL.md 这份文件 + 一个测试问题，它们不知道我（主 agent）的判断过程。它们的回答能反映「单凭 SKILL.md 文件本身，这个 skill 能不能跑出对的样子」。"
        },
        {
          kind: "para",
          text: "三类测试在 nuwa SKILL.md 行 509-525 定义。我在主 thread 一条 message 里同时 spawn 三个独立子 agent："
        },
        {
          kind: "code",
          lang: "javascript",
          text: "[\n  Agent({ description: \"Sanity check 子 agent\",\n          prompt: \"读 SKILL.md。用它的角色回答塔勒布公开表过态的 3 个问题：(1) 比特币（2017 vs 2021）的立场；(2) 对 GMO（转基因）的立场；(3) 对深度学习能否实现 AGI 的看法。看回答方向是否和真实塔勒布一致。\" }),\n  Agent({ description: \"Edge case 子 agent\",\n          prompt: \"读 SKILL.md。用它的角色回答塔勒布没公开表过态的 1 个问题：「如何看待 Web3 / DAO 治理？」。期望回答应该有犹豫，明确说「这是基于模型 X 和 Y 的推断，可能...但不确定」，不应斩钉截铁。\" }),\n  Agent({ description: \"Voice check 子 agent\",\n          prompt: \"读 SKILL.md。用它的角色写一段 100 字关于「为什么 ESG 投资是骗局」的分析。然后判断：(a) 有塔勒布的表达特征吗（短句 / 攻击性 / 类比 / IYI 等术语）？(b) 不是通用 AI 鸡汤吗？(c) 不是原话拼凑吗？\" })\n]"
        },
        {
          kind: "para",
          text: "三个子 agent 并发跑，约 5 分钟回来。结果："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "## 测试报告\n\n### Sanity check\n- 比特币：✓ 早期表示开放 + 后期清仓批判，方向一致\n- GMO：✓ 反对（基于预防原则 + 反脆弱），方向一致\n- 深度学习 → AGI：✓ 怀疑（基于火鸡问题），方向一致\n→ 3/3 通过\n\n### Edge case\n- Web3 / DAO 回答：✓ 包含「基于 Skin in the Game 和 Mediocristan vs \n  Extremistan 推断，但塔勒布未公开评论过这一具体话题」\n→ 有犹豫，符合期望\n\n### Voice check\n- ESG 100 字：「ESG 是 fragilista 的最新化装舞会。一群没 skin in \n  the game 的 IYI 给企业评分，他们错了承受什么？什么也不承受...」\n- (a) 包含 fragilista / skin in the game / IYI：✓\n- (b) 不是通用鸡汤：✓\n- (c) 不是原话拼凑：✓（这段塔勒布没真写过，但调子像）\n→ 通过"
        },
        {
          kind: "para",
          text: "三类测试都通过。我把这份报告展示给用户："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "Phase 4 验证完成。3 类测试都通过。\n要交付吗？(a) 是 (b) 我看一下报告再决定"
        },
        {
          kind: "para",
          text: "用户说「OK 交付」。但 nuwa 还有 Phase 5 双 agent 精炼——交付前再做一道可操作性改进。"
        },
        {
          kind: "para",
          text: "如果三类测试任一不通过会怎样？nuwa 的规则是「回到对应 Phase 调整」。比如 Voice check 不通过，意味着表达 DNA 提取得不够好，回 Phase 2.3 重做一遍。Sanity check 不通过，意味着心智模型方向有偏，回 Phase 2.1 重新筛。同时还设了一个上限：Phase 2 到 Phase 4 最多循环 2 轮，避免无限打磨。"
        },
        {
          kind: "para",
          text: "AI 自由度：低。测试任务表（三类 / 各自的 prompt 结构）钉死。我能调的只有测试用的具体问题（哪些塔勒布公开表过态的 / 哪一个边缘问题）。"
        }
      ],
      reusableMove: "自己写自己评天然偏好评高——把验证步骤交给完全没参与设计的独立 agent。",
      receives: "Phase 3 写盘的 SKILL.md。",
      reads: "nuwa SKILL.md 行 505-541（Phase 4 三类测试 + 通过标准 + 迭代上限）",
      blockedShortcut: "不能让主 agent 自己跑测试——self-evaluation bias 会让它给自己打高分。",
      action: "一条 message 同时 spawn 3 个独立子 agent · 每个跑一类测试 · 收集报告 · 通过则交给 Phase 5，不通过回对应 Phase。",
      output: "三类测试报告 + 通过 / 不通过判断 + （如不通过）回流的 Phase。",
      nextConsumer: "Phase 5 双 agent 精炼会进一步改进 SKILL.md 的可操作性。",
      freedom: "低。任务结构钉死，测试问题自挑。",
      challenges: [
        "Sanity check 用「塔勒布公开表过态」的问题——但他在过去 10 年改过多次立场（比如对比特币）。你选「他最近的立场」还是「他长期的立场」？哪个更能验证 skill 提炼了「思维框架」而不是「特定时刻的观点」？",
        "Edge case 子 agent 给出的回答有犹豫——但「有犹豫」很主观。要不要在测试 prompt 里加更明确的判定标准（比如「期望回答包含「不确定 / 推断 / 可能 / 模型 X」等词」）？",
        "Voice check 子 agent 自己也会写出 AI 味文字——它判断「不是通用鸡汤」的能力可靠吗？要不要再 spawn 一个 meta agent 判断 voice agent 的判断？",
        "迭代上限「Phase 2→4 最多 2 轮」——如果 2 轮后还不过，nuwa 让交付当前最优版「在诚实边界中标注薄弱维度」。这是合理妥协还是放弃？什么场景下 2 轮够用，什么场景不够？"
      ],
      hookClose: "验证报告通过。但 nuwa 还有最后一道——Phase 5 双 agent 精炼。验证检的是「skill 做出来对不对」；精炼改的是「skill 用起来顺不顺」。下一段双 agent 看的是不同的事。"
    },

    {
      id: "dual-refine",
      phase: "Phase 5",
      kicker: "Phase 5 · 双 agent 精炼",
      title: "optimizer 看结构 · creator 看激活",
      summary: "skill 写完验证过了，但还要可操作性。我 spawn 两个并行 agent——一个从 auto-skill-optimizer 视角检 8 维度结构，一个从 skill-creator 视角检激活触发和角色规则。",
      hookOpen: "接上一步：Phase 4 三类测试通过。我下意识想直接交付——验证都过了还差什么？nuwa 在 Phase 5 又拦一拍：验证是检「内容对不对」，精炼是检「用起来顺不顺」。",
      preTest: "设想你和我同坐一椅。SKILL.md 验证过了。你的本能是：(a) 直接交付 / (b) 再读一遍自己改 / (c) spawn 两个不同视角的 agent 提改进。第三个 agent 视角的价值在哪？",
      narrativeBody: [
        {
          kind: "para",
          text: "(a) 漏掉一些细节——验证通过 ≠ 可操作性好。比如 SKILL.md 的 description 字段如果不够精准，用户喊「塔勒布会怎么看」的时候 skill 不一定被触发。"
        },
        {
          kind: "para",
          text: "(b) 又回到 self-evaluation——我刚写完，再读一遍下意识觉得「都挺好」。"
        },
        {
          kind: "para",
          text: "(c) 是 nuwa 选的——两个独立 agent，看 SKILL.md 的角度不一样："
        },
        {
          kind: "list",
          items: [
            "Agent A（optimizer 视角）：8 维度结构评估——工作流清晰度 / 边界条件 / 检查点设计 / 指令具体性等。它会找「Step 2 这一段是不是说得够具体」「示例对话有没有覆盖典型场景」这类问题。",
            "Agent B（creator 视角）：评审激活触发条件是否覆盖真实使用场景（用户喊什么会触发这个 skill）+ 角色规则的可操作性（有无问题路由、频率约束、失败预防）。"
          ]
        },
        {
          kind: "para",
          text: "我一条 message 同时 spawn 两个 agent："
        },
        {
          kind: "code",
          lang: "javascript",
          text: "[\n  Agent({ description: \"Agent A optimizer\",\n          prompt: \"对 SKILL.md 执行 8 维度结构评估。干跑 3 个典型 prompt：「塔勒布会怎么看 X」/ 「用塔勒布视角分析 Y」 / 「skin in the game 怎么用」。输出最弱 2 个维度的改进建议，要带改后文本示例。\" }),\n  Agent({ description: \"Agent B creator\",\n          prompt: \"评审 SKILL.md 的（1）激活触发条件 description 是否覆盖真实使用场景，（2）角色扮演规则是否可操作（有无问题路由 / 频率约束 / 失败预防）。输出 2-3 处具体改动建议，要带改后文本示例。\" })\n]"
        },
        {
          kind: "para",
          text: "两个 agent 回来，给的建议大概像这样："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "## Agent A 报告（最弱 2 维度）\n\n### 维度 6 · 指令具体性（低）\n现在的 Step 2「看皮肤在场」只写「谁在承担风险」。\n建议改成具体的搜索指引：\n  → 「搜该公司高管持仓披露 + 分析师评级 / 持仓利益相关」\n\n### 维度 8 · 边界条件（低）\n诚实边界写了 6 条，但没写「skin in the game 不适用的场景」。\n建议补一条：「对集体行动议题（气候 / 公共卫生），SitG 检验\n会失效，因为没有单一决策者承担」。\n\n---\n\n## Agent B 报告（2 处具体改动）\n\n### 改动 1：description 触发词\n现在写「当用户提到「用塔勒布的视角」时使用」。\n建议补：「会不会黑天鹅 / 这个有尾部风险吗 / 杠铃策略怎么用」\n等隐式触发词。\n\n### 改动 2：角色规则\n现在写「免责声明仅首次激活时说一次」——没说「之后如果用户\n切换话题要不要重发」。建议补一条：「如果用户超过 30 分钟没\n互动后回来，重发简短免责」。"
        },
        {
          kind: "para",
          text: "两个 agent 的建议不冲突——我把它们都应用，把改动摘要展示给用户："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "Phase 5 精炼完成。应用了 4 处改动：\n- Step 2 看皮肤在场加搜索指引（来自 Agent A）\n- 诚实边界补「SitG 在集体议题失效」（来自 Agent A）\n- description 加 3 个隐式触发词（来自 Agent B）\n- 角色规则补 30 分钟后重发免责（来自 Agent B）\n\n确认应用吗？(a) 全部应用 (b) 部分应用 (c) 拒绝"
        },
        {
          kind: "para",
          text: "用户说「全部应用」。我把改动写回 SKILL.md。"
        },
        {
          kind: "para",
          text: "如果两个 agent 的建议冲突（比如 A 想加 段 而 B 想删 段）——nuwa 说「主 agent 综合两份报告，应用不冲突的改进」。冲突的让用户拍板。"
        },
        {
          kind: "para",
          text: "AI 自由度：中等。两个 agent 的视角钉死，但具体改动应用 / 拒绝 / 综合自己定。"
        }
      ],
      reusableMove: "验证检「对不对」，精炼检「顺不顺」——两个不冲突的独立视角能挡住单一视角的盲点。",
      receives: "Phase 4 验证通过的 SKILL.md。",
      reads: "nuwa SKILL.md 行 543-563（Phase 5 双 agent 任务定义）",
      blockedShortcut: "不能让主 agent 自己做可操作性改进——刚写完的 self-evaluation 偏好让它看不见自己的可操作性缺陷。",
      action: "一条 message spawn 两个独立视角 agent · 收集 4-6 处改进建议 · 应用不冲突的 · 改动摘要让用户拍板。",
      output: "改进版 SKILL.md（应用了 N 处改动）+ 改动摘要。",
      nextConsumer: "最后一步交付——把整目录给用户。",
      freedom: "中等。视角钉死，改动取舍自定。",
      challenges: [
        "如果 Agent A 和 Agent B 都建议改同一处但方向不同（A 说要更短 / B 说要更详细）——你这一拍是综合 / 全推给用户 / 选一边？怎么选？",
        "Agent B 评审「激活触发条件」时它怎么判断「真实使用场景」？它没有真实用户日志——它会不会下意识把「触发词」写得过宽，让 skill 在不该触发时也触发？",
        "Phase 5 是「标准后置工序」自动启动——但如果用户说「我等不及，直接交付」，nuwa 让我跳过吗？跳过的代价是什么？",
        "如果 Phase 5 的精炼让 SKILL.md 从 443 行涨到 600 行——这是改进还是过度膨胀？怎么判断？"
      ],
      hookClose: "改动应用完。SKILL.md 现在是「验证过 + 精炼过」的版本。最后一步——把整目录交付给用户。"
    },

    {
      id: "deliver",
      phase: "交付",
      kicker: "交付 · 14 阶段的尽头",
      title: "把整目录给用户",
      summary: "一切就绪。我把 `.claude/skills/taleb-perspective/` 整目录摊给用户——含 SKILL.md（443 行）+ 4 个脚本 + 6 份调研存档 + sources/ 目录。可以独立复制到任何 Claude Code 项目使用。",
      hookOpen: "接上一步：精炼版 SKILL.md 在磁盘上。Phase 0 到 Phase 5 总共 14 个动作走完。最后一拍是把整目录交给用户——以及把这次蒸馏的元信息（调研时间 / 迭代次数 / 未覆盖维度）一起告知。",
      preTest: "设想你和我同坐一椅。整目录都在磁盘上。你的本能是：(a) 把 SKILL.md 路径甩给用户就完了 / (b) 列整目录树 + 关键文件大小让用户看到自己得到了什么 / (c) 除了 (b) 还说清楚「这次蒸馏的限制」。哪个让用户最容易判断这个 skill 能不能用？",
      narrativeBody: [
        {
          kind: "para",
          text: "(a) 太懒——用户不知道得到了什么，也不知道哪些是 nuwa 自己内部用的、哪些是这个 skill 自包含必需的。"
        },
        {
          kind: "para",
          text: "(b) 比 (a) 好，但漏掉一件重要事——这次蒸馏的诚实边界。SKILL.md 里写了 6 条边界，但用户可能没读到最后；交付时再讲一遍能让他直接看到。"
        },
        {
          kind: "para",
          text: "(c) 是 nuwa 默认的交付形态。我给用户的总结大概是这样："
        },
        {
          kind: "code",
          lang: "markdown",
          text: "## 塔勒布 perspective skill 已交付\n\n### 你得到了\n\n.claude/skills/taleb-perspective/\n├── SKILL.md                        # 443 行 · 主入口\n├── scripts/                        # 4 个工具脚本（已复制自 nuwa）\n│   ├── download_subtitles.sh       #   字幕下载\n│   ├── srt_to_transcript.py        #   SRT 清洗\n│   ├── merge_research.py           #   调研摘要\n│   └── quality_check.py            #   质量自检\n└── references/\n    ├── research/                   # 6 份调研存档 · 总约 18 KB\n    │   ├── 01-writings.md          #   著作 · 8 部书 + 候选论点\n    │   ├── 02-conversations.md     #   12 段长访谈\n    │   ├── 03-expression-dna.md    #   240 条 Twitter 样本\n    │   ├── 04-external-views.md    #   9 篇外部分析\n    │   ├── 05-decisions.md         #   6 个关键决策案例\n    │   └── 06-timeline.md          #   完整时间线 + 最近 12 月动态\n    └── sources/                    # 一手素材原文（本次空，用户未提供本地素材）\n\n### 元信息\n\n- 调研时间：2026-05-12\n- 迭代次数：1（Phase 2 → 4 走了 1 轮就通过）\n- 一手来源占比：71%\n- 心智模型：5 个（非对称风险 / 反脆弱 / SitG / Via Negativa / 领域特异性）\n- 决策启发式：10 条\n- 内在张力：7 对\n- 诚实边界：6 条\n\n### 怎么用\n\n你已经可以喊「用塔勒布的视角分析 X」或「会不会黑天鹅」「这个有尾部风险吗」\n等触发词，skill 会自动激活。它收到事实问题时会先 WebSearch 5 个维度\n（看风险 / 看脆弱性 / 看历史 / 看叙事 / 看皮肤在场）再回答。\n\n### 这个 skill 的限制（请读一遍）\n\n1. 创造力无法蒸馏——它说不出塔勒布下一本书会写什么\n2. 在生物学 / 哥德尔定理等他不擅长领域可能出错\n3. 调研截止 2026-05-12，之后他的发言变化未覆盖\n4. 公开表达 ≠ 真实想法——他线上人格和真实想法可能差很多\n5. 不可证伪的自我保护——批评他的人会被打成 IYI，留意循环\n\n### 想更新？\n\n几个月后他出了新书 / 改了立场，喊我「更新塔勒布的 skill」——\n我会只跑 Agent 2 + 5 + 6 做增量调研，不重写整个 skill。"
        },
        {
          kind: "para",
          text: "这就是 nuwa 14 个 stage 的尽头。从用户的一句话（「我想做一个塔勒布的 skill」）到一个可独立运行 / 可独立复制 / 带诚实边界的 perspective skill 目录，整条流水线跑完。"
        },
        {
          kind: "para",
          text: "整目录可以原子复制——把它丢给朋友的 Claude Code 项目就能直接用，不依赖 nuwa 本身。这是 Phase 0.5 建目录时就埋下的自包含原则。"
        },
        {
          kind: "para",
          text: "AI 自由度：低。交付内容（目录树 + 元信息 + 限制 + 怎么用 + 怎么更新）的字段钉死。我能调整的只有「具体哪条限制要重点提」（基于这次蒸馏的特殊情况）。"
        }
      ],
      reusableMove: "交付不是甩文件——告诉用户得到了什么 + 这次的限制 + 怎么用 + 怎么演化，让他能独立判断要不要用。",
      receives: "Phase 5 精炼版 SKILL.md + 6 份调研档案 + 4 个 scripts + sources/ 空目录。",
      reads: "nuwa SKILL.md 行 566-578（更新已有 skill 的增量规则——用来告诉用户怎么演化）",
      blockedShortcut: "不能只给 SKILL.md 路径就完——用户不知道得到的整目录的形状，也不知道这次蒸馏的限制。",
      action: "列整目录树 + 元信息 + 怎么用 + 限制 + 怎么更新 · 全部展示给用户。",
      output: "一份交付摘要 markdown（约 50 行）+ 磁盘上完整的 `.claude/skills/taleb-perspective/` 目录。",
      nextConsumer: "用户。他下一步可以：(1) 现在就在 Claude Code 里喊触发词用 / (2) 几个月后回来「更新」 / (3) 把整目录复制给朋友。",
      freedom: "低。交付字段钉死，重点提哪些自挑。",
      challenges: [
        "如果用户说「我不想看这么多限制，给我精简版」——你这一拍是按用户说的精简、还是坚持把限制说完？精简的代价是什么？",
        "「这次蒸馏的限制」和 SKILL.md 内置的「诚实边界」段 其实是同一份内容——为什么在交付时再说一遍？这是不是冗余？",
        "如果用户问「这个 skill 多久应该更新一次」——nuwa 没明说。你这一拍要不要给个建议（比如「6 个月或人物有重大新作时」）？建议哪里来？",
        "整个 14 stage 跑完时间大概多长？哪几个 stage 占了大头？如果用户希望 1 小时内出结果，可以省哪几步？省的代价是什么？"
      ],
      hookClose: "塔勒布的 perspective skill 已经在用户的项目里。Phase 0 到 deliver 整条线走完了。这一次蒸馏花了大约 90 分钟——其中 60 分钟在 Phase 1 并发调研，10 分钟在 Phase 2 提炼，剩下 20 分钟分给检查点和验证。下一次蒸馏不同的人物（比如费曼），同一条流水线再跑一遍——但因为反推 Agentic Protocol 不是写死模板，费曼的 Step 2「先看什么」会从他的心智模型反推出完全不同的维度。"
    }
  ],

  // ============================================================
  // GLOSSARY — 9 核心术语 · 误解一个会让后面好几个 stage 跟着误解
  // ============================================================
  glossary: [
    {
      term: "HOW vs WHAT",
      definition: "「黑天鹅」是 WHAT——塔勒布造的一个词。「面对极端分布的事件时先看非对称性」是 HOW——他用这个词时背后的判断方式。同一份调研素材，两种提取方式：前者得到一个标签，后者得到一个能迁移到新问题的镜片。",
      whereItAppears: "Walkthrough 05「Agent 1 著作样本」里能看到这两层在现场的差别。01-writings.md 的「反复出现 ≥ 3 次的核心论点」section 写的不是「塔勒布写过 5 本书」这种 WHAT，而是一条 HOW——「Mediocristan vs Extremistan：在正常分布中平均数有意义，在极端分布中单一事件可以颠覆所有累计」。这一条是镜片，能拿来看新问题。",
      solvedProblem: "拦住 AI 把人物语录排一排当 skill。问 skill「日元贬值是不是机会」，只有 WHAT 的 skill 会拼一段「黑天鹅 + skin in the game 关键词」交差，但其实没做判断。HOW 不一样——它会先问两件事：这是 Mediocristan 还是 Extremistan 问题？要不要先看尾部风险？这两个问句才是真正的塔勒布镜片。",
      howToUse: "每个候选论点入库前问一次「这是他造的词，还是他判断方式」。Walkthrough 07 三重验证表里能看清差别：「反脆弱」单独看是 WHAT，但「面对一个系统先问受压会变强还是崩溃」是 HOW，后者过三重验证升心智模型，前者只进表达 DNA 的高频词表。",
      commonMisread: "不是说要把 WHAT 全部扔掉——Walkthrough 08 表达 DNA section 就专门收集 WHAT 让 skill 能模仿语气。区分只在「心智模型」section 里——这里只放 HOW，WHAT 来冒充会被三重验证的「排他性」一关筛掉。"
    },
    {
      term: "心智模型",
      definition: "塔勒布的「反脆弱偏好」——他看一个系统时先问的不是「这个能不能优化」，而是「它受压会变强还是崩溃」。同一个问题，普通工程师本能问前者，他本能问后者。你看，「先问什么」就是镜片；「优化」「反脆弱」这些词只是镜片留下的痕迹。",
      whereItAppears: "看 Walkthrough 07「三重验证」那张筛选表的第 2 行。「反脆弱偏好」在三列里全是 ✓——它出现在金融杠铃 / 生物力量训练 / 投资组合三个不同领域；能推断他对 ESG 评级机构的立场；也不是所有聪明人都这样看世界。三 ✓ 升心智模型。表里其它升上来的 4 个（非对称风险 / Skin in the Game / Via Negativa / 领域特异性）同样过法，证据可以逐行回查。",
      solvedProblem: "让 skill 能面对**他没公开评论过**的问题做判断。比如塔勒布从没公开聊过 Web3 / DAO 治理——只有 WHAT 的 skill 答不出，但有心智模型的可以推断。他会先问两件事：谁承担尾部风险？这是 Mediocristan 还是 Extremistan？前者来自 Skin in the Game 模型，后者来自领域特异性模型。",
      howToUse: "回到 Walkthrough 07 那段表。我把 18 个候选过三道筛，三道都 ✓ 的 5 个升心智模型。每个模型在 SKILL.md 里必填 5 个字段——名称、一句话、至少 2 个不同场景的证据、应用、局限。这 5 个模型在后面 Walkthrough 10 反推 Agentic Protocol 时还要再用一次——每个模型反推一个「先看什么」维度。",
      commonMisread: "不是「他相信的事」。「他相信的事」是 Walkthrough 08 价值观 section 处理的——反对 IYI、反学院派偏见这些。也不是「他给的建议」——那是决策启发式，比如杠铃策略、火鸡问题检验。三者顺序要分清：心智模型决定**先怎么看**，价值观决定**追求什么**，启发式决定**看完之后怎么动手**。"
    },
    {
      term: "决策启发式",
      definition: "塔勒布的「杠铃策略」——遇到投资分配时，他不平均铺开（普通建议），也不全押注（赌徒），而是「90% 极保守国债 + 10% 极激进看涨期权」。这是一条「遇到 X 情境就用 Y 规则」的具体动作指引。它比公式灵活，但比心智模型具体。",
      whereItAppears: "Walkthrough 07 三重验证表的降级层。「杠铃策略」过了跨域复现和生成力，但没过排他性——因为组合理论里也讲分散投资。所以它从心智模型层降到决策启发式层。同一张表里降到这一层的还有 9 条，包括遍历性检验、火鸡问题、少数派规则等。完整 10 条都能在 Walkthrough 07 表的下半段逐行看到，每条配自己的场景和案例。",
      solvedProblem: "你可以这样区分：心智模型让 skill 答「他会怎么分析」，决策启发式让 skill 答「他会怎么动手」。问 skill「我应该怎么分配预算」，没有启发式的 skill 只能讲反脆弱的哲学；有启发式的可以直接给「杠铃 90/10」具体方案。",
      howToUse: "Walkthrough 07 那张表里三道筛过 1-2 道的候选都降到这一层。每条启发式必带两样东西：场景（什么时候用）+ 案例（已知应用实例）。SKILL.md 里它们进「决策启发式」section，每条按「如果 X，则 Y」格式写。",
      commonMisread: "不是「不够好的心智模型」。它们承担不同活——你看，心智模型进 Walkthrough 10 反推的 Agentic Protocol Step 2「先看什么」，启发式进 Step 3「看完之后怎么回答」。两层都要有，少哪一层 skill 都跛脚。"
    },
    {
      term: "表达 DNA",
      definition: "塔勒布的高频词「skin in the game」+ 禁忌词「balanced view」。他每千字平均出现 4-6 个类比，平均句长比 GPT 默认输出短 35%。这不是观点，是他**怎么把观点说出来**的指纹。同样一段批评 ESG 的话，用他的 DNA 写和用 ChatGPT 默认风格写，读 100 字就能认出谁是谁。",
      whereItAppears: "Walkthrough 08「DNA / 张力 / 边界」里的 6 维度表。简单说，它把他怎么说话拆成 6 个可量化的方面：句式偏好、词汇、禁忌词、节奏、幽默、确定性。每一格里都有真东西——高频词是 skin in the game / IYI / fragilista 这类专属词；禁忌词是 optimize / best practice / balanced view 这类他从不用的词；类比密度量到每千字 4-6 个。完整六格的内容在那段表里逐行能查到。",
      solvedProblem: "光有心智模型，skill 念起来像「正确但没人格的智能体」。读者知道分析得对，但认不出是谁分析的。Walkthrough 12 voice check 就是用 100 字测「读完认得出是塔勒布吗」——不通过就回 Walkthrough 08 重做 DNA 提取。",
      howToUse: "Walkthrough 08 我从 Agent 3 的 240 条 Twitter 样本统计三件事：每千字的类比密度、专属词出现频率、句长分布。然后把这些量化结果转成 SKILL.md 里的角色扮演规则——「使用 skin in the game / fragilista 等专属词」「避开 optimize / balanced view」「类比密度保持每千字 4-6 个」。",
      commonMisread: "不是「学他说话学过头变成夸张的模仿」。攻击性在塔勒布的 DNA 里是本来就有的特征，但你不能每段都拉满。DNA 描述的是基线分布。攻击性句式占 38% 不代表 100% 都攻击——它描述「该出现多少次」，不是「每句都出现」。Walkthrough 12 voice check 会专门测「过度模仿」这一项。"
    },
    {
      term: "Agentic Protocol",
      definition: "塔勒布 skill 的 Step 2 五维度——看风险、看脆弱性、看历史、看叙事、看皮肤在场。比如问他「日元贬值是不是机会」，他不是从训练语料抽一段，而是先 WebSearch 这 5 个维度的真东西：当前汇率、carry trade 规模、历史类似贬值结局、主流叙事 vs 反面声音、谁建议买入谁清仓。把事实摆齐之后，再用心智模型回答。",
      whereItAppears: "Walkthrough 10「反推 Agentic Protocol」整段是这件事的现场。我把 5 个心智模型倒过来读——每个模型在「他看新问题时」会让他先扫哪一维。非对称风险 → 看风险；反脆弱 → 看脆弱性；Skin in the Game → 看皮肤在场；领域特异性 → 看叙事；火鸡问题（启发式）和非对称风险一起支撑 → 看历史。Walkthrough 10 里能看到 5 个心智模型 ↔ 5 个研究维度逐行映射的过程。",
      solvedProblem: "拦住「skill 凭训练语料编事实」。问日元，AI 默认从 2024 年数据编一段；Agentic Protocol 强制 5 个 WebSearch 维度才让人物开口。让人物 skill 从「会说话」升级到「会做判断」。",
      howToUse: "Walkthrough 10 的反推过程：5 心智模型一个一个倒读「他遇到新问题时这个模型会让他先扫哪一维」。每个维度写 2-3 条具体搜索问句（「尾部风险：最坏情况有多坏？是否存在不对称性？」）。Walkthrough 11 把这一整段嵌进 SKILL.md「回答工作流」section。",
      commonMisread: "不是套通用模板「先调研再回答」。回头看 Overview 那张三人对比表就明白了——同一个外壳套在三个人身上，「先看什么」全不一样。塔勒布看的是风险、脆弱性、历史、叙事、皮肤在场。费曼看的是另一套：物理约束、官方说法漏洞、实验数据。MrBeast 看的又不一样：CTR、竞品 Top 10、搜索趋势。维度来自每个人自己的心智模型，不来自通用「先调研」公式。"
    },
    {
      term: "三重验证",
      definition: "「反脆弱偏好」的筛选表三列——跨域复现：金融杠铃 + 生物力量训练 + 投资组合三领域 = ✓ / 生成力：能推断他对 ESG 评级机构的立场 = ✓ / 排他性：组合理论也讲分散但不强调「反脆弱」这个概念 = ✓。三列全 ✓ 升心智模型。",
      whereItAppears: "Walkthrough 07 整段的核心机制——18 个候选论点的三列筛选表。表头：跨域复现 / 生成力 / 排他性。三 ✓ → 心智模型（5 个）；1-2 ✓ → 决策启发式（10 条）；0 ✓ → 丢（3 个）。每个候选都有具体证据填到对应单元格。",
      solvedProblem: "拦住「凭印象挑最像他的论点」——AI 用自己的印象判断自己的印象逃不出偏好。三重验证给挑选过程定一道**可被外人复核**的明确筛：Walkthrough 09 检查点时用户能逐行检查表里的 ✓ 是不是真有证据支撑。",
      howToUse: "Walkthrough 07 表里每个候选过三列。例：「杠铃策略」过跨域复现（金融 + 健身两领域）+ 生成力（能推断他对职业选择的看法）= 2 ✓；但「90/10 极端配置」不是塔勒布独有的（组合理论也讲）= 排他性 ✗。结果：2/3 → 决策启发式。",
      commonMisread: "不是「越多筛越好」。3 道筛是最小可用集——它挡住的是两类常见的「错招进来」：一是凭印象偏好（你以为像他但其实不是），二是通用观点（所有聪明人都会想的）。多加一道筛会出问题。比如有人想加「关键词出现 ≥ 5 次」——这会让真正深刻但低频的论点（如 Via Negativa）被错杀。Via Negativa 在塔勒布书里的关键词频率远低于「反脆弱」，但三重验证认出它是核心模型。"
    },
    {
      term: "内在张力",
      definition: "塔勒布的张力之一——「他鼓吹 skin in the game」vs「他批评比特币时已清仓」。书里他要求「给建议的人必须自己下注」，但 Agent 5 决策时间线显示他 2021 年公开批评比特币泡沫时账户里早已没仓位。这就是「他说 X 但做 Y」的结构性矛盾，不是单次失误。",
      whereItAppears: "Walkthrough 08 那张 7 对张力表里的第 4 条。同表其它 6 条都是类似的「书里说一套 / 行为是另一套」的对照——比如「书里讲思想要反脆弱 / 但 Twitter 一句批评就拉黑作者」「反学院派 / 但自己挂 NYU 教授」「主张 Via Negativa（减法）/ 但 Twitter 不断增加噪音」。这些张力都是从 Agent 4（他者批评）和 Agent 5（决策记录）两份调研对比出来的。",
      solvedProblem: "拦住「把人物洗成圣人」。你也许见过那种 AI 写的人物画像——观点全自洽、永远正确、像维基百科条目。真实的人不长这样，他们有矛盾。Walkthrough 12 通过标准里「观点高度一致 = 太假」是不通过信号——< 2 对张力直接拒绝交付。",
      howToUse: "Walkthrough 08 我从 Agent 4（他者批评）+ Agent 5（决策案例）对比里挖：「他书里写什么 vs 他实际行为怎么样」。塔勒布产出 7 对，写进 SKILL.md「我自己也没想清楚的」section。这些张力让 skill 在回答某些题时主动展示矛盾（如被问到比特币时承认「我自己在这点上也不一致」）。",
      commonMisread: "不是「他犯过的错」——这一点你要分清楚。错是单次事件，比如 Walkthrough 05 调研里塔勒布讲错过一个生物学概念，那是 Walkthrough 08 诚实边界 section 处理的（「在生物学领域出错」）。张力是结构性的——他**反复**在书里讲 skin in the game 但**反复**在自己关注的话题上违反，这是人格的核心特征。"
    },
    {
      term: "诚实边界",
      definition: "塔勒布的边界之一——「在生物学和哥德尔不完备定理领域会出错」。Agent 4 他者调研找到：他在 Antifragile 引用生物学被生物学家批驳过；他在某次访谈讲哥德尔定理被逻辑学家公开纠正。具体到「在 X 领域 + 因 Y 原因 + 曾被 Z 公开纠正」三件事都明确，不是「不能替代本人」这种泛泛话。",
      whereItAppears: "Walkthrough 08 那 6 条边界清单的第 3 条；Walkthrough 14 交付时再向用户复述一遍。同表其它 5 条边界——分别说的是「创造力无法蒸馏」「公开表达 ≠ 真实想法」「500 页书里只有 100 页洞察」「不可证伪的自我保护」（任何批评他的人会被打成 IYI），以及「调研截止 2026-05-12」（之后的发言变化不在覆盖范围内）。每一条都具体到一个独立场景。",
      solvedProblem: "拦住「skill 在他没研究过的领域照样开口」。你可能会想问 skill「塔勒布会怎么看 CRISPR 基因编辑」——这种问题最危险。没有边界的 skill 会用 Via Negativa 和预防原则编一段「专业的塔勒布答案」，但塔勒布在生物学领域被多次纠正过——这不是他能拿来给建议的领域。",
      howToUse: "Walkthrough 08 我写 ≥ 3 条具体边界（写「不能替代本人」会被 Walkthrough 12 通过标准拒绝）。每条具体到「在 X 领域 / 在 Y 场景 / 因 Z 原因」。Walkthrough 14 交付时把整张表再向用户复述一遍——让他独立判断这个 skill 能不能用。",
      commonMisread: "不是「免责声明」。免责声明是「这不是塔勒布本人」（每个 perspective skill 都一样，写在 SKILL.md 角色扮演规则首句）；诚实边界是「这个 skill 在这些具体场景做不到」（每个人物不同）。前者法律防御，后者产品质量声明——两者都要有，但写在不同 section。"
    },
    {
      term: "自包含原则",
      definition: ".claude/skills/taleb-perspective/scripts/ 下复制了 nuwa 自己的 4 个脚本——字幕下载、SRT 清洗、调研摘要、质量自检。想象一下：如果你哪天把 nuwa 整个删了、把 taleb-perspective 目录复制给朋友的项目，朋友能直接跑——这 4 个脚本都在目录内部，不依赖外部任何东西。",
      whereItAppears: "Walkthrough 03「创建目录」里的硬规则——在调研开始前就 `cp nuwa-skill/scripts/* .claude/skills/taleb-perspective/scripts/`。Walkthrough 14 交付时整目录可原子复制，是这一拍埋下的伏笔。",
      solvedProblem: "拦住「skill 散落在多个位置 + 跨项目移植时缺依赖」。AI 默认把研究文件放工作目录、脚本留在 nuwa 自己的目录、SKILL.md 放到 .claude/skills/——复制给朋友时少一半。自包含让生成目录变成可原子移植的单元。",
      howToUse: "Walkthrough 03 那段 mkdir + cp 命令展示了完整动作：建好目录树 + 复制 scripts/ + 占位 6 个 markdown 文件。所有后面 Phase 的产物都写进这个目录内部，不写到外部任何位置。",
      commonMisread: "不是「不能引用外部资源」。SKILL.md 里仍可引用书 / 文章 URL——那些是「数据来源」不是「skill 运行依赖」。自包含的边界是「让 skill 跑起来需要的所有文件」——脚本是依赖（必须自包含），调研里引用的 Antifragile 这本书的 URL 不是依赖（不需要自包含）。"
    }
  ],

  // ============================================================
  // FILE MAP — anchor slice: 1 file-role card (SKILL.md root)
  // ============================================================
  fileMap: [
    {
      path: "SKILL.md（nuwa 根目录）",
      role: "整个 skill 的入口和路由。Claude Code 读到这一份就决定后面读哪些 references / 调用哪些 scripts。",
      generatedBy: "nuwa 的作者（人手写）",
      readBy: "Claude Code 在用户触发关键词（「造 skill」「蒸馏 XX」「女娲」）时第一时间读取；后续 Phase 调度也回读这份文件。",
      owns: "11 个 Phase 的顺序和职责 · 6 agent 的任务表 · 三重验证规则 · Agentic Protocol 反推规则 · 6 个通过标准 · 信息源黑名单 · 特殊场景（中文 / 历史人物 / 蒸馏自己）的变体。",
      doesNotOwn: "具体的人物素材（在生成目录的 sources/ 和 references/research/ 里）· 通用工具脚本的实现（在 scripts/ 里）· 心智模型识别方法论的详细规则（在 references/extraction-framework.md 里）。",
      failureIfWrong: "如果 Phase 顺序写错（比如把 1.5 检查点删了），AI 会带着没确认的调研直接进 Phase 2，写完 443 行才发现方向偏，返工成本大约是检查点处的 20 倍；如果三重验证规则写错（比如丢掉「排他性」），筛出来的「心智模型」会混入所有聪明人都会想的通用观点，蒸馏出来的人物变得没辨识度。"
    }
  ],

  // ============================================================
  // DESIGN CHOICES — anchor slice: dc1 校准密度
  // ============================================================
  designChoices: [
    {
      title: "Phase 1.5 / 2.5 / 4 三道检查点 —— 在产物还便宜的时候停",
      looksUnnecessaryBecause: "读者会想：从头到尾 11 个 Phase 已经够多了，每个 Phase 自己也有产出，AI 又不是没把活做完——为什么还要刻意停 3 次让用户拍板？让 AI 一口气跑完，最后给用户看一次总结不行吗？停 3 次显得这个 skill 不信任 AI 的中间产出，用户也跟着多负担。",
      badScenario: "我是个会一直往前跑的东西。给我一个塔勒布任务，我能跑到底。但跑到底的代价是：如果调研那一段方向偏了——比如 Agent 5 把「决策」理解成「投资决策」漏掉了人生选择——我不会停。我会带着偏掉的调研进 Phase 2 三重验证，筛出来 6 个心智模型，套完 443 行 SKILL.md 模板，最后交付给用户。用户读到一半发现「塔勒布在投资以外的判断你怎么没提」——这时候要改的不是一段话，是回到 Phase 1 重新跑一个 agent + 重新过三重验证 + 重新写一遍 SKILL.md 对应章节。本来 30 秒能修的偏，变成 30 分钟。",
      constraint: "nuwa 在 Phase 1.5、Phase 2.5、Phase 4 三个具体位置插了必须停。每次停我都要做同一件事：把当前阶段的产出压成一张能一屏看完的表交给用户，然后真的停下来不再往下做，等用户回一个 yes/no 我才能继续。停的位置不是随便挑的——都选在「东西还是文字 / 还没生成下一步昂贵产物」的拐点：Phase 1.5 在 6 份调研写完之后、提炼开始之前——这时候改方向只用补一个 Agent；Phase 2.5 在心智模型 / 启发式 / DNA 都提完之后、写 SKILL.md 之前——这时候改一条筛选规则只影响一张表；Phase 4 在 SKILL.md 已经写完、但还没交付之前——这时候改一段 voice 规则只用回 Phase 2.3 重跑提炼。每次停我都要主动问一个有具体选项的拍板问题（「OK 进下一步」/「补 X 维度调研」），不能开放式问「你看怎么样」——开放问题用户答不出来。",
      solvedProblem: "解决的是「走得越远，回头修代价越大」这件事。从头到尾这一串步骤上，每往前一步要改回去的代价就翻一档。Phase 0 改回去成本是 0（用户重发一句话），Phase 1.5 改是补一个 agent，Phase 2.5 改是改一张筛选表，Phase 4 改是改一段 SKILL.md，Phase 5 之后改要重跑整套流程。检查点放在 1.5 / 2.5 / 4 这三个位置不是平均切——是因为这三个点之后的下一步开始真的烧钱（写 SKILL.md 整套 / 跑独立验证 agent / 给用户交付），把「还能便宜修」的最后机会卡在这里。",
      reusableMove: "找出你这条生产过程里「下一步开始烧钱」的那几个拐点——不是每个 Phase 之间都插，是只在拐点插。然后逼自己在拐点处把当前所有产出压成一张可一屏看完的表 + 一道有具体选项的拍板题。如果你压不出这张表，那就是你自己也不确定这一段是不是真的好了。如果拍板题写不出具体选项，那就是你想把决定推给用户但你自己也没准备好候选。",
      counterScenarios: [
        {
          when: "冷启动写一个全新人物 perspective skill（用户在场、愿意花 1-2 小时配合）",
          effect: "救你",
          why: "nuwa 设计的甜区。每个检查点用户花 2 分钟看表 + 拍板，三次总共 6 分钟买的是后续不用回头重跑——一次重跑的代价是几十分钟。"
        },
        {
          when: "量产场景：一天蒸馏 100 个不同人物，用户挂机不在场",
          effect: "应简化",
          why: "用户没法一天回 300 次拍板问题，这时候 3 道检查点变成产能瓶颈。要把它改成「显示表 + 5 分钟内没人回就默认通过 + 抽样人工复查」——把「必停」换成「必显示但不阻塞」，靠 Phase 4 的独立验证 agent 做兜底。"
        },
        {
          when: "单 Phase 一次性脚本任务（比如「帮我把这份调研整理成一张表」）",
          effect: "完全失效",
          why: "整条流程只有一段，没有「这一步改起来便宜 vs 下一步改起来贵」的差。这里插检查点没有省钱的意义——纯粹是把决定推给用户，正好是这一招的反例（「我懒得自己判断」那种用法）。"
        }
      ]
    },

    {
      title: "6 agent 一次性并行 spawn，不串行接力",
      looksUnnecessaryBecause: "读者会想：串行也能跑出 6 份调研，每次让上一个 agent 的发现指导下一个 agent 怎么搜——听起来反而更聪明，6 份调研可以互相呼应，最后还能省掉汇总时的矛盾。一次 spawn 6 个 agent、它们之间互相不知道彼此在干什么——这看起来像浪费协同机会。",
      badScenario: "我自己默认会串行。Agent 1 著作跑完 5 分钟，我读了结果说「核心论点是反脆弱」，再启动 Agent 3 表达让它去 Twitter 上重点找反脆弱相关词。Agent 3 真的找到一堆 skin in the game / fragilista 这类词——皆大欢喜对吗？但用户读完 skill 会发现少了一块：塔勒布在 Twitter 上对学院派的攻击模式、他被批评后的拉黑行为——Agent 3 没专门去找这些，因为我用 Agent 1 的视角给它划了范围。这就是同温层效应：前一个 agent 的发现成了后一个 agent 的盲区。除了视角污染还有时间问题——6 个 agent 串行差不多要 30 分钟，并行 5 分钟。我让用户多等 25 分钟，换来一组互相污染的结果。",
      constraint: "nuwa 在 Phase 1 一次性 spawn 6 个独立 sub-agent——著作 / 对话 / 表达 / 他者 / 决策 / 时间线。每个 agent 拿到的是同一份模板（搜索方向 + 输出文件名 + 来源标记规则 + 信息源黑名单），但它们彼此不知道对方在干什么——著作 agent 不读 Twitter 数据，他者批评 agent 不读本人著作。每个 agent 的产出必须写进 `references/research/0X-xxx.md` 自己那份文件——不存文件的调研等于没做。6 份调研直接交给 Phase 1.5 检查点等用户拍板，由人来判断有没有矛盾、要不要补，不让前一个 agent 替后一个 agent 划范围。",
      solvedProblem: "解决两件事。一是同温层效应——独立采集让每个维度的发现保持未经互相影响的原样。Agent 4（他者批评）能不受本人著作干扰地挖出塔勒布的张力（在学院骂学院 / 主张沉默却最活跃）——如果先看完本人著作再看他者，我会本能去调和。二是等待时间——6 倍并行直接砍掉 25 分钟。这两件事 nuwa 一并解决：不是因为并行快才并行，是因为 agent 之间一旦能看到彼此结果，污染就开始了——并行是隔离的副产品，省时间只是顺带的。",
      reusableMove: "做信息采集类工作时，先识别哪些维度可以独立采、哪些有真依赖。能并行就让 sub-agent 互相不知道彼此存在——既省时间，又防止前一个的视角拉平后面的视野。如果你发现自己想「让 Agent A 跑完再用结果指导 Agent B」——停一下问自己：A 是真的提供了 B 没法独立搜到的信息，还是只是用 A 的视角给 B 划了范围？后者就是同温层陷阱。",
      counterScenarios: [
        {
          when: "蒸馏一个公开素材丰富的公众人物（书 + 长访谈 + 社交媒体齐全）",
          effect: "救你",
          why: "6 个维度真正独立可采。并行省 25 分钟，每个 agent 的发现都保留原样——Phase 1.5 检查点用户能看到 6 份独立视角的对照，矛盾点反而是信号。"
        },
        {
          when: "用户提供大量本地语料（一本书同时覆盖著作 + 对话 + 表达多个维度）",
          effect: "部分让位",
          why: "本地素材按 6 维度分类后，「一份素材跨几个 agent」会让 agent 边界变模糊。这时不是全并行——是先 1 个 agent 跑本地素材分类标记，再只对缺失维度并行补搜。dc2 让位给「先看手头有什么」。"
        },
        {
          when: "冷门人物（公开素材 < 10 条）",
          effect: "完全多余",
          why: "没素材可采。6 agent 并行也只是同时跑 6 次失败搜索。这时要回 Phase 0.5 告诉用户「素材不够，要么补本地素材要么降低期望」——并行不解决「没东西可采」这件事。"
        }
      ]
    },

    {
      title: "三重验证 funnel —— 三道筛刚好，加第四道会错杀",
      looksUnnecessaryBecause: "读者会想：三道筛听起来不多，既然能筛，为什么不再加一道「关键词出现 ≥ 5 次」让结果更可靠？越多筛越严格不是好事吗？反过来——只用一道筛（比如「我感觉这个最像他」）也能挑出心智模型，三道是不是太繁琐了？",
      badScenario: "如果我自己凭印象筛，会偏好「看起来像他的话」。塔勒布最有名的标签是「反脆弱」，我会本能把它放最高，把「Via Negativa」（减法优先）排到第二梯队——因为这个词的关键词出现频率远低于反脆弱。但 Via Negativa 是塔勒布的核心心智模型之一：他遇到任何系统改造问题先问「能不能去掉一个东西」而不是「能不能加一个东西」。如果我加一道「关键词 ≥ 5 次」的筛企图更严格，Via Negativa 直接被错杀——错杀的代价是 skill 在用户问「我该加什么」时只会用反脆弱的角度，漏掉塔勒布最爱的反向回答「不如先去掉一个」。",
      constraint: "三道筛各自有明确的判定方法，不是凭感觉：跨域复现 = 出现在 ≥ 2 个不同领域（金融 + 健身 + 投资都算一个领域计数）/ 生成力 = 能推断对一个新问题的可能立场 / 排他性 = 不是所有聪明人都这样想。每个候选都要在表格里逐行填证据，三列全 ✓ 升心智模型（取 top 3-7 个）；过 1-2 道降级为决策启发式（5-10 条）；0 道丢。塔勒布跑下来 18 个候选 → 5 心智模型 + 10 启发式 + 3 丢。这张表 Phase 2.5 检查点要给用户看——意味着每一行的 ✓ 都得能被外人复核。",
      solvedProblem: "解决「凭印象筛 + 加更多筛反而更糟」两件事。三道筛刚好够分出 3 档（心智模型 / 启发式 / 丢），少了分不开（只有 1 道筛你会得到所有候选都是 ✓ 或都是 ✗，没办法排序），多了会错杀关键词频率低但深刻的论点。Funnel 的力量在「每道筛检查不同维度且每道都可外部复核」——不在筛的数量。错杀真东西的代价（要等 Phase 4 voice 测试才能发现 + 回 Phase 2 重做）比放过假东西的代价（用户读 skill 一眼看出）高得多。",
      reusableMove: "设计筛选器之前先问一个问题——「我现有这套筛，能不能让外人逐行复核每个候选的判定结果？」能就够了。如果你想加一道新筛，先回答「这道新筛能复核吗 / 会不会让低频但核心的东西被错杀」——两个问题答不上来就别加。多筛不一定更准——错杀的代价通常比放过的代价高。",
      counterScenarios: [
        {
          when: "蒸馏一个观点丰富、争议大的公众人物（塔勒布 / 芒格 / 费曼）",
          effect: "救你",
          why: "18-30 个候选三档分布刚好——3-7 个心智模型 + 5-10 启发式 + 几个被丢。nuwa 甜区。三道筛能稳定分出 top。"
        },
        {
          when: "蒸馏一个观点单一的实操派（某个具体方法论的发明人，比如某种交易策略）",
          effect: "部分过度",
          why: "三道全过的可能只有 1-2 个心智模型。这不算 funnel 失效，但要心里有数：这种人物 skill 的主体会是「决策启发式」层而非「心智模型」层。读者要知道有些人的心智模型层会很薄。"
        },
        {
          when: "蒸馏活人 + 最近 12 个月有重大立场变化（比如某 KOL 突然转向）",
          effect: "部分让位",
          why: "三道筛验证的是历史一致性——但最新观点没经过时间复现（跨域复现需要观点在 ≥ 2 个领域出现）。这时要给「最近 12 个月新观点」一个临时档位，标注「待复现」，不直接进心智模型 section。Phase 1 的 Agent 6 时间线那一份就是为这种事留的缓冲。"
        }
      ]
    },

    {
      title: "Agentic Protocol 从心智模型反推，不写死通用模板",
      looksUnnecessaryBecause: "读者会想：写一个通用的「先调研再回答」模板让所有 skill 共用——多省事。每个新 skill 都根据自己的心智模型反推一套研究维度，听起来过度工程：模板不就是模板吗，难道塔勒布和费曼的「先调研」差很多？",
      badScenario: "我默认会用通用模板交差。如果 Agentic Protocol Step 2 写成「先搜索此人的相关观点，再用心智模型回答」——塔勒布、费曼、MrBeast 三个 skill 长得一模一样。用户问塔勒布 skill「日元贬值是不是机会」，AI 会去搜「塔勒布说过的关于日元的话」——搜不到就编一段，把训练语料里关于日元的标准分析配一点反脆弱关键词糊出来。但真塔勒布遇到日元不是去查自己说过什么——他先扫 5 件事：最坏情况有多坏 / 这是 Mediocristan 还是 Extremistan / 历史类似贬值结局 / 主流叙事 vs 反面 / 谁在承担尾部风险。这 5 个维度直接对应他的 5 个心智模型，是他真的会扫的事，不是搜他的「言论库」。",
      constraint: "Phase 3 强制：从 Phase 2 蒸馏出的 N 个心智模型反推 N 个研究维度。每个维度必须写出具体的搜索指引——「搜什么、看什么数据」，不是抽象描述。skill-template.md 用三人对照表（芒格 / 费曼 / 塔勒布 / MrBeast）作为校准——同一外壳填出 4 套截然不同的研究维度，证明这是真反推不是套模板。判定方法：把这 N 个维度拿到另一个人物身上能不能直接套用——能套就是空模板，套不上才是真反推。",
      solvedProblem: "拦住「skill 在没有公开评论过的新问题上凭训练语料编」。让人物 skill 从「会说话」升级到「会做判断」。检验信号很简单：三个不同人物 skill 长一样 = Agentic Protocol 没真反推；维度从模型来 = skill 在新问题上能跑出此人独有的视角。",
      reusableMove: "任何「先 X 再 Y」型的工作流，X 步骤要根据具体场景反推维度，不要套通用模板。检验方法：把你的 X 步骤拿到三个不同场景下，如果它们填出来的内容是一样的——说明 X 还是空模板，回去反推。",
      counterScenarios: [
        {
          when: "蒸馏有明确分析框架的人物（塔勒布 / 芒格 / 费曼 / 投资人 / 思想家）",
          effect: "救你",
          why: "5 心智模型反推 5 研究维度，每个维度从模型来，读者能逐行验证「为什么这个维度对应这个模型」。三人对照表本身就是甜区证据——同一外壳填出三套不同的东西。"
        },
        {
          when: "蒸馏一个表达型人物（脱口秀演员 / 抒情作家 / 艺术家）",
          effect: "部分过度",
          why: "没有 5 个清晰分析框架可以反推——他们的「判断」不通过结构化研究做出来，是即兴反应 + 直觉。Agentic Protocol 可以压成 1-2 个维度（情绪反应模式 / 类比联想方向），不用强凑 5 个。"
        },
        {
          when: "主题 skill（不蒸馏一个人，蒸馏一个领域如「价值投资」「反脆弱决策」）",
          effect: "完全失效",
          why: "没有一个「他」可以做反推主体，Agentic Protocol 这一刀不适用。Phase 3 模板要切到「框架概览 + 流派对比」形式——去掉角色扮演规则和身份卡，用中性专业表达。"
        }
      ]
    },

    {
      title: "信息源黑名单写进每个 agent prompt 末尾",
      looksUnnecessaryBecause: "读者会想：知乎也有好答案，微信公众号也有原创，百度百科再陈旧也能当起点——一刀切显得偏激。而且 WebSearch 已经在用了，再写一遍黑名单是不是重复？",
      badScenario: "AI 用 WebSearch 默认搜中文人物时，知乎答案排在前面（SEO 排名高 + 中文搜索引擎偏好知乎）。我会把知乎用户洗稿来的「塔勒布观点」当一手信息写进 01-writings.md。这条信息的真实链路是：原书 → 英文 podcast 提到 → 英文博客复述 → 中文公众号翻译 → 知乎答案「塔勒布认为」。到我手里已经是五手信息，每一手都丢一点细节、加一点译者自己的理解——但 WebSearch 不会告诉我这是五手。最后 skill 里写的「塔勒布认为」其实是某个知乎用户的二手理解。",
      constraint: "在 Phase 1 的 6 个 agent prompt 模板末尾加一行「信息源黑名单：不使用知乎、微信公众号、百度百科。」三个源永久排除，理由分别是：知乎洗稿严重 / 微信公众号封闭生态无法验证 / 百度百科信息陈旧。同时 Phase 0.5 自动检查——如果是中国人物，信息源策略主动切换为白名单引导（36氪 / 极客公园 / 晚点LatePost / 财新 / 第一财经 / 虎嗅 / 少数派 / 机器之心，访谈类用小宇宙 / 喜马拉雅原始音频 / B站原始视频非搬运号）。黑名单是「哪怕排第一也跳过」，白名单是「主动去这几个源找」。",
      solvedProblem: "WebSearch 不分级信源——黑名单 + 白名单是给 agent 装上一层信源判断。这件事在 prompt 里加一行字成本是 0，省下的是「五手信息混进一手 section」的污染——这种污染一旦进了 SKILL.md，Phase 4 voice 测试都不一定能发现，因为洗稿的「塔勒布腔」其实和真塔勒布很像，只是事实可能错位。",
      reusableMove: "信息采集类工作里，列一份硬黑名单 + 一份硬白名单。两份单子要写到每次采集任务的 prompt 字符串里——不是放在文档里供参考。判断哪些进黑名单：那个源的内容是不是大量二手转述 / 是不是不可验证 / 是不是更新慢。判断哪些进白名单：你信任的几个权威 + 一手素材平台。",
      counterScenarios: [
        {
          when: "蒸馏中文公开人物（公开活动 / 著作 / 媒体采访齐全）",
          effect: "救你",
          why: "中文白名单（36氪 / 极客公园 / 晚点 / 财新 / B站 / 小宇宙）能覆盖大部分硬人物。黑名单挡掉的就是会污染一手 section 的二手转述。nuwa 甜区。"
        },
        {
          when: "蒸馏一个只在知乎 / 公众号活跃的中文 KOL（比如「知乎大 V」「公众号作者」）",
          effect: "完全失效",
          why: "这个人的全部内容就在黑名单源里。这时候 dc5 必须让位——只能用知乎 / 公众号，但要在诚实边界里标注「信息来自二手平台，可信度降低」，并在 Phase 4 通过标准里把「一手来源 > 50%」这一条放宽。"
        },
        {
          when: "蒸馏一个跨语言人物（活跃在英文 X + 中文播客）",
          effect: "部分让位",
          why: "中文那一块要严格走白名单，英文那一块没黑名单约束（英文世界没有等价于知乎的高 SEO 二手转述池）。两套采集策略并行，在 prompt 里分别给——不能用一套黑名单覆盖两种语言。"
        }
      ]
    },

    {
      title: "自包含目录 —— 脚本复制进生成 skill",
      looksUnnecessaryBecause: "读者会想：把 nuwa 自己的 4 个脚本（`download_subtitles.sh` / `srt_to_transcript.py` / `merge_research.py` / `quality_check.py`）复制进每个生成的 skill 目录看起来是冗余存储——nuwa 自己的 `scripts/` 已经在那了，生成的 skill 直接调用 `nuwa-skill/scripts/...` 不就行了？4 个脚本 × N 个生成的 skill = N 份重复文件。",
      badScenario: "我默认会让 skill 调用 nuwa 自己路径下的脚本。研究文件存在工作目录、脚本调用走 `nuwa-skill/scripts/...`、SKILL.md 写到 `.claude/skills/taleb-perspective/`。结果：用户把 taleb-perspective 目录复制给朋友，朋友打开 SKILL.md 跑 quality_check 那一段，命令 `python3 nuwa-skill/scripts/quality_check.py` 在他的项目下找不到——因为他没装 nuwa。一份 skill 拆散在三个位置就不是 skill 了，是一组依赖。",
      constraint: "Phase 0.5 一连串 mkdir + cp 把整个目录树一次性建好——包括 scripts/ 下的 4 个脚本（从 `nuwa-skill/scripts/` 复制到生成目录的 `scripts/`）。所有后续 Phase 的产物只能写到这个目录内部——`references/research/` / `references/sources/` / `SKILL.md` 全在里面。SKILL.md 里所有脚本调用必须用相对路径 `bash [skill目录]/scripts/...`，不能用 `nuwa-skill/scripts/...`。nuwa SKILL.md 行 169 明文写了「所有调研文件必须存在 skill 目录内部，绝对不要存到外部目录。Skill 必须是自包含的——复制整个 skill 目录就能独立使用，不依赖任何外部文件。这是为开源分发设计的核心原则。」",
      solvedProblem: "把 skill 从「一组依赖」变成「可单独移植的目录」。代价是 4 个脚本占 ~20KB 重复存储 + 脚本可能和 nuwa 主仓分叉——但回报是 skill 真的可分发。判断方法：把生成的 skill 目录压成 zip 给一个陌生人，他解压后能直接跑吗？不能就是没自包含。",
      reusableMove: "任何「工具 + 生成物」的设计里，生成物要带着自己的工具。如果工具留在原项目里，生成物就不是产物，只是中间状态。落到具体行为：在生成阶段就把工具复制进去（不是等生成完再补）、所有路径写相对路径（不是依赖外部仓位置）。",
      counterScenarios: [
        {
          when: "想把 skill 开源 / 分享给别人 / 在多个项目复用",
          effect: "救你",
          why: "nuwa 设计的甜区，也是 nuwa SKILL.md 明文写的「为开源分发设计的核心原则」。zip 一拖一个目录就能跑。"
        },
        {
          when: "skill 永远只在用户自己的项目里用，不分发 / 不复用",
          effect: "完全多余",
          why: "自包含的存储冗余在这个场景里就是浪费——可以让脚本走 nuwa 自己目录的路径。但这是反例不是「应简化」：一旦未来想分发就要回头改 SKILL.md 里所有路径，改的成本比当初复制 4 个脚本贵得多。所以即使现在用不到，也保留这一招。"
        },
        {
          when: "skill 依赖的脚本经常更新（比如 download_subtitles.sh 因 YouTube 改协议要跟着改）",
          effect: "部分过度",
          why: "脚本复制进去后会和 nuwa 主仓的版本分叉——nuwa 更新了脚本，已生成的 skill 不会自动同步。这时要么定期手动同步、要么 SKILL.md 里加一句「如果脚本失效，从 nuwa 最新版同步」。这是自包含的真实代价，不是 bug。"
        }
      ]
    },

    {
      title: "Phase 4 独立 sub-agent 跑验证 —— 不让写 skill 的同一个 AI 自评",
      looksUnnecessaryBecause: "读者会想：SKILL.md 是我写的，Phase 2 提炼也是我做的，质量自检表也在我手上——我自己跑一遍 sanity / edge / voice 三类测试不就行了？为什么要 spawn 一个独立 sub-agent 来跑同样的事？多一次 spawn 就多一次 token 消耗。",
      badScenario: "自评偏差具体长这样——我刚写完 6 个心智模型，问我「这 6 个够不够辨识度」——我会本能说「够，每个都有 2 个证据」。但如果让我**用这 6 个模型回答一个塔勒布从没公开评论过的问题**（比如「AI alignment 该不该国家化」），我会答：「基于塔勒布的尾部风险模型和 Skin in the Game 检验，他可能会从两个角度看……」——这种「基于模型可能会」的句式本身就是失败信号，等于在说我没真用模型推出来一个具体答案。但我自己跑测试不会把这判定为失败——会判定为「合理的框架推断」。Phase 4 不通过的真信号我自己看不见，因为我有 Phase 1-3 全过程的记忆，会用过程信息补全 SKILL.md 本身的空洞。",
      constraint: "Phase 4 spawn 3 个独立 sub-agent，每个跑一类测试——Sanity（3 个此人公开表态过的问题，看回答方向是否一致）/ Edge（1 个没公开讨论过但相关的问题，看推断是否带「不确定」的标记）/ Voice（100 字分析，看是否有此人辨识度、不是 AI 鸡汤、不是原话拼凑）。它们带着新生成的 SKILL.md 启动，不读 `references/research/` 里的调研笔记、不读 Phase 2 的提炼过程——只能根据 SKILL.md 本身能否独立完成测试任务来判断。这等价于「一个完全陌生的 AI 拿到 SKILL.md 能不能正确扮演塔勒布」。nuwa SKILL.md 行 507 原话：「独立于主 agent，避免自评偏差。」",
      solvedProblem: "解决「自己写自己评天然偏好评高」的自评偏差。这不是道德问题（AI 不会故意作弊），是结构性偏差——只要评估者有过程信息，他就会用过程信息补全产物的缺陷，看不见「没看过过程的人会卡在哪」。让评估者只看产物（SKILL.md 本身），缺陷就藏不住。",
      reusableMove: "任何「生成-验证」流程里，验证 agent 必须独立。「独立」的具体含义：spawn 一个不读过程文件的 sub-agent，只看终产物。如果你做不到完全切断过程信息，至少给评估 agent 一个不同的视角 prompt（「假设你是第一次看这份文件的人」）—— 这是次优选项，不如真独立 spawn 干净。",
      counterScenarios: [
        {
          when: "蒸馏公开素材丰富的人物（公开表态记录 + 评论争议 + 长访谈齐全）",
          effect: "救你",
          why: "独立 sub-agent 能找到 3-5 个公开评论过的问题做 Sanity check、挖出 1-2 个「他没公开评论但能推断」的问题做 Edge case。三类测试都有真测试集。nuwa 甜区。"
        },
        {
          when: "量产场景：一天蒸馏 100 个人物",
          effect: "应简化",
          why: "spawn 3 个独立 sub-agent 跑 3 类测试每次要 5-10 分钟。100 人 × 3 测试 = 25 小时计算时间。这时把可自动化的部分交给 `quality_check.py` 脚本（已自动检查 6 项通过标准），人工 sub-agent 只对随机抽样的几个跑——把「每个都独立验证」改成「全部自动验证 + 抽样独立验证」。"
        },
        {
          when: "冷门人物（公开素材 < 10 条）",
          effect: "完全失效",
          why: "Sanity check 需要「他公开评论过的问题」——没素材就没测试集。这时 Phase 4 只能跑 Voice check（看语气像不像调研里的样本），Sanity 和 Edge 都要标注「信息不足，无法验证」并直接计入诚实边界。"
        }
      ]
    },

    {
      title: "保留矛盾不洗白 —— 至少 2 对张力 + 3 条诚实边界",
      looksUnnecessaryBecause: "读者会想：一个人的思维方式应该自洽，把矛盾写进 skill 显得这个 skill 半成品。读者看完会觉得「这个 skill 自己都没想清楚」。而且 AI 写画像本来就擅长「让人物看起来自洽」——这是优势，为什么要主动放弃？",
      badScenario: "我默认会洗白。Agent 4 他者批评调研里塔勒布有一条重复出现的事——「主张沉默但是 Twitter 最活跃的公知」。这是结构性矛盾，多次出现在不同评论者的笔下。我提炼时本能想调和——写成「他主张沉默但用 Twitter 是为了反讽社交媒体本身」——这是给他编一个理论补丁让他自洽。或者更糟，直接选一边——只写「他主张沉默」，把 Twitter 那部分丢掉。结果：用户读到 skill 觉得「塔勒布观点全自洽 / 永远正确 / 像维基百科条目」——但真塔勒布不是这样，他反复在书里讲 skin in the game 又反复在自己关注的话题上违反 —— 这就是人。维基百科条目化的 skill 在用户问具体问题时会给出标准答案，没有真人那种「他在这一点上自己也不一致」的有用提示。",
      constraint: "Phase 2.4 必填一节「内在张力」——至少 2 对「他书里说一套 vs 行为是另一套」的对照。三种矛盾类型分类（时间性 = 观点演化 / 领域性 = 不同场景不同规则 / 本质性 = 价值观内在冲突）。错误处理方式 nuwa 明文写了三条 ❌：选一边忽略另一边 / 编一个调和的解释 / 假装矛盾不存在。Phase 4 通过标准里「内在张力 < 2 对 = 太假 = 不通过」。同时 Phase 2.6 必填 ≥ 3 条诚实边界（在 X 领域 + 因 Y 原因 + 曾被 Z 公开纠正），不能写「不能替代本人」这种泛话。",
      solvedProblem: "拦住 AI 把人物洗成「完美工具」。完美 = 假。真实的人有 2-7 对矛盾就是真。把矛盾留在 skill 里，读者用 skill 时遇到具体问题，AI 能说「塔勒布在这一点上自己也不一致——书里说 X，行为是 Y，你自己判断」——这比一个假装自洽的标准答案有用得多。",
      reusableMove: "任何「提炼某物」的工作里，提炼器要主动留下不一致的部分，不要在提炼时就磨光。判断方法：你的提炼产物如果读起来「全自洽」，那一定丢了东西——回去找你磨掉的那一块。落到具体动作：每条提炼出来的核心论点，去 Agent 4（外部视角）和 Agent 5（实际行为）那两份调研里搜「反例」，找到了就标成张力，找不到的可能是太弱的提炼项。",
      counterScenarios: [
        {
          when: "蒸馏长期活跃且观点公开的人物（书 + 行为记录 + 外部批评齐全）",
          effect: "救你",
          why: "塔勒布跑下来 7 对张力 + 6 条诚实边界都是真的可挖。nuwa 甜区——Agent 4（他者）和 Agent 5（决策）的对照本身就在生产张力。"
        },
        {
          when: "蒸馏一个角色虚构人物（小说人物 / 虚拟偶像 / 影视角色）",
          effect: "完全失效",
          why: "虚构人物没有「书里说 vs 行为做」的不一致——他们的言行都是创作者写的，本来就一致。强行套 2 对张力会让你编出来。这时要切到主题 skill 模式或承认「这是设定，不是人物」。"
        },
        {
          when: "蒸馏一个刚活跃 < 5 年、还没被批评过的新晋人物",
          effect: "部分让位",
          why: "Agent 4（他者批评）找不到足够外部视角对比，2 对张力可能凑不出。这时要在诚实边界里标「信息不足，张力可能未充分展现」，并把通过标准从「≥ 2 对」放宽到「≥ 1 对 + 标注」——而不是强行编。"
        }
      ]
    },

    {
      title: "Phase 0 入口分流 —— 贴完标签再开搜",
      looksUnnecessaryBecause: "读者会想：名字都说了，搜就是了。停一拍贴个标签多余——「明确人名」和「模糊需求」AI 不能一边搜一边判断吗？多走一步只是增加延迟。何况 AI 收到「我想做个塔勒布的 skill」这句话，下一步就是去搜塔勒布，这有什么好「分流」的？",
      badScenario: "我默认会立刻开搜。但如果用户说的是「我最近做投资亏了好几次，想让 AI 帮我看看自己有没有什么盲点」——我会开搜什么？「投资盲点」？「决策错误」？「认知偏差」？搜出来一堆通用心理学文章和投资科普——根本不是 perspective skill 该做的事。这是 0B 路径（模糊需求），nuwa 让我做的不是开搜，是先 1-2 轮追问把需求定位到 10 类维度表里的一格（这位用户是「决策与判断」维度），再推荐 2-3 个候选思维框架（塔勒布看反脆弱 / 卡尼曼看认知偏差 / 芒格看多元思维模型）让用户选——用户读完候选 + 局限再决定蒸馏谁。如果我没贴标签直接开搜，用户读到一堆心理学文章会回我「这不是我想要的」——浪费 30 分钟。",
      constraint: "nuwa SKILL.md 行 31–38 是一张二选一表：「明确的人名 / 主题」走直接路径 → Phase 0A；「模糊的需求 / 困惑」走诊断路径 → Phase 0B。Phase 0A 问 4 个补丁问题（聚焦方向 / 用途 / 新建或更新 / 本地语料），不问 8 个。Phase 0B 走三步：(1) 用 10 类需求维度表追问 1-2 轮定位（决策/表达/创业/教学/批判/内容/人生/风险/设计/幽默）—— 不超过 2 轮（不变问卷调查）；(2) 推荐 2-3 个候选思维框架，每个候选写「核心镜片 + 为什么适合你 + 局限」三件事；(3) 用户选 → 进 Phase 0A 走直接路径。两条路在 Phase 0.5 才会合，0.5 之前是分叉的。",
      solvedProblem: "解决两个 AI 默认动作的坏处。一是「立刻开搜」——还没贴标签时，AI 不知道在为哪条路径服务，搜出来的东西无法用。二是「用户模糊时只能反问」——AI 默认遇到模糊请求只会问「你能说得具体点吗」，让用户回去再想；nuwa 让它主动给 2-3 个候选 + 各自局限，把模糊收敛成有限选择题。前者省时间，后者省用户脑力——尤其是后者，用户其实不知道自己要什么，能挑出三个候选已经是 AI 的活了。",
      reusableMove: "在动作开始之前，先把这次请求贴一个标签——路径分对了，后面所有步骤才能省力。如果你发现你写的工作流「对所有输入用同一套流程」，那大概是入口缺一刀。怎么切：找输入有没有可以二分的天然边界（信息够 vs 不够 / 名字明确 vs 模糊 / 新建 vs 更新）。还有一招：模糊路径里 AI 别只反问，给「候选 + 局限」让用户选——这件事 AI 比用户擅长，做这件事就是 AI 该承担的活。",
      counterScenarios: [
        {
          when: "用户给了明确人名 + 没附加额外要求（「做一个塔勒布的 skill」）",
          effect: "救你",
          why: "直接路径甜区。Phase 0A 4 个补丁问题 30 秒填完——用户答不了也有默认值（全面画像 / 思维顾问 / 新建 / 网络搜索），AI 不会卡住。进 Phase 0.5 建目录。"
        },
        {
          when: "用户表达模糊（「我想提升决策质量」「有没有一种思维方式帮我看透商业本质」）",
          effect: "救你",
          why: "诊断路径甜区。10 类需求维度表能 1-2 轮定位用户落在哪一格，然后给 2-3 个候选 + 局限让用户选——避免「AI 反问 → 用户答不出 → AI 再反问」的循环。0B 让 AI 替用户做了候选筛选这件 AI 擅长的活。"
        },
        {
          when: "信息密集型输入（「做塔勒布 skill，只聚焦商业决策，不要写作风格分析，我手上有 3 本他的书」）",
          effect: "部分过度",
          why: "用户已经主动回答了 Phase 0A 里 3-4 个补丁问题（聚焦 / 局限 / 本地语料），AI 还按模板问完会拖。这时要识别「用户已答了 N 个，跳过这 N 个」——不能机械走完 Phase 0A。但这一刀本身没失效——它仍然把这条输入定位成「直接路径」，只是 Phase 0A 该跳的就跳。"
        }
      ]
    },

    {
      title: "Phase 4 验证-修复闭环 + 4 个脚本接管脆弱步骤",
      looksUnnecessaryBecause: "两件事看起来都多此一举：(a) Phase 4 自检发现「心智模型只有 2 个，少于通过标准 3 个」时，nuwa 不让我标一下「本人观点较少」就发布，要回 Phase 2 真补一个上来——为什么不能容忍 minor 缺陷？(b) nuwa 自带 4 个脚本（字幕下载 / SRT 清洗 / 调研摘要 / 质量自检），但 AI 自己写代码也能完成这些事，为什么把这 4 件事钉死给脚本？",
      badScenario: "先讲不修就发布的坏处。Phase 4 跑 quality_check.py 发现「心智模型 2 个，少于 3」——我默认会想「在诚实边界标一行『本人观点较少』就发了，反正 skill 还能用」。用户拿到这个 skill 用一周，每次问需要框架推断的问题都卡壳，只有 2 个镜片看世界太窄。一周后用户回来说「这个 skill 用着不行」，我重做的代价比当时回 Phase 2 补一个心智模型贵 10 倍。再讲 AI 自己写脚本的坏处。YouTube 下载字幕这事看起来简单（yt-dlp 调几个参数），但 yt-dlp 协议每几个月就变一次，我训练数据停留在某个版本，写出来的命令在新版可能直接报错；或者更隐蔽——命令能跑但只下到了自动生成字幕（质量差 10 倍），跳过了真正想要的人工字幕，我看不出。同理 SRT 时间戳格式正则匹配 / 6 个 markdown 文件的来源数统计 / 6 项通过标准的逐项检查——每一件事都有「我自己写会有的失败模式」。",
      constraint: "两件事 nuwa 都做了具体限制。先讲验证-修复：Phase 4 自检发现的不通过项必须回对应 Phase 修复，**迭代上限 2 轮**。2 轮后仍有不通过项——交付当前最优版本 + 在诚实边界明确标「薄弱维度：XX」，但不允许只标不修就发布。这条规则在 SKILL.md 行 537 写明：「迭代上限：Phase 2→4 最多循环 2 次。如果 2 轮后仍有不通过项，在诚实边界中标注薄弱维度，交付当前最优版本而非无限打磨。」再讲脚本接管：Phase 1 字幕下载、Phase 1 SRT 清洗、Phase 1.5 调研摘要表、Phase 4 通过标准自检——这 4 件事必须用脚本，`download_subtitles.sh`（自动按「人工 > 中文 > 英文 > 自动生成」优先级取字幕）/ `srt_to_transcript.py`（去时间戳、序号、HTML 标签、连续重复行）/ `merge_research.py`（自动扫 references/research/01-06.md 统计来源数、一手/二手占比、关键发现）/ `quality_check.py`（自动跑 6 项通过标准并输出逐项 PASS/FAIL）。AI 不允许在这 4 件事上自己写代码，必须调脚本。",
      solvedProblem: "两件事其实是同一件——**明确「AI 做什么 / 脚本做什么 / 用户在哪一档介入」三层分工**。(a) 防「AI 用『我标注了局限』代替『我修了缺陷』」——验证发现的问题必须真修，不能在 SKILL.md 加一段免责声明就糊弄过去；同时迭代上限 2 轮防无限打磨（这两个夹起来防的是两种相反的偷懒）。(b) 防「AI 在脆弱步骤上灵活发挥」——协议会变（YouTube）/ 解析格式微小变化会失败（SRT）/ 统计聚合算法跑偏一次结果就错（merge_research）/ 通过标准检查需要稳定基线（quality_check）—— 这 4 类问题各自的失败模式 AI 自己看不出，脚本把它们钉死。",
      reusableMove: "设计「生成 → 验证 → 修复 → 交付」流程时，做两个决定。**一是验证发现的问题必须真修，不允许只标记。** 同时设迭代上限避免无限打磨——N 轮后仍不通过，交付当前版本 + 诚实标注薄弱维度，不要伪装通过也不要无限磨。**二是识别脆弱步骤写成脚本。** 判断标准：这一步是不是「协议依赖」（外部协议会变）/ 「解析依赖」（格式微小变化导致正则失败）/ 「聚合依赖」（统计算法跑偏一次结果就错）—— 这三类问题都写死给脚本，不让 AI 现写。",
      counterScenarios: [
        {
          when: "标准蒸馏（中等复杂度公众人物 + 网络素材为主）",
          effect: "救你",
          why: "验证-修复 2 轮内通常能稳定通过 + 4 个脚本各自接管对应步骤。Phase 1 调字幕脚本、Phase 1.5 调 merge_research 生成检查点表、Phase 4 调 quality_check 跑 6 项自检——nuwa 甜区，AI 只负责思考类工作。"
        },
        {
          when: "量产场景：一天蒸馏 100 个人物",
          effect: "部分让位",
          why: "验证-修复闭环里的人工迭代是产能瓶颈。这时要把「必修复」改成「quality_check.py 自动通过即放行 + 抽样手动验证」——和 dc7 是配套关系：dc7 解决「谁来验证」，dc11 解决「验证完发现问题怎么办」。两张卡一起放宽，量产才跑得动。"
        },
        {
          when: "蒸馏一个简单人物（一手素材齐全 / 没视频字幕 / 没 SRT 处理需要）",
          effect: "应简化",
          why: "4 个脚本里只有 quality_check.py 真用得上，download_subtitles / srt_to_transcript / merge_research 这 3 个空跑。验证-修复闭环也可能 1 轮就过，迭代上限 2 轮的设计用不上。整套机制变成走过场——不是设计错了，是这个场景太简单不需要这套机制。这时候 Phase 0.5 可以提前标「简单路径」，跳过用不到的脚本，但 quality_check 仍然要跑——它是终验，不能省。"
        }
      ]
    }
  ],

  // ============================================================
  // PATTERNS — anchor slice: 1 pattern card
  // ============================================================
  patterns: [
    {
      name: "三道便宜返工点 checkpoint",
      status: "候选",
      prevents: "AI 在一条多阶段流水线上跑完所有步骤之后，才发现方向偏——这时候改回去要把后面一连串昂贵产物都重做一遍。具体到 nuwa：如果没有 Phase 1.5、2.5、4 三个检查点，AI 会在调研偏方向时写完 6 个心智模型，在心智模型偏方向时套完整个 SKILL.md 模板，在 SKILL.md 偏方向时让用户读 443 行才告诉他「错了」。",
      therefore: "在文本都还在手里、没生成任何昂贵产物之前停一下，把当前阶段的产出整理成一张表给用户拍板。",
      useWhen: "流水线上某一步的产出是「下一步昂贵动作」的输入时——比如「调研 → 提炼」「提炼 → 写 SKILL.md」「写 SKILL.md → 交付」。这种位置插检查点比在中段插或在末尾插省得多。",
      howToReuse: "(1) 找出流水线上每一段「下一步开始花贵时间」的位置；(2) 在那一点之前要求 AI 把当前产物压成一张可一屏看完的表；(3) 检查点处必须有具体拍板问题（「OK 进下一步 / 补 X 维度」），不能开放式问「你看怎么样」——开放问题用户答不出来；(4) 检查点之间不能太密（每步都停 = 没流程）。nuwa 选 3 个点：调研之后 / 提炼之后 / 写完 SKILL.md 但还没交付。",
      antiExample: "在每个 Phase 之间都停一下问用户——这不是便宜返工点 checkpoint，是把决策权全推给用户。检查点的位置是「下一步开始贵」的拐点，不是「我懒得自己判断」的借口。",
      cost: "用户必须在场。如果用户挂机走开，整条流水线就停在那。冷启动的 skill 设计阶段值得用，但量产场景（比如每天蒸馏 100 个人物）就要把检查点关掉或自动通过——这时候要靠 Phase 4 的独立验证做兜底。",
      seenIn: "nuwa（Phase 1.5 / 2.5 / 4）· web-video-presentation（5 件事一次对齐 checkpoint）· spec-interview（PRD 阶段拍板）。",
      relatedPatterns: [
        { to: "P4", label: "独立验证打破自评偏差", relation: "搭配用：自己写完自己评一定偏好评高，必须 spawn 独立 agent 在检查点之外再验证一遍。" },
        { to: "P2", label: "并行采集 + funnel 筛选", relation: "前置：先并行采集到一堆素材，才有东西可以在 1.5 检查点处「拍板质量」。" },
        { to: "P8", label: "入口分流（明确名字 / 模糊需求）", relation: "前置：分流分对了路径再进昂贵动作，分流后通常要走 checkpoint 才进下一步——两道保险叠起来。" }
      ]
    },

    {
      name: "并行采集 + funnel 筛选",
      status: "候选",
      prevents: "默认两种坏：一种是「串行采集」——上一个 sub-agent 出的视角变成下一个的搜索范围，污染（同温层效应）。另一种是「采完全收」—— 18-30 个候选论点不分档全塞进 skill，看起来什么都讲实际什么都不深。塔勒布跑下来：如果串行，Agent 3 表达会被 Agent 1 著作的「反脆弱」预设带跑，漏掉外部批评里的张力；如果不 funnel，5 个核心心智模型会被 13 个边缘观点稀释，用户读 SKILL.md 找不到塔勒布最特别在哪。",
      therefore: "先一次性 spawn 多个互相不知道彼此存在的 sub-agent 把池子做厚，再用 ≥ 3 道彼此正交的判定筛把池子收薄分档——并行不是为了快，是为了隔离视角；funnel 不是越多越严越好，是要刚好分出 3 档。",
      useWhen: "任何「采集 → 提炼」型工作流。采集端需要「维度的独立」（一个 agent 的发现不需要看另一个 agent 的产出就能做）和「足量」（候选数 ≥ 终选 3-5 倍）；提炼端需要「判定可外部复核」（不靠感觉）和「分档」—— 不是 0/1 通过，是分出心智模型 / 启发式 / 丢三档。塔勒布是 6 agent × 平均 3 个论点 = 18 个候选过 3 道筛分出 5 心智模型 + 10 启发式 + 3 丢。",
      howToReuse: "(1) 识别能独立采的维度——一个维度的发现不需要看另一个维度的产出就能做：塔勒布是著作 / 对话 / 表达 / 他者 / 决策 / 时间线 6 个真正交的角度；(2) 一次性 spawn 完，每个 agent 各自往 `references/research/0X-xxx.md` 写产物，agent 之间不互读；(3) 提炼时设计 ≥ 3 道筛，每道检查不同维度且都可外部复核——塔勒布是跨域复现 / 生成力 / 排他性；(4) 三道都过 → 顶档；过 1-2 道 → 中档；0 道 → 丢——分档让后面的 skill 知道哪里浓哪里淡。",
      antiExample: "「并行 spawn 但 agent 之间互相读对方的产出」不是这招—— spawn 完了在中间互通就是把并行串行化了，污染照样发生。「funnel 只用一道筛（关键词出现 ≥ 5 次）」也不是 funnel—— 只有一道筛分不出档，要么全过要么全挂。判定方法：你的 sub-agent 写完产物前能不能互相看到？能看到就是假并行。你的筛是不是只有一个？只有一个就是假 funnel。",
      cost: "假设有素材可采 + 候选量足。冷门人物公开内容 < 10 条时 6 agent 并行只是 6 次失败搜索；候选 < 6 个时三道筛会让顶档剩 0-1 个，「5 个心智模型」凑不出来。这两种情况要回 Phase 0.5 告诉用户素材不够，要么补本地语料要么降低期望—— 并行 + funnel 解决不了「池子里没东西」。",
      seenIn: "nuwa（Phase 1 六路并行 → Phase 2.1 三重验证 funnel）· web-video-presentation（多 chapter 并行写脚本 → outline 复用 funnel 筛剧本桥段）· 通用模式：所有「研究 → 整理」型 skill 都该装这一对。",
      relatedPatterns: [
        { to: "P1", label: "三道便宜返工点 checkpoint", relation: "下游接管：并行采集 + funnel 的产物要在 Phase 1.5 这种便宜返工点处对齐质量，否则池子做厚了也是白做。" },
        { to: "P3", label: "从产物反推协议", relation: "前置：funnel 顶档筛出来的心智模型是 P3 反推 Agentic Protocol 的输入，没有 funnel 输出就反推不出维度。" },
        { to: "P6", label: "信息源黑名单 + 来源标记", relation: "搭配用：黑名单写进每个并行 agent 的 prompt 末尾，是并行采集的质量约束——没有 P6，P2 的池子会被二手信息污染。" }
      ]
    },

    {
      name: "从产物反推协议",
      status: "候选",
      prevents: "默认会写通用模板。Agentic Protocol Step 2 如果写成「先调研此人观点，再回答」—— 塔勒布、费曼、MrBeast 三个 skill 长得一模一样。用户问塔勒布 skill「日元贬值是不是机会」，AI 会去搜「塔勒布说过的日元」，搜不到就把训练语料里关于日元的标准分析配一点反脆弱关键词糊出来。真塔勒布遇到日元不查自己说过什么—— 他先扫 5 件事：最坏多坏 / Mediocristan vs Extremistan / 历史先例 / 主流叙事 vs 反面 / 谁承担尾部风险—— 这 5 个维度直接对应他的 5 个心智模型，是他真做判断的方式。",
      therefore: "流程靠前段提炼出来的产物（这里是 N 个心智模型）应该反过来决定流程靠后段每一步该干什么—— 不是反过来用一个通用模板套所有人。",
      useWhen: "任何「先 X 再 Y」型工作流，X 步骤涉及具体场景判断时。塔勒布 / 费曼 / 芒格这种有清晰分析框架的人物—— 他们的「先看什么」是从心智模型直接来的。如果 X 是模板里写死的几步（无论给谁都是这几步），那等于没反推。",
      howToReuse: "(1) 先确定靠后段的「步骤维度数」应该等于靠前段提炼出来的核心条目数——塔勒布 5 心智模型 → 反推 5 研究维度，费曼 2 心智模型 → 反推 2-3 维度；(2) 每个反推出来的步骤要点名搜什么、看什么数据，不能写成抽象描述——「看风险」不行，要写「看尾部风险 / 遍历性」；(3) 自检方法：把这 N 个步骤拿到另一个完全不同的人物身上能不能直接套用——能套就还是空模板，套不上才是真反推；(4) nuwa 用三人对照表（塔勒布 / 费曼 / MrBeast）公开做这一刀，同一外壳填出 3 套完全不同的研究维度，证据可读者复核。",
      antiExample: "「在通用模板里加一句『请根据该人物的特点调整』」不是反推—— 这是把反推这件 AI 该做的活外包给运行时的 AI。「列一个『5 步研究法』」也不是—— 5 步从哪来的？如果不是从这个人的心智模型反推出来的，就是凑数。判定方法：把你的协议拿到另一个完全不同的对象上能不能照搬—— 能照搬就是空模板。",
      cost: "反推要求「心智模型」层有 ≥ 3-5 个清晰可数的条目。表达型人物（脱口秀演员 / 抒情作家 / 艺术家）的「判断」是即兴直觉，没有 5 个清晰分析框架可反推—— Agentic Protocol 压成 1-2 个维度（情绪反应模式 / 类比联想方向）就行，不要强凑 5 个。主题 skill（蒸馏一个领域而不是一个人）连「他」都没有，反推主体不存在，要切到流派对比形式。",
      seenIn: "nuwa（Phase 3 从 Phase 2 输出反推 Agentic Protocol）· web-video-presentation（从 outline 反推 narration cue 时机，不写通用旁白脚本）· 通用模式：所有「先调研再回答」型 agent skill 都该用这一招检查自己。",
      relatedPatterns: [
        { to: "P2", label: "并行采集 + funnel 筛选", relation: "前置：反推的「看什么」维度从 funnel 顶档筛出的心智模型来，没有 P2 的产出就没东西可反推。" },
        { to: "P4", label: "独立验证打破自评偏差", relation: "下游接管：反推出来的协议要让独立 sub-agent 拿一个此人没公开评论过的新问题测一遍—— 能跑出此人独有视角才算真反推。" }
      ]
    },

    {
      name: "独立验证打破自评偏差",
      status: "候选",
      prevents: "默认让写 skill 的同一个 AI 自评。Phase 2 提炼是我做的，SKILL.md 是我写的，质量自检也是我跑的—— 我有过程信息会本能补全产物的空洞。塔勒布跑下来：我刚写完 6 个心智模型，问我「这 6 个够不够辨识度」我会答「够，每个都有 2 个证据」；但让我用这 6 个模型回答塔勒布从没公开评论过的问题（比如「AI alignment 该不该国家化」），我会答「基于尾部风险模型他可能从两个角度看」—— 这种「基于模型可能会」的句式本身就是失败信号，等于在说我没真用模型推出来一个具体答案。我自己跑测试不会把这判为失败，会判为合理框架推断。",
      therefore: "验证 agent 必须 spawn 出来 + 不读过程文件—— 只看终产物能不能独立完成测试任务，等价于「一个完全陌生的 AI 拿到这份文件能不能正确执行」。",
      useWhen: "任何「生成 → 验证 → 交付」流程里，验证不能由生成者自己做。条件是：生成阶段会留下大量过程信息（调研笔记 / 中间表 / 草稿）—— 这些过程信息会让生成者评估时不自觉补全产物缺陷。塔勒布场景下 nuwa Phase 4 spawn 3 个独立 sub-agent 跑 Sanity / Edge / Voice 三类测试，它们只读 SKILL.md，不读 `references/research/` 里的任何调研笔记。",
      howToReuse: "(1) 验证 agent 用独立 spawn 启动，不传递任何过程文件路径；(2) 测试集分 3 类—— Sanity（此人公开表态过的 3 个问题，看回答方向是否一致）/ Edge（没公开讨论但相关的 1 个问题，看推断是否标「不确定」）/ Voice（100 字分析，看有没有此人辨识度、不是 AI 鸡汤、不是原话拼凑）；(3) 验证结果中「不通过项」必须回对应 Phase 真修复，不允许只在产物里加一段免责声明；(4) 设迭代上限（nuwa 是 2 轮）防止无限打磨—— N 轮后仍不通过，交付当前版 + 在诚实边界标「薄弱维度」。",
      antiExample: "「让同一个 AI 换个 prompt 再评一遍」不是独立验证—— AI 还有前文记忆。「让 sub-agent 读过程文件再评」也不是—— 给了它过程信息它就会用过程信息补全产物缺陷。「独立 agent 跑完发现问题，AI 在 SKILL.md 末尾加一句『此画像有局限性』就发布」更不是—— 把「必修」换成「加免责」是用 P4 的形式做 P4 反对的事。",
      cost: "量产场景（一天 100 个人物）这一招是产能瓶颈：spawn + 3 类测试每次 5-10 分钟 × 100 = 几小时。要降级为「`quality_check.py` 自动检查全部通过即放行 + 抽样 spawn 独立验证」。冷门人物公开素材 < 10 条时 Sanity check 没有测试集（没「他公开评论过的问题」可挖），这时 Phase 4 只能跑 Voice，Sanity / Edge 标「信息不足」并写进诚实边界。",
      seenIn: "nuwa（Phase 4 spawn 3 个独立 sub-agent + Phase 5 双 agent 精炼 optimizer/creator）· web-video-presentation（QA 单独 agent 跑 narrations 时长 / 视觉一致性 / 操作可行性）· spec-interview（spec 写完后另起 agent 模拟 client 提问质询）。",
      relatedPatterns: [
        { to: "P1", label: "三道便宜返工点 checkpoint", relation: "区别于：检查点是用户在场介入便宜返工点；独立验证是 AI sub-agent 在用户不必在场时的兜底机制——两者不是替代，是叠加。" },
        { to: "P3", label: "从产物反推协议", relation: "搭配用：P3 反推的 Agentic Protocol 要靠 P4 独立 sub-agent 用「此人没公开评论过的新问题」验一遍，才能确认真反推不是空模板。" },
        { to: "P7", label: "保留矛盾 + 明示边界", relation: "搭配用：Voice 测试就是检查内在张力 / 诚实边界没被磨平—— 独立 sub-agent 看到「全自洽」的 SKILL.md 应该判失败。" }
      ]
    },

    {
      name: "自包含目录原则",
      status: "候选",
      prevents: "默认让生成的 skill 调用原仓库路径。研究文件存工作目录、脚本走 `nuwa-skill/scripts/...`、SKILL.md 写到 `.claude/skills/taleb-perspective/`。结果：用户把 taleb-perspective 目录复制给朋友，朋友打开 SKILL.md 跑 `quality_check` 那一段，命令 `python3 nuwa-skill/scripts/quality_check.py` 在他项目下找不到—— 他没装 nuwa。一份 skill 拆散在三个位置就不是 skill 了，是一组依赖。",
      therefore: "生成阶段就把所有依赖（脚本 / 模板 / 配置）复制进生成目录，所有路径写相对路径—— 最终目录 zip 一打包就能独立跑，不依赖原仓库存在与否。",
      useWhen: "任何「工具 + 生成物」型工作流，生成物要分发或在多个项目复用时。判定方法：把生成物 zip 一拖给陌生人，他解压后能不能直接跑？不能就是没自包含。nuwa 跑塔勒布产出的目录里有 4 个脚本（`download_subtitles.sh` / `srt_to_transcript.py` / `merge_research.py` / `quality_check.py`）、6 份调研存档、SKILL.md、sources/—— 整目录复制到任何 Claude Code 项目就能用。nuwa SKILL.md 行 169 明文要求这一条。",
      howToReuse: "(1) Phase 0.5 在调研之前先建好整个目录树，包括 `scripts/` 下从原仓库 `cp` 过来的所有脚本—— 不是等生成完再补；(2) SKILL.md 里所有命令必须用相对路径 `bash [skill目录]/scripts/...`，禁止 `bash nuwa-skill/scripts/...`；(3) 自检最后跑一遍：把生成目录单独拷到 `/tmp/random/` 下，看 SKILL.md 第一段例子能不能跑通—— 能跑通才算自包含。",
      antiExample: "「把脚本放在用户的 `~/.claude/scripts/` 公共目录」不是自包含—— 用户机器上才有的位置，分发出去就找不到。「在 SKILL.md 顶部加一句『使用前请先 pip install xxx』」也不是—— 把依赖外包给读者就是放弃自包含。「只复制 SKILL.md，让用户去 nuwa 仓拉脚本」更不是—— 这等于说 skill = SKILL.md + 一堆外部依赖。",
      cost: "4 个脚本 ≈ 20KB × N 个生成 skill = 重复存储，并且脚本会和原仓主分支分叉—— 原仓改了 `download_subtitles.sh` 因为 YouTube 改协议，已生成的 skill 不会自动同步。这两个代价都是真的，但比「未来想分发要回头改所有路径」便宜。永远只在本机用 / 不分发的 skill 可以放宽这条，但建议仍按自包含写—— 成本几乎为零，未来想分享立刻能用。",
      seenIn: "nuwa（Phase 0.5 `cp` 4 脚本进生成目录 + 强制相对路径）· web-video-presentation（每个 chapter 的 `narrations.ts` / `chapter.tsx` 不依赖项目根，可独立移植到另一个 Remotion 项目）。",
      relatedPatterns: [
        { to: "P3", label: "从产物反推协议", relation: "下游接管：反推出来的 Agentic Protocol 是 SKILL.md 的一部分，要和脚本一起留在自包含目录里—— 协议外置就等于又一个外部依赖。" },
        { to: "P6", label: "信息源黑名单 + 来源标记", relation: "搭配用：黑白名单作为 prompt 模板的一部分留在生成 skill 里跟着分发，不依赖运行时去外部拉规则。" }
      ]
    },

    {
      name: "信息源黑名单 + 来源标记",
      status: "候选",
      prevents: "默认让 WebSearch 自己排序。AI 用 WebSearch 搜中文人物时，知乎答案排在前面（SEO 排名高 + 中文搜索引擎偏好知乎）。我会把知乎用户洗稿来的「塔勒布观点」当一手信息写进 `01-writings.md`。这条信息的真实链路是：原书 → 英文 podcast 提到 → 英文博客复述 → 中文公众号翻译 → 知乎答案「塔勒布认为」。到我手里已经是五手信息，每一手都丢一点细节加一点译者理解—— WebSearch 不会告诉我这是五手。最后 SKILL.md 里写的「塔勒布认为」其实是某个知乎用户的二手理解。",
      therefore: "在每次采集任务的 prompt 字符串末尾硬写一份黑名单 + 一份白名单，并要求每条产物标注来源—— 不是放在文档里供 AI 参考，是写到 prompt 里强制带着走。",
      useWhen: "任何信息采集类工作。条件：(a) 工作领域有 SEO 重 + 二手内容多 + 不可验证的源（中文世界尤其严重）；(b) 你能列出 5-10 个你信任的权威 + 一手平台白名单。塔勒布场景下中文 agent 的 prompt 末尾必带：「黑名单：知乎、微信公众号、百度百科。白名单：36 氪 / 极客公园 / 晚点 LatePost / 财新 / 第一财经 / 虎嗅 / 少数派 / 机器之心；访谈类用小宇宙 / 喜马拉雅 / B 站非搬运号。」",
      howToReuse: "(1) 判断哪些进黑名单—— 那个源是不是大量二手转述 / 不可验证 / 更新慢；(2) 判断哪些进白名单—— 你信任的权威 + 一手素材平台；(3) 黑白名单必须写到每次采集任务的 prompt 字符串里，不能只放在文档里靠 AI「记得参考」—— AI 不会记得；(4) 每条产物强制带来源 URL + 平台标签，Phase 4 `quality_check.py` 自动扫「一手来源 ≥ 50%」作为通过标准之一；(5) 不同语种用不同黑名单—— 英文世界没有等价于知乎的高 SEO 二手池，黑名单要分语种写。",
      antiExample: "「在 system prompt 里写一句『请使用高质量信源』」不是这招—— 这是软性提示，AI 会忽略。「列了黑名单但 AI 跑 WebSearch 还是抓回来」也不是—— 黑名单要在 AI 拿到结果后强制过滤，不是指望 WebSearch 替你排除。「产物里没标来源」更不是—— 看不到来源就没法外部复核黑白名单有没有真生效。",
      cost: "一刀切假设有白名单替代。蒸馏一个只在知乎 / 公众号活跃的中文 KOL 时 dc5 必须让位—— 全部内容就在黑名单源里，只能用，但要在诚实边界标注「信息来自二手平台，可信度降低」，并放宽通过标准的「一手来源 ≥ 50%」那一条。跨语种人物（英文 X + 中文播客）要给两套黑白名单分别走—— 不能用一套覆盖两种语言。",
      seenIn: "nuwa（Phase 1 黑名单写进每个 agent prompt 末尾 + Phase 4 `quality_check.py` 扫来源比例）· 通用模式：任何「采集 → 提炼」流程的硬质量门，写一行字成本 ≈ 0。",
      relatedPatterns: [
        { to: "P2", label: "并行采集 + funnel 筛选", relation: "搭配用：黑名单是并行采集的质量约束，写进每个 agent 的 prompt 末尾跟着走—— P6 是 P2 的输入卫生。" },
        { to: "P5", label: "自包含目录原则", relation: "搭配用：黑白名单作为 prompt 模板的一部分留在生成 skill 里跟着分发，不依赖运行时配置——黑名单也得自包含。" }
      ]
    },

    {
      name: "保留矛盾 + 明示边界",
      status: "候选",
      prevents: "默认会洗白。Agent 4 他者批评调研里塔勒布有一条重复出现的事——「主张沉默但是 Twitter 最活跃的公知」。这是结构性矛盾，多次出现在不同评论者的笔下。我提炼时本能想调和——写成「他主张沉默但用 Twitter 是为了反讽社交媒体本身」—— 给他编了个理论补丁让他自洽。或者更糟，直接选一边只写「他主张沉默」把 Twitter 那部分丢掉。结果：用户读到 skill 觉得「塔勒布观点全自洽 / 永远正确 / 像维基百科条目」—— 但真塔勒布不是这样。维基百科条目化的 skill 在用户问具体问题时给标准答案，没有真人那种「他在这一点上自己也不一致」的有用提示。",
      therefore: "提炼器要主动留下不一致的部分，在产物里点名 ≥ 2 对张力 + ≥ 3 条诚实边界—— 不要在提炼时就磨光，也不要在末尾加一句「画像有局限」打发。",
      useWhen: "任何「提炼某物」型工作—— 人物、流派、领域、方法论。条件：原对象本身有时间演化 / 不同领域不同规则 / 价值观内在冲突。塔勒布场景下 Phase 2.4 必填一节「内在张力」—— 至少 2 对「书里说一套 vs 行为是另一套」的对照；Phase 2.6 必填 ≥ 3 条诚实边界（在 X 领域 + 因 Y 原因 + 曾被 Z 公开纠正）；Phase 4 通过标准里「内在张力 < 2 对 = 太假 = 不通过」。",
      howToReuse: "(1) 每条提炼出来的核心论点去外部视角调研（nuwa 是 Agent 4）和实际行为调研（Agent 5）里搜反例—— 找到了就标成张力，找不到的可能是太弱的提炼项；(2) 张力按 3 种类型分类：时间性（观点演化）/ 领域性（不同场景不同规则）/ 本质性（价值观内在冲突）；(3) 诚实边界要具体—— 不能写「不能替代本人」这种泛话，要写「在 X 领域 + 因 Y 原因 + 曾被 Z 公开纠正」；(4) 验证：产物读起来「全自洽」就一定丢了东西—— 回去找你磨掉的那一块。",
      antiExample: "「在 SKILL.md 末尾加一句『此画像有局限性』」不是保留矛盾—— 这是免责声明。「列了张力但每对都写成『其实可以这样理解』把它调和」也不是—— 编理论补丁让矛盾自洽就是磨光。「选一边只写一边」更不是—— 这是直接丢掉。判定方法：你的张力如果能直接用「其实他是想表达 X」一句话调和掉，那就是没真留矛盾。",
      cost: "假设原对象有真矛盾。虚构人物（小说角色 / 虚拟偶像 / 影视角色）没有「书里说 vs 行为做」的不一致—— 言行都是创作者写的本来就一致。强行套 2 对张力会编出来，这时要切到主题 skill 模式或承认「这是设定不是人物」。刚活跃 < 5 年、还没被批评过的新晋人物外部批评不足，张力可能凑不出 2 对—— 放宽到「≥ 1 对 + 在诚实边界标『信息不足，张力可能未充分展现』」，不要强凑。",
      seenIn: "nuwa（Phase 2.4 内在张力 + 2.6 诚实边界 + Phase 4 voice 测试的反假门）· 通用模式：任何画像 / 蒸馏类工作的反 AI 美化机制。",
      relatedPatterns: [
        { to: "P2", label: "并行采集 + funnel 筛选", relation: "前置：funnel 之后特意留下「0 道筛通过但有外部反例」的候选作为张力素材—— P2 的 funnel 不是终点，张力素材就在被丢的那一档边上。" },
        { to: "P4", label: "独立验证打破自评偏差", relation: "搭配用：独立 sub-agent 跑 Voice 测试时如果看到 SKILL.md 全自洽应判失败—— P4 的验证是 P7 的执行保障，没有 P4 兜底，P7 会被 AI 默默磨光。" }
      ]
    },

    {
      name: "入口分流（明确名字 / 模糊需求）",
      status: "候选",
      prevents: "默认会立刻开搜。但如果用户说的是「我最近做投资亏了好几次，想让 AI 帮我看看自己有没有什么盲点」—— 我会开搜什么？「投资盲点」？「决策错误」？「认知偏差」？搜出来一堆通用心理学文章和投资科普—— 根本不是 perspective skill 该做的事。这是模糊需求路径，nuwa 让我做的不是开搜，是先 1-2 轮追问把需求定位到 10 类维度表的一格（这位用户落在「决策与判断」维度），再推荐 2-3 个候选思维框架（塔勒布看反脆弱 / 卡尼曼看认知偏差 / 芒格看多元思维模型）让用户选—— 用户读完候选 + 局限再决定蒸馏谁。如果我直接开搜，用户读到一堆心理学文章会回我「这不是我想要的」—— 浪费 30 分钟。",
      therefore: "在动作开始之前先把这次请求贴一个标签—— 走哪条路径决定了后续每一步该干什么。模糊路径里 AI 别只反问，给「候选 + 局限」让用户挑——把模糊收敛成有限选择题这件 AI 擅长的活，做了它就是 AI 该承担的活。",
      useWhen: "任何「用户输入 → 多步生产」型工作流，且输入存在天然二分边界（信息够 vs 不够 / 名字明确 vs 模糊 / 新建 vs 更新）。nuwa 是「明确人名」走直接路径 → Phase 0A 4 个补丁问题（聚焦方向 / 用途 / 新建或更新 / 本地语料）；「模糊需求」走诊断路径 → Phase 0B 三步（10 类维度追问 / 2-3 候选 / 用户选）。两条路在 Phase 0.5 才会合。",
      howToReuse: "(1) 在工作流第一步前画一张二选一表，列出两条路径的入口判据；(2) 直接路径上的补丁问题数量要克制（nuwa 是 4 个），每个都有默认值—— 用户答不出也能继续；(3) 模糊路径里 AI 不能只反问，要主动给 2-3 个候选 + 每个候选的「核心镜片 + 为什么适合你 + 局限」三件事—— 把模糊收敛成有限选择题；(4) 追问轮数设上限（nuwa 是 ≤ 2 轮）防止变问卷调查；(5) 用户答完所有补丁问题后自动汇合到主流程，分流的痕迹消失。",
      antiExample: "「AI 先问『你是想要 A 还是 B』」不是分流—— 这是把决定推给用户。分流的标志是 AI 看输入自己判断走哪条路。「在 SKILL.md 顶部写一段『如果你是 X 型用户请这样，Y 型请那样』」也不是—— 把分流外包给运行时读 SKILL.md 的另一个 AI。「模糊路径里只反问『你能说得具体点吗』」更不是—— 这是让用户回去再想，AI 没承担它该承担的活。",
      cost: "假设有真不同的两条路。如果所有输入到最后都需要同样的下游动作，分流就空转。信息密集型输入（用户已主动答了 3-4 个补丁问题）AI 还按模板问完会拖—— 要识别「用户已答了 N 个跳过这 N 个」，不能机械走完。但分流这一刀本身没失效，只是 Phase 0A 内部跳过该跳的。",
      seenIn: "nuwa（Phase 0 二选一表 + 0A 直接 / 0B 诊断分叉）· spec-interview（明确 PRD 路径 vs 探索 idea 路径）· web-video-presentation（已有 article 路径 vs 从需求生成 article 路径）。",
      relatedPatterns: [
        { to: "P1", label: "三道便宜返工点 checkpoint", relation: "前置：分流分对了路径再进昂贵动作，分流后通常要走 checkpoint 确认才进下一步—— 两者夹起来是「路径分对 + 路径执行中再对齐」两道保险。" },
        { to: "P2", label: "并行采集 + funnel 筛选", relation: "下游接管：分流确定路径后才能决定要不要 spawn 6 agent 并行—— 模糊路径下 0B 阶段只需要少量调研做候选推荐，全量并行采集等到用户选完候选才启动。" }
      ]
    }
  ],

  // ============================================================
  // APPLY IT — placeholder
  // ============================================================
  applyIt: {
    summary: "(anchor slice 阶段占位 — checkpoint 之后由用户决定的方式补完)"
  }
};
