import { describe, expect, it } from "vitest";
import { coffeeRoasters } from "./coffee";

describe("Coffee Roasters URLs", () => {
  it("has valid URLs for all roasters", () => {
    for (const roaster of coffeeRoasters) {
      expect(roaster.url).toBeTruthy();
      expect(() => new URL(roaster.url)).not.toThrow();
    }
  });

  it.each(coffeeRoasters)(
    "returns HTTP 200 for $name",
    { timeout: 10000 },
    async (roaster) => {
      const response = await fetch(roaster.url, {
        method: "HEAD",
        redirect: "follow",
      });

      expect(response.ok).toBe(true);
      expect(response.status).toBe(200);
    },
  );
});
