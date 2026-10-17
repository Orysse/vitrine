import { test, expect } from "./fixtures";

const open = (page, id: string) => page.locator(`details.work#${id}`);

test("clicking a summary opens its fiche and closes the previous one", async ({ page }) => {
  await page.goto("/");
  await page.locator("#forge summary").click();
  await expect(open(page, "forge")).toHaveAttribute("open", "");
  await page.locator("#cea summary").click();
  await expect(open(page, "cea")).toHaveAttribute("open", "");
  await expect(open(page, "forge")).not.toHaveAttribute("open", "");
});

test("a deep link opens its fiche (fr and en)", async ({ page }) => {
  await page.goto("/#cea");
  await expect(open(page, "cea")).toHaveAttribute("open", "");
  await page.goto("/en/#homelab");
  await expect(open(page, "homelab")).toHaveAttribute("open", "");
});

test("a hashchange opens a fiche too", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => (location.hash = "#redpill"));
  await expect(open(page, "redpill")).toHaveAttribute("open", "");
});

test("an unknown or malformed hash opens nothing and throws nothing", async ({ page }) => {
  for (const hash of ["#nope", "#main", "#%E0%A4%A"]) {
    await page.goto(`/${hash}`);
    await expect(page.locator("details.work[open]")).toHaveCount(0);
  }
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("a summary still toggles its fiche", async ({ page }) => {
    await page.goto("/");
    await page.locator("#homelab summary").click();
    await expect(open(page, "homelab")).toHaveAttribute("open", "");
    await page.locator("#homelab summary").click();
    await expect(open(page, "homelab")).not.toHaveAttribute("open", "");
  });
});

test("keyboard: summaries are reachable, focus is visible, Enter and Space toggle", async ({ page }) => {
  await page.goto("/");
  const summary = page.locator("#forge summary");
  for (let i = 0; i < 12 && !(await summary.evaluate((el) => el === document.activeElement)); i++)
    await page.keyboard.press("Tab");
  await expect(summary).toBeFocused();
  const outline = await summary.evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(outline).not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(open(page, "forge")).toHaveAttribute("open", "");
  await page.keyboard.press("Space");
  await expect(open(page, "forge")).not.toHaveAttribute("open", "");
});

test("phone width: an open fiche does not scroll the page sideways", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const route of ["/#forge", "/#homelab", "/en/#forge"]) {
    await page.goto(route);
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth, route).toBeLessThanOrEqual(clientWidth);
  }
});

test("print opens every fiche, and restores the previous state afterwards", async ({ page }) => {
  await page.goto("/#cea");
  await expect(open(page, "cea")).toHaveAttribute("open", "");
  await page.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
  await expect(page.locator("details.work[open]")).toHaveCount(5);
  await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
  await expect(page.locator("details.work[open]")).toHaveCount(1);
  await expect(open(page, "cea")).toHaveAttribute("open", "");
  // exclusivity is back
  await page.locator("#forge summary").click();
  await expect(page.locator("details.work[open]")).toHaveCount(1);
});

test("print stylesheet: no marquee, no paper background", async ({ page }) => {
  await page.goto("/");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".marquee")).toBeHidden();
  const bg = await page.locator("body").evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(bg).toBe("rgba(0, 0, 0, 0)");
});
