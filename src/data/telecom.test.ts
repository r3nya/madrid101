import { describe, expect, it } from "vitest";
import { telecomCategories, telecomProviders } from "./telecom";

// HTTP checks hit external sites and can flake (bot protection, geo-blocking,
// timeouts). Run them explicitly: CHECK_URLS=1 npx vitest run src/data
const env =
  (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process?.env ?? {};
const checkUrls = env.CHECK_URLS === "1";

const excluded = [
  "Virgin",
  "SIMple",
  "Lycamobile",
  "Holafly",
  "Euskaltel",
  "R Cable",
  "Telecable",
  "Parlem",
];

describe("Telecom providers data", () => {
  it("has valid https URLs for all providers", () => {
    for (const provider of telecomProviders) {
      expect(provider.url).toBeTruthy();
      expect(() => new URL(provider.url)).not.toThrow();
      expect(new URL(provider.url).protocol).toBe("https:");
    }
  });

  it("has valid referral URLs", () => {
    for (const provider of telecomProviders) {
      if ("referral" in provider) {
        expect(() => new URL(provider.referral.href)).not.toThrow();
        expect(provider.referral.note).toBeTruthy();
      }
    }
  });

  it("has unique names and URLs", () => {
    const names = telecomProviders.map((p) => p.name);
    const urls = telecomProviders.map((p) => p.url);
    expect(new Set(names).size).toBe(names.length);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("has bullets, services and a card description for every provider", () => {
    for (const provider of telecomProviders) {
      expect(provider.bullets.length).toBeGreaterThan(0);
      expect(provider.services.length).toBeGreaterThan(0);
      expect(provider.cardDescription).toBeTruthy();
    }
  });

  it("has at least one provider in every category", () => {
    for (const category of telecomCategories) {
      expect(telecomProviders.some((p) => p.category === category.id)).toBe(
        true,
      );
    }
  });

  it("does not list excluded providers", () => {
    for (const provider of telecomProviders) {
      for (const name of excluded) {
        expect(provider.name).not.toContain(name);
      }
    }
  });
});

describe.runIf(checkUrls)("Telecom provider URLs respond", () => {
  it.each(telecomProviders)(
    "returns HTTP 2xx for $name",
    { timeout: 15000 },
    async (provider) => {
      const response = await fetch(provider.url, {
        method: "HEAD",
        redirect: "follow",
      });
      expect(response.ok).toBe(true);
    },
  );
});
