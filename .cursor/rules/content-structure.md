## Content Structure

The content is organized under `/src/content/docs/`:
- `/faq/` — Frequently asked questions (city authorities, healthcare, education, finance)
- `/food/` — Food and dining
- `/groups/` — Community chats and groups
- `/housing/` — Housing information (rental, co-living, providers)
- `/services/` — Services and utilities
- `/spanish/` — Spanish language resources
- `/spare-time/` — Leisure activities (sport, culture, hobby)
- `/taxes/` — Tax information and resources
- `/transport/` — Transportation options
- `/waste-management/` — Waste management information and resources

## File Naming and Organization

- Use kebab-case for file names: `long-term-rental.mdx`, `tarjeta-sanitaria.mdx`.
- Prefer `.md` for static content; use `.mdx` only when components are required.
- Keep assets close to the page that uses them (same folder or a local `images/`).
- Use descriptive asset names: `topic-keyword-detail.webp`.
- Include `index.mdx` for section overviews when a folder is a section root.

## Linking Policy

- Use absolute links from the site root for internal pages: `[text](/transport/bike)`.
- Use descriptive link text, not raw URLs.
- External resources must include the official name and language context when relevant.
- Phone numbers should be clickable: `[+34 612 345 678](tel:+34612345678)`.
