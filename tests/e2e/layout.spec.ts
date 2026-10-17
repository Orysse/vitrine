import { test, expect } from "./fixtures";

test.use({ viewport: { width: 375, height: 812 } });

for (const route of ["/", "/en/"]) {
  test.describe(route, () => {
    test("no horizontal scroll at phone width", async ({ page }) => {
      await page.goto(route);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    });

    test("the display face is Hanken Grotesk and the page is paper", async ({ page }) => {
      await page.goto(route);
      const family = await page.locator("h1").evaluate((el) => getComputedStyle(el).fontFamily);
      expect(family.replace(/["']/g, "")).toMatch(/^Hanken Grotesk/);
      const bg = await page.locator("body").evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(bg).toBe("rgb(241, 237, 228)");
    });

    test("the display font is actually loaded", async ({ page }) => {
      await page.goto(route);
      // document.fonts.check() is true when no @font-face matches, so look for a loaded face.
      const loaded = await page.evaluate(async () => {
        await document.fonts.ready;
        return [...document.fonts]
          .filter((f) => f.status === "loaded")
          .map((f) => `${f.family.replace(/["']/g, "")} ${f.weight}`);
      });
      expect(loaded).toContain("Hanken Grotesk 800");
    });
  });
}
