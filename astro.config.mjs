import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import compress from "astro-compress";
import starlightLinksValidator from "starlight-links-validator";

import { SITE_CONFIG } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: "http://madrid101.xyz/",
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
          }
        }
      }
    }
  },
  integrations: [starlight({
    // Use the route data middleware to add the Open Graph images.
    routeMiddleware: "./src/routeData.ts",
    plugins: [starlightLinksValidator()],
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
    ],
    social: [
      {
        icon: "github",
        label: "GitHub",
        href: SITE_CONFIG.github,
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
        label: "⁉ FAQ",
        items: [
          {
            label: "Районы города",
            link: "faq/maps/districts",
          },
          {
            label: "💬 Чаты",
            link: "groups/chats",
          },
          {
            label: "Административные услуги",
            autogenerate: { directory: "faq/city-authorities" },
          },
          {
            label: "Медицинские услуги",
            autogenerate: { directory: "faq/healthcare" },
          },
          {
            label: "Образование",
            autogenerate: { directory: "faq/education" },
          },
          {
            label: "Финансы",
            autogenerate: { directory: "faq/finance" },
          },
        ],
      },
      {
        label: "🧘 Досуг",
        items: [
          {
            label: "Спорт",
            autogenerate: { directory: "spare-time/sport" },
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
            label: "🔫 Airsoft",
            autogenerate: { directory: "spare-time/airsoft" },
          },
          {
            label: "Книги на русском языке",
            link: "spare-time/russian-books",
          },
        },
      },
    },
  },
  integrations: [
    starlight({
      // Use the route data middleware to add the Open Graph images.
      routeMiddleware: "./src/routeData.ts",
      plugins: [starlightLinksValidator()],
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
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/r3nya/madrid101",
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
          label: "⁉ FAQ",
          items: [
            {
              label: "Районы города",
              link: "faq/maps/districts",
            },
            {
              label: "💬 Чаты",
              link: "groups/chats",
            },
            {
              label: "Административные услуги",
              autogenerate: { directory: "faq/city-authorities" },
            },
            {
              label: "Медицинские услуги",
              autogenerate: { directory: "faq/healthcare" },
            },
            {
              label: "Образование",
              autogenerate: { directory: "faq/education" },
            },
            {
              label: "Финансы",
              autogenerate: { directory: "faq/finance" },
            },
          ],
        },
        {
          label: "🧘 Досуг",
          items: [
            {
              label: "Спорт",
              autogenerate: { directory: "spare-time/sport" },
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
              label: "🔫 Airsoft",
              autogenerate: { directory: "spare-time/airsoft" },
            },
            {
              label: "Книги на русском языке",
              link: "spare-time/russian-books",
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
        {
          label: "🏠 Жильё",
          items: [
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
        { label: "🫒 Еда", autogenerate: { directory: "food" } },
        {
          label: "🧞 Услуги и сервисы",
          autogenerate: { directory: "services" },
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
        {
          label: "💸 Налоги",
          autogenerate: { directory: "taxes" },
        },
        { label: "🇪🇸 Испанский язык", autogenerate: { directory: "spanish" } },
        {
          label: "♻️ Управление отходами",
          autogenerate: { directory: "waste-management" },
        },
      ],
    }),
    sitemap(),
    compress(),
  ],
});
