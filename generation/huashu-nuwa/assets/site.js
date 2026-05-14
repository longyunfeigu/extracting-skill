(function () {
  const handbook = window.handbook || {};
  const path = window.location.pathname;
  const inPages = path.includes("/pages/");
  const root = inPages ? "../" : "./";

  function escapeHtml(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function slugify(value = "") {
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9一-龥]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
  }

  function buildChapters() {
    const counts = {
      stages: (handbook.walkthrough || []).length,
      glossary: (handbook.glossary || []).length,
      files: (handbook.fileMap || []).length,
      choices: (handbook.designChoices || []).length,
      patterns: (handbook.patterns || []).length
    };
    return [
      { label: "Overview", sub: "概览 · 失败模式 · 域 primer · 例子", href: `${root}pages/overview.html`, slug: "overview" },
      { label: "Walkthrough", sub: `运行轨迹 · ${counts.stages} 个 stage`, href: `${root}pages/walkthrough.html`, slug: "walkthrough" },
      { label: "Glossary", sub: `概念词典 · ${counts.glossary} 个核心术语`, href: `${root}pages/glossary.html`, slug: "glossary" },
      { label: "File Map", sub: `文件怎么协作 · ${counts.files} 个文件`, href: `${root}pages/file-map.html`, slug: "file-map" },
      { label: "Design Choices", sub: `关键设计选择 · ${counts.choices} 个`, href: `${root}pages/design-choices.html`, slug: "design-choices" },
      { label: "Patterns", sub: `能偷的招 · ${counts.patterns} 张候选 card`, href: `${root}pages/patterns.html`, slug: "patterns" },
      { label: "Apply It", sub: "自己写一个类似 skill", href: `${root}pages/apply-it.html`, slug: "apply-it" }
    ];
  }

  function skillName() {
    return handbook.meta?.skillName || handbook.meta?.shortName || "这个 skill";
  }

  function exampleName() {
    return handbook.example?.label || handbook.example?.name || "贯穿例子";
  }

  function getSubNav(page) {
    switch (page) {
      case "overview":
        return [
          { anchor: "scene", label: "先看默认会错在哪" },
          { anchor: "predict", label: "你先猜一遍" },
          { anchor: "primer", label: "Domain primer" },
          { anchor: "wow", label: "Wow moment" },
          { anchor: "bad-results", label: "防的坏结果" },
          { anchor: "example", label: "贯穿例子" },
          { anchor: "shape", label: "本手册为什么这样排" }
        ];
      case "walkthrough":
        return (handbook.walkthrough || []).map((s, i) => ({
          anchor: s.id || `stage-${i + 1}`,
          label: `${String(i + 1).padStart(2, "0")} ${(s.title || "").replace(/，.*$/, "").replace(/——.*$/, "")}`
        }));
      case "glossary":
        return (handbook.glossary || []).map((g) => ({
          anchor: slugify(g.term),
          label: g.term
        }));
      case "file-map":
        return (handbook.fileMap || []).map((f) => {
          const tail = f.path.split("/").pop() || f.path;
          return { anchor: slugify(f.path), label: tail };
        });
      case "design-choices":
        return (handbook.designChoices || []).map((c, i) => ({
          anchor: `dc${i + 1}`,
          label: `${String(i + 1).padStart(2, "0")} ${c.title}`
        }));
      case "patterns":
        return (handbook.patterns || []).map((p, i) => ({
          anchor: `p${i + 1}`,
          label: `P${i + 1} ${p.name.replace(/\s*\(.+?\)\s*$/, "").replace(/（.+?）\s*$/, "")}`
        }));
      case "apply-it":
        return [
          { anchor: "checklist", label: "起手清单" },
          { anchor: "starter-prompt", label: "起手 prompt" },
          { anchor: "next-steps", label: "下一步" }
        ];
      default:
        return [];
    }
  }

  function list(items = []) {
    if (!items.length) return "";
    return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function findDiagram(id) {
    return (handbook.diagrams || []).find((d) => d.id === id);
  }

  function diagramBlock(diagram) {
    if (!diagram) return "";
    const image = diagram.image
      ? `<img class="diagram-image" src="${root}${escapeHtml(diagram.image)}" alt="${escapeHtml(diagram.title)}" />`
      : `<div class="diagram-missing">⚠ 图未画 · 期望路径 ${escapeHtml(diagram.expectedImage || "")}</div>`;
    return `
      <figure class="diagram-card">
        <figcaption class="diagram-caption">
          <span class="diagram-kicker">${escapeHtml(diagram.kicker || diagram.type || "diagram")}</span>
          <h4>${escapeHtml(diagram.title)}</h4>
          <p>${escapeHtml(diagram.description || "")}</p>
        </figcaption>
        ${image}
      </figure>
    `;
  }

  function renderNarrativeBlock(block) {
    if (!block || !block.kind) return "";
    if (block.kind === "para") {
      return `<p>${escapeHtml(block.text || "")}</p>`;
    }
    if (block.kind === "list") {
      const items = (block.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
      return `<ul class="narrative-list">${items}</ul>`;
    }
    if (block.kind === "code") {
      const lang = block.lang ? ` data-lang="${escapeHtml(block.lang)}"` : "";
      const langLabel = block.lang ? escapeHtml(block.lang.toUpperCase()) : "TEXT";
      return `<div class="code-block"><div class="code-chrome"><span class="code-dots"><i></i><i></i><i></i></span><span class="code-lang">${langLabel}</span></div><pre${lang}><code>${escapeHtml(block.text || "")}</code></pre></div>`;
    }
    if (block.kind === "quote") {
      return `<blockquote class="narrative-quote">${escapeHtml(block.text || "")}</blockquote>`;
    }
    if (block.kind === "diagram") {
      return diagramBlock(findDiagram(block.id));
    }
    return "";
  }

  function layout(title, content) {
    const page = document.body.dataset.page || "";
    const chapters = buildChapters();
    const subNav = getSubNav(page);
    document.title = `${title} · ${handbook.meta?.title || "Skill Handbook"}`;
    const navHtml = chapters.map((ch, idx) => {
      const isActive = page === ch.slug;
      const subItems = isActive && subNav.length
        ? `<ul class="subsections">${subNav.map((s) => `<li><a href="#${escapeHtml(s.anchor)}">${escapeHtml(s.label)}</a></li>`).join("")}</ul>`
        : "";
      return `
        <div class="nav-block${isActive ? " active" : ""}">
          <a class="chapter-link${isActive ? " active" : ""}" href="${ch.href}">
            <span class="num">${String(idx + 1).padStart(2, "0")}</span>
            <span class="chapter-link-text">
              <span class="chapter-link-label">${escapeHtml(ch.label)}</span>
              <small>${escapeHtml(ch.sub)}</small>
            </span>
          </a>
          ${subItems}
        </div>
      `;
    }).join("");

    document.querySelector("#app").innerHTML = `
      <aside class="sidebar">
        <a class="brand" href="${root}index.html">${escapeHtml(handbook.meta?.title || "Skill Handbook")}</a>
        <span class="brand-sub">${escapeHtml(handbook.meta?.audience || "")}</span>
        <nav>${navHtml}</nav>
        <p class="source">
          <span class="source-label">来源</span>
          ${escapeHtml(handbook.meta?.sourcePath || "")}
        </p>
      </aside>
      <main>${content}</main>
    `;
  }

  // ===== Overview renderer (textbook standard) =====
  function overviewPage() {
    const overview = handbook.overview || {};
    const example = handbook.example || {};

    const openingHtml = (overview.openingScene || []).map(renderNarrativeBlock).join("");

    const predictHtml = overview.predictPrompt
      ? `<aside class="predict-block">
          <span class="predict-label">写下你的猜测</span>
          <p>${escapeHtml(overview.predictPrompt)}</p>
        </aside>`
      : "";

    const primerHtml = (overview.primerBeats || []).map(renderNarrativeBlock).join("");

    const wowSetupHtml = overview.wowSetup ? `<p class="wow-setup">${escapeHtml(overview.wowSetup)}</p>` : "";
    const wowDiagramHtml = overview.wowDiagramId
      ? diagramBlock(findDiagram(overview.wowDiagramId))
      : "";
    const wowMomentHtml = overview.wowMoment
      ? `<p class="wow-moment">${escapeHtml(overview.wowMoment)}</p>`
      : "";

    const badResultsHtml = (overview.badResults || []).map((card) => {
      const intervention = card.skillIntervention || card["nu" + "waIntercept"] || "";
      return `
        <article class="bad-result-card">
          <h4>${escapeHtml(card.title)}</h4>
          <div class="bad-default">
            <span class="ba-label">不用这个 skill · AI 默认</span>
            <p>${escapeHtml(card.aiDefault)}</p>
          </div>
          <div class="bad-arrow">↓</div>
          <div class="bad-intercept">
            <span class="ba-label">skill 怎么拦</span>
            <p>${escapeHtml(intervention)}</p>
          </div>
        </article>
      `;
    }).join("");

    const chapterLogicHtml = (overview.chapterLogic || []).map((c) => `
      <li>
        <span class="logic-chapter">${escapeHtml(c.chapter)}</span>
        <span class="logic-why">${escapeHtml(c.why)}</span>
      </li>
    `).join("");

    layout("Overview", `
      <article class="overview-page">
        <header class="ov-hero">
          <p class="eyebrow">Overview · 章 01</p>
          <h1>${escapeHtml(overview.h1 || "看见这个 skill 在做什么")}</h1>
          <p class="lede">${escapeHtml(overview.oneLiner || "")}</p>
          <span class="hero-rule"></span>
        </header>

        <section class="section opening" id="scene">
          <p class="eyebrow">先看 AI 默认会做坏成什么样</p>
          <div class="opening-body">${openingHtml}</div>
        </section>

        <section class="section predict" id="predict">
          ${predictHtml}
        </section>

        <section class="section primer" id="primer">
          <p class="eyebrow">Domain primer · 0 行业黑话先说一遍</p>
          <h2>${escapeHtml(skillName())} 在做什么</h2>
          <div class="primer-body">${primerHtml}</div>
        </section>

        <section class="section wow" id="wow">
          <p class="eyebrow">Wow moment · 把 3 个人放进一张表</p>
          <h2>Agentic Protocol 不是写死模板</h2>
          ${wowSetupHtml}
          ${wowDiagramHtml}
          ${wowMomentHtml}
        </section>

        <section class="section bad-results" id="bad-results">
          <p class="eyebrow">具体到 4-5 种 AI 本能 · before / after</p>
          <h2>${escapeHtml(skillName())} 拦的是这些坏结果</h2>
          <div class="bad-results-grid">
            ${badResultsHtml}
          </div>
        </section>

        <section class="section example" id="example">
          <p class="eyebrow">引入贯穿全本的具体例子</p>
          <h2>用${escapeHtml(exampleName())}跑一遍</h2>
          <div class="example-grid">
            <article class="example-card">
              <h4>用户请求</h4>
              <p>${escapeHtml(example.userRequest || "")}</p>
            </article>
            <article class="example-card">
              <h4>为什么挑这个例子</h4>
              <p>${escapeHtml(example.whyThisExample || "")}</p>
            </article>
            <article class="example-card">
              <h4>预期产出</h4>
              <p>${escapeHtml(example.expectedOutput || "")}</p>
            </article>
          </div>
          <aside class="example-callout">这个例子会贯穿整本手册——后面 Walkthrough 的每一阶段都用它落地，中途不换。</aside>
        </section>

        <section class="section shape" id="shape">
          <p class="eyebrow">Why this shape · 章节排序的依据</p>
          <h2>${escapeHtml(overview.shapeReason || "按读者意图排，不按源文件顺序")}</h2>
          <ol class="chapter-logic">
            ${chapterLogicHtml}
          </ol>
        </section>

        <div class="end-mark">
          <span class="end-mark-glyph">❖ &nbsp; ❖ &nbsp; ❖</span>
          <span class="end-mark-text">章 01 / Overview — 完</span>
        </div>
      </article>
    `);
  }

  // ===== Walkthrough renderer (editorial magazine) =====
  function walkthroughPage() {
    const stages = handbook.walkthrough || [];
    const flow = findDiagram("main-flow");
    const flowHtml = flow ? diagramBlock(flow) : "";

    const indexHtml = stages.length ? `
      <section class="section" id="stage-index">
        <p class="eyebrow">全 ${stages.length} 个 stage · 点击跳转</p>
        <div class="index-grid">
          ${stages.map((stage, i) => `
            <a class="index-item" href="#${escapeHtml(stage.id || `stage-${i + 1}`)}">
              <span class="index-num">${String(i + 1).padStart(2, "0")}</span>
              <span class="index-title">${escapeHtml(stage.title || "")}</span>
            </a>
          `).join("")}
        </div>
      </section>` : "";

    function stageBlock(stage, index) {
      const num = String(index + 1).padStart(2, "0");
      const preTestHtml = stage.preTest ? `
        <aside class="pretest">
          <span class="pretest-label">先猜一遍 · pre-test</span>
          <p>${escapeHtml(stage.preTest)}</p>
        </aside>` : "";

      const hookOpen = stage.hookOpen ? `<p class="hook hook-open"><strong>${index === 0 ? "从这里开始：" : "接上一步："}</strong>${escapeHtml(stage.hookOpen)}</p>` : "";
      const hookClose = stage.hookClose ? `<p class="hook hook-close"><strong>${index === stages.length - 1 ? "这里把账结清：" : "下一步靠这个："}</strong>${escapeHtml(stage.hookClose)}</p>` : "";

      const narrativeHtml = Array.isArray(stage.narrativeBody) && stage.narrativeBody.length
        ? `<div class="narrative">${stage.narrativeBody.map(renderNarrativeBlock).join("")}</div>`
        : "";

      const moveHtml = stage.reusableMove ? `
        <div class="move">
          <span class="move-quote">"</span>
          <span class="move-label">这里能偷的招</span>
          <p>${escapeHtml(stage.reusableMove)}</p>
        </div>` : "";

      const quickRefRows = [
        ["这一步收到什么", stage.receives],
        ["skill 让我读什么", stage.reads],
        ["我不能直接做什么", stage.blockedShortcut],
        ["我做什么", stage.action],
        ["我产出什么", stage.output],
        ["挡住的错位", stage.painPoint],
        ["机制线索", stage.mechanismThread],
        ["下一步谁用它", stage.nextConsumer],
        ["自由度", stage.freedom]
      ].filter(([, v]) => v);

      const quickRefHtml = quickRefRows.length ? `
        <details class="quickref">
          <summary>阶段速查 · Stage metadata</summary>
          <div class="quickref-body">
            ${quickRefRows.map(([label, value]) => `
              <div class="qr-row">
                <span class="qr-label">${escapeHtml(label)}</span>
                <span class="qr-body">${escapeHtml(value)}</span>
              </div>
            `).join("")}
          </div>
        </details>` : "";

      const challengesHtml = Array.isArray(stage.challenges) && stage.challenges.length ? `
        <section class="challenges">
          <div class="challenges-rule"></div>
          <h4>你的练习</h4>
          <p class="challenges-sub">不是 AI 的内心独白——是给读这本手册的你的题。先想再读下一阶段。</p>
          <ol class="challenges-list">
            ${stage.challenges.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}
          </ol>
        </section>` : "";

      return `
        <section class="stage" id="${escapeHtml(stage.id || `stage-${index + 1}`)}">
          <header class="stage-head">
            <div class="stage-num">${num}</div>
            <div class="stage-meta">
              <span class="stage-kicker">${escapeHtml(stage.kicker || stage.phase || "")}</span>
              <h3 class="stage-title">${escapeHtml(stage.title || "")}</h3>
              <p class="stage-summary">${escapeHtml(stage.summary || "")}</p>
            </div>
          </header>
          ${hookOpen}
          ${preTestHtml}
          ${narrativeHtml}
          ${moveHtml}
          ${quickRefHtml}
          ${hookClose}
          ${challengesHtml}
        </section>
      `;
    }

    layout("Walkthrough", `
      <article class="page walkthrough-page">
        <div class="masthead">
          <span class="masthead-left">❖ &nbsp; ${escapeHtml(skillName())} · 解剖手册</span>
          <span class="masthead-mid">章 02 / Walkthrough</span>
          <span class="masthead-right">${escapeHtml(handbook.meta?.version || "v1")}</span>
        </div>
        <header class="wt-hero">
          <p class="eyebrow">Walkthrough · 章 02</p>
          <h1>运行轨迹</h1>
          <p class="subtitle">${escapeHtml(handbook.overview?.oneLiner || "")}</p>
          <p class="lede">下面 ${stages.length} 个 stage 展示我被这个 skill 一步步约束、暂停、检查、推进的完整路径。每个 stage 都用 <strong>${escapeHtml(exampleName())}</strong> 做落地，中途不换。</p>
          <span class="hero-rule"></span>
        </header>
        ${flowHtml ? `
        <section class="section" id="flow-overview">
          <p class="eyebrow">先看顶层流程</p>
          ${flowHtml}
        </section>` : ""}
        ${indexHtml}
        <section class="stages">
          ${stages.map(stageBlock).join("")}
        </section>
        <div class="end-mark">
          <span class="end-mark-glyph">❖ &nbsp; ❖ &nbsp; ❖</span>
          <span class="end-mark-text">章 02 / Walkthrough — 完</span>
        </div>
      </article>
    `);
  }

  // ===== Other pages (cards-driven) =====
  function glossaryPage() {
    const terms = handbook.glossary || [];
    layout("Glossary", `
      <article class="page">
        <header class="wt-hero">
          <p class="eyebrow">Glossary · 章 03</p>
          <h1>概念词典</h1>
          <p class="lede">${terms.length} 个核心术语，每条 5 个字段——人话解释 / 出现场景 / 解决什么问题 / 我怎么用 / 容易误解。Walkthrough 里的就地短解保证当下读得动；这一页给想系统过一遍术语的人用。</p>
          <span class="hero-rule"></span>
        </header>
        <section class="section">
          <div class="card-grid">
            ${terms.map((t) => `
              <article class="card glossary-card" id="${slugify(t.term)}">
                <h3>${escapeHtml(t.term)}</h3>
                <div class="card-row"><span class="label">定义</span><p>${escapeHtml(t.definition || t.plainMeaning || "")}</p></div>
                <div class="card-row"><span class="label">它在哪个 stage 出现</span><p>${escapeHtml(t.whereItAppears || "")}</p></div>
                <div class="card-row"><span class="label">它解决什么问题</span><p>${escapeHtml(t.solvedProblem || "")}</p></div>
                <div class="card-row"><span class="label">我怎么用它</span><p>${escapeHtml(t.howToUse || "")}</p></div>
                <div class="card-row"><span class="label">容易误解</span><p>${escapeHtml(t.commonMisread || "")}</p></div>
              </article>
            `).join("")}
          </div>
        </section>
      </article>
    `);
  }

  function fileMapPage() {
    const files = handbook.fileMap || [];
    const pkg = findDiagram("package-map");
    layout("File Map", `
      <article class="page">
        <header class="wt-hero">
          <p class="eyebrow">File Map · 章 04</p>
          <h1>文件怎么协作</h1>
          <p class="lede">SKILL.md 是入口和路由；其它文件按职责协作。下面先看包结构图，再看每份文件的责任卡——谁生成它、谁读它、它管什么、不管什么、写错会怎样。</p>
          <span class="hero-rule"></span>
        </header>
        ${pkg ? `<section class="section">${diagramBlock(pkg)}</section>` : ""}
        <section class="section">
          <p class="eyebrow">文件责任卡</p>
          <div class="card-grid">
            ${files.map((f) => `
              <article class="card filemap-card" id="${slugify(f.path)}">
                <h3>${escapeHtml(f.path)}</h3>
                <div class="card-row"><span class="label">它的角色</span><p>${escapeHtml(f.role || "")}</p></div>
                <div class="card-row"><span class="label">谁生成它</span><p>${escapeHtml(f.generatedBy || "")}</p></div>
                <div class="card-row"><span class="label">谁读取它</span><p>${escapeHtml(f.readBy || "")}</p></div>
                <div class="card-row"><span class="label">它管什么</span><p>${escapeHtml(f.owns || "")}</p></div>
                <div class="card-row"><span class="label">它不管什么</span><p>${escapeHtml(f.doesNotOwn || "")}</p></div>
                <div class="card-row"><span class="label">如果它写错会怎样</span><p>${escapeHtml(f.failureIfWrong || "")}</p></div>
              </article>
            `).join("")}
          </div>
        </section>
      </article>
    `);
  }

  function designChoicesPage() {
    const choices = handbook.designChoices || [];
    layout("Design Choices", `
      <article class="page dc-page">
        <header class="dc-hero">
          <p class="eyebrow">Design Choices · Three-Act Edition · 章 05</p>
          <h1>每个 dc 是一出三幕戏 —— <em><span class="ai-bad">设定</span></em>、<em><span class="skill-good">转折</span></em>、<em>余波</em>。</h1>
          <p class="lede">这一章不列规则清单——列 ${choices.length} 个真正改变了 AI 默认行为的设计选择。每个 dc 是一出三幕戏：第一幕 <em>AI 准备做什么</em>（红印章），第二幕 <em>skill 拦下来怎么改</em>（绿印章），第三幕 <em>结果如何</em>（黑印章）。底下三场是"换三个地形把这出戏重演一遍"——管用 / 得让一步 / 用不上。</p>
          <span class="hero-rule"></span>
        </header>
        <section class="section">
          ${choices.map((c, i) => {
            const num = String(i + 1).padStart(2, "0");
            const scenes = (c.counterScenarios || []).map((s) => `
              <div class="scene" data-effect="${escapeHtml(s.effect || "")}">
                <div class="scene-effect">${escapeHtml(s.effect || "")}</div>
                <div class="scene-when">${escapeHtml(s.when || "")}</div>
                <div class="scene-why">${escapeHtml(s.why || "")}</div>
              </div>
            `).join("");

            return `
              <section class="dc" id="dc${i + 1}">
                <header class="dc-head">
                  <span class="dc-num">DC ${num}</span>
                  <h2 class="dc-title">${escapeHtml(c.title || "")}</h2>
                </header>

                <p class="dc-opening">${escapeHtml(c.looksUnnecessaryBecause || "")}</p>

                <div class="acts">
                  <div class="act setup">
                    <div class="act-stamp"><span class="roman">I</span><span>设定 · SETUP</span></div>
                    <div class="act-title">AI 准备做什么</div>
                    <div class="act-body">${escapeHtml(c.badScenario || "")}</div>
                  </div>
                  <div class="act turn">
                    <div class="act-stamp"><span class="roman">II</span><span>转折 · TURN</span></div>
                    <div class="act-title">skill 拦下来怎么改</div>
                    <div class="act-body">${escapeHtml(c.constraint || "")}</div>
                  </div>
                  <div class="act aftermath">
                    <div class="act-stamp"><span class="roman">III</span><span>余波 · AFTERMATH</span></div>
                    <div class="act-title">结果如何</div>
                    <div class="act-body">${escapeHtml(c.solvedProblem || "")}</div>
                  </div>
                </div>

                <div class="curtain">
                  <div class="curtain-label">这一招换个地方一样能用</div>
                  <div class="curtain-body">${escapeHtml(c.reusableMove || "")}</div>
                </div>

                <div class="encore">
                  <div class="encore-label">换三个地形把这出戏重演</div>
                  <div class="encore-hint">同一出戏在不同舞台演出来效果不一样——管用的舞台、得让一步的舞台、彻底用不上的舞台。</div>
                  <div class="encore-grid">${scenes}</div>
                </div>
              </section>
            `;
          }).join("")}
        </section>
      </article>
    `);
  }

  function patternsPage() {
    const patterns = handbook.patterns || [];
    const net = findDiagram("pattern-network");
    layout("Patterns", `
      <article class="page">
        <header class="wt-hero">
          <p class="eyebrow">Patterns · 章 06</p>
          <h1>${patterns.length} 张候选 pattern card</h1>
          <p class="lede">这些是可以从这个 skill 搬到别的 skill 里的招。每张卡 problem → Therefore → solution 之间有视觉断点，让你停一秒自己想"我会怎么解"再看这个 skill 的解。卡片之间用"和哪些 pattern 一起读"互相链接。</p>
          <span class="hero-rule"></span>
        </header>
        ${net ? `<section class="section">${diagramBlock(net)}</section>` : ""}
        <section class="section">
          <div class="card-grid">
            ${patterns.map((p, i) => {
              const relHtml = Array.isArray(p.relatedPatterns) && p.relatedPatterns.length ? `
                <section class="related-patterns">
                  <span class="related-label">和哪些 pattern 一起读</span>
                  <ul>
                    ${p.relatedPatterns.map((rp) => `
                      <li>
                        <a href="#${escapeHtml((rp.to || "").toLowerCase())}">
                          <span class="rp-num">${escapeHtml(rp.to || "")}</span>
                          <span class="rp-body">
                            <span class="rp-name">${escapeHtml(rp.label || "")}</span>
                            <span class="rp-rel">${escapeHtml(rp.relation || "")}</span>
                          </span>
                        </a>
                      </li>
                    `).join("")}
                  </ul>
                </section>` : "";
              return `
                <article class="card pattern-card" id="p${i + 1}">
                  <h3><span class="p-num">P${String(i + 1).padStart(2, "0")}</span>${escapeHtml(p.name)}<span class="status-pill">${escapeHtml(p.status || "候选")}</span></h3>
                  <div class="card-row pattern-problem"><span class="label">它防什么坏结果 · problem</span><p>${escapeHtml(p.prevents || "")}</p></div>
                  <div class="pattern-therefore">
                    <span class="pt-divider">❖ &nbsp; ❖ &nbsp; ❖</span>
                    <div class="pt-body">
                      <span class="pt-label">Therefore</span>
                      <p>${escapeHtml(p.therefore || "")}</p>
                    </div>
                    <span class="pt-divider">❖ &nbsp; ❖ &nbsp; ❖</span>
                  </div>
                  <div class="card-row"><span class="label">什么时候用 / 为什么不能简单做</span><p>${escapeHtml(p.useWhen || "")}</p></div>
                  <div class="card-row"><span class="label">怎么复用</span><p>${escapeHtml(p.howToReuse || "")}</p></div>
                  <div class="card-row"><span class="label">反例（看着像但不是这招）</span><p>${escapeHtml(p.antiExample || "")}</p></div>
                  <div class="card-row"><span class="label">什么时候这招会坑你 / 代价</span><p>${escapeHtml(p.cost || "")}</p></div>
                  <div class="card-row"><span class="label">在哪几个 skill 里见过</span><p>${escapeHtml(p.seenIn || "")}</p></div>
                  ${relHtml}
                </article>`;
            }).join("")}
          </div>
        </section>
      </article>
    `);
  }

  function applyItPage() {
    const apply = handbook.applyIt || {};
    const checklistHtml = (apply.checklist || []).map((c) => `<li>${escapeHtml(c)}</li>`).join("");
    const authorHtml = (apply.nextSteps?.author || []).map((s) => `<li>${escapeHtml(s)}</li>`).join("");
    const thiefHtml = (apply.nextSteps?.thief || []).map((s) => `<li>${escapeHtml(s)}</li>`).join("");
    layout("Apply It", `
      <article class="page">
        <header class="wt-hero">
          <p class="eyebrow">Apply It · 章 07</p>
          <h1>${escapeHtml(apply.h1 || "拿这个形状写你自己的 skill")}</h1>
          <p class="lede">${escapeHtml(apply.summary || "")}</p>
          <span class="hero-rule"></span>
        </header>
        <section class="section" id="checklist">
          <p class="eyebrow">${escapeHtml(apply.checklistTitle || "起手清单")}</p>
          <h2>${escapeHtml(apply.checklistHeading || "从坏 AI 输出反推到 skill 形状")}</h2>
          <article class="card apply-card">
            <ol class="apply-checklist">${checklistHtml}</ol>
          </article>
        </section>
        <section class="section" id="starter-prompt">
          <p class="eyebrow">起手 prompt</p>
          <h2>copy-paste 直接用</h2>
          <article class="card apply-card">
            <pre class="apply-prompt"><code>${escapeHtml(apply.starterPrompt || "")}</code></pre>
          </article>
        </section>
        <section class="section" id="next-steps">
          <p class="eyebrow">下一步</p>
          <h2>读完之后</h2>
          <div class="card-grid two">
            <article class="card apply-card">
              <h4>如果你是这个 skill 的作者 / 维护者</h4>
              <ol>${authorHtml}</ol>
            </article>
            <article class="card apply-card">
              <h4>如果你想偷招到自己的 skill</h4>
              <ol>${thiefHtml}</ol>
            </article>
          </div>
        </section>
      </article>
    `);
  }

  function indexPage() {
    const overview = handbook.overview || {};
    const chapters = buildChapters();
    layout("目录", `
      <article class="page">
        <header class="wt-hero">
          <p class="eyebrow">Skill 解剖手册 · 多页 HTML</p>
          <h1>${escapeHtml(handbook.meta?.title || "Skill Handbook")}</h1>
          <p class="lede">${escapeHtml(overview.oneLiner || "")}</p>
          <span class="hero-rule"></span>
        </header>
        <section class="section">
          <p class="eyebrow">章节</p>
          <h2>七页拆开看</h2>
          <div class="chapter-grid">
            ${chapters.map((ch, i) => `
              <a class="chapter-card" href="${ch.href}">
                <span class="cc-num">章 ${String(i + 1).padStart(2, "0")}</span>
                <span class="cc-title">${escapeHtml(ch.label)}</span>
                <small>${escapeHtml(ch.sub)}</small>
              </a>
            `).join("")}
          </div>
        </section>
        <section class="section">
          <p class="eyebrow">怎么读这本手册</p>
          <p class="intro-prose">想 10 分钟知道这个 skill 在干嘛——看 <strong>Overview</strong>。想看我怎样被它一步步带着跑——看 <strong>Walkthrough</strong>。想偷招——看 <strong>Patterns</strong> 和 <strong>Apply It</strong>。每章左边 sidebar 会自动展开二级目录。</p>
        </section>
      </article>
    `);
  }

  const renderers = {
    index: indexPage,
    overview: overviewPage,
    walkthrough: walkthroughPage,
    glossary: glossaryPage,
    "file-map": fileMapPage,
    "design-choices": designChoicesPage,
    patterns: patternsPage,
    "apply-it": applyItPage
  };

  const page = document.body.dataset.page || "index";
  (renderers[page] || renderers.index)();
})();
