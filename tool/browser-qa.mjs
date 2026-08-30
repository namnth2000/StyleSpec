import fs from "node:fs/promises";
import path from "node:path";

const port = Number(process.argv[2]);
const outputDir = path.resolve(process.argv[3]);
const targetUrl = process.argv[4] ?? "http://127.0.0.1:4173/";

await fs.mkdir(outputDir, { recursive: true });
const target = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" }).then((response) => response.json());
if (!target) throw new Error("No Chromium page target was available");

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let commandId = 0;
const pending = new Map();
const browserErrors = [];
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.method === "Runtime.exceptionThrown") browserErrors.push(message.params.exceptionDetails.text);
  if (message.method === "Log.entryAdded" && ["error", "warning"].includes(message.params.entry.level)) browserErrors.push(message.params.entry.text);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
});

function send(method, params = {}) {
  const id = ++commandId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

const pause = (milliseconds = 120) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const assertionResults = [];
function assert(condition, label, details = null) {
  assertionResults.push({ label, pass: Boolean(condition), details });
  if (!condition) throw new Error(`${label}${details ? `: ${JSON.stringify(details)}` : ""}`);
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function evaluateJson(expression) {
  return JSON.parse(await evaluate(`JSON.stringify(${expression})`));
}

async function navigate(url = targetUrl) {
  await send("Page.navigate", { url });
  for (let attempt = 0; attempt < 50; attempt += 1) {
    await pause(50);
    if (await evaluate("document.readyState === 'complete'")) return;
  }
  throw new Error(`Timed out loading ${url}`);
}

async function click(selector) {
  const clicked = await evaluate(`(() => { const node = document.querySelector(${JSON.stringify(selector)}); if (!node) return false; node.click(); return true; })()`);
  if (!clicked) throw new Error(`Could not click ${selector}`);
  await pause();
}

async function clickText(selector, text) {
  const clicked = await evaluate(`(() => { const node = [...document.querySelectorAll(${JSON.stringify(selector)})].find((item) => item.textContent.includes(${JSON.stringify(text)})); if (!node) return false; node.click(); return true; })()`);
  if (!clicked) throw new Error(`Could not click ${text}`);
  await pause();
}

async function screenshot(fileName) {
  const result = await send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false });
  const filePath = path.join(outputDir, fileName);
  await fs.writeFile(filePath, Buffer.from(result.data, "base64"));
  return filePath;
}

await send("Page.enable");
await send("Runtime.enable");
await send("Log.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await navigate();
browserErrors.length = 0;

const initial = await evaluateJson(`(() => ({
  domains: document.querySelectorAll('[data-domain]').length,
  templatesHidden: document.querySelector('#template-step').hidden,
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  titleWrap: getComputedStyle(document.querySelector('.v2-intro h1')).textWrap
}))()`);
assert(initial.domains === 6, "desktop exposes all six domains", initial);
assert(initial.templatesHidden, "template gallery waits for a domain", initial);
assert(initial.overflow <= 0, "desktop has no page overflow", initial);
assert(initial.titleWrap !== "pretty", "application copy does not use pretty wrapping", initial);
await evaluate("document.documentElement.style.scrollBehavior = 'auto'");

const domainNames = ["Tool / Utility", "Software / SaaS", "Portfolio", "Wedding", "Game", "Blog / Editorial"];
const renderedKinds = [];
const renderedNames = [];
for (const domainName of domainNames) {
  await evaluate("document.scrollingElement.scrollTop = 0");
  await clickText("[data-domain]", domainName);
  const gallery = await evaluateJson(`(() => ({ count: document.querySelectorAll('[data-template]').length, names: [...document.querySelectorAll('.template-card-copy strong')].map((node) => node.textContent), scrollTop: document.scrollingElement.scrollTop }))()`);
  assert(gallery.count === 3, `${domainName} exposes three templates`, gallery);
  assert(gallery.scrollTop === 0, `${domainName} selection does not auto-scroll`, gallery);
  const comparisonScrollTop = await evaluate("(() => { document.scrollingElement.scrollTop = Math.max(0, document.querySelector('#template-step').offsetTop - 90); return document.scrollingElement.scrollTop; })()");
  for (let index = 0; index < 3; index += 1) {
    await click(`[data-template]:nth-child(${index + 1})`);
    const selected = await evaluateJson(`(() => ({ kind: document.querySelector('.template-page')?.className, name: document.querySelector('[data-template][aria-pressed="true"] .template-card-copy strong')?.textContent, exportVisible: !document.querySelector('#export-panel').hidden, customizeVisible: !document.querySelector('#customize-step').hidden, exportDisabled: document.querySelector('#export-button').disabled, scrollTop: document.scrollingElement.scrollTop }))()`);
    assert(selected.exportVisible && selected.customizeVisible, "template selection enables customize and export", selected);
    assert(selected.exportDisabled, "template selection alone does not unlock export", selected);
    assert(Math.abs(selected.scrollTop - comparisonScrollTop) <= 1, `${domainName} template comparison preserves the current viewport`, { before: comparisonScrollTop, after: selected.scrollTop });
    renderedKinds.push(selected.kind);
    renderedNames.push(selected.name);
  }
}
assert(new Set(renderedKinds).size === 18, "all templates dispatch distinct Page renderers", renderedKinds);
assert(new Set(renderedNames).size === 18, "all eighteen templates are selectable", renderedNames);

await clickText("[data-domain]", "Game");
await clickText("[data-template]", "Arcade Cabinet");
assert(await evaluate("getComputedStyle(document.querySelector('.arcade-layout')).gridTemplateColumns.split(' ').length === 3 && Boolean(document.querySelector('.arcade-screen'))"), "Arcade Cabinet centers a play surface between score and mode rails");
await clickText("[data-template]", "Cinematic Game");
assert(await evaluate("Boolean(document.querySelector('.cinematic-landscape')) && getComputedStyle(document.querySelector('.cinematic-game-page')).minHeight !== '0px'"), "Cinematic Game renders an artwork-led full-screen composition");
await clickText("[data-template]", "Retro Console");
assert(await evaluate("getComputedStyle(document.querySelector('.retro-console-grid')).gridTemplateColumns.split(' ').length === 3 && Boolean(document.querySelector('.retro-map'))"), "Retro Console keeps menu, map, and status as a compact interface");

await clickText("[data-domain]", "Blog / Editorial");
await clickText("[data-template]", "Publication Index");
assert(await evaluate("getComputedStyle(document.querySelector('.publication-lead')).gridTemplateColumns.split(' ').length === 3 && document.querySelectorAll('.publication-index article').length === 2"), "Publication Index leads with editorial hierarchy and an article index");
await clickText("[data-template]", "Longform Journal");
assert(await evaluate("getComputedStyle(document.querySelector('.longform-page > article')).gridTemplateColumns.split(' ').length === 2 && document.querySelectorAll('.longform-page article section > p').length >= 3"), "Longform Journal visibly prioritizes a reading column");
await clickText("[data-template]", "Visual Magazine");
assert(await evaluate("getComputedStyle(document.querySelector('.magazine-cover')).gridTemplateColumns.split(' ').length === 2 && Number.parseFloat(getComputedStyle(document.querySelector('.magazine-cover > aside')).marginLeft) < 0"), "Visual Magazine uses an offset image-led cover composition");

await clickText("[data-domain]", "Tool / Utility");
await clickText("[data-template]", "Editorial Tool");
await evaluate("document.querySelector('#optional-details').open = true");
await click('#decision-grid input[value="editorial"]');
assert(await evaluate("(() => { const columns = getComputedStyle(document.querySelector('.editorial-tool-page')).gridTemplateColumns.split(' ').map(Number.parseFloat); return columns[1] > columns[0] * 2.5; })()"), "Editorial Tool detail visibly changes its grid");

await clickText("[data-domain]", "Software / SaaS");
await clickText("[data-template]", "Product-first");
await evaluate("document.querySelector('#optional-details').open = true");
await click('#decision-heroPriority input[value="copy-first"]');
assert(await evaluate("getComputedStyle(document.querySelector('.product-window')).order === '2'"), "Product-first placement visibly moves the product frame");

await clickText("[data-template]", "Narrative Launch");
await evaluate("document.querySelector('#optional-details').open = true");
await click('#decision-heroPriority input[value="copy-first"]');
assert(await evaluate("getComputedStyle(document.querySelector('.launch-page section')).marginTop === '0px'"), "Narrative Launch opening focus visibly changes composition");

await clickText("[data-domain]", "Wedding");
await clickText("[data-template]", "Paper Collage");
await evaluate("document.querySelector('#optional-details').open = true");
await click('#decision-grid input[value="editorial"]');
assert(await evaluate("getComputedStyle(document.querySelector('.paper-photo.photo-two')).display === 'none'"), "Paper Collage layout visibly changes the keepsake composition");

await clickText("[data-template]", "Photo Journal");
await evaluate("document.querySelector('#optional-details').open = true");
await click('#decision-contentRhythm input[value="stacked"]');
assert(await evaluate("getComputedStyle(document.querySelector('.journal-row')).gridTemplateColumns.split(' ').length === 1"), "Photo Journal rhythm visibly changes the image sequence");

await clickText("[data-domain]", "Tool / Utility");
await clickText("[data-template]", "Northstar - Soft Utility");
const initialCustomize = await evaluateJson(`(() => ({
  selectedCards: document.querySelectorAll('#customize-list .choice-card.is-selected, #customize-list .accent-choice.is-selected').length,
  checkedInputs: document.querySelectorAll('#customize-list input:checked').length,
  progress: document.querySelector('#override-count').textContent,
  accent: getComputedStyle(document.querySelector('#preview-root')).getPropertyValue('--pv-accent').trim(),
  radius: getComputedStyle(document.querySelector('#preview-root')).getPropertyValue('--pv-card-radius').trim(),
  optionalOpen: document.querySelector('#optional-details').open,
  separateTemplateGroup: Boolean(document.querySelector('#template-details')),
  templateControls: document.querySelectorAll('#optional-details .template-optional-subgroup [data-selection-group="templateDetails"]').length,
  iconSvgs: document.querySelectorAll('#decision-iconStyle .mini-icon svg').length,
  placeholderText: [...document.querySelectorAll('#optional-details .template-optional-subgroup .choice-visual')].some((node) => node.textContent.trim().length > 0)
}))()`);
assert(initialCustomize.selectedCards === 0 && initialCustomize.checkedInputs === 0, "Essentials and optional details start visibly unselected", initialCustomize);
assert(initialCustomize.progress.includes("0 / 5"), "Customize starts at 0 / 5 Essentials", initialCustomize);
assert(initialCustomize.accent === "#b45309" && initialCustomize.radius === "16px", "template preview defaults render before selection", initialCustomize);
assert(!initialCustomize.optionalOpen && !initialCustomize.separateTemplateGroup && initialCustomize.templateControls > 0, "one collapsed Optional Details group contains common and template-specific refinements", initialCustomize);
assert(initialCustomize.iconSvgs === 3 && !initialCustomize.placeholderText, "visual choices use recognizable mini visuals instead of letter placeholders", initialCustomize);

await evaluate("document.querySelector('#optional-details').open = true");
await click('#decision-heroStructure input[value="split"]');
let compositionState = await evaluateJson(`(() => ({ display: getComputedStyle(document.querySelector('.northstar-main')).display, clearVisible: !document.querySelector('#decision-heroStructure [data-clear]').hidden, detailsOpen: document.querySelector('#optional-details').open }))()`);
assert(compositionState.display === "grid" && compositionState.clearVisible && compositionState.detailsOpen, "template detail changes Page composition and keeps its group open", compositionState);
await click("#decision-heroStructure [data-clear]");
compositionState = await evaluateJson(`(() => ({ display: getComputedStyle(document.querySelector('.northstar-main')).display, clearHidden: document.querySelector('#decision-heroStructure [data-clear]').hidden }))()`);
assert(compositionState.display !== "grid" && compositionState.clearHidden, "clearing a template detail restores template structure", compositionState);
await click('#decision-ctaModel input[value="single"]');

await click('#decision-colorMode input[value="both"]');
await click('#decision-accent input[value="amber"]');
await click('#decision-typography input[value="sans"]');
await click('#decision-radius input[value="rounded"]');
await click('#decision-density input[value="spacious"]');
const equalDefaults = await evaluateJson(`(() => ({ progress: document.querySelector('#override-count').textContent, ready: document.querySelector('#export-title').textContent, disabled: document.querySelector('#export-button').disabled, radiusSelected: document.querySelector('#decision-radius input[value="rounded"]').checked }))()`);
assert(equalDefaults.progress.includes("5 / 5") && !equalDefaults.disabled && equalDefaults.radiusSelected, "explicit values equal to preview defaults count toward readiness", equalDefaults);

await click("#decision-accent [data-custom-accent]");
await evaluate(`(() => { const input = document.querySelector('#custom-color-hex'); input.value = '#123456'; input.dispatchEvent(new Event('input', { bubbles: true })); document.querySelector('#custom-color-form').requestSubmit(); return true; })()`);
await pause();
const customAccent = await evaluateJson(`(() => ({ accent: getComputedStyle(document.querySelector('#preview-root')).getPropertyValue('--pv-accent').trim(), summary: document.querySelector('#export-status').textContent }))()`);
assert(customAccent.accent === "#123456", "custom accent updates the resolved preview", customAccent);

await evaluate("document.querySelector('#optional-details').open = true");
await click('#decision-surface input[value="elevated"]');
let optionalState = await evaluateJson(`(() => ({ shadow: getComputedStyle(document.querySelector('#preview-root')).getPropertyValue('--pv-shadow').trim(), clearVisible: !document.querySelector('#decision-surface [data-clear]').hidden, open: document.querySelector('#optional-details').open }))()`);
assert(optionalState.shadow.includes("42px") && optionalState.clearVisible && optionalState.open, "optional choice updates preview and remains clearable", optionalState);
await click("#decision-surface [data-clear]");
optionalState = await evaluateJson(`(() => ({ shadow: getComputedStyle(document.querySelector('#preview-root')).getPropertyValue('--pv-shadow').trim(), clearHidden: document.querySelector('#decision-surface [data-clear]').hidden }))()`);
assert(optionalState.shadow === "none" && optionalState.clearHidden, "clearing optional choice restores preview fallback", optionalState);
await click('#decision-hover input[value="lift"]');
await click('#decision-iconStyle input[value="filled"]');
await click('#decision-textBehavior input[value="balance"]');
await click('#decision-focusMotion input[value="expressive"]');
const samplerAttributes = await evaluateJson(`(() => ({ hover: document.querySelector('#preview-root').dataset.hover, icon: document.querySelector('#preview-root').dataset.icon, modeSwitchVisible: !document.querySelector('#preview-mode-switch').hidden }))()`);
assert(samplerAttributes.hover === "lift" && samplerAttributes.icon === "filled", "hover and icon controls update shared sampler attributes", samplerAttributes);
assert(await evaluate("getComputedStyle(document.querySelector('#preview-root')).getPropertyValue('--pv-duration').trim() === '220ms'"), "focus and motion choice updates preview timing");
assert(await evaluate("getComputedStyle(document.querySelector('[data-preview-view=\"components\"] .icon-filled')).display !== 'none' && getComputedStyle(document.querySelector('[data-preview-view=\"components\"] .icon-outline')).display === 'none'"), "filled icon choice changes the sampler glyph rendering");
assert(samplerAttributes.modeSwitchVisible, "Both mode exposes the Light and Dark preview switch", samplerAttributes);
await click('[data-mode="dark"]');
assert(await evaluate("document.querySelector('#preview-root').dataset.mode === 'dark'"), "Both mode switches the preview to Dark");
await click('[data-preview-tab="components"]');
assert(await evaluate("!document.querySelector('[data-preview-view=\"components\"]').hidden"), "Components sampler remains available");
await send("DOM.enable");
await send("CSS.enable");
const documentNode = await send("DOM.getDocument");
const hoverNode = await send("DOM.querySelector", { nodeId: documentNode.root.nodeId, selector: '[data-preview-view="components"] .demo-button-primary' });
await send("CSS.forcePseudoState", { nodeId: hoverNode.nodeId, forcedPseudoClasses: ["hover"] });
await pause();
const hoverTransform = await evaluate("getComputedStyle(document.querySelector('[data-preview-view=\"components\"] .demo-button-primary')).transform");
assert(hoverTransform !== "none", "configured hover treatment applies to sampler controls", { hoverTransform });
await click('[data-preview-tab="states"]');
assert(await evaluate("!document.querySelector('[data-preview-view=\"states\"]').hidden"), "States sampler remains available");
assert(await evaluate("getComputedStyle(document.querySelector('.text-stress h3')).textWrap === 'balance'"), "text behavior updates the States sampler");
await click('[data-preview-tab="page"]');

await send("Browser.setDownloadBehavior", { behavior: "allow", downloadPath: outputDir, eventsEnabled: true });
await click("#export-button");
let designPath = path.join(outputDir, "DESIGN.md");
for (let attempt = 0; attempt < 20; attempt += 1) {
  try { await fs.access(designPath); break; } catch { await pause(100); }
}
const downloaded = await fs.readFile(designPath, "utf8");
assert(downloaded.includes("Northstar - Soft Utility") && downloaded.includes("Custom** (#123456)"), "file download contains the selected template and explicit choices");
assert(downloaded.includes("CTA model: **Single action**") && downloaded.includes("Icon style: **Filled**"), "file download contains explicit template and optional details");
assert(!downloaded.includes("Surface treatment") && !downloaded.includes("Neutral tone"), "cleared and unselected optional defaults stay out of export");
assert(!downloaded.includes("research") && !downloaded.includes("license"), "download omits internal metadata");

await evaluate("(() => { document.documentElement.style.scrollBehavior = 'auto'; document.scrollingElement.scrollTop = 0; return true; })()");
await pause();
assert(await evaluate("document.scrollingElement.scrollTop === 0"), "desktop capture returns to the top of the configuration flow");
const desktopScreenshot = await screenshot("stylespec-v2-desktop.png");

await send("Emulation.setDeviceMetricsOverride", { width: 375, height: 812, deviceScaleFactor: 1, mobile: true, screenWidth: 375, screenHeight: 812 });
await navigate();
const mobileRenderedKinds = [];
for (const domainName of domainNames) {
  await evaluate("document.scrollingElement.scrollTop = 0");
  await clickText("[data-domain]", domainName);
  for (let index = 0; index < 3; index += 1) {
    await click(`[data-template]:nth-child(${index + 1})`);
    const mobileTemplate = await evaluateJson(`(() => ({
      kind: document.querySelector('.template-page').className,
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      previewOverflow: document.querySelector('#preview-root').scrollWidth - document.querySelector('#preview-root').clientWidth,
      scrollTop: document.scrollingElement.scrollTop,
      selectedChoices: document.querySelectorAll('#customize-list .is-selected').length,
      optionalOpen: document.querySelector('#optional-details').open
    }))()`);
    mobileRenderedKinds.push(mobileTemplate.kind);
    assert(mobileTemplate.pageOverflow <= 0 && mobileTemplate.previewOverflow <= 0, `${domainName} mobile templates avoid horizontal overflow`, mobileTemplate);
    assert(mobileTemplate.scrollTop === 0, `${domainName} mobile template comparison does not jump`, mobileTemplate);
    assert(mobileTemplate.selectedChoices === 0 && !mobileTemplate.optionalOpen, `${domainName} mobile Customize starts compact and unselected`, mobileTemplate);
  }
}
assert(new Set(mobileRenderedKinds).size === 18, "all templates retain distinct mobile renderers", mobileRenderedKinds);
await clickText("[data-domain]", "Wedding");
const mobileGallery = await evaluateJson(`(() => ({
  width: innerWidth,
  pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  cards: [...document.querySelectorAll('[data-template]')].map((node) => Math.round(node.getBoundingClientRect().width)),
  titleWrap: getComputedStyle(document.querySelector('.v2-intro h1')).textWrap
}))()`);
assert(mobileGallery.width === 375, "mobile viewport is 375px", mobileGallery);
assert(mobileGallery.pageOverflow <= 0, "mobile selection flow has no page overflow", mobileGallery);
assert(mobileGallery.cards.length === 3 && mobileGallery.cards.every((width) => width > 330), "mobile template cards stay readable", mobileGallery);
assert(mobileGallery.titleWrap !== "pretty", "mobile application copy wraps normally", mobileGallery);

await clickText("[data-template]", "Paper Collage");
await click("#mobile-preview-toggle");
await pause(220);
const mobilePreview = await evaluateJson(`(() => ({
  panelOpen: document.querySelector('#preview-panel').classList.contains('mobile-open'),
  frameOverflow: document.querySelector('#preview-root').scrollWidth - document.querySelector('#preview-root').clientWidth,
  pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  kind: document.querySelector('.template-page').className
}))()`);
assert(mobilePreview.panelOpen, "mobile Preview control opens the preview", mobilePreview);
assert(mobilePreview.frameOverflow <= 0 && mobilePreview.pageOverflow <= 0, "mobile preview has no unintended horizontal overflow", mobilePreview);
assert(mobilePreview.kind.includes("paper-collage"), "mobile preview preserves the selected collage identity", mobilePreview);
const mobileScreenshot = await screenshot("stylespec-v2-mobile.png");
await click("#mobile-preview-close");
assert(await evaluate("!document.querySelector('#preview-panel').classList.contains('mobile-open') && !document.body.classList.contains('preview-open')"), "mobile preview closes back to Customize");

socket.close();

console.log(JSON.stringify({
  pass: assertionResults.every((result) => result.pass),
  assertions: assertionResults.length,
  renderedNames,
  desktopScreenshot,
  mobileScreenshot,
  designPath,
  browserErrors
}, null, 2));
