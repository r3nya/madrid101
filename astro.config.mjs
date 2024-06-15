import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "http://madrid101.xyz/",
  integrations: [
    starlight({
      title: "Madrid 101",
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
        // {
        //   label: "🎭 Культура",
        //   autogenerate: { directory: "culture" },
        // },
        { label: "🏠 Жильё", autogenerate: { directory: "housing" } },
        { label: "🇪🇸 Испанский язык", autogenerate: { directory: "spanish" } },
        // { label: "Новости", autogenerate: { directory: "news" } },
      ],
    }),
  ],
});
