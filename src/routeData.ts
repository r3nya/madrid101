import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import { getOldestCommitDate } from "@it-astro:content/git";
import { getCollection } from "astro:content";

export const onRequest = defineRouteMiddleware(async (context) => {
  const { id, head } = context.locals.starlightRoute;
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

  const entry = context.locals.starlightRoute.entry?.data;

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

  // Add structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": entry?.articleSection === "Главная" ? "WebSite" : "Article",
    headline: entry?.title || "Madrid 101",
    description: entry?.description || "FAQ по Мадриду для номадов и эмигрантов",
    url: entry?.canonicalUrl || context.url.href,
    image: ogImageUrl.href,
    // Both come from git history (Starlight's lastUpdated honors a frontmatter override).
    // Starlight's built-in 404 entry is virtual (not in the collection), so it has no git history.
    ...(context.locals.starlightRoute.id !== "404" && {
      datePublished: (
        await getOldestCommitDate("docs", context.locals.starlightRoute.id || "index")
      ).toISOString(),
    }),
    ...(context.locals.starlightRoute.lastUpdated && {
      dateModified: context.locals.starlightRoute.lastUpdated.toISOString(),
    }),
    author: entry?.author
      ? {
          "@type": "Person",
          name: entry.author,
        }
      : {
          "@type": "Organization",
          name: "Madrid 101",
          url: "https://madrid101.xyz",
        },
    publisher: {
      "@type": "Organization",
      name: "Madrid 101",
      url: "https://madrid101.xyz",
      logo: {
        "@type": "ImageObject",
        url: "https://madrid101.xyz/logo-light.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": entry?.canonicalUrl || context.url.href,
    },
    inLanguage: "ru",
    isPartOf: {
      "@type": "WebSite",
      name: "Madrid 101",
      url: "https://madrid101.xyz",
    },
    ...(entry?.tags && { keywords: entry.tags.join(", ") }),
    ...(entry?.articleSection && { articleSection: entry.articleSection }),
  };

  head.push({
    tag: "script",
    attrs: { type: "application/ld+json" },
    content: JSON.stringify(structuredData),
  });

  if (id && id !== "404") {
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
