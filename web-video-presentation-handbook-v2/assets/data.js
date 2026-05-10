window.handbook = {
  meta: {
    title: "Web Video Presentation 解剖手册",
    sourcePath: "/Users/guwanhua/git/garden-skills/skills/web-video-presentation",
    audience: "想偷招的人 / 还没用过这个 skill 的 AI",
    outputMode: "multi-page-web-handbook",
    generatedFor: "让读者看见：当我作为 AI 拿到一篇文章和一个'做成视频网页'的目标，这个 skill 是怎么把我从'拼几页大字 PPT'拦下来、改写成'内容 → 节奏 → 主题 → 章节 → 音频 → 录屏'的完整生产线的。"
  },

  overview: {
    domainPrimer: "这个 skill 是一份'把文章做成可录屏视频网页'的工作流。它不是模板，也不是组件库——它是一条流水线，告诉 AI：拿到文章后先把它改成能念的口播稿（script.md），再写一份不带动画的开发计划（outline.md），让用户一次确认稿子 / outline / 主题 / 素材 / 开发模式，然后用 Vite + React + TS 脚手架建项目，先做透第一章作为风格锚点，再把第 2-N 章按用户选的模式做完，每章的口播文本落到 narrations.ts 这个运行时真相源，最后可选合成音频走 ?auto=1 自动播放录屏。每个阶段都明确告诉 AI：现在该决定什么，不该提前决定什么。",
    oneLiner: "这个 skill 把世界看作：AI 拿到'把文章做成视频'会本能理解成'把文章拆成几页大字 PPT 加几个 fade 动画'。它的核心动作是把视频生产拆成 4 个不会互相污染的阶段（内容 / 对齐 / 开发 / 音频），每阶段明确告诉 AI 该决定什么、不该提前决定什么；运行时谁是真相源（narrations.ts）也写死，防止 step 数 / 音频文件 / Auto 录屏漂移。",
    wowMoment: "它不让我从文章直接跳到 React。它先逼我把文章改成 script.md（能念的口播稿）+ outline.md（不带动画的开发计划），让用户在最便宜的返工点一次确认 5 件事（稿子 / outline / 主题 / 素材 / 开发模式），然后用脚手架建项目，先做透第 1 章作为风格锚点让用户验收，再扩展第 2-N 章；每章的 step 数和口播文本都以 narrations.ts 为运行时真相源，最后可选合成音频走 Auto 模式一镜到底录屏。",
    badResultPrevented: "防止把'文章做成视频'理解成'文章切几段 → 每段做一页大字 PPT → 加几个 fade 动画 → 结束'；防止 outline 写死动画导致章节开发退化成翻译机；防止网页 step 数 / 口播文本 / 音频文件各管一套导致录屏错位；防止没有真实样板就并行所有章节导致风格全跑偏；防止重复阶段（每章实现）因长会话上下文疲劳而降级成纯文字 PPT。",
    whyThisShape: "本份手册按 HANDBOOK-FORMAT.md 拆成 7 章：Overview 讲为什么值得看 + 一个具体例子；Walkthrough 用 14 个 stage 讲 AI 怎样被一步步拦截、改写、暂停、自检；Glossary 单独成章列 10 个核心术语，每条 5 个字段；File Map 讲 SKILL.md + 7 份 reference + 模板项目各管什么；Design Choices 讲 8 个关键设计选择各防什么坏 AI 行为；Patterns 列 9 张候选 pattern card；Apply It 给读者一份自己写类似 skill 的清单。"
  },

  example: {
    userRequest: "我有一篇文章，讲 GPT Image 新模型的文字渲染能力。帮我做成一个 3 分钟 B 站风格视频网页。",
    whyThisExample: "它落在这个 skill 的主路径：用户给的是原始文章而不是现成口播稿，目标是 16:9 视频网页而不是普通页面，风格要求是 B 站，所以口播要能说、节奏要快、开头要抓人。这个例子覆盖内容编写 / Checkpoint Plan / 网页开发 / 音频合成 / 录屏全流程。",
    expectedOutput: "一个 Vite + React + TypeScript 项目（presentation/）：每章一个 src/chapters/<NN>-<id>/ 文件夹，包含 Chapter.tsx / Chapter.css / narrations.ts 三件套；可选合成的逐 step 音频在 public/audio/<id>/<N>.mp3；用 ?auto=1 模式可以一镜到底录屏。沿途产出：article.md / script.md / outline.md 三份文本计划，每份完成后必须走自检 → 修复 → 再汇报。"
  },

  walkthrough: [
    {
      id: "triage-input",
      title: "判断用户给了什么，不能默认走同一套",
      summary: "skill 先让我看用户给的是原始文章 / 现成口播稿 / 还是空主题——三种入口走不同路径，空主题甚至要反问用户先给素材，不能凭空构思内容。",
      preTest: "用户的 prompt 刚到——「我有一篇文章讲 GPT Image 文字渲染能力，做成 3 分钟 B 站视频网页」，附 article.md。下一步你的本能是直接开建项目、还是开始写 script.md、还是别的？写下来再看下面我（被 skill 拦着的 AI）实际怎么走。",
      narrativeBody: [
        { kind: "para", text: "我现在拿到的是一段话 + 一个 article.md 附件。第一秒我的本能想立刻开建项目——这是最有进度感的下一步。" },
        { kind: "para", text: "skill 让我先停下来，对照 SKILL.md Phase 1.1 的输入类型表分流：" },
        {
          kind: "code",
          lang: "markdown",
          text: "| 用户给的东西 | 我该做什么 |\n|---|---|\n| 原始文章 | 一次产出 script.md + outline.md |\n| 现成口播稿 | 落盘成 script.md，再生成 outline.md |\n| 只有主题 | 反问用户先给素材或大纲，不替他构思 |"
        },
        { kind: "para", text: "我看用户的 article.md：标题、段落、引用都在，是书面文章。所以走第 1 行——内容编写阶段，一次产出 script + outline。" },
        { kind: "para", text: "为什么先分流而不是直接做？因为三种输入需要的下一步动作完全不同：" },
        { kind: "list", items: [
          "把现成口播稿当文章再改写——信息会丢一轮（口语化对口语化，越改越摘要）。",
          "把空主题硬当文章——agent 替用户构思了内容，越权。表面像在帮忙，实际把内容设计权偷过来了。",
          "把原始文章直接拿去开建网页——跳过节奏 / 画面分工，必然回到大字 PPT 失败模式。"
        ]}
      ],
      receives: "用户的请求 + 一段原料（文章 / 口播稿 / 或空主题）。",
      reads: ["SKILL.md Phase 1.1 输入类型表"],
      blockedShortcut: "不能把所有输入都当成文章直接生成 script + outline；空主题不能由 agent 凭空构思内容；现成口播稿也不能再次改写。",
      action: "对照表分流：原始文章 → 一次产出 script.md + outline.md；现成口播稿 → 落盘成 script.md + outline.md（简化版）；空主题 → 反问用户先给素材，skill 不替用户构思内容。",
      output: "一条明确的内容编写路径。",
      nextConsumer: "Phase 1.2 内容编写。",
      reusableMove: "入口先分流，不要让一个 skill 用同一套动作处理所有原料形态——空原料就反问，不要硬凑。",
      challenges: [
        "用户给的是 article.md 但内容只写了一半（明显未完成）——算「原始文章」走 Phase 1.2 还是反问让用户先写完？依据是什么？",
        "用户给一个 URL 而不是 markdown 文件——你自己抓还是反问？抓的话放哪个目录？",
        "用户给两篇相关文章希望合成一个视频——分流表没列这种情况。skill 该让你做什么：合并 article.md 后走 Phase 1.2、还是先反问哪篇主哪篇辅？"
      ]
    },
    {
      id: "produce-script",
      title: "生成 script.md：把文章改成能念的口播节拍稿",
      summary: "skill 让我先按 SCRIPT-STYLE.md 把书面文章改成 B 站风口播稿——能说出口，但信息密度不能丢。我用 --- 切节拍。",
      preTest: "你和我盯着 article.md 第一段：「GPT-Image-1 在中文海报场景下文字渲染准确率从 64% 提升到 89%，但在复杂排版场景下仍存在约 11% 的局部错误。」让你把这一段改成 B 站口播稿，你会怎么改？写一段试试再往下看。",
      narrativeBody: [
        { kind: "para", text: "skill 让我先读 references/SCRIPT-STYLE.md。它给我三层标准：形式（短句、能念）、风骨（信息保留、不丢数字）、念出来（去 AI 朗读腔、自然节拍）。" },
        { kind: "para", text: "把上面那段书面句改成口播，我的版本：" },
        {
          kind: "code",
          lang: "markdown",
          text: "文字这块是真变强了。\n\n---\n\n以前一张海报里只要有中文，基本就露馅。\n\n---\n\n现在不一样了。海报里的中文，准确率从 64% 提到了 89%。\n\n---\n\n但复杂排版下还是会糊——大概十张里有一张。"
        },
        { kind: "para", text: "三个改动点：" },
        { kind: "list", items: [
          "长被动句变短主动句，能说出口（「文字这块是真变强了」可以一口气念）。",
          "64% / 89% / 11% 这三个数字都保留——这是论证支柱不能丢。「十张里有一张」是 11% 的口语化，不是把数字砍掉。",
          "用 --- 切自然节拍，每段一个完整想法。--- 后面会影响 outline 的 step 切分（每个 --- 大致对应一个 step）。"
        ]},
        { kind: "para", text: "反例（看着像但不是）：" },
        { kind: "list", items: [
          "改成「GPT Image 在文字方面有了很大进步，让我们一起来看看」—— 信息全丢了，AI 朗读腔。",
          "改成「这个模型的中文文字渲染准确率显著提升至 89%」—— 念出来卡，「显著提升至」不是口语词。",
          "把 64% / 89% / 11% 全砍了只留「更准了」—— 信息密度崩，观众听完没记住任何具体事。"
        ]},
        { kind: "para", text: "这一步不只是改写，是给后面的章节切分埋了节拍点。下游会读这份 script.md 三次：outline 切 step 时参考、narrations.ts 写文本时参考、音频合成时是文本来源。" }
      ],
      receives: "article.md（用户原文）或用户已有的口播稿。",
      reads: ["references/SCRIPT-STYLE.md", "article.md"],
      blockedShortcut: "不能把书面文章直接搬到视频里；不能为了「口语化」把数字、案例、论证链剪没；不能写 AI 朗读腔。",
      action: "按 SCRIPT-STYLE.md 三层标准（形式 / 风骨 / 念出来）改写 article.md：去除书面长句、去除 AI 朗读腔、用 --- 切自然节拍、保留关键事实和数字。",
      output: "script.md（口播节拍稿）。",
      nextConsumer: "outline.md 切章节 / step 时参考节拍；narrations.ts 写口播文本时回查；音频合成读它的语义。",
      reusableMove: "先把原始材料转成执行格式，再让后续阶段吃这个格式——不要让一个阶段同时管原料和成品。",
      challenges: [
        "原文有一句「该模型基于扩散架构，参数量约 70 亿」—— 你会保留这个细节进 script 还是砍？依据是什么（视频长度 / B 站观众构成 / 章节切分）？",
        "改完发现某段口播比原文长——这违反「口语化」的直觉吗？应该再压缩还是接受？",
        "如果用户给的目标受众是技术深度 5 分钟而不是 3 分钟 B 站——三层标准里哪一层会松、哪一层不松？",
        "SCRIPT-STYLE.md 没明确说的边界：连续 5 个 --- 切分形成一段超快节奏，是合规的还是违规的？怎么判断？"
      ]
    },
    {
      id: "preserve-article",
      title: "保留 article.md，因为画面信息密度需要它",
      summary: "skill 不让我生成 script.md 后删掉原文。script 管节奏，article 管画面密度——口播稿为了好听会压缩细节，但画面需要数字 / 引用 / 案例 / 出处，必须回原文找。",
      preTest: "script.md 写好了，能念能说。article.md 还在原位。你下一步本能是 rm article.md 清理工作目录、还是保留？写下你的判断再读。",
      narrativeBody: [
        { kind: "para", text: "skill 不让我删 article.md。SKILL.md 工作目录约定明确写：article.md 用户给原文时必有——不删！" },
        { kind: "para", text: "为什么？因为 script 和 article 管两件不同的事：" },
        {
          kind: "code",
          lang: "text",
          text: "script.md   管什么时候说什么 —— 节奏源\narticle.md  管画面能挂多少细节 —— 细节源"
        },
        { kind: "para", text: "口播稿为了好听会压缩。「文字这块是真变强了」这句听起来够了，但画面里光这 4 个字撑不住——观众盯着一行字看 3 秒，画面就空了。" },
        { kind: "para", text: "画面需要的细节是这种：「GPT-Image-1 / 2024 年发布 / 中文海报场景 / 64% → 89% / 复杂排版 11% 错误率 / 同期 DALL-E 3 中文 ≤ 50% / 案例图三张」。这些都是从 article.md 抽的，不在 script.md 里。如果我现在删了 article，等到第 1 章实现时回头找这些细节就找不到了——只能瞎编或砍画面。" },
        { kind: "para", text: "下游怎么用 article：" },
        { kind: "list", items: [
          "outline 信息池：每章首段从 article 抽 3-5 条可挂细节。",
          "Phase 2 章节实现：写 Chapter.tsx 时回 article 找具体数据 / 引用 / 出处。",
          "narrations.ts：保持口播语义但回 article 校验关键事实没漂。"
        ]}
      ],
      receives: "已生成的 script.md + 原始 article.md。",
      reads: ["references/CHAPTER-CRAFT.md 双源原则"],
      blockedShortcut: "不能因为有了口播稿就删掉或忽略原文；不能让一个中间文件吞掉全部职责。",
      action: "明确两个源各管什么：script.md 管口播节奏（什么时候说什么）、article.md 管画面密度（每章可挂多少细节）。outline 信息池从 article 抽；后续单章实现时再回 article 找具体数字、引用、案例、对比。",
      output: "双源结构：article（细节源）+ script（节奏源）。",
      nextConsumer: "outline 写信息池时；每章实现挂画面细节时。",
      reusableMove: "两个下游需要不同维度信息时，不要让一份中间文件吞掉全部职责——保留两个源，明确每个管什么。",
      challenges: [
        "用户给的不是 article.md 而是直接发了 script.md（已经口语化的稿子）—— 这种情况没有 article.md，CHAPTER-CRAFT 双源原则怎么落地？是反问用户要原文，还是接受单源？",
        "article.md 内容是 script.md 的 5 倍——这说明改写过度了吗？还是说 article 本来就该比 script 信息密度高很多？怎么判断改写比例合不合理？",
        "Phase 2 实现到第 5 章时发现 article 里某段引用是错的（用户写错了）——你修 article、修 script、还是只在 Chapter.tsx 里跳过这条引用？三种做法的代价是什么？"
      ]
    },
    {
      id: "produce-outline",
      title: "生成 outline.md：开发计划，不是视觉规划",
      summary: "outline 写章节、step、估时、信息池、素材清单——不写动画 / CSS / 毫秒级时长。这些视觉判断留给单章实现，避免上游写死动画让下游退化成翻译机。",
      preTest: "script.md + article.md 都在了。outline 该写多细？章节切分没问题、step 切分也合理——但要不要写每个 step 的动画类型（blur clear / wipe / 弹簧）？要不要写每 step 的毫秒时长？写下你的判断再读。",
      narrativeBody: [
        { kind: "para", text: "OUTLINE-FORMAT.md 给我一张「必须写 / 不要写」边界表：" },
        {
          kind: "code",
          lang: "text",
          text: "必须写                              不要写\n─────                              ─────\n章节切分                           具体动画类型（blur clear / wipe）\n每章 step 数 + 估时                CSS 实现手段（filter / SVG / clip-path）\n每个 step 屏幕内容                 毫秒级时长（~2.5s / 80~120ms）\n每章首段信息池                     持续微动 / 错峰量等微观节奏\n末尾全片素材清单"
        },
        { kind: "para", text: "为什么这条边界？因为 outline 阶段我手上只有节奏（script）和细节（article）。视觉判断需要的「当前章和上下章关系」、「主题 token 实际颜色」、「第 1 章定下来的字号尺度」这些变量要等到 Phase 2 实现时才齐全。outline 写死动画 → 第 5 章实现的 agent 就只能照办，哪怕这一章其实更适合做「文字被切开」的演示。这是上游抢了下游的判断权。" },
        { kind: "para", text: "GPT Image 视频的 outline 第 1 章片段（真材料）：" },
        {
          kind: "code",
          lang: "markdown",
          text: "## 第 1 章 · 这个模型为什么值得讲（5 step / 估时 32s）\n\n**信息池：**\n- GPT-Image-1 发布于 2024\n- 中文海报场景准确率 64% → 89%\n- 复杂排版 11% 错误率\n- 同期 DALL-E 3 / Midjourney v6 在中文上仍 ≤ 50%\n\n**素材清单：**\n- 三张对比图（GPT Image / DALL-E 3 / Midjourney 同 prompt）\n- 一张 64% → 89% 的对比表\n- B 站封面候选 2 版\n\n**Step 1：** hero —— GPT-Image-1 名字 + 一句话标语\n**Step 2：** 64% → 89% 大数字对比，附「中文海报」小注\n**Step 3：** 三模型对比图依次出现\n**Step 4：** 11% 错误率 —— 给一个具体反例\n**Step 5：** 留一个钩子：「那它是怎么做到的？」→ 进第 2 章"
        },
        { kind: "para", text: "注意没写：「Step 2 用 0.6s blur-in」、「Step 3 用 wipe 切换」。这些视觉判断留给 Phase 2.2 第 1 章实现时——那时候我会知道主题 token 的颜色对比度、字号尺度、和第 2 章的衔接关系。" }
      ],
      receives: "script.md + article.md + 目标时长 + 风格信号。",
      reads: ["references/OUTLINE-FORMAT.md", "script.md", "article.md"],
      blockedShortcut: "不能写具体动画类型（blur clear / wipe / 弹簧）；不能写 CSS 实现手段（filter / SVG / clip-path）；不能写毫秒级时长（~2.5s / 80~120ms）；不能写持续微动 / 错峰量等微观节奏。",
      action: "按 OUTLINE-FORMAT.md 切章节 → 每章切 step → 每步写屏幕内容（hero / 数据 / 标语 / 列表项）→ 每章首段抽信息池（数字 / 引用 / 案例 / 出处）→ 末尾列素材清单。outline 的「必须写 / 不要写」边界严守。",
      output: "outline.md（开发计划）。",
      nextConsumer: "Checkpoint Plan 让用户审；Phase 2 章节开发开工时按章读。",
      reusableMove: "上游规划内容边界，下游做实现判断——上游不要抢下游在信息齐时才该做的决定。",
      challenges: [
        "如果某 step 在 outline 里写「数据对比图依次出现」，第 1 章实现时发现这一 step 用「三个数字大字闪现 + 一张图收束」更打——可以改 step 数吗？outline 该重写还是直接在 Chapter.tsx 调？为什么？",
        "outline 估时第 1 章 32s，最后实现下来 45s——这算 outline 错还是 Phase 2 调整正常？要不要回头改 outline？",
        "用户在 Checkpoint Plan 时说想加双语字幕——这件事在 outline 范围里吗？是改 outline 还是开新文件？",
        "outline 信息池抽得太少（每章只 1 条）和抽得太多（每章 10 条）各会让下游怎么坏？怎么判断密度？"
      ]
    },
    {
      id: "self-check",
      title: "自检 → 修复，再汇报（不允许只转述 fail）",
      summary: "skill 不让我把「生成完文件」当交付。每份产出（script / outline / 章节代码）都必须走自检 → 修复 → 再汇报。优先级：Agent Teams > subAgent > 当前 agent 自检——不允许把 fail 项原样转述给用户而不修。",
      preTest: "script.md 和 outline.md 两份草稿都摆在你面前了。下一步是发给用户看，还是别的？写下你的判断再读。",
      narrativeBody: [
        { kind: "para", text: "skill 不允许把「生成完成」当「交付完成」。每份产出都要走自检 → 修复 → 再汇报。" },
        { kind: "para", text: "为什么这么严？因为「agent 写完后转述检查结果给用户」是装饰而不是闭环——用户以为我在交付，实际只是把问题清单发回去给他自己处理。这个 skill 把这种行为定义成失败。" },
        { kind: "para", text: "三层 reviewer 优先级：" },
        { kind: "list", items: [
          "首选：开 Agent Teams 独立 reviewer agent，给它 SCRIPT-STYLE.md 三层自检 + OUTLINE-FORMAT.md 自检清单。",
          "降级 1：开 subAgent 当 reviewer。",
          "降级 2：当前 agent 严格逐项核查（最不可靠，因为我已经看过这份内容多次，盲点多）。"
        ]},
        { kind: "para", text: "我跑这次的真实自检过程（GPT Image 视频）：" },
        {
          kind: "code",
          lang: "text",
          text: "[Reviewer subAgent 报告]\nSCRIPT-STYLE 三层：\n  形式 ✅ 短句 / --- 节拍\n  风骨 ✅ 数字 64% / 89% / 11% 都保留\n  念出来 ❌ Step 4 的「局部错误率约为 11%」是书面词\n\nOUTLINE-FORMAT 边界：\n  ❌ 第 3 章 step 3 写了「动画用 fade-in」（违反「不写动画」）\n  ❌ 第 1 章信息池只列了 2 条（OUTLINE-FORMAT 建议 ≥ 3）\n  ✅ 估时 / 章节切分 / 素材清单都完整"
        },
        { kind: "para", text: "拿到这份 fail 列表后我先按列修——不是先汇报：" },
        { kind: "list", items: [
          "Step 4 改成「十张里有一张会糊」。",
          "第 3 章「fade-in」删掉，先改成「小数字依次浮上来」——等等，「依次浮上来」也越界了，这是动效描述。再改成「三个数字逐个出现」（动作意图，留实现自由度）。",
          "第 1 章信息池补两条到 4 条。"
        ]},
        { kind: "para", text: "改完再向用户汇报：「script + outline 完成。自检发现 3 项 fail，已修：Step 4 念法 / 第 3 章动画词 / 第 1 章信息池。可以审稿了。」这才是完整闭环。" }
      ],
      receives: "草稿态的 script.md + outline.md。",
      reads: ["references/SCRIPT-STYLE.md 三层自检", "references/OUTLINE-FORMAT.md 自检", "SKILL.md 硬性自检协议"],
      blockedShortcut: "不能把「生成完成」等同于「交付完成」；不能把自检发现的 fail 列表原样汇报给用户但产出文件没改——那是把检查变装饰。",
      action: "优先开独立 reviewer agent（Agent Teams）核查清单 → 不行就开 subAgent → 都不行就当前 agent 严格逐项核查。拿到 fail 列表后先按列修，再向用户汇报「做完了 + 自检结论 + 改了什么」。",
      output: "自检通过的 script.md + outline.md。",
      nextConsumer: "Checkpoint Plan。",
      reusableMove: "检查必须接修复——审阅清单不接修复动作只是仪式。",
      challenges: [
        "Reviewer subAgent 报告里有一项 fail 是它误判（实际没问题）——你应该改文件还是回怼 reviewer？怎么判断 reviewer 误判？",
        "fail 列表 12 项，全改完会让交付时间从 2 小时变 5 小时——是默默改完再汇报，还是先告诉用户这个延期？",
        "如果 subAgent 也不可用（环境限制），降到当前 agent 自检——你怎么对抗「已经看过这份内容所以盲」的偏差？有没有自检小招？",
        "改完之后再跑一次 reviewer 还是直接交付？跑两次的理由 vs 不跑的理由各是什么？"
      ]
    },
    {
      id: "checkpoint-plan",
      title: "Checkpoint Plan：一次对齐 5 件事（硬节点）",
      summary: "script.md + outline.md 自检通过后必须停下来。skill 不让我直接进 Phase 2——所有东西现在还都是文本，改稿子 / 改 outline / 换主题 / 补素材都便宜；等 React / CSS / 动画都写完，任何方向错了返工都很贵。",
      preTest: "设想你和我坐同一把椅子上。script.md 自检过了，outline.md 自检过了，文件就在眼前。你下一步的本能是直接 npm run scaffold 开建脚手架，还是停下来问点什么？停的话——问几件事？写下你的答案，再往下看我（被 skill 拦着的 AI）实际怎么走。",
      narrativeBody: [
        { kind: "para", text: "我现在的本能是开始写代码。两份文本计划都自检过、看起来没毛病，下一秒我就想跑 scaffold.sh 把项目骨架建起来——这是最有'进度感'的下一步。" },
        { kind: "para", text: "skill 不让。它在 SKILL.md 里写了一个硬节点：Checkpoint Plan。" },
        { kind: "para", text: "为什么是硬节点？因为现在所有东西都是文本——改稿子、改 outline、换主题、补素材，每一项的返工成本都接近零。等我跑完 scaffold、写完 16 章 React 组件、调完 CSS、合成完音频，任何一个方向错了返工成本都翻几个数量级。skill 在我最便宜的返工窗口拦了我。" },
        { kind: "para", text: "拦的方式是让我一次问用户 5 件事——不是 1 件，也不是 10 件。1 件不够（用户审了稿子但主题没对，进 Phase 2 还是返工）；10 件太碎（用户被淹没在选项里，注意力分散）。这 5 件是这个 skill 在多次实战里识别出来的'返工最贵决定的下界'。" },
        { kind: "para", text: "我实际给用户发的 prompt 长这样——动态读 themes/*/theme.json 拼出来，不硬编码主题清单：" },
        {
          kind: "code",
          lang: "markdown",
          text: "📋 Checkpoint Plan — 进入 Phase 2 前先一次对齐 5 件事：\n\n1. **稿子（script.md）** ——\n   你看一眼，要不要改？哪里还能更口语 / 哪里信息密度不够？\n\n2. **开发计划（outline.md）** ——\n   章节切分 + step 数 + 信息池 + 素材清单，要不要改？\n\n3. **主题** —— 按你的内容关键词（GPT Image / 文字渲染 / B 站节奏），\n   我从 themes/ 读出来这 3 个最匹配，推荐排序：\n     - editorial-rust（深焦红 + 衬线）—— 适合：科技评论、长文改编\n     - bilibili-glow（霓虹蓝紫）—— 适合：B 站节奏、年轻向\n     - paper-mono（纸感 + 等宽）—— 适合：研究报告、严肃科普\n   你选哪个？说\"你帮我选\"我就取 editorial-rust 并告诉你为什么。\n\n4. **素材** ——\n   GPT Image 生成的对比图、案例截图、宣传海报：\n     A. agent 帮挑（我从原文 URL 抓 + 占位）\n     B. 你提供（我把你的图按章节归档）\n     C. 全 placeholder（先用方块占位，最后再换）\n\n5. **开发模式** ——\n   A. 逐章确认（每章做完等你点头再做下一章）\n   B. 顺序（一口气做完 16 章再让你看）\n   C. 并行 subagent（同时做 3 章，速度快但风格漂的风险高）\n\n回我 5 个回答（部分回答也行，没回的我会按推荐执行并告知）。"
        },
        { kind: "para", text: "用户回答里有 3 处微妙：" },
        { kind: "list", items: [
          "「你帮我选」不是默默选——我必须取推荐第 1 个 + 一句话告诉用户为什么。这是给用户撤销的窗口（他听完理由觉得不对可以否决），不是把责任推回给他。",
          "「主题你帮我选，开发模式我要 C」——这是部分确认。我接受已答的部分，对未答的（稿子 / outline / 素材）不能假设默认通过——必须再追一次问。",
          "用户提了第 6 件事（'我还要双语字幕'）——我不能塞进当前 checkpoint。这是 outline 范围的修改，正确动作是回 Phase 1.2 修 outline，再走一次 Checkpoint Plan。"
        ]},
        { kind: "para", text: "5 件全部确认后我才能进 Phase 2.1 跑 scaffold.sh。这之前只要有一项没答，我都停在 checkpoint，不开建。" }
      ],
      receives: "已自检通过的 script.md + outline.md。",
      reads: ["themes/*/theme.json（动态读全部，不硬编码）", "outline.md 末尾素材清单", "SKILL.md Checkpoint Plan 节"],
      blockedShortcut: "不能跳过这个 checkpoint 直接开始脚手架；不能硬编码主题清单——每次都要动态读所有 themes/*/theme.json 的 nameZh / descriptionZh / bestFor / mood；不能在用户没明确选主题时自己硬选。",
      action: "一次让用户确认 5 件事：(1) 稿子（script.md）要不要改；(2) 开发计划（outline.md）要不要改；(3) 选哪个主题——按内容关键词主动推荐 2-3 个最匹配的；(4) 素材怎么准备（agent 帮挑 / 用户提供 / 全 placeholder）；(5) 开发模式（A 逐章确认 / B 顺序 / C 并行）。用户说'你帮我选'就取推荐第 1 个并告诉用户为什么。",
      output: "用户确认后的方向：稿子、outline、主题、素材策略、开发模式。",
      nextConsumer: "Phase 2.1 脚手架。",
      reusableMove: "把返工最贵的决定合并到一个硬 checkpoint——不要每做一点都问，也不要等到代码都写完才发现方向错了。",
      challenges: [
        "用户回答「主题你帮我选，开发模式我要并行 subagent」——其它 3 项没回。你接受已答的部分进 Phase 2 还是再追一次问？如果再追，怎么措辞才不显得唠叨？",
        "用户提出第 6 件事「我还要中英双语字幕」——这件事在 Checkpoint Plan 范围里吗？应该塞进当前 checkpoint、回 outline 改一轮、还是放到 Phase 2 再处理？三种做法各影响什么？",
        "themes/ 目录有 12 个主题，全列出来用户会被淹。挑 2-3 个的算法是什么——按 theme.json 的 bestFor 字段做关键词匹配？按 mood 字段对齐风格信号？还是其它？写出你的挑选规则。",
        "想象用户在 Checkpoint Plan 这一刻才说「其实我想先看看 outline 长什么样再决定」——但 outline 已经写好了在文件里。skill 让你怎么处理？是把 outline 内容直接贴进 checkpoint prompt 里，还是只发文件路径？这两种做法对'用户阅读成本'和'对话长度'各意味着什么？"
      ]
    },
    {
      id: "scaffold",
      title: "脚手架 + 删 example chapter",
      summary: "用户确认主题后，skill 让我跑 scripts/scaffold.sh 一次性建好 Vite + React + TS 项目，包括 16:9 舞台、stepper、隐藏进度条、Auto / Audio / Manual 模式、token 主题、抽取/合成脚本、示例章节。第一件事是删掉 example chapter，避免它污染真实内容。",
      preTest: "Checkpoint Plan 5 件事都对齐了——主题选了 editorial-rust，开发模式 B 顺序，素材用户提供。下一步你的本能是开建 src/chapters/01-gpt-image-overview/Chapter.tsx 这个文件，还是别的？",
      narrativeBody: [
        { kind: "para", text: "skill 让我先跑一行命令：" },
        {
          kind: "code",
          lang: "bash",
          text: "bash scripts/scaffold.sh ./presentation --theme=editorial-rust"
        },
        { kind: "para", text: "为什么不让我手写项目骨架？因为这个 skill 的工程链有 7 处易漏接点：" },
        { kind: "list", items: [
          "Vite + React + TS 配置 + tsconfig 严格模式",
          "16:9 舞台 CSS（aspect-ratio + 居中 + 主题 token 注入点）",
          "useStepper hook（按键 / 持久化游标 / step bound 校验）",
          "隐藏进度条（录屏时不入镜，?dev=1 才显示）",
          "Auto / Audio / Manual 三模式路由 + URL 参数解析",
          "主题 active theme 的 tokens.css 拷贝",
          "抽取 / 合成脚本（extract-narrations / synthesize-audio）"
        ]},
        { kind: "para", text: "手写至少漏一两处——尤其是 useStepper 的 STORAGE_KEY 命名、隐藏进度条的 ?dev=1 触发逻辑这种细碎接线。脚手架不是聪明，是抗遗漏。" },
        { kind: "para", text: "脚手架跑完检查：" },
        {
          kind: "code",
          lang: "bash",
          text: "cd presentation && npx tsc --noEmit  # typecheck 通过\nls src/chapters/                       # 看里面有什么"
        },
        { kind: "para", text: "看到 src/chapters/01-example/ 目录——这是 scaffold 自带的 example chapter。下一步必做：" },
        {
          kind: "code",
          lang: "bash",
          text: "rm -rf src/chapters/01-example\n# 然后从 src/registry/chapters.ts 移除：\n#   import { EXAMPLE_CHAPTER } from '../chapters/01-example';\n#   及数组里的 EXAMPLE_CHAPTER"
        },
        { kind: "para", text: "为什么必删？因为 example chapter 视觉气质（紫粉 + 圆角彩色边框 + 假图标）是 demo 风，不是正片风。如果留着开建第 1 章，会被它的色板和动画偷偷影响——「示例气质混入正片」是这个 skill 反复见到的失败模式。" }
      ],
      receives: "用户选定的主题 id。",
      reads: ["scripts/scaffold.sh", "themes/<id>/tokens.css"],
      blockedShortcut: "不能手写项目结构——脚手架接的工程线（音频脚本 / 进度条 / Auto 模式 / 主题 token / stepper）极易漏；不能保留 01-example 进入真实开发，否则会出现「示例章节」气质混入正片。",
      action: "运行 scaffold.sh ./presentation --theme=<id>，跑完后立即 rm -rf presentation/src/chapters/01-example 并从 chapters.ts 移除 EXAMPLE_CHAPTER 的 import 和数组项。",
      output: "presentation/ 项目骨架（typecheck 通过）。",
      nextConsumer: "Phase 2.2 第 1 章开发。",
      reusableMove: "把脆弱、重复、容易漏的工程接线放进脚本——脚手架不是聪明，是抗遗漏。",
      challenges: [
        "用户已经有自己的 React + Vite 项目，能不能跳过 scaffold 把这个 skill 的代码塞进去？哪些工程接线必须复制，哪些可以共用？",
        "scaffold 跑完 npm install 因网络失败——是反问用户还是默默重试？",
        "用户在 Checkpoint Plan 时选了 editorial-rust，但 scaffold 跑完发现 themes/editorial-rust/tokens.css 缺一个变量——是修 tokens.css 还是回 Checkpoint Plan 让用户重选？",
        "为什么 scaffold 不直接把 example chapter 排除在 templates 之外，而是复制完再让我删？删的步骤会不会有 agent 忘记？"
      ]
    },
    {
      id: "first-chapter",
      title: "第 1 章主线程做完 + 用户验收（强制 anchor）",
      summary: "脚手架建好后 skill 仍然不让我并行所有章节。第 1 章必须主线程完整做（不是骨架版！），让用户验收视觉气质 / 节奏 / 反 AI 味。这一章是项目的「风格锚点」——主题不合适、字号不舒服、CHAPTER-CRAFT 有盲区都会在第 1 章暴露。",
      preTest: "脚手架建好了，example chapter 也删了。第 1 章你的本能：(a) 先写一个低保真骨架（占位文字 + 灰块）让用户看结构；(b) 直接做完整版（真节奏 + 真视觉 + 真素材）。选哪个？为什么？",
      narrativeBody: [
        { kind: "para", text: "skill 强制选 (b)。第 1 章必须主线程完整做（不是骨架版），让用户验收视觉气质 / 节奏 / 反 AI 味。" },
        { kind: "para", text: "为什么不让做骨架版？因为骨架版暴露不出真实质量问题。等所有章节都骨架做完再升级，主题 token 在真实内容下不合适、CHAPTER-CRAFT 某条原则在长文本下崩、字号在 16:9 舞台上太小——这些只有真实样板能暴露。第 1 章是整片视频的「风格锚点」，后续章节要参考它的代码风格、视觉密度、动画尺度。锚点是骨架就锚不住。" },
        { kind: "para", text: "实现 GPT Image 第 1 章我的工作路径：" },
        { kind: "list", items: [
          "读 references/CHAPTER-CRAFT.md（每次都读，不是只在开头）。",
          "Part 1 开工 5 问：这一章要观众记住什么？关系→动作？信息密度？反 AI 味盲区？跨章衔接？",
          "Part 2 关系→动作决策树：64% → 89% 是「对比关系」，对应动作是「两个数字同时呈现 + 上升箭头 / 颜色对比」，不是「依次浮现」。",
          "Part 3 视觉工具箱选具体技法：用 CSS counter + transform 做数字增长动画（不是 fade-in 文字）。",
          "用主题 token：color: var(--theme-fg)；不硬编码 #a04018。",
          "narrations.ts 写 5 条文本，对齐 Chapter.tsx 里 step === 0..4。",
          "完工跑 npx tsc --noEmit + Part 7 完工自检。"
        ]},
        { kind: "para", text: "做完让用户验收 5 件事——这是这一阶段的硬交付物：" },
        {
          kind: "code",
          lang: "markdown",
          text: "🎨 第 1 章交付（请在浏览器看 http://localhost:5173）\n\n请帮我看 5 件事：\n\n1. **视觉气质** —— 看着像 B 站正片还是 demo？\n2. **节奏** —— 5 step 看完是不是 32 秒左右？太快太慢？\n3. **内容驱动动画** —— 64% → 89% 用数字增长合不合适？\n   还是更想要别的演法（柱状图 / 文字切割 / 卡片翻转）？\n4. **双源细节** —— 除了口播说的，画面有没有挂额外信息？\n   （我从 article 里挂了「同期 DALL-E 中文 ≤ 50%」「Midjourney v6\n    在中文海报场景仍弱」两条画面专属细节）\n5. **反 AI 味** —— 有没有紫粉渐变 / 圆角彩色边框 / emoji / 假插画？\n   你看到任何一处觉得「这是 AI 写的」就指给我。"
        },
        { kind: "para", text: "用户验收过了，后面 5 章才能开做。第 1 章没过——回头改 CHAPTER-CRAFT.md 或主题 token，然后重做。这是真锚点。" }
      ],
      receives: "outline 第 1 章段落 + 主题 token + article 对应原文。",
      reads: ["references/CHAPTER-CRAFT.md（单一必读入口）", "themes/<id>/theme.json", "article.md 对应段落"],
      blockedShortcut: "不能先做「低保真骨架版」（这个 skill 没有骨架版概念）；不能在第 1 章未验收前并行后续章节；不能跳过用户验收直接做第 2 章。",
      action: "主线程完整实现第 1 章：真节奏、真视觉、真素材或明确 placeholder。完工跑 npx tsc --noEmit + Part 7 完工自检。让用户验收：视觉气质 / 节奏 / 内容驱动动画 / 双源原则有没有挂额外细节 / 反 AI 味（紫粉渐变 / 圆角彩色边框 / emoji / 假插画）。",
      output: "完整可验收的第 1 章。",
      nextConsumer: "用户验收 → 后续章节代码风格参考。",
      reusableMove: "批量开发前先做透一个真实样本——锚点必须是完整版本，不能是低保真骨架，否则它暴露不出真实质量问题。",
      challenges: [
        "用户验收说「视觉气质 OK，但节奏太慢」——这是改 Chapter.tsx 还是回头改 script？两种做法的差别是什么？",
        "第 1 章用主题 token 和 CHAPTER-CRAFT 都做对了，但用户说「就是觉得不打」——你怎么定位是哪一层的问题（主题 / CHAPTER-CRAFT 盲区 / outline / script）？",
        "如果第 1 章我做完发现 CHAPTER-CRAFT 的某条原则跟 editorial-rust 主题冲突（比如原则说用大字号但主题 hero 字体宽体撑不下），先改原则、改主题、还是改这一章绕过去？",
        "为什么第 1 章的「锚点」不能是 example chapter（既然它是 scaffold 自带的标准实现）？"
      ]
    },
    {
      id: "chapters-2-to-n",
      title: "第 2-N 章按选定模式开发，每章必读 CHAPTER-CRAFT.md",
      summary: "第 1 章验收后我按用户选的模式做剩下章节（A 逐章确认 / B 顺序 / C 并行 subagent）。无论哪种模式，每章都必须重新读一次 CHAPTER-CRAFT.md——长会话里 agent 会本能遗忘原则，写第 5、6、7 章时容易回退到纯文字 PPT。",
      preTest: "第 1 章用户验收过了。Phase 2.3 你要做剩下 5 章（GPT Image 视频共 6 章）。本能是把 CHAPTER-CRAFT.md 在开头读一次，后面 5 章都参考第 1 章的代码就够了——对不对？写下你的判断。",
      narrativeBody: [
        { kind: "para", text: "skill 不让。Phase 2.3 明确写：每章都重新读一次 CHAPTER-CRAFT.md。每次。" },
        { kind: "para", text: "为什么这么固执？因为长会话里 agent 会本能遗忘原则。第 5、6、7 章时上下文已经几千行，agent 容易回退到默认行为——纯文字 PPT、列表一次全展示、忘记主题 token 用硬编码颜色。「读一次记住」在 agent 这里不成立。" },
        { kind: "para", text: "我做 GPT Image 第 2 章（「它是怎么做到的——架构层面」）的过程：" },
        { kind: "list", items: [
          "重新读一次 CHAPTER-CRAFT.md（哪怕第 1 章刚读过）。",
          "Part 1 开工 5 问：这一章关系是「机制揭秘」→ 动作是「分层揭示」。",
          "Part 2 决策树：架构图不能一次画完——按 1 模块 1 step 渐进式画。",
          "Part 3 视觉工具箱选 SVG path animation 画架构连线。",
          "用主题 token + .ar- 前缀给本章 CSS 隔离（防止跟第 1 章 .ov- 前缀冲突）。",
          "narrations.ts 写本章 step 数。",
          "完工跑 tsc + Part 7 自检。"
        ]},
        { kind: "para", text: "三种开发模式（用户在 Checkpoint Plan 选过）：" },
        {
          kind: "code",
          lang: "text",
          text: "模式 A 逐章确认：每章做完等用户点头再做下一章。\n                慢但风险低。\n\n模式 B 顺序开发：一口气做完 N 章再让用户看。\n                中速、中风险（积累偏差到底才发现）。\n\n模式 C 并行 subagent：同时做 3-4 章。\n                快但风格漂的风险高（每个 subagent 各自漂，\n                第 1 章锚点也救不全）。"
        },
        { kind: "para", text: "GPT Image 视频用户选了 B 顺序——所以我做完 5 章一起交付，每章独立 CSS 前缀防互相污染（.ov- / .ar- / .ev- / .cs- / .li- / .nx-）。" }
      ],
      receives: "outline 当前章段落 + 第 1 章代码作为风格参考 + 当前章 article 段落 + 主题 token。",
      reads: ["references/CHAPTER-CRAFT.md（每次都读，不是只在开头读一次）", "outline 当前章段落", "article.md 当前章段落"],
      blockedShortcut: "不能把 outline 翻译成一页页大字 PPT；不能整章纯文字（CHAPTER-CRAFT 强制每章至少 1-2 处 CSS / SVG / Canvas / JS 视觉演示）；不能列表一次全展示（必须 1 项 = 1 step 逐步揭示）；不能硬编码颜色 / 字体（必须走主题 token）。",
      action: "对每章：读 CHAPTER-CRAFT.md → 按 Part 1 开工 5 问 + Part 2 关系→动作决策树 → 用 Part 3 视觉工具箱选具体技法 → 完工跑 Part 7 自检 + tsc → 按选定模式（逐章确认 / 顺序 / 并行）推进。每章独立 CSS 前缀（.cd- / .mg- / .pm-），不修改 chapters.ts。",
      output: "每章的 Chapter.tsx + Chapter.css + narrations.ts 三件套。",
      nextConsumer: "Phase 3 音频合成 / Phase 4 录屏。",
      reusableMove: "对重复执行的高风险阶段，设置每次必读的单一入口——把所有原则收敛到一份 reference，长会话里也不会因上下文疲劳而降级。",
      challenges: [
        "用户在 Phase 2.3 中途说「我看了第 2 章发现你忘了主题 token，硬编码了颜色」——你立刻停下改第 2 章、还是把剩下 3 章做完一起改、还是反问？",
        "「每次都重新读 CHAPTER-CRAFT.md」对长会话上下文是高成本——能不能让 SKILL.md 自动每章重新加载它？这是 skill 设计能解决还是平台缺陷？",
        "并行 subagent 模式下，每个 subagent 都「重新读 CHAPTER-CRAFT」是天然的——这种情况下「每章重读」的价值反而比顺序模式低吗？",
        "做到第 4 章发现 CHAPTER-CRAFT.md 某条原则在这个具体内容下不适用——是绕过去、改 CHAPTER-CRAFT.md、还是反问 skill 作者？依据是什么？"
      ]
    },
    {
      id: "narrations-truth",
      title: "narrations.ts 是运行时真相源",
      summary: "每章实现时我必须写 narrations.ts，数组长度严格等于章节代码最大 step + 1。这是离运行时最近的文件——useStepper 读它算 step 总数，extract-narrations 读它生成 audio-segments.json，App 读它找当前 step 文本。outline 是计划，narrations 是真相。",
      preTest: "你刚做完第 1 章 Chapter.tsx，里面 if (step === 0) ... if (step === 4) 写了 5 个分支。下一步是 git commit 还是别的？写下来再读。",
      narrativeBody: [
        { kind: "para", text: "skill 不让我直接 commit。每章必须同时写 narrations.ts，数组长度严格等于 Chapter.tsx 里 step === N 的最大 N + 1。" },
        { kind: "para", text: "narrations.ts 长这样（GPT Image 第 1 章）：" },
        {
          kind: "code",
          lang: "ts",
          text: "export const narrations: string[] = [\n  \"文字这块是真变强了。\",\n  \"以前一张海报里只要有中文，基本就露馅。\",\n  \"现在不一样了。海报里的中文，准确率从 64% 提到了 89%。\",\n  \"但复杂排版下还是会糊——大概十张里有一张。\",\n  \"那它是怎么做到的？接下来拆架构。\",\n];"
        },
        { kind: "para", text: "为什么这么严格？因为 narrations.ts 是运行时真相源。下游有 4 处都从它读：" },
        { kind: "list", items: [
          "useStepper hook 读它算 step 总数。",
          "extract-narrations.ts 读它生成 audio-segments.json。",
          "App.tsx 读它显示当前 step 的字幕。",
          "useAudioPlayer 读它定位当前 step 的 mp3。"
        ]},
        { kind: "para", text: "如果 outline 写 5 step、Chapter.tsx 写 6 step、narrations.ts 写 4 条、合成 mp3 4 段——录屏时全错位。outline 是计划，narrations 是真相。" },
        { kind: "para", text: "改章节结构后还有一步必须做——bump useStepper.ts 的 STORAGE_KEY：" },
        {
          kind: "code",
          lang: "ts",
          text: "// 之前\nconst STORAGE_KEY = \"presentation-step-v4\";\n// 改 step 数后改成\nconst STORAGE_KEY = \"presentation-step-v5\";"
        },
        { kind: "para", text: "为什么？因为 STORAGE_KEY 用 localStorage 持久化用户当前 step。如果章节结构变了但 KEY 没变，用户上次停在 step 7，但新结构只有 5 step——游标越界，页面崩。bump KEY 强制清空旧游标。" }
      ],
      receives: "已实现的 Chapter.tsx + 对应 script 段落。",
      reads: ["references/AUDIO.md", "templates/scripts/extract-narrations.ts"],
      blockedShortcut: "不能让 outline / Chapter.tsx / narrations.ts / audio-segments / mp3 各管一套 step 数；不能让 outline 当最终真相源（实现阶段会调整 step）；不能漏写 narrations.ts 就先 commit；改章节结构后不能忘 bump useStepper 的 STORAGE_KEY。",
      action: "每章必写 narrations.ts，数组长度 = Chapter.tsx 里 if (step === N) 的最大 N + 1。每条文本对应 script 段落，可为 TTS 微调标点但不能漏关键短语。改章节结构后 bump useStepper.ts 的 STORAGE_KEY（如 v4 → v5）避免持久化游标落到不存在的 step。",
      output: "每章一个 narrations.ts。",
      nextConsumer: "useStepper / extract-narrations.ts / audio-segments.json / mp3 / Auto 模式。",
      reusableMove: "当多个文件都会描述同一运行事实时，让离运行时最近、最容易校验的文件当最终真相源——其它文件允许滞后，但要明确同步规则。",
      challenges: [
        "Chapter.tsx 里有一个 step === 99 的 special case 用作「章节末尾占位」——narrations.ts 长度该是 6（含 99）还是按真实 step 数？",
        "用户在 Phase 2.3 说想往第 1 章中间插一段——这要求 narrations.ts 数组中间插入。如果不 bump STORAGE_KEY 会发生什么？bump 了之后用户已经看过的进度会丢吗？",
        "outline 写第 1 章是 5 step，Chapter.tsx 实现成 6 step——outline 该回头改吗？为什么这个 skill 容忍这种漂移？",
        "narrations.ts 文本写完发现某条比 script.md 对应段落多了一句话（为了 TTS 合成自然）——这算违反「保持口播语义」吗？边界在哪？"
      ]
    },
    {
      id: "checkpoint-audio",
      title: "Checkpoint Audio：是否合成音频（硬节点）",
      summary: "网页做完后 skill 不让我擅自合成音频——TTS 烧 token + 耗时 + 可能用错音色。必须先停下来问用户：要不要合成音频做自动播放录屏？",
      preTest: "presentation/ 6 章都做完了，npm run dev 看着 OK。下一步你的本能：(a) 跑 npm run synthesize-audio 合成音频；(b) 让用户先决定要不要合成。选哪个？",
      narrativeBody: [
        { kind: "para", text: "skill 强制 (b)。Checkpoint Audio 是第二个硬节点。" },
        { kind: "para", text: "为什么不让我默认合成？三个理由：" },
        { kind: "list", items: [
          "TTS 烧 token——一个 6 章 30 step 的视频合成下来 cost 不低。",
          "TTS 不可逆——合成完才发现音色错（用户想要男声但默认女声）就要重合成，第二次的成本省不掉。",
          "用户可能根本不需要音频——B 站手动配音 / 后期配字幕的工作流是常见选择，自动合成是覆盖型不是基础型。"
        ]},
        { kind: "para", text: "我给用户的 prompt：" },
        {
          kind: "code",
          lang: "markdown",
          text: "🎙️ Checkpoint Audio\n\n网页 6 章都做完了。下一步两条路：\n\nA. 合成音频走自动播放\n   - 跑 mmx-cli 串行合成每段 mp3\n   - 进 Auto 模式 ?auto=1 一镜到底录屏\n   - 成本：TTS 调用 + 合成时间\n\nB. 不合成，走 Manual + 后期配音\n   - 用 Manual 模式手动点击推进\n   - 录屏后期配音 / 配字幕\n   - 成本：录屏时手动节奏 + 后期工时\n\n你选哪条？"
        },
        { kind: "para", text: "如果本机没装 mmx-cli——不能假装合成成功（这是这个 skill 反复见到的失败模式）。我必须反问用户：「本机没装 mmx-cli，你的 TTS 工具是什么？还是跳过音频走 Manual？」" }
      ],
      receives: "完成的 presentation/ 项目 + 所有章节 narrations.ts。",
      reads: ["SKILL.md Checkpoint Audio 节"],
      blockedShortcut: "不能默认合成音频（外部昂贵调用）；本机没装 mmx-cli 不能假装合成成功；不能跳过这个 checkpoint 直接 npm run synthesize-audio。",
      action: "询问用户：合成 → 进 Phase 3；不合成 → 直接 Phase 4（Manual 录屏 + 后期配音）。本机没装 mmx-cli 时反问用户用什么 TTS 或是否跳过。",
      output: "音频路线选择。",
      nextConsumer: "Phase 3（合成）或 Phase 4（不合成）。",
      reusableMove: "外部昂贵或不可逆调用前再设一个轻量 checkpoint——不要让 agent 默认烧 token。",
      challenges: [
        "用户回答「A」，但提了个「我希望开头加 3 秒静音停顿」——Checkpoint Audio 范围内还是 Phase 3 范围？怎么处理？",
        "如果本机有 mmx-cli 但用户的语言（比如粤语）不在支持列表——是降级到普通话还是反问用户提供本地 TTS？",
        "已经合成过一次 mp3，用户改了第 3 章 narrations.ts 一条文本——重合成全部、只重合成改动那条、还是反问？mmx-cli 增量执行能解决吗？",
        "Checkpoint Audio 和 Checkpoint Plan 都是硬节点，但 Plan 一次问 5 件事，Audio 只问 1 件事——为什么不一致？是 Audio 漏了什么还是 Plan 太细？"
      ]
    },
    {
      id: "extract-segments",
      title: "从 narrations.ts 抽取 audio-segments.json，让用户审",
      summary: "直接合成是把 mmx 当黑盒——文本错 / 切分错 / 文件名错都看不出来。skill 让我先 npm run extract-narrations 生成可读的 JSON 清单，让用户扫一眼确认。",
      preTest: "用户选了 A 合成音频。下一步本能是直接跑 npm run synthesize-audio 调 mmx-cli——对不对？写下判断再读。",
      narrativeBody: [
        { kind: "para", text: "skill 不让。先跑 npm run extract-narrations 生成可读 JSON 让用户审。" },
        { kind: "para", text: "为什么这一步必须？因为直接合成是把 mmx 当黑盒。如果某条文本错了 / 某章 step 切分错了 / 某个 mp3 路径写错了——TTS token 烧光才发现，repair 成本翻倍。" },
        { kind: "para", text: "extract-narrations.ts 扫所有章节 narrations.ts，生成 audio-segments.json：" },
        {
          kind: "code",
          lang: "json",
          text: "[\n  {\n    \"chapter\": \"01-gpt-image-overview\",\n    \"step\": 0,\n    \"text\": \"文字这块是真变强了。\",\n    \"audio\": \"public/audio/01-gpt-image-overview/0.mp3\"\n  },\n  {\n    \"chapter\": \"01-gpt-image-overview\",\n    \"step\": 1,\n    \"text\": \"以前一张海报里只要有中文，基本就露馅。\",\n    \"audio\": \"public/audio/01-gpt-image-overview/1.mp3\"\n  },\n  ...\n]"
        },
        { kind: "para", text: "我把这份 JSON 给用户看一眼：" },
        {
          kind: "code",
          lang: "markdown",
          text: "🔍 合成前清单（30 段）\n\n第 1 章 5 段、第 2 章 6 段、第 3 章 4 段、\n第 4 章 5 段、第 5 章 6 段、第 6 章 4 段。\n\n文本和切分对吗？特别看：\n- 数字念法（「64%」是念「百分之六十四」还是「六十四 percent」？）\n- 长段是否需要拆（任何 ≥ 30 字的段在 TTS 下会变快）\n- 章节间衔接句口气\n\n确认后跑 npm run synthesize-audio。"
        },
        { kind: "para", text: "把「合成正确」拆成两步：(1) 文本和切分对（用户审 JSON）→ (2) TTS 合成（调 mmx）。每步可独立验证。这是把昂贵不可逆的外部调用前置加便宜审阅点的标准动作。" }
      ],
      receives: "用户选择「合成音频」。",
      reads: ["references/AUDIO.md", "templates/scripts/extract-narrations.ts"],
      blockedShortcut: "不能直接调 mmx 合成——TTS token 烧掉就看不出是文本错还是切分错；不能省略让用户审 JSON 这一步。",
      action: "跑 npm run extract-narrations 扫所有章节 narrations.ts → 生成 audio-segments.json（章 / step / text / audio 路径）；给用户看一眼这份 JSON 让他确认文本 + 切分对。",
      output: "audio-segments.json（合成前的可读清单）。",
      nextConsumer: "用户审阅；synthesize-audio 阶段读这份清单。",
      reusableMove: "外部昂贵调用前生成可审阅清单——把「合成正确」拆成两步可独立验证的事。",
      challenges: [
        "用户审 JSON 后说「第 4 章 step 2 的文本太长，能不能拆成两个 step」——是改 narrations.ts、改 Chapter.tsx、还是只在 audio-segments.json 里拆？三种做法的代价是什么？",
        "audio-segments.json 是派生文件还是真相源？它和 narrations.ts 的关系是什么？修改它能反向影响 narrations.ts 吗？",
        "如果用户没审 JSON 直接说「你看着办合成吧」——是默默合成、追问让他至少扫一眼、还是合成前一段做样听让他确认音色？",
        "extract-narrations 的输出格式（chapter / step / text / audio）能不能加 duration 估算？这会让用户审阅更全面但脚本更复杂——值得吗？"
      ]
    },
    {
      id: "synthesize-audio",
      title: "合成音频：mmx-cli 串行 + 增量",
      summary: "skill 让我跑 npm run synthesize-audio 串行合成每段 mp3（增量、跳过已存在）。合成完关注异常时长——单段 ≥ 15s 通常意味着 step 太密，需要拆 step 或重写 narration。",
      preTest: "audio-segments.json 用户审过了。下一步跑 mmx-cli。本能：并行合成 30 段（快）vs 串行合成 30 段（慢但稳）—— 选哪个？依据是什么？",
      narrativeBody: [
        { kind: "para", text: "skill 让我跑 npm run synthesize-audio——它内部串行调 mmx-cli。" },
        { kind: "para", text: "为什么串行不并行？三个理由：" },
        { kind: "list", items: [
          "mmx-cli 并发请求容易被限流，错误率高于串行。",
          "串行容易增量重跑——第 17 段失败时只重跑这一段；并行整批失败回退成本高。",
          "整体合成时间不是瓶颈（30 段 × 5 秒 = 2.5 分钟），优化它牺牲稳定性不划算。"
        ]},
        { kind: "para", text: "执行流程（GPT Image 视频实际跑出来这样）：" },
        {
          kind: "code",
          lang: "bash",
          text: "$ npm run synthesize-audio\n\n[1/30] 01-gpt-image-overview/0.mp3 ... ✅ 2.3s\n[2/30] 01-gpt-image-overview/1.mp3 ... ✅ 3.1s\n[3/30] 01-gpt-image-overview/2.mp3 ... ✅ 4.7s\n[4/30] 01-gpt-image-overview/3.mp3 ... ⚠️  18.4s  ← 异常\n[5/30] 01-gpt-image-overview/4.mp3 ... ✅ 2.0s\n...\n[18/30] 03-architecture/2.mp3 ... ✅ (skip, exists)  ← 增量\n..."
        },
        { kind: "para", text: "增量执行：已存在的 mp3 跳过。这让我可以中断重跑、改某段重跑、不用每次重合成整个项目。" },
        { kind: "para", text: "异常时长（≥ 15s）必须报告给用户。第 4 段 18.4 秒——通常意味着这段 step 文本太密：要么拆 step、要么改写更短。这是 step 节奏校准信号，不是 TTS 出错。" },
        { kind: "para", text: "如果用户本机没装 mmx-cli：" },
        {
          kind: "code",
          lang: "text",
          text: "我反问：\n「本机检测不到 mmx-cli。三种处理：\n (a) 你装一下 mmx-cli 我重跑\n (b) 用本地 TTS（macOS 自带 say / Edge TTS / 其它）\n (c) 跳过音频走 Manual 录屏 + 后期配音\n你选哪个？」"
        },
        { kind: "para", text: "不假装成功——直接跑 mmx 报错只让用户看到 error trace，反问让用户做决策。" }
      ],
      receives: "用户审过的 audio-segments.json。",
      reads: ["references/AUDIO.md"],
      blockedShortcut: "不能并行合成（mmx-cli 串行更可靠）；不能忽略异常时长（埋下 Auto 录屏对不上的雷）；本机没装 mmx-cli 不能假装合成成功。",
      action: "跑 npm run synthesize-audio → mmx-cli 按 audio-segments.json 串行合成 → 输出到 public/audio/<chapter>/<N>.mp3（增量执行，已存在跳过）。合成完检查每段时长，超长的报告给用户作为节奏校准信号。",
      output: "每 step 一个 mp3 文件。",
      nextConsumer: "Auto 模式录屏。",
      reusableMove: "外部工具默认增量执行 + 失败时明确退化路径——昂贵流程必须支持断点续传。",
      challenges: [
        "合成完发现第 5 章某段 mp3 文件大小是 0 字节（mmx 静默失败）——增量重跑会跳过它（因为文件存在）还是重跑？怎么写检测？",
        "异常时长信号（≥ 15s）的阈值是写死的——不同语言 / 不同语速这个阈值合理吗？要不要按章估时反推阈值？",
        "如果用户的 article 里有英文人名（「Sam Altman」），mmx 中文 TTS 念出来怪——要不要在 narrations.ts 里给中文谐音？这违反「保持口播语义」吗？",
        "Phase 3 合成完之后再回头改 narrations.ts，audio-segments.json 不会自动更新——这是 bug 还是设计？怎么提示用户？"
      ]
    },
    {
      id: "recording",
      title: "录屏：Auto 模式一镜到底（主时钟原则）",
      summary: "推荐路径是 ?auto=1 一镜到底——按一次 Space 后网页按音频结束自动推进。skill 提醒我 Auto 模式只等音频不等动画——主时钟原则——所以动画必须 ≤ 口播时长，否则会被切断。",
      preTest: "30 段 mp3 合成完了，npm run dev 跑着，浏览器开 http://localhost:5173。下一步你的本能是按 ?auto=1 直接录屏，还是先做点别的？",
      narrativeBody: [
        { kind: "para", text: "skill 给我两条录屏路径：" },
        {
          kind: "code",
          lang: "text",
          text: "有音频路径（推荐）：\n  浏览器开 ?auto=1 → 全屏 → 开始录屏 → 按 Space →\n  网页按音频结束自动推进 → 全部播完 → 停录 → 裁头尾\n\n无音频路径：\n  开 Manual → 全屏 → 开始录屏 → 手动点击推进 → 后期配音"
        },
        { kind: "para", text: "Auto 模式核心规则——主时钟是音频，不是动画。每个 step 推进时机是 mp3 播放结束 + 200ms。" },
        { kind: "para", text: "为什么不让动画影响推进？因为多时钟会让节奏变隐藏状态机：调试时不知道为什么停在某一步。简单可预测 > 多重保险。" },
        { kind: "para", text: "代价：动画必须 ≤ 口播时长。如果某 step 我设计了 4 秒的复杂动画但口播只有 2 秒——动画到 1.5 秒就被切断进入下一 step，看起来像 bug。" },
        { kind: "para", text: "这个 skill 反过来要求：每章实现时（Phase 2）就得知道 narrations.ts 对应文本预计 TTS 时长，动画做短点。这是「主时钟原则」对上游的约束——不是录屏阶段才出现的规矩，是整个项目从第 1 章起就要遵守的。" },
        { kind: "para", text: "GPT Image 视频用 Auto 模式录的实际步骤：" },
        {
          kind: "code",
          lang: "text",
          text: "1. 浏览器 http://localhost:5173/?auto=1\n2. F11 全屏（或浏览器全屏 API）\n3. 开 macOS 内置录屏 / OBS / ScreenStudio\n4. 按一次 Space 触发开始\n5. 等 30 段全部播完（约 3 分钟）\n6. 停录\n7. 裁掉录屏前的浏览器 chrome + 录屏后的尾巴"
        },
        { kind: "para", text: "用户拿到的是一个完整 mp4，可以直接上传 B 站 / YouTube。" }
      ],
      receives: "已合成音频的网页项目（或用户选择跳过音频）。",
      reads: ["references/RECORDING.md"],
      blockedShortcut: "不能让动画长于口播（Auto 模式不等动画）；不能让用户自己摸索 ?auto=1 是什么；不能不告诉用户 Auto 和 Manual 的差别。",
      action: "有音频 → 推荐 Auto 模式：浏览器开 ?auto=1 → 全屏 → 开始录屏 → 按 Space → 网页自动播完 → 停录 → 裁头尾。无音频 → Manual 模式手动点击推进 + 后期配音。提前提醒「Auto 模式等音频不等动画」。",
      output: "录屏路径建议 + 录制要点。",
      nextConsumer: "用户录制和发布。",
      reusableMove: "自动化流程让运行时规则简单到可预测——别让多个时钟（动画 / 音频 / 用户点击）同时争抢推进权。",
      challenges: [
        "Auto 模式录到第 18 段时，用户看到一个动画截断觉得不打——是改这一段动画时长、还是改这段 narrations.ts 让 TTS 更长、还是接受作为「主时钟原则的代价」？",
        "用户没有装 OBS / ScreenStudio，只有 macOS 自带录屏——能录全屏 + 系统音吗？skill 该不该提示？",
        "Manual 模式录屏后期配音——配音师拿到的素材是什么（视频 + 字幕 + 时间码？）？这件事在 RECORDING.md 范围内还是用户领域？",
        "为什么这个 skill 不在 Phase 4 末尾再设一个 checkpoint（让用户确认录屏成功 / 看一遍输出 mp4）？是漏了还是设计选择？"
      ]
    }
  ],

  fileMap: [
    {
      path: "SKILL.md",
      role: "总流程 + 硬节点 + 阶段读取指南。",
      generatedBy: "skill 作者维护。",
      readBy: ["每次 agent 进入这个 skill 时"],
      owns: "Phase 1-4 阶段顺序、Checkpoint Plan / Audio 硬节点、各阶段必读文件表、十条原则索引、硬性自检协议（产出 → 自检 → 修复 → 再汇报）。",
      doesNotOwn: "每个 reference 内部细则；具体章节视觉动作。",
      failureIfWrong: "agent 跳过 Checkpoint、漏读 reference、或在错误阶段做太多决定（比如 outline 阶段写动画）。"
    },
    {
      path: "references/SCRIPT-STYLE.md",
      role: "文章 → 口播稿规则 + 三层自检（形式 / 风骨 / 念出来）。",
      generatedBy: "skill 作者维护。",
      readBy: ["Phase 1.2 生成 script.md", "script 自检"],
      owns: "口语化但保留信息、平台变体（B 站 / YouTube / 教学）、--- 切节拍约定、去 AI 味底线。",
      doesNotOwn: "网页章节结构、动画、主题。",
      failureIfWrong: "稿子像 AI 朗读稿或短摘要，后面所有节奏都失真。"
    },
    {
      path: "references/OUTLINE-FORMAT.md",
      role: "outline.md 字段 spec + 边界。",
      generatedBy: "skill 作者维护。",
      readBy: ["Phase 1.2 生成 outline.md", "outline 自检", "章节开发查 step 段落"],
      owns: "章节切分、step 数、估时、每步屏幕内容、章节级信息池、末尾素材清单。",
      doesNotOwn: "具体动画 / CSS 实现手段 / 毫秒级时长。",
      failureIfWrong: "outline 写死动画 → 章节开发退化成翻译机；或 outline 太空 → 章节开发不知道每步演什么。"
    },
    {
      path: "references/CHAPTER-CRAFT.md（单一必读入口）",
      role: "Phase 2.4 每次实现单章必读，把所有章节级原则合在一份。",
      generatedBy: "skill 作者维护。",
      readBy: ["每章实现时（×N 次，会重复 N 次）"],
      owns: "Part 0 十条原则 / Part 1 开工 5 问 / Part 2 关系→动作决策树 / Part 3 视觉工具箱 / Part 4 时长参考 / Part 5 反 AI 味反模式 / Part 6 代码红线（含 narrations.ts 强制约束）/ Part 7 完工自检 / Part 8 反馈速查。",
      doesNotOwn: "项目阶段分流（那由 SKILL.md 管）；具体文章内容。",
      failureIfWrong: "章节退化成 PPT、出现紫粉渐变 / 圆角彩色边框 / 假插画 / emoji 等 AI 味、漏写 narrations.ts 导致 Auto 录屏错位。"
    },
    {
      path: "references/AUDIO.md",
      role: "narrations.ts → audio-segments.json → mp3 流程 + Auto 模式规则。",
      generatedBy: "skill 作者维护。",
      readBy: ["Checkpoint Audio", "Phase 3 音频合成"],
      owns: "audio-segments.json 格式、mp3 路径约定、mmx-cli 调用、TTS 退化路径、Auto 模式按音频推进规则。",
      doesNotOwn: "章节视觉设计、单章节奏。",
      failureIfWrong: "音频生成不可复现、Auto 录屏对不上音轨。"
    },
    {
      path: "references/RECORDING.md",
      role: "录屏工具 + 后期合成路径。",
      generatedBy: "skill 作者维护。",
      readBy: ["Phase 4 录屏"],
      owns: "Auto 模式一镜到底录屏（?auto=1）、Manual 模式后期配音、推荐工具链。",
      doesNotOwn: "音频合成（那是 AUDIO.md）。",
      failureIfWrong: "用户拿到网页后不知道怎么变成可发布视频。"
    },
    {
      path: "references/THEMES.md + themes/<id>/{theme.json, tokens.css}",
      role: "主题系统：选 / 造 / 切主题。",
      generatedBy: "skill 作者维护内置主题；用户可创作新主题。",
      readBy: ["Checkpoint Plan 推荐主题", "脚手架复制 token", "章节实现消费 CSS variables"],
      owns: "theme.json（nameZh / descriptionZh / bestFor / mood）、tokens.css（颜色 / 字体家族 / hero 数字 / 卡片 / 分割线 / 装饰）。",
      doesNotOwn: "每章具体构图、字号、动画时长。",
      failureIfWrong: "主题推荐不匹配内容、换主题破版、或整条视频气质不统一。"
    },
    {
      path: "scripts/scaffold.sh + templates/",
      role: "稳定工程骨架（一键创建项目）。",
      generatedBy: "skill 作者维护。",
      readBy: ["Phase 2.1 脚手架"],
      owns: "Vite + React + TS 项目、16:9 舞台、stepper、隐藏进度条、Auto / Audio / Manual 模式、active theme 的 tokens.css、示例章节、音频抽取 / 合成脚本、跑一次 typecheck。",
      doesNotOwn: "真实章节内容。",
      failureIfWrong: "每个项目从第一步就不可靠（音频接错 / 进度条不见 / 主题 token 漏）。"
    },
    {
      path: "article.md（用户原文）",
      role: "画面信息密度的细节源。",
      generatedBy: "用户提供原文或 agent 保存原文。",
      readBy: ["Phase 1.2 改写 script", "outline 信息池", "每章实现挂画面细节"],
      owns: "原始事实、数字、引用、案例、时间、对比、出处。",
      doesNotOwn: "视频节奏、口播语气、章节结构。",
      failureIfWrong: "画面只能复述口播稿，没有额外信息密度，看起来像 PPT 字幕板。"
    },
    {
      path: "script.md / outline.md",
      role: "Phase 1.2 一次产出的文本计划。",
      generatedBy: "Phase 1.2。",
      readBy: ["Checkpoint Plan", "Phase 2 各章开发", "narrations.ts 写作"],
      owns: "script: 口播节拍 / 平台口吻 / --- 切分；outline: 章节 + step + 估时 + 信息池 + 素材清单。",
      doesNotOwn: "运行时 step 数（那是 narrations.ts 的）、具体动画、CSS 实现。",
      failureIfWrong: "上游计划错误会污染所有后续阶段；但实现时调整 step 不算 outline 错——以 narrations.ts 为准。"
    },
    {
      path: "presentation/src/chapters/<NN>-<id>/narrations.ts（运行时真相源）",
      role: "step 数 + 每步口播文本的最终真相源。",
      generatedBy: "Phase 2.4 每章实现时。",
      readBy: ["useStepper（算 step 总数）", "extract-narrations.ts（生成 audio-segments.json）", "App.tsx（找当前 step 文本）", "useAudioPlayer（播放当前 step 音频）"],
      owns: "数组长度 = Chapter.tsx 里 if (step === N) 的最大 N + 1；每条文本对应 script 段落语义。",
      doesNotOwn: "outline 初始规划（那是计划，可漂）；视觉 CSS。",
      failureIfWrong: "step 数 / 音频文件数 / Auto 录屏全部错位。"
    }
  ],

  designChoices: [
    {
      title: "一次产出 script.md + outline.md（不分两次确认）",
      looksUnnecessaryBecause: "为什么不先写 script，让用户确认，再写 outline？",
      badScenario: "checkpoint 太多让用户被迫分两次看本来同时该看的内容；同时 outline 只依赖稿子节拍 + 原文信息池，不需要等另一次确认才能草拟——拆开做反而拖慢。",
      constraint: "SKILL.md Phase 1.2 要求两份产出物在同一次思考里完成，自检后一起进入 Checkpoint Plan。",
      solvedProblem: "减少协作中断，同时让用户在一个节点看到完整内容计划。",
      reusableMove: "把同一成本层级、可以同时决定的中间产物合并到一个 checkpoint 前完成——别为了'按部就班'而多设 checkpoint。",
      counterScenarios: [
        { when: "标准流程：用户给原始文章 + 想要视频网页", effect: "救你", why: "script 节奏和 outline 结构来自同一份 article 的同一次理解，一次思考完成质量更高。" },
        { when: "script 来自用户既有口播稿，outline 完全由 agent 推断", effect: "绑你", why: "两份产物的信息源不同——把它们塞进一次思考里，agent 容易让 outline 迁就 script 而漏 article 信息池。" },
        { when: "用户已给 outline 草稿，只需写 script", effect: "完全多余", why: "这种场景下 outline 不需要再产出，'一次产出 script + outline' 反成多此一举——应该回到 Phase 1.1 分流补一行：'已有 outline + 需写 script' → 单产出。" }
      ]
    },
    {
      title: "保留 article.md 不删（双源原则）",
      looksUnnecessaryBecause: "已经从 article 改写出 script.md 了，为什么还要保留原文？",
      badScenario: "后面做画面时只能从口播稿拿信息 → 画面只是字幕化复述；或者 AI 为了增加画面细节现编数字和案例。",
      constraint: "SKILL.md 工作目录约定明确写'article.md 用户给原文时必有——不删！开发阶段画面信息源'；CHAPTER-CRAFT.md 双源原则要求每章实现时回 article 抽细节。",
      solvedProblem: "让画面信息密度高于口播信息密度，同时避免假数据。",
      reusableMove: "两个下游需要不同决策维度时，保留两个源；不要让一份中间文件吞掉全部职责。",
      counterScenarios: [
        { when: "用户给原始书面文章 + 视频网页目标", effect: "救你", why: "节奏（script）和细节（article）确实是两个不同决策维度，画面有细节可挂。" },
        { when: "用户给精简 outline + 关键事实清单（无 article）", effect: "完全失效", why: "没有原始细节源可保留，双源原则空转——这种场景下应该反问用户能不能给原文，否则画面只能纯文字。" },
        { when: "article 是 GPT 生成的稿子（不是真原始素材）", effect: "取决于", why: "GPT 稿可能本身丢了关键细节，'保留'的是已经被压缩过的版本——双源价值打折，需要先反问用户拿真原文再决定。" }
      ]
    },
    {
      title: "outline 不写动画（上游不抢下游判断权）",
      looksUnnecessaryBecause: "为什么不一次把动画也规划好？开发计划越详细越好啊。",
      badScenario: "上游写死动画 → 章节 agent 退化为翻译机，失去内容驱动判断；某章其实更适合做'文字被切开'，但 outline 写了'blur clear'，章节 agent 就只能照办。",
      constraint: "SKILL.md Phase 1.2 outline 边界表：必须写章节切分 / step / 屏幕内容 / 信息池；不要写具体动画类型 / CSS 手段 / 毫秒级时长。",
      solvedProblem: "把视觉判断留给真正掌握章节上下文的阶段。",
      reusableMove: "上游规划内容边界，下游做实现判断——上游不要抢下游在信息齐时才该做的决定。",
      counterScenarios: [
        { when: "视觉风格未定 / 主题在 Checkpoint Plan 才选", effect: "救你", why: "outline 阶段没有主题 token / 字号 / 章间衔接信息，写动画必然瞎写。" },
        { when: "用户已给 Figma 全套设计 + 动画规范", effect: "部分让位", why: "动画不写在 outline 里仍是对的——Figma 才是单一真相源；但 outline 应写一行 '动画参考 Figma 第 X 节' 让下游知道去哪找。" },
        { when: "极简风格 / 全片只用一种动画语言", effect: "可以放宽", why: "如果全片就一种动画方式（如全部 fade-in 800ms），写在 outline 里没什么坏处反而有助跨章一致——但这是少数。" }
      ]
    },
    {
      title: "Checkpoint Plan：一次对齐 5 件事",
      looksUnnecessaryBecause: "为什么不让用户只确认稿子，其他我自己选？",
      badScenario: "稿子对了但主题不合适 / outline 对了但素材缺 / 素材有了但开发模式不符合用户期待——任何一个错了，进入开发后都很贵。",
      constraint: "SKILL.md Checkpoint Plan 节：内容计划完成后必须停，一次对齐稿子 / outline / 主题 / 素材 / 开发模式；主题必须明确才进入 Phase 2，用户说'你帮我选'就取推荐第 1 个并告诉用户为什么。",
      solvedProblem: "把方向性决定放在返工成本最低的时候做。",
      reusableMove: "找出'返工最贵的决定'集合，合并到一个硬 checkpoint——不要每做一点都问，也不要等到代码都写完才发现方向错了。",
      counterScenarios: [
        { when: "6 章 / 标准 B 站视频流程（GPT Image 这种）", effect: "救你", why: "5 件事都是返工最贵的决定，对齐一次省去后续大面积返工。" },
        { when: "1 章 30 秒短视频", effect: "部分过度", why: "5 件事里 '开发模式' 不必要——只有一章哪来模式选择；可降级到 3 件事确认。" },
        { when: "用户已经在另一个项目用过这个 skill 5 次", effect: "应简化", why: "主题和模式可沿用上次默认（甚至不必再问），只确认稿子和素材。Checkpoint 长度该按用户熟悉度自适应。" }
      ]
    },
    {
      title: "第 1 章必须主线程完整做完（强制 anchor）",
      looksUnnecessaryBecause: "如果后面能并行，为什么第 1 章不能也并行？",
      badScenario: "没有真实样板时多 agent 同时写，主题颜色 / 字号关系 / 动画尺度各走各的，最后每章像不同项目；或者一起踩同一个主题 / CHAPTER-CRAFT 盲区。",
      constraint: "SKILL.md Phase 2.2：第 1 章必须主线程做完整版本（不是骨架版），用户验收不可跳过；后续章节参考第 1 章代码。",
      solvedProblem: "用一个真实样本暴露主题、字号、CHAPTER-CRAFT 的盲区，让指引和参数有机会被修。",
      reusableMove: "批量开发前先做透一个完整样本——锚点必须能暴露真实质量问题，不能是低保真骨架。",
      counterScenarios: [
        { when: "第一次跑这个 skill / 第一次用这个主题", effect: "救你", why: "锚点暴露 reference 盲区、主题 token 不合适、字号尺度问题——这些只有真实样板才暴露。" },
        { when: "已经做过 3 个同主题项目", effect: "可以跳过", why: "锚点价值低于成本，可降级到 '参考之前项目第 1 章' 的 reuse 路径——但要写明这条降级前提。" },
        { when: "用户给了 Figma 全套设计", effect: "部分让位", why: "锚点变成 '对照 Figma 实现一章给用户验收 Figma → 网页转换准不准'——锚点目标从 '风格摸索' 变成 '保真度验证'。" }
      ]
    },
    {
      title: "每章都读 CHAPTER-CRAFT.md（单一必读入口）",
      looksUnnecessaryBecause: "读一次记住不就行了？为什么每章都要重新读？",
      badScenario: "长会话里 AI 会本能遗忘原则，写第 5、6、7 章时容易回到默认网页卡片和文字堆叠；或者只记住一部分原则（比如记得'逐步揭示'但忘了'反 AI 味'）。",
      constraint: "SKILL.md Phase 2.4 把 CHAPTER-CRAFT.md 列为单一必读入口，每章重新读；十条原则 / 5 问 / 决策树 / 反模式 / 代码红线 / 自检全部并入这一份。",
      solvedProblem: "重复阶段不会因为上下文疲劳而降级。",
      reusableMove: "对重复执行的高风险阶段，设置每次必读的单一入口——把规则散在 8 个 reference 然后说'按需读取'是模式陷阱。",
      counterScenarios: [
        { when: "6+ 章长视频 / 长会话开发", effect: "救你", why: "上下文疲劳真的会发生——第 5、6 章时 agent 容易回退到默认 PPT 行为。每次重读 CHAPTER-CRAFT 是抗降级补丁。" },
        { when: "2-3 章短视频 / 短会话", effect: "部分过度", why: "短会话里 agent 不会忘原则——'每章重读' 反而占用 token；可降级到 '开头读 + 末尾自检' 模式。" },
        { when: "并行 subagent 模式", effect: "天然落地但价值变低", why: "每个 subagent 都重新读了——但跨 subagent 的风格漂移这条原则反而救不了，需要补 '第 1 章作为锚点 + 跨 subagent 风格 review'。" }
      ]
    },
    {
      title: "narrations.ts 是运行时真相源",
      looksUnnecessaryBecause: "outline 和章节代码已经能记录 step 数，为什么还要每章一个 narration 文件？",
      badScenario: "计划写 5 步、真实代码写 6 步、音频合成 4 段、录屏时全部错位；或者改章节后忘了同步 outline，但运行时还是按旧 outline 算 step。",
      constraint: "SKILL.md 工作目录约定 + AUDIO.md：每章必须有 narrations.ts，数组长度 = Chapter.tsx 最大 step + 1；运行时和音频都从这里读。",
      solvedProblem: "根除 step 数和音频文件数对不上的漂移。",
      reusableMove: "当多个文件会描述同一运行事实时，让离运行时最近、最容易校验的文件当最终真相源；上游计划允许滞后，但要明确同步规则。",
      counterScenarios: [
        { when: "多文件协作描述同一运行事实（step / mp3 / 字幕都引用同一序号）", effect: "救你", why: "narrations.ts 是离运行时最近、最易校验的文件——指定它真相源后所有漂移收敛。" },
        { when: "单一渲染管线（无多文件协作）", effect: "完全冗余", why: "如果就一个 Chapter.tsx 自己管 step 数 / 文本 / 音频路径，再多一个 narrations.ts 反而是多余间接层。" },
        { when: "系统支持单一数据源 hooks（如 chapter config 集中管理 step 数据）", effect: "取决于", why: "如果架构本身能保证一致，narrations.ts 反而是多此一举——但要先验证 hooks 真的在运行时被严格遵守，不能假设。" }
      ]
    },
    {
      title: "Auto 模式不等动画（主时钟原则）",
      looksUnnecessaryBecause: "为什么不让系统等动画结束再推进？听起来更安全。",
      badScenario: "如果每个动画都能影响推进时机，整片节奏会变成隐藏状态机——录屏不可预测，调试时不知道为什么停在某一步。",
      constraint: "AUDIO.md：Auto 模式只按音频结束 + 200ms 推进；动画必须适配口播时长（动画 ≤ 口播）。",
      solvedProblem: "运行规则简单、稳定、可预测——录屏不需要后期对音轨。",
      reusableMove: "自动化流程里选一个主时钟（音频 / 事件流 / 测试结果 / 队列状态），其它行为对齐它；不要让多个时钟同时争抢控制权。",
      counterScenarios: [
        { when: "一镜到底自动录屏需求（最常见）", effect: "救你", why: "推进时机简单可预测——录屏不需要后期对音轨。" },
        { when: "交互式演示（用户停下来看动画）", effect: "完全失效", why: "这种场景下动画反而该是主时钟（用户控制推进），主时钟原则在这里反而限制体验。" },
        { when: "复杂动画 + 短口播组合", effect: "可能绑你", why: "动画做不全，只能压缩动画或砍内容——这种场景下要么放弃 Auto 模式走 Manual + 后期合成，要么接受动画截断作为代价。" }
      ]
    }
  ],

  patterns: [
    {
      name: "原料分流（输入类型路由）",
      status: "候选",
      prevents: "所有用户输入都走同一套流程——空主题时硬编内容、有口播稿时重复改写、有文章时跳过 script 直接做网页。",
      therefore: "在 Phase 1 入口画一张表：每行一种输入 → 对应该做的事。空原料就反问，不要硬凑。",
      useWhen: "skill 接受多种形态的原料（原始素材 / 半成品 / 成品 / 空），且不同形态需要不同后续动作时。",
      howToReuse: "在 Phase 1 写一张输入类型表：每行一种输入 → 对应该做的事。空原料就反问让用户先给素材，不要硬凑。",
      antiExample: "在 description 里写'本 skill 支持多种输入'，但所有路径用同一套动作——这是描述，不是路由。",
      cost: "入口越多维护越复杂，只列真实需要支持的入口；多一段判断逻辑。",
      seenIn: ["web-video-presentation SKILL.md Phase 1.1", "extracting-skill-patterns SKILL.md genre + 受众路由"],
      relatedPatterns: [
        { to: "P4", label: "便宜返工点 checkpoint", relation: "分流后通常要走 checkpoint 才进昂贵实现" },
        { to: "P8", label: "审阅清单接修复", relation: "分流产出（script / outline）也要走自检 → 修复" }
      ]
    },
    {
      name: "双源分工",
      status: "候选",
      prevents: "一个中间文件吞掉全部职责，导致后续阶段缺细节或缺节奏。",
      therefore: "保留原始材料作为细节源，生成执行稿作为节奏源；明确每个源管什么不管什么；后续阶段读双方。",
      useWhen: "源材料要同时服务两个不同决策维度（节奏 vs 细节、计划 vs 实现、表层 vs 深层）时。",
      howToReuse: "保留原始材料作为细节源，生成执行稿作为节奏源；明确每个源管什么不管什么；后续阶段读双方。",
      antiExample: "把原文摘要成一份稿子后要求所有下游只看摘要——这不是双源，是节流。",
      cost: "后续阶段要记得读两个源；文档必须把边界写清楚。",
      seenIn: ["web-video-presentation SKILL.md L137-141 双源原则", "extracting-skill-patterns（domain primer + soul one-liner 也是双源）"],
      relatedPatterns: [
        { to: "P3", label: "上游不抢下游判断权", relation: "双源 + 上游不抢下游：两源各有 owner，下游按需取" },
        { to: "P7", label: "运行时真相源", relation: "区别于：双源是'不同维度的两个源'，运行时真相源是'同维度避免漂'" }
      ]
    },
    {
      name: "上游不抢下游判断权",
      status: "候选",
      prevents: "早期计划阶段写死后期实现细节，让下游 agent 退化成翻译机。",
      therefore: "在计划文件里明确写'必须写什么 / 不要写什么'；把视觉 / 实现 / 现场判断的事留给下游 reference 接管。",
      useWhen: "下游阶段才知道完整上下文（素材、主题、约束、当前内容关系）时。",
      howToReuse: "在计划文件里明确写'必须写什么 / 不要写什么'；把视觉 / 实现 / 现场判断的事留给下游 reference 接管。",
      antiExample: "上游什么都不写，让下游猜——也不是这招。上游仍要给清楚边界。",
      cost: "下游 agent 需要更强判断力，必须有独立规则文件兜底；计划看起来没那么满。",
      seenIn: ["web-video-presentation SKILL.md outline 边界表", "extracting-skill-patterns 反装样自检（不替读者写他领域的具体反例）"],
      relatedPatterns: [
        { to: "P2", label: "双源分工", relation: "搭配用：上游不抢的同时，保留两个源给下游各取所需" },
        { to: "P6", label: "单一必读入口", relation: "下游接管：下游真正能拿决策权要靠'每次必读 reference'兜底" }
      ]
    },
    {
      name: "便宜返工点 checkpoint",
      status: "候选",
      prevents: "AI 太快进入昂贵实现，方向错了才发现，全部返工。",
      therefore: "在文本计划进入工程实现之前设置一次必须暂停的对齐点；一次对齐多件事（不要每做一点问一次）。",
      useWhen: "下一步将进入代码实现 / 批量生成 / 外部 API 调用 / 数据库写入等高成本阶段时。",
      howToReuse: "在文本计划进入工程实现之前设置一次必须暂停的对齐点；一次对齐多件事（不要每做一点问一次）。",
      antiExample: "每做一点都问用户——这会让流程变慢，不是这招。",
      cost: "多一次用户确认；但换来更低的返工风险。",
      seenIn: ["web-video-presentation SKILL.md Checkpoint Plan + Checkpoint Audio", "extracting-skill-patterns（genre + 受众路由也是便宜返工点）"],
      relatedPatterns: [
        { to: "P1", label: "原料分流", relation: "前置：分流是入口最便宜的决定，比 checkpoint 还早" },
        { to: "P5", label: "风格锚点", relation: "搭配用：checkpoint 后接锚点——确认完方向再做透一个真实样本" },
        { to: "P8", label: "审阅清单接修复", relation: "checkpoint 之前必须发生：自检通过才进 checkpoint" }
      ]
    },
    {
      name: "风格锚点（先做透一个再放手）",
      status: "候选",
      prevents: "批量开发或并行扩展前没有真实样板，整体方向跑偏；多 agent 各写各的，最后每章像不同项目。",
      therefore: "先用主线程完整做透一个真实切片（不是低保真骨架）→ 让用户验收 → 暴露 reference 盲区 → 修指引 → 再扩展。",
      useWhen: "skill 后续会批量生成相似单元（章节 / 客户 / 文件 / 页面 / 测试场景）时。",
      howToReuse: "先用主线程完整做透一个真实切片（不是低保真骨架）→ 让用户验收 → 暴露 reference 盲区 → 修指引 → 再扩展。",
      antiExample: "先做一个低保真骨架就开始并行——锚点暴露不出真实质量问题，等于没做。",
      cost: "前期速度变慢，但能减少大面积返工。",
      seenIn: ["web-video-presentation SKILL.md Phase 2.2 第 1 章主线程做完"],
      relatedPatterns: [
        { to: "P4", label: "便宜返工点 checkpoint", relation: "前置：checkpoint 之后才进入锚点" },
        { to: "P6", label: "单一必读入口", relation: "搭配用：锚点暴露的 reference 盲区，靠'每次必读入口'承接修复" }
      ]
    },
    {
      name: "单一必读入口（重复阶段抗降级）",
      status: "候选",
      prevents: "重复阶段中 AI 每次记住一部分规则忘掉另一部分；长会话里上下文疲劳让原则一点点掉落。",
      therefore: "把这阶段的所有原则收敛到一份 reference；在 SKILL.md 中标注它为'每次必读'；其它 reference 转为'按需查'。",
      useWhen: "skill 的某个阶段会重复执行 N 次（每章 / 每用户 / 每文件 / 每场景）且容易因疲劳降级时。",
      howToReuse: "把这阶段的所有原则收敛到一份 reference；在 SKILL.md 中标注它为'每次必读'；其它 reference 转为'按需查'。",
      antiExample: "把规则散在 8 个 reference 然后说'按需读取'——agent 会本能跳过，导致原则不被读到。",
      cost: "单一入口会变长，需要结构清晰。",
      seenIn: ["web-video-presentation references/CHAPTER-CRAFT.md（每章必读）"],
      relatedPatterns: [
        { to: "P3", label: "上游不抢下游判断权", relation: "下游接管：上游让出的决策权要靠这份 reference 承接" },
        { to: "P5", label: "风格锚点", relation: "搭配用：锚点暴露的盲区进 reference，reference 反过来抗后续章节降级" }
      ]
    },
    {
      name: "运行时真相源",
      status: "候选",
      prevents: "多个文件分别记录同一事实（step 数 / 字段 / ID），最后漂移导致行为错位。",
      therefore: "指定最接近运行时、最容易校验的文件为唯一真相源；其它文件允许滞后；提供同步脚本（extract-* 类）让人可以手动同步。",
      useWhen: "规划、代码、生成物都涉及同一个运行时事实时。",
      howToReuse: "指定最接近运行时、最容易校验的文件为唯一真相源；其它文件允许滞后；提供同步脚本（extract-* 类）让人可以手动同步。",
      antiExample: "outline / 代码 / 配置 / 音频文件都维护一份 step 数——这是漂移温床，不是这招。",
      cost: "必须写校验和同步规则；上游修改时需要明确何时同步回来。",
      seenIn: ["web-video-presentation narrations.ts", "extracting-skill-patterns（pattern card 状态以独立 sighting 为准也属于这类）"],
      relatedPatterns: [
        { to: "P9", label: "主时钟原则", relation: "搭配用：真相源定义'是什么'，主时钟定义'谁推进'——共同确保运行时确定性" },
        { to: "P2", label: "双源分工", relation: "区别于：双源是'两个不同维度的源'，运行时真相源是'同一维度避免漂'" }
      ]
    },
    {
      name: "审阅清单接修复（self-check + repair loop）",
      status: "候选",
      prevents: "自检变成报告装饰——agent 发现问题后原样转述给用户但产出文件没改，用户以为在交付实际只是转述问题。",
      therefore: "每个检查清单都明确写'拿到 fail 列表后必须先按列修'；优先用独立 reviewer agent（Agent Teams / subAgent），降级才自己核查；汇报时必须包含'改了什么'，不只是'检查发现什么'。",
      useWhen: "skill 的某个产出有客观可验证的检查清单（格式 / 完整性 / 命名 / 边界），且交付时 agent 容易把'发现问题'当成完成检查时。",
      howToReuse: "每个检查清单都明确写'拿到 fail 列表后必须先按列修，不允许只把问题转述给用户'；优先用独立 reviewer agent（Agent Teams / subAgent），降级才自己核查；汇报时必须包含'改了什么'，不只是'检查发现什么'。",
      antiExample: "写一堆 checklist 但没有'fail 后必须修'规则——agent 会把检查结果当成报告内容；这不是这招。",
      cost: "交付前会多一轮修改；需要 reviewer / subAgent 能力（或退化到当前 agent 自己严格核查）。",
      seenIn: ["web-video-presentation SKILL.md 硬性自检协议（贯穿三个产出：script / outline / 单章实现）"],
      isPlatformGap: "部分。Agent Teams / subAgent / 反馈循环这一类基础设施广义上是平台层应该被改善的，但 skill 内部写明'fail 必须修'是当前能落地的补丁。",
      relatedPatterns: [
        { to: "P4", label: "便宜返工点 checkpoint", relation: "前置依赖：checkpoint 之前的产出必须先走自检 → 修复，否则 checkpoint 在审阅未修过的草稿" },
        { to: "P1", label: "原料分流", relation: "搭配用：分流的产出（script / outline）每一份都要走自检 → 修复闭环" }
      ]
    },
    {
      name: "主时钟原则",
      status: "候选",
      prevents: "自动流程里多个时钟同时争抢推进权，行为不可预测；调试时不知道哪个时钟在管事。",
      therefore: "选一个主时钟（音频 / 事件流 / 测试结果 / 队列状态），其它维度主动适配它；明确'谁让谁等'。",
      useWhen: "做自动化流程（录屏 / 测试 / 部署 / 调度）需要多个事件协同时。",
      howToReuse: "选一个主时钟（音频 / 事件流 / 测试结果 / 队列状态），其它维度主动适配它；明确'谁让谁等'。",
      antiExample: "让音频 / 动画 / 用户点击 / 定时器都能推进——多时钟会让节奏变成隐藏状态机。",
      cost: "其它维度必须主动适配主时钟（这里就是动画适配口播时长）。",
      seenIn: ["web-video-presentation Auto 模式只等音频不等动画"],
      relatedPatterns: [
        { to: "P7", label: "运行时真相源", relation: "搭配用：真相源定义'是什么'（数据），主时钟定义'谁推进'（时间）——共同确保运行时确定性" },
        { to: "P3", label: "上游不抢下游判断权", relation: "对照：主时钟原则是'下游必须适配上游决定的时钟'——上游的决定是有理由的，不是想抢" }
      ]
    }
  ],

  diagrams: [
    {
      id: "main-flow",
      title: "主流程：4 个 Phase + 2 个硬节点",
      type: "flow",
      image: "assets/diagrams/main-flow.svg",
      description: "时间序：Phase 1 内容编写 → Checkpoint Plan → Phase 2 网页开发（脚手架 → 第 1 章锚点 → 第 2-N 章）→ Checkpoint Audio → Phase 3 音频合成（可选）→ Phase 4 录屏。两个 checkpoint 是返工成本拐点。",
      nodes: [],
      edges: []
    },
    {
      id: "truth-source",
      title: "真相源拓扑：article / script / outline / narrations 各管什么",
      type: "source-of-truth",
      image: "assets/diagrams/truth-source.svg",
      description: "非时间序：article 是细节源，script 是节奏源，outline 是计划，narrations.ts 是运行时真相源。计划允许滞后，运行时不允许漂。",
      nodes: [],
      edges: []
    },
    {
      id: "package-map",
      title: "包结构：SKILL.md + 7 references + 主题 + 模板",
      type: "file-map",
      image: "assets/diagrams/package-map.svg",
      description: "SKILL.md 是入口和路由；4 份核心 reference（SCRIPT-STYLE / OUTLINE-FORMAT / CHAPTER-CRAFT / AUDIO）按 Phase 接管；THEMES 系统在 Checkpoint Plan 选；scripts/scaffold.sh 一次建好工程骨架。",
      nodes: [],
      edges: []
    }
  ],

  glossary: [
    {
      term: "article.md",
      plainMeaning: "用户给的原始文章，是画面信息密度的细节来源。",
      whereItAppears: "Phase 1.2 改写出 script.md 之后保留；outline 信息池从它抽；每章实现挂画面细节时回它找。",
      solvedProblem: "防止画面只能复述口播稿（信息密度不足）；防止 AI 为了让画面好看而现编数字 / 案例。",
      howToUse: "我先把它改写成 script.md，同时保留它不删；后面写 outline 信息池、实现单章画面时再回到它里抽数字、引用、案例、对比。",
      commonMisread: "不是临时输入——生成 script.md 后不能删，它继续负责画面密度。"
    },
    {
      term: "script.md",
      plainMeaning: "视频口播节拍稿，观众最后会听到的那条线。用 --- 切节拍。",
      whereItAppears: "Phase 1.2 生成；outline 切 step 时参考；narrations.ts 写文本时参考；音频合成时是文本来源。",
      solvedProblem: "防止视频听起来像论文摘要 / 产品白皮书 / AI 朗读稿。",
      howToUse: "我按 SCRIPT-STYLE.md 改写原文，用 --- 切出一个个完整想法；后面的章节切分、step 估计、narrations.ts 和音频合成都受它影响。",
      commonMisread: "不是短摘要——这个 skill 明确要求保留信息密度，关键数字 / 案例 / 论证链不能为'口语化'剪没。"
    },
    {
      term: "outline.md",
      plainMeaning: "网页开发计划，告诉后面的章节开发：分几章、每章几步、每步屏幕上有什么、有哪些原文细节可挂。",
      whereItAppears: "Phase 1.2 一次产出；Checkpoint Plan 用户审；Phase 2 章节开发开工。",
      solvedProblem: "防止章节开发阶段一边想内容、一边想结构、一边找素材，最后节奏混乱。",
      howToUse: "我按 OUTLINE-FORMAT.md 写章节、step、估时、信息池、素材清单——但不写动画 / CSS 手段 / 毫秒级时长。",
      commonMisread: "不是视觉规划——它不写具体动画 / CSS / 毫秒级时长。这些留给单章实现阶段。"
    },
    {
      term: "信息池",
      plainMeaning: "每章从 article.md 抽出来的一小包可视化细节：数字、引用、案例、时间、对比、出处。",
      whereItAppears: "outline.md 每章首段。",
      solvedProblem: "防止网页画面只是把口播稿打在屏幕上 → 画面没有信息密度，看起来像 PPT 字幕板。",
      howToUse: "我写 outline 时每章首段抽信息池；实现单章画面时回它挂数据 / 引用 / 角标 / pull quote / mono cue。",
      commonMisread: "不是装饰素材清单——它是从原文抽出来、能让画面信息密度高于口播的证据。"
    },
    {
      term: "Checkpoint Plan",
      plainMeaning: "script.md 和 outline.md 写完后必须停下来的硬节点，一次让用户确认 5 件事：稿子 / outline / 主题 / 素材 / 开发模式。",
      whereItAppears: "Phase 1.2 之后，Phase 2 之前。",
      solvedProblem: "防止 AI 在方向没确认时进入昂贵实现 → 全部返工。",
      howToUse: "我汇报 script + outline + 主题推荐（动态读 themes/*/theme.json 主动推 2-3 个）+ 素材需求 + 开发模式选项 → 等用户一次确认 5 件事再进 Phase 2。",
      commonMisread: "不是礼貌询问——它是返工成本控制点。所有东西现在还都是文本，改起来便宜；进了 Phase 2 改起来贵。"
    },
    {
      term: "主题（theme）",
      plainMeaning: "一组 CSS 设计 token + theme.json 元数据，决定整片视频的颜色 / 字体 / 舞台性格。",
      whereItAppears: "Checkpoint Plan 用户选；脚手架复制 active theme 的 tokens.css；章节 CSS 通过 CSS variables 消费。",
      solvedProblem: "防止每章各写各的颜色和字体 → 整条视频看起来像拼贴。",
      howToUse: "Checkpoint Plan 时我动态读 themes/*/theme.json 拿 nameZh / descriptionZh / bestFor / mood 主动推荐 2-3 个；脚手架复制 active theme 的 tokens.css；章节 CSS 必须走主题 token 不能硬编码颜色 / 字体。",
      commonMisread: "不是模板——它只兜底视觉气质，不决定每章动画怎么演。"
    },
    {
      term: "CHAPTER-CRAFT.md",
      plainMeaning: "单章实现时的单一必读 reference，每章都要重新读。涵盖十条原则 / 开工 5 问 / 关系→动作决策树 / 视觉工具箱 / 反 AI 味反模式 / 代码红线 / 完工自检。",
      whereItAppears: "Phase 2.2 第 1 章和 Phase 2.3 第 2-N 章每次实现时。",
      solvedProblem: "防止 agent 把 outline 翻译成一页页大字 PPT 卡片；防止长会话上下文疲劳让原则降级。",
      howToUse: "每次实现单章时我把 CHAPTER-CRAFT.md 作为单一必读入口——它合了所有章节级原则；其它 reference（EXAMPLES / THEMES）转为按需查。",
      commonMisread: "不是美术建议——里面很多规则是验收红线，整章纯文字就要重做。"
    },
    {
      term: "第 1 章风格锚点",
      plainMeaning: "整片视频的样板间。第 1 章必须主线程完整做（不是骨架版），让用户验收视觉气质 / 节奏 / 反 AI 味。",
      whereItAppears: "Phase 2.2，脚手架后 / 第 2 章前。",
      solvedProblem: "防止后面并行或批量开发前，风格和质量标准还没被真实页面验证；防止 CHAPTER-CRAFT 的盲区到第 5 章才暴露。",
      howToUse: "我用主线程完整实现第 1 章（不允许低保真骨架）；用户验收时引导他看视觉气质 / 节奏 / 内容驱动动画 / 双源原则 / 反 AI 味；后续章节参考它的代码风格但不强求视觉完全一致。",
      commonMisread: "不是为了让后面章节视觉完全一致——它是代码和气质的参考，不是抄袭对象；后续章节在主题 token 下自由发挥是设计预期。"
    },
    {
      term: "narrations.ts（运行时真相源）",
      plainMeaning: "每章每个 step 对应的口播文本数组。它的长度等于该章 step 数；运行时所有地方（useStepper / extract-narrations / App / useAudioPlayer）都从这里读。",
      whereItAppears: "每个章节目录里，和 Chapter.tsx 同级。",
      solvedProblem: "防止网页 step、口播文本、音频文件数各自漂移导致 Auto 模式录屏错位。",
      howToUse: "每章实现时同步写 narrations.ts；数组长度严格等于 Chapter.tsx 里 if (step === N) 的最大 N + 1；改章节结构后 bump useStepper.ts 的 STORAGE_KEY 避免持久化游标越界。",
      commonMisread: "不是字幕备份——写错会让 Auto 录屏整片错位。outline 是计划，narrations 是运行时真相。"
    },
    {
      term: "Auto 模式（?auto=1）",
      plainMeaning: "自动播放和自动推进的录屏模式。打开 ?auto=1 后按一次 Space，网页按每段音频播完后自动进入下一步。",
      whereItAppears: "Phase 4 录屏，需要 Phase 3 已合成音频。",
      solvedProblem: "不需要手动点鼠标，也不需要后期对音轨——一镜到底录屏。",
      howToUse: "我提前保证每个 step 的视觉动画不长于对应口播；告诉用户打开 ?auto=1 + 全屏 + 开始录屏 + 按一次 Space + 网页自动播完 + 停录裁头尾。",
      commonMisread: "不是录屏软件——它只让网页按音频节奏自己推进；它故意不等动画结束（主时钟原则），所以动画必须 ≤ 口播时长。"
    }
  ],

  applyIt: {
    summary: "如果你要写一个'把 X 类内容做成 Y 类产物'的 skill（不只是文章 → 视频网页，可以是论文 → 演示、需求 → 设计、数据 → 报告），照这个 skill 的形状抄。先列默认坏 AI 输出（你会观察到什么失败如果 skill 不存在）。再做输入类型分流让 skill 能区分原始素材 / 半成品 / 空主题。再设计中间产物分别管什么、不管什么（避免一份文件吞掉全部职责）。把返工最贵的决定合并到一个 checkpoint。批量生成前先做透一个真实样本作为风格锚点。重复阶段的所有原则收敛到一份必读 reference。最后指定离运行时最近的文件作为真相源，让 step / ID / 字段不会漂。",
    checklistTitle: "10 步清单",
    checklistHeading: "从坏 AI 输出反推到 skill 形状",
    checklistCardTitle: "把这 10 件事先写下来再写代码",
    checklist: [
      "写清楚这个 skill 防什么默认坏 AI 输出（具体到一种偷懒方式或装样行为，不要写'低质量输出'）。",
      "做输入类型分流——列一张表：每行一种输入 → 对应该做的事；空原料就反问，不要硬凑。",
      "设计中间产物的双源分工——明确每个文件管什么、不管什么；不要让一份文件吞掉全部职责。",
      "找出'上游不应该决定'的事——把它们留给下游，写在计划文件的'不要写什么'列表里。",
      "找出返工最贵的决定集合，合并到一个 checkpoint；不要每做一点问一次。",
      "批量生成前先做透一个真实完整样本（不是骨架版）作为风格锚点；让用户验收暴露 reference 盲区。",
      "把重复阶段的所有原则收敛到一份必读 reference——别散在 8 个文件然后说'按需读取'。",
      "指定离运行时最近、最易校验的文件为运行时真相源；其它允许滞后；提供同步脚本。",
      "自动化流程选一个主时钟，其它维度适配它；不要让多个时钟同时争抢推进权。",
      "每个产出物的自检必须接修复动作，不能只把 fail 转述给用户——这是闭环不是仪式。"
    ],
    starterPrompt: "请按 web-video-presentation 的形状，为我的领域设计一个'把 X 类内容做成 Y 类产物'的 skill。先告诉我这个 skill 防什么默认坏 AI 输出（具体到一种偷懒方式，不写'低质量'）。再做输入类型分流。再设计中间产物的双源分工 + 上游不抢下游判断权。再找出返工最贵的决定合并到 checkpoint。再设计批量阶段的风格锚点 + 重复阶段的单一必读入口 + 运行时真相源 + 主时钟。最后写每个产出物的自检 + 修复闭环。不要先写实现代码；先把这些设计层决定写下来。",
    nextSteps: {
      author: [
        "回到 SKILL.md 把 Phase 1.1 的输入类型表给一个没读过 skill 的同事看，他能不能猜到每种输入对应的动作？猜不到就重写 examples 列。",
        "把 references/CHAPTER-CRAFT.md 给写过两章的 agent 看，问它'你记得这里面哪 5 条最重要'——记不住的条目可能信息密度太低，需要拆出真实例子。",
        "下一次接到'帮我做个 X 主题的视频'但用户没给素材时，反问而不是硬凑——让 Phase 1.1 的反问路径被真正走通。",
        "硬性自检协议从'文档里写明'升级到'每个产出有独立 reviewer'——把 SKILL.md 里说的 Agent Teams / subAgent 路径真正接上自动化。"
      ],
      thief: [
        "Patterns 章里挑'双源分工'或'上游不抢下游判断权'：在你的领域找到对应的两个决策维度，写出两个源各管什么。",
        "找到你领域'返工最贵的决定'集合，把它们合并到一个 Checkpoint Plan——不是每做一点问，是一次问完。",
        "强制画一张真相源拓扑图：你领域的运行时真相是什么文件？它和上游计划文件的同步规则是什么？画不出就说明设计还没收敛。",
        "把'审阅清单接修复'抄到你 skill 的关键产出上——每个 checklist 后面强制加'fail 必须修，不允许只汇报'的规则。"
      ]
    }
  }
};
