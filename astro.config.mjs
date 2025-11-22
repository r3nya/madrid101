import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import compress from "astro-compress";
// import starlightLinksValidator from "starlight-links-validator";

import { SITE_CONFIG } from "./src/data/config.ts";

// https://astro.build/config
export default defineConfig({
  site: "https://madrid101.xyz/",
  redirects: {
    "/faq/city-authorities/digital-certificate":
      "/documents/digital-certificate",
    "/faq/city-authorities/nota-simple": "/documents/nota-simple",
    "/faq/city-authorities/residence-registration":
      "/documents/residence-registration",
    "/faq/education/school-for-children": "/education/school-for-children",
    "/faq/finance/basic-account": "/finance/basic-account",
    "/faq/finance/currency-exchange": "/finance/currency-exchange",
    "/faq/finance/mortgage": "/finance/mortgage",
    "/faq/healthcare/appointments": "/healthcare/appointments",
    "/faq/healthcare/dental-services": "/healthcare/dental-services",
    "/faq/healthcare/tarjeta-sanitaria-europea":
      "/healthcare/tarjeta-sanitaria-europea",
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
      // Use the route data middleware to add the Open Graph images.
      routeMiddleware: "./src/routeData.ts",
      // plugins: [starlightLinksValidator()],
      title: "Madrid 101",
      favicon: "/favicon.ico",
      head: [
        {
          tag: "link",
          attrs: {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/apple-touch-icon.png",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon-32x32.png",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/favicon-16x16.png",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "manifest",
            href: "/site.webmanifest",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "sitemap",
            href: "/sitemap-index.xml",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "yandex-verification",
            content: "99657cbd8b636aa4",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "theme-color",
            content: "#40224e",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "robots",
            content: "index, follow",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "language",
            content: "ru",
          },
        },
        {
          tag: "meta",
          attrs: {
            "http-equiv": "content-language",
            content: "ru",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "alternate",
            hreflang: "ru",
            href: "https://madrid101.xyz/",
          },
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: SITE_CONFIG.github,
        },
        {
          icon: "heart",
          label: "Поддержать гайд",
          href: "https://buymeacoffee.com/madrid101",
        },
        // {
        //   icon: "telegram",
        //   label: "Telegram chat",
        //   href: "https://t.me/+4ccS_x5DADAwMjM6",
        // },
      ],
      // defaultLocale: "ru",
      // locales: {
      //   ru: {
      //     label: "Русский",
      //   },
      // },
      lastUpdated: true,
      sidebar: [
        {
          label: "📄 Документы",
          autogenerate: { directory: "documents" },
        },
        {
          label: "🏠 Жильё",
          items: [
            {
              label: "Районы города",
              link: "housing/districts",
            },
            { label: "Долгосрочная аренда", link: "housing/long-term-rental" },
            {
              label: "Краткосрочная аренда",
              link: "housing/short-term-rental",
            },
            { label: "Коливинг", link: "housing/co-living" },
            {
              label: "Провайдеры",
              autogenerate: { directory: "housing/providers" },
            },
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
            {
              label: "Автомобилистам",
              autogenerate: { directory: "transport/auto" },
            },
            {
              label: "Велосипедистам",
              link: "transport/bike",
            },
            {
              label: "Каршеринг",
              link: "transport/carsharing",
            },
            {
              label: "Мотошеринг",
              link: "transport/motosharing",
            },
            {
              label: "Общественный транспорт",
              link: "transport/public",
            },
            {
              label: "Такси",
              link: "transport/taxi",
            },
            {
              label: "Поезда 🚂",
              link: "transport/trains",
            },
            {
              label: "Транспортные карты",
              link: "transport/transport-cards",
            },
          ],
        },
        { label: "🫒 Еда", autogenerate: { directory: "food" } },
        { label: "🇪🇸 Испанский язык", autogenerate: { directory: "spanish" } },
        {
          label: "🧞 Услуги и сервисы",
          autogenerate: { directory: "services" },
        },
        {
          label: "🧘 Досуг",
          items: [
            {
              label: "Спорт",
              autogenerate: { directory: "spare-time/sport" },
            },
            {
              label: "⚽ Футбол",
              items: [
                {
                  label: "Билеты на футбол",
                  link: "spare-time/football-tickets",
                },
                {
                  label: "Клубы",
                  autogenerate: { directory: "spare-time/football" },
                  collapsed: true,
                },
              ],
            },
            {
              label: "🎭 Культура",
              autogenerate: { directory: "spare-time/culture" },
            },
            {
              label: "🎢 Парки и аттракционы",
              link: "spare-time/theme-parks",
            },
            {
              label: "Книги на русском языке",
              link: "spare-time/russian-books",
            },
            {
              label: "🧩 Хобби",
              collapsed: true,
              items: [
                {
                  label: "🔫 Airsoft",
                  autogenerate: { directory: "spare-time/airsoft" },
                },
                {
                  label: "Хакерспейсы",
                  link: "spare-time/hackerspaces",
                },
                {
                  label: "Сбор грибов",
                  link: "spare-time/mushroom-foraging",
                },
                { label: "420", link: "spare-time/x-420" },
              ],
            },
          ],
        },
        {
          label: "♻️ Управление отходами",
          autogenerate: { directory: "waste-management" },
        },
        {
          label: "💬 Чаты",
          link: "groups/chats",
        },
      ],
    }),
    sitemap(),
    compress(),
  ],
});
