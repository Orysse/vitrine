import { defineConfig, devices } from "@playwright/test";

// The tests run against the production build behind the image's nginx config,
// so the CSP is the real one.
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  reporter: "list",
  // Firefox from nixpkgs sometimes hangs the first navigation of a fresh context under parallel load,
  // even on /healthz (reproduced outside the suite). A retry shows up as "flaky" in the report.
  retries: 2,
  use: { baseURL: "http://localhost:8080", navigationTimeout: 10_000 },
  projects: [
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "mkdir -p test-results && nix run .#preview > test-results/preview.log 2>&1",
    url: "http://localhost:8080/healthz",
    reuseExistingServer: true,
    timeout: 600_000,
  },
});
