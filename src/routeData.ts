import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

export const onRequest = defineRouteMiddleware((context) => {
  // Get the URL of the generated image for the current page using its ID and
  // append the `.png` file extension.
  const ogImageUrl = new URL(
    `/og/${context.locals.starlightRoute.slug || "index"}.png`,
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
    attrs: { name: "twitter:image", content: ogImageUrl.href },
  });
});
