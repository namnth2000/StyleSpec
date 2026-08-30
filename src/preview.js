function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const button = (label, secondary = false) => `<button class="demo-button ${secondary ? "demo-button-secondary" : "demo-button-primary"}" type="button">${label}</button>`;
const imageBlock = (className = "") => `<div class="page-image ${className}" aria-hidden="true"><span></span><i></i></div>`;

const pageRenderers = {
  northstar: () => `
    <nav class="page-topbar"><strong>Northstar</strong><span>Today&nbsp;&nbsp; Projects&nbsp;&nbsp; Notes</span><i>NS</i></nav>
    <main class="northstar-main">
      <section class="northstar-hero"><small>Weekly focus</small><h3>Ship the work that matters.</h3><p>Keep a small list of meaningful priorities and make progress visible.</p><div class="page-actions">${button("Create project")}${button("View roadmap", true)}</div></section>
      <section class="northstar-board"><article><b>68%</b><span>Weekly progress</span></article><article><span>Today</span><b>Three clear priorities</b><i></i><i></i><i></i></article><article><span>Next review</span><b>Friday, 14:00</b></article></section>
    </main>`,
  workspace: () => `
    <div class="workspace-page">
      <aside><strong>W</strong><span class="is-active">Inbox</span><span>Projects</span><span>Notes</span><span>Archive</span><small>Settings</small></aside>
      <main><header><div><small>Workspace / Product</small><b>Launch checklist</b></div><div class="workspace-actions"><span class="workspace-presence" aria-label="3 collaborators"><i>AM</i><i>KL</i><i>+1</i></span>${button("New task")}</div></header><div class="workspace-columns"><section><small>TO DO · 3</small><article><b>Finalize launch copy</b><span>Today</span></article><article><b>Review mobile flow</b><span>Design</span></article></section><section><small>IN PROGRESS · 2</small><article><b>Connect analytics</b><span>Engineering</span></article><article><b>Prepare release notes</b><span>Writing</span></article></section><section><small>DONE · 4</small><article><b>QA account setup</b><span>Yesterday</span></article></section></div></main>
    </div>`,
  "editorial-tool": () => `
    <nav class="editorial-nav"><strong>Ratio</strong><span>About&nbsp;&nbsp; Method</span></nav>
    <main class="editorial-tool-page"><section><small>AN EVERYDAY CALCULATOR</small><h3>Find the proportion that feels inevitable.</h3><p>Enter one known dimension. The canvas keeps the relationship visible.</p><a href="#preview-root">Read the method ↗</a></section><section class="ratio-tool"><header><span>Canvas</span><b>4 : 5</b></header><div class="ratio-stage"><i></i></div><footer><label>Width <b>1200</b></label><span>×</span><label>Height <b>1500</b></label></footer></section></main>`,
  "product-first": () => `
    <nav class="page-topbar"><strong>Relay</strong><span>Product&nbsp;&nbsp; Customers&nbsp;&nbsp; Pricing</span>${button("Start")}</nav>
    <main class="product-first-page"><section class="product-window"><header><i></i><i></i><i></i><span>relay / overview</span></header><div><aside><b>R</b><i></i><i></i><i></i></aside><main><span>Revenue</span><b>$84,290</b><small class="metric-trend">+18.4% this month</small><div class="chart-bars"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="chart-axis"><span>Apr 01</span><span>Apr 30</span></div></main></div></section><section class="product-copy"><small>One calm operating view</small><h3>See the product before the promise.</h3><p>Relay brings the signals your team needs into one focused workspace.</p><div class="page-actions">${button("Explore Relay")}${button("See customers", true)}</div></section></main>`,
  "technical-console": () => `
    <div class="console-page"><aside><strong>orbit.dev</strong><small>GET STARTED</small><span class="is-active">Overview</span><span>Installation</span><span>Authentication</span><small>SDK</small><span>JavaScript</span><span>Python</span></aside><main><header><span class="console-version"><b></b>v2.4 stable</span><i>Search docs /</i></header><article><small>QUICKSTART</small><h3>Ship an event in sixty seconds.</h3><p>A small client with predictable delivery and typed payloads.</p><div class="page-actions">${button("Install SDK")}${button("Read docs", true)}</div><pre><b>$</b> npm install @orbit/events</pre><div class="console-code"><em>import</em> { orbit } <em>from</em> <q>'@orbit/events'</q>;<br><br>orbit.track(<q>'project.created'</q>);</div></article></main></div>`,
  "narrative-launch": () => `
    <main class="launch-page"><nav class="launch-nav"><strong>AURA</strong><span>Story&nbsp;&nbsp; Sound&nbsp;&nbsp; Enter</span></nav><div class="launch-orbit" aria-hidden="true"><i></i><i></i><i></i></div><span class="launch-brand">AURA / 02</span><section><small>A NEW WAY TO MOVE THROUGH SOUND</small><h3>Listen past the edge.</h3><p>Spatial audio that shifts with the story, not the screen.</p><div class="page-actions">${button("Enter the experience")}${button("Hear a preview", true)}</div></section><footer><span>01 &nbsp; Arrival</span><i></i><span>Scroll to reveal</span></footer></main>`,
  "project-index": () => `
    <main class="project-index-page"><header><strong>MINA PARK / SELECTED WORK</strong><span>Info&nbsp;&nbsp; Mail</span></header><p>Independent designer working across identity, interfaces, and useful systems.</p><section><article><small>01</small><b>Field Notes</b><span>Editorial system</span><em>2026 ↗</em></article><article><small>02</small><b>Common Ground</b><span>Digital product</span><em>2025 ↗</em></article><article><small>03</small><b>Afterlight</b><span>Identity</span><em>2025 ↗</em></article><article><small>04</small><b>Signal House</b><span>Website</span><em>2024 ↗</em></article></section></main>`,
  "case-study-grid": () => `
    <main class="case-grid-page"><header><strong>Studio Onda</strong><span>Selected projects, 2023-26</span><i>About +</i></header><section><article class="case-a">${imageBlock("portfolio-image image-coral")}<b>Casa Forma</b><span>Identity / Hospitality</span></article><article class="case-b">${imageBlock("portfolio-image image-blue")}<b>Current</b><span>Product / Direction</span></article><article class="case-c">${imageBlock("portfolio-image image-gold")}<b>Archive No. 4</b><span>Campaign</span></article></section></main>`,
  "personal-editorial": () => `
    <main class="personal-editorial-page"><header><span>ISSUE 08 / AUGUST 2026</span><strong>Notes by Ana</strong><span>Archive&nbsp;&nbsp; About</span></header><section class="editorial-opening"><aside><small>PROFILE</small><p>Writer, strategist, and observer of how small systems shape everyday life.</p></aside><article><small>LETTER FROM THE DESK</small><h3>I write about the quiet decisions behind useful things.</h3><p>Design is rarely one big idea. More often it is a sequence of careful choices, made visible through use.</p><a href="#preview-root">Continue reading →</a></article></section><footer><span>Recent notes</span><b>On tools that respect attention</b><b>The shape of a useful archive</b></footer></main>`,
  "editorial-invitation": () => `
    <main class="invitation-page"><div class="botanical botanical-left">⌇</div><div class="botanical botanical-right">⌇</div><small>TOGETHER WITH THEIR FAMILIES</small><h3>Elena <i>&</i> James</h3><p>invite you to celebrate their marriage</p><div class="invitation-date"><span>Saturday</span><b>18 · 10 · 2026</b><span>Four o'clock</span></div><p>The Glasshouse, Da Lat</p><div class="page-actions"><a href="#preview-root">Kindly respond</a></div></main>`,
  "paper-collage": () => `
    <main class="collage-page"><div class="paper-note"><small>WE ARE GETTING MARRIED</small><h3>Linh + Minh</h3><p>November 22, 2026 · Hoi An</p></div><div class="paper-photo photo-one">${imageBlock("wedding-image image-rose")}<span>the coast, 2025</span></div><div class="paper-photo photo-two">${imageBlock("wedding-image image-green")}</div><div class="paper-ticket"><small>SAVE THE DATE</small><b>22 / 11</b><span>Dinner under the lanterns</span></div><i class="pressed-leaf">❧</i></main>`,
  "photo-journal": () => `
    <main class="journal-page"><section class="journal-photo journal-hero"><div><small>A PHOTO JOURNAL</small><h3>Mai & David</h3><p>From Hanoi to the sea · 2026</p></div></section><section class="journal-caption"><span>01 / THE MORNING</span><p>Quiet streets, warm light, and everyone we love arriving one by one.</p></section><section class="journal-row"><div class="journal-photo journal-small"></div><div class="journal-photo journal-tall"></div></section></main>`,
  "arcade-cabinet": () => `
    <main class="arcade-page"><header><strong>STAR//SHIFT</strong><span>HI-SCORE&nbsp; 084,200</span><i>PLAYER 01</i></header><section class="arcade-layout"><aside class="arcade-score"><small>SCORE</small><b>032480</b><span>LEVEL</span><strong>07</strong><span>COMBO</span><strong>×12</strong></aside><div class="arcade-screen"><div class="arcade-stars" aria-hidden="true"><i></i><i></i><i></i><b></b></div><small>SECTOR 07 / NEON BELT</small><h3>READY?</h3><div class="page-actions">${button("START GAME")}</div><footer><span>MOVE&nbsp; ◀ ▶</span><span>FIRE&nbsp; A</span></footer></div><aside class="arcade-modes"><small>SELECT MODE</small><b class="is-active">ARCADE</b><b>TIME ATTACK</b><b>ENDLESS</b><span>3 LIVES</span></aside></section><footer class="arcade-footer"><span>ONLINE / 128 PLAYERS</span><i></i><span>INSERT COIN TO CONTINUE</span></footer></main>`,
  "cinematic-game": () => `
    <main class="cinematic-game-page"><div class="cinematic-landscape" aria-hidden="true"><i></i><b></b><span></span></div><header><strong>VEIL / NORTH</strong><span>CHAPTER I&nbsp;&nbsp; WORLD&nbsp;&nbsp; ARCHIVE</span></header><section><small>A JOURNEY BEYOND THE LAST LIGHT</small><h3>The world remembers.</h3><p>Cross the drowned valley, follow the old signals, and uncover what waited beneath the quiet sky.</p><div class="page-actions">${button("Begin chapter")}${button("Watch trailer", true)}</div></section><footer><span>01 / THE DROWNED VALLEY</span><i></i><span>EXPLORE THE WORLD ↓</span></footer></main>`,
  "retro-console": () => `
    <main class="retro-console-page"><header><strong>POCKET//QUEST</strong><span>BAT 82%</span><span>12:48</span></header><section class="retro-status"><div><small>PLAYER</small><b>NOVA</b></div><div><small>STAGE</small><b>04-2</b></div><div><small>SCORE</small><b>018450</b></div><div><small>LIVES</small><b>♥ ♥ ♡</b></div></section><section class="retro-console-grid"><nav><small>MAIN MENU</small><b class="is-active">CONTINUE</b><b>NEW GAME</b><b>INVENTORY</b><b>OPTIONS</b></nav><div class="retro-map"><div aria-hidden="true"><i></i><i></i><i></i><b></b><span></span></div><small>FOREST RELAY / CHECKPOINT 3</small></div><aside><small>ITEMS</small><div><i>01</i><b>KEY</b></div><div><i>04</i><b>ORB</b></div><small>QUEST</small><p>Restore power to the relay.</p></aside></section><footer><span>[A] SELECT</span><span>[B] BACK</span><span>[START] MENU</span></footer></main>`,
  "publication-index": () => `
    <main class="publication-page"><header><span>VOL. 18&nbsp; / &nbsp;AUGUST 2026</span><h3>The Daily Form</h3><span>DESIGN · CULTURE · CITIES</span></header><nav><span>Latest</span><span>Essays</span><span>Field Notes</span><span>Reviews</span><span>Archive</span></nav><section class="publication-lead"><article><small>THE WEEKEND ESSAY</small><h4>What a city reveals when we choose to walk.</h4><p>Five observations on attention, public space, and the routes that shape a day.</p><footer>By Mira Chen&nbsp; · &nbsp;12 min read</footer></article><div class="publication-image" aria-hidden="true"><i></i><b></b></div><aside><article><small>FIELD NOTES</small><h4>The return of the neighborhood cinema</h4><span>6 min</span></article><article><small>OBJECTS</small><h4>One chair, repaired for thirty years</h4><span>4 min</span></article></aside></section><section class="publication-index"><span>MORE FROM THIS ISSUE</span><article><small>01</small><b>Archives built for wandering</b><em>ESSAY</em></article><article><small>02</small><b>After the last train</b><em>REPORTAGE</em></article></section></main>`,
  "longform-journal": () => `
    <main class="longform-page"><header><strong>Common Journal</strong><span>Essays&nbsp;&nbsp; Notes&nbsp;&nbsp; About</span></header><article><aside><small>ISSUE 24</small><span>August 29, 2026</span><span>11 minute read</span><b>Words by An Le</b></aside><section><small>FIELD ESSAY / ATTENTION</small><h3>The patient work of noticing what stays.</h3><p class="longform-deck">A journal from the edges of the city, where useful things become visible only after we slow down.</p><div class="longform-rule"></div><p><b>Every morning begins with the same short walk.</b> The route is ordinary enough to disappear: a shaded lane, a repair shop opening its doors, the first cups set along a steel counter.</p><p>Over time, repetition becomes a way of reading. Small changes gather meaning, and the familiar landscape starts to speak in details.</p><blockquote>Attention is less a spotlight than a practice of returning.</blockquote></section></article></main>`,
  "visual-magazine": () => `
    <main class="visual-magazine-page"><header><strong>OFFSET</strong><span>ISSUE 09 / NEW HORIZONS</span><i>MENU +</i></header><section class="magazine-cover"><div class="magazine-image" aria-hidden="true"><i></i><b></b><span></span></div><aside><small>COVER STORY / TRAVEL</small><h3>Beyond the blue hour.</h3><p>Artists and night workers on the cities that begin after sunset.</p><span>Photography by Sol Nguyen</span></aside><b class="magazine-number">09</b></section><section class="magazine-stories"><article><small>01 / CULTURE</small><b>The rooms where new sounds begin</b></article><article class="magazine-story-image"><i></i><small>02 / FIELD GUIDE</small><b>A coast drawn by wind</b></article><article><small>03 / PEOPLE</small><b>Seven questions for a restless maker</b></article></section></main>`
};

const thumbnailRenderers = {
  northstar: () => `<i class="thumb-nav"></i><b class="thumb-hero"></b><span class="thumb-copy"></span><div class="thumb-cards"><i></i><i></i><i></i></div>`,
  workspace: () => `<aside class="thumb-side"></aside><i class="thumb-toolbar"></i><div class="thumb-columns"><span></span><span></span><span></span></div>`,
  "editorial-tool": () => `<div class="thumb-editorial-copy"><b></b><i></i><i></i></div><div class="thumb-tool-canvas"><span></span></div>`,
  "product-first": () => `<div class="thumb-product"><i></i><span></span><span></span></div><div class="thumb-side-copy"><b></b><i></i><i></i></div>`,
  "technical-console": () => `<aside class="thumb-docs"></aside><div class="thumb-code"><b></b><i></i><i></i><i></i></div>`,
  "narrative-launch": () => `<div class="thumb-glow"></div><b class="thumb-launch-title"></b><i class="thumb-launch-line"></i>`,
  "project-index": () => `<i class="thumb-index-head"></i><div class="thumb-index-rows"><span></span><span></span><span></span><span></span></div>`,
  "case-study-grid": () => `<div class="thumb-masonry"><i></i><i></i><i></i></div>`,
  "personal-editorial": () => `<i class="thumb-mag-head"></i><div class="thumb-mag"><aside></aside><main><b></b><span></span><span></span></main></div>`,
  "editorial-invitation": () => `<i class="thumb-flourish">⌇</i><small>TOGETHER WITH THEIR FAMILIES</small><b>E & J</b><span></span>`,
  "paper-collage": () => `<i class="thumb-paper-a"></i><i class="thumb-paper-b"></i><b class="thumb-paper-note"></b><span class="thumb-leaf">❧</span>`,
  "photo-journal": () => `<div class="thumb-photo-main"><b></b></div><i class="thumb-caption"></i><div class="thumb-photo-row"><span></span><span></span></div>`,
  "arcade-cabinet": () => `<i class="thumb-arcade-score"></i><div class="thumb-arcade-screen"><b></b><span></span></div><i class="thumb-arcade-menu"></i><small>START</small>`,
  "cinematic-game": () => `<div class="thumb-cinematic-art"><i></i><b></b></div><small>CHAPTER I</small><strong>VEIL / NORTH</strong><span></span>`,
  "retro-console": () => `<i class="thumb-retro-status"></i><nav class="thumb-retro-menu"><b></b><span></span><span></span></nav><div class="thumb-retro-map"><i></i></div><aside class="thumb-retro-items"></aside>`,
  "publication-index": () => `<strong class="thumb-publication-name">THE DAILY FORM</strong><i class="thumb-publication-rule"></i><div class="thumb-publication-lead"><b></b><span></span><aside></aside></div><div class="thumb-publication-rows"><i></i><i></i></div>`,
  "longform-journal": () => `<i class="thumb-longform-nav"></i><aside class="thumb-longform-meta"></aside><main class="thumb-longform-copy"><b></b><span></span><span></span><span></span></main>`,
  "visual-magazine": () => `<strong class="thumb-magazine-brand">OFFSET</strong><div class="thumb-magazine-image"><i></i></div><b class="thumb-magazine-title"></b><span class="thumb-magazine-number">09</span>`
};

export function renderPagePreview(template, effectiveStyle) {
  const kind = template?.preview?.kind;
  const renderer = pageRenderers[kind];
  if (!renderer) return "";
  const composition = effectiveStyle?.composition ?? {};
  const attributes = Object.entries(composition)
    .map(([key, value]) => `data-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}="${escapeHtml(value)}"`)
    .join(" ");
  return `<div class="template-page template-${escapeHtml(kind)}" ${attributes}>${renderer()}</div>`;
}

export function renderTemplateThumbnail(template) {
  const kind = template?.preview?.kind;
  const renderer = thumbnailRenderers[kind];
  return `<div class="template-thumbnail thumbnail-${escapeHtml(kind)}" aria-hidden="true">${renderer ? renderer() : ""}</div>`;
}

export const previewKinds = Object.freeze(Object.keys(pageRenderers));
