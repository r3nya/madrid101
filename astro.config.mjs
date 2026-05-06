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
        root: [
          {
            label: "📄 Документы",
            autogenerate: { directory: "documents" },
          },
          {
            label: "🏠 Жильё",
            items: [
              { label: "Районы города", link: "housing/districts" },
              { label: "Долгосрочная аренда", link: "housing/long-term-rental" },
              { label: "Краткосрочная аренда", link: "housing/short-term-rental" },
              { label: "Коливинг", link: "housing/co-living" },
              { label: "Провайдеры", autogenerate: { directory: "housing/providers" } },
            ],
          },
          {
            label: "🏥 Медицина",
            autogenerate: { directory: "healthcare" },
          },
          {
            label: "💰 Финансы",
            autogenerate: { directory: "finance" },
          },
          {
            label: "💸 Налоги",
            autogenerate: { directory: "taxes" },
          },
          {
            label: "🎓 Образование",
            autogenerate: { directory: "education" },
          },
          {
            label: "🚗 Транспорт",
            items: [
              { label: "Автомобилистам", autogenerate: { directory: "transport/auto" } },
              { label: "Велосипедистам", link: "transport/bike" },
              { label: "Каршеринг", link: "transport/carsharing" },
              { label: "Мотошеринг", link: "transport/motosharing" },
              { label: "Общественный транспорт", link: "transport/public" },
              { label: "Такси", link: "transport/taxi" },
              { label: "Поезда", link: "transport/trains" },
              { label: "Транспортные карты", link: "transport/transport-cards" },
            ],
          },
          { label: "🫒 Еда", autogenerate: { directory: "food" } },
          { label: "🇪🇸 Испанский язык", autogenerate: { directory: "spanish" } },
          { label: "🧞 Услуги и сервисы", autogenerate: { directory: "services" } },
          { label: "🧘 Досуг", autogenerate: { directory: "spare-time" } },
          { label: "♻️ Управление отходами", autogenerate: { directory: "waste-management" } },
          { label: "💬 Чаты", link: "groups/chats" },
        ],
        en: [
          // English sidebar will only include Phase 1 translated pages for now
          {
            label: "📄 Documents",
            autogenerate: { directory: "en/documents" },
          },
          {
            label: "🏠 Housing",
            autogenerate: { directory: "en/housing" },
          },
          {
            label: "🏥 Healthcare",
            autogenerate: { directory: "en/healthcare" },
          },
          {
            label: "💰 Finance",
            autogenerate: { directory: "en/finance" },
          },
          {
            label: "💸 Taxes",
            autogenerate: { directory: "en/taxes" },
          },
          {
            label: "🚗 Transport",
            autogenerate: { directory: "en/transport" },
          },
        ],
      },
    }),
    sitemap(),
    compress(),
  ],
});
