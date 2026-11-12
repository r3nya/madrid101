import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import { getOldestCommitDate } from "@it-astro:content/git";
import { getCollection } from "astro:content";

import logoUrl from "./assets/logo-light.svg?url";

export const onRequest = defineRouteMiddleware(async (context) => {
  const { id, head, lastUpdated } = context.locals.starlightRoute;
  if (id === "404") {
    context.locals.starlightRoute.head = head.filter(
      ({ tag, attrs }) => !(tag === "meta" && attrs?.name === "robots"),
    );
    context.locals.starlightRoute.head.push({
      tag: "meta",
      attrs: { name: "robots", content: "noindex,follow" },
    });
    return;
  }

  const entry = context.locals.starlightRoute.entry.data;
  const isHomepage = !id || id === "index";
  // Reuse Starlight's canonical pathname and trailing-slash formatting.
  const canonicalHref = head.find(({ tag, attrs }) => tag === "link" && attrs?.rel === "canonical")
    ?.attrs?.href;
  const canonicalUrl =
    entry.canonicalUrl ||
    (typeof canonicalHref === "string"
      ? canonicalHref
      : new URL(context.url.pathname, context.site).href);

  for (const tag of head) {
    if (tag.tag === "link" && tag.attrs?.rel === "canonical") {
      tag.attrs.href = canonicalUrl;
    }
    if (tag.tag === "meta" && tag.attrs?.property === "og:url") {
      tag.attrs.content = canonicalUrl;
    }
    if (tag.tag === "meta" && tag.attrs?.property === "og:type") {
      tag.attrs.content = isHomepage ? "website" : "article";
    }
  }

  // Get the URL of the generated image for the current page using its ID and
  // append the `.png` file extension.
  const ogImageUrl = new URL(`/og/${id || "index"}.png`, context.site);

  // Add the `<meta/>` tags for the Open Graph images.
  head.push({
    tag: "meta",
    attrs: { property: "og:image", content: ogImageUrl.href },
  });
  head.push({
    tag: "meta",
    attrs: { property: "og:image:width", content: "1200" },
  });
  head.push({
    tag: "meta",
    attrs: { property: "og:image:height", content: "630" },
  });
  head.push({
    tag: "meta",
    attrs: { name: "twitter:image", content: ogImageUrl.href },
  });

  // Add keywords meta tag
  if (entry?.keywords) {
    head.push({
      tag: "meta",
      attrs: { name: "keywords", content: entry.keywords },
    });
  }

  // Add author meta tag
  if (entry?.author) {
    head.push({
      tag: "meta",
      attrs: { name: "author", content: entry.author },
    });
  }

  // Add robots meta tag
  if (entry?.robots) {
    head.push({
      tag: "meta",
      attrs: { name: "robots", content: entry.robots },
    });
  }

  const publisher = {
    "@type": "Organization",
    name: "Madrid 101",
    url: context.site?.href,
    logo: {
      "@type": "ImageObject",
      url: new URL(logoUrl, context.site).href,
    },
  };
  const commonData = {
    "@context": "https://schema.org",
    description: entry.description || "FAQ по Мадриду для номадов и эмигрантов",
    url: canonicalUrl,
    image: ogImageUrl.href,
    publisher,
    inLanguage: "ru",
  };
  const structuredData = isHomepage
    ? { ...commonData, "@type": "WebSite", name: "Madrid 101" }
    : {
        ...commonData,
        "@type": "Article",
        headline: entry.title,
        // Starlight's lastUpdated honors a frontmatter override.
        datePublished: (await getOldestCommitDate("docs", id)).toISOString(),
        ...(lastUpdated && { dateModified: lastUpdated.toISOString() }),
        author:
          entry.author && entry.author !== "Madrid 101"
            ? { "@type": "Person", name: entry.author }
            : { "@type": "Organization", name: "Madrid 101", url: context.site?.href },
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
        isPartOf: { "@type": "WebSite", name: "Madrid 101", url: context.site?.href },
        ...(entry.tags && { keywords: entry.tags.join(", ") }),
        ...(entry.articleSection && { articleSection: entry.articleSection }),
      };

  head.push({
    tag: "script",
    attrs: { type: "application/ld+json" },
    content: JSON.stringify(structuredData),
  });

  if (!isHomepage) {
    const docs = await getCollection("docs", ({ data }) => !data.draft);
    const segments = id.split("/");
    const breadcrumbs = ["index", ...segments.map((_, i) => segments.slice(0, i + 1).join("/"))]
      .map((id) => docs.find((doc) => doc.id === id))
      .filter((doc) => doc !== undefined);

    head.push({
      tag: "script",
      attrs: { type: "application/ld+json" },
      content: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((doc, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: doc.data.title,
          item:
            doc.data.canonicalUrl ||
            new URL(doc.id === "index" ? "/" : `/${doc.id}/`, context.site).href,
        })),
      }).replace(/</g, "\\u003c"),
    });
  }
});
