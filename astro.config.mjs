import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLinksValidator from "starlight-links-validator";

// https://astro.build/config
export default defineConfig({
  site: "http://madrid101.xyz/",
  integrations: [
    starlight({
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
      ],
      social: {
        github: "https://github.com/r3nya/how-to-madrid",
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
          label: "⁉️ FAQ",
          items: [
            {
              label: "Районы города",
              link: "faq/maps/districts",
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
          ],
        },
        {
          label: "🧘‍♂️ Досуг",
          items: [
            {
              label: "Спорт",
              autogenerate: { directory: "spare-time/sport" },
            },
            {
              label: "🎭 Культура",
              autogenerate: { directory: "spare-time/culture" },
            },
          ],
        },
        { label: "🏠 Жильё", autogenerate: { directory: "housing" } },
        { label: "🇪🇸 Испанский язык", autogenerate: { directory: "spanish" } },
        // {label: "Новости", autogenerate: {directory: "news" } },
        { label: "🚗 Транспорт", autogenerate: { directory: "transport" } },
      ],
    }),
  ],
});
