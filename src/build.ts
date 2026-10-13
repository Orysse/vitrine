import { execSync } from "node:child_process";
import pkg from "../package.json";

// What the colophon says about this build. The flake passes the revision and the commit
// time (the Nix sandbox has no .git); a local build asks git. The date is the commit's, not
// the clock's, so the build stays reproducible.
const git = (args: string): string | undefined => {
  try {
    return execSync(`git ${args}`, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim() || undefined;
  } catch {
    return undefined;
  }
};

const rev = process.env.VITRINE_REV ?? git("rev-parse --short HEAD") ?? "dev";
const epoch = Number(process.env.VITRINE_DATE ?? git("log -1 --format=%ct"));

export const build = {
  version: pkg.version,
  rev,
  /** "2026-10-13", or undefined when unknown. */
  date: Number.isFinite(epoch) && epoch > 0 ? new Date(epoch * 1000).toISOString().slice(0, 10) : undefined,
  /** Link the revision only when it is a real commit. */
  revUrl: /^[0-9a-f]{7,40}$/.test(rev) ? `https://github.com/Orysse/vitrine/commit/${rev}` : undefined,
  tagUrl: `https://github.com/Orysse/vitrine/releases/tag/v${pkg.version}`,
};
