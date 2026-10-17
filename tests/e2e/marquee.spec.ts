import { test, expect } from "./fixtures";

const track = (page) => page.locator(".marquee .marquee-track").first();
const state = (page) => track(page).evaluate((el) => getComputedStyle(el).animationPlayState);

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("the marquee does not move", async ({ page }) => {
    await page.goto("/");
    const name = await track(page).evaluate((el) => getComputedStyle(el).animationName);
    expect(name).toBe("none");
  });
});

test.describe("default motion", () => {
  test("it moves, pauses on hover, resumes after", async ({ page }) => {
    await page.goto("/");
    const name = await track(page).evaluate((el) => getComputedStyle(el).animationName);
    expect(name).not.toBe("none");
    expect(await state(page)).toBe("running");
    await page.locator(".marquee").hover();
    await expect.poll(() => state(page)).toBe("paused");
    await page.mouse.move(2, 2);
    await expect.poll(() => state(page)).toBe("running");
  });

  test("it pauses on keyboard focus, and the focused logo is on screen", async ({ page }) => {
    await page.goto("/");
    const last = page.locator(".marquee .marquee-track").first().locator("a").last();
    await last.focus();
    await expect.poll(() => state(page)).toBe("paused");
    await expect(last).toBeInViewport();
  });

  test("the duplicate track is never tabbable", async ({ page }) => {
    await page.goto("/");
    const reached = new Set<string>();
    for (let i = 0; i < 60; i++) {
      await page.keyboard.press("Tab");
      const label = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        return el?.closest(".marquee-track")?.getAttribute("aria-hidden") === "true"
          ? "HIDDEN-TRACK"
          : (el?.getAttribute("aria-label") ?? "");
      });
      expect(label).not.toBe("HIDDEN-TRACK");
      if (label) reached.add(label);
    }
    expect(reached.size).toBeGreaterThanOrEqual(30);
  });
});

test("phone width: the marquee does not widen the page", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const route of ["/", "/en/"]) {
    await page.goto(route);
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth, route).toBeLessThanOrEqual(clientWidth);
  }
});
