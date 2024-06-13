import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://r3nya.github.io',
	base: 'how-to-madrid',
	integrations: [
		starlight({
			title: 'How to Madrid',
			defaultLocale: 'ru',
			social: {
				github: 'https://github.com/r3nya/how-to-madrid',
				telegram: 'https://t.me/+4ccS_x5DADAwMjM6',
			},
			lastUpdated: true,
			sidebar: [
				{
					label: 'Административные услуги',
					autogenerate: { directory: 'faq/city-authorities' },
				},
				{
					label: 'Медицинские услуги',
					autogenerate: { directory: 'faq/healthcare' },
				},
				{
					label: 'Образование',
					autogenerate: { directory: 'faq/education' },
				}
			],
		}),
	],
});
