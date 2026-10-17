import { test, expect } from "./fixtures";

for (const route of ["/", "/en/"]) {
  test(`${route} loads without console error`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator("main")).toBeAttached();
  });
}

test("healthz answers ok", async ({ request }) => {
  const res = await request.get("/healthz");
  expect(res.status()).toBe(200);
  expect(await res.text()).toBe("ok\n");
});
