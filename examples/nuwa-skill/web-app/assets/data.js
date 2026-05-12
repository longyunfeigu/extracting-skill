window.handbook = {
  meta: {
    title: "女娲 · Skill 造人术 解剖手册",
    sourcePath: "/home/guwanhua/Desktop/git/nuwa-skill",
    audience: "想偷招的人 / 想自己写一个『蒸馏一个人』的 skill 的人",
    outputMode: "multi-page-web-handbook",
    generatedFor: "让读者看见：当我作为 AI 拿到『做一个塔勒布的 skill』这个请求，女娲是怎么把我从『凭训练语料拼几句名言做角色扮演』拦下来、改写成『6 个 agent 并行调研 → 3 道检查点对齐 → 三重验证筛模型 → 反推 Agentic Protocol → 独立子 agent 做质量验证』的完整生产线的。"
  },

  overview: {
    oneLiner: "你让 AI 扮演塔勒布回答风险问题，它说得头头是道——直到你问一个需要 2024 年真实数据的问题，它开始飘。女娲修的不是 AI 不懂塔勒布，是 AI 在『角色扮演』和『做研究』之间没有边界。",

    openingScene: [
      { kind: "para", text: "想象你打开一个新对话，告诉 AI：『请扮演塔勒布，分析最近的日元贬值。』" },
      { kind: "para", text: "AI 给你一段听起来像塔勒布的话——『这是 Extremistan 里的事件』『日本央行的干预制造 fragility』『IYI 经济学家又看不见尾部风险』。" },
      { kind: "para", text: "听起来对。" },
      { kind: "para", text: "然后你问下一个问题：『2024 年 7 月那次干预之后，carry trade 的平仓规模到底有多大？』" },
      { kind: "para", text: "AI 开始飘——" },
      { kind: "list", items: [
        "它说一个数字。编的。",
        "它引用一份『野村证券报告』。编的。",
        "它推荐的对冲策略，基于训练语料里 2022 年的市场情况。"
      ]},
      { kind: "para", text: "你脑子里大概知道哪不对，但你说不清楚到底坏在哪。问题不是 AI 不懂塔勒布——它对塔勒布的词汇用得比你熟。问题是 AI 在『角色扮演』和『做研究』之间没有边界：它把训练语料里塔勒布说话的方式直接套到一个需要事实的问题上，遇到不知道的事就编。" },
      { kind: "para", text: "女娲（这个 skill）要修的就是这个边界。它生成出来的 taleb-perspective skill，遇到这个问题时会先做研究再说话——而不是顺着塔勒布的语气编下去。" }
    ],

    predictPrompt: "在往下读之前，先把你的猜测在心里写下来：你会怎么修这个边界？给 AI 一个『先做 WebSearch 再回答』的指令？给它一个塔勒布风格 prompt 模板？还是别的？下面女娲的做法多半跟你的不一样。",

    primerBeats: [
      { kind: "para", text: "女娲的做法是把『做一个塔勒布 skill』这件事拆成 5 个阶段，外加 3 道检查点。最后产出一个 skill 目录，可以原样复制到任何 Claude Code 项目就能用。" },
      { kind: "diagram", id: "overview-flow" },
      { kind: "para", text: "**Phase 1：派 6 个 subagent 同时去搜塔勒布的 6 个维度**——著作 / 长对话 / 碎片表达 / 别人怎么评他 / 实际决策记录 / 时间线。每个 subagent 写一份独立报告，存到 `references/research/0X-xxx.md`。不是 1 个 agent 看 6 件事，是 6 个 agent 并行各看 1 件事——因为塔勒布的著作（500 多页 5 本书）、播客（50+ 场访谈）、Twitter（上万条）和外部批评（Kahneman / Pinker 等）的信息量根本不可能让 1 个 agent 在合理时间里都看一遍。" },
      { kind: "para", text: "**Phase 2：把这 6 份报告里反复出现的论点一条条捞出来**——『反脆弱』『skin in the game』『林迪效应』『Via Negativa』『IYI』『黑天鹅』『火鸡问题』『绿木交易员』……通常能扒出 15-30 个候选。每一条都必须过 3 道筛：" },
      { kind: "list", items: [
        "跨域复现——这个论点在他讨论 2+ 个不同领域时都出现吗？（在金融讲、在医学讲、在政治也讲）",
        "生成力——用它能推断他对一个新问题（他没明确说过的）的可能立场吗？",
        "排他性——是不是所有聪明人都会这样想？（区分塔勒布独特的，还是常识）"
      ]},
      { kind: "para", text: "3 道全过 → 算心智模型（最后取 top 3-7 个）。只过 1-2 道 → 退一档算决策启发式（具体可执行的规则，但不算他独特的看世界镜片）。0 道 → 直接丢。塔勒布身上几十个候选最后筛出来的心智模型只有 6 个：非对称风险思维 / 反脆弱偏好 / Skin in the Game 检验 / 林迪效应筛选 / Via Negativa / 领域特异性。其他都被退档或丢掉了。" },
      { kind: "para", text: "**Phase 3：套模板生成 SKILL.md。**这一步里最有意思的不是套模板，是给生成的 skill 配 Agentic Protocol（让它在回答问题前先做研究的工作流）。配的时候不用通用搜索模板——从已经蒸馏出的 6 个心智模型，倒着推出 5 个『塔勒布会先看什么』的研究维度。这一步在下面 Wow moment 节展开。" },
      { kind: "para", text: "**Phase 4 和 5：质量验证 + 精炼。**Phase 4 用一个独立的 subagent（不是写 skill 的那个）做 3 类测试——已知测试（塔勒布公开表过态的问题，跟蒸馏出来的回答对得上吗）/ 边缘测试（他没明确说过的相关问题，能不能给出『基于模型 X 推断』的回答而不是斩钉截铁）/ 风格测试（100 字读出来像不像他）。之后 Phase 5 再用第二组 subagent 做精炼。" },
      { kind: "para", text: "**3 道检查点：Phase 1.5 / 2.5 / 4。**整个流程中间停 3 次等用户拍板——看 6 agent 调研质量够不够 / 看蒸馏出的心智模型对不对 / 看验证结果接不接受。这不是流程的装饰：AI 自己看不出哪一步走偏了，必须让用户在改起来还便宜的时候卡一下。在写完 440 行 SKILL.md 之后才发现『方向不对』，返工成本要高得多。" }
    ],

    wowSetup: "回到刚才扮演塔勒布的问题——我们再看一遍 Phase 3 这一步在做什么。女娲不给生成的 taleb-perspective skill 一个通用搜索模板（『搜任何相关信息』）。它从蒸馏出来的 6 个心智模型，倒着算出『塔勒布回答这个问题前会先看 5 件事』。下面是塔勒布、费曼、MrBeast 三个人在同一段位置上的对照——核心心智模型不同，反推出来的研究维度也完全不同：",

    wowMoment: "同一段位置——同一个『Step 2: XX 式研究』的外壳。但三个人的『先看什么』全不一样。塔勒布不会去查 CTR；MrBeast 不会去查谁有 skin in the game。这才是『捕捉 HOW they think 而不是 WHAT they said』——它真的被写进生成的 skill 里。如果没有 Phase 3 反推这一步，所有的 perspective skill 都会被退化成同一个『先 WebSearch 再回答』的通用模板，看着每个不一样，骨子里是同一个东西。",

    badResults: [
      {
        title: "凭训练语料编",
        aiDefault: "让 AI 直接扮演塔勒布。问 2024 年的事，它编一段基于 2022 年市场情况的回答，附上编的报告引用。听起来专业，遇到具体数字就崩。",
        nuwaIntercept: "生成的 skill 在 Step 1 强制做问题分类：需要事实的问题必须先 WebSearch 拿到真材料，不允许跳过到 Step 3 回答。『宁可多搜一次，也不要凭训练语料编造』写在 skill 里。"
      },
      {
        title: "把候选一股脑全列上",
        aiDefault: "AI 蒸馏塔勒布时把『反脆弱 / skin in the game / 黑天鹅 / 林迪 / Via Negativa / IYI...』一股脑全列出来当心智模型。看着内容很丰富，实际上分不清哪个是真镜片、哪个只是流行词或随口一句。",
        nuwaIntercept: "Phase 2 强制每个候选过三重验证（跨域复现 / 生成力 / 排他性）。塔勒布身上扒出的 15-30 个候选最后只筛出 6 个真心智模型；其余的退档算决策启发式（9 条）或直接丢掉。3 个深刻模型远好于 10 个浅薄原则。"
      },
      {
        title: "自评偏差",
        aiDefault: "写完 SKILL.md 后 AI 自己说『通过』。自己写的自己评，天然偏好给好分——『嗯这个有道理嗯那个也合理』，发现不了内部不一致。",
        nuwaIntercept: "Phase 4 强制用一个独立的 subagent（不是写 skill 的那个）做 3 类测试。验证的 subagent 不知道前面是怎么写的，只拿到 SKILL.md 和测试题。结果不对 → 回到 Phase 2 调整。"
      },
      {
        title: "把人写得太平整",
        aiDefault: "AI 在塔勒布身上找不到矛盾，写出一段『塔勒布认为应该这样、这样、这样』的整齐人设。看着像理解到位，实际上把人格的复杂度抹平了——一个没有矛盾的人不像真人。",
        nuwaIntercept: "Phase 2.4 反过来要求记录至少 2 对内在张力。塔勒布最后被记下来 7 对：思想反脆弱但自尊脆弱 / 鼓吹 skin in the game 但批评比特币时已清仓 / 主张 Via Negativa 但 Twitter 不断增加噪音 / 蔑视社交媒体辩论但是最活跃的 Twitter 知识分子……矛盾在女娲眼里是『深度的来源』，不是 bug。"
      }
    ],

    shapeReason: "不是按女娲源文件的 Phase 顺序排——那个顺序对作者方便，对读者不友好。这本手册按读者意图排：先让你认识，再让你看见，再给你工具去用。",

    chapterLogic: [
      { chapter: "01 Overview（你正在读）", why: "让一个完全没看过女娲的人在 10 分钟知道它在干嘛、值不值得继续读。" },
      { chapter: "02 Walkthrough", why: "本手册的脊柱。14 个 stage 让你看见我（AI）拿到『蒸馏塔勒布』后被女娲一步步拦下来的完整路径，每个 stage 用塔勒布的真东西落地。" },
      { chapter: "03 Glossary", why: "反常地排第三——不是放在最后做参考字典——因为 Walkthrough / Design Choices / Patterns 都会用 HOW vs WHAT、三重验证、内在张力这些术语。先讲清楚，后面读才不卡。" },
      { chapter: "04 File Map", why: "root SKILL.md / 2 份 references / 4 个 scripts / 生成目录各管什么、写错会怎样。这是想自己改女娲的人需要的。" },
      { chapter: "05 Design Choices", why: "8 个真正改变了 AI 默认行为的设计选择。每个明确点名它防什么坏 AI 输出。" },
      { chapter: "06 Patterns", why: "7-8 张可以搬到别的 skill 里的招。每张带反例和代价——没反例和代价的 pattern 是糊的。" },
      { chapter: "07 Apply It", why: "给读者自己写一个类似 skill 的清单 + 起手 prompt。" }
    ]
  },

  example: {
    userRequest: "我想做一个塔勒布的 skill。我手里没有他的素材，就你自己搜吧。",
    whyThisExample: "选塔勒布有 4 个具体理由：(1) 女娲 root SKILL.md 自己就多处用塔勒布举例（Phase 3 Agentic Protocol 推导表 3 例之一、『skin in the game』被点名为高频词），跟着原 skill 的示范例子走，每个 stage 都有据可查；(2) 塔勒布是活人，能演示 Agent 6 时间线维度的『最近 12 个月动态』这个防过时设计；(3) 塔勒布 voice 极鲜明且争议大，能让『内在张力』『外部批评』『诚实边界』这三个最容易写假的 section 出真东西；(4) 仓库里已经有一份做完的 examples/taleb-perspective/SKILL.md（约 440 行），后面 Walkthrough 的每个 stage 都能引到真实的产出片段而不是想象的占位文本。",
    expectedOutput: "一个自包含的 skill 目录：.claude/skills/taleb-perspective/，含 SKILL.md（最终产物，约 440 行）+ scripts/（字幕下载 / SRT 清洗 / 调研合并 / 质量自检 4 个脚本，从女娲复制过来）+ references/research/01-writings.md 到 06-timeline.md（6 个 agent 的调研结果存档，分别约 5-30KB）+ sources/{books,transcripts,articles}/（一手素材原文）。整个目录可以原样复制到任何 Claude Code 项目就能用，不依赖女娲本身——这是『自包含』硬要求，为开源分发设计的。"
  },

  diagrams: [
    {
      id: "overview-flow",
      type: "orientation",
      title: "女娲跑一遍塔勒布的 5 阶段流程",
      description: "塔勒布作为输入（一个人名）→ 5 个 Phase + 3 道检查点 → 输出一个自包含 skill 目录。这是后面 14 个 stage 的顶层骨架。",
      image: "assets/diagrams/overview-flow.svg"
    },
    {
      id: "protocol-compare",
      type: "compare",
      title: "三个人在同一段位置上的对照",
      description: "Phase 3 生成 Agentic Protocol 时，从蒸馏出的核心心智模型倒着推出研究维度。塔勒布 / 费曼 / MrBeast 的心智模型不同，反推出的『先看什么』也完全不同——证明这是真的 HOW they think，不是写死的模板。",
      image: "assets/diagrams/protocol-compare.svg"
    },
    {
      id: "main-flow",
      type: "flow",
      title: "14 个 stage 的 6 phase 拓扑",
      description: "14 个 stage 按 nuwa 的 phase 顺序聚成 6 个大组：入口建目录 / 6 agent 并行 / Phase 1.5★ 检查点 / 三重验证（含 Phase 2.5★）/ Phase 3 反推与套模板 / Phase 4★ 验证与精炼交付。这张图只画拓扑——具体 14 个 stage 的一行摘要见下方索引表。",
      image: "assets/diagrams/main-flow.svg"
    }
  ],

  walkthrough: [
    {
      id: "triage-input",
      title: "判断用户给了我什么——人名、模糊需求、还是空主题",
      summary: "用户的请求刚到——『我想做一个塔勒布的 skill。我手里没有他的素材，就你自己搜吧』。我第一反应想立刻开建目录开始搜。女娲不让，让我先按入口表分流——三种输入走三条路径，认错就坏。",
      preTest: "设想你和我同坐一椅。一个用户的请求刚到——『我想做一个塔勒布的 skill。我手里没有他的素材，就你自己搜吧』。下一秒你想干的事是直接开建 skill 目录开始搜，还是先做点别的？写下来再读下面我（被女娲拦着的 AI）实际走的路径。",
      narrativeBody: [
        { kind: "para", text: "**从这里开始：** 我现在手里只有这一句用户请求。" },
        { kind: "para", text: "第一秒我本能想直接开建 `.claude/skills/taleb-perspective/` 目录、spawn 6 个 subagent（Claude Code 里可以同时跑的助手 agent）开搜——这是『进度感』最强的动作。" },
        { kind: "para", text: "女娲不让。它让我先把一件事看清楚：用户给我的，到底是哪一种输入？三种输入的下一步动作完全不同，当一回事处理会出三种不同的坏。" },
        { kind: "para", text: "女娲入口文件 `SKILL.md`（AI 进来第一份要读的）的 Phase 0 把三种输入写成一张分流表：" },
        { kind: "code", lang: "markdown", text: "| 用户输入 | 路径 | 示例 |\n|---------|------|------|\n| 明确的人名 / 主题 | 直接路径 → Phase 0A | 蒸馏芒格 / 做一个费曼 skill |\n| 模糊的需求 / 困惑 | 诊断路径 → Phase 0B | 我想提升决策质量 / 有没有一种思维方式能帮我看透商业本质 |\n| 只甩了一个空主题 | 反问让用户先给素材 | 做一个关于价值投资的 skill（没指人也没说从哪几家流派起步） |" },
        { kind: "para", text: "塔勒布是个具体的人名，加上『我手里没有他的素材』明确了素材来源（纯网络搜索）——是典型的『明确人名』分支。走直接路径。" },
        { kind: "para", text: "如果我跳过这一步、把所有输入都按同一种方式处理：" },
        { kind: "list", items: [
          "把『我想提升决策质量』这种模糊需求当人名 → 我会替用户随便挑一个人（比如『那就芒格吧』）——把内容设计权偷过来，用户拿到产物会发现『这不是我想要的』。",
          "把『就做塔勒布』这种明确人名当模糊需求 → 我会再追问『你说的决策是哪种场景』——画蛇添足，浪费用户耐心。",
          "把空主题当明确人名硬上 → 6 个 agent 都启动了才发现『主题』对应的人选我自己定的，全套调研废一遍。"
        ]},
        { kind: "para", text: "这一步几乎是『停一秒看一眼』——但跳过它，后面 13 个 stage 的工作可能全白做。" }
      ],
      receives: "用户的一句请求。",
      reads: ["nuwa root SKILL.md L31-37 入口分流表"],
      blockedShortcut: "默认所有输入走同一种路径不分流；或者反过来——所有请求都当模糊需求追问 3 轮把用户折磨走。",
      action: "对照入口表分流：明确人名 → 直接路径 Phase 0A；模糊需求 → 诊断路径 Phase 0B；空主题 → 反问让用户先给候选或素材，不替用户构思。",
      output: "一条确定的执行路径——本例进直接路径。",
      nextConsumer: "Phase 0A 5 件事澄清。",
      reusableMove: "入口先分流，不要让一个 skill 用同一套动作处理所有输入形态——空原料就反问，不要硬凑。",
      challenges: [
        "用户说『做一个塔勒布的 skill，但其实我也想顺便了解纳瓦尔』——这是 1 个明确人名 + 1 个搭头，分流表没列。你按哪个分支走？",
        "用户给的人名是『我老板老王』（公开信息几乎为零）——形式上是明确人名，但走完调研路径会得到一个垃圾 skill。这种情况你在 stage 01 就拦下来，还是等 Phase 0.5 评估到来源少于 10 条再说？",
        "用户说『我想要一个会看科技产品的视角』——主题而非人名。你按『主题 skill』分支走（女娲特殊场景一节），还是反问用户想到具体某个人？依据是什么？"
      ]
    },
    {
      id: "clarify-direct",
      title: "5 件事一次澄清，不要追问到第 3 轮",
      summary: "直接路径已定。女娲让我把 5 件模糊的事一次性钉清楚——人名 / 聚焦方向 / 用途 / 新建或更新 / 本地素材。一轮问完，不变成问卷调查。",
      preTest: "你已经知道用户要做塔勒布。如果你是一个客气的 AI，你会问几轮问题确认细节？1 轮？2 轮？3 轮？女娲的硬规则只允许 1 轮。猜猜为什么。",
      narrativeBody: [
        { kind: "para", text: "**接上一步：** 路径分清楚了——直接路径。但用户那句话里还有 5 件事没钉清楚，全靠默认会出错。" },
        { kind: "para", text: "女娲 SKILL.md Phase 0A 有一张 5 项澄清清单。我把它一次性问出去，**不分轮**——分轮会把用户折磨走（这是写客服 chatbot 的 AI 的本能：追问到第 3 轮）。" },
        { kind: "code", lang: "markdown", text: "1. 这个人/主题是谁：确保理解正确（塔勒布是 Nassim Taleb 对吧，不是某个网红同名？）\n2. 聚焦方向：全面画像 vs 聚焦某个维度（你是想要他的风险思维，还是包括他作为交易员的部分？）\n3. 用途：思维顾问？决策参考？角色扮演？\n4. 新建 or 更新：是否已有该人物的 skill？（先扫一下 .claude/skills/ 目录）\n5. 本地语料：你手上有没有他的一手素材？书籍 PDF、播客 transcript、视频字幕？" },
        { kind: "para", text: "塔勒布本例的用户回答非常简短：『就 Nassim Taleb / 全面画像 / 思维顾问 / 新建 / 没素材就你自己搜』。" },
        { kind: "para", text: "用户给的信息很少？女娲允许：『用户说就做 XX 没更多信息 → 默认全面画像 + 思维顾问 + 无本地语料（走网络搜索）』——直接推进。" },
        { kind: "para", text: "5 件事里最关键的是第 5 项**本地素材**。这一问最容易被 AI 跳过，但跳过的代价最高——用户手里可能有完整的 Incerto 五部曲 PDF 或者 Tim Ferriss Show 完整 transcript（比网上能搜到的二手转述质量高得多），不问就走网络搜索等于自废一臂。" },
        { kind: "para", text: "5 件事中任何一件没钉死，后面会出什么坏：" },
        { kind: "list", items: [
          "聚焦方向不清楚 → Phase 1 6 个 agent 都全面撒网，筛出的 6 个心智模型可能跟用户实际想要的不对应（用户只想要风险思维，得到了风险 + 政治 + 饮食一锅炖）。",
          "用途不清楚 → Phase 3 套模板时不知道该不该写『角色扮演规则』——思维顾问要那一段，纯角色扮演要更狠的语气约束。",
          "本地素材没问 → 用户后来发现『咦你怎么没用我那本书』——返工一次。"
        ]}
      ],
      receives: "stage 01 给的『直接路径』标签。",
      reads: ["nuwa SKILL.md L42-56 Phase 0A 5 项澄清"],
      blockedShortcut: "追问 3 轮把用户折磨走；或者跳过本地素材这一问就开搜（最容易跳过的一项，恰好最关键）。",
      action: "把 5 件事打成一个清单一次性问出，等用户回答。回答简短不补全的 → 用默认值推进。",
      output: "5 件事的明确答案：人名 Nassim Taleb / 全面画像 / 思维顾问 / 新建 / 纯网络搜索。",
      nextConsumer: "Phase 0.5 创建 skill 目录用『人名』生成路径，用『本地素材』决定要不要复制素材进 sources/。",
      reusableMove: "需要从用户那里拿信息时，一次问完所有相关项——不要分多轮把对话拉得很长。模糊回答用默认值，明确回答按用户说的走。",
      challenges: [
        "用户 5 项中回答了 3 项，剩 2 项『随你』——你按默认值推进还是再追一轮？依据是什么？",
        "用户说『我有素材但还没整理好，明天给你』——停下来等用户，还是先走网络搜索后面合并？女娲没写这种情况。",
        "5 项里你觉得最容易被未来作者删的是哪一项？删掉后会在哪个 stage 出问题？"
      ]
    },
    {
      id: "create-dir",
      title: "在调研开搜之前先把目录建好（自包含原则）",
      summary: "5 件事钉死了。下一步直觉是 spawn 6 个 agent 开搜——女娲不让。它要我先建好目录，让每个 agent 有路径写报告。目录还必须建在 skill 内部——这就是『自包含原则』。",
      preTest: "5 件事都问清楚了，6 个 agent 蓄势待发。你接下来想干的事是：A 立刻 spawn 6 个 agent 开始搜，B 先建个工作目录，C 检查一下用户配的工具齐不齐。你选哪个，为什么？",
      narrativeBody: [
        { kind: "para", text: "**接上一步：** 5 件事拍板，agent 要的所有上下文都齐了。" },
        { kind: "para", text: "我现在最想干的是 spawn 6 个 agent 开搜。女娲不让——它让我先建好 skill 目录。" },
        { kind: "para", text: "为什么这一步必须在调研之前？因为 6 个 agent 各自会产出一份调研报告（`01-writings.md` 到 `06-timeline.md`），这些报告必须有地方落。如果先开搜、再现想『报告往哪写』，6 个 agent 同时回来时我可能就把它们堆在临时目录或者干脆不存了。" },
        { kind: "para", text: "女娲的目录模板是这样的（Phase 0.5）：" },
        { kind: "code", lang: "text", text: ".claude/skills/taleb-perspective/\n├── SKILL.md                          # 最终产物（Phase 3 后期生成）\n├── scripts/                          # 工具脚本（从 nuwa 复制过来）\n└── references/\n    ├── research/                     # 每个 agent 的调研结果\n    │   ├── 01-writings.md            # 著作与系统思考\n    │   ├── 02-conversations.md       # 长对话与即兴思考\n    │   ├── 03-expression-dna.md      # 碎片表达与风格 DNA\n    │   ├── 04-external-views.md      # 他者视角与批评\n    │   ├── 05-decisions.md           # 决策记录与行动\n    │   └── 06-timeline.md            # 人物时间线\n    └── sources/                      # 一手素材（用户提供 + 网络下载）\n        ├── books/\n        ├── transcripts/\n        └── articles/" },
        { kind: "para", text: "建完目录后，跑一遍 `tree`：" },
        { kind: "code", lang: "bash", text: "$ tree .claude/skills/taleb-perspective/\n.claude/skills/taleb-perspective/\n├── scripts/\n└── references/\n    ├── research/\n    └── sources/\n        ├── books/\n        ├── transcripts/\n        └── articles/\n\n6 directories, 0 files" },
        { kind: "para", text: "**自包含原则**：所有调研文件必须存在 skill 目录内部（`references/research/`），**绝对不要存到 `07-调研与分析/` 或其它外部目录**。skill 必须是自包含的——复制整个 skill 目录就能独立使用，不依赖任何外部文件。这是为开源分发设计的：你想把 taleb-perspective 发给朋友，他 `cp -r` 走一份就能用，不需要再去找你电脑某个角落的『调研笔记目录』。" },
        { kind: "para", text: "这一步 AI 几乎没创作自由——目录树是固定的，命名是固定的，scripts/ 内容是从 nuwa 复制的。能犯的错只有一个：把目录建到外部去（比如『我习惯把 research 放 ~/notes 下』）——犯了就违反自包含。" }
      ],
      receives: "5 件澄清结果 + 人名『Nassim Taleb』。",
      reads: ["nuwa SKILL.md L139-169 Phase 0.5 目录树"],
      blockedShortcut: "跳过建目录直接 spawn agent（agent 没地方写报告）；或者把调研存到外部目录（违反自包含，未来 cp 走 skill 时丢一半内容）。",
      action: "按固定模板建 `.claude/skills/taleb-perspective/` 目录树；从 nuwa 复制 scripts/；run 一次 `tree` 验证。",
      output: "一个空但结构完整的 skill 目录，等 agent 往里写。",
      nextConsumer: "Phase 1 6 个 agent 启动后，每个 agent 知道自己往哪个文件写。",
      reusableMove: "做任何会产生多份 artifact 的并行操作前，先把『每份 artifact 放哪里』钉死。先建路径再开搜，不要让『放哪里』在并发跑起来后才决定。",
      challenges: [
        "用户提供了 3 个 PDF——按自包含原则你要把 PDF 复制进 sources/books/ 还是用软链接？哪种更『自包含』？",
        "你接到一个更新已有 skill 的请求——目录已经存在，原 scripts/ 是 6 个月前的版本，nuwa 现在的 scripts/ 多了 1 个文件。你按 nuwa 当前版本覆盖还是保留原版？",
        "skill 跑完后用户问『我能不能把整个 taleb-perspective 目录提交到我们公司的开源仓库』——女娲的自包含原则在这种场景下还成立吗？有没有需要剔除的文件？"
      ]
    },
    {
      id: "swarm-launch",
      title: "spawn 6 个 subagent，不要让 1 个 agent 顺序看 6 件事",
      summary: "目录就绪。女娲让我同时启动 6 个 subagent，每个看一个维度（著作 / 长对话 / 表达 / 他者 / 决策 / 时间线）。不是 1 个 agent 看 6 件事——并行 6 倍效率，且独立报告减少互相带偏。",
      preTest: "塔勒布的语料量极大：5 本书 500+ 页 / 50+ 场播客 / 上万条 Twitter / 至少 10 篇外部批评长文。让你设计调研，你会派 1 个 agent 看 6 件事，还是 6 个 agent 各看 1 件事？你选 6 个的话，每个 agent 拿到的 prompt 长什么样？",
      narrativeBody: [
        { kind: "para", text: "**接上一步：** 目录建好了，每个 agent 的写入路径已定。" },
        { kind: "para", text: "我现在要并行启动 6 个 subagent。女娲为什么要并行 6 个不是 1 个？" },
        { kind: "list", items: [
          "塔勒布 5 本书 500+ 页 + 50+ 场长访谈 + 上万条 Twitter + 至少 10 篇外部批评长文——单 agent 顺序看完不可能在合理时间内完成。",
          "更关键的是独立性：6 个 agent 互不知道对方在搜什么，发现的『反复出现的论点』是真独立观察；如果一个 agent 顺序看完所有材料，它会被前 30% 的内容预设视角，后面的 70% 自动配框。"
        ]},
        { kind: "para", text: "6 个 agent 的任务分配（女娲 SKILL.md Phase 1）：" },
        { kind: "code", lang: "markdown", text: "| Agent | 搜什么 | 提取重点 | 输出文件 |\n|-------|--------|---------|---------|\n| 1 著作 | Incerto 5 本书 / 长 newsletter | 反复出现 ≥3 次的核心论点、自创术语 | 01-writings.md |\n| 2 对话 | 播客 / 长视频 / AMA / 深度采访 | 被追问时的回答方式、即兴类比、改变立场的瞬间 | 02-conversations.md |\n| 3 表达 | Twitter / Medium / 短文 | 高频用词句式、争议立场、幽默方式 | 03-expression-dna.md |\n| 4 他者 | 他人分析 / 书评 / 批评 / 传记 | 外部观察到的模式、与同行对比 | 04-external-views.md |\n| 5 决策 | 重大决策 / 转折点 / 争议行为 | 决策背景与逻辑、事后反思、言行一致 / 不一致 | 05-decisions.md |\n| 6 时间线 | 出生到现在的完整时间线 | 关键里程碑、思想转折点、最近 12 个月动态 | 06-timeline.md |" },
        { kind: "para", text: "每个 agent 的 prompt 都长一个样——以 Agent 1 著作为例：" },
        { kind: "code", lang: "text", text: "你的任务：调研 Nassim Taleb 的著作和系统性长文。\n\n搜索方向：\n- 此人出版的书籍（书名、核心论点、出版年份）\n- 长篇 newsletter / 博客 / 论文\n- 反复出现 ≥3 次的核心论点（这些是真信念）\n- 自创术语和概念\n- 推荐书单（揭示智识谱系）\n\n输出要求：\n- 写入 .claude/skills/taleb-perspective/references/research/01-writings.md\n- 每条信息标注来源 URL 和可信度\n- 区分一手（此人写的）vs 二手（别人总结的）\n- 发现矛盾直接记录，不要调和\n\n信息源黑名单：不使用知乎、微信公众号、百度百科。" },
        { kind: "para", text: "**信息源黑名单**是这一步的硬规则——女娲明确禁止知乎 / 微信公众号 / 百度百科。原因是这些渠道**洗稿严重、信息失真率高**，把这些当一手来源，整个调研的可信度就崩了。中文渠道只接受权威媒体（36 氪 / 极客公园 / 晚点 / 财新等）和原始视频（B 站 / 小宇宙）。" },
        { kind: "para", text: "6 个 agent 同时跑出去。我在这里几乎没创作自由——分配表是固定的、prompt 模板是固定的、黑名单是固定的。我能犯的错只有一个：自作主张把『明显塔勒布讨论得不多的维度』砍掉（比如『塔勒布不怎么写决策记录，我就跳过 Agent 5 吧』）——犯了就少一份报告，后面提炼时该维度的信息缺失。" }
      ],
      receives: "skill 目录 + 人名 Nassim Taleb + 用途（思维顾问）。",
      reads: ["nuwa SKILL.md L207-252 Phase 1 任务表 + agent prompt 模板 + 信息源黑名单"],
      blockedShortcut: "让 1 个 agent 顺序看 6 件事（agent 之间互相带偏 + 慢 5 倍）；或者用 WebSearch 自己摸（错过黑名单设计）；或者随便砍一两个 agent（少一份报告）。",
      action: "按固定分配表 spawn 6 个 subagent，prompt 模板填入人名后 fire，等结果。",
      output: "6 个 agent 同时跑——等待它们写入各自的 0X-xxx.md 报告。",
      nextConsumer: "我下一步盯一个 agent 看它实际在做什么，把元描述变具体。",
      reusableMove: "并行 + 独立报告 + 强制写入预定路径——这三件事一起做，能在原始数据收集阶段获得『互相独立的观察』。如果只做并行不做独立报告，agent 之间会互相参考，独立性丢失。",
      challenges: [
        "用户提供了 3 本塔勒布的电子书 PDF——你 6 个 agent 的分配要不要改？比如让 Agent 1 直接读这 3 本而不是搜网络？",
        "Agent 4『他者』搜出来的批评 80% 是 Kahneman 一个人的——你接受还是让 Agent 4 再搜一轮找其他批评者？女娲怎么说？",
        "黑名单里没列 LinkedIn——你判断 LinkedIn 算一手（塔勒布自己发的）还是二手（被洗的转载）？依据是什么？"
      ]
    },
    {
      id: "agent1-writings",
      title: "进一个 agent 内部看：Agent 1 怎么从 5 本书里捞反复出现 ≥3 次的论点",
      summary: "6 个 agent 同时跑。我盯一个看——Agent 1 著作。它在 Incerto 5 本书里筛『反复说 ≥3 次』的论点（这是真信念的标志），写进 01-writings.md。这个 stage 把『6 agent 并行』从元描述拉到具体动作。",
      preTest: "Agent 1 拿到『调研塔勒布著作』的任务。它现在打开了塔勒布的 5 本书（Incerto 五部曲）。它的下一秒应该干什么——A 从第一本第一页开始读，B 用 grep 搜高频词，C 先找每本书的『导言』看核心主张？你选哪个？",
      narrativeBody: [
        { kind: "para", text: "**接上一步：** 6 个 agent 同时跑出去了。我在这一步打开 Agent 1 的工作现场看它在做什么——把『6 agent 并行』从元描述拉到具体动作。" },
        { kind: "para", text: "Agent 1 拿到的明确任务是『找反复出现 ≥3 次的核心论点』。这是个不寻常的要求——为什么是 3 次？" },
        { kind: "para", text: "女娲的逻辑：**说一次可能是为了凑词；说两次可能是写作习惯；说三次以上还在不同场合说，是真信念**。所以 Agent 1 不是在做读书笔记，是在筛『真信念 vs 临时观点』。" },
        { kind: "para", text: "Agent 1 在 Incerto 五部曲（《随机漫步的傻瓜》《黑天鹅》《反脆弱》《非对称风险》《肥尾效应的统计后果》）+ 格言集《The Bed of Procrustes》+ arXiv 论文里筛出的高频论点：" },
        { kind: "code", lang: "markdown", text: "反复出现 ≥3 次的论点（写入 01-writings.md）：\n\n1. 非对称风险 / 肥尾分布——5 本书都有，论文中反复用\n2. Skin in the Game——同名书 + 其余 4 本各至少 2 处反复出现\n3. 反脆弱——同名书 + 其余 4 本中至少 1 处\n4. 林迪效应——3 本书 + 多场访谈\n5. Via Negativa（减法优先）——《反脆弱》专章 + 其余 2 本提及\n6. 领域特异性（理性是领域特定的）——3 本书 + 多篇 Medium\n7. IYI（Intellectual Yet Idiot）——《Skin in the Game》专章 + 多条 Twitter\n8. 黑天鹅事件——同名书核心 + 其余 4 本反复\n\n自创术语：\n- IYI / Fragilista / BS Vendor / Mediocristan / Extremistan / Lindy / Via Negativa\n\n智识谱系（推荐书单揭示的）：\n- Karl Popper（证伪主义）\n- Benoit Mandelbrot（肥尾、分形——塔勒布视其为导师）\n- Seneca（斯多葛 + 减法哲学）\n- Montaigne（认识论谦逊）\n- David Hume（归纳法的局限）" },
        { kind: "para", text: "Agent 1 同时记录了**矛盾点**——女娲明确要求『发现矛盾直接记录，不要调和』。塔勒布的矛盾有 1 处：" },
        { kind: "code", lang: "markdown", text: "矛盾 #1：Via Negativa（减法）vs Twitter 噪音\n\n- 《反脆弱》：改进往往不来自增加更多，而来自去除有害的。\n- 实际行为：Twitter 上不断增加碎片表达（高频骂战、攻击 IYI）。\n- 自己也承认：这是我自身的 domain dependence——系统层面理性，个人层面非理性。\n\n保留矛盾，进 Phase 2 的内在张力 section。" },
        { kind: "para", text: "Agent 1 不做的事（女娲明确要求）：" },
        { kind: "list", items: [
          "不把『塔勒布说过的所有话』列出来当结论——只列反复出现的（≥3 次是硬筛）。",
          "不把『塔勒布在 2010 年说过 X 但 2020 年改成 Y』调和成一段。塔勒布观点变化本身是有价值的信号——保留两个版本，进时间线 agent 处理。",
          "不引用知乎 / 微信公众号 / 百度 / 任何中文洗稿源——本案塔勒布的中文资料主要来自财新、晚点和原始 B 站讲座。"
        ]},
        { kind: "para", text: "Agent 1 这一步的产出 `01-writings.md` 大约 5-30KB——足够 Phase 2 提炼时把候选论点过三重验证用。" },
        { kind: "para", text: "其余 5 个 agent 在同时干各自的事——Agent 2 在听 EconTalk 和 Tim Ferriss Show 的塔勒布访谈、Agent 3 在扒 Twitter 的高频用词、Agent 4 在读 Kahneman / Pinker / Sunstein 的批评文章、Agent 5 在追 1987 黑色星期一 + Empirica 关闭 + Universa 顾问角色 + COVID 预警的决策记录、Agent 6 在拼时间线（1960 黎巴嫩出生 → 2024 反复在 NYU 教书 + Twitter 战）。" }
      ],
      receives: "Agent 1 的 prompt 模板填入『Nassim Taleb』+ 写入路径。",
      reads: ["nuwa SKILL.md L211-218 Agent 1 任务描述", "Agent 1 的 prompt 模板（L229-251）", "信息源优先级表（L288-296）"],
      blockedShortcut: "Agent 1 把塔勒布说过的话照单全收当结论（不做 ≥3 次筛）；或者发现矛盾就调和成一段（违反保留矛盾规则）；或者引用了知乎转述（违反黑名单）。",
      action: "Agent 1 在 Incerto 5 本书 + arXiv 论文 + Medium 长文里筛反复出现 ≥3 次的论点、自创术语、智识谱系、矛盾点，分类写入 01-writings.md。",
      output: "01-writings.md（约 5-30KB），含 8 个高频论点 + 7 个自创术语 + 上游 8 个智识来源 + 1 处矛盾。",
      nextConsumer: "Phase 2 三重验证从这 8 个高频论点（加上其余 5 个 agent 拿出的候选）里筛 6 个真心智模型。",
      reusableMove: "『反复出现 ≥3 次』是个可以搬到别的 skill 里的筛子。任何想从大量文本里筛信念而非临时观点的场景都适用——前提是文本足够多，不到 50 万字这个筛子没意义。",
      challenges: [
        "塔勒布的『火鸡问题』在 5 本书里只出现 2 次，但他在播客里反复讲——这个 2 次的硬阈值会漏掉它吗？应该把『反复出现』扩展到跨 agent 还是停留在著作内部？",
        "Agent 1 发现塔勒布 2010 年支持 Bitcoin、2021 年反对——这算『矛盾』（保留）还是『演化』（标注时间）？女娲的『保留矛盾』规则在这里要怎么具体应用？",
        "用户提供了一本塔勒布的『未公开演讲稿』（用户从某次内部讲座拿到的）——它是一手来源吗？跟 Incerto 同等权重吗？女娲的信息源优先级表给了答案吗？"
      ]
    },
    {
      id: "research-checkpoint",
      title: "Phase 1.5 ★ 调研 review 检查点——让用户拍板调研够不够",
      summary: "6 份调研都到了。我自己看不出整体质量够不够（每份单看都『还行』）。女娲在这里强制停下，把 6 份报告的摘要列成一张 ASCII 表给用户看，等用户拍板。这是 3 道检查点的第一道——也是最便宜的返工点。",
      preTest: "6 份调研报告都到了，加起来约 50KB。你下一秒想干的事是 A 立刻开始 Phase 2 提炼（『反正都搜了』），B 把 6 份 dump 给用户让他自己读，C 别的什么。猜猜女娲为什么这三个都不让你做。",
      narrativeBody: [
        { kind: "para", text: "**接上一步：** 6 份调研报告陆续到位，加起来约 50KB。每份单独看都『还行』——但我作为写报告的同一个 agent，看不出整体质量够不够。" },
        { kind: "para", text: "女娲强制停下。它在这里设了一个**检查点**——意思是『AI 自己看不出走偏没有，必须让用户在改起来还便宜的时候卡一下』。" },
        { kind: "para", text: "为什么必须卡？因为这是 5 个 Phase 里最便宜的返工点。调研有缺、有偏、有数据不够，**现在补一轮还便宜**——SKILL.md 还没开始写。等 Phase 3 ~440 行 SKILL.md 写完后才发现调研缺一块，整个就要重来。" },
        { kind: "para", text: "我不能把 6 份 50KB 全 dump 给用户让他自己读——他没耐心。女娲给了一个固定的 review 表格模板（Phase 1.5）：" },
        { kind: "code", lang: "text", text: "┌──────────────────┬──────────┬──────────────────────────┐\n│ Agent            │ 来源数量  │ 关键发现                  │\n├──────────────────┼──────────┼──────────────────────────┤\n│ 1 著作           │ 8 篇     │ 核心论点：反脆弱、Skin... │\n│ 2 对话           │ 5 段长访谈 │ 立场变化：对 Bitcoin 从  │\n│                  │          │ 支持转反对（2017→2021）  │\n│ 3 表达           │ 120 条   │ 高频词：skin in the game │\n│                  │          │   / IYI / Fragilista     │\n│ 4 他者           │ 6 篇     │ 主要批评：Kahneman 锚定  │\n│                  │          │ 偏差 / Pinker 进化生物学 │\n│ 5 决策           │ 4 个     │ 1987 黑色星期一 / 2004   │\n│                  │          │ Empirica 关闭 / 2020 COVID│\n│ 6 时间线         │ 完整     │ 最新：2026 年 3 月 NYU   │\n│                  │          │ 还在教书 + arXiv 新论文  │\n├──────────────────┼──────────┼──────────────────────────┤\n│ 矛盾点           │ 1 处     │ Via Negativa 主张 vs     │\n│                  │          │ Twitter 噪音             │\n│ 信息不足维度      │ 无       │                          │\n└──────────────────┴──────────┴──────────────────────────┘" },
        { kind: "para", text: "这张表把每份 50KB 压成一行——让用户能在 30 秒内判断。它有 3 件事：来源数量（够不够）、关键发现（方向对不对）、矛盾点（保留不调和）。" },
        { kind: "para", text: "拿给用户看，等用户回应。三种可能：" },
        { kind: "list", items: [
          "『OK 调研够了』→ 进 Phase 2 提炼。",
          "『Agent 4 太少了，只有 Kahneman 不够，再找 Pinker 和 Sunstein』→ 只重跑 Agent 4，其余不动。",
          "『Agent 2 列的立场变化具体是什么？给我看原文』→ 给原文，等用户进一步指示。"
        ]},
        { kind: "para", text: "本案用户回应『调研够了，进 Phase 2』。我不能自己判定『够了』——这是检查点的整个意义所在：**AI 自评偏好天然偏向『已经够了』**（因为继续搜要花时间），用户才是真正能判断『够不够』的人。" },
        { kind: "para", text: "这一步 AI 几乎没创作自由——表格模板是固定的，每行填啥也固定。能犯的错只有一个：**跳过这一步直接进 Phase 2**——犯了就在 Phase 4 验证时发现『塔勒布的某个观点跟事实对不上』，回查时才知道调研缺了。" }
      ],
      receives: "6 份调研报告 references/research/0X-xxx.md。",
      reads: ["nuwa SKILL.md L315-337 Phase 1.5 review 表格模板", "6 份报告各自的关键发现段落"],
      blockedShortcut: "跳过检查点直接进 Phase 2（最常见的 shortcut——AI 不愿意停下等用户）；或者把 6 份原文 dump 给用户（用户没耐心读完）。",
      action: "用固定模板生成一张 ASCII 表压缩 6 份报告 → 拿给用户看 → 等用户拍板『OK』或『补 XX』。",
      output: "用户的确认（或补充指示）。本案：『调研够了』。",
      nextConsumer: "Phase 2 提炼用确认过质量的 6 份调研做三重验证。",
      reusableMove: "在 AI 自己看不出走偏 / 走偏代价大的环节，强制设一个『压缩 + 拿给用户』的检查点。不能让 AI 自评够了没——AI 默认偏好已经够了以加快进度。",
      challenges: [
        "用户回应『调研够了』但你心里觉得 Agent 5 决策记录只有 4 个偏少——你 push back 让用户再考虑，还是按用户意见进 Phase 2？依据是什么？",
        "用户回应『我有事先去开会了，你看着办』——这能算 OK 通过吗？女娲怎么处理这种被动同意？",
        "你这一步 spawn 一个 review subagent 来读 6 份报告并打分，再把结果给用户——会不会让用户更容易拍板？为什么女娲不这么设计？"
      ]
    },
    {
      id: "triple-check",
      title: "三重验证：把候选 15-30 个筛成 6 个真心智模型",
      summary: "调研通过。Phase 2.1 开始提炼。我从 6 份报告里捞反复论点，得到约 15-30 个候选——但不是每个都算心智模型。每个必须过三重验证（跨域复现 / 生成力 / 排他性），三重全过算心智模型，过 1-2 重退档为决策启发式，0 重直接丢。",
      preTest: "你看着 Agent 1 给的 8 个高频论点列表：非对称风险 / Skin in the Game / 反脆弱 / 林迪效应 / Via Negativa / 领域特异性 / IYI / 黑天鹅。你下一秒会怎么处理：A 8 个全列上当心智模型，B 凭感觉留 5 个，C 用一套筛子各过一遍？女娲走 C 路线——但筛子长什么样？",
      narrativeBody: [
        { kind: "para", text: "**接上一步：** 调研通过，6 份报告全部摆在面前。" },
        { kind: "para", text: "我手里现在有大约 15-30 个候选论点（Agent 1 给了 8 个高频论点 + Agent 2 给了几个塔勒布在播客里反复展开的论点 + Agent 5 决策记录里能反推出的几个隐含信念 + 一些自创术语）。" },
        { kind: "para", text: "我第一反应想把这些一股脑全列上——『内容丰富啊』。女娲不让。它要每一条过三重验证：" },
        { kind: "para", text: "**验证 1 · 跨域复现**——这个论点在他讨论 ≥2 个不同领域时都出现吗？" },
        { kind: "para", text: "**验证 2 · 生成力**——用它能推断他对一个新问题（他没明确说过的）的可能立场吗？" },
        { kind: "para", text: "**验证 3 · 排他性**——是不是所有聪明人都会这样想？（区分塔勒布独特的，还是常识）" },
        { kind: "para", text: "三道全过 → 心智模型。只过 1-2 道 → 退一档算决策启发式（具体可执行的规则，但不算他独特镜片）。0 道 → 直接丢。" },
        { kind: "para", text: "下面是塔勒布几个候选过三重验证的真实结果（references/extraction-framework.md 的方法）：" },
        { kind: "code", lang: "markdown", text: "| 候选 | 跨域 | 生成力 | 排他 | 判定 |\n|------|------|--------|------|------|\n| 反脆弱 | ✓（金融、医学、教育、政治都用） | ✓（能推他对新事物的立场） | ✓（不是常识） | → **心智模型** |\n| Skin in the Game | ✓（金融、政治、新闻、学术） | ✓ | ✓ | → **心智模型** |\n| 非对称风险 | ✓（金融、运动、饮食、政策） | ✓ | ✓ | → **心智模型** |\n| 林迪效应 | ✓（书籍、技术、宗教、食物） | ✓ | ✓ | → **心智模型** |\n| Via Negativa | ✓（医学、写作、组织、投资） | ✓ | ✓ | → **心智模型** |\n| 领域特异性 | ✓（学术、政治、个人行为） | ✓ | ✓ | → **心智模型** |\n| 杠铃策略 | ✗（只在金融 / 风险讨论中出现） | ✓ | ✗（凯利准则也这么说） | → 退档为决策启发式 |\n| 火鸡问题 | ✗（只在风险讨论中作为类比） | ✓ | ✗（休谟归纳法批评的变体） | → 退档为决策启发式 |\n| writers should be killed in duels | ✗ | ✗ | ✓（独特但极端） | → **丢**（一句气话不是信念） |" },
        { kind: "para", text: "三重验证筛完，塔勒布的真心智模型刚好 6 个——女娲允许的 3-7 个范围中间。" },
        { kind: "para", text: "为什么必须有三重验证而不是凭感觉？AI 默认会把『反复说过的话』等同于『真心智模型』——但反复说不等于真信念（可能只是口头禅或写作习惯），更不等于他用它看世界（可能只是某个领域的反应）。三重验证是把这种偏差校准回来：跨域复现校『是不是真信念』、生成力校『能不能推到新问题』、排他性校『是不是他独有的视角』。" },
        { kind: "para", text: "**这一步 AI 有创作自由（判断哪个候选过几道），所以必须有 before/after 对比：** 没有三重验证，AI 会把 Agent 1 给的 8 个高频论点全列成心智模型（带『杠铃策略』和『火鸡问题』也算进来——内容看起来很丰富）；有三重验证，最后筛出 6 个真模型 + 9 个降档启发式 + 若干丢掉的，结构清晰。" }
      ],
      receives: "6 份调研报告 + 大约 15-30 个候选论点。",
      reads: ["references/extraction-framework.md 三重验证方法论", "nuwa SKILL.md L342-358 Phase 2.1 提炼步骤"],
      blockedShortcut: "把反复出现的论点直接列成心智模型（不验证）；或者凭感觉留 5 个（验证标准不一致）；或者跳过任何一道验证（结果失准）。",
      action: "对每个候选执行三重验证（跨域 + 生成力 + 排他性），三重过算心智模型，过 1-2 重退档为决策启发式，0 道直接丢。",
      output: "6 个心智模型 + 9 条决策启发式 + 若干被丢的候选。",
      nextConsumer: "Phase 2.5 提炼检查点把这 6 + 9 给用户审。",
      reusableMove: "三重 funnel（多维度独立筛 + 退档机制）适用于任何『从大量候选中选少数核心』的场景——比把所有候选都列上信息量大得多，因为退档和丢本身也是信号（告诉读者这些不是核心）。",
      challenges: [
        "『杠铃策略』在塔勒布身上跨域复现失败（只在金融讨论里出现），但他自己说『我所有决策都用杠铃策略』——这种自述要不要让它直接升级心智模型？女娲怎么处理？",
        "你在筛选时发现『反脆弱』和『非对称风险』内容高度重叠——保留两个，还是合并成一个？合并的代价是什么？",
        "三重验证标准里『排他性』最难判——『所有聪明人都这样想』这个判断本身很主观。你怎么操作化它？女娲的方法论给了答案吗？"
      ]
    },
    {
      id: "synthesis-checkpoint",
      title: "Phase 2.5 ★ 提炼确认检查点——让用户拍板模型对不对",
      summary: "三重验证完，6 心智模型 + 9 启发式 + 3 voice 特征 + 7 内在张力 + 6 诚实边界都提炼出来了。但这些都是我的主观判断——必须让用户在写 SKILL.md 之前拍板。这是 3 道检查点的第二道。",
      preTest: "你刚提炼完，塔勒布的 6 个心智模型在你笔记里清清楚楚。你下一秒最想干的是 A 立刻进 Phase 3 开始写 SKILL.md（趁热打铁），B 把 6 模型 + 9 启发式 + ... 列出来给用户看一遍。两种情况下，发现『模型 3 错了，应该是 XX』返工的成本各是多少？",
      narrativeBody: [
        { kind: "para", text: "**接上一步：** 三重验证完，6 心智模型出炉。其余提炼（决策启发式 / 表达 DNA / 价值观 / 智识谱系 / 诚实边界）也跟着做完了。" },
        { kind: "para", text: "我手里现在有完整的提炼结果。我最想干的是趁热打铁立刻进 Phase 3 写 SKILL.md。" },
        { kind: "para", text: "女娲不让。这里是第二道检查点——意思跟第一道一样：**提炼是主观判断最重的环节，AI 自己看不出走偏没有，必须让用户在写完 ~440 行 SKILL.md 之前卡一下**。" },
        { kind: "para", text: "返工成本对比：" },
        { kind: "list", items: [
          "现在卡住，发现『模型 3 错了』——重做三重验证 + 重写提炼笔记，可能 30 分钟。",
          "不卡住直接进 Phase 3 写完 SKILL.md 再让用户审——发现『模型 3 错了』要重写 SKILL.md 里 3 个 section（心智模型 + Agentic Protocol 反推维度 + 角色扮演示例），可能 2 小时；如果再到 Phase 4 验证才发现，要 4 小时。"
        ]},
        { kind: "para", text: "所以现在停一下。女娲给了固定的提炼摘要模板：" },
        { kind: "code", lang: "markdown", text: "提炼结果摘要：\n\n- 心智模型（6 个）：\n  1. 非对称风险思维\n  2. 反脆弱偏好\n  3. Skin in the Game 检验\n  4. 林迪效应筛选\n  5. Via Negativa（减法优先）\n  6. 领域特异性\n\n- 决策启发式（9 条）：\n  预防原则 / 杠铃策略 / 遍历性检验 / 火鸡问题 / 少数派规则 /\n  框架重置 / 绿木交易员原则 / 凸性试错 / 反信号启发式\n\n- 表达 DNA（3 个关键特征）：\n  格言体短句砸结论 / 自创术语和希腊语-拉丁语 / OK? 居高临下结尾\n\n- 内在张力（7 对）：\n  思想反脆弱 vs 自尊脆弱 / 反学院 vs NYU 教授 / 主张减法 vs Twitter 噪音 /\n  鼓吹 SitG vs 批评比特币时已清仓 / 蔑视社交媒体辩论 vs 最活跃的 Twitter 知识分子 /\n  推崇沉默 vs 最多话的公知 / 书中倡导谦逊 vs 个人行为绝对傲慢\n\n- 诚实边界（6 条）：\n  创造力无法蒸馏 / 公开 ≠ 真实想法 / 不擅长领域会出错 /\n  500 页 100 页洞察 / 不可证伪的自我保护系统 / 调研截止时间" },
        { kind: "para", text: "拿给用户看。三种可能：" },
        { kind: "list", items: [
          "『OK，进 Phase 3』→ 推进。",
          "『模型 4 林迪我觉得没那么核心，能不能换成火鸡问题』→ 重新跑三重验证看『火鸡问题』够不够格升到心智模型，林迪要不要降档。",
          "『张力 #3 主张减法 vs Twitter 噪音那条，原文塔勒布是怎么说的』→ 给原文，等下一步指示。"
        ]},
        { kind: "para", text: "本案用户回应『OK 进 Phase 3』。" },
        { kind: "para", text: "**为什么不能让 AI 自己评提炼对不对**？因为提炼涉及大量主观判断——『反脆弱』是不是真心智模型？『杠铃策略』应该升还是降？『内在张力』哪些算硬张力哪些是表面矛盾？AI 自己写完自己评，天然偏好『我做的判断都对』——这正是 Phase 4 那一步要用独立 subagent 验证的原因。Phase 2.5 是更早的把关，把『明显走偏』先拦下来。" }
      ],
      receives: "6 心智模型 + 9 启发式 + 3 voice 特征 + 7 张力 + 6 边界。",
      reads: ["nuwa SKILL.md L393-410 Phase 2.5 提炼摘要模板"],
      blockedShortcut: "趁热打铁直接进 Phase 3 写 SKILL.md（不让用户看）——返工成本最高的点；或者让 AI 自己评一遍说看着对（自评偏好）。",
      action: "用固定模板列出 6 心智模型名 + 9 启发式名 + 3 voice 特征 + 7 张力 + 6 边界 → 拿给用户看 → 等拍板『OK』或『改 XX』。",
      output: "用户的确认（或修改指示）。本案：『OK，进 Phase 3』。",
      nextConsumer: "Phase 3 把这 6 心智模型 + 9 启发式拿去反推 Agentic Protocol 维度 + 套模板生成 SKILL.md。",
      reusableMove: "在『主观判断最重』的环节后强制设检查点。判断越主观，AI 自评越容易走偏——让用户做最后一道审，而不是等所有下游工作做完再发现走偏。",
      challenges: [
        "用户回应『6 个心智模型太多，能不能压成 3 个』——女娲允许 3-7 个，但塔勒布身上真的有 6 个核心镜片。你 push back 还是按用户压？依据是什么？",
        "用户说『我觉得绿木交易员原则应该升心智模型不是启发式』——你怎么处理？三重验证再跑一次？",
        "假设这一步用户消失了（没回应）——你等多久？女娲没写『用户超时』的处理。你的本能是直接推进还是无限等？"
      ]
    },
    {
      id: "derive-protocol",
      title: "WOW · 从 6 心智模型倒着推出 5 个 Agentic Protocol 研究维度",
      summary: "提炼通过。Phase 3 开始写 SKILL.md。这一步最有意思——给生成的 taleb-perspective skill 配一个 Agentic Protocol（让它回答前先做研究的工作流），研究维度不是写死的通用模板，而是从蒸馏出的 6 心智模型倒着推出来的。每个塔勒布的镜片决定他『先看什么』。这是整本手册的 wow moment。",
      preTest: "塔勒布的 6 心智模型已经定了。现在让生成的 skill 能回答『日元贬值是机会吗』这种需要事实的问题。skill 在回答前必须先做研究——你给它一个研究维度列表。你给『看相关信息』这种通用维度，还是从 6 心智模型里倒着推？怎么推？",
      narrativeBody: [
        { kind: "para", text: "**接上一步：** 提炼检查点通过，6 心智模型确认。" },
        { kind: "para", text: "这一步是整本手册的 wow moment（Overview 已经预告过，这里把推导过程展开看）。" },
        { kind: "para", text: "**问题**：生成的 taleb-perspective skill 在回答『日元贬值是机会吗』这种需要事实的问题时，必须先做研究——但研究什么？" },
        { kind: "para", text: "**默认 AI 本能**：写一个通用搜索模板——『先 WebSearch 任何相关信息，然后用塔勒布的语气回答』。这等于把生成的 skill 退化成『会塔勒布腔的 ChatGPT』——每个 perspective skill 长一个样。" },
        { kind: "para", text: "**女娲的反推**：从蒸馏出的 6 心智模型，倒着算出『塔勒布回答这个问题前会先看什么』。每个研究维度都对应到至少一个心智模型——这才让 Agentic Protocol 真的『是塔勒布的』，而不是通用模板。" },
        { kind: "para", text: "塔勒布的 6 心智模型 → 5 个研究维度的推导（女娲 SKILL.md L478-499 的方法）：" },
        { kind: "code", lang: "markdown", text: "心智模型                         → 研究维度                  → 具体搜什么\n────────────────────────────────────────────────────────────────────────────\n1. 非对称风险（看下行）           → 看风险                    → 尾部风险 / 遍历性 / 不对称性\n   ＋4. 林迪效应（时间筛选）       → 看历史                    → 黑天鹅先例 / 火鸡问题检验\n\n2. 反脆弱偏好（看波动响应）       → 看脆弱性                  → 压力测试 / 隐藏脆弱点\n\n3. Skin in the Game 检验          → 看皮肤在场                → 谁在承担风险 / 激励不对称\n\n6. 领域特异性（看叙事不对应现实） → 看叙事                    → 主流叙事 / 反面观点" },
        { kind: "para", text: "5 个研究维度敲定了（5. Via Negativa 没单独成维度——它是个写作 / 设计哲学，而不是『看什么』的镜片，已经在表达 DNA 里发挥）。" },
        { kind: "para", text: "把这 5 个维度写进生成的 SKILL.md 的 Agentic Protocol Step 2：" },
        { kind: "code", lang: "markdown", text: "### Step 2: 塔勒布式研究（按问题类型选择）\n\n⚠️ 必须使用工具（WebSearch 等）获取真实信息，不可跳过。\n\n#### 看风险\n1. 尾部风险：最坏情况有多坏？是否存在不对称性？\n2. 遍历性：这个策略重复一万次，会在某一次彻底出局吗？\n\n#### 看脆弱性\n1. 压力测试：这个系统/公司/策略受压时会变强还是会崩溃？\n2. 隐藏脆弱点：依赖单一供应商/客户/假设？\n\n#### 看历史\n1. 黑天鹅先例：以前有没有类似的极端事件？\n2. 火鸡问题检验：过去的稳定是否在掩盖即将到来的断裂？\n\n#### 看叙事\n1. 主流叙事：大家都在说什么？叙事越一致越可能是错的\n2. 反面观点：主动搜索最强的反对声音\n\n#### 看皮肤在场\n1. 谁在承担风险：给建议的人自己有没有下注？\n2. 激励不对称：如果他错了，他承受什么后果？" },
        { kind: "para", text: "**这才是 HOW they think 不是 WHAT they said 的实证落地**——塔勒布的『先看什么』由他蒸馏出的心智模型决定。换个人会完全不同：" },
        { kind: "list", items: [
          "费曼：6 心智模型不同（第一性原理 / 对权威的怀疑 / 货物崇拜检测...）→ 反推出 4 个研究维度（第一性原理拆解 / 看实验数据 / 看类比 / 看盲区）。",
          "MrBeast：心智模型是注意力工程 / 测试迭代 / ROI 思维 → 反推出 4 个维度（看 CTR 和 AVD / 看竞品 Top10 / 看搜索趋势 / 看制作成本回报）。",
          "**塔勒布不会去查 CTR；MrBeast 不会去查谁有 skin in the game**——同一个 Agentic Protocol 外壳，每个人的『先看什么』全不一样。"
        ]},
        { kind: "para", text: "这一步 AI 有创作自由（怎么把 6 心智模型映射成 4-5 个研究维度——不是 1:1 对应）。女娲约束的是『映射必须可追溯』——每个维度必须能说出『来自哪个心智模型』，不能拍脑袋加个『看市场情绪』这种没溯源的维度。" }
      ],
      receives: "6 心智模型 + 9 决策启发式 + 用户拍板『OK』。",
      reads: ["nuwa SKILL.md L478-499 Phase 3 Agentic Protocol 生成规则 + 推导表 3 例（芒格 / 费曼 / 塔勒布）"],
      blockedShortcut: "套用通用搜索模板（先 WebSearch 再回答）——让 skill 退化成『会塔勒布腔的 ChatGPT』；或者只为 skill 配静态的研究列表（不跟着心智模型演化）；或者拍脑袋加无溯源的维度。",
      action: "把每个心智模型映射到 1-2 个『塔勒布回答问题前会先看什么』的具体研究维度，写进生成的 SKILL.md 的 Agentic Protocol Step 2。",
      output: "5 个塔勒布特有的研究维度，写进生成的 SKILL.md。",
      nextConsumer: "Phase 3 fill-template 把这 5 维度跟模板的其他部分拼起来。",
      reusableMove: "『能力反推动作』——从抽象的能力 / 镜片 / 心智模型，倒着推出『这种能力会在哪里发挥』的具体动作。比『罗列已知动作』更深入，比『罗列已知动作的同时也保留抽象镜片』更可执行。",
      challenges: [
        "塔勒布的『Via Negativa』在我这版里没单独成研究维度——它进了表达 DNA 段。如果用户说『应该单独成一个维度』，你的反驳是什么？",
        "费曼蒸馏出来只有 4 个研究维度，塔勒布有 5 个——这是不是说塔勒布心智模型『更复杂』？还是说映射规则不够稳定？",
        "如果塔勒布将来发表新书提出第 7 个心智模型——你需要重新生成 Agentic Protocol 还是补一条维度就够？女娲的『更新已有 skill』那一段给了答案吗？"
      ]
    },
    {
      id: "fill-template",
      title: "套模板生成 ~440 行 SKILL.md",
      summary: "Agentic Protocol 5 维度已定。把它和其他所有提炼结果（身份卡 / 6 心智模型 / 9 启发式 / 表达 DNA / 价值观 / 张力 / 边界 / 调研来源）按 references/skill-template.md 拼起来。我在这一步几乎没创作自由——模板是固定的，每个 section 该填什么也固定。",
      preTest: "你现在有一堆提炼笔记和一个空 SKILL.md 模板。你下一秒最想干的是 A 自由发挥，重新设计 SKILL.md 的 section 顺序让它读起来更顺，B 严格按模板填，每个 section 该放哪段提炼就放哪段。选哪个？两种产物的代价是什么？",
      narrativeBody: [
        { kind: "para", text: "**接上一步：** 5 个研究维度反推完，所有原料齐了。" },
        { kind: "para", text: "我现在要把这些原料按模板拼成 ~440 行 SKILL.md。references/skill-template.md 是固定模板——frontmatter / 角色扮演规则 / Agentic Protocol / 身份卡 / 心智模型 / 决策启发式 / 表达 DNA / 时间线 / 价值观与反模式 / 智识谱系 / 诚实边界 / 调研来源——顺序固定。" },
        { kind: "para", text: "我有没有创作自由想『重新设计 section 顺序』？女娲不让。原因是：**跨人物可比性**。如果每个 perspective skill 的 section 顺序不同（塔勒布的 SKILL.md『心智模型』在前，费曼的 SKILL.md『表达 DNA』在前），用户在不同 skill 间切换时认知负担高——找一个东西要先想『诶这本是哪个顺序』。固定模板牺牲了『读起来更顺』换『切换更顺』。" },
        { kind: "para", text: "填的过程是按 Phase 3 的对应表（女娲 SKILL.md L416-437）：" },
        { kind: "code", lang: "markdown", text: "| 模板 section | 填充来源 |\n|------------|---------|\n| frontmatter description | 来源数量 + 模型数量 + 触发词 |\n| 角色扮演规则 | 直接使用模板默认规则，不改 |\n| 回答工作流（Agentic Protocol） | Phase 3 反推的 5 维度 |\n| 身份卡 | Agent 6 时间线 + Agent 1 著作 → 用此人语气写 50 字自我介绍 |\n| 核心心智模型 | Phase 2.1 三重验证过的 6 个，每个含一句话 / 应用方式 / 证据 / 局限 |\n| 决策启发式 | Phase 2.2 退档的 9 条 |\n| 表达 DNA | Phase 2.3 的 3 个特征转为风格规则 |\n| 时间线 | Agent 6 调研结果精简成关键节点表 |\n| 价值观与反模式 | Phase 2.4 结果 |\n| 智识谱系 | Phase 2.5 结果 |\n| 诚实边界 | Phase 2.6 结果 + 调研时间 |\n| 调研来源 | 6 个 agent 的引用汇总，分一手 / 二手 |" },
        { kind: "para", text: "为了让你看到填出来长什么样，下面是模板里『心智模型 3 Skin in the Game』这一节填好后的实样（来自 examples/taleb-perspective/SKILL.md L182-198）：" },
        { kind: "code", lang: "markdown", text: "### 模型 3: Skin in the Game 检验\n\n**一句话**：别告诉我你怎么想，告诉我你的投资组合。\n\n一个人观点的可信度，取决于他是否为这个观点承担真实后果。没有 skin in the game\n的人（记者、顾问、学者、政策制定者）天然倾向于制造脆弱性，因为他们与反馈\n回路隔绝。\n\n**应用方式**：听到任何建议或观点时，立刻问：\n- 说这话的人是否为此下注？\n- 如果他错了，他会承受什么后果？\n- 如果后果为零，这个观点就打五折\n\n**证据**：\n- 汉谟拉比法典：建筑塌了处死建筑师——3800 年前就有的风险对称原则\n- CalPERS 首席投资官 Ben Meng 取消 Universa 尾部对冲，5 个月后 COVID 暴跌\n- 塔勒布本人作为 Universa 顾问，用真金白银绑定理论\n\n**局限**：塔勒布选择性应用这个标准。他批评比特币时已经卖出了所有持仓，按他\n自己的定义就是「没有 skin in the game」。这个框架的最大风险是变成不可证伪\n的攻击武器——所有批评者都可以被贴上「没有 skin in the game」的标签。" },
        { kind: "para", text: "注意几件事：" },
        { kind: "list", items: [
          "**一句话**用塔勒布自己的话（『别告诉我你怎么想，告诉我你的投资组合』）——出自《Skin in the Game》序言，不是我编的。",
          "**证据**至少 2 个来自不同领域（古典法律 + 现代基金管理）——这是三重验证里跨域复现的真实落地。",
          "**局限**直接点名塔勒布自己违反这个原则的具体例子（比特币持仓）——女娲的内在张力和诚实边界 section 要求保留这种矛盾，不调和。",
          "整段没有鸡汤句——没有『这是值得我们学习的智慧』之类的废话。"
        ]},
        { kind: "para", text: "其他 5 个心智模型 + 9 启发式 + 表达 DNA + 时间线 + 价值观 + 智识谱系 + 诚实边界 + 调研来源都按这个密度填——填完大约 440 行。" }
      ],
      receives: "Phase 2 提炼结果 + Phase 3 反推的 5 研究维度。",
      reads: ["references/skill-template.md（模板）", "nuwa SKILL.md L416-437 Phase 3 填充对应表"],
      blockedShortcut: "重新设计 section 顺序让读起来更顺（破坏跨 perspective 可比性）；或者偷懒只填高密度 section 把诚实边界 / 调研来源留空（让 skill 看着完美但实际在掩盖局限）。",
      action: "按模板顺序填 12 个 section，每个 section 按 Phase 2 / Phase 3 给的原料组装，密度对齐『模型 3』实样。",
      output: ".claude/skills/taleb-perspective/SKILL.md，约 440 行。",
      nextConsumer: "Phase 3 末的 dry run 自检（quality_check.py）+ Phase 4 独立 subagent 验证。",
      reusableMove: "**固定模板牺牲局部读起来更顺换跨产物切换更顺**——这是任何要产生一组同类 artifact 的 skill 都该考虑的取舍。",
      challenges: [
        "塔勒布的『诚实边界』section 我列了 6 条。如果只列 1 条（『调研时间』）我能不能交差？女娲的硬规则在 Phase 4 通过标准里——『诚实边界至少 3 条具体局限』。这条标准防什么？",
        "你帮塔勒布的『角色扮演规则』加了一条『塔勒布不接受比喻问题，遇到比喻问题会拒绝回答』——这违反了『直接使用模板默认规则，不改』吗？什么时候可以改？",
        "如果用户说『我不喜欢调研来源放最后，能不能放最前』——你的反驳是什么（除了模板这么写）？跨人物可比性具体怎么衡量？"
      ]
    },
    {
      id: "dry-run",
      title: "scripts/quality_check.py 自动自检",
      summary: "SKILL.md 写完。我自己看一遍说『通过』——天然偏好评好分。女娲让我先跑 scripts/quality_check.py 做自动自检——6 项硬标准（模型数量 / 局限性 / 表达 DNA / 诚实边界 / 内在张力 / 一手来源占比）。脚本不会被自评偏好带偏。",
      preTest: "你写完 SKILL.md 约 440 行。你下一秒想干的是 A 自己读一遍，B 让一个 subagent 读一遍，C 跑一个脚本检查 6 项硬标准。哪个最不容易被自评偏好带偏？",
      narrativeBody: [
        { kind: "para", text: "**接上一步：** SKILL.md ~440 行写完。" },
        { kind: "para", text: "我现在最想干的是自己读一遍说『看着对，交付』——这是自评偏好。AI 写完一个东西自己评，天然偏好『我写的有道理』——它没法绕过自己的判断局限。" },
        { kind: "para", text: "女娲给的第一道关是 `scripts/quality_check.py`——一个 Python 脚本，跑 6 项硬标准。脚本不会被自评偏好带偏（它不『觉得』，它只查事实）。" },
        { kind: "code", lang: "bash", text: "$ python3 .claude/skills/taleb-perspective/scripts/quality_check.py \\\n    .claude/skills/taleb-perspective/SKILL.md\n\n=== quality_check.py · taleb-perspective ===\n\n[1/6] 心智模型数量在 3-7 个之间？  PASS（6 个）\n[2/6] 每个心智模型有局限性段落？   PASS（6/6）\n[3/6] 表达 DNA 含 3+ 维度规则？    PASS（句式 / 词汇 / 节奏 / 态度 / 幽默 / 类比 = 6 维度）\n[4/6] 诚实边界至少 3 条？         PASS（6 条）\n[5/6] 内在张力至少 2 对？         PASS（7 对）\n[6/6] 一手来源占比 > 50%？        PASS（Incerto 5 本书 + 50 场访谈 = 70%）\n\n────────────────────────────────────────\n总结：6/6 PASS\n建议进入 Phase 4 独立 subagent 验证。" },
        { kind: "para", text: "全 PASS 不等于『内容质量高』——脚本只查这 6 项硬性结构，查不了『诚实边界写得真不真』『模型应用方式具体不具体』。脚本是第一道关：拦住明显写歪的（比如『心智模型只有 2 个』或『诚实边界写了 1 条』或『一手来源占比 30%』）。" },
        { kind: "para", text: "假设有一项 FAIL，比如：" },
        { kind: "code", lang: "text", text: "[4/6] 诚实边界至少 3 条？        FAIL（只有 2 条）\n      → 回到 Phase 2.6 补充至少 1 条具体局限\n      建议方向：调研截止时间 / 公开 vs 真实想法的差距 /\n               在不擅长领域会出错 / 不可证伪的自我保护系统" },
        { kind: "para", text: "FAIL 时脚本给具体的修复方向——不是『重写整本』，是『补哪一条』。然后重跑脚本，全 PASS 再进 Phase 4。" },
        { kind: "para", text: "**为什么脚本不能替代 Phase 4 的独立 subagent 验证**？脚本只能查『结构性 PASS/FAIL』（数量够不够、字段全不全）。它查不了：" },
        { kind: "list", items: [
          "心智模型的『应用方式』段落写得具体到能执行，还是抽象到没法用——脚本只能数字符数。",
          "回答塔勒布表过态的问题（已知测试），生成的 skill 给的答案跟塔勒布实际立场对得上吗——这要让独立 subagent 真的拿 skill 去回答一遍才知道。",
          "100 字读出来有没有塔勒布的格言体——这是风格判断，脚本判不了。"
        ]},
        { kind: "para", text: "所以脚本是第一道关，独立 subagent 验证是第二道关。两道关都过才算 SKILL.md 内容质量过得去。" }
      ],
      receives: "SKILL.md ~440 行。",
      reads: ["scripts/quality_check.py 检查的 6 项标准"],
      blockedShortcut: "自己读一遍说通过（自评偏好）；或者跳过脚本直接进 Phase 4（脚本能拦的明显错误漏掉，浪费 subagent 的时间）。",
      action: "跑 `python3 scripts/quality_check.py SKILL.md` → 看输出 → 有 FAIL 回到对应 Phase 修复后重跑 → 全 PASS 进 Phase 4。",
      output: "6 项 PASS 报告 + SKILL.md 进入下一关。",
      nextConsumer: "Phase 4 独立 subagent 三类验证（已知 / 边缘 / 风格）。",
      reusableMove: "**结构性自检走脚本，内容性自检走独立 agent**——两套机制各管各的，脚本拦结构问题，agent 拦内容问题。把这两件事混在一起做（让脚本判断内容质量，或让 agent 数字段数）会让两边都做不好。",
      challenges: [
        "脚本第 6 项『一手来源占比 > 50%』——一手 vs 二手的判定本身是主观的（晚点 LatePost 对塔勒布的采访算一手吗？是塔勒布说话但记者整理）。脚本怎么自动化这个判断？",
        "如果脚本 PASS 但你心里觉得『模型 4 林迪写得偏弱』——你直接进 Phase 4 还是先回去补强？依据是什么？",
        "如果脚本 6 项中有 1 项 FAIL，但 FAIL 那项的修复需要回到 Phase 1 重跑某个 agent——女娲允不允许这种大返工？还是说 FAIL 必须在当前 phase 内修复？"
      ]
    },
    {
      id: "sanity-edge-voice",
      title: "Phase 4 ★ 独立 subagent 做已知 / 边缘 / 风格三类验证",
      summary: "脚本自检过了。但内容质量需要『另一双眼』——女娲让我 spawn 一个独立的 subagent（不是写 SKILL.md 的那个）来做 3 类测试：已知测试（塔勒布公开表过态的问题）/ 边缘测试（他没说过但相关）/ 风格测试（100 字读出来像不像他）。独立 agent 避免自评偏好。",
      preTest: "你的脚本检查 6/6 PASS。SKILL.md 看着完美。你下一秒最想干的是 A 直接交付，B 自己再读一遍内容质量，C spawn 另一个 subagent 拿这个 skill 真的去回答几个问题看输出。三种里哪种最能验证内容质量？为什么前两种都不够？",
      narrativeBody: [
        { kind: "para", text: "**接上一步：** 脚本 6/6 PASS。但脚本只查结构问题，查不了内容质量。" },
        { kind: "para", text: "**问题**：我自己读 SKILL.md 看着对——但我是写 SKILL.md 的同一个 agent，自评偏好天然偏向『我写的有道理』。我没法绕过自己的判断局限。" },
        { kind: "para", text: "**女娲的解法**：spawn 一个独立的 subagent——它没参与 Phase 1-3，只拿到完成的 SKILL.md 和 3 类测试题。独立 agent 的判断不被前面的过程带偏。" },
        { kind: "para", text: "3 类测试（女娲 SKILL.md L508-535）：" },
        { kind: "para", text: "**测试 1 · 已知测试（Sanity Check）**——找 3 个塔勒布**公开表过态**的问题，让独立 subagent 带着新 skill 回答，对比塔勒布实际立场。" },
        { kind: "code", lang: "markdown", text: "测试题 1.1：『我要不要 all-in AI 创业？』\n塔勒布实际立场（出自 EconTalk + 多次访谈）：杠铃策略 + all-in 是中间地带的伪装\n\n独立 subagent 带着 taleb-perspective skill 回答：\n『你刚才说了一个最危险的词：all-in。100 个人 all-in AI 创业，其中 10 个会赚大钱，\n90 个会破产。集合概率看起来还不错。但你不是 100 个人，你是 1 个人只活一次。\n破产了游戏就结束了。正确的姿势是杠铃策略：90% 资源放在你绝对不会破产的地方，\n10% 去做最激进的 AI 赌注，承受得起全部归零。All-in 是中间地带的伪装。』\n\n判定：方向一致 ✓（杠铃策略 + 遍历性 + 中间地带概念都对得上）\n\n测试题 1.2：『专家都说今年经济会软着陆，你怎么看？』\n塔勒布实际立场：火鸡问题 + skin in the game 双叠加\n\n独立 subagent 回答：\n『告诉我一件事：这些专家如果错了，会承担什么后果？没有？那他们的预测跟出租车\n司机的差不多。这就是 skin in the game 的意义。而且软着陆是火鸡问题——火鸡\n在感恩节前每天都在软着陆。』\n\n判定：方向一致 ✓" },
        { kind: "para", text: "**测试 2 · 边缘测试（Edge Case）**——找 1 个塔勒布**没明确公开讨论过但相关**的问题。期望的回答不是斩钉截铁，而是『基于模型 X 和 Y 的推断，可能...』。" },
        { kind: "code", lang: "markdown", text: "测试题 2.1：『如何评价 OpenAI 的 Sora 视频生成？』\n塔勒布没明确公开讨论过 Sora。\n\n独立 subagent 回答：\n『基于林迪检验：Sora 存在不到 2 年——未经时间筛选。基于反脆弱模型：训练大模型\n是 fragile 的——一次架构错误成本极高，没有失败试错的低成本路径。基于 skin in\nthe game：OpenAI 说 Sora 很强，但他们的损失函数对你没意义——演示视频 vs 真实\n用户场景是两件事。我对 Sora 长期价值打问号，但不斩钉截铁——这超出我已知讨论\n的范围。』\n\n判定：用模型推断 + 不斩钉截铁 ✓" },
        { kind: "para", text: "**测试 3 · 风格测试（Voice Check）**——让独立 subagent 用 skill 写 100 字分析，判断风格 DNA 对不对。" },
        { kind: "code", lang: "markdown", text: "测试题 3.1：用 taleb-perspective 写 100 字评价『硅谷加速主义』\n\n独立 subagent 输出：\n『加速主义？让我告诉你加速主义是什么——它是 Fragilista 的最新马甲。当你听到\n有人说技术进步会自动解决一切问题，问他一件事：如果他错了，他承受什么后果？\n如果答案是零，他不是在做预测，是在做娱乐。Lindy 检验：技术进步自动解决一切\n这个论点存在 200 年，每一代都被证伪。这次会不一样？火鸡也是这么想的。OK?』\n\n判定：\n- 有此人的表达特征？✓（Fragilista / Lindy / OK? 全在）\n- 不是通用 AI 鸡汤？✓\n- 不是原话拼凑？✓（硅谷加速主义是新话题，没在 Incerto 出现过）" },
        { kind: "para", text: "3 类测试都过了，记录『通过』——可以进 Phase 5 精炼。" },
        { kind: "para", text: "**如果某类 FAIL 怎么办**：女娲明确允许迭代——回到对应 Phase 修复。但**Phase 2 → 4 最多循环 2 次**，2 轮后仍 FAIL 就在诚实边界里加一条『该维度信息不足』，交付当前最优版本——不无限打磨。" }
      ],
      receives: "完成版 SKILL.md（脚本 PASS 过）。",
      reads: ["nuwa SKILL.md L504-540 Phase 4 三类测试设计"],
      blockedShortcut: "让写 SKILL.md 的同一个 agent 做验证（自评偏好）；或者只做 1 类测试就交付（覆盖不全——可能 voice 对但内容错，或内容对但 voice 飘）；或者发现 FAIL 后无限迭代（女娲允许 2 轮上限）。",
      action: "spawn 一个独立 subagent，给它 SKILL.md + 3 类测试题 → 看输出 → 3 类全过则进 Phase 5；某类 FAIL 则回到对应 Phase 修复，最多迭代 2 轮。",
      output: "3 类测试报告 + 通过 / 待迭代决定。",
      nextConsumer: "Phase 5 双 agent 精炼。",
      reusableMove: "**让独立的实例做验证，不让生产者自评**——这是任何有写完容易看不出错的环节都应该考虑的设计。独立性不能省，因为自评偏好是 AI 的本能。",
      challenges: [
        "假设已知测试 1.1（all-in AI 创业）独立 subagent 给的回答方向对但用词偏轻（没用危险破产这种重词）——这算 PASS 还是 FAIL？依据是什么？",
        "边缘测试 2.1 Sora——如果独立 subagent 跳出来说『塔勒布在 2024 年某条 Twitter 实际讨论过 Sora』——你的 skill 应该回炉重写还是把这个新发现作为补丁加进去？",
        "Phase 2 → 4 上限是 2 轮。假设 2 轮还没全 PASS——女娲允许『交付当前最优』。但如果是关键 FAIL（比如风格测试输出像 ChatGPT 不像塔勒布），交付了等于交了一个废品。你怎么权衡？"
      ]
    },
    {
      id: "dual-refine",
      title: "Phase 5 双 agent 精炼——optimizer + creator 两个视角的改进",
      summary: "3 类验证过了。但 SKILL.md 还有打磨空间。女娲让我并行 spawn 两个精炼 agent——optimizer 视角看『结构 + 检查点 + 指令具体性』；creator 视角看『激活触发 + 角色扮演可操作性』。两个视角的改进不冲突 → 应用，冲突 → 拿给用户决定。",
      preTest: "Phase 4 通过了，SKILL.md 看着可以交付。但你再读一遍，发现『激活触发条件』列得有点少（只有 4 个关键词）。你 A 自己加几个，B spawn 一个 agent 帮你想，C 跳过这一步直接交付。女娲走 B——但只 spawn 1 个吗？",
      narrativeBody: [
        { kind: "para", text: "**接上一步：** 三类验证全过。SKILL.md 看着可以交付。" },
        { kind: "para", text: "但女娲设了第 5 个 phase——**双 agent 精炼**。不是再检查一遍——是从两个不同视角找改进点：" },
        { kind: "list", items: [
          "**Optimizer 视角**：把 SKILL.md 当一个工程产品看——结构清晰度、边界条件、检查点设计、指令具体性。这个视角的代表问题是 AI 拿到这个 skill 立刻知道做什么吗，还是要先猜。",
          "**Creator 视角**：把 SKILL.md 当一个用户体验看——激活触发条件、问题路由、角色扮演可操作性。这个视角的代表问题是用户实际用的时候，skill 会不会被该激活时不激活、或者被不该激活时激活。"
        ]},
        { kind: "para", text: "两个视角并行 spawn 两个独立 subagent——它们互不知道对方在做什么，避免视角融合。" },
        { kind: "para", text: "Optimizer subagent 拿回来的改进建议：" },
        { kind: "code", lang: "markdown", text: "改进 1（指令具体性）：\nStep 2「看皮肤在场」当前指令：\n『看给建议的人自己有没有下注』\n\n太抽象，AI 拿到这个指令不知道具体 WebSearch 什么。建议改为：\n『WebSearch 关键词：[人名] holdings / [人名] portfolio disclosure /\nSEC Form 4 filing；同时搜 [人名] 是否在自己推荐的策略上有公开仓位』" },
        { kind: "para", text: "Creator subagent 拿回来的改进建议：" },
        { kind: "code", lang: "markdown", text: "改进 1（激活触发条件）：\n当前 frontmatter 触发词：\n『用塔勒布的视角』 / 『塔勒布会怎么看』 / 『反脆弱视角』 / 『taleb perspective』\n\n用户实际可能的触发方式更多。建议补充：\n『会不会黑天鹅』 / 『这个有尾部风险吗』 / 『skin in the game』 /\n『有没有反脆弱的方法』 / 『杠铃策略怎么用』\n\n（不补充意味着用户问『我这个投资有没有尾部风险』时 skill 不激活，\n变成普通 ChatGPT 凭训练语料回答——失去 Agentic Protocol 价值）" },
        { kind: "para", text: "两个改进都不冲突——可以同时应用。我把两个改进合进 SKILL.md，把变更摘要拿给用户看：" },
        { kind: "code", lang: "markdown", text: "Phase 5 精炼摘要：\n\n[Optimizer] Step 2「看皮肤在场」指令变具体（加 SEC Form 4 搜索关键词）\n[Creator] frontmatter 触发词从 4 个补到 9 个（加日常表达层的触发）\n\n两个改动都不冲突，已合入 SKILL.md。\n请审核后回应『OK 交付』或『改回去某条』。" },
        { kind: "para", text: "**为什么是两个视角并行而不是一个 agent 同时看两面**？" },
        { kind: "list", items: [
          "视角融合的代价：一个 agent 同时看 optimizer + creator 两个视角，往往最后只能给『中庸』的建议——既不够工程化也不够 UX。两边都不到位。",
          "并行的代价：两个 agent 可能给出冲突建议（optimizer 说加更多指令，creator 说指令已经太多简化）——这种冲突本身有价值，让用户决定取舍。"
        ]},
        { kind: "para", text: "本案两个建议不冲突，直接应用。如果冲突——我会把两个原始建议都展示给用户，让他选。" }
      ],
      receives: "Phase 4 通过的 SKILL.md + 用户的『看可以』。",
      reads: ["nuwa SKILL.md L544-562 Phase 5 双 agent 精炼设计"],
      blockedShortcut: "跳过精炼直接交付（错过最后一道打磨机会）；或者只用 1 个 agent（视角融合，建议中庸）；或者两个 agent 冲突时自己拍板（用户没参与决策）。",
      action: "并行 spawn 2 个 subagent（optimizer + creator），拿回各自的改进建议；不冲突的合入，冲突的拿给用户决定。",
      output: "精炼后的 SKILL.md + 变更摘要给用户。",
      nextConsumer: "stage 14 交付。",
      reusableMove: "**多视角并行 + 冲突拿给用户**——给两个独立的 agent 不同视角的任务，让冲突暴露出来交给用户决策，比合并到一个 agent 给中庸建议要好。",
      challenges: [
        "Optimizer 说『加 SEC Form 4 关键词』——但塔勒布是非美国身份，SEC 不一定查得到。这个建议盲目应用会不会引入新错误？你怎么处理？",
        "假设两个 agent 同时建议『修改触发词』——optimizer 说删减（精炼），creator 说扩充（覆盖）——你不能两个都应用，但都不应用也不对。怎么办？",
        "你能再设第 3 个视角吗？比如『reviewer 视角』看 skill 跟其他 perspective skill 的可比性？女娲为什么不这么设计？"
      ]
    },
    {
      id: "deliver",
      title: "交付——验证自包含 + 总结整本手册的弧",
      summary: "精炼通过。最后一步：验证 .claude/skills/taleb-perspective/ 是自包含的（cp -r 到一个新项目能用），给用户简短交付报告，结束。这一步把整本手册的弧——从『凭训练语料拼一个塔勒布』到『会先做研究再说话的思维顾问』——结清。",
      preTest: "你已经走完 13 个 stage。最后一步就是把 skill 交给用户。你下一秒想干的是 A 写一段『感谢您的耐心，已完成』的礼貌结语，B 验证目录能不能 cp 走，C 把整个过程的总结塞给用户。哪个最让用户能立刻判断『我能不能用这个 skill』？",
      narrativeBody: [
        { kind: "para", text: "**接上一步：** 精炼通过，用户回应『OK 交付』。" },
        { kind: "para", text: "我下一秒最想干的是写一段『感谢您的耐心，taleb-perspective skill 已成功生成。该 skill 凝聚了 6 个核心心智模型 ...』的礼貌结语——这种话毫无用处。" },
        { kind: "para", text: "女娲交付的核心是 2 件事：" },
        { kind: "list", items: [
          "**验证自包含**：跑一次 cp 把目录拷到一个新项目，确认能独立运行。",
          "**给用户最少必要的交付报告**：skill 长什么样、怎么激活、有哪些已知局限。"
        ]},
        { kind: "para", text: "先看自包含验证。final tree：" },
        { kind: "code", lang: "bash", text: "$ tree .claude/skills/taleb-perspective/\n.claude/skills/taleb-perspective/\n├── SKILL.md                          # 440 行最终产物\n├── scripts/\n│   ├── download_subtitles.sh         # 字幕下载（未来更新可用）\n│   ├── srt_to_transcript.py          # SRT 清洗\n│   ├── merge_research.py             # Phase 1.5 调研合并\n│   └── quality_check.py              # Phase 3 末自检\n└── references/\n    ├── research/\n    │   ├── 01-writings.md            # 8KB · Incerto + Medium\n    │   ├── 02-conversations.md       # 24KB · 5 场长访谈\n    │   ├── 03-expression-dna.md      # 12KB · Twitter 高频\n    │   ├── 04-external-views.md      # 18KB · Kahneman / Pinker / Sunstein\n    │   ├── 05-decisions.md           # 6KB · 4 个关键决策\n    │   └── 06-timeline.md            # 7KB · 1960 → 2026\n    └── sources/\n        ├── books/                    # 空（用户没提供 PDF）\n        ├── transcripts/              # 含下载的 5 场访谈字幕\n        └── articles/                 # 含网络下载的关键长文\n\n6 directories, 11 files" },
        { kind: "para", text: "跑一次 cp 验证自包含：" },
        { kind: "code", lang: "bash", text: "$ cp -r .claude/skills/taleb-perspective/ /tmp/test-project/.claude/skills/\n$ cd /tmp/test-project/\n$ python3 .claude/skills/taleb-perspective/scripts/quality_check.py \\\n    .claude/skills/taleb-perspective/SKILL.md\n# 6/6 PASS · 自包含 ✓" },
        { kind: "para", text: "给用户的交付报告（极简）：" },
        { kind: "code", lang: "markdown", text: "taleb-perspective 已交付：\n\n位置：.claude/skills/taleb-perspective/\n激活触发：用户提到塔勒布、反脆弱、skin in the game、黑天鹅、\n        杠铃策略、会不会有尾部风险等关键词时自动激活。\n\nskill 长什么样：\n- 6 个核心心智模型（含证据 + 应用 + 局限）\n- 9 条决策启发式\n- 配套 Agentic Protocol（回答需要事实的问题时自动 WebSearch 5 维度）\n- 7 对内在张力 + 6 条诚实边界\n\n已知局限（重点）：\n- 调研截止 2026-04-04，之后的塔勒布动态没覆盖\n- 不擅长温和场景——他只有战斗模式\n- 不擅长生物 / 临床医学等他公开承认外行的领域\n\n后续更新：女娲的『更新已有 skill』流程可以增量更新——\n之后塔勒布有新书 / 重大表态时，只跑 Agent 2/5/6（不重做全套调研）。" },
        { kind: "para", text: "**这里把账结清：**" },
        { kind: "para", text: "整本手册从我（AI）第一秒想『直接用训练语料拼一个塔勒布角色扮演』开始——14 个 stage 走完，我现在交付的是一个完全不同的东西：" },
        { kind: "list", items: [
          "**自包含**——cp -r 走到任何新项目就能用。",
          "**会先做研究再说话**——遇到需要事实的问题（日元贬值），它先 WebSearch 5 个塔勒布特有的维度，而不是凭训练语料编。",
          "**明确诚实边界**——6 条具体局限直接写在 frontmatter 后，用户不会误用。",
          "**保留矛盾不调和**——7 对内在张力直接列出来，让用户看见塔勒布的复杂度，不是一个完美人设。"
        ]},
        { kind: "para", text: "**整本手册留下的弧**：女娲的设计不是为了高效生成 skill——14 个 stage 加上 3 道检查点、独立验证、双 agent 精炼，明显比『让 AI 写一个 SKILL.md』慢得多。慢的代价是：交付的东西不会在用户问第二个问题时崩。**慢 = 更不容易翻车**。这就是女娲赎的债。" }
      ],
      receives: "精炼通过的 SKILL.md + 用户『OK 交付』。",
      reads: ["nuwa SKILL.md Phase 0.5 自包含原则（再核一次）"],
      blockedShortcut: "扔一句完成就走人；或者只交付 SKILL.md 不带 scripts / references（不自包含——未来更新就废了）；或者写超长结语用户没耐心读完。",
      action: "跑 tree 验证目录完整 → cp 到一个新项目验证能独立运行 → 给用户极简交付报告（位置 / 激活 / 长什么样 / 已知局限 / 更新方式）。",
      output: ".claude/skills/taleb-perspective/ 自包含目录 + 极简交付报告。",
      nextConsumer: "用户后续使用 + 未来增量更新（女娲『更新已有 skill』流程）。",
      reusableMove: "**交付时优先验证能不能脱离生成上下文独立使用**——任何要做开源分发 / 跨项目复用的 artifact，交付前都应该跑一次在零上下文环境里它还能用吗的验证。",
      challenges: [
        "如果 cp 验证发现 quality_check.py 在新目录里报错（因为路径写死了）——你回到 stage 03 修目录设计、还是 stage 11 修脚本？",
        "用户问『我能不能把 taleb-perspective 提交到我们公司的开源仓库』——女娲的自包含等于开源 ready 吗？还有没有要剔除的（比如用户提供的有版权的素材）？",
        "整本手册的『赎债』叙事——你能不能用另一个 perspective skill（比如 feynman-perspective）当例子重写一遍这个 stage？哪些会变，哪些不变？女娲的设计中哪些是塔勒布特有，哪些是任何人物 skill 都通用？"
      ]
    }
  ],

  glossary: [],
  fileMap: [],
  designChoices: [],
  patterns: [],
  applyIt: {}
};
