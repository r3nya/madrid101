import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import compress from "astro-compress";

import { SITE_CONFIG } from "./src/data/config.ts";

// https://astro.build/config
export default defineConfig({
  site: "https://madrid101.xyz/",
  redirects: {
    "/faq/city-authorities/digital-certificate": "/documents/digital-certificate",
    "/faq/city-authorities/nota-simple": "/documents/nota-simple",
    "/faq/city-authorities/residence-registration": "/documents/residence-registration",
    "/faq/education/school-for-children": "/education/school-for-children",
    "/faq/finance/basic-account": "/finance/basic-account",
    "/faq/finance/currency-exchange": "/finance/currency-exchange",
    "/faq/finance/mortgage": "/finance/mortgage",
    "/faq/healthcare/appointments": "/healthcare/appointments",
    "/faq/healthcare/dental-services": "/healthcare/dental-services",
    "/faq/healthcare/tarjeta-sanitaria-europea": "/healthcare/tarjeta-sanitaria-europea",
    "/faq/healthcare/tarjeta-sanitaria": "/healthcare/tarjeta-sanitaria",
    "/faq/maps/districts": "/housing/districts",
    "/faq/welcome": "/welcome",
  },
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            starlight: ["@astrojs/starlight"],
          },
        },
      },
    },
  },
  integrations: [
    starlight({
      routeMiddleware: "./src/routeData.ts",
      title: "Madrid 101",
      favicon: "/favicon.ico",
      defaultLocale: "root",
      locales: {
        root: {
          label: "Русский",
          lang: "ru",
        },
        en: {
          label: "English",
          lang: "en",
        },
      },
      lastUpdated: true,
      sidebar: {
        root: [ ... existing russian sidebar ... ],
        en: [
          { label: "Documents", autogenerate: { directory: "documents" } },
          { label: "Housing", autogenerate: { directory: "housing" } },
          { label: "Healthcare", autogenerate: { directory: "healthcare" } },
          { label: "Finance", autogenerate: { directory: "finance" } },
          { label: "Taxes", autogenerate: { directory: "taxes" } },
          { label: "Transport", autogenerate: { directory: "transport" } },
        ],
      },
    }),
    sitemap(),
    compress(),
  ],
});
