import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import { getOldestCommitDate } from "@it-astro:content/git";

export const onRequest = defineRouteMiddleware(async (context) => {
  // Get the URL of the generated image for the current page using its ID and
  // append the `.png` file extension.
  const ogImageUrl = new URL(
    `/og/${context.locals.starlightRoute.id || "index"}.png`,
    context.site,
  );

  // Get the array of all tags to include in the `<head>` of the current page.
  const { head } = context.locals.starlightRoute;

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
      datePublished: toISODate(
        await getOldestCommitDate("docs", context.locals.starlightRoute.id || "index"),
      ),
    }),
    ...(context.locals.starlightRoute.lastUpdated && {
      dateModified: toISODate(context.locals.starlightRoute.lastUpdated),
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
});

const toISODate = (date: Date) => date.toISOString().split("T")[0];
