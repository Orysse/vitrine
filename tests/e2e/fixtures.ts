import { test as base, expect } from "@playwright/test";

// Every test fails on a console error, an uncaught exception or a CSP violation.
export const test = base.extend<{ problems: string[] }>({
  problems: [
    async ({ page }, use) => {
      const problems: string[] = [];
      page.on("console", (m) => {
        if (m.type() === "error") problems.push(`console: ${m.text()}`);
      });
      page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
      await page.addInitScript(() => {
        document.addEventListener("securitypolicyviolation", (e) => {
          console.error(`CSP violation: ${e.violatedDirective} ${e.blockedURI}`);
        });
      });
      await use(problems);
      expect(problems, "console errors / CSP violations").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
