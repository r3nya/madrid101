import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

// Get all entries from the `docs` content collection.
const entries = await getCollection("docs");

// Map the entry array to an object with the page ID as key and the
// frontmatter data as value.
const pages = Object.fromEntries(entries.map(({ data, id }) => [id, { data }]));

export const { getStaticPaths, GET } = OGImageRoute({
  // Pass down the documentation pages.
  pages,
  // Define the name of the parameter used in the endpoint path, here `slug`
  // as the file is named `[...slug].ts`.
  param: "slug",
  // Define a function called for each page to customize the generated image.
  getImageOptions: (_path, page: (typeof pages)[number]) => {
    return {
      // Use the page title and description as the image title and description.
      title: page.data.title,
      description: page.data.description,
      // Customize various colors and add a border.
      bgGradient: [
        [107, 144, 128],
        [164, 195, 178],
        [204, 227, 222],
        [234, 244, 244],
        [246, 255, 248],
      ],
      border: { color: [107, 144, 128], width: 20 },
      padding: 120,
      font: {
        title: {
          size: 72,
          lineHeight: 1.2,
          families: ["Inter", "Noto Sans", "Noto Color Emoji"],
          weight: "Medium",
          color: [0, 0, 0],
        },
        description: {
          size: 42,
          lineHeight: 1.2,
          families: ["Noto Sans", "Noto Color Emoji"],
          weight: "Normal",
          color: [57, 78, 69],
        },
      },
      fonts: [
        "./src/pages/og/_fonts/inter/inter-400-normal.ttf",
        "./src/pages/og/_fonts/inter/inter-500-normal.ttf",

        "./src/pages/og/_fonts/noto-sans/noto-400-normal.ttf",
        "./src/pages/og/_fonts/noto-sans/noto-500-normal.ttf",

        "./src/pages/og/_fonts/NotoColorEmoji-Regular.ttf",
      ],
    };
  },
});
