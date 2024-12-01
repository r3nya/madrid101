import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLinksValidator from "starlight-links-validator";

// https://astro.build/config
export default defineConfig({
  site: "http://madrid101.xyz/",
  integrations: [
    starlight({
      components: {
        Head: "./src/components/Head.astro",
      },
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
      social: {
        github: "https://github.com/r3nya/madrid101",
        telegram: "https://t.me/+4ccS_x5DADAwMjM6",
      },
      defaultLocale: "ru",
      locales: {
        ru: {
          label: "Русский",
        },
      },
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
              badge: "Новое",
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
            { label: "Хобби", link: "spare-time/hobby" },
            { label: "420", link: "spare-time/x-420" },
          ],
        },
        {
          label: "🏠 Жильё",
          autogenerate: { directory: "housing" },
        },
        { label: "🫒 Еда", autogenerate: { directory: "food" } },
        {
          label: "🧞 Услуги и сервисы",
          autogenerate: { directory: "services" },
        },
        { label: "🚗 Транспорт", autogenerate: { directory: "transport" } },
        { label: "🇪🇸 Испанский язык", autogenerate: { directory: "spanish" } },
      ],
    }),
    sitemap(),
  ],
});
