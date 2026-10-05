import { describe, expect, it } from "vitest";
import { utilityProviders } from "./utilities";

// HTTP checks hit external sites and can flake (bot protection, geo-blocking,
// timeouts). Run them explicitly: CHECK_URLS=1 npx vitest run src/data
const env =
  (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process?.env ?? {};
const checkUrls = env.CHECK_URLS === "1";

describe("Utility providers data", () => {
  it("has valid https URLs for all providers", () => {
    for (const provider of utilityProviders) {
      expect(provider.url).toBeTruthy();
      expect(() => new URL(provider.url)).not.toThrow();
      expect(new URL(provider.url).protocol).toBe("https:");
    }
  });

  it("keeps Octopus Energy first with its referral link", () => {
    const [first] = utilityProviders;
    expect(first.name).toBe("Octopus Energy");
    expect(first.referral.href).toBe(
      "https://share.octopusenergy.es/metal-leaf-749",
    );
  });

  it("has valid referral URLs", () => {
    for (const provider of utilityProviders) {
      if ("referral" in provider) {
        expect(() => new URL(provider.referral.href)).not.toThrow();
        expect(provider.referral.note).toBeTruthy();
      }
    }
  });

  it("has unique names and URLs", () => {
    const names = utilityProviders.map((p) => p.name);
    const urls = utilityProviders.map((p) => p.url);
    expect(new Set(names).size).toBe(names.length);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("has bullets, services and a card description for every provider", () => {
    for (const provider of utilityProviders) {
      expect(provider.bullets.length).toBeGreaterThan(0);
      expect(provider.services.length).toBeGreaterThan(0);
      expect(provider.cardDescription).toBeTruthy();
    }
  });

  it("does not list Holaluz", () => {
    expect(utilityProviders.some((p) => p.name.includes("Holaluz"))).toBe(
      false,
    );
  });
});

describe.runIf(checkUrls)("Utility provider URLs respond", () => {
  it.each(utilityProviders)(
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
