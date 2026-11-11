import { globSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parseFrontmatter } from "astro/markdown";

export function createSitemapSerializer(directory) {
  const dates = new Map();
  for (const file of globSync("**/*.{md,mdx}", { cwd: directory })) {
    const { frontmatter } = parseFrontmatter(readFileSync(join(directory, file), "utf8"));
    const { lastUpdated } = frontmatter;
    if (!lastUpdated || lastUpdated === true) continue;

    const slug = frontmatter.slug ?? file.replace(/\.mdx?$/, "");
    const pathname = `/${slug}`.replace(/\/index$/, "").replace(/\/$/, "");
    dates.set(pathname, new Date(lastUpdated).toISOString());
  }

  return (item) => {
    const pathname = decodeURI(new URL(item.url).pathname).replace(/\/$/, "");
    const lastmod = dates.get(pathname);
    return lastmod ? { ...item, lastmod } : item;
  };
}
