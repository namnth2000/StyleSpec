import test from "node:test";
import assert from "node:assert/strict";

import {
  clearOverride,
  decisions,
  domains,
  essentialDecisionIds,
  getEssentialProgress,
  getTemplateById,
  getTemplatesForDomain,
  optionalDecisionIds,
  resolveExportStyle,
  resolvePreviewStyle,
  templateDetailControls,
  templates
} from "../src/data.js";
import { generateDesignMarkdown, getPreviewConfig } from "../src/design.js";
import { previewKinds, renderPagePreview, renderTemplateThumbnail } from "../src/preview.js";

const completeEssentials = {
  colorMode: "light",
  accent: "blue",
  typography: "sans",
  radius: "slight",
  density: "normal"
};

test("V2.x defines six domains with three active templates each", () => {
  assert.deepEqual(domains.map((domain) => domain.id), ["tool", "software", "portfolio", "wedding", "game", "blog"]);
  assert.equal(templates.length, 18);
  for (const domain of domains) assert.equal(getTemplatesForDomain(domain.id).length, 3);
});

test("all requested templates are present and lookup is stable", () => {
  assert.deepEqual(templates.map((template) => template.name), [
    "Northstar - Soft Utility", "Workspace", "Editorial Tool",
    "Product-first", "Technical Console", "Narrative Launch",
    "Project Index", "Case Study Grid", "Personal Editorial",
    "Editorial Invitation", "Paper Collage", "Photo Journal",
    "Arcade Cabinet", "Cinematic Game", "Retro Console",
    "Publication Index", "Longform Journal", "Visual Magazine"
  ]);
  assert.equal(getTemplateById("workspace")?.name, "Workspace");
  assert.equal(getTemplateById("missing"), undefined);
});

test("every template has structure, visual preview defaults, and valid optional detail metadata", () => {
  const validDecisionIds = new Set(decisions.map((decision) => decision.id));
  assert.deepEqual(essentialDecisionIds, ["colorMode", "accent", "typography", "radius", "density"]);
  assert.deepEqual(optionalDecisionIds, ["neutralTone", "surface", "hover", "focusMotion", "textBehavior", "iconStyle"]);
  for (const template of templates) {
    assert.ok(Object.keys(template.composition).length >= 6);
    assert.ok(Object.keys(template.previewDefaults).length >= 8);
    assert.ok(template.preview.kind);
    assert.ok(template.research.provenance);
    assert.ok(template.sections.length >= 2);
    for (const detail of template.templateDetails) {
      assert.ok(validDecisionIds.has(detail.id), `${template.id} has unknown detail ${detail.id}`);
      for (const optionId of detail.options) {
        const decision = decisions.find((item) => item.id === detail.id);
        assert.ok(decision.options.some((item) => item.id === optionId), `${template.id} exposes unknown ${detail.id} option ${optionId}`);
      }
    }
    assert.equal(templateDetailControls(template).length, template.templateDetails.length);
  }
});

test("page previews have one registered structural renderer per template", () => {
  assert.equal(new Set(previewKinds).size, 18);
  assert.equal(new Set(templates.map((template) => template.preview.kind)).size, 18);
  for (const template of templates) {
    const preview = resolvePreviewStyle(template);
    assert.match(renderPagePreview(template, preview), new RegExp(`template-${template.preview.kind}`));
    assert.match(renderTemplateThumbnail(template), new RegExp(`thumbnail-${template.preview.kind}`));
  }
});

test("five Essentials start unselected while template preview defaults still resolve", () => {
  const editorial = getTemplateById("editorial-tool");
  const progress = getEssentialProgress({});
  const preview = resolvePreviewStyle(editorial);
  const exported = resolveExportStyle(editorial);
  assert.equal(progress.selected, 0);
  assert.equal(progress.complete, false);
  assert.equal(preview.visual.accent, "rose");
  assert.equal(preview.visual.typography, "serif");
  assert.deepEqual(exported.visual, {});
});

test("selecting values equal to preview defaults still counts as explicit", () => {
  const northstar = getTemplateById("northstar-soft-utility");
  const selections = {
    colorMode: northstar.previewDefaults.colorMode,
    accent: northstar.previewDefaults.accent,
    typography: northstar.previewDefaults.typography,
    radius: northstar.previewDefaults.radius,
    density: northstar.previewDefaults.density
  };
  assert.deepEqual(getEssentialProgress(selections), { selected: 5, total: 5, complete: true, missing: [] });
  assert.deepEqual(resolveExportStyle(northstar, { essentials: selections }).visual, selections);
});

test("export readiness requires all five Essentials", () => {
  assert.equal(getEssentialProgress({ ...completeEssentials, density: undefined }).complete, false);
  assert.equal(getEssentialProgress(completeEssentials).complete, true);
});

test("optional values stay out of export until selected and clearing restores preview fallback", () => {
  const workspace = getTemplateById("workspace");
  const basePreview = resolvePreviewStyle(workspace, { essentials: completeEssentials });
  const selected = { surface: "elevated" };
  const selectedPreview = resolvePreviewStyle(workspace, { essentials: completeEssentials, optional: selected });
  const selectedExport = generateDesignMarkdown(resolveExportStyle(workspace, { essentials: completeEssentials, optional: selected }));
  const cleared = clearOverride(selected, "surface");
  const clearedPreview = resolvePreviewStyle(workspace, { essentials: completeEssentials, optional: cleared });
  const clearedExport = generateDesignMarkdown(resolveExportStyle(workspace, { essentials: completeEssentials, optional: cleared }));
  assert.equal(basePreview.visual.surface, workspace.previewDefaults.surface);
  assert.equal(selectedPreview.visual.surface, "elevated");
  assert.ok(selectedExport.includes("Surface treatment: **Elevated**"));
  assert.equal(clearedPreview.visual.surface, workspace.previewDefaults.surface);
  assert.ok(!clearedExport.includes("Surface treatment"));
});

test("template-specific selections resolve and invalid or unavailable values are ignored", () => {
  const workspace = getTemplateById("workspace");
  const selected = resolvePreviewStyle(workspace, { templateDetails: { navigation: "top", grid: "editorial" } });
  const invalid = resolvePreviewStyle(workspace, { templateDetails: { navigation: "hidden", grid: "freeform", heroPriority: "copy-first" } });
  assert.equal(selected.composition.navigation, "top");
  assert.equal(selected.composition.grid, "editorial");
  assert.equal(invalid.composition.navigation, workspace.composition.navigation);
  assert.equal(invalid.composition.grid, workspace.composition.grid);
  assert.equal(invalid.composition.heroPriority, workspace.composition.heroPriority);
});

test("template structure exports while preview fallback values never leak", () => {
  const sparseTemplate = {
    id: "sparse",
    name: "Sparse Direction",
    domain: "tool",
    composition: { pageStructure: "workspace" },
    previewDefaults: { accent: "blue", neutralTone: "cool", surface: "border" },
    templateDetails: [],
    sections: []
  };
  const preview = getPreviewConfig(resolvePreviewStyle(sparseTemplate), "light");
  const output = generateDesignMarkdown(resolveExportStyle(sparseTemplate, { essentials: completeEssentials }));
  assert.equal(preview.selected.surface, "border");
  assert.ok(output.includes("Page structure: **Workspace**"));
  assert.ok(!output.includes("Neutral tone"));
  assert.ok(!output.includes("Surface treatment"));
});

test("V2.x templates export their selected direction structure without preview-only defaults", () => {
  const cases = [
    ["arcade-cabinet", "Game", "Arcade cabinet"],
    ["cinematic-game", "Game", "Cinematic game"],
    ["retro-console", "Game", "Retro console"],
    ["publication-index", "Blog / Editorial", "Publication index"],
    ["longform-journal", "Blog / Editorial", "Longform journal"],
    ["visual-magazine", "Blog / Editorial", "Visual magazine"]
  ];
  for (const [templateId, domainName, pageStructure] of cases) {
    const template = getTemplateById(templateId);
    const output = generateDesignMarkdown(resolveExportStyle(template, { essentials: completeEssentials }));
    assert.ok(output.includes(`Direction: **${template.name}**`));
    assert.ok(output.includes(`Domain: **${domainName}**`));
    assert.ok(output.includes(`Page structure: **${pageStructure}**`));
    assert.ok(!output.includes("Neutral tone"));
    assert.ok(!output.includes("Surface treatment"));
    assert.ok(!output.includes("Icon style"));
  }
});

test("research and license metadata never appear in DESIGN.md", () => {
  const template = getTemplateById("paper-collage");
  const output = generateDesignMarkdown(resolveExportStyle(template, { essentials: completeEssentials }));
  assert.ok(!output.includes(template.research.provenance));
  assert.ok(!output.includes(template.research.license));
  assert.ok(!output.includes("reviewedAt"));
});
