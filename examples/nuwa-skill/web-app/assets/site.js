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
      { label: "Overview", sub: "概览 · 为什么值得看 · 一个具体例子 · 高层地图", href: `${root}pages/overview.html`, slug: "overview" },
      { label: "Walkthrough", sub: `AI 运行轨迹 · ${counts.stages} 个阶段`, href: `${root}pages/walkthrough.html`, slug: "walkthrough" },
      { label: "Glossary", sub: `概念词典 · ${counts.glossary} 个核心术语`, href: `${root}pages/glossary.html`, slug: "glossary" },
      { label: "File Map", sub: `文件怎么协作 · ${counts.files} 个文件`, href: `${root}pages/file-map.html`, slug: "file-map" },
      { label: "Design Choices", sub: `关键设计选择 · ${counts.choices} 个`, href: `${root}pages/design-choices.html`, slug: "design-choices" },
      { label: "Patterns", sub: `能偷的招 · ${counts.patterns} 张候选 pattern card`, href: `${root}pages/patterns.html`, slug: "patterns" },
      { label: "Apply It", sub: "自己写一个类似 skill", href: `${root}pages/apply-it.html`, slug: "apply-it" }
    ];
  }

  function getSubNav(page) {
    switch (page) {
      case "overview":
        return [
          { anchor: "opening", label: "先看场戏" },
          { anchor: "predict", label: "先猜一遍" },
          { anchor: "primer", label: "女娲长什么样" },
          { anchor: "wow", label: "Wow moment" },
          { anchor: "bad-results", label: "防的坏结果" },
          { anchor: "example", label: "贯穿例子" },
          { anchor: "shape", label: "Why this shape" }
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
          { anchor: "checklist", label: "清单" },
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

  function card(title, rows, options = {}) {
    const body = rows
      .filter(([, value]) => value && (!Array.isArray(value) || value.length))
      .map(([label, value]) => {
        const content = Array.isArray(value) ? list(value) : `<p>${escapeHtml(value)}</p>`;
        return `<div class="card-row"><span class="label">${escapeHtml(label)}</span>${content}</div>`;
      })
      .join("");
    const titleHtml = options.statusPill
      ? `<h3>${escapeHtml(title)}<span class="status-pill">${escapeHtml(options.statusPill)}</span></h3>`
      : `<h3>${escapeHtml(title)}</h3>`;
    const idAttr = options.id ? ` id="${escapeHtml(options.id)}"` : "";
    const extraClass = options.extraClass ? ` ${options.extraClass}` : "";
    return `<article class="card${extraClass}"${idAttr}>${titleHtml}${body}</article>`;
  }

  function renderRich(value = "") {
    return escapeHtml(value)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
  }

  function renderNarrativeBlock(block) {
    if (!block || !block.kind) return "";
    if (block.kind === "para") {
      return `<p>${renderRich(block.text || "")}</p>`;
    }
    if (block.kind === "list") {
      const items = (block.items || []).map((item) => `<li>${renderRich(item)}</li>`).join("");
      return `<ul class="narrative-list">${items}</ul>`;
    }
    if (block.kind === "code") {
      const lang = block.lang ? ` data-lang="${escapeHtml(block.lang)}"` : "";
      return `<pre class="narrative-code"${lang}><code>${escapeHtml(block.text || "")}</code></pre>`;
    }
    if (block.kind === "quote") {
      return `<blockquote class="narrative-quote">${escapeHtml(block.text || "")}</blockquote>`;
    }
    if (block.kind === "diagram") {
      const diag = ((window.handbook && window.handbook.diagrams) || []).find((d) => d.id === block.id);
      if (!diag) return "";
      return diagramBlock(diag);
    }
    return "";
  }

  function diagramBlock(diagram) {
    const image = diagram.image ? `<img class="diagram-image" src="${root}${escapeHtml(diagram.image)}" alt="${escapeHtml(diagram.title)}" />` : "";
    return `
      <article class="diagram-card">
        <div class="diagram-meta">
          <p class="eyebrow">${escapeHtml(diagram.type || "diagram")}</p>
          <h3>${escapeHtml(diagram.title)}</h3>
          <p style="color: var(--text-2); margin: 0; line-height: 1.65; font-size: 14.5px;">${escapeHtml(diagram.description || "")}</p>
        </div>
        ${image}
      </article>
    `;
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
            <span class="num">0${idx + 1}</span>
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

  const renderers = {
    index() {
      const overview = handbook.overview || {};
      const chapters = buildChapters();
      layout("目录", `
        <section class="hero">
          <p class="eyebrow">Skill 解剖手册 · 多页 HTML</p>
          <h1>${escapeHtml(handbook.meta?.title || "Skill Handbook")}</h1>
          <p class="lede">${escapeHtml(overview.oneLiner || "")}</p>
          <div class="callout">
            <strong>怎么读这本手册：</strong>想一句话懂这个 skill，看 Overview 的开头；想看作为 AI 怎么被它带着跑，看 Walkthrough；想偷招，看 Patterns 和 Apply It。每章左边 sidebar 会自动展开二级目录。
          </div>
        </section>
        <section class="section">
          <p class="eyebrow">章节</p>
          <h2>七页拆开看</h2>
          <div class="chapter-grid">
            ${chapters.map((ch, idx) => `
              <a class="chapter-card" href="${ch.href}">
                <span class="step">章 ${String(idx + 1).padStart(2, "0")}</span>
                <span class="title">${escapeHtml(ch.label)}</span>
                <small>${escapeHtml(ch.sub)}</small>
              </a>
            `).join("")}
          </div>
        </section>
        <section class="section">
          <p class="eyebrow">本手册的产生方式</p>
          <h2>这本手册自己也是 skill 的一次输出</h2>
          <p class="intro-prose">
            这份手册按 <strong>references/handbook-spec.md</strong> 的规范产出——它本身就是当前 skill 在 <strong>genre = skill handbook</strong> 路径下应该交付的东西。所以读这份手册时你会注意到：每一节都用一个具体例子贯穿，叙事主语是"我，一个正在使用这个 skill 的 AI"，每个设计选择都明确说"它防什么坏 AI 输出"。如果某段读起来像在装样、引学者名、发明英文术语，那是反装样自检失败——欢迎反馈。
          </p>
        </section>
      `);
    },

    overview() {
      const overview = handbook.overview || {};
      const example = handbook.example || {};
      const compareDiagrams = (handbook.diagrams || []).filter((d) => d.type === "compare");

      const openingHtml = Array.isArray(overview.openingScene) && overview.openingScene.length
        ? `
        <section class="section opening-section" id="opening">
          <p class="eyebrow">先看场戏 · 不带女娲的 AI</p>
          <h2>试一下让 AI 扮演塔勒布</h2>
          <div class="opening-body">
            ${overview.openingScene.map(renderNarrativeBlock).join("")}
          </div>
        </section>`
        : "";

      const predictHtml = overview.predictPrompt
        ? `
        <section class="section predict-section" id="predict">
          <aside class="predict-block">
            <span class="predict-label">先猜一遍 · pre-test</span>
            <p>${escapeHtml(overview.predictPrompt)}</p>
          </aside>
        </section>`
        : "";

      const primerHtml = Array.isArray(overview.primerBeats) && overview.primerBeats.length
        ? `
        <section class="section primer-section" id="primer">
          <p class="eyebrow">Domain primer · 女娲长什么样</p>
          <h2>它把「蒸馏一个人」拆成 5 个阶段</h2>
          <div class="primer-block primer-beats">
            ${overview.primerBeats.map(renderNarrativeBlock).join("")}
          </div>
        </section>`
        : "";

      const wowHtml = (overview.wowSetup || compareDiagrams.length || overview.wowMoment)
        ? `
        <section class="section wow-section" id="wow">
          <p class="eyebrow">Wow moment · 它最让我意外的地方</p>
          <h2>同一个外壳，不同的「先看什么」</h2>
          ${overview.wowSetup ? `<p class="intro-prose">${renderRich(overview.wowSetup)}</p>` : ""}
          ${compareDiagrams.map(diagramBlock).join("")}
          ${overview.wowMoment ? `<p class="intro-prose wow-explanation">${renderRich(overview.wowMoment)}</p>` : ""}
        </section>`
        : "";

      const badResultsHtml = Array.isArray(overview.badResults) && overview.badResults.length
        ? `
        <section class="section bad-results-section" id="bad-results">
          <p class="eyebrow">另外它还防 ${overview.badResults.length} 件具体的事</p>
          <h2>如果不是这套流程，AI 会做坏成什么样</h2>
          <div class="bad-results-grid">
            ${overview.badResults.map((br, i) => `
              <article class="bad-result-card">
                <h3><span class="step-num">防 ${String(i + 1).padStart(2, "0")}</span> ${escapeHtml(br.title || "")}</h3>
                <div class="card-row card-row-default">
                  <span class="label">不用女娲会发生</span>
                  <p>${renderRich(br.aiDefault || "")}</p>
                </div>
                <div class="card-row card-row-nuwa">
                  <span class="label">女娲怎么拦</span>
                  <p>${renderRich(br.nuwaIntercept || "")}</p>
                </div>
              </article>
            `).join("")}
          </div>
        </section>`
        : "";

      const shapeListHtml = Array.isArray(overview.chapterLogic) && overview.chapterLogic.length
        ? `<ul class="chapter-logic-list">${overview.chapterLogic.map((item) => `<li><strong>${escapeHtml(item.chapter)}</strong><span>${escapeHtml(item.why)}</span></li>`).join("")}</ul>`
        : "";

      layout("Overview", `
        <section class="hero">
          <p class="eyebrow">Overview · 章 01</p>
          <h1>看见女娲在做什么</h1>
          <p class="lede">${renderRich(overview.oneLiner || "")}</p>
        </section>
        ${openingHtml}
        ${predictHtml}
        ${primerHtml}
        ${wowHtml}
        ${badResultsHtml}
        <section class="section" id="example">
          <p class="eyebrow">一个具体例子 · 贯穿全本</p>
          <h2>塔勒布作为这本手册的唯一例子</h2>
          <div class="card-grid single">
            ${card("用户输入", [
              ["用户请求", example.userRequest],
              ["为什么挑这个例子", example.whyThisExample]
            ])}
            ${card("预期产出形态", [
              ["最终交付", example.expectedOutput]
            ])}
          </div>
          <div class="callout">
            <strong>这个例子会贯穿整本手册。</strong>后面 Walkthrough 的每一阶段都用它落地——中途不换题。换题是这类手册最常见的失败模式：例子一换，读者刚建立起来的心智模型就被打散。
          </div>
        </section>
        <section class="section shape-section" id="shape">
          <p class="eyebrow">Why this shape · 为什么这 7 章这么排</p>
          <h2>按读者意图排，不按源文件顺序</h2>
          ${overview.shapeReason ? `<p class="intro-prose">${renderRich(overview.shapeReason)}</p>` : ""}
          ${shapeListHtml}
        </section>
      `);
    },

    walkthrough() {
      /* 编辑杂志体 · v2 (2026-05)
       * 视觉规范见 references/web-app-visuals.md
       * CSS 在 styles.css 末尾 body[data-page="walkthrough"] scope 内
       * 这一页不走 layout()——不要 sidebar，全宽报章排版。
       */
      const stages = handbook.walkthrough || [];
      const oneLiner = handbook.overview?.oneLiner || "";

      function pad2(n) { return String(n).padStart(2, "0"); }

      function renderEditorialBlock(block) {
        if (!block || !block.kind) return "";
        if (block.kind === "para") {
          return `<p>${renderRich(block.text || "")}</p>`;
        }
        if (block.kind === "list") {
          const items = (block.items || [])
            .map((item) => `<li>${renderRich(item)}</li>`)
            .join("");
          return `<ul>${items}</ul>`;
        }
        if (block.kind === "code") {
          const lang = block.lang || "text";
          return `
            <figure class="code-block">
              <div class="code-chrome">
                <span class="code-dots"><span></span><span></span><span></span></span>
                <span class="code-lang">${escapeHtml(lang)}</span>
              </div>
              <pre><code>${escapeHtml(block.text || "")}</code></pre>
            </figure>`;
        }
        if (block.kind === "quote") {
          return `<blockquote class="narrative-quote">${escapeHtml(block.text || "")}</blockquote>`;
        }
        /* diagram: 编辑杂志体跳过图，保持阅读节奏 */
        return "";
      }

      function renderQuickref(stage) {
        const rows = [
          ["这一步收到什么", stage.receives],
          ["skill 让我读什么", stage.reads],
          ["我不能直接做什么", stage.blockedShortcut],
          ["我做什么", stage.action],
          ["我产出什么", stage.output],
          ["下一步谁用它", stage.nextConsumer]
        ].filter(([, v]) => v && (!Array.isArray(v) || v.length));
        if (!rows.length) return "";
        const body = rows
          .map(([label, value]) => {
            const content = Array.isArray(value)
              ? `<ul>${value.map((v) => `<li>${escapeHtml(v)}</li>`).join("")}</ul>`
              : `<p>${escapeHtml(value)}</p>`;
            return `
              <div class="quickref-row">
                <span class="qr-label">${escapeHtml(label)}</span>
                <div class="qr-body">${content}</div>
              </div>`;
          })
          .join("");
        return `
          <details class="quickref">
            <summary>七字段速查 · Stage metadata</summary>
            <div class="quickref-grid">${body}</div>
          </details>`;
      }

      function renderChallenges(stage) {
        if (!Array.isArray(stage.challenges) || !stage.challenges.length) return "";
        const items = stage.challenges
          .map((c) => `<li>${escapeHtml(c)}</li>`)
          .join("");
        return `
          <section class="challenges">
            <span class="challenges-rule"></span>
            <header class="challenges-head">
              <h3 class="challenges-title">你的练习</h3>
              <p class="challenges-sub">不是 AI 的内心独白——是给读这本手册的你的题。先想再读下一阶段。</p>
            </header>
            <ol class="challenges-list">${items}</ol>
          </section>`;
      }

      function renderEditorialStage(stage, i) {
        const num = pad2(i + 1);
        const id = escapeHtml(stage.id || `stage-${i + 1}`);
        const pretest = stage.preTest
          ? `<aside class="pretest">
              <span class="pretest-label">先猜一遍 · pre-test</span>
              <p class="pretest-body">${escapeHtml(stage.preTest)}</p>
            </aside>`
          : "";
        const narrative = Array.isArray(stage.narrativeBody)
          ? stage.narrativeBody.map(renderEditorialBlock).join("")
          : "";
        const move = stage.reusableMove
          ? `<aside class="move">
              <div class="move-label">这里能偷的招</div>
              <p class="move-body">${escapeHtml(stage.reusableMove)}</p>
            </aside>`
          : "";
        return `
          <article class="stage" id="${id}">
            <header class="stage-head">
              <p class="stage-num">${num}</p>
              <div class="stage-headline">
                <p class="stage-kicker">阶段 ${num}</p>
                <h2 class="stage-title">${escapeHtml(stage.title || "")}</h2>
                ${stage.summary ? `<p class="stage-summary">${escapeHtml(stage.summary)}</p>` : ""}
              </div>
              <div></div>
            </header>
            <div class="stage-body">
              ${pretest}
              <div class="narrative">${narrative}</div>
              ${move}
              ${renderQuickref(stage)}
              ${renderChallenges(stage)}
            </div>
          </article>`;
      }

      function renderEditorialIndex() {
        const items = stages
          .map((s, i) => {
            const num = pad2(i + 1);
            const id = escapeHtml(s.id || `stage-${i + 1}`);
            const title = escapeHtml(s.title || "").split(/[，——]/)[0];
            return `
              <a class="index-item" href="#${id}">
                <span class="num">${num}</span>
                <span class="label">${title}</span>
              </a>`;
          })
          .join("");
        return `
          <section class="index-bar" aria-label="Stage index">
            <p class="index-label">全 ${stages.length} 个阶段 · 点击跳转</p>
            <div class="index-grid">${items}</div>
          </section>`;
      }

      const brandTitle = handbook.meta?.title || "Skill Handbook";
      document.title = `Walkthrough · ${brandTitle}`;
      document.querySelector("#app").innerHTML = `
        <main class="page">
          <header class="masthead">
            <div class="masthead-left">
              <a class="masthead-mark" href="${root}index.html">${escapeHtml(brandTitle)}</a>
              <span class="masthead-section">章 02 / Walkthrough</span>
            </div>
            <span class="masthead-meta">编辑杂志体 · v2</span>
          </header>

          <section class="hero">
            <p class="hero-eyebrow">Walkthrough · 章 02</p>
            <h1 class="hero-title">AI 运行<br/>轨迹</h1>
            <p class="hero-subtitle">${stages.length} 个 stage 看 AI 被一步步拦下来的完整路径。</p>
            <p class="hero-lede">${renderRich(oneLiner)}</p>
            <p class="hero-lede">这是本手册的脊柱。下面每一阶段都用同一个例子落地，每个 stage 卡同时回答 7 件事：<strong>这一步收到什么 / skill 让我读什么 / 我不能直接做什么 / 我做什么 / 我产出什么 / 下一步谁用它 / 这里能偷的招</strong>。</p>
            <div class="hero-rule"></div>
          </section>

          ${renderEditorialIndex()}

          <section>
            ${stages.map(renderEditorialStage).join("")}
          </section>

          <p class="end-mark">❖ ❖ ❖</p>
          <p class="end-note">章 02 / Walkthrough — 完</p>
        </main>
      `;
    },

    glossary() {
      layout("Glossary", `
        <section class="hero">
          <p class="eyebrow">Glossary · 章 03</p>
          <h1>概念词典</h1>
          <p class="lede">${(handbook.glossary || []).length} 个核心术语，每条 5 个字段——人话解释 / 它出现在哪个场景 / 它解决什么问题 / 我作为 AI 怎么用它 / 容易误解。先把概念吃透，后面 Walkthrough / Design Choices / Patterns 才不会卡。</p>
          <div class="callout">
            <strong>这一章不是参考字典——是阅读其它章节的前置。</strong>每个术语在第一次进入 Walkthrough / File Map / Patterns 之前都应该在这里讲清楚，避免读者读到才回查。
          </div>
        </section>
        <section class="section">
          <div class="card-grid">
            ${(handbook.glossary || []).map((term) => card(term.term, [
              ["人话解释", term.plainMeaning],
              ["它出现在哪个场景", term.whereItAppears],
              ["它解决什么问题", term.solvedProblem],
              ["我作为 AI 怎么用它", term.howToUse],
              ["容易误解", term.commonMisread]
            ], { id: slugify(term.term), extraClass: "glossary-card" })).join("")}
          </div>
        </section>
      `);
    },

    "file-map"() {
      layout("File Map", `
        <section class="hero">
          <p class="eyebrow">File Map · 章 04</p>
          <h1>文件怎么协作</h1>
          <p class="lede">SKILL.md 是入口和路由；其它文件按职责协作。下面先看包结构图，再看每份文件的责任卡——谁生成它、谁读它、它管什么、不管什么、写错会怎样。</p>
        </section>
        <section class="section">
          <p class="eyebrow">包结构图</p>
          <h2>这个 skill 怎么把文件拆开</h2>
          ${(handbook.diagrams || []).filter((d) => d.type === "file-map").map(diagramBlock).join("")}
        </section>
        <section class="section">
          <p class="eyebrow">真相源关系（如果存在）</p>
          ${(handbook.diagrams || []).filter((d) => d.type === "source-of-truth").map(diagramBlock).join("")}
        </section>
        <section class="section">
          <p class="eyebrow">文件责任卡</p>
          <h2>每个文件管什么、不管什么</h2>
          <div class="card-grid">
            ${(handbook.fileMap || []).map((file) => card(file.path, [
              ["它的角色", file.role],
              ["谁生成它", file.generatedBy],
              ["谁读取它", file.readBy],
              ["它管什么", file.owns],
              ["它不管什么", file.doesNotOwn],
              ["如果它写错会怎样", file.failureIfWrong]
            ], { id: slugify(file.path) })).join("")}
          </div>
        </section>
      `);
    },

    "design-choices"() {
      const patternsList = (handbook.patterns || []).map((pattern, idx) => ({
        idx: idx + 1,
        name: pattern.name,
        prevents: pattern.prevents
      }));
      function designChoiceCard(choice, idx) {
        const rows = [
          ["看起来多此一举的地方", choice.looksUnnecessaryBecause],
          ["坏场景（不这样会怎样）", choice.badScenario],
          ["skill 怎么约束我", choice.constraint],
          ["解决的问题", choice.solvedProblem],
          ["可偷的招", choice.reusableMove]
        ];
        const rowsHtml = rows
          .filter(([, v]) => v)
          .map(([label, v]) => `<div class="card-row"><span class="label">${escapeHtml(label)}</span><p>${escapeHtml(v)}</p></div>`)
          .join("");
        const counterHtml = Array.isArray(choice.counterScenarios) && choice.counterScenarios.length
          ? `<section class="counter-scenarios">
              <div class="counter-scenarios-header">
                <span class="counter-scenarios-label">不同场景下这个选择的力度</span>
                <span class="counter-scenarios-sub">同一招在不同场景里救你 / 绑你 / 取决于——单视角的设计建议是不够的</span>
              </div>
              <div class="counter-scenarios-grid">
                ${choice.counterScenarios.map((s) => `
                  <div class="counter-scenario" data-effect="${escapeHtml(s.effect || "")}">
                    <span class="counter-scenario-effect">${escapeHtml(s.effect || "")}</span>
                    <p class="counter-scenario-when"><strong>场景：</strong>${escapeHtml(s.when || "")}</p>
                    <p class="counter-scenario-why">${escapeHtml(s.why || "")}</p>
                  </div>`).join("")}
              </div>
            </section>`
          : "";
        return `<article class="card design-choice-card" id="dc${idx + 1}"><h3>${escapeHtml(choice.title)}</h3>${rowsHtml}${counterHtml}</article>`;
      }
      layout("Design Choices", `
        <section class="hero">
          <p class="eyebrow">Design Choices · 章 05</p>
          <h1>${(handbook.designChoices || []).length} 个关键设计选择</h1>
          <p class="lede">这一章不列规则清单，列真正改变了 AI 默认行为的设计选择。每个选择回答 5 件事：看起来为什么多此一举 / 不这样会坏在哪 / skill 怎么约束我 / 解决了什么问题 / 能偷的招。每条还附带"在 3 个不同场景下力度对比"——同一招不可能在所有场景都对，多视角才不会被单视角误导。</p>
        </section>
        ${(handbook.diagrams || []).filter((d) => d.type === "decision-tree").map(diagramBlock).join("")}
        <section class="section">
          <p class="eyebrow">设计选择卡</p>
          <h2>每个选择都明确名出它防的坏场景</h2>
          <div class="card-grid">
            ${(handbook.designChoices || []).map(designChoiceCard).join("")}
          </div>
          <div class="pattern-index">
            <span class="pattern-index-label">想看每个设计选择对应的 pattern card？</span>
            <ul>
              ${patternsList.map((p) => `<li><a href="${root}pages/patterns.html#p${p.idx}"><span class="px-num">P${p.idx}</span>${escapeHtml(p.name)}<small>${escapeHtml(p.prevents.slice(0, 50))}…</small></a></li>`).join("")}
            </ul>
          </div>
        </section>
      `);
    },

    patterns() {
      function patternCard(pattern, idx) {
        const titleHtml = `<h3>${escapeHtml(pattern.name)}<span class="status-pill">${escapeHtml(pattern.status || "")}</span></h3>`;
        const preventsHtml = pattern.prevents
          ? `<div class="card-row pattern-problem"><span class="label">它防什么坏结果 · Problem</span><p>${escapeHtml(pattern.prevents)}</p></div>`
          : "";
        const thereforeHtml = pattern.therefore
          ? `<div class="pattern-therefore">
              <span class="pattern-therefore-divider">❖ &nbsp; ❖ &nbsp; ❖</span>
              <div class="pattern-therefore-body">
                <span class="pattern-therefore-label">Therefore</span>
                <p>${escapeHtml(pattern.therefore)}</p>
              </div>
              <span class="pattern-therefore-divider">❖ &nbsp; ❖ &nbsp; ❖</span>
            </div>`
          : "";
        const restRows = [
          ["什么时候用 / 为什么不能简单做", pattern.useWhen],
          ["怎么复用（详细）", pattern.howToReuse],
          ["反例（看着像但不是这招）", pattern.antiExample],
          ["什么时候这招会坑你 / 代价", pattern.cost],
          ["在哪几个 skill 里见过", pattern.seenIn],
          ...(pattern.isPlatformGap ? [["这是设计选择还是平台该补", pattern.isPlatformGap]] : [])
        ];
        const restHtml = restRows
          .filter(([, v]) => v && (!Array.isArray(v) || v.length))
          .map(([label, v]) => {
            const content = Array.isArray(v) ? `<ul>${v.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : `<p>${escapeHtml(v)}</p>`;
            return `<div class="card-row"><span class="label">${escapeHtml(label)}</span>${content}</div>`;
          })
          .join("");
        const relatedHtml = Array.isArray(pattern.relatedPatterns) && pattern.relatedPatterns.length
          ? `<section class="related-patterns">
              <span class="related-patterns-label">和哪些 pattern 一起读</span>
              <ul>
                ${pattern.relatedPatterns.map((rp) => `<li><a href="#${escapeHtml((rp.to || "").toLowerCase())}"><span class="rp-num">${escapeHtml(rp.to || "")}</span><span class="rp-body"><span class="rp-name">${escapeHtml(rp.label || "")}</span><span class="rp-rel">${escapeHtml(rp.relation || "")}</span></span></a></li>`).join("")}
              </ul>
            </section>`
          : "";
        return `<article class="card pattern-card" id="p${idx + 1}">${titleHtml}${preventsHtml}${thereforeHtml}${restHtml}${relatedHtml}</article>`;
      }
      layout("Patterns", `
        <section class="hero">
          <p class="eyebrow">Patterns · 章 06</p>
          <h1>${(handbook.patterns || []).length} 张候选 pattern card</h1>
          <p class="lede">这些是从这个 skill 抽出来、可以搬到别的 skill 里的招。每张默认状态'候选'——只在这一个 skill 里见过；要 2+ 个不相关 skill 都见过才能升'已确认'。每张必带反例（看着像但不是这招的具体动作），否则边界还糊。每张卡 problem → Therefore → solution 之间有视觉断点，让你停一秒想"我会怎么解"再看作者的解。</p>
          <div class="callout">
            <strong>怎么读这一章：</strong>先看每张卡的"它防什么坏结果"决定值不值得继续读 → 在 Therefore 处停一秒自己想 → 看"反例"理解边界 → 看"什么时候坑你 + 代价"决定要不要抄。卡片之间用"和哪些 pattern 一起读"互相链接，不是孤岛。
          </div>
        </section>
        <section class="section">
          <div class="card-grid">
            ${(handbook.patterns || []).map(patternCard).join("")}
          </div>
        </section>
      `);
    },

    "apply-it"() {
      const applyIt = handbook.applyIt || {};
      const nextSteps = applyIt.nextSteps || {};
      const nextStepsHtml = (nextSteps.author && nextSteps.author.length) || (nextSteps.thief && nextSteps.thief.length)
        ? `
        <section class="section" id="next-steps">
          <p class="eyebrow">下一步</p>
          <h2>读完这本手册之后</h2>
          <div class="card-grid">
            ${nextSteps.author && nextSteps.author.length ? card("如果你是这个 skill 的作者 / 维护者", [["接下来做这几件事", nextSteps.author]]) : ""}
            ${nextSteps.thief && nextSteps.thief.length ? card("如果你想偷招到自己的 skill", [["接下来做这几件事", nextSteps.thief]]) : ""}
          </div>
        </section>`
        : "";
      layout("Apply It", `
        <section class="hero">
          <p class="eyebrow">Apply It · 章 07</p>
          <h1>拿这个形状写你自己的 skill</h1>
          <p class="lede">${escapeHtml(applyIt.summary || "")}</p>
        </section>
        <section class="section" id="checklist">
          <p class="eyebrow">${escapeHtml(applyIt.checklistTitle || "清单")}</p>
          <h2>${escapeHtml(applyIt.checklistHeading || "从坏 AI 输出反推到 skill 形状")}</h2>
          <div class="card-grid single">
            ${card(applyIt.checklistCardTitle || "把这几件事先写下来再写代码", [
              ["清单", applyIt.checklist || []]
            ])}
          </div>
        </section>
        <section class="section" id="starter-prompt">
          <p class="eyebrow">起手 prompt</p>
          <h2>copy-paste 直接用</h2>
          <div class="card-grid single">
            ${card("起手 prompt", [
              ["拷给 AI 让它先做设计层决定", applyIt.starterPrompt]
            ])}
          </div>
        </section>
        ${nextStepsHtml}
      `);
    }
  };

  const page = document.body.dataset.page || "index";
  (renderers[page] || renderers.index)();
})();
