import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { createSitemapSerializer } from "./sitemap.mjs";

const directory = mkdtempSync(join(tmpdir(), "madrid101-sitemap-"));
mkdirSync(join(directory, "guides"));
for (const [file, frontmatter] of Object.entries({
  "index.mdx": "lastUpdated: 2026-11-09",
  "guides/index.md": 'lastUpdated: "2026-10-02"',
  "guides/article.mdx": "lastUpdated: 2026-11-08",
  "renamed.md": "slug: custom-path\nlastUpdated: 2026-09-14",
  "disabled.md": "lastUpdated: false",
  "undated.md": "title: Undated",
})) {
  writeFileSync(join(directory, file), `---\n${frontmatter}\n---\nContent`);
}
afterAll(() => rmSync(directory, { recursive: true, force: true }));

describe("sitemap lastmod", () => {
  const serialize = createSitemapSerializer(directory);

  it.each([
    ["/", "2026-11-09"],
    ["/guides/", "2026-10-02"],
    ["/guides/article/", "2026-11-08"],
    ["/guides/article", "2026-11-08"],
    ["/custom-path/", "2026-09-14"],
  ])("uses the frontmatter date for %s", (path, date) => {
    const item = { url: `https://madrid101.xyz${path}`, priority: 0.5 };
    expect(serialize(item)).toEqual({ ...item, lastmod: `${date}T00:00:00.000Z` });
  });

  it.each(["/disabled/", "/undated/", "/unknown/"])("leaves %s undated", (path) => {
    const item = { url: `https://madrid101.xyz${path}` };
    expect(serialize(item)).toEqual(item);
  });
});
