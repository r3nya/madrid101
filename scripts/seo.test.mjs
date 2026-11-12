// Run after npm run build: npm run test:seo
import assert from "node:assert/strict";
import { existsSync, globSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parseStringPromise } from "xml2js";
import { describe, it } from "vitest";

const enabled = process.env.SEO_TEST === "1";
const dist = new URL("../dist/", import.meta.url);
const origin = "https://madrid101.xyz";
const files = enabled ? globSync("**/*.html", { cwd: fileURLToPath(dist) }).sort() : [];

// Compression emits both quoted and unquoted attributes, in arbitrary order.
function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([^\s=<>/]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)].map(
      ([, name, double, single, bare]) => [
        name.toLowerCase(),
        (double ?? single ?? bare).replace(/&amp;/g, "&"),
      ],
    ),
  );
}

const pages = files.map((file) => {
  const html = readFileSync(new URL(file, dist), "utf8");
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const tags = (name) => [...markup.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))];
  const meta = tags("meta").map(([tag]) => attributes(tag));
  const links = tags("link").map(([tag]) => attributes(tag));
  const robots = meta
    .filter((tag) => tag.name?.toLowerCase() === "robots")
    .flatMap((tag) => (tag.content ?? "").toLowerCase().split(/[\s,]+/));
  return {
    file,
    html,
    tags,
    meta,
    links,
    robots,
    canonical: links.filter((tag) => tag.rel === "canonical"),
    redirect: meta.some((tag) => tag["http-equiv"]?.toLowerCase() === "refresh"),
    notFound: file === "404.html" || file === "404/index.html",
  };
});

function checkAsset(value, label) {
  if (Array.isArray(value)) return value.forEach((item) => checkAsset(item, label));
  if (value && typeof value === "object") {
    const url = value.url ?? value.contentUrl ?? value["@id"];
    assert.ok(url, `${label}: image object needs a URL`);
    return checkAsset(url, label);
  }
  assert.equal(typeof value, "string", `${label}: expected an image URL`);
  const url = new URL(value, `${origin}/`);
  assert.equal(url.origin, origin, `${label}: expected an asset on the canonical origin`);
  const asset = new URL(`.${url.pathname}`, dist);
  assert.ok(existsSync(asset), `${label}: missing dist${url.pathname}`);
}

function checkSchema(node, page) {
  if (!node || typeof node !== "object") return;
  const types = [node["@type"]].flat();
  if (page.notFound) {
    assert.ok(!types.includes("Article"), `${page.file}: 404 must not have Article markup`);
  }
  for (const [key, value] of Object.entries(node)) {
    if (key === "image" || key === "logo") checkAsset(value, `${page.file}: JSON-LD ${key}`);
    else if (typeof value === "object") {
      if (Array.isArray(value)) value.forEach((item) => checkSchema(item, page));
      else checkSchema(value, page);
    }
  }
}

describe.skipIf(!enabled)("built SEO artifacts (requires npm run build)", () => {
  it("has built content and a 404 page", () => {
    assert.ok(files.includes("index.html"), "dist/index.html missing; run npm run build first");
    assert.ok(
      pages.some((page) => page.notFound),
      "dist/404.html missing",
    );
  });

  for (const page of pages.filter((page) => !page.redirect)) {
    it(page.file, () => {
      const { file, canonical, tags, links, meta, robots, notFound } = page;
      assert.equal(canonical.length, 1, `${file}: expected exactly one canonical`);
      const route = file.replace(/index\.html$/, "").replace(/\.html$/, "/");
      assert.equal(canonical[0].href, `${origin}/${route}`, `${file}: canonical URL`);
      assert.equal(attributes(tags("html")[0]?.[0] ?? "").lang, "ru", `${file}: html lang`);
      assert.equal(tags("h1").length, 1, `${file}: expected exactly one H1`);
      for (const [positive, negative] of [
        ["index", "noindex"],
        ["follow", "nofollow"],
      ]) {
        const directives = [
          ...robots,
          ...(robots.includes("none") ? ["noindex", "nofollow"] : []),
          ...(robots.includes("all") ? ["index", "follow"] : []),
        ];
        assert.ok(
          !(directives.includes(positive) && directives.includes(negative)),
          `${file}: conflicting robots ${positive}/${negative}`,
        );
      }
      if (file !== "index.html") {
        assert.ok(
          !links.some((tag) => tag.hreflang && tag.href === `${origin}/`),
          `${file}: homepage must not be an article's hreflang alternate`,
        );
      }
      if (notFound) {
        assert.ok(robots.includes("noindex") || robots.includes("none"), `${file}: needs noindex`);
      } else {
        assert.ok(
          meta.some((tag) => tag.name === "description" && tag.content?.trim()),
          `${file}: missing description`,
        );
        assert.ok(
          meta.some((tag) => tag.property === "og:image"),
          `${file}: missing og:image`,
        );
      }
      for (const tag of meta.filter((tag) => tag.property === "og:image")) {
        checkAsset(tag.content, `${file}: og:image`);
      }
      const schemas = [];
      for (const [, attrs, json] of page.html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
        if (attributes(attrs).type === "application/ld+json") {
          try {
            const schema = JSON.parse(json);
            schemas.push(...[schema].flat());
            for (const node of [schema].flat()) checkSchema(node, page);
          } catch (error) {
            throw new Error(`${file}: JSON-LD: ${error.message}`, { cause: error });
          }
        }
      }
      if (!notFound) {
        const homepage = file === "index.html";
        const type = homepage ? "WebSite" : "Article";
        const schema = schemas.find((node) => node["@type"] === type);
        assert.ok(schema, `${file}: missing ${type} JSON-LD`);
        assert.equal(schema.url, canonical[0].href, `${file}: JSON-LD canonical`);
        if (homepage) assert.equal(schema.name, "Madrid 101", `${file}: site name`);
        if (schema.author?.name === "Madrid 101") {
          assert.equal(schema.author["@type"], "Organization", `${file}: site author type`);
        }
        const ogUrl = meta.filter((tag) => tag.property === "og:url");
        assert.equal(ogUrl.length, 1, `${file}: expected exactly one og:url`);
        assert.equal(ogUrl[0].content, canonical[0].href, `${file}: Open Graph canonical`);
        const ogType = meta.filter((tag) => tag.property === "og:type");
        assert.equal(ogType.length, 1, `${file}: expected exactly one og:type`);
        assert.equal(ogType[0].content, homepage ? "website" : "article", `${file}: og:type`);
      }
    });
  }

  it("sitemap matches all canonical indexable pages, excluding redirects and 404", async () => {
    async function readSitemap(url) {
      assert.equal(url.origin, origin, `sitemap must use ${origin}: ${url.href}`);
      const xml = await parseStringPromise(readFileSync(new URL(`.${url.pathname}`, dist), "utf8"));
      if (xml.sitemapindex) {
        const children = await Promise.all(
          xml.sitemapindex.sitemap.map((item) => readSitemap(new URL(item.loc[0]))),
        );
        return children.flat();
      }
      assert.ok(xml.urlset, `${url.pathname}: expected sitemap urlset`);
      return (xml.urlset.url ?? []).map((item) => item.loc[0]);
    }
    const urls = await readSitemap(new URL("/sitemap-index.xml", origin));
    assert.equal(new Set(urls).size, urls.length, "sitemap contains duplicate URLs");
    const expected = pages
      .filter((page) => !page.redirect && !page.notFound)
      .filter((page) => !page.robots.includes("noindex") && !page.robots.includes("none"))
      .map((page) => page.canonical[0]?.href);
    assert.deepEqual(
      urls.sort(),
      expected.sort(),
      "sitemap differs from canonical indexable pages",
    );
  });
});
