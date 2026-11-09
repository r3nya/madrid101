---

name: refresh-telecom
description: Use when updating Madrid101's telecom provider guide, checking operator offers, or refreshing speed, eSIM, 5G and contract badges.
---

# Refresh the telecom guide

Update `src/content/docs/housing/providers/telecom.mdx` from official sources. Keep the article in Russian and its static content in MDX. Use the `Badge` and `LinkCard` components from `@astrojs/starlight/components`.

## Check the offers

- Read the whole page and requested PR diff. Preserve newer base-branch changes; keep unrelated pages out of scope.
- Visit every listed operator's official catalogue and relevant support or legal pages. Search snippets locate sources but do not confirm current terms. When domains or brand ownership differ, verify the legal provider before combining offers.
- Record direct URLs, check date and qualifications for fibre speed, coverage, eSIM, 5G, prepaid service, and fibre versus mobile commitment periods.
- Compare fresh product terms with support pages. If they disagree, explain the tariff-specific uncertainty and link both. For blocked or JavaScript-only pages, omit unconfirmed claims and report the limitation.
- Replace unsupported quality rankings and expired promotions with verified facts. Preserve intentional referral links unless the user requests removal or the base branch already removed them.

## Apply badges

Place small badges below operator headings. Keep headings literal so Starlight can include them in the table of contents. Reuse the existing import:

```mdx
import { Badge, LinkCard } from '@astrojs/starlight/components';

<Badge text="eSIM" variant="note" size="small" />
```

| Feature                         | Variant   | Meaning                                              |
| ------------------------------- | --------- | ---------------------------------------------------- |
| Fibre speed or satellite access | `success` | Advertised residential tier, not measured throughput |
| eSIM and 5G                     | `note`    | Confirmed support on eligible devices and plans      |
| No minimum commitment           | `tip`     | Specify fibre or mobile scope                        |
| Prepaid or international calls  | `caution` | Explain eligibility and destination restrictions     |
- Use Russian labels and standard names such as eSIM and 5G. Prefer up to four useful badges per operator. Explain the legend once; an omitted badge means unconfirmed, not necessarily unavailable.
- Distinguish advertised speed from usable throughput. Explain address and equipment limits beside the offer.
- Explain eSIM restrictions: contract-only, physical SIM first, store visits or activation within Spain. Phone eSIM does not establish smartwatch or MultiSIM support.
- Check installation recovery, promotions, router returns and device financing separately from tariff commitment. A mobile no-commitment claim does not establish the same for fibre.
- Link supporting pages in descriptions. National measurement rankings do not guarantee performance at an address.

## Verify and finish

Update `lastUpdated` to the review date and check Russian grammar. Run repository checks from `AGENTS.md`. Compare failures against the current base; leave unrelated formatting and failures out of the patch.

Build and inspect the compiled telecom page: operator headings, links, badges, date, restrictions and intended referrals. Static prose needs no new unit tests.

When a PR update is authorized, commit and push to its existing branch, then update its description with changes, sources, checks and limitations. Otherwise leave edits local. Do not merge or enable auto-merge without authorization.
