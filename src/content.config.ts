import { defineCollection } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const collections = {
  docs: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
    schema: docsSchema({
      extend: z.object({
        canonicalUrl: z.url().optional(),
        keywords: z.string().optional(),
        author: z.string().optional(),
        robots: z.string().optional(),
        articleSection: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  }),
};
