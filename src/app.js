import {
  decisionFor,
  domainFor,
  domains,
  essentialDecisionIds,
  getEssentialProgress,
  getTemplateById,
  getTemplatesForDomain,
  labelFor,
  optionalDecisionIds,
  resolveExportStyle,
  resolvePreviewStyle,
  templateDetailControls
} from "./data.js";
import { accentPalettes, generateDesignMarkdown, getPreviewConfig, normalizeHex } from "./design.js";
import { renderPagePreview, renderTemplateThumbnail } from "./preview.js";

const DEFAULT_CUSTOM_ACCENT = "#7C3AED";
const THEME_COLORS = ["#111827", "#6B7280", "#B91C1C", "#C2410C", "#B45309", "#4D7C0F", "#047857", "#0F766E", "#0E7490", "#1D4ED8", "#4338CA", "#6D28D9"];
const STANDARD_COLORS = ["#DC2626", "#F97316", "#FACC15", "#84CC16", "#16A34A", "#14B8A6", "#06B6D4", "#2563EB", "#4F46E5", "#9333EA", "#DB2777"];

const state = {
  selectedDomain: null,
  selectedTemplateId: null,
  essentials: {},
  optional: {},
  templateDetails: {},
  previewMode: "light",
  previewTab: "page",
  customColorDraft: DEFAULT_CUSTOM_ACCENT
};

const elements = {
  domainList: document.querySelector("#domain-list"),
  templateStep: document.querySelector("#template-step"),
  templateList: document.querySelector("#template-list"),
  templateNote: document.querySelector("#template-note"),
  customizeStep: document.querySelector("#customize-step"),
  customizeList: document.querySelector("#customize-list"),
  overrideCount: document.querySelector("#override-count"),
  exportPanel: document.querySelector("#export-panel"),
  exportKicker: document.querySelector("#export-kicker"),
  exportTitle: document.querySelector("#export-title"),
  exportStatus: document.querySelector("#export-status"),
  exportButton: document.querySelector("#export-button"),
  selectionSummary: document.querySelector("#selection-summary"),
  previewRoot: document.querySelector("#preview-root"),
  previewEmpty: document.querySelector("#preview-empty"),
  pagePreview: document.querySelector("#page-preview"),
  previewModeSwitch: document.querySelector("#preview-mode-switch"),
  previewTabs: document.querySelectorAll("[data-preview-tab]"),
  previewViews: document.querySelectorAll("[data-preview-view]"),
  previewPanel: document.querySelector("#preview-panel"),
  mobilePreviewToggle: document.querySelector("#mobile-preview-toggle"),
  mobilePreviewClose: document.querySelector("#mobile-preview-close"),
  toast: document.querySelector("#toast")
};

function selectedTemplate() {
  return getTemplateById(state.selectedTemplateId);
}

function userSelections() {
  return { essentials: state.essentials, optional: state.optional, templateDetails: state.templateDetails };
}

function previewStyle() {
  return resolvePreviewStyle(selectedTemplate(), userSelections());
}

function exportStyle() {
  return resolveExportStyle(selectedTemplate(), userSelections());
}

function clearSelections() {
  state.essentials = {};
  state.optional = {};
  state.templateDetails = {};
}

function syncTemplateSelection() {
  elements.templateList.querySelectorAll("[data-template]").forEach((button) => {
    const selected = button.dataset.template === state.selectedTemplateId;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function preserveScrollPosition(scrollX, scrollY) {
  const restore = () => window.scrollTo({ left: scrollX, top: scrollY, behavior: "auto" });
  restore();
  window.requestAnimationFrame(restore);
}

function domainIconSvg(domainId) {
  const icons = {
    tool: `<svg class="domain-icon" viewBox="0 0 24 24"><path d="M5 7h8M17 7h2M5 17h2M11 17h8"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/></svg>`,
    software: `<svg class="domain-icon" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="14" rx="2"/><path d="M9 5v14M9 10h11"/></svg>`,
    portfolio: `<svg class="domain-icon" viewBox="0 0 24 24"><path d="M7 17 17 7M10 7h7v7M5 5h4M5 5v4M19 19h-4M19 19v-4"/></svg>`,
    wedding: `<svg class="domain-icon" viewBox="0 0 24 24"><path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z"/></svg>`,
    game: `<svg class="domain-icon" viewBox="0 0 24 24"><path d="M7.5 8h9a4 4 0 0 1 3.8 5.2l-.7 2.2a2.5 2.5 0 0 1-4 1.2L14 15h-4l-1.6 1.6a2.5 2.5 0 0 1-4-1.2l-.7-2.2A4 4 0 0 1 7.5 8Z"/><path d="M8 11v4M6 13h4"/><circle cx="16" cy="12" r=".8" class="domain-icon-dot"/><circle cx="18" cy="14" r=".8" class="domain-icon-dot"/></svg>`,
    blog: `<svg class="domain-icon" viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="16" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>`
  };
  return icons[domainId] ?? icons.tool;
}

function renderDomains() {
  elements.domainList.innerHTML = domains.map((domain) => `
    <button class="domain-card ${state.selectedDomain === domain.id ? "is-selected" : ""}" type="button" data-domain="${domain.id}" aria-pressed="${state.selectedDomain === domain.id}">
      <span aria-hidden="true">${domainIconSvg(domain.id)}</span><strong>${domain.name}</strong><i aria-hidden="true">→</i>
    </button>`).join("");

  elements.domainList.querySelectorAll("[data-domain]").forEach((button) => {
    button.addEventListener("click", () => selectDomain(button.dataset.domain));
  });
}

function selectDomain(domainId) {
  if (state.selectedDomain !== domainId) {
    state.selectedDomain = domainId;
    state.selectedTemplateId = null;
    clearSelections();
  }
  renderDomains();
  renderTemplates();
  renderCustomize();
  updateExportPanel();
  updatePreview();
}

function renderTemplates() {
  const domain = domainFor(state.selectedDomain);
  elements.templateStep.hidden = !domain;
  if (!domain) {
    elements.templateList.replaceChildren();
    return;
  }

  elements.templateNote.textContent = `Three structurally different directions for ${domain.name}.`;
  elements.templateList.innerHTML = getTemplatesForDomain(domain.id).map((item) => `
    <button class="template-card ${state.selectedTemplateId === item.id ? "is-selected" : ""}" type="button" data-template="${item.id}" aria-pressed="${state.selectedTemplateId === item.id}">
      ${renderTemplateThumbnail(item)}
      <span class="template-card-copy"><strong>${item.name}</strong><span>${item.description}</span></span>
      <i class="template-selected-mark" aria-hidden="true">✓</i>
    </button>`).join("");

  elements.templateList.querySelectorAll("[data-template]").forEach((button) => {
    button.addEventListener("click", () => selectTemplate(button.dataset.template));
  });
}

function selectTemplate(templateId) {
  const item = getTemplateById(templateId);
  if (!item) return;

  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const isNewTemplate = state.selectedTemplateId !== item.id;

  state.selectedTemplateId = item.id;
  state.selectedDomain = item.domain;
  if (isNewTemplate) {
    clearSelections();
    state.previewMode = item.previewDefaults.colorMode === "dark" ? "dark" : "light";
  }

  // Keep the existing template cards in the DOM so clicking through directions
  // never loses focus or lets browser scroll anchoring move the viewport.
  syncTemplateSelection();
  renderCustomize();
  updateExportPanel();
  updatePreview();
  preserveScrollPosition(scrollX, scrollY);
}

function miniVisual(decisionId, optionId) {
  if (decisionId === "colorMode") return `<span class="mini-panel mini-${optionId}"><i></i><b></b></span>`;
  if (decisionId === "neutralTone") return `<span class="mini-neutral mini-${optionId}"><i></i><i></i><i></i></span>`;
  if (decisionId === "typography") return `<span class="mini-type mini-${optionId}">Aa</span>`;
  if (decisionId === "radius") return `<span class="mini-radius mini-${optionId}"></span>`;
  if (decisionId === "surface") return `<span class="mini-surface mini-${optionId}"></span>`;
  if (decisionId === "density" || decisionId === "informationDensity") return `<span class="mini-density mini-${optionId}"><i></i><i></i><i></i></span>`;
  if (decisionId === "hover") return `<span class="mini-hover mini-${optionId}">Aa</span>`;
  if (decisionId === "focusMotion") return `<span class="mini-motion mini-${optionId}"><i></i><b></b></span>`;
  if (decisionId === "textBehavior") return `<span class="mini-text mini-${optionId}"><i></i><i></i><i></i></span>`;
  if (decisionId === "iconStyle") {
    const icons = {
      outline: `<svg viewBox="0 0 24 24"><path class="mini-icon-sheet" d="M6.5 3.5h8l3 3V20.5h-11z"/><path class="mini-icon-fold" d="M14.5 3.5v3h3"/><path class="mini-icon-lines" d="M9 11h6M9 14.5h5"/></svg>`,
      filled: `<svg viewBox="0 0 24 24"><path class="mini-icon-sheet" d="M6.5 3.5h8l3 3V20.5h-11z"/><path class="mini-icon-lines" d="M9 11h6M9 14.5h5"/></svg>`,
      duotone: `<svg viewBox="0 0 24 24"><path class="mini-icon-sheet" d="M6.5 3.5h8l3 3V20.5h-11z"/><path class="mini-icon-fold" d="M14.5 3.5v3h3"/><path class="mini-icon-lines" d="M9 11h6M9 14.5h5"/></svg>`
    };
    return `<span class="mini-icon mini-${optionId}">${icons[optionId]}</span>`;
  }
  if (decisionId === "navigation") return `<span class="mini-nav mini-${optionId}"><i></i><b></b><em></em></span>`;
  if (decisionId === "grid") return `<span class="mini-grid mini-${optionId}"><i></i><i></i><i></i></span>`;
  if (decisionId === "heroPriority") return `<span class="mini-priority mini-${optionId}"><i></i><b></b></span>`;
  if (decisionId === "heroStructure") return `<span class="mini-opening mini-${optionId}"><i></i><b></b><em></em></span>`;
  if (decisionId === "ctaModel") return `<span class="mini-actions mini-${optionId}"><i></i><b></b></span>`;
  if (decisionId === "contentRhythm") return `<span class="mini-rhythm mini-${optionId}"><i></i><i></i><i></i></span>`;
  if (decisionId === "sectionTransition") return `<span class="mini-transition mini-${optionId}"><i></i><b></b></span>`;
  return `<span class="mini-composition"><i></i><b></b></span>`;
}

function selectionMap(group) {
  return state[group];
}

function currentValueFor(decision, group) {
  return selectionMap(group)?.[decision.id];
}

function customAccentSwatch() {
  if (state.essentials.accent === "custom" && normalizeHex(state.essentials.customAccent)) return state.essentials.customAccent;
  return "conic-gradient(from 210deg, #ef4444, #f59e0b, #22c55e, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #ef4444)";
}

function accentMarkup(decision, group) {
  const current = currentValueFor(decision, group);
  return `<div class="accent-grid" role="presentation">
    ${decision.options.map((option) => {
      const selected = current === option.id;
      if (option.id === "custom") {
        return `<button class="accent-choice accent-custom ${selected ? "is-selected" : ""}" type="button" data-custom-accent style="--swatch:${customAccentSwatch()}"><span class="accent-dot" aria-hidden="true"></span><strong>Custom</strong></button>`;
      }
      return `<label class="accent-choice ${selected ? "is-selected" : ""}" style="--swatch:${accentPalettes[option.id].main}"><input type="radio" name="${decision.id}" value="${option.id}" ${selected ? "checked" : ""}><span class="accent-dot" aria-hidden="true"></span><strong>${option.label}</strong></label>`;
    }).join("")}
  </div>`;
}

function choiceMarkup(decision, group) {
  if (decision.compact === "swatches") return accentMarkup(decision, group);
  const current = currentValueFor(decision, group);
  return `<div class="choice-grid choice-count-${decision.options.length}">
    ${decision.options.map((option) => `<label class="choice-card ${current === option.id ? "is-selected" : ""}"><input type="radio" name="${decision.id}" value="${option.id}" ${current === option.id ? "checked" : ""}><span class="choice-visual" aria-hidden="true">${miniVisual(decision.id, option.id)}</span><span class="choice-copy"><strong>${option.label}</strong></span><span class="choice-check" aria-hidden="true">✓</span></label>`).join("")}
  </div>`;
}

function decisionMarkup(decision, number, group) {
  const selected = Object.hasOwn(selectionMap(group), decision.id);
  const required = group === "essentials";
  const prompt = selected ? "Selected by you" : required ? "Choose one" : "Not selected";
  const numberMarkup = group === "essentials" ? "" : `<span class="decision-number optional-mark">+</span>`;
  return `<fieldset class="decision-card customize-card" id="decision-${decision.id}" data-decision="${decision.id}" data-selection-group="${group}">
    <legend>${numberMarkup}<span class="decision-heading"><strong>${decision.title}</strong><span>${prompt}</span></span><button class="decision-clear" type="button" data-clear="${decision.id}" ${!selected || required ? "hidden" : ""}>Clear</button></legend>
    ${choiceMarkup(decision, group)}
  </fieldset>`;
}

function decisionList(ids) {
  return ids.map(decisionFor).filter(Boolean);
}

function optionalGroupMarkup(item, commonDecisions, templateDecisions) {
  if (!commonDecisions.length && !templateDecisions.length) return "";
  const selectedCount = Object.keys(state.optional).length + Object.keys(state.templateDetails).length;
  const commonMarkup = commonDecisions.length
    ? `<section class="optional-subgroup" aria-label="Common optional details">
        <header class="optional-subgroup-heading"><strong>Common</strong><span>Only selected details are exported.</span></header>
        ${commonDecisions.map((decision) => decisionMarkup(decision, null, "optional")).join("")}
      </section>`
    : "";
  const templateMarkup = templateDecisions.length
    ? `<section class="optional-subgroup template-optional-subgroup" aria-label="${item.name} optional details">
        <header class="optional-subgroup-heading"><strong>For ${item.name}</strong><span>Extra controls that matter for this direction.</span></header>
        ${templateDecisions.map((decision) => decisionMarkup(decision, null, "templateDetails")).join("")}
      </section>`
    : "";

  return `<details class="customize-group collapsed-customize-group" id="optional-details">
    <summary><span><strong>Optional Details</strong><small>${selectedCount} selected · common + template-specific refinements</small></span><i aria-hidden="true">+</i></summary>
    <div class="customize-group-body">${commonMarkup}${templateMarkup}</div>
  </details>`;
}

function renderCustomize() {
  const item = selectedTemplate();
  const openGroups = new Set([...elements.customizeList.querySelectorAll("details[open]")].map((node) => node.id));
  elements.customizeStep.hidden = !item;
  elements.exportPanel.hidden = !item;
  elements.mobilePreviewToggle.hidden = !item;
  if (!item) {
    elements.customizeList.replaceChildren();
    return;
  }

  const essentials = decisionList(essentialDecisionIds);
  const optional = decisionList(optionalDecisionIds);
  const templateDetails = templateDetailControls(item);
  elements.customizeList.innerHTML = `
    <section class="customize-group essentials-group" aria-labelledby="essentials-heading">
      <header class="customize-group-heading"><div><strong id="essentials-heading">Essentials</strong><span>5 choices required</span></div><p>Preview uses template defaults until you choose.</p></header>
      <div class="customize-group-body">${essentials.map((decision, number) => decisionMarkup(decision, number, "essentials")).join("")}</div>
    </section>
    ${optionalGroupMarkup(item, optional, templateDetails)}`;
  for (const groupId of openGroups) elements.customizeList.querySelector(`#${groupId}`)?.setAttribute("open", "");
  bindCustomizeControls();
  updateEssentialCount();
}

function bindCustomizeControls() {
  elements.customizeList.querySelectorAll('.decision-card input[type="radio"]').forEach((input) => {
    input.addEventListener("change", () => setDecision(input.closest("[data-selection-group]").dataset.selectionGroup, input.name, input.value));
  });
  elements.customizeList.querySelectorAll("[data-clear]").forEach((button) => {
    button.addEventListener("click", () => clearDecision(button.closest("[data-selection-group]").dataset.selectionGroup, button.dataset.clear));
  });
  elements.customizeList.querySelectorAll("[data-custom-accent]").forEach((button) => button.addEventListener("click", openCustomColorDialog));
}

function setDecision(group, decisionId, value) {
  const decision = decisionFor(decisionId);
  if (!decision) return;
  state[group] = { ...state[group], [decisionId]: value };
  if (decisionId === "colorMode") state.previewMode = value === "dark" ? "dark" : "light";
  renderCustomize();
  updateExportPanel();
  updatePreview();
}

function clearDecision(group, decisionId) {
  const next = { ...state[group] };
  delete next[decisionId];
  if (decisionId === "accent") delete next.customAccent;
  state[group] = next;
  const templateMode = selectedTemplate()?.previewDefaults.colorMode;
  if (decisionId === "colorMode") state.previewMode = templateMode === "dark" ? "dark" : "light";
  renderCustomize();
  updateExportPanel();
  updatePreview();
}

function updateEssentialCount() {
  const progress = getEssentialProgress(state.essentials);
  elements.overrideCount.textContent = `${progress.selected} / ${progress.total} Essentials selected`;
}

function updateTextStressDemo(textBehavior) {
  const heading = document.querySelector(".text-stress h3");
  if (!heading) return;
  heading.textContent = "A heading with enough words to reveal how wrapping actually feels in a real interface.";
  heading.classList.remove("text-pretty-fallback");
  if (textBehavior === "pretty" && typeof CSS !== "undefined" && !CSS.supports("text-wrap", "pretty")) {
    heading.innerHTML = "A heading with enough words to reveal how wrapping actually feels<br>in a real interface.";
    heading.classList.add("text-pretty-fallback");
  }
}

function updatePreview() {
  const item = selectedTemplate();
  const resolvedPreview = previewStyle();
  const config = getPreviewConfig(resolvedPreview ?? {}, state.previewMode);
  for (const [property, value] of Object.entries(config.vars)) elements.previewRoot.style.setProperty(property, value);
  elements.previewRoot.dataset.hover = config.attributes.hover;
  elements.previewRoot.dataset.motion = config.attributes.motion;
  elements.previewRoot.dataset.icon = config.attributes.icon;
  elements.previewRoot.dataset.text = config.attributes.text;
  elements.previewRoot.dataset.mode = config.mode;
  updateTextStressDemo(config.attributes.text);

  elements.previewEmpty.hidden = Boolean(item);
  elements.pagePreview.innerHTML = item ? renderPagePreview(item, resolvedPreview) : "";
  elements.previewModeSwitch.hidden = !item || config.selected.colorMode !== "both";
  elements.previewModeSwitch.querySelectorAll("[data-mode]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.mode === state.previewMode)));
}

function updateExportPanel() {
  const item = selectedTemplate();
  if (!item) return;
  const progress = getEssentialProgress(state.essentials);
  const entries = [
    ...Object.entries(state.essentials).filter(([id]) => id !== "customAccent").map(([id, value]) => ({ id, value, group: "Essential" })),
    ...Object.entries(state.optional).map(([id, value]) => ({ id, value, group: "Optional" })),
    ...Object.entries(state.templateDetails).map(([id, value]) => ({ id, value, group: "Optional" }))
  ];
  elements.exportKicker.textContent = `${progress.selected} / ${progress.total} Essentials selected`;
  elements.exportTitle.textContent = progress.complete ? "Your DESIGN.md is ready." : "Complete the 5 Essentials to export.";
  elements.exportStatus.textContent = progress.complete
    ? "The export includes template structure and only the choices you explicitly selected."
    : "Template structure is set. Choose every Essential to unlock your DESIGN.md.";
  elements.exportButton.disabled = !progress.complete;
  elements.selectionSummary.innerHTML = `<span class="summary-chip static-chip"><span>Template</span><strong>${item.name}</strong></span>${entries.map(({ id, value, group }) => `<button type="button" class="summary-chip" data-edit="${id}"><span>${group}</span><strong>${labelFor(id, value)}</strong></button>`).join("")}`;
  elements.selectionSummary.querySelectorAll("[data-edit]").forEach((button) => button.addEventListener("click", () => {
    const target = document.querySelector(`#decision-${button.dataset.edit}`);
    target?.closest("details")?.setAttribute("open", "");
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
    target?.querySelector("input, button")?.focus({ preventScroll: true });
  }));
}

function setPreviewTab(tab) {
  state.previewTab = tab;
  elements.previewTabs.forEach((button) => button.setAttribute("aria-selected", String(button.dataset.previewTab === tab)));
  elements.previewViews.forEach((view) => {
    const active = view.dataset.previewView === tab;
    view.hidden = !active;
    view.classList.toggle("is-active", active);
  });
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2500);
}

function exportDesign() {
  if (!getEssentialProgress(state.essentials).complete) return;
  const resolvedExport = exportStyle();
  if (!resolvedExport) return;
  try {
    const content = generateDesignMarkdown(resolvedExport);
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "DESIGN.md";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    showToast("DESIGN.md downloaded.");
  } catch (error) {
    console.error(error);
    showToast("Could not export DESIGN.md in this browser.");
  }
}

function shade(hex, whiteAmount) {
  const normalized = normalizeHex(hex);
  if (!normalized) return hex;
  const rgb = [1, 3, 5].map((start) => Number.parseInt(normalized.slice(start, start + 2), 16));
  const mixed = rgb.map((channel) => Math.round(channel + (255 - channel) * whiteAmount));
  return `#${mixed.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

function themePaletteMarkup() {
  return THEME_COLORS.map((base) => `<div class="color-theme-column">${[0.82, 0.62, 0.38, 0.15, 0].map((amount) => shade(base, amount)).map((color) => `<button type="button" class="color-swatch" data-color="${color}" style="--picker-color:${color}" aria-label="${color}"></button>`).join("")}</div>`).join("");
}

function ensureCustomColorDialog() {
  if (document.querySelector("#custom-color-dialog")) return;
  const dialog = document.createElement("dialog");
  dialog.id = "custom-color-dialog";
  dialog.className = "color-dialog";
  dialog.innerHTML = `<form method="dialog" class="color-dialog-card" id="custom-color-form"><div class="color-dialog-header"><div><strong>Custom accent</strong><span>Pick a color for the preview and DESIGN.md.</span></div><button type="button" class="color-dialog-close" data-color-cancel aria-label="Close">×</button></div><section class="color-picker-section"><h3>Theme colors</h3><div class="color-theme-grid">${themePaletteMarkup()}</div></section><section class="color-picker-section"><h3>Standard colors</h3><div class="color-standard-grid">${STANDARD_COLORS.map((color) => `<button type="button" class="color-swatch" data-color="${color}" style="--picker-color:${color}" aria-label="${color}"></button>`).join("")}</div></section><section class="color-picker-section more-colors-row"><div><h3>More colors</h3><span>Use the system picker or enter a HEX value.</span></div><input id="custom-native-color" type="color" value="${DEFAULT_CUSTOM_ACCENT}" aria-label="Open system color picker"></section><div class="custom-color-value"><span class="custom-color-preview" id="custom-color-preview" aria-hidden="true"></span><label for="custom-color-hex">HEX</label><input id="custom-color-hex" type="text" inputmode="text" value="${DEFAULT_CUSTOM_ACCENT}" maxlength="7" autocomplete="off" spellcheck="false"></div><div class="color-dialog-actions"><button type="button" class="dialog-secondary" data-color-cancel>Cancel</button><button type="submit" class="dialog-primary">Use color</button></div></form>`;
  document.body.append(dialog);

  const hexInput = dialog.querySelector("#custom-color-hex");
  const nativeInput = dialog.querySelector("#custom-native-color");
  const preview = dialog.querySelector("#custom-color-preview");
  const renderDraft = (value) => {
    const normalized = normalizeHex(value);
    if (!normalized) return false;
    state.customColorDraft = normalized;
    hexInput.value = normalized;
    nativeInput.value = normalized;
    preview.style.background = normalized;
    dialog.querySelectorAll("[data-color]").forEach((button) => button.classList.toggle("is-current", button.dataset.color.toUpperCase() === normalized));
    return true;
  };
  dialog.querySelectorAll("[data-color]").forEach((button) => button.addEventListener("click", () => renderDraft(button.dataset.color)));
  nativeInput.addEventListener("input", () => renderDraft(nativeInput.value));
  hexInput.addEventListener("input", () => {
    const normalized = normalizeHex(hexInput.value);
    hexInput.classList.toggle("is-invalid", !normalized);
    if (normalized) renderDraft(normalized);
  });
  dialog.querySelectorAll("[data-color-cancel]").forEach((button) => button.addEventListener("click", () => dialog.close()));
  dialog.querySelector("#custom-color-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const normalized = normalizeHex(hexInput.value);
    if (!normalized) {
      hexInput.classList.add("is-invalid");
      hexInput.focus();
      return;
    }
    state.essentials = { ...state.essentials, accent: "custom", customAccent: normalized };
    dialog.close();
    renderCustomize();
    updateExportPanel();
    updatePreview();
  });
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  dialog.renderDraft = renderDraft;
}

function openCustomColorDialog() {
  ensureCustomColorDialog();
  const dialog = document.querySelector("#custom-color-dialog");
  dialog.renderDraft(normalizeHex(state.essentials.customAccent) ?? state.customColorDraft ?? DEFAULT_CUSTOM_ACCENT);
  dialog.showModal();
  dialog.querySelector("#custom-color-hex")?.focus();
}

for (const button of elements.previewTabs) button.addEventListener("click", () => setPreviewTab(button.dataset.previewTab));
elements.previewModeSwitch.querySelectorAll("[data-mode]").forEach((button) => button.addEventListener("click", () => { state.previewMode = button.dataset.mode; updatePreview(); }));
elements.exportButton.addEventListener("click", exportDesign);
elements.mobilePreviewToggle.addEventListener("click", () => { elements.previewPanel.classList.add("mobile-open"); document.body.classList.add("preview-open"); elements.mobilePreviewClose.focus(); });
elements.mobilePreviewClose.addEventListener("click", () => { elements.previewPanel.classList.remove("mobile-open"); document.body.classList.remove("preview-open"); elements.mobilePreviewToggle.focus(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && elements.previewPanel.classList.contains("mobile-open")) elements.mobilePreviewClose.click(); });

ensureCustomColorDialog();
renderDomains();
renderTemplates();
renderCustomize();
updatePreview();
