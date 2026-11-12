// Run after npm run build: npm run test:seo
import assert from "node:assert/strict";
import { globSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parse } from "parse5";
import { describe, it } from "vitest";

const enabled = process.env.SEO_TEST === "1";
const dist = new URL("../dist/", import.meta.url);
const origin = "https://madrid101.xyz";
const read = (path) => readFileSync(new URL(path, dist), "utf8");
const attrs = (node) => Object.fromEntries(node.attrs.map(({ name, value }) => [name, value]));

function elements(node, found = []) {
  if (node.tagName) found.push(node);
  for (const child of node.childNodes ?? []) elements(child, found);
  return found;
}

const pages = (enabled ? globSync("**/*.html", { cwd: fileURLToPath(dist) }) : []).map((file) => {
  const nodes = elements(parse(read(file)));
  const tags = (name) => nodes.filter((node) => node.tagName === name);
  const meta = tags("meta").map(attrs);
  return {
    file,
    canonical: tags("link")
      .map(attrs)
      .filter((tag) => tag.rel === "canonical")
      .map((tag) => tag.href),
    ogUrl: meta.filter((tag) => tag.property === "og:url").map((tag) => tag.content),
    noindex: meta.some((tag) => tag.name === "robots" && /noindex|none/i.test(tag.content)),
    redirect: meta.some((tag) => tag["http-equiv"]?.toLowerCase() === "refresh"),
    notFound: /^404(\/index)?\.html$/.test(file),
    schemas: tags("script")
      .filter((node) => attrs(node).type === "application/ld+json")
      .map((node) => node.childNodes.map((child) => child.value).join("")),
  };
});
const contentPages = pages.filter((page) => !page.redirect && !page.notFound);

describe.skipIf(!enabled)("built SEO artifacts (requires npm run build)", () => {
  it("has the homepage and a 404 page", () => {
    assert.ok(pages.some((page) => page.file === "index.html"));
    assert.ok(pages.some((page) => page.notFound));
  });

  it.each(pages.filter((page) => page.notFound))("$file is noindex without JSON-LD", (page) => {
    assert.ok(page.noindex);
    assert.deepEqual(page.schemas, []);
  });

  it.each(contentPages)("$file", ({ file, canonical, ogUrl, schemas }) => {
    const route = file.replace(/index\.html$/, "").replace(/\.html$/, "/");
    assert.deepEqual(canonical, [`${origin}/${route}`]);
    assert.deepEqual(ogUrl, canonical);
    // Middleware pushes the page schema first, then breadcrumbs (not on the homepage).
    const [main, breadcrumb, ...rest] = schemas.map((json) => JSON.parse(json));
    assert.equal(main.url, canonical[0]);
    assert.deepEqual(rest, []);
    if (file === "index.html") return assert.equal(breadcrumb, undefined);
    const parents = contentPages
      .map((page) => page.canonical[0])
      .filter((url) => canonical[0].startsWith(url))
      .sort((a, b) => a.length - b.length);
    assert.deepEqual(
      breadcrumb.itemListElement.map((item) => item.item),
      parents,
    );
  });

  it("sitemap lists exactly the indexable pages", () => {
    const locs = (path) => [...read(path).matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]));
    const urls = locs("sitemap-index.xml").flatMap((sitemap) => {
      assert.equal(sitemap.origin, origin);
      return locs(`.${sitemap.pathname}`).map((url) => url.href);
    });
    const expected = contentPages.filter((page) => !page.noindex).map((page) => page.canonical[0]);
    assert.deepEqual(urls.sort(), expected.sort());
  });
});
