import { test, expect } from "./fixtures";

const table: [string[], string][] = [
  [["/systemes/homelab/", "/homelab/", "/projets/homelab/", "/systemes/config/", "/projets/config/"], "/#homelab"],
  [["/systemes/", "/systemes/vitrine/", "/projets/", "/parcours/", "/etudes/", "/colophon/", "/303/", "/session/", "/cv/"], "/"],
  [
    ["/en/systems/homelab/", "/en/homelab/", "/en/projects/homelab/", "/en/systems/config/", "/en/projects/config/"],
    "/en/#homelab",
  ],
  [["/en/systems/", "/en/projects/", "/en/resume/", "/en/studies/", "/en/colophon/", "/en/303/", "/en/session/", "/en/cv/"], "/en/"],
];

for (const [froms, to] of table) {
  for (const from of froms) {
    for (const url of [from, from.slice(0, -1)]) {
      test(`${url} -> ${to}`, async ({ request }) => {
        const res = await request.get(url, { maxRedirects: 0 });
        expect(res.status()).toBe(301);
        expect(res.headers()["location"]).toBe(to);
      });
    }
  }
}

test("the redirects do not swallow the CV PDFs", async ({ request }) => {
  for (const lang of ["fr", "en"]) {
    const res = await request.get(`/cv/ABEL_CHARTIER_CV_${lang}.pdf`, { maxRedirects: 0 });
    expect(res.status()).toBe(200);
  }
});

test("healthz answers ok", async ({ request }) => {
  const res = await request.get("/healthz", { maxRedirects: 0 });
  expect(res.status()).toBe(200);
  expect(await res.text()).toBe("ok\n");
});

test("an unknown path is a 404", async ({ request }) => {
  const res = await request.get("/nope/", { maxRedirects: 0 });
  expect(res.status()).toBe(404);
});
