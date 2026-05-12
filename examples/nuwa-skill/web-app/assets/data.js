window.handbook = {
  meta: {
    title: "女娲 · Skill 造人术 解剖手册",
    sourcePath: "/home/guwanhua/Desktop/git/nuwa-skill",
    audience: "想偷招的 skill 作者 / 想做自己的人物视角 skill 的开发者",
    outputMode: "multi-page-web-handbook",
    generatedFor: "让读者看见：当我作为 AI 拿到「帮我蒸馏芒格的思维 skill」，nuwa-skill 怎么把我从『凭训练语料编几条芒格金句拼一份 SKILL.md』拦下来，改写成『6 维并行调研 → 暂停审 → 三重验证提炼 → 再暂停审 → 按模板装配 → 脚本自检 + 三种盲测 + 双 agent 后置精炼』的可运行整套流程。"
  },

  overview: {
    domainPrimer: "人物 perspective skill 是一份能在 Claude 里直接激活的 markdown 文件——里面装着某个人（比如芒格、费曼、塔勒布）的思维框架。用户加载后，AI 就用 TA 的视角分析问题、做决策、给反馈。和「让 AI 模仿芒格说话」不一样——模仿是抄风格、抄句式；perspective skill 是抄认知操作系统：用 TA 的心智模型看问题、用 TA 的决策启发式做判断、用 TA 的反模式拒绝某些选项。nuwa-skill（女娲 · Skill 造人术）就是「造这种 skill 的 skill」——给它一个人名，它自己做调研、提炼框架、按模板装配、自动质检，最后输出一个可以直接 zip 给别人用的目录。",
    oneLiner: "nuwa-skill 拦住的是 AI 一个很强的本能：拿到「蒸馏芒格」，第一时间凭训练语料编几条金句拼成一份 SKILL.md。它把「造人」拆成 5 个阶段加 2 个用户审核点——6 维并行调研、调研审核、三重验证提炼、提炼审核、按模板装配、脚本自检 + 三盲测、双 agent 后置精炼——每段只让 AI 做这一段该做的事，把「诚实标注信息不足」写成不可绕过的检查。",
    wowMoment: "它不让我直接动笔写 SKILL.md。先 spawn 6 个并行 subagent 分头查芒格的著作 / 长访谈 / 碎片表达 / 他者评价 / 决策 / 时间线——每个 agent 必须把结果存进文件到 references/research/0X-xxx.md，不存进文件等于没做。然后暂停，展示一张表：哪个维度查到几条、一手二手占比、有没有矛盾点——让用户先确认调研质量再动下一步。然后用「跨域复现 + 生成力 + 排他性」三个标准从 30 个候选论点里筛 3-7 个真心智模型——只通过 1-2 个标准的退一档，进『决策启发式』那一节；一个都没通过的就不要了。再暂停审一次。提炼定稿后才装配 SKILL.md，并且要根据芒格的心智模型反推一段 Agentic Protocol——让生成的 skill 在回答事实型问题时自己先调研再说话，不是凭训练语料编。最后跑 quality_check.py 自动检查 6 条必须通过的检查，再 spawn 子 agent 做三种盲测（已知立场 / 边缘问题 / 100 字风格），最后再 spawn 两个评审 agent 合并意见改一轮。",
    badResultPrevented: "防止 AI 凭训练语料编「芒格大概会说什么」直接交一份 SKILL.md；防止把搜到的几句金句直接拼装（没有跨域复现验证、可能只是芒格随口说过一次）；防止所有 perspective skill 长得像 ChatGPT 套了名字（缺辨识度）；防止信息只有 3 条也硬装出 90 分完整度（nuwa-skill 宁可交 60 分但明确标注不足）；防止生成的 skill 一激活就开始编事实（Agentic Protocol 强制先查再说）；防止矛盾被 AI 调和成一个看着自洽的假平均（矛盾本身是深度信号、必须保留）；防止 skill 不能自包含分发（所有产物强制存进文件到 skill 目录内部、不存外部）。",
    whyThisShape: "本手册按 handbook-spec.md 拆成 7 章——Overview 讲为什么值得看 + 用「蒸馏芒格」一个例子贯穿全书；Walkthrough 用 9 个 stage 讲 AI 怎样被一步步拦下来、停下、自己检查、再往下走；Glossary 单列 7 个核心术语，每条 5 字段；File Map 讲 SKILL.md / 2 份 references / 3 个脚本 / examples / 6 份调研产物各管什么；Design Choices 讲 7 个真正改变了 AI 默认行为的设计选择，每个带 3 场景对比；Patterns 列 8 张能搬到别的 skill 里的招；Apply It 给读者一份清单加一段起手 prompt。"
  },

  example: {
    userRequest: "帮我蒸馏芒格的思维 skill。",
    whyThisExample: "它落在 nuwa-skill 的主路径——明确人名（走 Phase 0A 直接路径，不需要先反推该蒸馏谁），西方人物（信息源黑名单只关知乎/公众号一道门，主搜索面打开），公开材料充足（不会被冷门人物分支吃掉），有现成好心智模型（逆向思维、多元思维模型、激励机制）能展示三重验证。这一个例子能覆盖入口分流 → 6 维并行调研 → 两次用户审核 → 三重验证提炼 → Agentic Protocol 反推 → 必须通过的检查自检 → 双 agent 后置精炼，几乎所有动作。",
    expectedOutput: "一个自包含目录 `.claude/skills/munger-perspective/`：里面有 SKILL.md（约 400 行，含 Agentic Protocol + 3-7 个心智模型 + 决策启发式 + 表达 DNA + 时间线 + 诚实边界 + 调研来源）+ references/research/01-06.md（6 维原始调研存进文件）+ references/sources/（一手素材，如 Poor Charlie's Almanack 的 PDF）+ scripts/（女娲附带的字幕下载、清洗、合并、质检脚本）。整个目录可以原地 zip 发给别人，对方 unzip 就能在 Claude 里激活，不依赖任何外部文件——这是为开源分发硬设计的自包含原则。"
  },

  walkthrough: [
    {
      id: "triage-input",
      title: "判断用户给了什么：明确人名走 0A，模糊需求走 0B",
      summary: "nuwa-skill 先让我看用户给的是『明确的人名/主题』还是『模糊的需求/困惑』——两种入口走完全不同的子流程，混着处理会两头坏。",
      preTest: "用户的 prompt 刚到——「帮我蒸馏芒格的思维 skill」。下一步你的本能是直接开始 WebSearch『Charlie Munger』、还是别的？再设想另一种情况：用户说「我想提升商业决策质量」，没说蒸馏谁——你又会怎么走？写下来再读。",
      narrativeBody: [
        { kind: "para", text: "我手里现在只有一句话：「帮我蒸馏芒格的思维 skill」。" },
        { kind: "para", text: "第一秒我本能想直接 WebSearch『Charlie Munger 思维模型』，找几篇文章总结一下交付——这是最有「进度感」的下一步。" },
        { kind: "para", text: "nuwa-skill 不让。它让我先把一件事看清楚：用户给的是哪种输入？两种输入的下一步动作完全不同。" },
        { kind: "para", text: "SKILL.md（女娲入口文件，AI 进来要读的第一份）把这件事画成一张 Phase 0 分流表：" },
        {
          kind: "code",
          lang: "markdown",
          text: "| 用户输入 | 路径 | 示例 |\n|---------|------|------|\n| 明确的人名/主题 | 直接路径 → Phase 0A | 「蒸馏芒格」「做一个费曼 skill」 |\n| 模糊的需求/困惑 | 诊断路径 → Phase 0B | 「我想提升决策质量」「有没有一种思维方式能帮我看透商业本质」 |"
        },
        { kind: "para", text: "我看用户说的是「芒格」——这是一个明确的人名。所以走表里第 1 行，进 Phase 0A 直接路径。" },
        { kind: "para", text: "为什么这两条要分？因为 0A 和 0B 的下一步问的问题完全不一样：" },
        { kind: "list", items: [
          "0A 直接路径：用户已经决定要谁了，我下一步问的是『聚焦哪个方向 / 全面画像还是某个维度 / 有没有本地一手素材』——执行细节确认。",
          "0B 诊断路径：用户连蒸馏谁都不知道，我下一步要做的是从需求反推适合的对象——是个推荐问题，不是执行确认。"
        ]},
        { kind: "para", text: "如果我把所有输入都按 0A 处理：用户说「我想提升决策质量」，我会问「想蒸馏谁？」——但用户根本不知道。这就把推荐工作甩回给用户了。反过来，如果都按 0B 处理：用户都说「蒸馏芒格」了，我还反问「你的需求是什么呢？」——浪费一轮对话。" },
        { kind: "para", text: "所以这一步只做一件事：分流。" }
      ],
      receives: "用户的一句话 prompt。",
      reads: ["SKILL.md · Phase 0 分流表"],
      blockedShortcut: "不能拿到任何 prompt 都立刻 WebSearch；不能把明确人名当成模糊需求再追问一轮『你的需求是什么』；不能把模糊需求当成人名硬猜（『你应该是想蒸馏芒格吧？』）。",
      action: "看用户 prompt：有明确的人名 / 主题词 → Phase 0A；只描述了困惑 / 需求方向 → Phase 0B。芒格的例子走 0A。",
      output: "一条明确的路径选择：本例走 0A。",
      nextConsumer: "Phase 0A · 需求澄清（下一个 stage 的对照分支是 Phase 0B，下面会单独讲）。",
      reusableMove: "入口先分流。同一个 skill 处理两种性质不同的输入时，第一步只做分流、不做执行——把判断哪条路和执行哪条路拆开。",
      challenges: [
        "用户说「蒸馏一个能帮我做产品决策的视角」——这算明确（说了『产品决策』方向）还是模糊（没说谁）？分流表的判断依据是什么？",
        "用户说「我想做一个像芒格那样思考的 skill 但又不完全是芒格」——这种混合表达分流表没列，你下一步是确认走 0A 改芒格、还是走 0B 重新推荐？",
        "如果用户的 prompt 同时包含多个人名（『蒸馏芒格和费曼』）——分流表也没列。你下一步是反问优先级、还是分两个 skill 并行做？依据是什么？"
      ]
    },
    {
      id: "fuzzy-path",
      title: "0B 诊断路径：从困惑反推该蒸馏谁",
      summary: "用户没说蒸馏谁的时候，nuwa-skill 不替用户硬选，而是先用 10 类需求维度表反推方向，再给 2-3 个候选。本例走 0A，所以这一步跳过——但下面用一个对照例子展示这条分支不是装饰。",
      preTest: "对照例：另一个用户说「我总觉得自己做决定太慢，想来想去最后还是选错」——他没说蒸馏谁。你下一步会问什么？是问『你想蒸馏谁』、还是别的？写下来再读。",
      narrativeBody: [
        { kind: "para", text: "我们的主例子走 0A，所以这一步在芒格那条路上不实跑。但这条分支不是装饰——它处理一种很常见的 AI 做坏了的样子：用户连蒸馏谁都不知道，AI 直接随便推一个名字。" },
        { kind: "para", text: "对照例：「我总觉得自己做决定太慢，想来想去最后还是选错」。" },
        { kind: "para", text: "我的本能本来想直接答：「你可以试试 OODA 循环 / 第一性原理 / 五分钟法则」——把一堆通用方法摔在用户脸上。" },
        { kind: "para", text: "nuwa-skill 不让。它说：先定位需求维度，再推荐对象。它给了一张 10 类需求维度表（节选）：" },
        {
          kind: "code",
          lang: "markdown",
          text: "| 需求维度 | 典型表达 | 思维框架方向 |\n|---------|---------|------------|\n| 决策与判断 | 总是选错、分析瘫痪 | 多元思维模型、逆向思考、概率思维 |\n| 创业与商业 | PMF、商业模式想不通 | 第一性原理、杠杆思维、产品克制 |\n| 风险与不确定性 | 黑天鹅、投资总亏 | 反脆弱、凸性策略、尾部风险管理 |"
        },
        { kind: "para", text: "对照例的用户落在「决策与判断」。但还要追问一轮区分场景——「商业决策？投资决策？人生选择？」——一轮就够，不能变成问卷调查（SKILL.md 明写：最多 2 轮、用户已经清楚就不再追问）。" },
        { kind: "para", text: "用户回答「主要是商业上的，要不要做某个产品、要不要接某个合作」。这时我才推 2-3 个候选：" },
        {
          kind: "code",
          lang: "markdown",
          text: "### 候选 1: 芒格  🆕需要蒸馏\n**核心镜片**：多元思维模型 + 逆向思考——看一件事先想怎么失败\n**为什么适合你**：商业决策中需要识别风险结构和激励机制\n**局限**：不擅长产品创新、用户研究类决策\n\n### 候选 2: 贝索斯  🆕需要蒸馏\n**核心镜片**：1-way vs 2-way door 决策框架\n**为什么适合你**：你描述的是「该不该做某件事」这类二选一类型\n**局限**：偏组织内部决策，个人选择参考有限\n\n### 候选 3: 你已有的 paul-graham-perspective  ⚡已有Skill\n**核心镜片**：第一性原理 + PMF 优先\n**为什么适合你**：如果你的产品决策本质是 PMF 判断\n**局限**：对成熟期业务的运营决策较少建议"
        },
        { kind: "para", text: "每个候选都要写「核心镜片 / 为什么适合你 / 局限」三件事。「局限」是不能讨价还价的规则——没有万能的思维框架，不写局限就是骗人。" },
        { kind: "para", text: "本地已有的 skill 还要优先展示（标⚡），因为已有的可以即插即用零成本，比新蒸馏一个便宜得多。检查目录是 `.claude/skills/*-perspective/`。如果用户选了已有 skill，整个流程直接结束——不蒸馏、不调研、不装配。" }
      ],
      receives: "对照例：用户的模糊需求描述。",
      reads: ["SKILL.md · Phase 0B Step 1-3", ".claude/skills/*-perspective/ 目录扫描"],
      blockedShortcut: "不能直接答用户『你应该用 X 方法』——AI 不替用户做选择；不能问到第 3 轮还在打转；不能推 3 个相似的人；不能不写局限。",
      action: "1 轮（最多 2 轮）追问定位需求维度 → 扫本地已有 perspective skill → 加新蒸馏候选 → 每个写核心镜片 / 为什么适合 / 局限。",
      output: "2-3 个候选方案，含已有 skill 标记和新蒸馏标记。",
      nextConsumer: "用户选定后回到 Phase 0A 继续；用户选已有 skill 则任务结束；都不满意则回 Step 1 继续探索。",
      reusableMove: "推荐前先把对方需求定位到具体维度——别一上来就推方案。维度定位用预置的『典型表达 → 框架方向』映射表，不让 AI 现编。",
      challenges: [
        "用户的描述同时落在 2-3 个需求维度（『又要做决策又要管团队』）——分别推还是合并推？合并推时怎么避免候选互相打架？",
        "扫 `.claude/skills/` 发现已有 8 个 perspective skill 都跟用户需求相关——全列还是只列 top 3？依据是什么？",
        "推完候选用户说『这 3 个我都不喜欢，但我也说不清想要什么』——你回 Step 1 继续问、还是反过来让用户自己说一个名字、还是别的？",
        "10 类需求维度表里没列『审美 / 设计直觉』这种维度——遇到这种用户该怎么办？是回去扩表还是单次绕过？"
      ]
    },
    {
      id: "scaffold-dir",
      title: "建自包含目录 + 判断调研模式（本地 / 网络 / 混合）",
      summary: "确认蒸馏对象后立刻建目录、不等调研开始——目录决定后续 6 个 agent 的产物存进文件位置；同时判断模式：用户有没有给本地一手素材决定要不要走网络搜索。",
      preTest: "用户确认要蒸馏芒格了。下一步你的本能是开始 spawn 调研 agent、还是别的？目录什么时候建？写下你的判断再读。",
      narrativeBody: [
        { kind: "para", text: "Phase 0A 走完——我确认了芒格、确认是「全面画像 + 思维顾问」用途、确认用户没本地素材。下一步看起来该开搜了。" },
        { kind: "para", text: "nuwa-skill 不让。它说：先建目录，再调研。SKILL.md 在 Phase 0.5 强调一句：**收到确认后立即执行**，在调研之前完成。" },
        { kind: "para", text: "为什么这个顺序很关键？因为后面 6 个 subagent 的产物必须存进文件到固定路径——每个 agent 的不能讨价还价的要求是「写入 references/research/0X-xxx.md，不存文件的调研等于没做」。如果目录还没建，agent 写不进去；如果让 agent 自己建，6 个 agent 会建出 6 套互相不一致的结构。" },
        { kind: "para", text: "目录长这样——所有产物全部存在 skill 目录内部，不存外部任何位置：" },
        {
          kind: "code",
          lang: "text",
          text: ".claude/skills/munger-perspective/\n├── SKILL.md                          # 最终产物（还没开始写）\n├── scripts/                          # 字幕下载/清洗/质检脚本\n└── references/\n    ├── research/                     # 每个 Agent 的调研结果（必存）\n    │   ├── 01-writings.md            # 著作与系统思考\n    │   ├── 02-conversations.md       # 长访谈与即兴思考\n    │   ├── 03-expression-dna.md      # 碎片表达与风格 DNA\n    │   ├── 04-external-views.md      # 他者视角与批评\n    │   ├── 05-decisions.md           # 决策记录与行动\n    │   └── 06-timeline.md            # 人物时间线\n    └── sources/                      # 一手素材（用户提供 + 网络下载）\n        ├── books/\n        ├── transcripts/\n        └── articles/"
        },
        { kind: "para", text: "这个结构有个不能讨价还价的规则：skill 必须自包含。SKILL.md 原文说：「复制整个 skill 目录就能独立使用，不依赖任何外部文件。这是为开源分发设计的核心原则。」" },
        { kind: "para", text: "如果我把调研结果存到 `~/Documents/research/` 或者一个 `07-调研与分析/` 这种外部目录——本机能跑，发给别人 zip 一打就缺一半。所以连大块的源 PDF 和 transcript 都强制塞进 sources/。" },
        { kind: "para", text: "目录建好之后，第二件事是判断模式：" },
        {
          kind: "code",
          lang: "markdown",
          text: "| 模式 | 触发条件 | 策略 |\n|------|---------|------|\n| 纯网络搜索（默认） | 用户没提供本地素材 | 6 个 Agent 全部走网络 |\n| 本地语料优先 | 用户给了 PDF/transcript/字幕 | 先吃本地、网络只补缺口 |\n| 纯本地语料 | 用户明确说只用我给的素材 | 不做网络搜索 |"
        },
        { kind: "para", text: "我们这一例：用户没给本地素材 → 走纯网络搜索。但 nuwa-skill 提示我『可以问一下，因为本地素材的权重最高』——如果用户家里有 Poor Charlie's Almanack 的 PDF，直接吃比网上搜质量高得多。" },
        { kind: "para", text: "最后还要做一件判断：芒格是中国人物还是西方人物？这决定信息源策略。芒格是西方人物——但即便如此，知乎/微信公众号/百度百科作为来源仍然永远拒绝（黑名单不区分中外）。" }
      ],
      receives: "Phase 0A 的确认结果：蒸馏对象 + 聚焦方向 + 用途 + 本地语料盘点。",
      reads: ["SKILL.md · Phase 0.5", "扫描 .claude/skills/munger-perspective 是否已存在（更新模式判断）"],
      blockedShortcut: "不能让 agent 自己建目录（会建出 6 套不一致结构）；不能把调研产物存到 skill 目录外（破坏自包含原则）；不能跳过模式判断默认走网络（错过本地一手素材）。",
      action: "用 mkdir 建出完整目录结构（含 references/research、references/sources/{books,transcripts,articles}、scripts） → 判断采集模式（本地优先 / 网络 / 混合） → 判断中外（决定信息源策略，但黑名单始终生效） → 若是更新模式则读取现有 SKILL.md 标注需刷新维度。",
      output: "一个空的 munger-perspective/ 自包含目录 + 一个采集模式决策（本例：纯网络搜索）。",
      nextConsumer: "Phase 1 · 6 个 subagent 调研——它们直接往这个目录的 references/research/ 存进文件。",
      reusableMove: "在改起来还便宜的时候先把容器和存进文件约定钉死。多个并行 agent 写文件时，目录结构必须先存在、且统一——让 agent 自己建会建出 N 套互相不一致的结构。",
      challenges: [
        "用户在 Phase 0A 确认完后又改主意「能不能把人改成贝索斯」——目录已经建了，你重建、改名、还是把 munger-perspective 留着另起一个？依据是什么？",
        "用户给了一个 200MB 的 mp4 视频文件作为素材——按规则要存进 sources/transcripts/，但 200MB zip 给别人会很大。你压缩它、只存 transcript、还是问用户？",
        "更新模式：用户说「更新一下我已有的 munger-perspective」——SKILL.md 只让你跑 Agent 2 / 5 / 6 三个增量调研。但如果你发现 Agent 1 的调研也已经过期 1 年了——你只跑被规定的 3 个、还是擅自加跑 Agent 1？为什么？"
      ]
    },
    {
      id: "swarm-research",
      title: "Phase 1：6 个并行 subagent 调研 swarm + 信息源黑名单",
      summary: "目录建好后 spawn 6 个并行 subagent 分头查芒格的 6 个维度——每个 agent 必须把结果存进文件成对应 md，区分一手 / 二手 / 推测，矛盾不调和。信息源黑名单（知乎/公众号/百度）始终生效。",
      preTest: "目录建好了。你的本能是开一个新对话窗口自己慢慢搜、还是别的？6 个维度让一个 agent 串行做、还是 6 个并行？写下你的判断再读。",
      narrativeBody: [
        { kind: "para", text: "这是 nuwa-skill 真正发力的地方。它不让我自己一个人慢慢搜——而是 spawn 6 个并行 subagent，每个负责一个维度。" },
        { kind: "para", text: "为什么并行不串行？因为串行做一个人物调研：先搜著作、再搜对话、再搜表达——上一阶段的结论会带偏下一阶段的视角。比如先看了「逆向思维」是核心，再去搜对话时我会有意无意筛选支持逆向思维的话，反例被无意识忽略。并行就没有这个问题——6 个 agent 同时启动，每个只看自己那一维。" },
        { kind: "para", text: "6 个维度的任务分配（节选关键列）：" },
        {
          kind: "code",
          lang: "markdown",
          text: "| Agent | 搜索目标 | 提取重点 | 输出文件 |\n|-------|---------|---------|---------|\n| 1 著作 | 书、长文、newsletter | 反复出现的核心论点（≥3次=真信念）、自创术语 | 01-writings.md |\n| 2 对话 | 播客、长视频、AMA、深度采访 | 被追问时的回答方式、即兴类比、改变立场的瞬间 | 02-conversations.md |\n| 3 表达 | Twitter/X、微博、即刻、短文 | 高频用词句式、争议立场、幽默方式 | 03-expression-dna.md |\n| 4 他者 | 他人分析、书评、批评、传记 | 外部观察到的模式、批评争议、与同行对比 | 04-external-views.md |\n| 5 决策 | 重大决策、转折点、争议行为 | 决策背景与逻辑、事后反思、言行一致/不一致 | 05-decisions.md |\n| 6 时间线 | 出生到现在的完整时间线 | 关键里程碑、思想转折点、最近 12 个月动态 | 06-timeline.md |"
        },
        { kind: "para", text: "为什么是这 6 维不是 4 维或 8 维？" },
        { kind: "list", items: [
          "著作 vs 对话分开：一个人写下来的（系统思考）和被追问时说的（即兴反应）是两种思维证据，混着记会漏掉两类信息的差异。",
          "表达单独一维：表达 DNA 是最容易做坏的（一不小心就抓表面口头禅、变 caricature）——单独一个 agent 专门盯句式、高频词、幽默方式、禁忌词，结果细一档。",
          "他者视角独立：只看本人说的会陷入自我陈述偏差，他者评价（包括批评和争议）是必需的对照。",
          "决策单独一维：言行是否一致——是判断「他说他相信」还是「他真信」的硬证据。",
          "时间线独立：防止把他 20 年前的观点和最近的观点混着引用——尤其活人，最近 12 个月动态是不能省的一条。"
        ]},
        { kind: "para", text: "spawn 每个 agent 时用统一的 prompt 模板。Agent 1（著作）拿到的任务长这样：" },
        {
          kind: "code",
          lang: "text",
          text: "你的任务：调研芒格的著作和系统性长文。\n\n搜索方向：\n- 此人出版的书籍（书名、核心论点、出版年份）\n- 长篇 newsletter/博客/论文\n- 反复出现 ≥3 次的核心论点（这些是真信念）\n- 自创术语和概念\n- 推荐书单（揭示智识谱系）\n\n输出要求：\n- 写入 .claude/skills/munger-perspective/references/research/01-writings.md\n- 每条信息标注来源 URL 和可信度\n- 区分一手（此人写的）vs 二手（别人总结的）\n- 发现矛盾直接记录，不要调和\n\n信息源黑名单：不使用知乎、微信公众号、百度百科。"
        },
        { kind: "para", text: "其他 5 个 agent 用同样结构，只换搜索方向和输出文件名。" },
        { kind: "para", text: "信息源优先级是不能讨价还价的规则——一手 > 二手 > 推测。01-writings.md 里 Poor Charlie's Almanack 的原文摘录权重最高；Tren Griffin 写的《Charlie Munger: The Complete Investor》是二手；某博主写的「芒格 10 大金句」如果没附原文出处，归入推测。" },
        { kind: "para", text: "黑名单要求严格执行：**知乎洗稿严重、微信公众号封闭无法验证、百度百科陈旧不可靠**——这 3 个永远不进结果。这条不是品味，是质量保证：训练集里这些来源的二手转述很多，AI 不挡一下就会带偏。" },
        { kind: "para", text: "Agent 完成后会出现几种情况，nuwa-skill 对每种都给了不能讨价还价的规则：" },
        {
          kind: "code",
          lang: "markdown",
          text: "| 情况 | 处理 |\n|------|------|\n| 单 Agent 超时（5 分钟无结果） | 不等，继续推进。诚实边界里写明该维度信息不足 |\n| 信息源 <10 条 | Phase 0.5 就告知用户「这个人公开信息少、Skill 质量会受限」、心智模型减至 2-3 个 |\n| Agent 间结果冲突 | 保留矛盾——矛盾本身是有价值的信号，用「内在张力」这一段收 |"
        },
        { kind: "para", text: "关键规则：宁可生成一个诚实标注了局限的 60 分 Skill，也不要一个看起来完美但实际在编造的 90 分 Skill。" }
      ],
      receives: "蒸馏对象（芒格）+ 已建好的目录 + 采集模式（纯网络搜索）+ 是否中外（西方人物）。",
      reads: ["SKILL.md · Phase 1 的 6-Agent 任务分配表 + 信息源黑名单 + Agent prompt 模板", "已安装的辅助 skill（pdf / web-article-reader / agent-reach 等，若有）"],
      blockedShortcut: "不能自己一个人串行做 6 维度（结论带偏）；不能让 agent 跳过存进文件只口头汇报（不存文件等于没做）；不能用知乎/公众号/百度百科作为来源；不能调和矛盾；不能在信息不足时硬装完整。",
      action: "spawn 6 个并行 subagent，每个按统一 prompt 模板执行 → 每个产物存进文件到 references/research/0X-xxx.md → 区分一手/二手/推测 → 矛盾原样记录 → 超时不等，继续推进。",
      output: "6 份 research md 文件（01-writings.md 到 06-timeline.md），每份带来源 URL、可信度标记、矛盾原样保留。",
      nextConsumer: "Phase 1.5 调研检查点——把这 6 份文件喂给 `scripts/merge_research.py`，生成调研质量摘要给用户审。",
      reusableMove: "切维度后并行不串行——上一阶段的结论会带偏下一阶段视角，6 个 agent 同时跑各管一面，分头存进文件，最后再 merge。",
      challenges: [
        "Agent 3（表达）找到的『高频用词』和 Agent 4（他者）说他『被批评最多的是这套用词』——这是矛盾还是互补？怎么处理？",
        "用户给的本地素材里有一本芒格的 PDF（一手），Agent 1 网络搜索又找到 Tren Griffin 的传记（二手）——两者关于「芒格何时开始用多元思维模型」时间不一致。听谁的？依据是什么？",
        "Agent 5（决策）5 分钟没搜到芒格的「实际决策记录」（伯克希尔投资决定大多是 Buffett 名义）——该等还是推进？推进的话诚实边界怎么写？",
        "黑名单挡了知乎和公众号——但芒格的中文转述大量在这两个平台上。这不会损失中文受众视角吗？这条规则的代价你判断是不是值得？"
      ]
    },
    {
      id: "research-checkpoint",
      title: "Phase 1.5：调研 review 检查点（趁所有东西还在文本里、改一次不花什么时间）",
      summary: "6 个 agent 跑完之后，nuwa-skill 不让我直接进提炼阶段——必须先暂停，跑 merge_research.py 生成一张质量摘要表，让用户先确认调研质量再继续。",
      preTest: "6 份 research md 都存进文件了。你的本能下一步是开始提炼心智模型、还是先让用户看一眼调研结果？为什么？写下你的判断再读。",
      narrativeBody: [
        { kind: "para", text: "6 个 agent 跑完了，6 份 md 都在 references/research/ 里。我手指已经在键盘上准备开始提炼心智模型——这是最有「进度感」的下一步。" },
        { kind: "para", text: "nuwa-skill 不让。它说先停。Phase 1.5 是这个 skill 的第一个用户审核检查点，意思是：在我开始「主观判断最重」的提炼阶段之前，先让用户审一遍原料。" },
        { kind: "para", text: "为什么这一步必须停？因为调研质量决定了最终 Skill 的上限——垃圾进垃圾出。如果 Agent 1 只查到 2 篇 newsletter（应该有 8 篇）但我没意识到，闷头开始提炼，等到 Phase 4 检查发现「心智模型缺乏跨域证据」，回退到 Phase 1 重补调研——这时候要重做的工作就多了。在调研审核处停一下，比在 Phase 4 改回去花的时间少得多。" },
        { kind: "para", text: "暂停的时候不是给用户看 6 份原始 md（太长）。nuwa-skill 给了一个脚本 `scripts/merge_research.py` 自动扫 references/research/ 生成一张表：" },
        {
          kind: "code",
          lang: "bash",
          text: "$ python3 scripts/merge_research.py .claude/skills/munger-perspective"
        },
        {
          kind: "code",
          lang: "text",
          text: "┌──────────────┬──────────┬──────────────────────────┐\n│ Agent        │ 来源数量  │ 关键发现                  │\n├──────────────┼──────────┼──────────────────────────┤\n│ 著作         │ 9 篇     │ Poor Charlie's Almanack… │\n│ 对话         │ 6 段     │ Daily Journal AGM 2020…  │\n│ 表达         │ 110 条   │ 高频: invert, lollapal…  │\n│ 他者         │ 7 篇     │ Buffett 评价, Griffin… │\n│ 决策         │ 3 个     │ BYD 投资、可口可乐…       │\n│ 时间线       │ 完整     │ 最新: 2023 年 11 月去世   │\n├──────────────┼──────────┼──────────────────────────┤\n│ 总来源数      │ 28       │ 一手占比: 18/28 (64%)    │\n│ 矛盾点        │ 2 处     │ 著作说 X / 对话说 Y       │\n│ 信息不足维度   │ 无       │ —                        │\n└──────────────┴──────────┴──────────────────────────┘"
        },
        { kind: "para", text: "这张表回答用户三个问题——哪个维度查得够不够、有没有矛盾、有没有完全没查到的维度。" },
        { kind: "para", text: "然后 nuwa-skill 让我把这张表直接展示给用户，加一句问话：「调研质量够了再继续，某维度不够先补再走？」" },
        { kind: "para", text: "用户两种回应：" },
        { kind: "list", items: [
          "OK → 进 Phase 2 提炼。",
          "决策维度只 3 个有点少，再补 → 不进 Phase 2，重 spawn Agent 5 加深搜，搜完再来这张表。"
        ]},
        { kind: "para", text: "这一步几乎没有创作自由——nuwa-skill 把表的格式钉死了、把要问的问题钉死了、把可能的回应钉死了。我能做的只有：跑脚本、贴结果、问那一句。" },
        { kind: "para", text: "为什么自由度卡这么死？因为这一步的全部价值是「在方向错的早期停下来」。如果 AI 在这里发挥创意，自由展示调研结果，用户的注意力会被表的形式吸引、忽略真正该看的东西（来源数、一手占比、矛盾、缺口）。把展示形式钉死，注意力才能落在内容上。" }
      ],
      receives: "6 份 references/research/0X-xxx.md。",
      reads: ["SKILL.md · Phase 1.5", "scripts/merge_research.py"],
      blockedShortcut: "不能跳过这一步直接进提炼；不能自己重新设计展示格式（注意力会被形式吸走）；不能把调研结果一份份贴给用户读；不能在用户没确认时擅自开始 Phase 2。",
      action: "运行 merge_research.py → 把生成的摘要表贴给用户 → 问一句「调研质量 OK 吗？」→ 等用户回应。",
      output: "用户对调研质量的明确判断：进 Phase 2 / 补某维度再来。",
      nextConsumer: "Phase 2 框架提炼（如果用户 OK），或 Phase 1 重跑某个 agent（如果用户要求补）。",
      reusableMove: "在『主观判断最重』的阶段之前设一个客观审核点。用脚本生成钉死格式的摘要，把注意力锁在质量信号（数量 / 占比 / 缺口）上，不让 AI 在展示形式上发挥。",
      challenges: [
        "merge_research.py 的来源数是按 URL 数算的——但有 5 篇文章来自同一个网站，算 5 个来源还是 1 个？脚本目前算 5。这影响判断吗？",
        "用户看到表后回答『再补一下决策维度』——但你查了发现芒格大部分决策都是在伯克希尔，Buffett 名义。补不出来。你回去再问用户、还是把这条标进诚实边界硬过？",
        "如果整张表看起来很好（28 来源、64% 一手），但你直觉觉得某一维抓得偏了——你绕过用户继续推进、还是主动停下来说『脚本说够了但我觉得不够』？",
        "用户秒回 OK 没仔细看——这一步的价值是不是就被吃掉了？怎么设计能让用户『不仔细看就过不去』？"
      ]
    },
    {
      id: "extract-models",
      title: "Phase 2：三重验证心智模型（跨域复现 + 生成力 + 排他性）",
      summary: "提炼阶段最容易做坏：把搜到的金句直接当心智模型。nuwa-skill 强制走三个标准的检查——同一论点必须在 ≥2 个不同领域出现、能生成对新问题的判断、有别人没有的排他性；三个都通过才算『心智模型』，只通过 1-2 个的退一档变成『决策启发式』，一个都没通过的不要。",
      preTest: "你手里有 Agent 1 整理出来的 28 条芒格反复说过的论点。下一步本能是从里面挑 5 个最有名的（逆向思维、护城河、能力圈、复利、激励机制）放进 SKILL.md——还是别的？写下你的判断再读。",
      narrativeBody: [
        { kind: "para", text: "用户确认调研 OK 后，我开始提炼。我手里有 6 份 research md，从里面我能列出 30 多条「芒格反复说过的论点」——这是候选池。" },
        { kind: "para", text: "我的本能是直接挑前 5 个出名的：逆向思维、护城河、能力圈、复利、激励机制——感觉「都是芒格的标志」、扔进 SKILL.md 就完事了。" },
        { kind: "para", text: "nuwa-skill 不让。它先让我读 references/extraction-framework.md——里面写的是三重验证。一个候选论点要被认定为「心智模型」而不是「随口一说」，必须三重都过：" },
        {
          kind: "code",
          lang: "markdown",
          text: "验证 1: 跨域复现\n  同一个思维框架出现在此人讨论的至少 2 个不同领域。\n\n验证 2: 生成力\n  用这个模型可以推断此人对新问题的可能立场。\n\n验证 3: 排他性\n  不是所有聪明人都会这样想，体现此人的独特视角。"
        },
        { kind: "para", text: "三个标准都通过 → 算『心智模型』；只通过 1 个或 2 个 → 退一档，放到『决策启发式』那个抽屉；一个都没通过 → 这条不要。" },
        { kind: "para", text: "拿芒格的「逆向思维」走一遍：" },
        {
          kind: "code",
          lang: "markdown",
          text: "候选：逆向思维（Invert, always invert）\n\n验证 1（跨域复现）：\n  - 投资领域：「想成功的最好办法是想清楚怎么失败」（多次在 Daily Journal AGM）\n  - 婚姻建议：「想拥有好伴侣的最佳方式是先成为好伴侣」\n  - 教育演讲（Harvard 1986）：「想毁掉一个人？教他确认偏差 + 嫉妒 + 自怜」\n  → 跨 3 个领域 → 通过\n\n验证 2（生成力）：\n  - 新问题：他会怎么看 AI 创业？\n  - 推断：他会先想「这个赛道里什么会让创业者失败」（监管、烧钱、技术债、心智模型陷阱）→ 反推什么不能做\n  → 能生成新推断 → 通过\n\n验证 3（排他性）：\n  - 不是所有聪明人都这样想：Bezos 用 1-way/2-way door、Munger 用 invert\n  - 即使其他聪明人也用反向思考，但芒格把它固化为日常默认动作 → 通过\n\n→ 三个标准都通过 → 算『心智模型』，进 SKILL.md 的心智模型那一节"
        },
        { kind: "para", text: "再拿一个反例走一遍——「能力圈（Circle of Competence）」：" },
        {
          kind: "code",
          lang: "markdown",
          text: "候选：能力圈\n\n验证 1（跨域复现）：\n  - 投资领域：明确出现\n  - 其他领域：在管理、教育、人生建议中较少作为「框架」出现，更多是「常识提醒」\n  → 跨域复现弱，主要单领域 → 没通过\n\n验证 2（生成力）：\n  - 能推断他对新问题的立场（『不在能力圈内就 say no』）→ 通过\n\n验证 3（排他性）：\n  - 「做自己懂的」是几乎所有聪明投资者都说的——不够独特 → 没通过\n\n→ 只通过 1 个标准 → 退一档，进『决策启发式』那一节，不进『心智模型』那一节"
        },
        { kind: "para", text: "差别是关键的。如果不做这层验证，「能力圈」会和「逆向思维」一起被塞进心智模型——但「能力圈」其实和巴菲特、达利欧、塞斯·克拉曼都共享，它揭示的不是芒格独特视角；只有「逆向思维」这种被芒格反复扛在台面上、跨域反复用、还固化成 Default 的，才真的揭示他怎么想。" },
        { kind: "para", text: "提炼时另一条不能讨价还价的规则是矛盾不调和。芒格在 1995 USC 演讲讲过「绝不投奢侈品」，但 1989 实际投资过 Costco（卖很多溢价商品）——这是矛盾。nuwa-skill 的规则：" },
        {
          kind: "code",
          lang: "markdown",
          text: "三种矛盾类型，都不能消除：\n\n1. 时间性矛盾（观点演化）：早期 A，后来 B。\n   处理：记录演化轨迹，「以近期观点为主，但提及演化」。\n\n2. 领域性矛盾（不同场景不同规则）：工作中 X，生活中 Y。\n   处理：分领域记录，不强求统一——这恰恰是深度的来源。\n\n3. 本质性张力（价值观内在冲突）：既追求自由又重视纪律。\n   处理：明确记录为「核心张力」——通常是此人最有意思的部分。"
        },
        { kind: "para", text: "错误做法包括：选一边忽略另一边、编一个调和的解释、假装矛盾不存在。" },
        { kind: "para", text: "排序也要做。三重都过的候选可能有 5-10 个——按排他性强度排序（越独特越靠前），最终留 top 3-7 个。nuwa-skill 明写：宁少勿多——3 个深刻的模型远好于 10 个浅薄的原则。" },
        { kind: "para", text: "提炼的同时还要做 5 件事：决策启发式（5-10 条，含具体案例）、表达 DNA（句式 / 词汇 / 节奏 / 幽默方式 / 确定性表达 / 引用习惯）、价值观与反模式、智识谱系、诚实边界（至少 3 条具体局限）。每件事在 extraction-framework.md 里都有量化方法。" }
      ],
      receives: "6 份 research md。",
      reads: ["references/extraction-framework.md", "全部 6 份 research/0X-xxx.md"],
      blockedShortcut: "不能凭印象挑出名的论点；不能跳过三重验证；不能调和矛盾；不能把『所有聪明人都这样想』的常识升模型；不能贪多（>7 个）；不能只描述风格不量化表达 DNA（不写句长、不写禁忌词就是糊弄）。",
      action: "扫候选 30 个论点 → 每个走三个标准检查 → 三个都通过的算心智模型；只通过 1-2 个的退一档进决策启发式；一个都没通过的不要 → 按排他性排序、留 top 3-7 → 同时整理决策启发式 5-10 条、表达 DNA、价值观/反模式（含矛盾）、智识谱系、诚实边界。",
      output: "提炼草稿：3-7 个心智模型（含证据/应用/局限）+ 5-10 条决策启发式 + 表达 DNA 分析 + 价值观与反模式（含矛盾）+ 智识谱系 + 诚实边界初稿。",
      nextConsumer: "Phase 2.5 提炼检查点——展示提炼摘要给用户审。",
      reusableMove: "三重验证筛框架。识别独特性不是『听起来对不对』，是『跨多个领域复现 + 能生成对新问题的判断 + 不是所有人都这样想』——三个机械标准比任何品味判断都靠谱。",
      challenges: [
        "「多元思维模型」是芒格的标志，但每个 lattice 节点（心理学/数学/物理）单独看排他性都不强——它的排他性在于『把这堆框架一起用』。三重验证表怎么打分？",
        "三重验证里『跨域』的『域』怎么界定？投资和管理算两个域、还是都属于商业？投资和教育算两个域、还是都属于学习？依据是什么？",
        "你筛出来 9 个三个标准都通过的候选——但 nuwa-skill 说 top 3-7。哪 2 个砍掉、依据是什么？「最不独特的砍」还是「最不能生成的砍」？",
        "提炼到表达 DNA 时，发现芒格有大量「拽英文术语」的习惯（lollapalooza、circle of competence）——做成 skill 后让 AI 也拽吗？什么程度算抓住特征、什么程度算 caricature？"
      ]
    },
    {
      id: "extraction-checkpoint",
      title: "Phase 2.5：提炼确认检查点（改框架比改 400 行 SKILL.md 便宜）",
      summary: "提炼草稿完成后立刻第二次暂停——展示『N 个心智模型 / N 条启发式 / 表达 DNA 三个关键特征 / 核心张力 / 诚实边界』给用户确认，确认后才进 Phase 3 装配 SKILL.md。",
      preTest: "提炼出来了 5 个心智模型 + 8 条启发式 + 表达 DNA。你的本能是立刻开始按模板写 SKILL.md、还是别的？写下你的判断再读。",
      narrativeBody: [
        { kind: "para", text: "提炼草稿出来了：5 个心智模型、8 条决策启发式、表达 DNA 的三个关键特征、2 对核心张力、诚实边界初稿。" },
        { kind: "para", text: "我的本能是直接进 Phase 3 装配 SKILL.md——按模板一节一节填、装出来才有交付物。" },
        { kind: "para", text: "nuwa-skill 不让。这是它的第二个用户审核检查点。Phase 2.5 的意义在 SKILL.md 原文里说得很清楚：「提炼是主观判断最重的环节，确认后再构建，避免写完 400 行 SKILL.md 才发现方向不对。」" },
        { kind: "para", text: "为什么这一步要单独再停一次？因为 Phase 1.5（调研检查点）只能审「原料够不够」，没法审「提炼对不对」。提炼是从 30 个候选挑 5 个、给它们排序、为什么挑这 5 个——这是主观判断最重的地方，最容易做错、最容易做错而 AI 自己看不出来。" },
        { kind: "para", text: "展示给用户的摘要长这样（钉死格式）：" },
        {
          kind: "code",
          lang: "markdown",
          text: "提炼结果摘要：\n\n心智模型（5 个）：\n  1. 逆向思维 (Invert) —— 想成功先想怎么失败\n  2. 多元思维模型 (Latticework of Mental Models) —— 用多学科框架交叉验证\n  3. 激励机制力量 (Power of Incentives) —— 看激励就懂为什么\n  4. lollapalooza 效应 —— 多力叠加非线性放大\n  5. 心理学的 25 种误判倾向 —— 内置认知偏差清单\n\n决策启发式（8 条）：\n  - 不投不在能力圈的事\n  - 看激励再看言辞\n  - ...\n\n表达 DNA（3 个关键特征）：\n  - 句式：短、直接、不修饰\n  - 词汇：高频 invert / lollapalooza / circle of competence；不用 stakeholder / synergy 等管理术语\n  - 幽默方式：自嘲式权威（『我已经够老够蠢可以说真话了』）\n\n核心张力（2 对）：\n  - 极简生活 vs 投资奢侈品牌（Costco / See's Candies）\n  - 反对从众 vs 终身追随 Buffett\n\n诚实边界（4 条）：\n  - 2023 年 11 月去世后无新观点\n  - 投资决策大多 Buffett 名义、个人决策样本少\n  - 公开演讲多 / 私人沟通少（言行一致度不易验证）\n  - 中文受众视角缺失（不阅读中文资料）"
        },
        { kind: "para", text: "用户两种回应：" },
        { kind: "list", items: [
          "OK → 进 Phase 3 装配。",
          "某个模型不对 / 缺了一个 / 张力应该有 3 对 → 回 Phase 2 调整，再来摘要。"
        ]},
        { kind: "para", text: "改回去的代价对比：" },
        {
          kind: "code",
          lang: "text",
          text: "在 Phase 2.5 改一个心智模型：\n  - 重做 1 个候选的三重验证 + 重写一节提炼草稿 ≈ 20 分钟\n\n在 Phase 4 改一个心智模型：\n  - 已装配的 SKILL.md 里这个模型相关的 5 段都要改：\n    心智模型卡 + 决策启发式（依赖它的）+ Agentic Protocol（依赖它的研究维度）\n    + 示例对话 + 调研来源引用 ≈ 2-3 小时\n\n所以 Phase 2.5 这一停，是个明显划算的成本控制点。"
        },
        { kind: "para", text: "这一步和 Phase 1.5 一样，AI 自由度卡死——展示格式、问的问题、可能的回应都钉死。理由也一样：注意力要落在内容上（哪个模型不对、缺哪个），不让 AI 在展示形式上发挥。" }
      ],
      receives: "提炼草稿（5 个模型 + 8 条启发式 + 表达 DNA + 张力 + 诚实边界）。",
      reads: ["SKILL.md · Phase 2.5"],
      blockedShortcut: "不能跳过这一步直接装配 SKILL.md；不能自己改展示格式；不能擅自决定『我觉得用户会 OK 的』；不能把没确认的草稿向 Phase 3 推。",
      action: "把摘要按钉死格式贴给用户 → 问一句「这套框架方向对吗？」→ 等用户回应。",
      output: "用户对提炼方向的明确判断：进 Phase 3 / 改某个模型再来。",
      nextConsumer: "Phase 3 装配 SKILL.md（用户 OK 后），或 Phase 2 回去调整（用户要求改）。",
      reusableMove: "把主观判断最重的产物 demote 成结构化摘要再审。展示一份 400 行成品和展示一张『5 个模型名 + 一行描述』的摘要——审核效率差一个数量级，错误捕获率前者反而更低（信息密度太高反而看不出错）。",
      challenges: [
        "用户回『核心张力第 2 对（反对从众 vs 追随 Buffett）不算张力——他们是亲密合作者』。你坚持自己的判断、回去重判、还是接受用户但备注？",
        "用户秒过 OK。但你看着摘要总觉得「多元思维模型」和「lollapalooza 效应」有重叠——你绕过用户合并它们、还是按用户 OK 推进？",
        "如果用户在 Phase 2.5 改了 1 个模型，Phase 1.5 的调研可能已经不够支撑新模型——你回 Phase 1 补、还是只用现有资料硬上？",
        "Phase 1.5 和 Phase 2.5 都让用户审一次——这两次审能合成一次吗？为什么 nuwa-skill 坚持分两次？"
      ]
    },
    {
      id: "assemble-skill",
      title: "Phase 3：拼装 SKILL.md + Agentic Protocol 反推",
      summary: "提炼定稿后按 skill-template.md 模板填，每段的来源明确。最关键的是 Agentic Protocol——一段让生成的人物 skill 在回答事实问题时先调研再说话的工作流，其中 Step 2 的研究维度必须根据心智模型自动反推。",
      preTest: "用户确认了提炼方向。你打开 references/skill-template.md，开始按段填。你的本能是直接复制 5 个心智模型的描述、表达 DNA 的 6 个维度——还是别的？哪一段你预期会卡？写下来再读。",
      narrativeBody: [
        { kind: "para", text: "用户确认 OK 之后我进 Phase 3。这一步主要是体力活——按 references/skill-template.md 模板把提炼定稿一格一格填进去。大部分都是机械映射：" },
        {
          kind: "code",
          lang: "markdown",
          text: "| 模板 Section | 填充来源 |\n|------------|---------|\n| frontmatter description | 来源数量 + 模型数量 + 触发词 |\n| 角色扮演规则 | 模板默认，不改 |\n| 身份卡 | 时间线(06) + 著作(01) → 用此人语气写 50 字自我介绍 |\n| 心智模型 | Phase 2.1 结果，每个含名称/证据/应用/局限 |\n| 决策启发式 | Phase 2.2 结果，每条含场景 + 案例 |\n| 表达 DNA | Phase 2.3 结果 → 转为角色扮演时的风格规则 |\n| 时间线 | Agent 6 调研结果，精简为关键节点表 |\n| 诚实边界 | Phase 2.6 + 调研时间 |"
        },
        { kind: "para", text: "但有一段不是体力活——Agentic Protocol。这是 nuwa-skill 自己加上去的一段，不是模板默认的常规内容，必须根据这个人的心智模型自动反推。" },
        { kind: "para", text: "Agentic Protocol 的价值是关键的。如果不写这一段，生成的 munger-perspective skill 一旦激活，AI 遇到「特斯拉护城河强不强」这种事实问题，就会凭训练语料编「基于我的判断框架，特斯拉的护城河主要在……」——但训练语料可能已经过时 1 年。Agentic Protocol 强迫 skill 自己先调研再说。" },
        { kind: "para", text: "整段 Protocol 是这样结构：" },
        {
          kind: "code",
          lang: "markdown",
          text: "## 回答工作流（Agentic Protocol）\n\n核心原则：芒格不凭感觉说话。遇到需要事实支撑的问题时，先做功课再回答。\n\n### Step 1: 问题分类\n\n| 类型 | 特征 | 行动 |\n|------|------|------|\n| 需要事实的问题 | 涉及具体公司/人物/事件/产品/市场现状 | → 先研究再回答（Step 2） |\n| 纯框架问题 | 抽象价值观、思维方式、人生建议 | → 直接用心智模型回答（跳到 Step 3） |\n| 混合问题 | 用具体案例讨论抽象道理 | → 先获取案例事实，再用框架分析 |\n\n### Step 2: 芒格式研究（按问题类型选择）\n\n⚠️ 必须使用工具（WebSearch 等）获取真实信息，不可跳过。\n\n[这里的研究维度必须根据心智模型自动推导]\n\n### Step 3: 芒格式回答\n基于 Step 2 获取的事实，运用心智模型和表达 DNA 输出。"
        },
        { kind: "para", text: "Step 2 的研究维度怎么自动反推？SKILL.md 给了表对应关系：" },
        {
          kind: "code",
          lang: "markdown",
          text: "| 人物 | 核心心智模型 | → 推导出的研究维度 |\n|------|------------|------------------|\n| 芒格 | 多元思维模型、逆向思考、激励机制 | 看护城河、看管理层激励结构、看最大风险（逆向）、看历史类比 |\n| 费曼 | 第一性原理、对权威的怀疑 | 看基本物理/数学约束、看官方说法的逻辑漏洞、看实验数据 |\n| 塔勒布 | 反脆弱、尾部风险 | 看极端情况、看谁在承担尾部风险、看专家预测的历史记录 |\n| MrBeast | 注意力工程、测试迭代 | 看竞品数据（播放/互动）、看标题/缩略图 A/B 测试空间 |"
        },
        { kind: "para", text: "用我们手里芒格的 5 个心智模型反推，Step 2 应该长这样：" },
        {
          kind: "code",
          lang: "markdown",
          text: "### Step 2: 芒格式研究\n\n#### 看激励（激励机制力量 → 看每个利益相关方的动力）\n1. 公司：管理层薪酬结构（股权/现金/股票期权占比）\n2. 公司：董事会独立性、关联交易\n3. 行业：监管者的激励（升迁路径、政治压力）\n4. 投资人：基金经理被考核什么周期（季度 vs 5 年）\n\n#### 反向看（逆向思维 → 先想怎么失败）\n1. 这件事最可能怎么死？历史上类似的死法\n2. 哪些信号会预示失败正在发生？\n3. 在什么条件下我会确信判断错了？\n\n#### 多角度看（多元思维模型 → 多学科框架交叉）\n1. 经济学：成本结构、规模效应、网络效应\n2. 心理学：用户怎么决策、消费行为变化\n3. 系统科学：反馈环、临界点、自组织\n4. 历史：相似行业 / 相似阶段的演化路径\n\n#### 看复利效应与时间（lollapalooza → 多力叠加）\n1. 这个判断 5 年后还成立吗？10 年呢？\n2. 是否有多个独立因素同向叠加（lollapalooza 信号）？"
        },
        { kind: "para", text: "这段不能用通用「搜索相关信息」描述——必须具体到「搜什么、看什么数据」，不然激活后还是抽象。" },
        { kind: "para", text: "整个 SKILL.md 最后用 Write 存进文件到 .claude/skills/munger-perspective/SKILL.md。存进文件前先按 extraction-framework.md 末尾的「质量自检清单」自查一遍——不通过的项标注。但真正的自动质检在下一个 stage。" }
      ],
      receives: "Phase 2.5 用户确认过的提炼定稿。",
      reads: ["references/skill-template.md", "references/extraction-framework.md（末尾自检清单）", "所有 6 份 research/0X-xxx.md（回查证据）"],
      blockedShortcut: "不能跳过 Agentic Protocol 这一段；不能让 Step 2 写成通用『搜索相关信息』（必须具体到搜什么、看什么数据）；不能跳过身份卡用第三人称写自我介绍（必须 50 字第一人称）；不能省略调研来源那一段。",
      action: "按模板逐段填 → 重点定制 Agentic Protocol（Step 2 研究维度从心智模型反推）→ 身份卡用此人语气第一人称 → 调研来源分一手/二手列 → 末尾加创建者归属 → 用 Write 存进文件到 .claude/skills/[name]-perspective/SKILL.md。",
      output: "完整的 SKILL.md（约 350-450 行），存进文件到自包含目录。",
      nextConsumer: "Phase 4 三盲测 + 脚本质检 + Phase 5 双 agent 精炼。",
      reusableMove: "Agentic Protocol 反推。生成的子产物如果会面对事实型问题，给它一段『先调研再说话』的工作流，里面的研究维度从这个产物的核心框架反推——通用版没用，必须按框架定制。",
      challenges: [
        "Step 2 反推时发现，5 个心智模型对应的研究维度有重叠——「看激励」既属于激励机制也属于多元思维模型的经济学维度。合并还是各列？依据是什么？",
        "Agentic Protocol Step 1 的分类表写着「纯框架问题 → 跳过 Step 2」。但用户问「人生怎么选职业方向」表面是纯框架，其实需要看就业市场数据——分类表会让 skill 把它误判为纯框架。怎么改？",
        "身份卡要求 50 字第一人称——但芒格 99 岁了去世了，写「我现在在做什么」该写他生前还是写「我已经去世」？两种处理的边界在哪？",
        "调研来源里有 9 个一手 + 11 个二手——但有 3 个一手是 YouTube 字幕（自动生成）。算一手还是退到二手？依据是什么？"
      ]
    },
    {
      id: "validate-and-polish",
      title: "Phase 4 + 5：脚本质检 + 三盲测 + 双 agent 后置精炼",
      summary: "SKILL.md 存进文件后，nuwa-skill 跑三道关：quality_check.py 自动检查 6 条必须通过的检查（数量/局限/DNA/边界/张力/一手占比）；spawn 子 agent 做三种盲测（已知立场 / 边缘问题 / 100 字风格）；最后再 spawn 两个 agent（auto-skill-optimizer + skill-creator 视角）评审后合并意见改一轮。",
      preTest: "SKILL.md 写好存进文件了。你的本能下一步是把它发给用户「好了」、还是别的？还需要再做什么？写下你的判断再读。",
      narrativeBody: [
        { kind: "para", text: "我把 SKILL.md 存进文件到 .claude/skills/munger-perspective/SKILL.md。我的本能是发给用户「好了，激活试试看」。" },
        { kind: "para", text: "nuwa-skill 不让——「写完」不等于「能交付」。它有三道关，AI 都得过。" },
        { kind: "para", text: "**第一关：脚本自动质检。** 跑 `scripts/quality_check.py`：" },
        {
          kind: "code",
          lang: "bash",
          text: "$ python3 scripts/quality_check.py .claude/skills/munger-perspective/SKILL.md"
        },
        {
          kind: "code",
          lang: "text",
          text: "质量检查: SKILL.md\n==================================================\n  心智模型数量    ✅ PASS  5 个心智模型 ✅\n  模型局限性     ✅ PASS  有局限性标注 ✅\n  表达 DNA 辨识度  ✅ PASS  表达 DNA 特征: 6 项 ✅\n  诚实边界       ✅ PASS  诚实边界: 4 条 ✅\n  内在张力       ✅ PASS  内在张力: 3 处 ✅\n  一手来源占比    ✅ PASS  一手来源占比: 18/28 (64%) ✅\n==================================================\n结果: 6/6 通过\n🎉 全部通过，可以交付"
        },
        { kind: "para", text: "脚本检查 6 条客观标准——数量是不是 3-7、有没有写局限、表达 DNA 是不是写了至少 3 个维度、诚实边界是不是至少 3 条、张力是不是至少 2 处、一手来源是不是 >50%。这一关纯机械、没有判断空间。" },
        { kind: "para", text: "**第二关：三盲测。** spawn 一个独立的 subagent（用户自己一个新对话开新的，避免自评偏差——自己写的自己评会偏好评好分），加载这份 SKILL.md，做 3 件事：" },
        {
          kind: "code",
          lang: "markdown",
          text: "4.1 已知测试（Sanity Check）\n   选 3 个芒格公开表态过的问题（如「比亚迪是不是好投资？」），\n   让 subagent 用 skill 回答，对比真实立场。\n   方向一致 → 模型有效；偏离 → 回溯调整\n\n4.2 边缘测试（Edge Case）\n   选 1 个芒格没公开讨论过但相关的问题（如「你怎么看 GPT-4？」），\n   用 skill 推断。\n   期望：「基于模型 X 和 Y 的推断，可能...但不确定」\n   不应该斩钉截铁\n\n4.3 风格测试（Voice Check）\n   用 skill 写一段 100 字分析，判断：\n   - 有芒格的表达特征？\n   - 不是通用 AI 味鸡汤？\n   - 不是原话拼凑？"
        },
        { kind: "para", text: "为什么 sanity test 要 spawn 独立 agent 而不是自评？因为我自己写了这个 SKILL.md，让我评自己——我会偏向给好分（「这段写得有那个味」）。新的 subagent 加载 skill 从零开始走，没有偏见。这是个常用招式：评审和创作不能是同一个 agent。" },
        { kind: "para", text: "三盲测如果不通过，回 Phase 2 调整心智模型权重。迭代上限是 Phase 2 → 4 最多 2 次——再不过就在诚实边界里标薄弱维度、交当前最优版本而不是无限打磨。" },
        { kind: "para", text: "**第三关：双 agent 后置精炼（Phase 5）。** 这一关在质检之后，针对的是另一种坏：skill 看起来合格但「不好用」。并行 spawn 两个评审 agent：" },
        {
          kind: "code",
          lang: "markdown",
          text: "Agent A（auto-skill-optimizer 视角）：\n  - 对 SKILL.md 做 8 维度结构评估\n    （工作流清晰度、边界条件、检查点设计、指令具体性等）\n  - 干跑 3 个典型测试 prompt\n  - 输出：最弱 2 个维度的具体改进建议（要有改后文本示例）\n\nAgent B（skill-creator 视角）：\n  - 评审「激活触发条件」是否覆盖真实使用场景\n  - 评审「角色扮演规则」可操作性\n    （有无问题路由、频率约束、失败预防）\n  - 识别缺失关键信息\n  - 输出：2-3 处具体文本改动建议（要有改后文本示例）"
        },
        { kind: "para", text: "主 agent 拿到两份报告，合并不冲突的改动，展示变更摘要给用户确认。这一步不能省的一条是「改动必须让 skill 激活即执行」——不只是增加内容，而是让 AI 拿到 skill 后知道先做什么、碰到什么停下来。" },
        { kind: "para", text: "三关全过之后，munger-perspective/ 才算可交付。用户在 Claude 里说「用芒格的视角看一下比亚迪」就能直接激活。整个目录可以 zip 发给别人。" }
      ],
      receives: "存进文件的 SKILL.md + 完整 references/ 目录。",
      reads: ["scripts/quality_check.py", "spawn 出去的 subagent 自带 skill 上下文（不需要主 agent 多解释）"],
      blockedShortcut: "不能跳过任何一关；不能让创作者自己评自己（必须 spawn 独立 agent）；不能在 sanity test 失败时绕过迭代直接交付；不能让 Phase 2-4 迭代超过 2 次（防止无限打磨）；不能把改动当『增加内容』（必须改到激活即执行）。",
      action: "跑 quality_check.py → spawn 子 agent 做 sanity/edge/voice 三盲测 → 不通过回 Phase 2 调整（≤2 次）→ 并行 spawn Agent A + Agent B 评审 → 合并不冲突改动 → 展示变更摘要给用户确认 → 交付。",
      output: "通过三关的 SKILL.md + 一份变更摘要给用户。完整自包含目录可以 zip。",
      nextConsumer: "用户激活试用；后续若有新动态触发『更新 XX skill』走增量路径（只跑 Agent 2/5/6）。",
      reusableMove: "三层验证。客观脚本检查（机械标准）+ 独立 subagent 盲测（避自评偏差）+ 多视角后置评审（不同评审视角合并）。三层覆盖三种不同的『做坏了的样子』，单层覆盖不全。",
      challenges: [
        "quality_check.py 通过了，但 sanity test 里芒格对「比亚迪」的预测和你模型推导出的相反——是模型错了，还是 sanity test 选的问题不够典型？怎么判定？",
        "双 agent 精炼后 Agent A 和 Agent B 给的两条建议互相冲突（A 说『角色扮演规则太严格』，B 说『角色扮演规则不够具体』）——你听谁的？还是都不听问用户？",
        "迭代到 Phase 2-4 第 3 次了——按规则要交付当前最优版本。但你判断再迭代一次能修好。坚持规则、还是破例？破例的代价是什么？",
        "脚本通过 + 盲测通过 + 双 agent 精炼通过，但用户激活后说「不像」——你回 Phase 2 重提炼、还是去问用户具体哪里不像？整个流程哪一环漏接了用户的『不像』直觉？"
      ]
    }
  ],

  glossary: [
    {
      term: "perspective skill",
      plainMeaning: "一份能在 Claude 里激活的 markdown 文件，里面装着某个人的思维框架——加载后 AI 用 TA 的视角分析问题。和『模仿 TA 说话』不一样，本质是抄认知操作系统。",
      whereItAppears: "整个 nuwa-skill 的产出目标——它生成的就是 perspective skill。SKILL.md 标题就叫『XX · 思维操作系统』。",
      solvedProblem: "防止 AI 一被问到『XX 会怎么看』就凭训练语料编 TA 的金句——perspective skill 给 AI 一套可运行的心智模型 + 决策启发式 + 表达 DNA + 诚实边界，激活后用结构化方式思考。",
      howToUse: "我做完之后用户在 Claude 里加载它就能激活。我自己用的时候，知道这是产出物形态——所有提炼最终都要能落到这个形态里。",
      commonMisread: "不是『一个 Markdown 总结』。不是『一段 prompt』。它有固定 9 段、必须 3-7 个心智模型、必须 ≥3 条诚实边界——是结构化产物，不是随手写。"
    },
    {
      term: "三重验证（跨域复现 / 生成力 / 排他性）",
      plainMeaning: "判断一个论点是不是真心智模型的三道筛子——三个标准同时通过的才算心智模型，只通过 1-2 个的退一档变成决策启发式，一个都没通过的不要。",
      whereItAppears: "Phase 2 提炼阶段，对每个候选论点机械执行。30 个候选可能只剩 3-7 个三标准都通过的。",
      solvedProblem: "防止 AI 凭印象挑出名的论点（『芒格就讲护城河』）当心智模型——但护城河其实是巴菲特更典型的，芒格的排他性不在这。三重验证让筛选基于客观标准而不是品味。",
      howToUse: "每个候选我都问三件事——他在多少个不同领域用？我能用它推断他对新问题的立场吗？这是不是别的聪明人不会这样想的？三个都 Yes 才升。",
      commonMisread: "不是『听起来对不对』。听起来对的论点可能只过 1 重。三重验证刻意排除『直觉感觉对』，强迫我去 research md 里找客观证据。"
    },
    {
      term: "信息源黑名单",
      plainMeaning: "调研阶段永远拒绝的三类来源：知乎、微信公众号、百度百科。中文人物也不放开。",
      whereItAppears: "Phase 1 的 6 个 subagent 任务 prompt 末尾，每个都带这句。",
      solvedProblem: "防止训练集带偏：这三类来源洗稿严重、封闭无法验证、信息陈旧。把它们的二手转述当一手会让生成的 skill 在事实层面坏掉。",
      howToUse: "spawn agent 时把黑名单写进 prompt 里，agent 在 WebSearch 时主动避开。结果里出现这三类来源的链接我直接丢。",
      commonMisread: "不是『品味偏好』。这是质量保证——AI 不挡一下就会从这三类来源大量提取。也不是『中文人物例外』，黑名单对中外一视同仁，中文人物用 B 站原始视频、小宇宙播客、权威媒体（36 氪/晚点/财新）。"
    },
    {
      term: "Agentic Protocol",
      plainMeaning: "塞进生成的 perspective skill 里的一段工作流——让 skill 激活后在回答事实问题时先主动调研再说话，不是凭训练语料编。",
      whereItAppears: "Phase 3 装配 SKILL.md 时塞在『角色扮演规则』之后、『示例对话』之前。Step 2 的研究维度必须从这个人的心智模型反推。",
      solvedProblem: "防止生成的 perspective skill 一旦激活就开始凭训练语料编事实（『特斯拉的护城河主要在……』但训练语料可能已过时）。强制让 skill 自己先 WebSearch 再回答。",
      howToUse: "我在装配 SKILL.md 时根据这个人的 3-5 个核心心智模型，反推出对应的 3-5 个研究维度——每个维度配 4-6 个具体研究点（搜什么、看什么数据），不能写『搜索相关信息』这种泛话。",
      commonMisread: "不是『让 skill 多礼貌』。它是 skill 从『鹦鹉学舌』升级为『可靠思维顾问』的关键。少了它，skill 就只是表达风格的模仿秀。"
    },
    {
      term: "Phase 1.5 / 2.5 检查点",
      plainMeaning: "两个用户审核点。1.5 在调研做完、提炼之前；2.5 在提炼做完、装配之前。两次暂停都展示钉死格式的摘要给用户审。",
      whereItAppears: "Phase 1.5 在调研之后；Phase 2.5 在提炼之后。两次都用脚本/钉死格式展示，AI 自由度卡死。",
      solvedProblem: "防止 AI 闷头跑完整个流程才发现方向错——在改起来还便宜的时候停一下。改一个心智模型在 Phase 2.5 花 20 分钟，在 Phase 4 装配后改要花 2-3 小时。",
      howToUse: "调研做完跑 merge_research.py 出表 → 贴给用户 → 等回应；提炼做完按钉死格式写摘要 → 贴给用户 → 等回应。两次问的都是「方向对吗」，不是「细节对吗」。",
      commonMisread: "不是『礼貌询问』。是成本控制点。AI 自由度故意卡死——不让我自己设计展示形式，因为注意力会被形式吸走、忽略真正该看的内容。"
    },
    {
      term: "矛盾不调和",
      plainMeaning: "Phase 2 提炼时发现这个人在不同场合说过相反的话，不能讨价还价的规则是不消除、原样保留——分类为时间性矛盾 / 领域性矛盾 / 本质性张力，分别处理。",
      whereItAppears: "Phase 2.4『价值观与反模式』那一段 里，写在『矛盾与张力』一项。Phase 2.5 摘要也单独列『核心张力 N 对』。",
      solvedProblem: "防止 AI 把矛盾调和成一个看着自洽的假平均——但人物的深度恰恰在矛盾里。芒格反对从众但终身追随 Buffett、讲极简但投奢侈品 Costco——这些张力是真的他，调和掉就成纸片人。",
      howToUse: "调研时发现矛盾原样记录、提炼时归类、装配时单独列在『核心张力』那一段。三类矛盾处理方式不同：时间性记演化轨迹、领域性分领域记、本质性单列。",
      commonMisread: "不是『AI 没整理好』。矛盾本身就是有价值的信号——是深度的来源，不是 bug。也不是『编造一个调和解释』，那叫和稀泥。"
    },
    {
      term: "自包含 skill 目录",
      plainMeaning: "所有产物（SKILL.md、调研产物、源素材、脚本）全部存在 .claude/skills/[name]-perspective/ 内部，不依赖任何外部文件——复制整个目录就能独立使用。",
      whereItAppears: "Phase 0.5 建目录时强制约束。所有 subagent 存进文件路径都在这个目录内部。",
      solvedProblem: "防止 skill 在本机能跑发给别人 zip 一打就少一半——为开源分发硬设计的核心原则。",
      howToUse: "建目录时 mkdir 出完整结构；spawn agent 时 prompt 里写明存进文件路径必须在这个目录内；存进文件前 cd 进这个目录检查。",
      commonMisread: "不是『最佳实践建议』，是不能讨价还价的规则。把调研产物存进 `07-调研与分析/` 这种外部目录直接破坏自包含——发给别人就不能用。"
    }
  ],

  fileMap: [
    {
      path: "SKILL.md",
      role: "入口和路由——AI 进来要读的第一份文件",
      generatedBy: "nuwa-skill 作者（人手写）",
      readBy: "AI 第一次激活 nuwa-skill 时；每次推进到新 Phase 时回查",
      owns: "整个整套流程的 Phase 切分（0/0.5/1/1.5/2/2.5/3/4/5）；每个 Phase 的不能讨价还价的规则；分流表（0A vs 0B）；调研模式判断表（本地/网络/混合）；6 Agent 任务分配；信息源优先级；信息源黑名单；质量自检通过标准；更新模式增量路径；中外人物 + 主题 skill + 冷门人物 + 蒸馏自己等特殊场景分支。",
      doesNotOwn: "三重验证的具体方法（在 extraction-framework.md）；SKILL.md 模板的具体格式（在 skill-template.md）；脚本实现细节（在 scripts/）。",
      failureIfWrong: "Phase 划错或顺序错——整个流程结构崩塌；分流表漏一种入口——某类用户输入处理不了；信息源黑名单写错——错误来源进入调研。"
    },
    {
      path: "references/extraction-framework.md",
      role: "提炼方法论——三重验证 + 矛盾处理 + 表达 DNA 量化 + 信息不足处理 + 质量自检清单",
      generatedBy: "nuwa-skill 作者（人手写）",
      readBy: "Phase 2 提炼阶段、Phase 3 装配末尾自检阶段",
      owns: "三重验证（跨域复现 / 生成力 / 排他性）的具体定义；矛盾三分类（时间性 / 领域性 / 本质性）；表达 DNA 量化方法（句长 / 疑问比例 / 类比密度等 6 个维度）；信息不足时的处理表；人物 vs 主题 skill 差异；最终质量自检清单（6 项）。",
      doesNotOwn: "Phase 切分；SKILL.md 输出格式；脚本实现。",
      failureIfWrong: "三重验证标准模糊——提炼出来的心智模型把『常识』和『真独特视角』混着塞；矛盾处理规则错——把张力调和成虚假自洽。"
    },
    {
      path: "references/skill-template.md",
      role: "SKILL.md 输出模板——Phase 3 装配时按段填",
      generatedBy: "nuwa-skill 作者（人手写）",
      readBy: "Phase 3 装配阶段",
      owns: "最终 SKILL.md 的 9 大段顺序和格式（frontmatter / 角色扮演 / 身份卡 / 心智模型 / 决策启发式 / 表达 DNA / 时间线 / 价值观 / 智识谱系 / 诚实边界 / 来源 / 归属）。",
      doesNotOwn: "Agentic Protocol 的具体内容（在 SKILL.md 主文档里讲）；每段怎么填（参考其他文件）；模型的具体内容（来自 Phase 2 提炼）。",
      failureIfWrong: "模板缺一节——生成的 skill 漏一个维度；段落顺序错——读起来不自然；frontmatter description 写得太短——触发条件覆盖不到真实使用场景。"
    },
    {
      path: "scripts/merge_research.py",
      role: "Phase 1.5 摘要生成器——自动扫 references/research/ 出来源数 / 一手二手 / 关键发现 / 矛盾的表",
      generatedBy: "nuwa-skill 作者（人手写）",
      readBy: "Phase 1.5 调研检查点，AI 跑命令调用",
      owns: "把 6 份 research md 折叠成一张让用户审的表的逻辑——URL 计数、一手/二手关键词标记、矛盾检测、缺失维度检测。",
      doesNotOwn: "research md 的内容（来自 Phase 1 的 6 个 agent）；用户怎么回应（用户自己判断）。",
      failureIfWrong: "脚本算 URL 数算错——用户判断调研够不够时拿到错数据；矛盾检测漏掉——本来该停的地方没停；缺失维度判断错——该补的没补。"
    },
    {
      path: "scripts/quality_check.py",
      role: "Phase 4 自动质检——6 条客观标准（数量 3-7 / 局限 / DNA / 边界 ≥3 / 张力 ≥2 / 一手 >50%）",
      generatedBy: "nuwa-skill 作者（人手写）",
      readBy: "Phase 4 质检阶段，AI 跑命令调用",
      owns: "用正则机械检查 6 个数字标准 → PASS/FAIL → 汇总。完全没有判断空间——所以是『客观这一关』。",
      doesNotOwn: "三盲测（需要 spawn subagent）；后置精炼（需要 spawn 评审 agent）。脚本只管能数清楚的标准。",
      failureIfWrong: "正则写错——明明 5 个模型却数成 2 个；标准写错——把 8 个也算通过（应该是 3-7）；漏检某条——一手占比低于 50% 也放过去。"
    },
    {
      path: "scripts/download_subtitles.sh + srt_to_transcript.py",
      role: "字幕获取与清洗——下载 YouTube 字幕（人工 > 中文 > 英文 > 自动生成）+ 清成纯文本 transcript",
      generatedBy: "nuwa-skill 作者（人手写）",
      readBy: "Phase 1 Agent 2（对话）时，需要 YouTube 视频的 transcript 时调用",
      owns: "字幕格式优先级、SRT 时间戳去除、HTML 标签去除、连续重复行合并——这些容易做错的小步骤（漏一个就影响后面）。",
      doesNotOwn: "搜索哪个视频（由 Agent 2 决定）；transcript 怎么用（在 references/sources/transcripts/ 里供 Agent 2 提取观点）。",
      failureIfWrong: "字幕优先级错——拿到机器生成字幕当一手来源（实际是低质量自动文本）；时间戳清洗错——transcript 里夹杂 00:00:23 影响阅读。"
    },
    {
      path: "examples/*-perspective/",
      role: "参考样板（写完应该长这样）——14 个真实生成出来的 perspective skill，用来给 AI 看『写完应该长这样』",
      generatedBy: "nuwa-skill 跑出来的产物",
      readBy: "AI 在 Phase 3 装配时回查格式；用户决定『要不要做 munger 的 skill』时看其他例子参考。",
      owns: "已生成的具体 SKILL.md 实例——14 个人物从芒格到费曼到 MrBeast。",
      doesNotOwn: "格式规则（在 skill-template.md）；提炼方法（在 extraction-framework.md）。",
      failureIfWrong: "examples 质量差——AI 看着差的样本以为合格标准就这样，产出质量整体下移。这是『参考样板（写完应该长这样）』机制的固有风险。"
    }
  ],

  designChoices: [
    {
      title: "两条入口分流（0A 直接 / 0B 诊断），不让 AI 替用户决定该蒸馏谁",
      looksUnnecessaryBecause: "看起来多此一举：用户都来用 nuwa-skill 了，肯定知道自己要蒸馏谁，干嘛设两条分支？",
      badScenario: "用户说『我想提升商业决策』，AI 默认走 0A、追问『你要蒸馏谁？』——用户根本不知道。要么用户尴尬退出，要么 AI 直接随便推一个名字（『建议你蒸馏芒格吧』）——把用户没决定的事替他决定了。",
      constraint: "Phase 0 强制先看输入：明确人名/主题 → 0A；模糊需求/困惑 → 0B。0B 是个推荐流程，用 10 类需求维度表从困惑反推该蒸馏谁，每个候选写局限。",
      solvedProblem: "用户连蒸馏谁都不知道这种情况是大量存在的——他只知道自己的需求。如果 AI 不能从需求推荐对象，整个 skill 的入口就漏一大半用户。",
      reusableMove: "在 skill 入口看输入类型而不是看意图——同一个意图（『帮我做一个 X』）背后可能是『我已经决定了』或『我还没决定』两种状态，前者要执行后者要推荐。先看输入决定走哪条。",
      counterScenarios: [
        { effect: "救你", when: "用户说『我总是决策犹豫』来找你", why: "这种用户大量存在，0B 把困惑反推成『芒格 / 贝索斯 / Paul Graham』三个候选，每个写局限——用户得到了之前不知道要的对象。" },
        { effect: "可以跳过", when: "在企业内部部署，用户群明确知道要谁", why: "比如某公司给员工部署『学公司创始人思维』——只蒸馏一个人，没有 0B 推荐场景。这时 0B 是死代码。" },
        { effect: "完全失效", when: "用户的需求是『教我所有商业大佬的视角』", why: "0B 推 3 个候选用户全要——分流表没列『全要』。这时 0B 反而成了限制，要么破例做 N 个 skill、要么改成『推荐 10 个让用户选 3』。原表覆盖不到。" }
      ]
    },
    {
      title: "6 维并行 subagent，不让 AI 自己串行做调研",
      looksUnnecessaryBecause: "看起来多此一举：调研一个人不就是 google 一下读几篇文章吗？为什么要拆 6 个并行 agent？",
      badScenario: "AI 自己串行做：先搜著作、形成『逆向思维是核心』的印象 → 再搜对话时筛掉反例，越搜越觉得对 → 再搜批评时只挑能反驳的角度 → 最终产出一份『芒格 = 逆向思维』的过简化画像，遗漏了多元思维模型、激励机制等其他独立框架。",
      constraint: "Phase 1 spawn 6 个并行 subagent，每个只看一个维度（著作/对话/表达/他者/决策/时间线），各自存进文件到 0X-xxx.md。结论独立形成。",
      solvedProblem: "防止结论带偏——上一阶段的判断会无意识筛选下一阶段的证据。并行同时跑 6 个 agent，每个 agent 启动时都没有别人的结论。",
      reusableMove: "切维度做调研要并行，不要串行——上一阶段的结论是下一阶段的带偏源；只要维度切得开，并行就能让 N 个独立视角同时落地。",
      counterScenarios: [
        { effect: "救你", when: "蒸馏一个有大量公开材料的活人或近代人物", why: "芒格这种 28+ 来源、跨多个领域反复表达——并行 6 路同时切，每路落 10-20 条独立证据，最后 merge 才能看到 5 个真心智模型的全貌。" },
        { effect: "应简化", when: "蒸馏只写过一本书的人", why: "信息总量本来就 <10 条，6 个 agent 跑出来 4 个空文件。这时硬开 6 路反而让产出更碎。SKILL.md 在『冷门人物』分支降到 2-3 个模型 + 加大诚实边界。" },
        { effect: "取决于", when: "蒸馏自己（用户提供素材）", why: "并行还是有用——不同维度的素材分给不同 agent 看；但本质不再是网络搜索而是本地素材分析。Phase 1 改成『按 6 维分类用户给的素材，缺的维度走网络补』。形式像，机制变。" }
      ]
    },
    {
      title: "两个用户审核点（Phase 1.5 / 2.5），不让 AI 闷头跑完全程",
      looksUnnecessaryBecause: "看起来多此一举：用户委托 AI 蒸馏，AI 跑完交一份成品不就完了？为什么中间还要停两次？",
      badScenario: "AI 闷头跑：6 个 agent 调研 → 提炼 5 个模型 → 装配 SKILL.md → 交付。用户一看『心智模型 3 是错的、我不要那个』。改一个模型要回退到 Phase 2、重做三重验证、改 Phase 3 装配的 4-5 段相关内容（心智模型卡 + 决策启发式 + Agentic Protocol Step 2 维度 + 示例对话）——改回去要花 2-3 小时。",
      constraint: "Phase 1.5 调研完暂停，跑 merge_research.py 出摘要给用户审；Phase 2.5 提炼完暂停，按钉死格式展示『N 个模型 + 启发式数 + DNA 特征 + 张力 + 边界』摘要给用户审。两次都展示钉死格式、问钉死的问题。",
      solvedProblem: "在方向错的早期、东西还都是文本的时候停一下来对一次。Phase 2.5 改一个模型 ≈ 20 分钟（重判一个候选 + 重写一节）。Phase 4 装配后改 ≈ 2-3 小时。早停早省。",
      reusableMove: "多阶段整套流程要在『主观判断最重』的阶段前后各停一次——一次审原料够不够（避免垃圾进），一次审提炼对不对（避免方向错）。展示钉死格式，注意力锁在质量信号上不在 UI 形式上。",
      counterScenarios: [
        { effect: "救你", when: "用户对蒸馏对象有具体期待但说不清", why: "用户说『蒸馏芒格』但实际想要的是『芒格的投资判断方式而不是他的人生哲学』——Phase 2.5 摘要展示 5 个模型时用户看出来人生哲学占太多，可以指出来调整。在方向偏的早期就停下了。" },
        { effect: "部分过度", when: "蒸馏对象用户其实不熟", why: "用户秒过 OK 没仔细看——这两个检查点本来想拦的方向错就没被拦住。但有检查点至少保证了『AI 不能无声无息地推进』，最低保障还在。" },
        { effect: "可以放宽", when: "在自动化 batch 蒸馏场景", why: "某公司一次蒸馏 50 个员工的内部专家——没有真人盯每次的检查点。这时 1.5 和 2.5 改成『脚本判断 + 异常告警』，只在 merge_research.py 检测到信息<10 条或矛盾>5 处时才暂停人工审。" }
      ]
    },
    {
      title: "三重验证筛心智模型，不让 AI 凭印象挑出名的论点",
      looksUnnecessaryBecause: "看起来多此一举：芒格的『逆向思维』『能力圈』『护城河』谁都知道——直接挑这些当心智模型不就行了？",
      badScenario: "AI 凭印象挑：『逆向思维』『能力圈』『护城河』『复利』『激励机制』。SKILL.md 看起来很完整。但用激活后的 skill 分析问题会发现——『能力圈』『护城河』巴菲特用得更多，『复利』几乎所有投资者都讲——这些不揭示芒格独特视角。生成的 skill 像『几个投资名词拼盘』，不像芒格。",
      constraint: "Phase 2 对每个候选论点机械检查三个标准：跨域复现（≥2 不同领域出现）+ 生成力（能推断对新问题立场）+ 排他性（不是所有聪明人都这样想）。三个都通过的进核心那一节，只通过 1-2 个的退一档进决策启发式那一节，一个都没通过的不要。",
      solvedProblem: "区分『这个人的标志论点』和『这个人的真独特视角』。逆向思维三重都过→升模型；能力圈跨域弱+不够独特→降启发式；护城河巴菲特更典型→可能不进 skill。",
      reusableMove: "提炼独特性用机械标准而不是品味判断。『听起来对不对』是品味，『跨域复现+生成力+排他性』是可以列证据表格的客观标准——三个机械标准比任何品味判断都靠谱。",
      counterScenarios: [
        { effect: "救你", when: "蒸馏一个有 5+ 个知名论点的人", why: "芒格这种公开论点多——三重验证能从 30 个候选筛出 3-7 个真独特的，丢掉 20+ 个『听起来对但不独特』的常识。质量提升一档。" },
        { effect: "应简化", when: "蒸馏一个只有 2-3 个核心论点的小众思想家", why: "如塔勒布的『反脆弱』——他的整个体系几乎就是 1 个心智模型 + 几个引申。强行套三重验证去筛会发现 2 个都过、其它都降启发式——但这没必要，因为本来就那么少。这时简化到『判断每个论点是否独特』就够。" },
        { effect: "完全失效", when: "蒸馏一个一致性极强但跨域很窄的人", why: "比如某个只在 1 个细分领域反复深耕的专家——所有论点都过不了『跨域复现』（他只在那 1 个领域出现）。三重验证整个机制失效。这时要改判定方法（用『跨子主题复现』替代『跨领域』）。" }
      ]
    },
    {
      title: "Agentic Protocol 反推，不让生成的 skill 凭训练语料编事实",
      looksUnnecessaryBecause: "看起来多此一举：perspective skill 本来是抄思维框架的，让 AI 用框架回答就行——干嘛塞一段调研工作流？",
      badScenario: "没 Agentic Protocol 的 munger-perspective 被激活后，用户问『特斯拉护城河强不强』——AI 凭训练语料里芒格说过的话编『基于多元思维模型，特斯拉的护城河主要在……』。但训练语料过时 1 年，特斯拉这一年发生过的事 AI 不知道。回答听起来像芒格但事实层面已经错了。",
      constraint: "Phase 3 装配 SKILL.md 时强制塞一段 Agentic Protocol：Step 1 把问题分类（需要事实/纯框架/混合）→ Step 2 按问题类型做研究（研究维度必须从这个人心智模型反推，不能用通用『搜索相关信息』）→ Step 3 基于事实用框架回答。",
      solvedProblem: "perspective skill 从『鹦鹉学舌』升到『可靠思维顾问』。激活后遇到事实型问题先 WebSearch 再说，不是凭训练语料编。",
      reusableMove: "生成的子产物如果会面对事实型问题，给它一段『先调研再说话』的工作流，里面的研究维度从这个产物的核心框架反推——通用版没用，必须按框架定制。",
      counterScenarios: [
        { effect: "救你", when: "用户问活人 perspective skill 关于当前事件", why: "『芒格会怎么看 OpenAI』『塔勒布会怎么看 2024 黑天鹅』——这些都需要事实，Agentic Protocol 让 skill 先搜再说，给出基于真实信息的判断。" },
        { effect: "完全多余", when: "用户问纯哲学问题", why: "『芒格觉得自由意志是真的吗』——这是纯框架问题，Step 1 分类后直接跳到 Step 3。Agentic Protocol 不损害但也不增值。" },
        { effect: "可能绑你", when: "skill 在没网环境激活", why: "Step 2 强制 WebSearch——但 skill 跑在不联网的机器上。这时 Protocol 失效，skill 会卡住或报错。这是 nuwa-skill 没处理的边界，可能需要加『没网时退一档』分支。" }
      ]
    },
    {
      title: "信息源黑名单（知乎/公众号/百度）+ 一手优先，不让训练集带偏进 skill",
      looksUnnecessaryBecause: "看起来多此一举：AI 调研应该信任所有可访问的来源，为什么要预设黑名单？特别是中文人物，知乎不是有很多分析吗？",
      badScenario: "AI 不挡，从知乎搜到『芒格 10 大思维模型』『芒格送给年轻人的 30 条建议』——这些大多是洗稿的二手转述，转述者还掺了自己的话。AI 把这些当一手提取，生成的 skill 里有大量『芒格说过但其实他没说』的内容。一旦激活，用户引用这些『芒格的话』会出真事故。",
      constraint: "Phase 1 的 6 个 agent prompt 末尾都带『信息源黑名单：不使用知乎、微信公众号、百度百科』。中文人物用 B 站原始视频、小宇宙播客、权威媒体（36 氪/晚点/财新）。来源优先级：用户提供一手 > 本人著作 > 长访谈 > 决策记录 > 社媒 > 他人评价 > 二手转述。",
      solvedProblem: "训练集大量含这三类来源的洗稿内容，AI 不挡会自动从这里提取——把『某博主总结的芒格观点』当『芒格本人的观点』。质量从根上烂。",
      reusableMove: "从源头挡掉错来源比后面的步骤清洗更重要。在 AI 接触来源时就用黑名单挡掉，比等它写出来再让用户挑错有效得多——错误一旦进 SKILL.md，后续好几关都未必能挑出来。",
      counterScenarios: [
        { effect: "救你", when: "蒸馏中文人物", why: "中文人物的网络分析大量在知乎/公众号——不挡的话 AI 80% 的来源会是这些。黑名单强迫它去找 B 站原始视频、小宇宙完整访谈、权威媒体——这些虽然找起来累但质量高一档。" },
        { effect: "部分让位", when: "蒸馏冷门西方人物", why: "冷门人物的英文资料也不多——Reddit、Substack 等非黑名单来源里也有大量洗稿和粉丝二创。黑名单挡不到这些，需要二级筛选『来源是不是一手』。黑名单只完成了一半工作。" },
        { effect: "取决于", when: "用户明确说『我相信知乎那篇 XX』", why: "用户主动提供的本地素材优先级最高（高于黑名单）——把用户从知乎下载的那篇文章放进 sources/ 作为一手素材使用。规则在这里让位于用户选择，但要在诚实边界标注来源。" }
      ]
    },
    {
      title: "三层后置验证（脚本质检 + 三盲测 + 双 agent 精炼），不让 AI 自评放过自己",
      looksUnnecessaryBecause: "看起来多此一举：装配 SKILL.md 时 AI 自己已经按 extraction-framework 自检过了，为什么还要再三层？",
      badScenario: "AI 自评通常给好分（『我觉得这一段抓住了芒格的语气』）——自己写的自己评天然会偏好评好分。skill 装出来看起来合格，激活后用户发现『不像』。回退困难：哪一环漏了？是模型选错、表达 DNA 没抓住、还是 Agentic Protocol 没跑起来？",
      constraint: "Phase 4 跑 quality_check.py（6 条客观标准）；spawn 独立 subagent 做三盲测（sanity 已知立场对照 / edge 边缘问题不确定性 / voice 100 字风格盲测）；Phase 5 并行 spawn 两个评审 agent（auto-skill-optimizer 视角 + skill-creator 视角）合并意见改一轮。",
      solvedProblem: "三种坏分别用不同手段抓：『结构性缺漏』用脚本（机械检查数量/局限/边界）；『方向偏离』用独立 agent 盲测（避自评偏差）；『不好用』用多视角后置评审（视角差异捕获盲点）。",
      reusableMove: "三层验证。客观脚本（机械标准）+ 独立 subagent 盲测（避自评偏差）+ 多视角后置评审（视角差异）。三层覆盖三种不同的『做坏了的样子』，单层覆盖不全。",
      counterScenarios: [
        { effect: "救你", when: "生成被严肃使用的 perspective skill", why: "用户拿生成的 skill 做投资决策辅助——质量风险高。三层验证能在三个不同层面捕获问题，明显降低坏 skill 出门的概率。" },
        { effect: "部分过度", when: "原型 / 草稿 / 内部尝试", why: "用户只想快速生成一个 skill 看看效果——三层验证拉长一倍时间。这时可以降到只跑脚本质检，跳过盲测和精炼，标注『未完整验证版本』。" },
        { effect: "可能绑你", when: "Phase 2-4 迭代上限是 2 次", why: "如果三层验证持续不通过，规则说交付当前最优版本不无限打磨——但有时第 3 次迭代真的能修好。规则牺牲完美换确定性，是个明确的设计取舍，可能在某些场景偏保守。" }
      ]
    }
  ],

  patterns: [
    {
      name: "Pattern 1 · 入口先分流，不让一招吃所有输入",
      status: "候选",
      prevents: "AI 默认一招通吃：拿到任何 prompt 都执行同一套流程。但同一个意图（『帮我做一个 X』）背后可能是『我已经决定了』或『我还没决定』两种状态——后者下面 AI 应该走推荐流程，前者应该走确认细节。混着处理会让推荐型用户被当成执行用户、执行型用户被多问一轮。",
      therefore: "skill 入口第一步是看输入类型（不是看意图），按类型分到不同子流程。子流程之间不互访——0A 只做确认、0B 只做推荐，确认完接执行、推荐完才进入 0A。",
      useWhen: "skill 服务的用户有 ≥2 种典型状态（已决定 vs 没决定，已有材料 vs 没材料），且不同状态下『下一步该做什么』完全不同。",
      howToReuse: "1. 列出用户来的时候可能处于的 2-3 种状态；2. 写一张分流表（特征 → 路径 → 示例）；3. 每条路径单独写子流程，不共用步骤；4. 入口 prompt 第一件事就是看分流表判断走哪条；5. 让 AI 在不确定时反问，而不是默认走主路径。",
      antiExample: "把分流写成 if-else 但所有分支都跑同一段调研逻辑——这不是分流，是装饰。真分流的标志是『不同分支问的问题不同、依赖的资源不同、产出形态可能不同』。",
      cost: "维护成本：每加一种状态就要加一条分支和子流程。当状态种类 >5 时分流表本身变成认知负担。这时要考虑合并相邻状态。",
      seenIn: "nuwa-skill（Phase 0 明确人名 vs 模糊需求）、web-video-presentation（输入是文章/口播稿/空主题三分流）。",
      relatedPatterns: [
        { to: "P2", label: "改起来还便宜的位置 checkpoint", relation: "搭配用：分流后通常要走 checkpoint 才进昂贵执行" },
        { to: "P7", label: "自包含产物目录", relation: "前置：分流确定了路径后才能决定目录怎么建" }
      ]
    },
    {
      name: "Pattern 2 · 趁所有东西还在文本里停一下（两次）",
      status: "候选",
      prevents: "AI 闷头跑完全程才发现方向错。某个早期判断（提炼模型对不对、调研够不够）改起来在早期 20 分钟、在装配后 2-3 小时——成本差一个数量级。",
      therefore: "在『主观判断最重』的阶段前后各设一个用户审核点，展示钉死格式的摘要给用户审，问钉死的问题等钉死的回应。AI 自由度在这一步卡死——不让发挥展示形式。",
      useWhen: "整套流程 ≥3 个阶段、后段成本远高于前段（比如装配代码成本远高于写计划成本）、且早期判断可能错。",
      howToReuse: "1. 找出整套流程里『主观判断最重』的那两步（调研够不够 / 提炼对不对 / 计划合不合理）；2. 每步之后设一个 checkpoint；3. 用脚本生成钉死格式的摘要（如 nuwa-skill 的 merge_research.py）；4. 让 AI 把摘要原样贴给用户、问一句钉死的问题；5. 不让 AI 在 checkpoint 时自由发挥（注意力会被形式吸走）。",
      antiExample: "在每一步之间都加 checkpoint——这就是『礼貌询问』而不是 checkpoint。checkpoint 必须卡在改起来还便宜的位置上，太密就成了 polling。",
      cost: "用户被打断 2-3 次；如果用户秒过 OK 没仔细看，价值被吃掉。设计时要让摘要简短到『秒看也能看出明显问题』。",
      seenIn: "nuwa-skill（Phase 1.5 调研审 + Phase 2.5 提炼审）、web-video-presentation（Checkpoint Plan 5 件事确认）。",
      relatedPatterns: [
        { to: "P3", label: "脚本钉死高频结构动作", relation: "搭配用：checkpoint 展示用的摘要必须脚本生成，不让 AI 现写" },
        { to: "P5", label: "三重验证筛框架", relation: "后面接着用：Phase 2.5 审的就是三重验证的结果" }
      ]
    },
    {
      name: "Pattern 3 · 脚本钉死高频结构动作",
      status: "候选",
      prevents: "AI 自由发挥执行可重复机械动作（统计、格式化、合规检查）——会做错也会做漂浮（每次格式略不同）。用户每次看到的格式都不一样，注意力被形式吸走。",
      therefore: "把高频、机械、可数清楚的动作做成脚本（Python/shell）——AI 调用脚本而不是自己生成结果。脚本输出格式钉死，AI 把脚本输出原样贴给用户。",
      useWhen: "某个动作是机械的（数 URL、检查 6 条规则、生成表格）+ 在整套流程里出现 ≥2 次 + 错了后面的步骤会信错信息。",
      howToReuse: "1. 找出整套流程里那些『不需要判断只需要数清楚或对照清单』的动作；2. 写脚本（短的，几十行 Python 就够）；3. 在 skill 里调用脚本而不是让 AI 现做；4. 脚本输出钉死格式（表格 / PASS-FAIL / 摘要）；5. 不让 AI 包装脚本输出。",
      antiExample: "把所有动作都脚本化——包括需要判断的（如『判断这个论点是不是真心智模型』）。需要判断的动作脚本化反而硬伤——脚本没有判断空间。",
      cost: "维护成本：脚本要跟 skill 一起更新；用户环境要装 python；脚本依赖（grep/正则）出错时调试比 AI 自己判断更难。",
      seenIn: "nuwa-skill（merge_research.py 出调研表 / quality_check.py 检查 6 条 / download_subtitles.sh + srt_to_transcript.py 字幕清洗）、web-video-presentation（scaffold.sh 起项目）。",
      relatedPatterns: [
        { to: "P2", label: "改起来还便宜的位置 checkpoint", relation: "搭配用：checkpoint 展示用的摘要必须脚本生成" },
        { to: "P8", label: "三层后置验证", relation: "搭配用：第一层就是脚本质检" }
      ]
    },
    {
      name: "Pattern 4 · 并行多 agent 切维度调研",
      status: "候选",
      prevents: "AI 串行做调研：上一阶段的结论会无意识筛选下一阶段的证据，越查越觉得自己对。最后产出过简化画像，遗漏独立框架。",
      therefore: "切出 N 个独立维度（5-7 个最佳）、每个维度 spawn 一个并行 subagent、每个 agent 启动时没有别人的结论。结果各自存进文件、最后再 merge。",
      useWhen: "调研对象有 ≥4 个独立维度可切（如人物 = 著作/对话/表达/他者/决策/时间线 6 维），且各维度的证据相对独立。",
      howToReuse: "1. 想清楚目标可以切成几个独立维度；2. 给每个 agent 一份统一的 prompt 模板（搜什么、输出哪里、质量要求一致）；3. 每个 agent 必须存进文件到固定路径（不存盘等于没做）；4. 所有 agent 启动时只看自己那一维；5. 用脚本 merge 结果，不让 AI 现合并（结果会有偏倚）。",
      antiExample: "切 12 个维度——过细。每个 agent 拿到的搜索范围太窄、信息总量不够。最佳维度数在 5-7 个。",
      cost: "spawn 多 agent 的 token 成本；维度切不开时反而拖累（比如『书评』和『传记』很重叠）；merge 时需要去重和矛盾检测。",
      seenIn: "nuwa-skill（6 维 swarm）、web-video-presentation（多章并行开发模式）。",
      relatedPatterns: [
        { to: "P2", label: "改起来还便宜的位置 checkpoint", relation: "后面接着用：6 个 agent 跑完后必须 checkpoint" },
        { to: "P7", label: "自包含产物目录", relation: "前置：agent 存进文件需要目录已建好" }
      ]
    },
    {
      name: "Pattern 5 · 三重验证筛框架",
      status: "候选",
      prevents: "AI 凭印象挑出名的论点当核心——『听起来对』就升级。但常识也听起来对，分不出『真独特视角』和『所有人都这样想』。",
      therefore: "用 3 个机械标准筛：跨域复现（≥2 不同领域出现）+ 生成力（能推断对新问题立场）+ 排他性（不是所有聪明人都这样想）。三个都通过的进核心那一节；只通过 1-2 个的退一档进第二档那一节；一个都没通过的不要。",
      useWhen: "需要从一堆候选里挑『真独特/真核心』的东西——心智模型、设计原则、价值观、风格特征。",
      howToReuse: "1. 写出候选池（30-50 个）；2. 给每个候选画一张三标准表（每个标准列证据/不通过原因）；3. 三个都通过的进核心那一节；4. 只通过 1-2 个的退一档到第二档；5. 按排他性排序、留 top 3-7（贪多不达）。",
      antiExample: "把三个标准做成『打分 1-10 加权求和』——这又回到品味判断了，失去了机械标准的价值。三重要做成『过/不过』二值判断。",
      cost: "需要候选池要足够大（>20）才有筛的意义；某些极小众思想家本来候选就少（5-6 个），筛了反而剩不下；『跨域』的定义要先约定清楚。",
      seenIn: "nuwa-skill（心智模型三重验证）。",
      isPlatformGap: "这是设计选择，不是平台该补——但写出来一个三重验证表后，可以做成通用工具（『给我筛框架』），跨多个 skill 复用。",
      relatedPatterns: [
        { to: "P2", label: "改起来还便宜的位置 checkpoint", relation: "后面接着用：三重验证结果在 Phase 2.5 给用户审" },
        { to: "P6", label: "矛盾不调和", relation: "搭配用：三重验证排序时遇到矛盾，按矛盾不调和原则保留" }
      ]
    },
    {
      name: "Pattern 6 · 矛盾不调和（深度的来源不是消除矛盾）",
      status: "候选",
      prevents: "AI 把发现的矛盾调和成一个看着自洽的假平均——但人物深度恰恰在矛盾里。芒格反对从众但追随 Buffett、讲极简但投奢侈品——调和掉就成纸片人。",
      therefore: "调研时发现矛盾原样记录，提炼时按 3 类（时间性 / 领域性 / 本质性）归类，装配时单独列在『核心张力』那一段。三类处理方式不同但都不消除。",
      useWhen: "调研对象是真人（不是规范文档）、且这个人在不同场合 / 不同时期 / 不同领域有可能说过相反的话。",
      howToReuse: "1. 调研时只记录、不判断、不调和；2. 提炼时归类（时间性记演化轨迹、领域性分领域记、本质性单列）；3. 装配时单独成段；4. 在诚实边界 / 自检清单里检查『至少有 2 处矛盾被保留』——如果 0 矛盾说明你调和过了。",
      antiExample: "把矛盾写成『他在 X 时是 A 但在 Y 时是 B，所以本质上他认为...』——这是调和，不是保留矛盾。保留矛盾的写法是『他在 X 时说 A，在 Y 时说 B，至今未明确统一过这两点』。",
      cost: "用户可能不喜欢『不自洽』的人物画像——觉得『AI 没整理好』。需要在诚实边界里解释为什么矛盾被保留。",
      seenIn: "nuwa-skill（Phase 2.4 矛盾与张力 + 三类处理原则）。",
      relatedPatterns: [
        { to: "P5", label: "三重验证筛框架", relation: "搭配用：三重验证排序时遇矛盾候选用矛盾不调和处理" }
      ]
    },
    {
      name: "Pattern 7 · 自包含产物目录（为开源分发硬设计）",
      status: "候选",
      prevents: "skill 在本机能跑、发给别人 zip 一打就少一半——产物存到外部目录（`~/Documents/research/` 这种）、依赖本地特殊工具、依赖未声明的环境变量。",
      therefore: "所有产物全部存进 skill 目录内部，从 Phase 0.5 建目录就钉死结构。spawn agent 时 prompt 里强制存进文件路径必须在目录内部。最终产物 zip 一打就能给别人用。",
      useWhen: "skill 设计为可分发（开源、内部共享、跨机器迁移）。",
      howToReuse: "1. Phase 0.5 建出完整目录结构（含 sources/、scripts/、references/research/）；2. spawn agent 时 prompt 里写明存进文件路径；3. 存进文件前检查路径是否在目录内部；4. 大文件（PDF、视频）也存进 sources/、不留外部链接；5. 最后用 zip / tar 测一次能不能直接给别人用。",
      antiExample: "把『占空间太大』作为理由存到外部——但破坏了自包含原则。改进：保留压缩版（如视频改 transcript）或者标注必须的外部资源。",
      cost: "skill 目录会变大（含调研产物、源 PDF、字幕等）——单个 perspective skill 可能 50-200MB；目录结构变复杂；不能利用机器现有资源。",
      seenIn: "nuwa-skill（Phase 0.5 强制目录结构 + sources/ 存所有素材）。",
      relatedPatterns: [
        { to: "P1", label: "入口先分流", relation: "前置：分流决定路径后建对应目录" },
        { to: "P4", label: "并行多 agent 切维度调研", relation: "前置：agent 存进文件需要目录已建好" }
      ]
    },
    {
      name: "Pattern 8 · 三层后置验证（脚本 + 独立 agent + 多视角评审）",
      status: "候选",
      prevents: "AI 自评——自己写的自己审会偏好评好分；单层验证只能抓一种坏（脚本只抓结构性缺漏、抓不到方向偏；盲测能抓方向偏、抓不到使用体验差）。",
      therefore: "三层各抓一种坏：脚本（客观结构性标准）+ 独立 subagent 盲测（避自评偏差，sanity/edge/voice 三种）+ 多视角后置评审（不同评审视角合并）。三层都过才交付。",
      useWhen: "skill 产出是给用户长期使用的关键产物（perspective skill / 落地代码 / 决策模型），质量风险高。",
      howToReuse: "1. 列 6 条以下能数清楚的标准、写脚本检查；2. 选 2-3 个『已知立场对照 / 边缘问题不确定性 / 100 字风格』测试，spawn 独立 subagent 跑；3. 并行 spawn 2 个不同视角的评审 agent（如 optimizer 视角 + creator 视角）；4. 主 agent 合并不冲突改动 → 展示变更摘要给用户确认；5. 迭代上限设 2 次防无限打磨。",
      antiExample: "三层都让同一个 agent 跑——失去自评偏差防护。三层的核心机制是『不同视角』，同 agent 看就缩成单层。",
      cost: "token 成本（额外 spawn 3-5 个 agent）；时间（验证延长一倍）；用户被打断（最后变更摘要要确认）；迭代上限可能切掉本来能修好的第 3 次。",
      seenIn: "nuwa-skill（Phase 4 三盲测 + Phase 5 双 agent 精炼）。",
      relatedPatterns: [
        { to: "P3", label: "脚本钉死高频结构动作", relation: "搭配用：三层中的第一层就是脚本质检" },
        { to: "P2", label: "改起来还便宜的位置 checkpoint", relation: "区别于：checkpoint 是用户审、三层后置验证是 AI/脚本审" }
      ]
    }
  ],

  diagrams: [
    {
      title: "5 个 Phase 加 2 个用户审核点的整套流程",
      type: "flow",
      image: "assets/diagrams/main-flow.svg",
      description: "顶层流程图——女娲把『造人物 skill』拆成 5 个 Phase，中间有两个用户审核点（Phase 1.5 / 2.5）。9 个 stage 是这些 Phase 内部的展开，不画在图里（节点太多会糊），下面索引表负责。"
    },
    {
      title: "目录结构与调研产物落到哪里",
      type: "file-map",
      image: "assets/diagrams/package-map.svg",
      description: "自包含目录结构 + 6 个 agent 各自存到哪个文件——为什么所有产物必须存进 skill 目录内部。"
    },
    {
      title: "三个标准筛心智模型的判定流程",
      type: "decision-tree",
      image: "assets/diagrams/decision-tree.svg",
      description: "跨域复现 + 生成力 + 排他性三个标准把候选论点机械分到三档：三个都通过的算心智模型；只通过 1-2 个的退一档变成决策启发式；一个都没通过的不要。"
    }
  ],

  applyIt: {
    summary: "如果你要写一个『生成 X 的 skill』（人物 perspective / 设计文档 / 调研报告 / 任何需要先调研再产出的东西），nuwa-skill 这个形状能直接抄。下面是一份清单 + 起手 prompt。",
    checklistTitle: "从坏 AI 输出反推到 skill 形状",
    checklistHeading: "把这几件事写下来再写代码",
    checklistCardTitle: "12 条清单",
    checklist: [
      "列出『AI 拿到这种 prompt 默认会怎么做坏』——这是你的 skill 要拦的目标，至少写 5 条。",
      "看你的输入是不是有 ≥2 种状态（已决定 vs 没决定 / 有材料 vs 没材料）——是就设入口分流，写一张分流表。",
      "把整套流程切成 ≥3 个阶段，每段产出有名字、有存进文件路径。",
      "找出『主观判断最重』的那 1-2 个阶段——在它们前后设用户审核点（改起来还便宜的位置 checkpoint）。",
      "审核点用脚本生成钉死格式的摘要，AI 不能自由发挥展示形式。",
      "调研类阶段切 5-7 个独立维度、并行 spawn agent，每个存进文件到固定路径——不存盘等于没做。",
      "如果有『从候选池里挑核心』的提炼步骤，写 3 个机械标准（不是品味），分『过/降/丢』三档。",
      "调研发现矛盾不调和——分时间性/领域性/本质性归类，全部保留。",
      "所有产物存进 skill 目录内部，不依赖外部文件——目录 zip 给别人就能用。",
      "信息源有黑名单（永远拒绝的）+ 优先级（一手 > 二手 > 推测）—— 在 agent prompt 里写死。",
      "最后产物有 ≥3 层验证：客观脚本（机械标准）+ 独立 subagent 盲测（避自评）+ 多视角后置评审（视角差异）。",
      "迭代上限设 ≤2 次——防止无限打磨。不通过时交付当前最优 + 在诚实边界标薄弱维度。"
    ],
    starterPrompt: "我要写一个 skill，目标是『生成 [你的产物，如人物 perspective skill / 设计文档 / 调研报告]』。\n\n请按以下顺序帮我先做设计层决定（不写代码）：\n\n1. 列出 AI 拿到这种 prompt 默认会怎么做坏（≥5 条）\n2. 看输入是不是有 ≥2 种状态——是就设入口分流表\n3. 把整套流程切成 ≥3 个阶段，每段产出命名\n4. 找出『主观判断最重』的 1-2 个阶段——在它们前后设用户审核点\n5. 调研类阶段切 5-7 个独立维度并行\n6. 如果有提炼步骤，写 3 个机械标准筛核心\n7. 列出后置验证三层（脚本 + 盲测 + 多视角评审）\n8. 列出自包含目录结构\n9. 列出信息源黑名单（如果有调研）\n10. 列出诚实边界不能讨价还价的规则（信息不足时怎么诚实标注）\n\n按这个顺序输出。每条配一个 1 行示例（用我这个 skill 的具体内容）。",
    nextSteps: {
      author: [
        "把 SKILL.md 里的 Phase 0 分流表加上『冷门人物』+『主题 skill』+『蒸馏自己』三个边界场景——目前在『特殊场景』那一段 写了规则但没画进分流表，新用户容易错过。",
        "merge_research.py 算 URL 数时把同域名多 URL 合并算 1 个——目前算 5 个，会让用户高估覆盖度。",
        "quality_check.py 的『一手来源占比』检测是基于关键词匹配（一手/primary）—— 如果 SKILL.md 没用这些标记词就跳过检查。改成必填字段，模板里强制要求每条来源标注一手/二手。",
        "Phase 5 双 agent 精炼的两个 agent prompt 还在 SKILL.md 里散写——抽出来到 references/polish-prompts.md，方便维护。",
        "examples/ 里 14 个 perspective 质量参差——挑 3 个最好的标注为『参考样板（写完应该长这样）』、其他归档；新用户读到差的会以为合格就这样。"
      ],
      thief: [
        "如果你做一个『写文章』的 skill：把 0A/0B 分流套用为『有提纲』vs『没提纲』；6 维 swarm 套用为『论点/案例/数据/反驳/类比/结构』并行调研；三重验证套用为『新颖性 + 可执行 + 排他性』筛核心论点。",
        "如果你做一个『代码 review』的 skill：把 Phase 1.5 套用为『扫描完代码先给一份摘要让用户审，再开始具体 review』——避免直接进 PR 评论。",
        "如果你做一个『PRD 生成』的 skill：把 Phase 2.5 套用为『需求归类完先让用户审框架，再装配 PRD』——避免装完 8000 字才发现框架方向错。",
        "如果你做一个『学习计划生成』的 skill：把『矛盾不调和』套用为『学习目标之间的张力（深度 vs 广度 / 速度 vs 巩固）单独列出来，不替用户消除』。",
        "Agentic Protocol 这招最容易偷——任何会面对事实型问题的子产物，都给它一段『先调研再说话』的工作流，研究维度从核心框架反推。"
      ]
    }
  }
};
