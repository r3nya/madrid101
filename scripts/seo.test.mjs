// Run after npm run build: npm run test:seo
import assert from "node:assert/strict";
import { existsSync, globSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parse } from "parse5";
import { parseStringPromise } from "xml2js";
import { describe, it } from "vitest";

const enabled = process.env.SEO_TEST === "1";
const dist = new URL("../dist/", import.meta.url);
const origin = "https://madrid101.xyz";
const files = enabled ? globSync("**/*.html", { cwd: fileURLToPath(dist) }).sort() : [];

function attributes(node) {
  return Object.fromEntries(node.attrs.map(({ name, value }) => [name, value]));
}

function parseHtml(html) {
  const elements = [];
  function visit(node) {
    if (node.tagName) elements.push(node);
    for (const child of node.childNodes ?? []) visit(child);
  }
  visit(parse(html));
  return (name) => elements.filter((node) => node.tagName === name);
}

describe("HTML metadata parsing", () => {
  it.each(["</script>", "</SCRIPT >", "</script\n>", "</script foo>", "</script/>"])(
    "ignores fake headings in scripts and comments with %s",
    (closingTag) => {
      const tags = parseHtml(`<!doctype html><html lang="ru"><head>
        <script type="application/ld+json" data-note=">">{"headline":"<h1>fake</h1>"}${closingTag}
        <!-- <h1>comment</h1> -->
        </head><body><h1>Real heading</h1></body></html>`);
      assert.equal(tags("h1").length, 1);
      assert.equal(tags("script").length, 1);
      assert.deepEqual(attributes(tags("script")[0]), {
        type: "application/ld+json",
        "data-note": ">",
      });
    },
  );

  it("keeps real elements between scripts and ignores markup in raw text", () => {
    const tags = parseHtml(`<script>let fake = '<meta name="robots" content="noindex">';</script >
      <h1>Real heading</h1><script>let fake = '<h1>fake</h1>';</script>
      <!-- <h1>comment</h1> --><style>/* <h1>fake</h1> */</style>
      <meta name=description content="a &quot;quote&quot; &amp; >">`);
    assert.equal(tags("h1").length, 1);
    assert.equal(tags("script").length, 2);
    assert.deepEqual(tags("meta").map(attributes), [
      { name: "description", content: 'a "quote" & >' },
    ]);
  });
});

const pages = files.map((file) => {
  const html = readFileSync(new URL(file, dist), "utf8");
  const tags = parseHtml(html);
  const meta = tags("meta").map(attributes);
  const links = tags("link").map(attributes);
  const robots = meta
    .filter((tag) => tag.name?.toLowerCase() === "robots")
    .flatMap((tag) => (tag.content ?? "").toLowerCase().split(/[\s,]+/));
  return {
    file,
    tags,
    meta,
    links,
    robots,
    canonical: links.filter((tag) => tag.rel === "canonical"),
    redirect: meta.some((tag) => tag["http-equiv"]?.toLowerCase() === "refresh"),
    notFound: file === "404.html" || file === "404/index.html",
  };
});
const contentPages = pages.filter((page) => !page.redirect && !page.notFound);

function checkAsset(value, label) {
  assert.equal(typeof value, "string", `${label}: expected an image URL`);
  const url = new URL(value, `${origin}/`);
  assert.equal(url.origin, origin, `${label}: expected an asset on the canonical origin`);
  const asset = new URL(`.${url.pathname}`, dist);
  assert.ok(existsSync(asset), `${label}: missing dist${url.pathname}`);
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
      assert.equal(attributes(tags("html")[0]).lang, "ru", `${file}: html lang`);
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
      for (const script of tags("script")) {
        if (attributes(script).type === "application/ld+json") {
          try {
            const json = script.childNodes.map((node) => node.value ?? "").join("");
            schemas.push(JSON.parse(json));
          } catch (error) {
            throw new Error(`${file}: JSON-LD: ${error.message}`, { cause: error });
          }
        }
      }
      if (notFound) {
        assert.equal(schemas.length, 0, `${file}: 404 must not have JSON-LD`);
      } else {
        const homepage = file === "index.html";
        const type = homepage ? "WebSite" : "Article";
        assert.equal(schemas.length, homepage ? 1 : 2, `${file}: JSON-LD count`);
        for (const schema of schemas) {
          assert.equal(schema["@context"], "https://schema.org", `${file}: JSON-LD context`);
        }
        const schema = schemas.find((node) => node["@type"] === type);
        assert.ok(schema, `${file}: missing ${type} JSON-LD`);
        assert.equal(schema.url, canonical[0].href, `${file}: JSON-LD canonical`);
        assert.equal(
          schema.image,
          meta.find((tag) => tag.property === "og:image").content,
          `${file}: JSON-LD image matches Open Graph`,
        );
        checkAsset(schema.publisher?.logo?.url, `${file}: publisher logo`);
        if (homepage) {
          assert.equal(schema.name, "Madrid 101", `${file}: site name`);
        } else {
          assert.ok(schema.headline?.trim(), `${file}: missing headline`);
          assert.ok(schema.author?.name?.trim(), `${file}: missing author`);
          assert.equal(
            schema.author["@type"],
            schema.author.name === "Madrid 101" ? "Organization" : "Person",
            `${file}: author type`,
          );
          for (const field of ["datePublished", "dateModified"]) {
            assert.match(
              schema[field],
              /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
              `${file}: ${field}`,
            );
          }
          const breadcrumb = schemas.find((node) => node["@type"] === "BreadcrumbList");
          assert.ok(breadcrumb, `${file}: missing BreadcrumbList`);
          const expected = contentPages
            .map((parent) => parent.canonical[0].href)
            .filter((url) => canonical[0].href.startsWith(url))
            .sort((a, b) => a.length - b.length);
          assert.deepEqual(
            breadcrumb.itemListElement.map((item) => item.item),
            expected,
            `${file}: breadcrumb URLs`,
          );
          breadcrumb.itemListElement.forEach((item, index) => {
            assert.equal(item["@type"], "ListItem", `${file}: breadcrumb type`);
            assert.equal(item.position, index + 1, `${file}: breadcrumb position`);
            assert.ok(item.name?.trim(), `${file}: breadcrumb name`);
          });
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
    const expected = contentPages
      .filter((page) => !page.robots.includes("noindex") && !page.robots.includes("none"))
      .map((page) => page.canonical[0]?.href);
    assert.deepEqual(
      urls.sort(),
      expected.sort(),
      "sitemap differs from canonical indexable pages",
    );
  });
});
