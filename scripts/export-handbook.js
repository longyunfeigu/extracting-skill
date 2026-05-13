#!/usr/bin/env node
// 把 web-app/assets/data.js 线性化导出为单文件 handbook.md
// handbook.md 是 export，不是真相源——真相源是 handbook-brief.md + page-packets/*.packet.md

global.window = {};
require('../web-app/assets/data.js');
const h = window.handbook;
const fs = require('fs');

const out = [];
const p = (s = '') => out.push(s);

const renderBlock = (b) => {
  if (!b) return '';
  if (b.kind === 'para') return b.text + '\n';
  if (b.kind === 'list') return b.items.map(it => `- ${it}`).join('\n') + '\n';
  if (b.kind === 'diagram') return `![${b.id}](web-app/assets/diagrams/${b.id}.svg)\n`;
  if (b.kind === 'quote') return `> ${b.text}\n`;
  return '';
};

// ─── Hero / TOC ───
p(`# ${h.meta.title}`);
p('');
p(`> ${h.meta.generatedFor}`);
p('');
p(`**Source skill**: \`${h.meta.sourcePath}\`  `);
p(`**Live-run trace 落地**: \`${h.meta.tracePath}\`  `);
p(`**Trace 类型**: ${h.meta.traceType}  `);
p(`**Version**: ${h.meta.version}`);
p('');
p('> 这是从 `web-app/assets/data.js` 线性化导出的版本。真相源是 `handbook-brief.md` + `page-packets/*.packet.md`；web app 是渲染层，本 markdown 是离线 export。');
p('');
p('## 章节地图');
p('');
h.overview.chapterLogic.forEach(c => p(`- **${c.chapter}** — ${c.why}`));
p('');

// ─── 01 Overview ───
p('---');
p('');
p(`## 01 Overview · ${h.overview.h1}`);
p('');
p(h.overview.oneLiner);
p('');
p('### 1.1 Opening scene · 先看 AI 默认怎么坏');
p('');
h.overview.openingScene.forEach(b => p(renderBlock(b)));
p('### 1.2 Predict prompt');
p('');
p(`> ${h.overview.predictPrompt}`);
p('');
p('### 1.3 Domain primer · 女娲做什么');
p('');
h.overview.primerBeats.forEach(b => p(renderBlock(b)));
p('### 1.4 Wow moment · 同一事实题，不同人物先查的东西不同');
p('');
p(h.overview.wowSetup);
p('');
p(`![${h.overview.wowDiagramId}](web-app/assets/diagrams/${h.overview.wowDiagramId}.svg)`);
p('');
p(h.overview.wowMoment);
p('');
p('### 1.5 防的坏结果 · before/after 卡');
p('');
h.overview.badResults.forEach((c, i) => {
  p(`#### 坏结果 ${i + 1} · ${c.title}`);
  p('');
  p(`**AI default** — ${c.aiDefault}`);
  p('');
  p(`**Skill intervention** — ${c.skillIntervention}`);
  p('');
});
p('### 1.6 Running example · 塔勒布贯穿例子');
p('');
p(`**用户请求**：${h.example.userRequest}`);
p('');
p(`**为什么这个例子**：${h.example.whyThisExample}`);
p('');
p(`**期望产出**：${h.example.expectedOutput}`);
p('');

// ─── 02 Walkthrough ───
p('---');
p('');
p('## 02 Walkthrough · 我作为使用女娲的 AI 走完 9 个 Phase');
p('');
h.walkthrough.forEach((s, i) => {
  p(`### ${String(i + 1).padStart(2, '0')} · ${s.title}  *(id: \`${s.id}\`)*`);
  p('');
  if (s.pretest) {
    p(`> **预测一下**：${s.pretest}`);
    p('');
  }
  if (Array.isArray(s.narrativeBody)) {
    s.narrativeBody.forEach(b => p(renderBlock(b)));
  }
  p('**七字段速查**');
  p('');
  p(`- **我收到什么**：${s.whatIGet}`);
  p(`- **我被要求读什么**：${s.mustRead}`);
  p(`- **我不能直接做什么**：${s.cantShortcut}`);
  p(`- **我产出什么**：${s.mineProduce}`);
  p(`- **下一步谁用它**：${s.whoUsesNext}`);
  p(`- **可复用招数**：${s.reusableMove}`);
  if (s.challenge) p(`- **挑战题**：${s.challenge}`);
  p(`- **承接下一站**：${s.handoff}`);
  p('');
});

// ─── 03 Glossary ───
p('---');
p('');
p('## 03 Glossary · 术语本地解释');
p('');
h.glossary.forEach((g) => {
  p(`### ${g.term}  *(id: \`${g.id}\`)*`);
  p('');
  p(`**定义**：${g.definition}`);
  p('');
  p(`**例子（塔勒布 trace 实材）**：${g.example}`);
  p('');
  p(`**和什么不一样**：${g.notTheSameAs}`);
  p('');
  p(`**为什么重要**：${g.whyItMatters}`);
  p('');
});

// ─── 04 File Map ───
p('---');
p('');
p('## 04 File Map · 女娲源 skill 6 个文件的职责');
p('');
p('![package-map](web-app/assets/diagrams/package-map.svg)');
p('');
h.fileMap.forEach((f) => {
  p(`### \`${f.path}\``);
  p('');
  p(`**角色**：${f.role}`);
  p('');
  p(`**谁生成它**：${f.generatedBy}`);
  p('');
  p(`**谁读取它**：${f.readBy}`);
  p('');
  p(`**它管什么**：${f.itManages}`);
  p('');
  p(`**它不管什么**：${f.itDoesntManage}`);
  p('');
  p(`**写错会怎样**：${f.ifWrong}`);
  p('');
});

// ─── 05 Design Choices ───
p('---');
p('');
p('## 05 Design Choices · 8 个关键设计选择');
p('');
h.designChoices.forEach((c, i) => {
  p(`### ${String(i + 1).padStart(2, '0')} · ${c.title}  *(id: \`${c.id}\`)*`);
  p('');
  p(`**设计选择**：${c.theChoice}`);
  p('');
  p(`**它防的坏结果**：${c.badScenario}`);
  p('');
  if (c.threeScenarios) {
    p('**三场景对比**：');
    p('');
    p(`- *Where it pays off* — ${c.threeScenarios.wherePaysOff}`);
    p(`- *Where too much* — ${c.threeScenarios.whereTooMuch}`);
    p(`- *Where it depends* — ${c.threeScenarios.whereItDepends}`);
    p('');
  }
  p(`**Trade-off**：${c.tradeoff}`);
  p('');
  p(`**Trace 证据**：${c.evidenceFromTrace}`);
  p('');
});

// ─── 06 Patterns ───
p('---');
p('');
p('## 06 Patterns · 12 个能偷的招数');
p('');
p('![pattern-network](web-app/assets/diagrams/pattern-network.svg)');
p('');
h.patterns.forEach((pt) => {
  p(`### ${pt.title}  *(id: \`${pt.id}\`)*`);
  p('');
  p(`**问题**：${pt.problem}`);
  p('');
  p(`**因此怎么做**：${pt.therefore}`);
  p('');
  p(`**何时复用**：${pt.reuseWhen}`);
  p('');
  p(`**代价**：${pt.cost}`);
  p('');
  p(`**不这么做会怎样**：${pt.bad}`);
  p('');
  p(`**Trace 中的 good sign**：${pt.goodSign}`);
  p('');
  if (Array.isArray(pt.relatedPatterns) && pt.relatedPatterns.length) {
    p('**相关 patterns**：');
    pt.relatedPatterns.forEach(r => p(`- \`${r.id}\` — ${r.relation}`));
    p('');
  }
});

// ─── 07 Apply It ───
p('---');
p('');
p('## 07 Apply It · 起手清单 + 压力测试 + 自查题');
p('');
p(h.applyIt.intro);
p('');
p('### 7.1 起手清单（按 Phase 排）');
p('');
h.applyIt.starterChecklist.forEach((it, i) => {
  p(`${i + 1}. **Phase ${it.phase} · ${it.action}**`);
  p(`   - *为什么*：${it.why}`);
  p(`   - *小心*：${it.watchOut}`);
});
p('');
p('### 7.2 五个压力测试场景');
p('');
h.applyIt.pressureTests.forEach((t, i) => {
  p(`#### 压力测试 ${i + 1} · ${t.scenario}`);
  p('');
  p(`**哪里挑战了 skill**：${t.whatStressesTheSkill}`);
  p('');
  p(`**怎么准备**：${t.howToPrepare}`);
  p('');
});
p('### 7.3 什么时候不该用女娲');
p('');
h.applyIt.whenNotToUseNuwa.forEach(w => p(`- ${w}`));
p('');
p('### 7.4 最终自查 5 题');
p('');
h.applyIt.finalSelfTest.forEach((q, i) => p(`${i + 1}. ${q}`));
p('');

// ─── footer ───
p('---');
p('');
p('## 附录 · X-Ray + TRACE 引用');
p('');
p('- `xray.md` —— 10 节 Skill X-Ray（What changed / Real task / Recommended path / Auto Decision Log + Checkpoint Map / Trace / Baseline diff / Intervention Map / Evidence table / Friction score / Upgrade options）');
p('- `handbook-brief.md` —— 真相源（X-Ray summary + Stage/Term/Choice/Pattern IDs + Diagrams plan + Pages list）');
p(`- \`${h.meta.tracePath}TRACE.md\` —— live-run 全记录，含 Auto Decision Log 10 条 + Checkpoint Map 3 条 + Phase 0-5 实际执行 + 1 次 prompt injection 安全事件`);
p(`- \`${h.meta.tracePath}SKILL.md\` —— 实际产出的塔勒布 perspective skill（457 行，quality_check 6/6 PASS）`);
p(`- \`${h.meta.tracePath}references/research/\` —— 6 份调研（1501 行，174 来源，76% 一手）+ extraction-notes.md`);
p('- `page-packets/*.packet.md` —— 7 页 packet（每页 job / voice / must-include / self-check）');
p('');

fs.writeFileSync('handbook.md', out.join('\n'));
console.log('handbook.md exported.');
console.log('Lines:', out.join('\n').split('\n').length);
