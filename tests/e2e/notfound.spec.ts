import { test, expect } from "./fixtures";

test("an unknown English path gets an English 404, a French one a French 404", async ({ request }) => {
  const en = await request.get("/en/nope/", { maxRedirects: 0 });
  expect(en.status()).toBe(404);
  const enBody = await en.text();
  expect(enBody).toContain('<html lang="en"');
  expect(enBody).toContain("Page not found");

  const fr = await request.get("/nope/", { maxRedirects: 0 });
  expect(fr.status()).toBe(404);
  const frBody = await fr.text();
  expect(frBody).toContain('<html lang="fr"');
  expect(frBody).toContain("Page introuvable");
});
