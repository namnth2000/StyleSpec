import test from "node:test";
import assert from "node:assert/strict";
import { domains, templates, resolvePreviewStyle } from "../src/data.js";
import { renderPagePreview, renderTemplateThumbnail, previewKinds } from "../src/preview.js";

const ids = ["product-console", "personal-archive", "world-portal", "digital-invitation", "search-directory"];
test("five archetypes have unique composition and working preview renderers", () => {
  const compositions = new Set();
  for (const id of ids) {
    const template = templates.find((item) => item.id === id);
    assert.ok(template, id);
    assert.ok(domains.some((domain) => domain.id === template.domain));
    assert.ok(previewKinds.includes(id));
    assert.ok(renderPagePreview(template, resolvePreviewStyle(template)).includes('class="new-arch'));
    assert.ok(renderTemplateThumbnail(template).includes("arch-thumb"));
    assert.equal(template.research.license, "Original");
    compositions.add(JSON.stringify(template.composition));
  }
  assert.equal(compositions.size, ids.length);
});
