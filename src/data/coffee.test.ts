import { describe, expect, it } from "vitest";
import { coffeeRoasters, coffeeRoasterGroups } from "./coffee";

describe("Coffee Roasters URLs", () => {
  it("has valid URLs for all roasters", () => {
    for (const roaster of coffeeRoasters) {
      expect(roaster.url).toBeTruthy();
      expect(() => new URL(roaster.url)).not.toThrow();
    }
  });

  it.each(coffeeRoasters)(
    "keeps the website available on the same domain for $name",
    {
      timeout: 10000,
    },
    async (roaster) => {
      const response = await fetch(roaster.url, {
        method: "HEAD",
        redirect: "follow",
        signal: AbortSignal.timeout(8000),
      });

      expect(response.ok).toBe(true);
      expect(response.status).toBe(200);
      expect(new URL(response.url).hostname.replace(/^www\./, "")).toBe(
        new URL(roaster.url).hostname.replace(/^www\./, ""),
      );
    },
  );
});

describe("Coffee roaster groups", () => {
  it("includes every roaster in exactly one group", () => {
    const grouped = coffeeRoasterGroups.flatMap((group) => group.roasters);

    expect(grouped).toHaveLength(coffeeRoasters.length);
    expect(new Set(grouped)).toEqual(new Set(coffeeRoasters));
  });

  it("includes Alpedrete in Madrid and its surroundings", () => {
    const madrid = coffeeRoasterGroups.find((group) => group.id === "madrid");

    expect(madrid?.roasters.map((roaster) => roaster.name)).toContain("Badi Coffee Roasters");
  });
});

describe("Madrid coffee reviews", () => {
  const madridRoasters = coffeeRoasters.filter((roaster) => roaster.region === "madrid");

  it.each(madridRoasters)("has a recent manual check for $name", (roaster) => {
    expect("lastChecked" in roaster).toBe(true);
    if (!("lastChecked" in roaster)) return;

    const checkedAt = Date.parse(`${roaster.lastChecked}T00:00:00Z`);
    const today = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Europe/Madrid",
    }).format(new Date());
    const ageDays = (Date.parse(`${today}T00:00:00Z`) - checkedAt) / 86400000;

    expect(ageDays).toBeGreaterThanOrEqual(0);
    expect(
      ageDays,
      `Recheck ${roaster.name}: confirm the website and linked locations are still operating, then update lastChecked`,
    ).toBeLessThanOrEqual(180);
  });

  it("links to specific review sources without duplicate links", () => {
    const reviewed = madridRoasters.filter((roaster) => "reviews" in roaster);
    expect(reviewed.length).toBeGreaterThan(0);

    for (const roaster of reviewed) {
      if (!("reviews" in roaster)) continue;
      expect(new Set(roaster.reviews.map((review) => review.url)).size).toBe(
        roaster.reviews.length,
      );
      for (const review of roaster.reviews) {
        expect(review.label).toBeTruthy();
        expect(new URL(review.url).protocol).toBe("https:");
        expect(new URL(review.url).hostname).not.toBe(new URL(roaster.url).hostname);
      }
    }
  });
});
