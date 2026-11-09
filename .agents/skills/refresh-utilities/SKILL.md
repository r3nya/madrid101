---

name: refresh-utilities
description: Use when updating Madrid101's electricity and gas provider guide or checking supplier offers, regulated tariffs and contract conditions for that page.
---

# Refresh the utilities guide

Update `src/content/docs/housing/providers/utilities.mdx` from official sources. Keep the article in Russian, with static MDX and existing Starlight components. Read `AGENTS.md` and the whole page before editing.

## Check suppliers and tariffs

- Visit every listed supplier's official household catalogue and relevant terms. Record direct source URLs, the review date and restrictions. Search snippets locate sources but do not establish current prices or conditions.
- Verify the contracting company and market. Distinguish the retailer from the local distributor; customers choose the retailer, not the distribution network.
- Treat PVPC, regulated electricity, and TUR, regulated gas, as separate products. A group's free-market brand does not automatically offer its regulated counterpart's tariff. Verify eligibility and authorized suppliers through MITECO or CNMC.
- Separate fixed, time-of-use and indexed prices. Check how long the price or discount lasts, the rate after promotion, minimum commitment, early-exit charges and optional maintenance services.
- If publishing prices, state the applicable period, region, eligibility, units and whether taxes are included. Include standing or power charges and compulsory extras. Compare annual cost for the same consumption profile rather than a headline discount. Link the [CNMC energy comparator](https://comparador.cnmc.gob.es/).
- Verify green-energy claims and referral eligibility against published terms. Describe variable bonuses as conditional; do not promise a payment or rank a tariff as cheapest without comparable evidence.
- If current product terms and help pages disagree, link both and identify the uncertainty. For blocked pages, omit unconfirmed claims and record the limitation.

## Update the article

Preserve current base-branch edits, provider ordering and intentional links when updating a PR. Do not restore a referral the base branch removed. Keep other guides and new utility categories out of scope unless requested.

Use concise descriptions with supporting links. Keep supplier switching, contract-holder changes and reconnection separate; do not promise a completion date or free installation without evidence for that procedure. Update `lastUpdated` to the review date and check Russian grammar.

## Verify and finish

Follow repository checks from `AGENTS.md`. Compare failures with the current base and exclude unrelated formatter changes.

Build and inspect the compiled utilities page: supplier names and order, links, date, tariff distinctions and intentional referrals. Check quoted prices and units against the recorded source terms. Static prose needs no new unit tests.

If a PR update is authorized, commit and push to that branch and update its description with changes, sources, checks and limitations. Otherwise leave edits local. Do not merge or enable auto-merge without authorization.
