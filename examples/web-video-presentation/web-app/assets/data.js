window.handbook = {
  meta: {
    title: "Web Video Presentation 解剖手册",
    sourcePath: "/Users/guwanhua/git/garden-skills/skills/web-video-presentation",
    audience: "想偷招的人 / 还没用过这个 skill 的 AI",
    outputMode: "multi-page-web-handbook",
    generatedFor: "让读者看见：当我作为 AI 拿到一篇文章和一个'做成视频网页'的目标，这个 skill 是怎么把我从'拼几页大字 PPT'拦下来、改写成'内容 → 节奏 → 主题 → 章节 → 音频 → 录屏'的完整生产线的。"
  },

  overview: {
    domainPrimer: "这个 skill 不是模板、也不是组件库——是一份「把文章做成可录屏视频网页」的工作步骤指南。它告诉 AI：拿到文章别立刻打开编辑器。先把书面文章改成能念出口的口播稿（script.md），再写一份不带动画的开发计划（outline.md，章节切几段、每段几个画面、每章要挂什么数据都写清楚），让用户一次确认 5 件事——稿子、计划、主题、素材、开发模式。这 5 件确认完，才用 Vite + React + TypeScript 起项目。第 1 章必须先做透，让用户看一眼说「对了就这个味」，再做第 2-N 章。每章的口播文本只存一份在 narrations.ts 里——网页跑起来、合音频、录屏都从这一份读，避免三处各写一套对不上。每个阶段都明明白白告诉 AI：这一刻该做什么决定，什么决定要再等等。",
    oneLiner: "这个 skill 看穿了 AI 的本能：拿到「把文章做成视频」，AI 会拆成几页大字 PPT 加几个淡入淡出动画，看着像视频，其实是 PPT 加动效。skill 的反击是把视频生产拆成 4 个不会互相污染的阶段（写内容 / 跟用户对齐 / 写网页 / 合音频录屏），每阶段只让 AI 做这一阶段该做的决定，下一阶段才能做的判断这一步不准提前做。运行时只信一份口播文本（narrations.ts），网页跑、音频合、录屏都从这一份读——三处各写一套就会悄悄对不上。",
    wowMoment: "它不让我从文章直接跳进 React 代码。先把文章改成能念出口的 script.md，再写一份只写章节切分和画面内容、不写动画的 outline.md；让用户在所有东西还都是文本的时候一次确认 5 件事——稿子改不改、计划改不改、选哪个主题、素材怎么准备、章节怎么并发。这一刻是改起来最不花时间的时候。5 件事确认完才起脚手架；第 1 章必须先做透，用户验完那个味才扩展到第 2-N 章。每章口播文本只在 narrations.ts 里有一份——这样 step 数、音频文件、自动播放录屏三件事不会悄悄对不上。",
    badResultPrevented: "防止 AI 把「做视频」做成「几页大字 PPT 加几个淡入淡出」；防止 outline 把动画写死、导致每个章节实现的 agent 只能照搬，没有视觉判断空间；防止网页里的 step 数、口播文本、音频文件三处各写一套，录屏的时候才发现对不上；防止没有先做透第 1 章就一口气并发 16 章，每个 agent 凭直觉走、风格全跑偏；防止「每章实现」这种重复动作因为会话太长 AI 累了、变成只剩骨架的纯文字 PPT。",
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
        { kind: "para", text: "我手里现在是一段话 + 一个附件 `article.md`。用户的请求是「做成视频」。" },
        { kind: "para", text: "第一秒我本能想打开编辑器、开建项目——这是最有「进度感」的下一步。" },
        { kind: "para", text: "skill 不让。它让我先把一件事看清楚：用户给我的，到底是哪一种原料？三种原料的下一步动作完全不一样，当一回事处理会坏。" },
        { kind: "para", text: "SKILL.md（AI 进来要读的第一份文件）把这三种情况写成一张表。表里会出现两个我后面要做的文件，先讲清楚是什么：" },
        { kind: "list", items: [
          "`script.md` —— 能念出口的口播稿。Stage 02 产出。",
          "`outline.md` —— 不带动画的开发计划，写章节切几段、每段几个画面、每章要挂什么数据。Stage 04 产出。"
        ]},
        {
          kind: "code",
          lang: "markdown",
          text: "| 用户给的东西 | 我该做什么 |\n|---|---|\n| 一篇正经的书面文章 | 一次产出 script.md + outline.md |\n| 已经口语化的稿子 | 直接当 script.md，再写 outline.md（简化版） |\n| 只甩了一个主题 | 反问用户先给素材或大纲，不替他构思 |"
        },
        { kind: "para", text: "我看用户的 `article.md`：标题、段落、引用都在，是篇正经的书面文章。所以走表里第 1 行。" },
        { kind: "para", text: "如果我跳过这一步、把所有输入按一种方式处理，会出三种坏后果：" },
        { kind: "list", items: [
          "把已经口语化的稿子当文章再改写一次——信息会丢一轮。口语化对口语化，越改越像摘要。",
          "把空主题硬当文章——AI 替用户构思了内容。表面像在帮忙，实际把内容设计权偷过来了。",
          "把原始文章直接拿去开建网页——跳过了改口播 / 写计划这两步，后面就回到「大字 PPT 加淡入淡出」那种做坏了的样子。"
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
        { kind: "para", text: "上一步我决定走「书面文章 → 口播稿」这条路。这一步开始改写。" },
        { kind: "para", text: "skill 让我先读 references/SCRIPT-STYLE.md——这份文件讲改写要守的三条标准：形式（短句、能念）、风骨（数字、案例、出处不能丢）、念出来（去掉 AI 朗读腔，写人开口说话的样子）。" },
        { kind: "para", text: "把开头给的那段书面句改成口播，我的版本是：" },
        {
          kind: "code",
          lang: "markdown",
          text: "文字这块是真变强了。\n\n---\n\n以前一张海报里只要有中文，基本就露馅。\n\n---\n\n现在不一样了。海报里的中文，准确率从 64% 提到了 89%。\n\n---\n\n但复杂排版下还是会糊——大概十张里有一张。"
        },
        { kind: "para", text: "三个改动点：" },
        { kind: "list", items: [
          "长被动句变短主动句，一口气念得出来。「文字这块是真变强了」就是一个例子。",
          "64% / 89% / 11% 这三个数字都留着——这是观众听完会记住的支点，不能丢。「十张里有一张」是 11% 的口语版，不是砍数字。",
          "用 `---` 切自然节拍。每段一个完整想法。这个 `---` 后面有用——stage 4 写 outline 切画面的时候要参考它。"
        ]},
        { kind: "para", text: "反例（看着像在改但不是）：" },
        { kind: "list", items: [
          "改成「GPT Image 在文字方面有了很大进步，让我们一起来看看」——信息全丢了，是 AI 朗读腔。",
          "改成「这个模型的中文文字渲染准确率显著提升至 89%」——念出来卡，「显著提升至」不是人开口说话的样子。",
          "把 64% / 89% / 11% 全砍了只留「更准了」——观众听完什么具体事都没记住。"
        ]},
        { kind: "para", text: "最后说一件这一步埋下的事：`---` 切出来的每一段，大致对应视频里的一个画面。视频里用户点一次往下推到下一个画面，这叫一个 step——后面 stage 4 写 outline 切画面的时候，就按这个节拍切。" },
        { kind: "para", text: "这份 script.md 后面会被读三次：stage 4 写计划时切画面参考、stage 11 写每章的口播文本（落到 `narrations.ts`——网页跑起来时唯一从那里读口播的文件）时参考、stage 12 合音频时直接当文本源。" }
      ],
      receives: "article.md（用户原文）或用户已有的口播稿。",
      reads: ["references/SCRIPT-STYLE.md", "article.md"],
      blockedShortcut: "不能把书面文章直接搬到视频里；不能为了「口语化」把数字、案例、论证链剪没；不能写 AI 朗读腔。",
      action: "按 SCRIPT-STYLE.md 三层标准（形式 / 风骨 / 念出来）改写 article.md：去除书面长句、去除 AI 朗读腔、用 --- 切自然节拍、保留关键事实和数字。",
      output: "script.md（口播节拍稿）。",
      nextConsumer: "outline.md 切章节 / step（用户点击一次推进到的下一个画面状态）时参考节拍；narrations.ts 写口播文本时回查；音频合成读它的语义。",
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
        { kind: "para", text: "这一步 AI 不写任何文件——它只是「保留 article.md 不删」。所以几乎没什么会发散，唯一可能犯的错是不知不觉把原文清掉（觉得「我都改成 script.md 了，原文没用了」）。skill 的工作就是让 AI 停住这只想清理的手。" },
        { kind: "para", text: "skill 不让我删 article.md。SKILL.md 在工作目录约定里写明：用户给的原文，必须留着，不删。" },
        { kind: "para", text: "听起来多此一举——我都写出 script.md 了，原文留着干嘛？看下面这件事就懂了。" },
        { kind: "para", text: "现在 script.md 里我写的是「文字这块是真变强了」。这句念出来够了——短、清楚、有情绪。" },
        { kind: "para", text: "但是等到 stage 8 写第 1 章网页的时候，画面上光这 4 个字撑不住。观众盯一行字看 3 秒，画面就空了。我需要往画面上挂具体的东西：" },
        { kind: "list", items: [
          "GPT-Image-1，2024 年发布",
          "中文海报场景，准确率从 64% 提到 89%",
          "复杂排版下还有 11% 出错",
          "同期 DALL-E 3 中文准确率还在 50% 以下",
          "案例对比图三张"
        ]},
        { kind: "para", text: "这些细节 script.md 里都没有——为了能念，被压成了「真变强了」三个字。如果我现在 `rm article.md` 把原文删了，等到第 1 章实现回头找这些数字，只能瞎编或者干脆把画面砍掉。" },
        { kind: "para", text: "这条规则在 references/CHAPTER-CRAFT.md 里有个名字叫「双源原则」。讲的就是这件事：口播稿管「什么时候说什么」，原文管「画面里挂什么」，两份各管一件事，都得留。" },
        {
          kind: "code",
          lang: "text",
          text: "script.md   管什么时候说什么\narticle.md  管画面里挂什么细节"
        },
        { kind: "para", text: "后面会有三个地方回头读 article.md：" },
        { kind: "list", items: [
          "stage 4 写 outline 时：每章首段从 article 抽 3-5 条事实，列在那一章的开头。",
          "stage 8 起每章写网页代码时：往画面上挂具体数字、引用、案例。",
          "stage 11 写每章的 `narrations.ts` 口播文本时：回原文核对关键事实没说错。"
        ]}
      ],
      receives: "已生成的 script.md + 原始 article.md。",
      reads: ["references/CHAPTER-CRAFT.md 双源原则"],
      blockedShortcut: "不能因为有了口播稿就删掉或忽略原文；不能让一个中间文件吞掉全部职责。",
      action: "明确两个源各管什么：script.md 管口播节奏（什么时候说什么）、article.md 管画面密度（每章可挂多少细节）。outline 里每章的事实清单从 article 抽；后续写每一章网页代码时再回 article 找具体数字、引用、案例、对比。",
      output: "两个源都留下：article 管细节、script 管节奏。",
      nextConsumer: "stage 4 写 outline 每章事实清单时；stage 8 起每章写网页代码挂画面细节时。",
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
      summary: "outline 写章节、step、估时、每章事实清单、素材清单——不写动画 / CSS / 毫秒级时长。这些视觉判断留给后面写每一章代码的人，避免计划阶段把动画写死、让写代码的 agent 只能照搬。",
      preTest: "script.md + article.md 都在了。outline 该写多细？章节切分没问题、step 切分也合理——但要不要写每个 step 的动画类型（blur clear / wipe / 弹簧）？要不要写每 step 的毫秒时长？写下你的判断再读。",
      narrativeBody: [
        { kind: "para", text: "上一步原文留下了、口播稿写完了。这一步要写开发计划 `outline.md`——告诉后面写网页代码的 agent 每一章切几段、每段画面上放什么、要挂哪些数据。" },
        { kind: "para", text: "OUTLINE-FORMAT.md 给我一张表，写清楚这份计划要写什么、不要写什么：" },
        {
          kind: "code",
          lang: "text",
          text: "必须写                              不要写\n─────                              ─────\n章节切分                           具体动画类型（blur clear / wipe）\n每章 step 数 + 估时                CSS 实现手段（filter / SVG / clip-path）\n每个 step 屏幕内容                 毫秒级时长（~2.5s / 80~120ms）\n每章首段事实清单                   持续微动 / 错峰量等微观节奏\n末尾全片素材清单"
        },
        { kind: "para", text: "看出来了吗？视频用什么动画、哪一步 blur、哪一步 wipe、每一步几毫秒——这些都不在 outline 里。" },
        { kind: "para", text: "为什么不写？因为我现在还做不了这个判断。「第 3 章用什么动画」取决于第 3 章和第 2 章怎么衔接、用户最后选了哪个主题、第 1 章定下来的字号大小——这些都要等到后面写每一章的时候才知道。" },
        { kind: "para", text: "如果我现在就写死「第 3 章 step 2 用 0.6s blur-in」，等到 stage 10 第 3 章实现的那个 agent 拿到这份计划，他就只能照搬，哪怕这一章其实做「文字被切开」的效果更合适。我抢了后面那个 agent 该做的决定。" },
        { kind: "para", text: "简单说一句：写计划的人不替写代码的人做决定。" },
        { kind: "para", text: "GPT Image 视频的 outline，第 1 章长这样——真材料：" },
        {
          kind: "code",
          lang: "markdown",
          text: "## 第 1 章 · 这个模型为什么值得讲（5 step / 估时 32s）\n\n**信息池（这一章能挂的事实清单）：**\n- GPT-Image-1 发布于 2024\n- 中文海报场景准确率 64% → 89%\n- 复杂排版 11% 错误率\n- 同期 DALL-E 3 / Midjourney v6 在中文上仍 ≤ 50%\n\n**素材清单：**\n- 三张对比图（GPT Image / DALL-E 3 / Midjourney 同 prompt）\n- 一张 64% → 89% 的对比表\n- B 站封面候选 2 版\n\n**Step 1：** hero —— GPT-Image-1 名字 + 一句话标语\n**Step 2：** 64% → 89% 大数字对比，附「中文海报」小注\n**Step 3：** 三模型对比图依次出现\n**Step 4：** 11% 错误率 —— 给一个具体反例\n**Step 5：** 留一个钩子：「那它是怎么做到的？」→ 进第 2 章"
        },
        { kind: "para", text: "注意里面没写「Step 2 用 0.6s blur-in」、「Step 3 用 wipe 切换」。这些等到 stage 9 写第 1 章 React 代码的时候，我会知道主题颜色、字号、和第 2 章怎么衔接，再做判断。" }
      ],
      receives: "script.md + article.md + 目标时长 + 风格信号。",
      reads: ["references/OUTLINE-FORMAT.md", "script.md", "article.md"],
      blockedShortcut: "不能写具体动画类型（blur clear / wipe / 弹簧）；不能写 CSS 实现手段（filter / SVG / clip-path）；不能写毫秒级时长（~2.5s / 80~120ms）；不能写持续微动 / 错峰量等微观节奏。",
      action: "按 OUTLINE-FORMAT.md 切章节 → 每章切 step → 每步写屏幕内容（hero / 数据 / 标语 / 列表项）→ 每章首段列事实清单（数字 / 引用 / 案例 / 出处）→ 末尾列素材清单。OUTLINE-FORMAT.md 的「必须写 / 不要写」边界要严守，特别是「不写动画」这条。",
      output: "outline.md（开发计划）。",
      nextConsumer: "Checkpoint Plan 让用户审；Phase 2 章节开发开工时按章读。",
      reusableMove: "上游规划内容边界，下游做实现判断——上游不要抢下游在信息齐时才该做的决定。",
      challenges: [
        "如果某 step 在 outline 里写「数据对比图依次出现」，第 1 章实现时发现这一 step 用「三个数字大字闪现 + 一张图收束」更打——可以改 step 数吗？outline 该重写还是直接在 Chapter.tsx 调？为什么？",
        "outline 估时第 1 章 32s，最后实现下来 45s——这算 outline 错还是 Phase 2 调整正常？要不要回头改 outline？",
        "用户在 Checkpoint Plan 时说想加双语字幕——这件事在 outline 范围里吗？是改 outline 还是开新文件？",
        "outline 里每章的事实清单抽得太少（每章只 1 条）和抽得太多（每章 10 条）各会让下游怎么坏？怎么判断要多少条合适？"
      ]
    },
    {
      id: "self-check",
      title: "自检 → 修复，再汇报（不允许只转述 fail）",
      summary: "skill 不让我把「生成完文件」当交付。每份产出（script / outline / 章节代码）都必须走自检 → 修复 → 再汇报。优先级：Agent Teams > subAgent > 当前 agent 自检——不允许把 fail 项原样转述给用户而不修。",
      preTest: "script.md 和 outline.md 两份草稿都摆在你面前了。下一步是发给用户看，还是别的？写下你的判断再读。",
      narrativeBody: [
        { kind: "para", text: "script.md 和 outline.md 草稿都摆在我桌上了。" },
        { kind: "para", text: "我本能想的下一步是发给用户看——「这是稿子，这是计划，你审一下吧」。" },
        { kind: "para", text: "skill 不让。它说「写完」不等于「可以交付」。中间还有一步：自己先按清单核查一遍，按检查结果改，改完了才能给用户。" },
        { kind: "para", text: "为什么这么严？因为「我写完了，发现这几个问题，你看着办」这种动作听起来很专业，实际是把问题塞回给用户自己处理——我一个字都没修。skill 把这种动作定义成失败。" },
        { kind: "para", text: "由谁来做这次核查？skill 给了三档选项，能用第一档就用第一档：" },
        { kind: "list", items: [
          "第一档（最准）：起一个独立的 reviewer agent（Agent Teams 模式——开一个新的 agent 专门做检查），给它 SCRIPT-STYLE.md 的三条标准 + OUTLINE-FORMAT.md 的边界表，让它逐条核查。",
          "第二档（可接受）：起一个 subagent 当 reviewer——比 Agent Teams 轻一些，但仍然是另一个 agent 看。",
          "第三档（最不准）：当前 agent 自己逐条核查。最不可靠——我已经看过这份内容很多遍，盲点多。"
        ]},
        { kind: "para", text: "我这次实际跑出来的 reviewer 报告是：" },
        {
          kind: "code",
          lang: "text",
          text: "[Reviewer subAgent 报告]\nSCRIPT-STYLE 三条：\n  形式 ✅ 短句 / --- 节拍\n  风骨 ✅ 数字 64% / 89% / 11% 都保留\n  念出来 ❌ Step 4 的「局部错误率约为 11%」是书面词\n\nOUTLINE-FORMAT 边界：\n  ❌ 第 3 章 step 3 写了「动画用 fade-in」（违反「不写动画」）\n  ❌ 第 1 章事实清单只列了 2 条（OUTLINE-FORMAT 建议 ≥ 3）\n  ✅ 估时 / 章节切分 / 素材清单都完整"
        },
        { kind: "para", text: "拿到这份 fail 列表，我先按列改——不是先告诉用户：" },
        { kind: "list", items: [
          "Step 4 那句「局部错误率约为 11%」改成「十张里有一张会糊」。",
          "第 3 章那个「fade-in」删掉，先改成「小数字依次浮上来」——等一下，「依次浮上来」也越界了，这也是在描述动效。再改一次，改成「三个数字逐个出现」。这是动作意图，留给写代码的人发挥。",
          "第 1 章事实清单补两条，凑到 4 条。"
        ]},
        { kind: "para", text: "改完才向用户汇报：「script + outline 完成。自检发现 3 项 fail，全部已改：Step 4 念法 / 第 3 章动画词 / 第 1 章事实清单。可以审稿了。」" },
        { kind: "para", text: "这一段才是完整动作：做了 → 自查 → 修了 → 报。少了「修」这一步就是装样子。" }
      ],
      receives: "草稿态的 script.md + outline.md。",
      reads: ["references/SCRIPT-STYLE.md 三条标准自检清单", "references/OUTLINE-FORMAT.md 边界自检清单", "SKILL.md 自检协议（写完 → 自查 → 修 → 报）"],
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
      title: "Checkpoint Plan：一次和用户对齐 5 件事",
      summary: "script.md + outline.md 自检通过后必须停下来。skill 不让我直接进 stage 7 开建项目——所有东西现在还都是文本，改稿子 / 改 outline / 换主题 / 补素材都不花时间；等 React / CSS / 动画都写完，任何方向错了改回去都要重来一遍。",
      preTest: "设想你和我坐同一把椅子上。script.md 自检过了，outline.md 自检过了，文件就在眼前。你下一步的本能是直接 npm run scaffold 开建脚手架，还是停下来问点什么？停的话——问几件事？写下你的答案，再往下看我（被 skill 拦着的 AI）实际怎么走。",
      narrativeBody: [
        { kind: "para", text: "这一步 AI 干的事是「按 SKILL.md 列的 5 件事发 prompt 问用户，然后等」。问什么、怎么排版、5 件事是哪 5 件，全都是写好的——AI 没创作空间。唯一有点判断的是按用户内容关键词主动从 themes/ 里挑 2-3 个主题推荐——但这也是「查匹配」不是「想新东西」。" },
        { kind: "para", text: "我现在的本能是开始写代码。两份文本草稿都自检过、看起来没毛病，下一秒我就想跑 scaffold.sh 把项目骨架建起来——这是最有「进度感」的下一步。" },
        { kind: "para", text: "skill 不让。它在 SKILL.md 里给这个时刻起了个名字，叫 Checkpoint Plan。意思是：所有东西都还是文本、还没写一行代码的这一刻，停下来，一次问用户 5 件事。" },
        { kind: "para", text: "为什么是这一刻停，不是更早或更晚？因为现在改回去几乎不花时间——改稿子、改计划、换主题、补素材，每一项改完都不影响别的。" },
        { kind: "para", text: "等我跑完 scaffold、写完 16 章 React 组件、调完 CSS、合成完音频，这时候任何一个方向错了，改回去都要把后面这一串重做一遍。停在「都是文本」这一刻，是为了避开那种从头返工的情况。" },
        { kind: "para", text: "选 5 件——不是 1 件，也不是 10 件。1 件不够（用户审了稿子但主题没对，开建之后还是要回头）；10 件太碎（用户被淹没在选项里，注意力分散）。这 5 件是这个 skill 在多次实战里挑出来的、改起来最贵的几个方向。" },
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
      title: "用脚手架建项目 + 删掉示例章节",
      summary: "用户在 Checkpoint Plan 确认主题后，skill 让我跑 scripts/scaffold.sh 一次建好 Vite + React + TS 项目，里面 16:9 舞台、stepper、隐藏进度条、Auto / Audio / Manual 模式、主题颜色、抽取 / 合成脚本、示例章节都接好。第一件事是删掉示例章节，免得它的视觉风格偷偷混进真实内容。",
      preTest: "Checkpoint Plan 5 件事都对齐了——主题选了 editorial-rust，开发模式选 B 顺序，素材用户提供。下一步你的本能是开建 `src/chapters/01-gpt-image-overview/Chapter.tsx` 这个文件，还是别的？",
      narrativeBody: [
        { kind: "para", text: "这一步 AI 干的事是「跑两行命令 + 删一个目录」——所有文件 / 代码 / 配置都是 scripts/scaffold.sh 写好的，AI 一行没写。几乎没发散空间。唯一可能犯的错是忘记跑 `rm` 把示例章节删掉，让那种紫粉渐变 demo 风的样式偷偷影响后面的开发。" },
        { kind: "para", text: "skill 让我先跑一行命令：" },
        {
          kind: "code",
          lang: "bash",
          text: "bash scripts/scaffold.sh ./presentation --theme=editorial-rust"
        },
        { kind: "para", text: "为什么不让我手写项目骨架？因为这个 skill 的项目里有 7 处零件要接，每一处都容易漏：" },
        { kind: "list", items: [
          "Vite + React + TS 配置 + tsconfig 严格模式",
          "16:9 舞台 CSS（aspect-ratio + 居中 + 主题颜色变量挂载点）",
          "useStepper hook（按键推进 / 用 localStorage 记住当前在哪一步 / step 越界保护）",
          "隐藏的进度条（录屏时不入镜，加 ?dev=1 才显示）",
          "Auto / Audio / Manual 三种播放模式 + URL 参数解析",
          "用户选的主题，它的 tokens.css 拷到项目里",
          "抽取 / 合成音频的两个脚本（extract-narrations / synthesize-audio）"
        ]},
        { kind: "para", text: "手写至少漏一两处——尤其是 useStepper 的 STORAGE_KEY 怎么命名、隐藏进度条 `?dev=1` 怎么触发，这种细碎接线最容易忘。脚手架不是为了显得聪明，是为了不漏。" },
        { kind: "para", text: "脚手架跑完先验证一下：" },
        {
          kind: "code",
          lang: "bash",
          text: "cd presentation && npx tsc --noEmit  # typecheck 通过\nls src/chapters/                       # 看里面有什么"
        },
        { kind: "para", text: "看到 `src/chapters/01-example/` 目录——这是 scaffold 自带的示例章节。下一步必做的事：" },
        {
          kind: "code",
          lang: "bash",
          text: "rm -rf src/chapters/01-example\n# 然后从 src/registry/chapters.ts 移除：\n#   import { EXAMPLE_CHAPTER } from '../chapters/01-example';\n#   及数组里的 EXAMPLE_CHAPTER"
        },
        { kind: "para", text: "为什么必删？因为这个示例章节的视觉风格（紫粉渐变 + 圆角彩色边框 + 假图标）是 demo 风，不是正片风。如果留着开建第 1 章，色板和动画会偷偷影响我——「示例那种花里胡哨混进真实内容」是这个 skill 一再见到的做坏了的样子。" }
      ],
      receives: "用户选定的主题 id。",
      reads: ["scripts/scaffold.sh", "themes/<id>/tokens.css"],
      blockedShortcut: "不能手写项目结构——脚手架接的零件（音频脚本 / 进度条 / Auto 模式 / 主题颜色 / stepper）很容易漏；不能保留 01-example 进真实开发，示例那种花里胡哨会偷偷混进正片。",
      action: "跑 `scaffold.sh ./presentation --theme=<id>`，跑完立即 `rm -rf presentation/src/chapters/01-example`，并从 chapters.ts 里移除 EXAMPLE_CHAPTER 的 import 和数组项。",
      output: "presentation/ 项目骨架（typecheck 通过）。",
      nextConsumer: "stage 8 写第 1 章。",
      reusableMove: "脆弱、重复、容易漏的零件接线放进脚本——脚手架不是为了聪明，是为了不漏。",
      challenges: [
        "用户已经有自己的 React + Vite 项目，能不能跳过 scaffold 把这个 skill 的代码塞进去？哪些工程接线必须复制，哪些可以共用？",
        "scaffold 跑完 npm install 因网络失败——是反问用户还是默默重试？",
        "用户在 Checkpoint Plan 时选了 editorial-rust，但 scaffold 跑完发现 themes/editorial-rust/tokens.css 缺一个变量——是修 tokens.css 还是回 Checkpoint Plan 让用户重选？",
        "为什么 scaffold 不直接把 example chapter 排除在 templates 之外，而是复制完再让我删？删的步骤会不会有 agent 忘记？"
      ]
    },
    {
      id: "first-chapter",
      title: "第 1 章必须先做透 + 让用户验收",
      summary: "脚手架建好了，但 skill 不让我立刻并发开做所有章节。第 1 章必须先在主线程里完整做完（不是先做骨架占位），让用户先看一遍：视觉风格对不对、节奏对不对、有没有 AI 味。这一章会被后面所有章节当样板参考——所以它得是完整版，不能是骨架。",
      preTest: "脚手架建好了，示例章节也删了。第 1 章你的本能是：(a) 先写一个粗糙骨架（占位文字 + 灰块）让用户看结构；(b) 直接做完整版（真节奏、真视觉、真素材）。选哪个？为什么？",
      narrativeBody: [
        { kind: "para", text: "skill 强制选 (b)。第 1 章必须在主线程里完整做完，让用户验收三件事：视觉风格对不对、节奏对不对、有没有 AI 味。" },
        { kind: "para", text: "为什么不让先做骨架版？因为骨架版暴露不出真实问题。等所有章节都做骨架再统一升级，这时候才会发现主题颜色在真实内容下不合适、CHAPTER-CRAFT.md 某条原则在长文本下崩、字号在 16:9 舞台上太小——这些只有真实样本才会暴露。" },
        { kind: "para", text: "第 1 章会被后面所有章节当样板参考：代码风格、画面密度、动画尺寸。如果样板本身是骨架，后面 5 章拿着它对齐，对齐的就是个空架子。" },
        { kind: "para", text: "好。下面具体看一下：这一步我手里拿到什么、要产出什么、中间被什么约束。这是整条流水线里 AI 第一次真正写实现代码（前面 stage 1-6 都是写 markdown 计划，stage 7 是跑脚手架命令）。" },
        { kind: "para", text: "**我手里有 3 份输入。**" },
        { kind: "para", text: "第一份：outline.md 第 1 章那段（stage 4 写的，stage 6 用户审过的）：" },
        {
          kind: "code",
          lang: "markdown",
          text: "## 第 1 章 · 这个模型为什么值得讲（5 step / 估时 32s）\n\n**事实清单：**\n- GPT-Image-1 发布于 2024\n- 中文海报场景准确率 64% → 89%\n- 复杂排版 11% 错误率\n- 同期 DALL-E 3 / Midjourney v6 在中文上仍 ≤ 50%\n\n**Step 1：** hero —— GPT-Image-1 名字 + 一句话标语\n**Step 2：** 64% → 89% 大数字对比，附「中文海报」小注\n**Step 3：** 三模型对比图依次出现\n**Step 4：** 11% 错误率 —— 给一个具体反例\n**Step 5：** 留一个钩子：「那它是怎么做到的？」→ 进第 2 章"
        },
        { kind: "para", text: "第二份：用户在 Checkpoint Plan 选的主题 `editorial-rust` 对应的颜色变量（stage 7 脚手架拷进项目的 `tokens.css`）：" },
        {
          kind: "code",
          lang: "css",
          text: ":root {\n  --theme-bg: #1a0f0a;          /* 深焦底 */\n  --theme-fg: #f4e8d4;          /* 米白主文 */\n  --theme-fg-muted: #8b7a5f;    /* 弱化色 */\n  --theme-accent: #c8472e;      /* 焦红强调 */\n  --theme-hero-font: \"Source Serif Pro\", Georgia, serif;\n  --theme-body-font: \"Inter\", sans-serif;\n}"
        },
        { kind: "para", text: "第三份：article.md 原文里对应的段落（stage 3 我留下来没删的那一份），里面有 outline 事实清单挂不下的更细节细节——后面写画面要回头查。" },
        { kind: "para", text: "**我要产出 3 个文件，都在 `src/chapters/01-gpt-image-overview/` 下。**" },
        { kind: "para", text: "第一个：`Chapter.tsx`——React 组件，用 `useStepper` 拿当前是第几 step，根据 step 渲染不同画面。下面是第 1、2 步的真实代码（完整的 5 步太长，截 step 0 + step 2 看个意思）：" },
        {
          kind: "code",
          lang: "tsx",
          text: "import { useStepper } from '../../hooks/useStepper';\nimport './Chapter.css';\n\nexport function Chapter() {\n  const { step } = useStepper(5);  // 这一章 5 个 step\n\n  return (\n    <div className=\"ov-stage\">\n      {step === 0 && (\n        <h1 className=\"ov-hero\">GPT-Image-1</h1>\n      )}\n\n      {step === 2 && (\n        <div className=\"ov-compare\">\n          <div className=\"ov-num ov-num-old\">64<sup>%</sup></div>\n          <div className=\"ov-arrow\">↗</div>\n          <div className=\"ov-num ov-num-new\">89<sup>%</sup></div>\n          <p className=\"ov-cap\">中文海报场景</p>\n        </div>\n      )}\n\n      {/* step 1 / 3 / 4 同样 if (step === N) 一个画面 */}\n    </div>\n  );\n}"
        },
        { kind: "para", text: "第二个：`Chapter.css`——这一章的样式。注意所有颜色 / 字体都用 `var(--theme-*)` 变量，class 前缀 `.ov-` 把这一章的样式锁在自己范围内，不污染别章。" },
        {
          kind: "code",
          lang: "css",
          text: ".ov-stage {\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.ov-compare {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  align-items: center;\n  gap: 32px;\n}\n\n.ov-num {\n  font-family: var(--theme-hero-font);  /* 用主题字体，不写死 */\n  font-size: 8rem;\n  font-weight: 700;\n}\n\n.ov-num-old { color: var(--theme-fg-muted); }  /* 用主题变量 */\n.ov-num-new { color: var(--theme-accent); }   /* 用主题变量 */\n\n.ov-cap {\n  font-family: var(--theme-body-font);\n  color: var(--theme-fg);\n  font-size: 1.2rem;\n  text-align: center;\n  grid-column: 1 / -1;\n}"
        },
        { kind: "para", text: "第三个：`narrations.ts`——这一章每一步的口播文本。数组长度必须等于 Chapter.tsx 里 `step === N` 的最大 N + 1（5 个 step → 5 条文本）。stage 10 会专门讲它为什么这么重要，这一步先放结果：" },
        {
          kind: "code",
          lang: "ts",
          text: "export const narrations: string[] = [\n  \"文字这块是真变强了。\",                                      // step 0\n  \"以前一张海报里只要有中文，基本就露馅。\",                    // step 1\n  \"现在不一样了。海报里的中文，准确率从 64% 提到了 89%。\",     // step 2\n  \"但复杂排版下还是会糊——大概十张里有一张。\",                // step 3\n  \"那它是怎么做到的？接下来拆架构。\",                          // step 4\n];"
        },
        { kind: "para", text: "**这一步是整本手册里 AI 自由度最高的——它真的在写代码。**默认本能下，AI 选颜色凭感觉、选动画凭直觉、加 emoji 凭审美——会发散得很厉害。CHAPTER-CRAFT.md 这份必读文件就是来卡死这种自由的。" },
        { kind: "para", text: "最核心的一处约束是「关系 → 动作」决策树。outline 说这一 step 是讲 64% → 89%——这是「对比 + 增长」关系。决策树指定的动作是「两个数字同时呈现 + 颜色对比 + 中间一个上升符号」。AI 默认本能不是这样写的：" },
        {
          kind: "code",
          lang: "tsx",
          text: "// AI 默认本能（CHAPTER-CRAFT 不许）：fade-in 一行文字\n{step === 2 && (\n  <p className=\"fade-in\">准确率从 64% 提到 89%</p>\n)}\n\n// 被约束后（决策树指定）：两个数字同时呈现 + 颜色对比 + 上升符号\n{step === 2 && (\n  <div className=\"ov-compare\">\n    <div className=\"ov-num ov-num-old\">64<sup>%</sup></div>\n    <div className=\"ov-arrow\">↗</div>\n    <div className=\"ov-num ov-num-new\">89<sup>%</sup></div>\n  </div>\n)}"
        },
        { kind: "para", text: "决策树的工作是把 AI 「选什么动作」这件事从「凭直觉」变成「按内容关系查表」——同一种关系永远对应同一类动作，整片视频的节奏因此一致。" },
        { kind: "para", text: "另外两处约束没有这么需要看代码，一句话讲清楚就行：**代码红线**说颜色和字体必须用主题变量（`var(--theme-accent)` 而不是 `#c8472e`），换主题不破版的前提——AI 默认本能会直接选个好看的色号。**AI 味反模式清单**显式禁掉五样东西：紫粉渐变背景、圆角彩色边框、emoji 装饰、假插画 / 假图标、卡片化布局——这五样是 ChatGPT 类页面默认审美的特征，观众一眼就能看出「这是 AI 写的」，所以 CHAPTER-CRAFT.md 把它们列出来让 AI 主动剔除。" },
        { kind: "para", text: "**总结一下产出动作：** 5 个 step 都按这套约束走完（决策树挑动作 → 工具箱挑实现 → 用主题变量写 CSS → 避开 AI 味清单），跑 `npx tsc --noEmit` 过编译，按 CHAPTER-CRAFT.md Part 7 完工自检走一遍。" },
        { kind: "para", text: "做完发给用户，让他验 5 件事：" },
        {
          kind: "code",
          lang: "markdown",
          text: "🎨 第 1 章交付（请在浏览器看 http://localhost:5173）\n\n请帮我看 5 件事：\n\n1. **视觉风格** —— 看着像 B 站正片还是像 demo？\n2. **节奏** —— 5 step 看完是不是 32 秒左右？太快太慢？\n3. **内容驱动动画** —— 64% → 89% 用数字对比合不合适？\n   还是更想要别的演法（柱状图 / 文字切割 / 卡片翻转）？\n4. **画面挂的细节** —— 除了口播说的，画面有没有挂额外信息？\n   （我从 article 里挂了「同期 DALL-E 中文 ≤ 50%」、「Midjourney v6\n    在中文海报场景仍弱」两条画面专属细节）\n5. **AI 味** —— 有没有紫粉渐变 / 圆角彩色边框 / emoji / 假插画？\n   你看到任何一处觉得「这是 AI 写的」就指给我。"
        },
        { kind: "para", text: "用户验收过了，后面 5 章才能开做。第 1 章没过——回头改 CHAPTER-CRAFT.md 或主题颜色，再重做。" }
      ],
      receives: "outline.md 第 1 章那段（stage 4 产出 + stage 6 用户审过）+ themes/editorial-rust/tokens.css 的颜色和字体变量（stage 7 拷进项目）+ article.md 第 1 章对应原文段落（stage 3 留下来的）。",
      reads: ["references/CHAPTER-CRAFT.md（每写一章都重读一次）", "themes/editorial-rust/theme.json", "article.md 对应段落"],
      blockedShortcut: "不能先做「粗糙骨架版」（这个 skill 没有骨架版的概念）；第 1 章用户没验收前不能并发后面的章节；不能跳过验收直接做第 2 章；Chapter.css 不能写死颜色 / 字体；不能用紫粉渐变 / 圆角彩色边框 / emoji / 假插画。",
      action: "在主线程里完整产出 3 个文件：`Chapter.tsx`（按 step === N 分支渲染画面，用 useStepper）+ `Chapter.css`（用主题颜色变量，`.ov-` 前缀做样式隔离）+ `narrations.ts`（5 条口播文本对应 5 个 step）。每个画面按 CHAPTER-CRAFT.md「关系 → 动作」决策树选动作 → 工具箱挑实现 → 用主题变量 → 避开 AI 味清单。做完跑 `npx tsc --noEmit` + 按 Part 7 自检。",
      output: "`src/chapters/01-gpt-image-overview/` 下三件套：Chapter.tsx + Chapter.css + narrations.ts，浏览器打开 http://localhost:5173 可以从第 1 step 看到第 5 step。",
      nextConsumer: "用户验收 → 通过后 stage 9 写第 2-N 章时抄这一章的代码风格、画面密度、动画尺寸。",
      reusableMove: "做一整批东西之前，先把一个完整真实样本做透——样板必须是完整版本，不能是粗糙骨架，否则它暴露不出真实问题。",
      challenges: [
        "用户验收说「视觉气质 OK，但节奏太慢」——这是改 Chapter.tsx 还是回头改 script？两种做法的差别是什么？",
        "第 1 章用主题 token 和 CHAPTER-CRAFT 都做对了，但用户说「就是觉得不打」——你怎么定位是哪一层的问题（主题 / CHAPTER-CRAFT 盲区 / outline / script）？",
        "如果第 1 章我做完发现 CHAPTER-CRAFT 的某条原则跟 editorial-rust 主题冲突（比如原则说用大字号但主题 hero 字体宽体撑不下），先改原则、改主题、还是改这一章绕过去？",
        "为什么第 1 章的「锚点」不能是 example chapter（既然它是 scaffold 自带的标准实现）？"
      ]
    },
    {
      id: "chapters-2-to-n",
      title: "第 2-N 章按用户选的模式做，每章都重读 CHAPTER-CRAFT.md",
      summary: "第 1 章验收过了，我按用户选的模式做剩下章节（A 一章一确认 / B 一口气做完再看 / C 几章同时并发）。不管选哪种模式，每写一章都必须重读一次 CHAPTER-CRAFT.md——会话太长 AI 会忘掉原则，写到第 5、6、7 章时容易回退到纯文字 PPT。",
      preTest: "第 1 章用户验收过了。你要做剩下 5 章（GPT Image 视频共 6 章）。本能是开头读一次 CHAPTER-CRAFT.md，后面 5 章都参考第 1 章的代码就够了——对不对？写下你的判断。",
      narrativeBody: [
        { kind: "para", text: "skill 不让我只读一次。每写一章，都必须重新读一遍 CHAPTER-CRAFT.md。每章都读。" },
        { kind: "para", text: "为什么这么固执？因为会话太长的时候 AI 会忘事。" },
        { kind: "para", text: "写到第 5、6、7 章时，上下文已经累积了几千行。这时候 AI 容易回退到默认做法——纯文字 PPT、列表一次性全展示、忘记主题颜色变量直接写死颜色。「读一次就记住」这种事在 AI 这里不成立。" },
        { kind: "para", text: "做 GPT Image 第 2 章（「它是怎么做到的——架构层面」）我走的步骤：" },
        { kind: "list", items: [
          "重新读一次 CHAPTER-CRAFT.md（哪怕第 1 章刚读过）。",
          "「开工 5 问」自问一遍：这一章的「关系」是「机制揭秘」→ 对应动作是「分层揭示」。",
          "决策树：架构图不能一次画完——按 1 模块 1 step 渐进画。",
          "视觉工具箱里挑：用 SVG path animation 画架构连线。",
          "用主题颜色变量 + `.ar-` CSS 前缀，给本章样式做隔离（防止跟第 1 章的 `.ov-` 前缀冲突）。",
          "narrations.ts 写本章 step 对应的文本。",
          "做完跑 `npx tsc --noEmit` + 完工自检。"
        ]},
        { kind: "para", text: "用户在 Checkpoint Plan 里选了三种模式之一：" },
        {
          kind: "code",
          lang: "text",
          text: "模式 A 一章一确认：每章做完等用户点头再做下一章。\n                慢但风险低。\n\n模式 B 一口气做完：把 N 章全做完再让用户看。\n                中等速度、中等风险——偏差累积到最后才发现。\n\n模式 C 同时并发：起几个 subagent 各做 1 章。\n                快但风格容易跑偏——每个 subagent 各自走，\n                第 1 章这个样板也救不回来全部。"
        },
        { kind: "para", text: "GPT Image 视频用户选了模式 B——所以我把剩下 5 章一口气做完一起交付，每章用独立的 CSS 前缀（`.ov-` / `.ar-` / `.ev-` / `.cs-` / `.li-` / `.nx-`），防止互相影响。" }
      ],
      receives: "outline 当前章段落 + 第 1 章代码当样板 + 当前章对应的 article 段落 + 主题颜色变量。",
      reads: ["references/CHAPTER-CRAFT.md（每章重读，不是只读一次）", "outline 当前章段落", "article.md 当前章段落"],
      blockedShortcut: "不能把 outline 翻译成一页页大字 PPT；不能整章纯文字（CHAPTER-CRAFT.md 要求每章至少 1-2 处 CSS / SVG / Canvas / JS 视觉演示）；不能整页列表一次全展示（必须 1 项 = 1 step 逐步揭示）；不能写死颜色 / 字体（必须用主题颜色变量）。",
      action: "对每一章：读 CHAPTER-CRAFT.md → 按开工 5 问 + 关系→动作决策树 → 在视觉工具箱里挑具体怎么实现 → 做完跑完工自检 + `npx tsc --noEmit` → 按用户选的模式（一章一确认 / 一口气做完 / 同时并发）推进。每章独立 CSS 前缀（`.cd-` / `.mg-` / `.pm-`），不要修改 chapters.ts。",
      output: "每章的 Chapter.tsx + Chapter.css + narrations.ts 三件套。",
      nextConsumer: "stage 11 决定是否合音频 / stage 14 录屏。",
      reusableMove: "对一件要重复做很多遍的、又容易出错的事，每一遍都强制重读规则文件——把所有规则收在一份文件里、每次重读，会话再长 AI 也不会回退到默认做法。",
      challenges: [
        "用户在你做到第 3 章时说「我看了第 2 章发现你忘了用主题颜色变量、写死了颜色」——你立刻停下改第 2 章、还是把剩下 3 章做完一起改、还是反问？",
        "「每次都重新读 CHAPTER-CRAFT.md」对长会话来说耗 token——能不能让 SKILL.md 自动每章重新加载它？这是 skill 设计能解决的问题、还是 AI 平台本身的缺陷？",
        "同时并发模式下，每个 subagent 都「重新读 CHAPTER-CRAFT」是天然的——这种情况下「每章重读」的价值反而比一口气做完模式低吗？",
        "做到第 4 章发现 CHAPTER-CRAFT.md 某条原则在这个具体内容下不适用——是绕过去、改 CHAPTER-CRAFT.md、还是反问 skill 作者？依据是什么？"
      ]
    },
    {
      id: "narrations-truth",
      title: "narrations.ts：网页跑起来时谁说了算",
      summary: "每写完一章，我必须同时写 narrations.ts，数组长度严格等于章节代码里最大 step 数 + 1。这份文件是网页跑起来时所有口播文本的唯一来源——useStepper 读它算 step 总数，extract-narrations 读它生成 audio-segments.json，App 读它显示当前 step 文本。outline 是计划，narrations.ts 是最终说了算的那一份。",
      preTest: "你刚做完第 1 章的 Chapter.tsx，里面 `if (step === 0)` ... `if (step === 4)` 写了 5 个分支。下一步是 git commit 还是别的？写下来再读。",
      narrativeBody: [
        { kind: "para", text: "和 stage 8 写 Chapter.tsx / Chapter.css 不一样——这一步 AI 写 narrations.ts，但**几乎没发散空间**。因为 stage 2 写好的 script.md 已经把这一章的每句话、关键数字、语气全钉死了，AI 在这里能做的事只有：(1) 顺序按 step 0..N 排；(2) 数组长度 = step 数；(3) 关键短语别丢。所以真正容易出错的是 (1)(2) 数字对不上（5 个 step 写了 4 条文本），不是文本写错。" },
        { kind: "para", text: "skill 不让我直接 commit。每写完一章，必须同时写 narrations.ts，数组长度严格等于 Chapter.tsx 里 `step === N` 的最大 N 加 1。" },
        { kind: "para", text: "narrations.ts 长这样（GPT Image 第 1 章）：" },
        {
          kind: "code",
          lang: "ts",
          text: "export const narrations: string[] = [\n  \"文字这块是真变强了。\",\n  \"以前一张海报里只要有中文，基本就露馅。\",\n  \"现在不一样了。海报里的中文，准确率从 64% 提到了 89%。\",\n  \"但复杂排版下还是会糊——大概十张里有一张。\",\n  \"那它是怎么做到的？接下来拆架构。\",\n];"
        },
        { kind: "para", text: "为什么这么严格？因为网页跑起来的时候，有 4 处都从这份文件读——它要是写错或者没同步，下游 4 处会一起错位：" },
        { kind: "list", items: [
          "useStepper hook 读它，算出来这一章总共多少 step。",
          "extract-narrations.ts 读它，生成给 TTS 用的 audio-segments.json 清单。",
          "App.tsx 读它，把当前 step 对应的文本显示在字幕区。",
          "useAudioPlayer 读它，定位当前 step 对应的 mp3 文件。"
        ]},
        { kind: "para", text: "如果 outline 写 5 step、Chapter.tsx 写 6 step、narrations.ts 写 4 条、合成出 4 段 mp3——录屏时这几处全对不上。所以 skill 给了一条简单规则：网页跑起来时以 narrations.ts 为准，outline 只是计划。" },
        { kind: "para", text: "改完章节结构后还有一步必须做——把 useStepper.ts 里的 STORAGE_KEY 改个名字：" },
        {
          kind: "code",
          lang: "ts",
          text: "// 之前\nconst STORAGE_KEY = \"presentation-step-v4\";\n// 改 step 数后改成\nconst STORAGE_KEY = \"presentation-step-v5\";"
        },
        { kind: "para", text: "为什么？因为这个 STORAGE_KEY 是 localStorage 用来记「用户上次看到哪一 step」的标识。如果章节结构变了但 KEY 没变，用户上次停在 step 7、但新结构只有 5 step——一打开页面就越界崩。改 KEY 就是强制清掉旧记录。" }
      ],
      receives: "已实现的 Chapter.tsx + 对应 script 段落。",
      reads: ["references/AUDIO.md", "templates/scripts/extract-narrations.ts"],
      blockedShortcut: "不能让 outline / Chapter.tsx / narrations.ts / audio-segments / mp3 各写一套 step 数；不能把 outline 当最终说了算的那一份（写代码时 step 还会调）；不能漏写 narrations.ts 就先 commit；改完章节结构不能忘了改 useStepper.ts 的 STORAGE_KEY。",
      action: "每章必写 narrations.ts，数组长度 = Chapter.tsx 里 `if (step === N)` 的最大 N + 1。每条文本对应 script 里那一段，可以为 TTS 微调标点但不能漏关键短语。改完章节结构要把 useStepper.ts 的 STORAGE_KEY 改个名（比如 v4 → v5），避免 localStorage 里旧的进度落到不存在的 step。",
      output: "每章一个 narrations.ts。",
      nextConsumer: "useStepper / extract-narrations.ts / audio-segments.json / mp3 / Auto 模式。",
      reusableMove: "几个文件都在描述同一件运行时的事实时，挑离运行时最近、最容易当场验证对错的那一份当最终说了算——其它文件允许暂时对不上，但要写明什么时候同步。",
      challenges: [
        "Chapter.tsx 里有一个 `step === 99` 的特殊分支用作「章节末尾占位」——narrations.ts 长度该是 6（含 99）还是按真实 step 数？",
        "用户做到一半说想往第 1 章中间插一段——这要求 narrations.ts 数组中间插入。如果不改 STORAGE_KEY 会发生什么？改了之后用户已经看过的进度会丢吗？",
        "outline 写第 1 章是 5 step，Chapter.tsx 实现成 6 step——outline 该回头改吗？为什么这个 skill 容忍这种「计划和实现暂时对不上」？",
        "narrations.ts 写完发现某条比 script.md 对应段落多了一句话（为了 TTS 合成读起来自然）——这算违反「保持口播原意」吗？边界在哪？"
      ]
    },
    {
      id: "checkpoint-audio",
      title: "Checkpoint Audio：问一次用户要不要合音频",
      summary: "网页做完后 skill 不让我擅自跑 TTS——合一遍音频会调用付费 API + 花几分钟 + 可能用错音色。必须先停下来问用户一句：要不要合成音频走自动播放录屏？",
      preTest: "presentation/ 6 章都做完了，`npm run dev` 看着 OK。下一步你的本能：(a) 直接跑 `npm run synthesize-audio` 合成音频；(b) 先让用户决定要不要合成。选哪个？",
      narrativeBody: [
        { kind: "para", text: "和 stage 6 一样——这一步 AI 干的事是「按 SKILL.md 列的 1 件事发 prompt 问用户」。问什么、列 A 还是 B 哪条路、本机没装 mmx-cli 怎么反问，全都是写好的，AI 没创作空间。" },
        { kind: "para", text: "skill 强制选 (b)。在 SKILL.md 里这一步叫 Checkpoint Audio，是开建后第二次停下来对齐——意思是：跑 TTS 之前，问一句用户要不要做这件事。" },
        { kind: "para", text: "为什么不让我默认跑？三个理由：" },
        { kind: "list", items: [
          "跑 TTS 要花钱——6 章 30 段合成下来调用次数和 token 都不少。",
          "合完之后音色错了改不回去——用户想要男声但默认女声，发现的时候已经 30 段都合完了，第二次再合的钱省不掉。",
          "用户可能根本不需要这一步——B 站很多人是录屏后期自己配音 / 配字幕，并不要 TTS。自动合成是「可选额外步骤」，不是「必经之路」。"
        ]},
        { kind: "para", text: "我给用户发的 prompt 长这样：" },
        {
          kind: "code",
          lang: "markdown",
          text: "🎙️ Checkpoint Audio\n\n网页 6 章都做完了。下一步两条路：\n\nA. 合成音频走自动播放\n   - 跑 mmx-cli 串行合成每段 mp3\n   - 进 Auto 模式 ?auto=1 一镜到底录屏\n   - 成本：TTS 调用 + 合成时间\n\nB. 不合成，走 Manual + 后期配音\n   - 用 Manual 模式手动点击推进\n   - 录屏后期配音 / 配字幕\n   - 成本：录屏时手动节奏 + 后期工时\n\n你选哪条？"
        },
        { kind: "para", text: "如果本机没装 mmx-cli——不能假装合成成功（这是这个 skill 一再见到的做坏了的样子）。必须反问用户：「本机没装 mmx-cli，你的 TTS 工具是什么？还是跳过音频走 Manual 模式？」" }
      ],
      receives: "做完的 presentation/ 项目 + 所有章节的 narrations.ts。",
      reads: ["SKILL.md Checkpoint Audio 节"],
      blockedShortcut: "不能默认合成音频（要调用付费 API）；本机没装 mmx-cli 不能假装合成成功；不能跳过这次对齐直接跑 `npm run synthesize-audio`。",
      action: "问用户：合成 → 进 stage 12；不合成 → 直接进 stage 14（Manual 模式录屏 + 后期配音）。本机没装 mmx-cli 时反问用户用什么 TTS 工具、或者跳过这一步。",
      output: "音频路线选择。",
      nextConsumer: "stage 12（合成）或 stage 14（不合成）。",
      reusableMove: "要花钱或者一旦做了就改不回去的外部调用之前，再加一个简短的对齐——不要让 AI 默认就跑。",
      challenges: [
        "用户回答「A」，但又加了一句「我希望开头加 3 秒静音停顿」——这件事属于这次对齐里、还是属于下一步 stage 12 范围？怎么处理？",
        "如果本机有 mmx-cli 但用户的语言（比如粤语）不在支持列表——是退一档用普通话、还是反问用户提供本地 TTS 工具？",
        "已经合成过一次 mp3，用户改了第 3 章 narrations.ts 一条文本——重合成全部、只重合成改动那一条、还是反问？mmx-cli 的「已存在跳过」能解决这个问题吗？",
        "Checkpoint Audio 和 Checkpoint Plan 都是停下来对齐的时刻，但 Plan 一次问 5 件事，Audio 只问 1 件事——为什么不一致？是 Audio 漏了什么，还是 Plan 问得太细？"
      ]
    },
    {
      id: "extract-segments",
      title: "从 narrations.ts 抽出一份清单给用户审，再合音频",
      summary: "直接跑合成 = 把 TTS 当黑盒——文本错 / 切分错 / 文件名错都看不出来，钱烧完才发现。skill 让我先跑 `npm run extract-narrations` 生成一份人能读的 JSON 清单，让用户扫一眼确认对了再合。",
      preTest: "用户选了 A 合成音频。下一步本能是直接跑 `npm run synthesize-audio` 调 mmx-cli——对不对？写下判断再读。",
      narrativeBody: [
        { kind: "para", text: "这一步 AI 干的事是「跑一行脚本，把生成出来的 JSON 给用户看一眼」。脚本 `extract-narrations.ts` 是 source skill 自带的，AI 不写它；JSON 内容也是脚本扫所有 narrations.ts 自动拼的。这一步几乎没发散空间，AI 是个传话员。" },
        { kind: "para", text: "skill 不让我直接合。先跑 `npm run extract-narrations` 生成一份人能读的 JSON，让用户审一遍。" },
        { kind: "para", text: "为什么这一步必须？因为直接合 = 把 TTS 当黑盒。某条文本写错了、某章 step 切分对不上、某个 mp3 路径写错了——这些问题，跑 TTS 是看不出来的。钱花完了才发现，得从头再来。" },
        { kind: "para", text: "`extract-narrations.ts` 扫所有章节的 narrations.ts，生成 audio-segments.json：" },
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
        { kind: "para", text: "这一步把「合成正确」拆成两件可以单独验证的事：(1) 文本和切分对——让用户扫 JSON 确认;(2) TTS 真合出来——调 mmx。中间隔了一个便宜的检查点，前一步错了不浪费后一步的钱。" }
      ],
      receives: "用户选择「合成音频」。",
      reads: ["references/AUDIO.md", "templates/scripts/extract-narrations.ts"],
      blockedShortcut: "不能直接调 mmx 合——TTS 钱烧光了也看不出是文本错还是切分错；不能省略让用户审 JSON 这一步。",
      action: "跑 `npm run extract-narrations` 扫所有章节的 narrations.ts → 生成 audio-segments.json（章 / step / text / 音频文件路径）；把这份 JSON 给用户看一眼，让他确认文本和切分都对。",
      output: "audio-segments.json（合成前能让人读的清单）。",
      nextConsumer: "用户审一眼；下一步合成时从这份清单读。",
      reusableMove: "要花钱的外部调用之前，先生成一份能让人扫一眼的清单——把「合成结果对」拆成两件可以分别验证的事，前一件错了不浪费后一件的钱。",
      challenges: [
        "用户审 JSON 后说「第 4 章 step 2 文本太长，能不能拆成两个 step」——是改 narrations.ts、改 Chapter.tsx、还是只在 audio-segments.json 里拆？三种做法的代价分别是什么？",
        "audio-segments.json 是从 narrations.ts 生成出来的，还是它自己可以说了算？改它能反向影响 narrations.ts 吗？",
        "如果用户没审 JSON 直接说「你看着办合吧」——是默默合、追问让他至少扫一眼、还是合一段样品让他先听音色？",
        "`extract-narrations` 的输出格式（章 / step / text / 音频路径）能不能加一个时长估算？这能让用户审得更全面，但脚本会更复杂——值不值得？"
      ]
    },
    {
      id: "synthesize-audio",
      title: "合成音频：mmx-cli 一段一段合 + 已合的跳过",
      summary: "skill 让我跑 `npm run synthesize-audio` 一段一段合 mp3（已经合过的跳过）。合完关注超长的段——单段 ≥ 15 秒通常意味着这段 step 文本太密了，要么把这一 step 拆成两个，要么改写得更短。",
      preTest: "audio-segments.json 用户审过了。下一步跑 mmx-cli。本能：30 段一起合（快）vs 一段一段合（慢但稳）—— 选哪个？依据是什么？",
      narrativeBody: [
        { kind: "para", text: "和 stage 12 一样，这一步 AI 几乎没发散空间。它干的事是「跑一行脚本 + 看每段时长」——`synthesize-audio` 脚本是 source skill 自带的，AI 不写。唯一需要判断的是「合完看到 ≥ 15 秒的段要报告给用户」——这是规则（CHAPTER-CRAFT.md 给的阈值），不是创作。" },
        { kind: "para", text: "skill 让我跑 `npm run synthesize-audio`——这个脚本内部一段接一段调 mmx-cli，不一起跑。" },
        { kind: "para", text: "为什么不一起跑（更快）、要一段一段（更慢）？三个理由：" },
        { kind: "list", items: [
          "mmx-cli 同时收太多请求容易被限流，错误率比一段一段高。",
          "一段一段合容易重跑——第 17 段失败了，只重跑这一段；一起跑里有一段失败，整批要回滚重来。",
          "整体合成时间根本不是瓶颈（30 段 × 5 秒 ≈ 2.5 分钟），为了快这么一点点牺牲稳定性不划算。"
        ]},
        { kind: "para", text: "实际跑出来长这样（GPT Image 视频）：" },
        {
          kind: "code",
          lang: "bash",
          text: "$ npm run synthesize-audio\n\n[1/30] 01-gpt-image-overview/0.mp3 ... ✅ 2.3s\n[2/30] 01-gpt-image-overview/1.mp3 ... ✅ 3.1s\n[3/30] 01-gpt-image-overview/2.mp3 ... ✅ 4.7s\n[4/30] 01-gpt-image-overview/3.mp3 ... ⚠️  18.4s  ← 异常\n[5/30] 01-gpt-image-overview/4.mp3 ... ✅ 2.0s\n...\n[18/30] 03-architecture/2.mp3 ... ✅ (skip, exists)  ← 已合过\n..."
        },
        { kind: "para", text: "已经合过的 mp3 跳过——这让我可以中断、改某一段重跑、不用每次重合整个项目。" },
        { kind: "para", text: "出现 ≥ 15 秒的段，要报告给用户。比如上面第 4 段 18.4 秒，多半是这一 step 的文本太密：要么把这一 step 拆成两个，要么改写得更短。这不是 TTS 出错，是这一步节奏需要调。" },
        { kind: "para", text: "如果用户本机没装 mmx-cli，怎么处理：" },
        {
          kind: "code",
          lang: "text",
          text: "我反问：\n「本机检测不到 mmx-cli。三种处理：\n (a) 你装一下 mmx-cli 我重跑\n (b) 用本地 TTS（macOS 自带 say / Edge TTS / 其它）\n (c) 跳过音频走 Manual 录屏 + 后期配音\n你选哪个？」"
        },
        { kind: "para", text: "不假装跑成功——直接跑 mmx 报错只让用户看到一堆 error trace，明确反问让用户做决定。" }
      ],
      receives: "用户审过的 audio-segments.json。",
      reads: ["references/AUDIO.md"],
      blockedShortcut: "不能 30 段一起合（mmx-cli 一段一段更可靠）；不能忽略超长的段（这是 Auto 模式录屏对不上的雷）；本机没装 mmx-cli 不能假装合成成功。",
      action: "跑 `npm run synthesize-audio` → mmx-cli 按 audio-segments.json 一段一段合 → 输出到 `public/audio/<chapter>/<N>.mp3`（已合过的跳过）。合完检查每段时长，超长的报告给用户，作为这一 step 节奏需要调的信号。",
      output: "每 step 一个 mp3 文件。",
      nextConsumer: "Auto 模式录屏。",
      reusableMove: "外部工具默认「已做的跳过、只做没做的」+ 跑不动时明确告诉用户能退到哪条路——花钱多的流程必须能断点接着跑，不要每次重来。",
      challenges: [
        "合完发现第 5 章某段 mp3 是 0 字节（mmx 没报错但实际没合出来）——再跑会跳过它（因为文件存在）还是会重跑？怎么写检测把这种情况捞出来？",
        "「超长信号 ≥ 15 秒」这个阈值是写死的——不同语言、不同语速这个阈值合理吗？要不要按每一章的估时反推阈值？",
        "如果用户的 article 里有英文人名（比如「Sam Altman」），mmx 用中文 TTS 念出来怪——要不要在 narrations.ts 里给中文谐音？这算违反「保持口播原意」吗？",
        "合完之后再回头改 narrations.ts，audio-segments.json 不会自动更新——这是 bug 还是设计？怎么提示用户？"
      ]
    },
    {
      id: "recording",
      title: "录屏：Auto 模式一镜到底（按音频走，不按动画走）",
      summary: "推荐路径是 `?auto=1` 一镜到底——按一次 Space 后，网页根据每段 mp3 播完了自动推进到下一 step。skill 提醒我:Auto 模式只看音频什么时候播完，不管动画走到哪。所以动画必须比口播短，否则会被切断。",
      preTest: "30 段 mp3 合完了，`npm run dev` 跑着，浏览器开 http://localhost:5173。下一步你的本能是按 `?auto=1` 直接录屏，还是先做点别的？",
      narrativeBody: [
        { kind: "para", text: "这一步 AI 干的事是「告诉用户两条录屏路径 + 提醒一条规则」——内容来自 RECORDING.md，AI 不写录屏软件、也不真的去录屏（录屏发生在用户的机器上）。这一步几乎没发散空间，AI 是个引导员。" },
        { kind: "para", text: "skill 给我两条录屏路径：" },
        {
          kind: "code",
          lang: "text",
          text: "有音频路径（推荐）：\n  浏览器开 ?auto=1 → 全屏 → 开始录屏 → 按 Space →\n  网页按音频播完自动推进 → 全部播完 → 停录 → 裁头尾\n\n无音频路径：\n  开 Manual → 全屏 → 开始录屏 → 手动点击推进 → 后期配音"
        },
        { kind: "para", text: "Auto 模式的核心规则只有一句：什么时候推到下一 step，听音频的，不听动画的。每个 step 推进的时机是「这一段 mp3 播完 + 等 200ms」。" },
        { kind: "para", text: "为什么不让动画也参与决定推进时机？因为同时听两个信号（音频 + 动画），节奏会变得很难预测。调试时不知道为什么卡在某一步——是音频没播完？是动画没播完？两个一起判断就成了猜。一个信号说了算更简单可靠。" },
        { kind: "para", text: "代价：动画必须比口播短。如果某 step 我设计了 4 秒的复杂动画但口播只有 2 秒——动画到 1.5 秒就被切到下一 step，看起来像 bug。" },
        { kind: "para", text: "这条规则反过来管前面的步骤：写每一章 (stage 8-9) 的时候就得估这一 step 的 TTS 大概多长，动画做短一点。这不是录屏时才冒出来的规矩，是整个项目从第 1 章起就要守的。" },
        { kind: "para", text: "GPT Image 视频用 Auto 模式录的实际步骤：" },
        {
          kind: "code",
          lang: "text",
          text: "1. 浏览器 http://localhost:5173/?auto=1\n2. F11 全屏（或浏览器全屏 API）\n3. 开 macOS 内置录屏 / OBS / ScreenStudio\n4. 按一次 Space 触发开始\n5. 等 30 段全部播完（约 3 分钟）\n6. 停录\n7. 裁掉录屏前的浏览器 UI + 录屏后的尾巴"
        },
        { kind: "para", text: "用户拿到的是一个完整 mp4，可以直接上传 B 站 / YouTube。" }
      ],
      receives: "已合成音频的网页项目（或用户选择跳过音频）。",
      reads: ["references/RECORDING.md"],
      blockedShortcut: "不能让动画长于口播（Auto 模式不等动画）；不能让用户自己摸索 `?auto=1` 是什么；不能不告诉用户 Auto 和 Manual 的差别。",
      action: "有音频 → 推荐 Auto 模式：浏览器开 `?auto=1` → 全屏 → 开始录屏 → 按 Space → 网页自动播完 → 停录 → 裁头尾。无音频 → Manual 模式手动点击推进 + 后期配音。提前告诉用户「Auto 模式按音频走、不按动画走」。",
      output: "录屏路径建议 + 录制要点。",
      nextConsumer: "用户录制和发布。",
      reusableMove: "自动化流程让一件事简单到可以预测——别让两个信号（动画时长 / 音频时长 / 用户点击）同时来决定下一步什么时候发生，挑一个说了算。",
      challenges: [
        "Auto 模式录到第 18 段时，用户看到一个动画被切断觉得不打——是改这一段动画长度、还是改这段 narrations.ts 让 TTS 念得更长、还是接受这是「按音频走」的代价？",
        "用户没装 OBS / ScreenStudio，只有 macOS 自带录屏——能录全屏 + 系统声音吗？skill 该不该提示？",
        "Manual 模式录屏 + 后期配音——配音师拿到的素材是什么（视频 + 字幕 + 时间码？）？这件事在 RECORDING.md 范围里、还是属于用户自己的工作流？",
        "为什么这个 skill 在录屏后没有再设一次对齐（让用户确认录屏成功 / 看一遍输出 mp4）？是漏了、还是设计选择？"
      ]
    }
  ],

  fileMap: [
    {
      path: "SKILL.md",
      role: "总流程指南 + 写明哪些时刻必须停下来对齐 + 每个阶段该读哪些文件。",
      generatedBy: "skill 作者维护。",
      readBy: ["每次 agent 进入这个 skill 时"],
      owns: "Phase 1-4 阶段顺序、两次必须停下来对齐的时刻（Checkpoint Plan / Audio）、每个阶段必读文件表、十条原则索引、自检协议（写完 → 自查 → 修 → 报）。",
      doesNotOwn: "每个 reference 内部的细则；具体章节怎么做视觉。",
      failureIfWrong: "agent 跳过 checkpoint、漏读 reference、或者在不该决定的阶段提前决定（比如 outline 阶段就写死动画）。"
    },
    {
      path: "references/SCRIPT-STYLE.md",
      role: "从书面文章改成口播稿的规则 + 三条自检标准（形式 / 风骨 / 念出来）。",
      generatedBy: "skill 作者维护。",
      readBy: ["stage 2 写 script.md", "script 自检"],
      owns: "口语化但信息不能丢、不同平台风格（B 站 / YouTube / 教学）、用 `---` 切节拍的约定、去 AI 味的底线。",
      doesNotOwn: "网页章节结构、动画、主题。",
      failureIfWrong: "稿子像 AI 朗读腔或者短摘要，后面所有节奏都跟着错。"
    },
    {
      path: "references/OUTLINE-FORMAT.md",
      role: "outline.md 每个字段写什么 + 哪些不要写。",
      generatedBy: "skill 作者维护。",
      readBy: ["stage 4 写 outline.md", "outline 自检", "后面写每一章时查 step 段落"],
      owns: "章节切分、step 数、每章估时、每步屏幕内容、每章的事实清单（信息池）、末尾全片素材清单。",
      doesNotOwn: "具体动画 / CSS 怎么实现 / 毫秒级时长。",
      failureIfWrong: "outline 把动画写死 → 写代码的 agent 只能照搬；或者 outline 太空 → 写代码的 agent 不知道每一步要演什么。"
    },
    {
      path: "references/CHAPTER-CRAFT.md（每章必读的那一份）",
      role: "写每一章网页前必读，把所有章节级原则都合在这一份里。",
      generatedBy: "skill 作者维护。",
      readBy: ["每章写代码时（一共 N 次，每章都读一次）"],
      owns: "Part 0 十条原则 / Part 1 开工 5 问 / Part 2 关系→动作决策树 / Part 3 视觉工具箱 / Part 4 时长参考 / Part 5 AI 味反模式 / Part 6 代码红线（含 narrations.ts 必须怎么写）/ Part 7 完工自检 / Part 8 反馈速查。",
      doesNotOwn: "项目阶段顺序（那是 SKILL.md 管的）；具体文章内容。",
      failureIfWrong: "章节变成 PPT、出现紫粉渐变 / 圆角彩色边框 / 假插画 / emoji 这种 AI 味、漏写 narrations.ts 导致 Auto 录屏对不上。"
    },
    {
      path: "references/AUDIO.md",
      role: "从 narrations.ts → audio-segments.json → mp3 的流程 + Auto 模式怎么按音频走。",
      generatedBy: "skill 作者维护。",
      readBy: ["Checkpoint Audio", "stage 12-13 合音频"],
      owns: "audio-segments.json 格式、mp3 文件路径约定、mmx-cli 怎么调、TTS 跑不动时退到哪条路、Auto 模式按音频播完推进的规则。",
      doesNotOwn: "章节视觉设计、单章节奏。",
      failureIfWrong: "音频生成结果不可复现、Auto 录屏的画面跟音轨对不上。"
    },
    {
      path: "references/RECORDING.md",
      role: "录屏工具 + 后期合成路径。",
      generatedBy: "skill 作者维护。",
      readBy: ["stage 14 录屏"],
      owns: "Auto 模式一镜到底录屏（`?auto=1`）、Manual 模式后期配音、推荐用什么工具。",
      doesNotOwn: "音频合成（那是 AUDIO.md 管的）。",
      failureIfWrong: "用户拿到网页后不知道怎么把它变成可发布的视频。"
    },
    {
      path: "references/THEMES.md + themes/<id>/{theme.json, tokens.css}",
      role: "主题系统：选主题 / 自己造主题 / 换主题。",
      generatedBy: "skill 作者维护内置主题；用户可以自己造新主题。",
      readBy: ["Checkpoint Plan 推荐主题时", "脚手架复制 tokens.css 时", "每章写代码时用主题颜色变量"],
      owns: "theme.json（中文名 / 中文描述 / 适合什么内容 / 气质）、tokens.css（颜色 / 字体家族 / hero 数字 / 卡片 / 分割线 / 装饰）。",
      doesNotOwn: "每章具体怎么排版、字号、动画时长。",
      failureIfWrong: "推荐的主题跟内容不搭、换主题之后整页破版、整条视频气质不统一。"
    },
    {
      path: "scripts/scaffold.sh + templates/",
      role: "一键建好稳定的项目骨架。",
      generatedBy: "skill 作者维护。",
      readBy: ["stage 7 建脚手架"],
      owns: "Vite + React + TS 项目、16:9 舞台、stepper、隐藏进度条、Auto / Audio / Manual 模式、用户选的主题对应的 tokens.css、示例章节、音频抽取 / 合成脚本、第一次 typecheck。",
      doesNotOwn: "真实章节内容。",
      failureIfWrong: "每个项目第一步就不可靠（音频接错 / 进度条不见 / 主题颜色变量漏）。"
    },
    {
      path: "article.md（用户原文）",
      role: "给画面挂细节的来源——口播稿里压缩掉的具体数字、引用、案例都从这儿找。",
      generatedBy: "用户给原文 / agent 把原文存下来。",
      readBy: ["stage 2 改 script", "stage 4 写 outline 每章事实清单", "stage 8 起每章写代码挂画面细节"],
      owns: "原始事实、数字、引用、案例、时间、对比、出处。",
      doesNotOwn: "视频节奏、口播语气、章节结构。",
      failureIfWrong: "画面只能照念口播稿、没有额外细节，看起来像 PPT 字幕板。"
    },
    {
      path: "script.md / outline.md",
      role: "stage 2 + stage 4 一次产出的两份文本计划。",
      generatedBy: "stage 2 + stage 4。",
      readBy: ["Checkpoint Plan", "stage 8-9 各章开发", "stage 10 写 narrations.ts"],
      owns: "script: 口播节拍 / 平台风格 / `---` 切分；outline: 章节 + step + 估时 + 每章事实清单 + 素材清单。",
      doesNotOwn: "网页跑起来时实际有多少 step（那是 narrations.ts 说了算的）、具体动画、CSS 怎么写。",
      failureIfWrong: "前面计划错了会污染后面所有阶段；但写代码时调整 step 不算 outline 错——以 narrations.ts 为准。"
    },
    {
      path: "presentation/src/chapters/<NN>-<id>/narrations.ts（网页跑起来时说了算的那一份）",
      role: "step 数 + 每步口播文本的最终来源。",
      generatedBy: "stage 8-9 写每章代码时。",
      readBy: ["useStepper（算 step 总数）", "extract-narrations.ts（生成 audio-segments.json）", "App.tsx（显示当前 step 文本）", "useAudioPlayer（播当前 step 的 mp3）"],
      owns: "数组长度 = Chapter.tsx 里 `if (step === N)` 的最大 N + 1；每条文本对应 script 那一段的意思。",
      doesNotOwn: "outline 一开始的规划（那是计划，写代码时还会调）；视觉 CSS。",
      failureIfWrong: "step 数 / 音频文件数 / Auto 录屏全部对不上。"
    }
  ],

  designChoices: [
    {
      title: "一次写完 script.md + outline.md，不分两次让用户确认",
      looksUnnecessaryBecause: "为什么不先写 script，让用户确认对了，再写 outline？",
      badScenario: "对齐次数太多，用户被迫分两次看本来应该一起看的两份东西；而且 outline 写的时候只需要 script 的节拍 + 原文细节，并不需要等额外一次对齐才能动手——拆开做反而慢。",
      constraint: "SKILL.md Phase 1.2 要求这两份东西在同一次思考里完成，自检过了一起进 Checkpoint Plan。",
      solvedProblem: "少打断用户一次，让他在一个时刻就看到完整的内容计划。",
      reusableMove: "几件改起来同样便宜的、可以同时决定的中间产物，合到一次对齐前一起做完——别为了「按部就班」多设对齐。",
      counterScenarios: [
        { when: "标准情况：用户给原始文章 + 想要做视频网页", effect: "救你", why: "script 的节奏和 outline 的结构都来自同一份 article 的同一次理解，一次想完质量更高。" },
        { when: "用户给的是已经口语化的稿子，outline 完全靠 agent 自己推", effect: "绑你", why: "这两份东西来源不一样——硬塞进一次思考里，agent 容易让 outline 迁就 script 的样子，漏掉 article 里本来该挂在画面上的细节。" },
        { when: "用户已经给了 outline 草稿，只需要写 script", effect: "完全多余", why: "这种场景下根本不需要再写 outline，「一次写完两份」反成多此一举——应该回 Phase 1.1 的分流表补一行：「已有 outline、需写 script」→ 只写一份。" }
      ]
    },
    {
      title: "原文 article.md 不删（保留两个来源各管一件事）",
      looksUnnecessaryBecause: "已经从 article 改出 script.md 了，为什么还要把原文留着？",
      badScenario: "后面写每一章网页时只能从口播稿拿信息 → 画面变成口播的字幕版；或者 AI 为了在画面上加细节，凭空编数字和案例。",
      constraint: "SKILL.md 工作目录约定明确写「用户给原文时 article.md 必有，不删！开发阶段画面要从它取细节」；CHAPTER-CRAFT.md 要求每章写代码时回 article 拿细节。",
      solvedProblem: "让画面里挂的细节比口播说的更多，同时不让 AI 凭空编数字。",
      reusableMove: "如果两个下游要的是两个不同维度的信息，就保留两份来源，每份各管一件事——别让一份中间文件吞下所有职责。",
      counterScenarios: [
        { when: "用户给原始书面文章 + 想做视频网页", effect: "救你", why: "节奏（script）和细节（article）确实是两个不同的维度，画面有具体细节可以挂。" },
        { when: "用户给的是精简 outline + 关键事实清单，没有 article", effect: "完全失效", why: "没有原始细节源可以保留，「两份各管一件事」就空转——这种情况要反问用户能不能给原文，否则画面只能纯文字。" },
        { when: "article 是 GPT 自己生成的稿子（不是真原始素材）", effect: "取决于", why: "GPT 稿子本身可能就丢了关键细节，「保留」的其实是已经被压缩过的版本——这条规则的价值打折，得先反问用户能不能拿真原文再决定。" }
      ]
    },
    {
      title: "outline 不写动画（写计划的人别替写代码的人做决定）",
      looksUnnecessaryBecause: "为什么不一次把动画也规划好？开发计划越详细越好啊。",
      badScenario: "outline 把动画写死 → 写章节的 agent 只能照搬，没有视觉判断空间；某一章其实更适合做「文字被切开」的演示，但 outline 写了「blur clear」，那个 agent 就只能照办。",
      constraint: "SKILL.md Phase 1.2 outline 边界表：必须写章节切分 / step / 屏幕内容 / 每章事实清单；不要写具体动画类型 / CSS 怎么实现 / 毫秒级时长。",
      solvedProblem: "把视觉判断留到真正掌握章节上下文那一刻再做。",
      reusableMove: "写计划的阶段规划内容范围，写代码的阶段做实现判断——计划阶段不替写代码的阶段做应该等到信息齐了才能做的决定。",
      counterScenarios: [
        { when: "视觉风格还没定 / 主题要到 Checkpoint Plan 才选", effect: "救你", why: "outline 阶段没有主题颜色 / 字号 / 章间衔接信息，写动画必然瞎写。" },
        { when: "用户已经给了 Figma 全套设计 + 动画规范", effect: "部分让位", why: "动画不写在 outline 里仍然是对的——这种情况下 Figma 才是说了算的那一份；但 outline 应该写一行「动画参考 Figma 第 X 节」让下游知道去哪找。" },
        { when: "极简风格 / 全片就用一种动画语言", effect: "可以放宽", why: "如果全片就一种动画方式（比如全部 fade-in 800ms），写在 outline 里没什么坏处反而有助于跨章一致——但这种情况很少。" }
      ]
    },
    {
      title: "Checkpoint Plan：一次对齐 5 件事",
      looksUnnecessaryBecause: "为什么不让用户只确认稿子，其他我自己选？",
      badScenario: "稿子对了但主题不合适 / outline 对了但素材缺 / 素材有了但开发模式不是用户想要的——任何一件错了，开始写代码之后再改都很贵。",
      constraint: "SKILL.md Checkpoint Plan 节：内容计划写完之后必须停下来，一次对齐稿子 / outline / 主题 / 素材 / 开发模式；主题必须明确才能开建项目，用户说「你帮我选」就取推荐第 1 个并告诉用户为什么。",
      solvedProblem: "把方向性的决定放在改起来还便宜的时刻做。",
      reusableMove: "找出「改起来最贵的几件事」，合到一次对齐里——别每做一点就问一次，也别等到代码都写完了才发现方向错了。",
      counterScenarios: [
        { when: "6 章 / 标准 B 站视频流程（比如 GPT Image 这种）", effect: "救你", why: "5 件事都是改起来最贵的决定，一次对齐省掉后面大面积重做。" },
        { when: "1 章 30 秒的短视频", effect: "部分过度", why: "5 件事里「开发模式」用不上——只有一章哪来的模式选择；可以缩减到 3 件事确认。" },
        { when: "用户已经在另一个项目用过这个 skill 5 次", effect: "应简化", why: "主题和模式可以沿用上次的（甚至不必再问），只确认稿子和素材。对齐多少件该按用户熟悉度变。" }
      ]
    },
    {
      title: "第 1 章必须在主线程完整做完（强制做透一个样板）",
      looksUnnecessaryBecause: "如果后面能并发做，为什么第 1 章不能也并发？",
      badScenario: "没有真实样板就让多个 agent 同时写，主题颜色 / 字号关系 / 动画尺度各走各的，最后每章像不同项目；或者它们一起踩同一个主题或 CHAPTER-CRAFT 的盲区。",
      constraint: "SKILL.md Phase 2.2：第 1 章必须在主线程完整做完（不是粗糙骨架），用户验收不可跳过；后面章节参考第 1 章的代码。",
      solvedProblem: "用一个完整真实样本把主题、字号、CHAPTER-CRAFT 的盲区暴露出来，让规则和参数有机会改。",
      reusableMove: "做一整批东西之前，先把一个完整真实样本做透——这个样板必须能暴露真实问题，不能是粗糙骨架。",
      counterScenarios: [
        { when: "第一次跑这个 skill / 第一次用这个主题", effect: "救你", why: "样板会暴露 reference 的盲区、主题颜色不合适、字号不舒服——这些只有真实样本才能暴露。" },
        { when: "已经做过 3 个同主题项目", effect: "可以跳过", why: "样板的价值已经低于做它的成本，可以退一档：「参考之前项目第 1 章」就行——但要写明这条退路的前提。" },
        { when: "用户给了 Figma 全套设计", effect: "部分让位", why: "样板的目标从「摸索风格」变成「验证从 Figma 到网页转得准不准」——目标变了，但「先做透一章」这条还是对的。" }
      ]
    },
    {
      title: "每章都要重读 CHAPTER-CRAFT.md（所有原则收在这一份）",
      looksUnnecessaryBecause: "读一次记住不就行了？为什么每章都要重新读？",
      badScenario: "会话太长 AI 会忘事，写到第 5、6、7 章时容易回到默认那种「网页卡片 + 文字堆叠」的样子；或者只记得一部分原则（记得「逐步揭示」但忘了「去 AI 味」）。",
      constraint: "SKILL.md Phase 2.4 把 CHAPTER-CRAFT.md 当成每章必读的那一份，每章重读；十条原则 / 5 问 / 决策树 / 反模式 / 代码红线 / 自检全部并在这一份里。",
      solvedProblem: "重复做的阶段不会因为会话太长 AI 累了，回退到默认做法。",
      reusableMove: "一件要重复做、又容易出错的事，给它一份每次都必读的单一规则文件——把规则散在 8 个 reference 里说「按需读」是陷阱，AI 不会真的按需读。",
      counterScenarios: [
        { when: "6+ 章长视频 / 长会话开发", effect: "救你", why: "会话太长真的会发生——第 5、6 章时 AI 容易回退到默认 PPT 做法。每章重读 CHAPTER-CRAFT 就是防这件事。" },
        { when: "2-3 章短视频 / 短会话", effect: "部分过度", why: "短会话里 AI 不会忘原则——「每章重读」反而占 token；可以退一档：开头读一次 + 末尾自检。" },
        { when: "同时并发 subagent 模式", effect: "天然落地但价值变低", why: "每个 subagent 都会重新读——但跨 subagent 之间的风格跑偏这条原则反而救不了，得另外加「第 1 章当样板 + 跨 subagent 风格审查」。" }
      ]
    },
    {
      title: "网页跑起来时，narrations.ts 说了算",
      looksUnnecessaryBecause: "outline 和章节代码已经能记录 step 数，为什么还要每章一个 narrations.ts？",
      badScenario: "计划写 5 步、代码写 6 步、合音频 4 段、录屏时全部对不上；或者改完章节忘了同步 outline，但运行时还是按旧 outline 算 step。",
      constraint: "SKILL.md 工作目录约定 + AUDIO.md：每章必须有 narrations.ts，数组长度 = Chapter.tsx 最大 step + 1；网页跑起来和合音频都从这里读。",
      solvedProblem: "杜绝「step 数和 mp3 数对不上」这种情况。",
      reusableMove: "几个文件在描述同一件运行时的事实时，挑离运行时最近、最容易当场验证对错的那一份当最终来源；上游计划允许暂时对不上，但要写明什么时候同步。",
      counterScenarios: [
        { when: "几个文件共同描述同一件运行时的事实（step / mp3 / 字幕都引用同一序号）", effect: "救你", why: "narrations.ts 是离运行时最近、最容易当场校验对错的那一份——指定它说了算之后，前面对不上的情况都会自动汇到这里。" },
        { when: "整个项目就一个 Chapter.tsx 自己管（没有多文件协作）", effect: "完全冗余", why: "如果一份代码自己管 step 数 / 文本 / 音频路径，再多一个 narrations.ts 反而是多余的一层。" },
        { when: "系统已经有一个集中管 step 数据的地方（比如 chapter config）", effect: "取决于", why: "如果架构本身能保证一致，再加 narrations.ts 反而多此一举——但要先验证这个集中管理点在运行时真的被严格遵守，不能假设。" }
      ]
    },
    {
      title: "Auto 模式只按音频走，不等动画",
      looksUnnecessaryBecause: "为什么不让系统等动画播完再推进？听起来更稳妥。",
      badScenario: "如果动画也能影响推进时机，整片节奏会变得很难预测——录屏时调试不知道为什么卡在某一步（是音频没播完？还是动画没播完？）。",
      constraint: "AUDIO.md：Auto 模式只按音频播完 + 200ms 推进；动画必须做得比口播短（动画 ≤ 口播）。",
      solvedProblem: "运行规则简单、稳定、可预测——录屏完不需要后期对音轨。",
      reusableMove: "自动化流程里挑一个信号当唯一推进依据（音频 / 事件流 / 测试结果 / 队列状态），其它行为对齐它——别让多个信号同时来决定下一步什么时候发生。",
      counterScenarios: [
        { when: "一镜到底自动录屏（最常见）", effect: "救你", why: "推进时机简单可预测——录屏不需要后期对音轨。" },
        { when: "交互式演示（用户主动停下来看动画）", effect: "完全失效", why: "这种场景下动画反而该是说了算的那一个（用户控制推进），按音频走在这里反而限制体验。" },
        { when: "复杂动画 + 短口播的组合", effect: "可能绑你", why: "动画做不完整，只能压缩动画或砍内容——这种情况要么放弃 Auto 模式走 Manual + 后期合成，要么接受动画被切断作为代价。" }
      ]
    }
  ],

  patterns: [
    {
      name: "看清原料是哪种，分别走不同路",
      status: "候选",
      prevents: "所有用户输入都走同一套流程——空主题时 AI 帮用户构思内容、用户给了口播稿还要再改写一次、用户给了文章直接跳过写口播就开做网页。",
      therefore: "在 skill 入口画一张表：每一行写一种原料 → 对应应该做的事。原料是空的就反问，不要硬凑。",
      useWhen: "skill 接受多种原料形态（原始素材 / 半成品 / 成品 / 空），不同形态需要做不同的事时。",
      howToReuse: "在入口阶段写一张原料分类表：每一行写一种原料 → 对应该做的事。原料是空的就反问让用户先给素材，不要硬凑。",
      antiExample: "在 description 里写「本 skill 支持多种输入」，但所有路径用同一套动作——这是描述，不是真的分路。",
      cost: "入口越多维护越复杂，只列真实需要支持的入口；多一段判断逻辑。",
      seenIn: ["web-video-presentation SKILL.md Phase 1.1", "extracting-skill-patterns SKILL.md genre + 受众分路"],
      relatedPatterns: [
        { to: "P4", label: "便宜的对齐点", relation: "分路之后通常要走一次对齐才进昂贵实现" },
        { to: "P8", label: "审阅清单必须接修复", relation: "分路出来的产出（script / outline）都要走自检 → 修" }
      ]
    },
    {
      name: "保留两份来源各管一件事",
      status: "候选",
      prevents: "一份中间文件吞下所有职责，导致后面的阶段要么缺细节、要么缺节奏。",
      therefore: "保留原始材料管细节、生成的执行稿管节奏；写清楚每份各管什么；后面的阶段两份都读。",
      useWhen: "原料要同时服务两个不同维度的下游决定（节奏 vs 细节、计划 vs 实现、表层 vs 深层）时。",
      howToReuse: "保留原始材料当细节来源、生成执行稿当节奏来源；写清楚每份各管什么不管什么；后面的阶段两份都读。",
      antiExample: "把原文摘成一份稿子之后要求所有下游只看摘要——这不是「两份各管一件事」，是节流。",
      cost: "后面的阶段要记得读两份；文档必须把边界写清楚。",
      seenIn: ["web-video-presentation SKILL.md L137-141 双源原则", "extracting-skill-patterns（domain primer + soul one-liner 也是这种）"],
      relatedPatterns: [
        { to: "P3", label: "前一步不替后一步做决定", relation: "搭配用：保留两份的同时，前一步规划内容范围、不抢实现判断" },
        { to: "P7", label: "网页跑起来时谁说了算", relation: "区别于：保留两份说的是「不同维度的两份来源」；谁说了算说的是「同一维度避免对不上」" }
      ]
    },
    {
      name: "前一步不替后一步做决定",
      status: "候选",
      prevents: "前面阶段把后面实现的细节写死，导致后面的 agent 只能照搬，没有判断空间。",
      therefore: "在计划文件里写清楚「必须写什么 / 不要写什么」；把视觉 / 实现 / 现场才知道的判断留给后面的 reference 接管。",
      useWhen: "后面阶段才能看到完整上下文（素材、主题、约束、当前内容关系）时。",
      howToReuse: "在计划文件里写清楚「必须写什么 / 不要写什么」；把视觉 / 实现 / 现场才知道的判断留给后面的 reference 接管。",
      antiExample: "前一步什么都不写，让后一步猜——也不是这招。前一步仍要把范围写清楚。",
      cost: "后一步的 agent 需要更强判断力，必须有独立规则文件兜底；计划看起来不会那么满。",
      seenIn: ["web-video-presentation SKILL.md outline 边界表", "extracting-skill-patterns 反装样自检（不替读者写他自己领域的具体反例）"],
      relatedPatterns: [
        { to: "P2", label: "保留两份来源", relation: "搭配用：前一步不抢的同时，留两份给后一步各取所需" },
        { to: "P6", label: "重复做的事给一份每次必读的规则", relation: "下游接管：后一步真正能拿决定权，要靠这份「每次必读 reference」兜底" }
      ]
    },
    {
      name: "在改起来还便宜的那一刻停下来对齐",
      status: "候选",
      prevents: "AI 太快进入昂贵阶段，方向错了之后才发现，整段都要重做。",
      therefore: "在文本计划要进工程实现之前设置一次必须停的对齐点；一次对齐多件事，不要每做一点都问。",
      useWhen: "下一步要进代码实现 / 批量生成 / 外部 API 调用 / 数据库写入这种花钱多或者改起来贵的阶段时。",
      howToReuse: "在文本计划要进工程实现之前设置一次必须停的对齐点；一次对齐多件事，不要每做一点都问一次。",
      antiExample: "每做一点都问用户——这会让流程变慢，不是这招。",
      cost: "多一次用户确认；换来后面少返工。",
      seenIn: ["web-video-presentation SKILL.md Checkpoint Plan + Checkpoint Audio", "extracting-skill-patterns（genre + 受众分路也算这种）"],
      relatedPatterns: [
        { to: "P1", label: "看清原料分别走不同路", relation: "前置：分路是入口最早的决定，比对齐还早" },
        { to: "P5", label: "先做透一个真实样本", relation: "搭配用：对齐之后接做样本——确认完方向再做透一个样本" },
        { to: "P8", label: "审阅清单必须接修复", relation: "前置：自检过了才进对齐——别让用户审还没修过的草稿" }
      ]
    },
    {
      name: "先做透一个真实样本再扩展",
      status: "候选",
      prevents: "批量做或者并发做之前没有真实样板，方向跑偏；多个 agent 各做各的，最后每章像不同项目。",
      therefore: "先在主线程做透一个完整真实切片（不是粗糙骨架）→ 让用户验收 → 暴露规则的盲区 → 修规则 → 再扩展。",
      useWhen: "skill 后面会重复生成很多相似单位（章节 / 客户 / 文件 / 页面 / 测试场景）时。",
      howToReuse: "先在主线程做透一个完整真实切片（不是粗糙骨架）→ 让用户验收 → 暴露规则的盲区 → 修规则 → 再扩展。",
      antiExample: "做一个粗糙骨架就开始并发——样板暴露不出真实问题，等于白做。",
      cost: "前期速度变慢；但减少了后面大面积返工。",
      seenIn: ["web-video-presentation SKILL.md Phase 2.2 第 1 章在主线程做完"],
      relatedPatterns: [
        { to: "P4", label: "在改起来还便宜的那一刻对齐", relation: "前置：对齐完了才做样本" },
        { to: "P6", label: "重复做的事给一份每次必读的规则", relation: "搭配用：样本暴露的盲区写进规则文件，规则文件再回头防后面的章节出错" }
      ]
    },
    {
      name: "重复做的事，给一份每次必读的规则",
      status: "候选",
      prevents: "做重复阶段时 AI 每次记住一部分规则、忘掉另一部分；会话太长之后原则一点点掉落。",
      therefore: "把这个阶段的所有原则合到一份 reference；在 SKILL.md 里写明它「每次必读」；其它 reference 转为「按需查」。",
      useWhen: "skill 某个阶段要重复执行 N 次（每章 / 每用户 / 每文件 / 每场景）且容易因为会话太长而回退到默认做法时。",
      howToReuse: "把这阶段所有原则合到一份 reference；在 SKILL.md 里写明它每次必读；其它 reference 转为按需查。",
      antiExample: "把规则散在 8 个 reference 然后说「按需读取」——AI 不会真的按需读，原则就漏了。",
      cost: "这一份 reference 会变长，需要结构清晰。",
      seenIn: ["web-video-presentation references/CHAPTER-CRAFT.md（每章必读）"],
      relatedPatterns: [
        { to: "P3", label: "前一步不替后一步做决定", relation: "下游接管：前一步让出的决定权要靠这份每次必读 reference 承接" },
        { to: "P5", label: "先做透一个真实样本", relation: "搭配用：样本暴露的盲区写进 reference，reference 反过来防后面章节回退" }
      ]
    },
    {
      name: "网页跑起来时谁说了算",
      status: "候选",
      prevents: "几个文件分别记录同一件运行时的事实（step 数 / 字段 / ID），最后悄悄对不上，行为错位。",
      therefore: "挑离运行时最近、最容易当场校验的那份文件为唯一来源；其它文件允许暂时对不上；提供同步脚本（extract-* 这种）让人可以手动同步。",
      useWhen: "计划、代码、生成物都涉及同一件运行时的事实时。",
      howToReuse: "挑离运行时最近、最容易当场校验的那一份当唯一来源；其它文件允许暂时对不上；提供同步脚本让人可以手动同步。",
      antiExample: "outline / 代码 / 配置 / 音频文件都各自维护一份 step 数——这是对不上的温床，不是这招。",
      cost: "必须写校验规则和同步规则；上游修改时要写明什么时候同步回来。",
      seenIn: ["web-video-presentation narrations.ts", "extracting-skill-patterns（pattern card 状态以独立 sighting 为准也属于这类）"],
      relatedPatterns: [
        { to: "P9", label: "挑一个信号决定下一步什么时候发生", relation: "搭配用：「谁说了算」定义「是什么」（数据），「挑一个信号」定义「谁推进」（时间）——一起保证运行时可预测" },
        { to: "P2", label: "保留两份来源各管一件事", relation: "区别于：保留两份说的是「两个不同维度的来源」，谁说了算说的是「同一维度避免对不上」" }
      ]
    },
    {
      name: "审阅清单必须接修复，不止做检查",
      status: "候选",
      prevents: "自检变成报告装饰——AI 发现问题后原样转述给用户但产出文件没改，用户以为在交付实际只是转手了问题清单。",
      therefore: "每张检查清单都明确写「拿到 fail 列表后必须先按列修」；优先开一个独立 reviewer agent（Agent Teams / subagent），实在不行才自己核查；汇报时必须写「改了什么」，不只是「发现了什么」。",
      useWhen: "skill 某个产出有客观可验证的检查清单（格式 / 完整性 / 命名 / 边界），而且 AI 在交付时容易把「发现问题」当成「完成检查」时。",
      howToReuse: "每张检查清单都明确写「拿到 fail 列表后必须先按列修，不允许只把问题转述给用户」；优先开独立 reviewer agent（Agent Teams / subagent），不行才自己核查；汇报时必须写「改了什么」，不只是「发现了什么」。",
      antiExample: "写一堆 checklist 但没有「fail 后必须修」这条规则——AI 会把检查结果当成报告内容；这不是这招。",
      cost: "交付前多一轮改；需要 reviewer agent 能力（或者退到当前 agent 自己严格核查）。",
      seenIn: ["web-video-presentation SKILL.md 自检协议（贯穿三份产出：script / outline / 单章实现）"],
      isPlatformGap: "部分。Agent Teams / subagent / 反馈循环这一类基础设施，广义上应该是平台层做的事；但 skill 内部写明「fail 必须修」是目前能落地的补丁。",
      relatedPatterns: [
        { to: "P4", label: "在改起来还便宜的那一刻对齐", relation: "前置依赖：对齐之前的产出必须先走自检 → 修，否则让用户审的是没修过的草稿" },
        { to: "P1", label: "看清原料分别走不同路", relation: "搭配用：分路出来的每份产出（script / outline）都要走自检 → 修这一闭环" }
      ]
    },
    {
      name: "挑一个信号决定下一步什么时候发生",
      status: "候选",
      prevents: "自动流程里多个信号同时来决定下一步，行为变得不可预测；调试时不知道是哪个信号在管事。",
      therefore: "挑一个信号当唯一推进依据（音频播完 / 事件来到 / 测试结果 / 队列状态），其它行为主动对齐它；写明「谁让谁等」。",
      useWhen: "做自动化流程（录屏 / 测试 / 部署 / 调度）需要多个事件协同时。",
      howToReuse: "挑一个信号当唯一推进依据，其它行为主动对齐它；写明谁让谁等。",
      antiExample: "让音频 / 动画 / 用户点击 / 定时器都能推进——多个信号一起来，节奏会变得很难预测。",
      cost: "其它行为必须主动对齐这个信号（在这个 skill 里就是「动画必须比口播短」）。",
      seenIn: ["web-video-presentation Auto 模式只按音频走、不等动画"],
      relatedPatterns: [
        { to: "P7", label: "网页跑起来时谁说了算", relation: "搭配用：「谁说了算」管「是什么」（数据），「挑一个信号」管「谁推进」（时间）——一起保证运行时可预测" },
        { to: "P3", label: "前一步不替后一步做决定", relation: "对照：「挑一个信号」是后一步主动对齐前一步定的信号——这个信号有理由，不是抢" }
      ]
    }
  ],

  diagrams: [
    {
      id: "main-flow",
      title: "主流程：4 个 Phase + 2 次必须停下来对齐",
      type: "flow",
      image: "assets/diagrams/main-flow.svg",
      description: "按时间顺序：Phase 1 写内容 → Checkpoint Plan 一次对齐 → Phase 2 写网页（脚手架 → 第 1 章做透当样板 → 第 2-N 章）→ Checkpoint Audio 一次对齐 → Phase 3 合音频（可选）→ Phase 4 录屏。两次对齐都在「改起来还便宜」的那一刻。",
      nodes: [],
      edges: []
    },
    {
      id: "truth-source",
      title: "谁说了算：article / script / outline / narrations 各管什么",
      type: "source-of-truth",
      image: "assets/diagrams/truth-source.svg",
      description: "不按时间，按职责：article 管细节、script 管节奏、outline 管计划、narrations.ts 是网页跑起来时唯一说了算的那一份。计划允许暂时对不上，网页跑起来的时刻不允许。",
      nodes: [],
      edges: []
    },
    {
      id: "package-map",
      title: "包结构：SKILL.md + 7 references + 主题 + 模板",
      type: "file-map",
      image: "assets/diagrams/package-map.svg",
      description: "SKILL.md 是入口，决定后面读哪些文件；4 份核心 reference（SCRIPT-STYLE / OUTLINE-FORMAT / CHAPTER-CRAFT / AUDIO）按阶段接管；THEMES 系统在 Checkpoint Plan 时选；scripts/scaffold.sh 一次建好项目骨架。",
      nodes: [],
      edges: []
    }
  ],

  glossary: [
    {
      term: "article.md",
      plainMeaning: "用户给的原始文章。后面写网页时，画面上挂的具体数字、引用、案例都从这儿找。",
      whereItAppears: "stage 2 把它改成 script.md 之后留着不删；stage 4 写 outline 每章事实清单时从它抽；stage 8 起每章写代码挂画面细节时回它找。",
      solvedProblem: "防止画面只能照念口播稿（撑不住），防止 AI 为了让画面好看自己编数字。",
      howToUse: "我先把它改写成 script.md，同时把原文留着不删；后面写 outline 每章事实清单、写每一章代码挂细节时回它找数字、引用、案例、对比。",
      commonMisread: "不是用完即丢的临时输入——生成 script.md 后不能删，画面挂细节都靠它。"
    },
    {
      term: "script.md",
      plainMeaning: "视频的口播稿——观众最终听到的那一条线。用 `---` 切自然节拍。",
      whereItAppears: "stage 2 生成；stage 4 写 outline 切 step 时参考；stage 10 写 narrations.ts 时参考；stage 13 合音频时是文本来源。",
      solvedProblem: "防止视频听起来像论文摘要 / 产品白皮书 / AI 朗读腔。",
      howToUse: "我按 SCRIPT-STYLE.md 三条标准改写原文，用 `---` 切出一个个完整想法；后面切章节、估时、写 narrations.ts、合音频都受它影响。",
      commonMisread: "不是短摘要——这个 skill 明确要求关键数字、案例、论证链不能为了「口语化」剪掉。"
    },
    {
      term: "outline.md",
      plainMeaning: "网页开发计划——告诉后面写代码的人：分几章、每章几个画面（step）、每步画面上有什么、每章能挂哪些原文细节。",
      whereItAppears: "stage 4 一次产出；Checkpoint Plan 时用户审；stage 8-9 写每章代码时按它开工。",
      solvedProblem: "防止写代码的阶段一边想内容、一边想结构、一边找素材，节奏混乱。",
      howToUse: "我按 OUTLINE-FORMAT.md 写章节、step、估时、每章事实清单、素材清单——但不写动画 / CSS / 毫秒级时长，那些留给写代码的人。",
      commonMisread: "不是视觉规划——它不写具体动画 / CSS / 毫秒级时长，那些是写代码阶段的事。"
    },
    {
      term: "信息池（每章事实清单）",
      plainMeaning: "每一章从 article.md 抽出来的一小撮可挂在画面上的细节：数字、引用、案例、时间、对比、出处。",
      whereItAppears: "outline.md 每章首段。",
      solvedProblem: "防止网页画面只是把口播稿打在屏幕上 → 画面没有额外信息，看起来像 PPT 字幕板。",
      howToUse: "我写 outline 时每章首段从原文抽 3-5 条事实；写这一章代码时回这份清单挂数据 / 引用 / 角标 / pull quote / mono cue。",
      commonMisread: "不是装饰性的素材清单——它是从原文抽的、能让画面上挂的细节比口播多的具体证据。"
    },
    {
      term: "Checkpoint Plan",
      plainMeaning: "script.md 和 outline.md 写完后必须停下来对齐的一刻，一次让用户确认 5 件事：稿子 / outline / 主题 / 素材 / 开发模式。",
      whereItAppears: "stage 6，在 stage 7 开建项目之前。",
      solvedProblem: "防止 AI 在方向还没确认时就开始写代码 → 最后整段都要重做。",
      howToUse: "我把 script + outline + 主题推荐（动态读 themes/*/theme.json 主动推 2-3 个）+ 素材需求 + 开发模式选项 一起发给用户 → 等他一次确认 5 件事再开建。",
      commonMisread: "不是礼貌询问——它是「改起来还便宜的那一刻」对齐。所有东西现在还都是文本，改起来不花时间；开建之后改起来贵。"
    },
    {
      term: "主题（theme）",
      plainMeaning: "一组 CSS 颜色 / 字体变量 + 一份 theme.json 元数据，决定整片视频的颜色 / 字体 / 整体气质。",
      whereItAppears: "Checkpoint Plan 时用户选；stage 7 脚手架把对应的 tokens.css 拷到项目里；写每章代码时通过 CSS 变量用它。",
      solvedProblem: "防止每章各写各的颜色和字体 → 整条视频看起来像拼凑出来的。",
      howToUse: "Checkpoint Plan 时我动态读 themes/*/theme.json 拿中文名 / 中文描述 / 适合什么内容 / 气质主动推荐 2-3 个；脚手架拷对应 tokens.css；写章节代码必须用主题变量，不能写死颜色 / 字体。",
      commonMisread: "不是模板——它只兜底整体气质，不决定每章动画怎么演。"
    },
    {
      term: "CHAPTER-CRAFT.md",
      plainMeaning: "写每一章网页前必读的那一份 reference，每章都重读一次。里面有十条原则 / 开工 5 问 / 关系→动作决策树 / 视觉工具箱 / AI 味反模式 / 代码红线 / 完工自检。",
      whereItAppears: "stage 8 写第 1 章和 stage 9 写第 2-N 章每次写代码时。",
      solvedProblem: "防止 agent 把 outline 翻译成一页页大字 PPT 卡片；防止会话太长之后 AI 累了、回退到默认做法。",
      howToUse: "每次写一章时我把 CHAPTER-CRAFT.md 当成必读的那一份——它把章节级原则全合在了一起；其它 reference（EXAMPLES / THEMES）只在需要时查。",
      commonMisread: "不是美术建议——里面很多规则是验收红线，整章纯文字会被打回来重做。"
    },
    {
      term: "第 1 章（项目的样板）",
      plainMeaning: "整片视频的样板间。第 1 章必须在主线程完整做完（不是粗糙骨架），让用户验收视觉风格 / 节奏 / 有没有 AI 味。",
      whereItAppears: "stage 8，脚手架建好之后、第 2 章开始之前。",
      solvedProblem: "防止后面批量开发或同时并发时，风格和质量标准还没用真实页面验证过；防止 CHAPTER-CRAFT 的盲区到第 5 章才暴露。",
      howToUse: "我在主线程完整实现第 1 章（不允许粗糙骨架）；用户验收时引导他看视觉风格 / 节奏 / 内容驱动动画 / 画面有没有挂原文细节 / 有没有 AI 味；后面章节参考它的代码风格但不强求视觉完全一致。",
      commonMisread: "不是为了让后面章节视觉完全一致——它是代码风格和气质的参考，不是抄袭对象；后面章节在主题变量下自由发挥是预期。"
    },
    {
      term: "narrations.ts（网页跑起来时谁说了算）",
      plainMeaning: "每章每个 step 对应的口播文本数组。数组长度等于这一章的 step 数；网页跑起来时所有地方（useStepper / extract-narrations / App / useAudioPlayer）都从这里读。",
      whereItAppears: "每个章节目录里，和 Chapter.tsx 放一起。",
      solvedProblem: "防止网页 step 数、口播文本、音频文件数各写各的、悄悄对不上，最后 Auto 录屏错位。",
      howToUse: "每章写代码时同步写 narrations.ts；数组长度严格等于 Chapter.tsx 里 `if (step === N)` 的最大 N + 1；改完章节结构要把 useStepper.ts 的 STORAGE_KEY 改个名字，防止 localStorage 里旧进度落到不存在的 step。",
      commonMisread: "不是字幕备份——写错会让 Auto 录屏整片错位。outline 是计划，这一份才是网页跑起来时真正说了算的。"
    },
    {
      term: "Auto 模式（?auto=1）",
      plainMeaning: "自动播放和自动推进的录屏模式。URL 加 `?auto=1` 后按一次 Space，网页根据每段音频播完了自动推进到下一 step。",
      whereItAppears: "stage 14 录屏，需要 stage 13 已经把音频合成出来。",
      solvedProblem: "不用手动点鼠标、不用后期对音轨——一镜到底录完。",
      howToUse: "我在写每一章时就要保证动画比口播短；告诉用户开 `?auto=1` + 全屏 + 开始录屏 + 按一次 Space + 等网页自动播完 + 停录 + 裁头尾。",
      commonMisread: "不是录屏软件——它只让网页按音频走自己推进；它故意不等动画播完（按音频走的代价），所以动画必须比口播短。"
    }
  ],

  applyIt: {
    summary: "如果你要写一个「把 X 类内容做成 Y 类产物」的 skill（不只是文章 → 视频网页，可以是论文 → 演示、需求 → 设计、数据 → 报告），照这个 skill 的形状抄。先列清楚这个 skill 防什么默认的坏 AI 做法（如果它不存在你会看到 AI 怎么做坏）。再做原料分类，让 skill 能区分原始素材 / 半成品 / 空主题。再设计每份中间文件管什么、不管什么（别让一份文件吞下所有职责）。把改起来最贵的几个决定合到一次对齐里。批量做之前先做透一个真实样本。重复做的事，给一份每次必读的规则。最后挑离运行时最近的文件当唯一来源，让 step / ID / 字段不会悄悄对不上。",
    checklistTitle: "10 步清单",
    checklistHeading: "从坏 AI 做法反推 skill 的形状",
    checklistCardTitle: "把这 10 件事先写下来再写代码",
    checklist: [
      "写清楚这个 skill 防什么默认的坏 AI 做法（具体到一种偷懒方式或装样行为，不要写「低质量输出」）。",
      "做原料分类——列一张表：每一行写一种原料 → 对应该做的事；原料是空的就反问，不要硬凑。",
      "设计中间文件，让两份各管一件事——写清楚每份文件管什么、不管什么；不要让一份文件吞下所有职责。",
      "找出「前一步不应该决定」的事——把它们留给后一步，写在计划文件的「不要写什么」列表里。",
      "找出改起来最贵的几个决定，合到一次对齐里；不要每做一点都问一次。",
      "批量做之前先做透一个真实完整的样本（不是粗糙骨架）；让用户验收，把规则的盲区暴露出来。",
      "把重复做的事的所有规则合到一份每次必读的 reference——别散在 8 个文件然后说「按需读取」。",
      "挑离运行时最近、最容易当场校验的文件当唯一来源；其它文件允许暂时对不上；提供同步脚本。",
      "自动化流程挑一个信号当唯一推进依据，其它行为对齐它；不要让多个信号同时来决定下一步。",
      "每个产出的自检必须接修复动作，不能只把 fail 转述给用户——做了 → 自查 → 修了 → 报，不是只做检查。"
    ],
    starterPrompt: "请按 web-video-presentation 这个 skill 的形状，为我的领域设计一个「把 X 类内容做成 Y 类产物」的 skill。先告诉我这个 skill 防什么默认的坏 AI 做法（具体到一种偷懒方式，不要写「低质量」）。再做原料分类。再设计中间文件让两份各管一件事 + 前一步不替后一步做决定。再找出改起来最贵的几个决定，合到一次对齐里。再设计批量做之前先做透一个样本 + 重复做的事给一份每次必读的规则 + 网页跑起来时谁说了算 + 挑一个信号决定下一步什么时候发生。最后写每个产出的自检必须接修复。不要先写实现代码；先把这些设计层的决定写下来。",
    nextSteps: {
      author: [
        "回到 SKILL.md，把 Phase 1.1 的原料分类表给一个没读过这个 skill 的同事看：他能不能猜到每种原料对应的动作？猜不到就重写 examples 那一列。",
        "把 references/CHAPTER-CRAFT.md 给一个写过两章的 agent 看，问它「你记得这里面哪 5 条最重要」——记不住的条目可能信息密度太低，需要拆出真实例子。",
        "下一次接到「帮我做个 X 主题的视频」但用户没给素材时，反问而不是硬凑——让 Phase 1.1 的反问路径被真正走通。",
        "把自检协议从「文档里写明」升级到「每个产出都有独立 reviewer」——把 SKILL.md 里说的 Agent Teams / subagent 路径真正接上自动化。"
      ],
      thief: [
        "Patterns 章里挑「保留两份来源各管一件事」或「前一步不替后一步做决定」：在你的领域找到对应的两个维度，写出两份各管什么。",
        "找到你领域里「改起来最贵的几个决定」，合到一次对齐里——不是每做一点都问，是一次问完。",
        "强制画一张「谁说了算」的图：你领域里网页跑起来时（或者其它运行时）说了算的是哪份文件？它和上游计划文件什么时候同步？画不出来就说明设计还没想清楚。",
        "把「审阅清单必须接修复」抄到你 skill 的关键产出上——每张 checklist 后面强制加「fail 必须修，不允许只汇报」这条规则。"
      ]
    }
  }
};
