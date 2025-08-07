## Astro & TypeScript

- Follow Astro component conventions; keep components small and focused.
- Use TypeScript for any utilities or configuration where applicable.
- Avoid adding global CSS; rely on Starlight theming and semantic HTML.

## Assets

- Prefer modern formats: `.webp`/`.avif` for images where possible.
- Provide descriptive `alt` text in Russian; avoid decorative-only images.
- Keep images under ~500 KB when feasible.
- Store images alongside the page or in a local `images/` subfolder; use `public/` only for shared, site-wide assets.

## MD/MDX Usage

- Use `.md` by default; switch to `.mdx` only when you need components.
- Do not embed third-party scripts in MDX content.
