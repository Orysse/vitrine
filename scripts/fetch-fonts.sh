#!/usr/bin/env bash
# Downloads the site's fonts from github.com/google/fonts, subsets them to
# Latin + Latin-1 + Latin Extended-A and typographic punctuation, and writes
# woff2 files to static/fonts. The output is committed; rerun only to change
# the font set. Run through `nix run .#fetch-fonts` so the tools are present.
set -euo pipefail

root="$(git rev-parse --show-toplevel)"
out="$root/static/fonts"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
mkdir -p "$out"

base="https://raw.githubusercontent.com/google/fonts/main"
fonts=(
  "ofl/shrikhand/Shrikhand-Regular.ttf"
  "ofl/instrumentserif/InstrumentSerif-Regular.ttf"
  "ofl/instrumentserif/InstrumentSerif-Italic.ttf"
  "ofl/familjengrotesk/FamiljenGrotesk[wght].ttf"
  "ofl/familjengrotesk/FamiljenGrotesk-Italic[wght].ttf"
  "ofl/rubikmonoone/RubikMonoOne-Regular.ttf"
  "ofl/ibmplexmono/IBMPlexMono-Regular.ttf"
  "ofl/ibmplexmono/IBMPlexMono-Medium.ttf"
  "apache/specialelite/SpecialElite-Regular.ttf"
)
unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2190-2193,U+2212,U+2215,U+2500-257F,U+25A0,U+25B6,U+2605,U+2665,U+FEFF,U+FFFD,U+0100-017F"

for f in "${fonts[@]}"; do
  name="$(basename "$f" .ttf)"
  name="${name/\[wght\]/-VF}"
  url="${f/\[/%5B}"
  url="${url/\]/%5D}"
  echo "fetching $name"
  curl -fsSL "$base/$url" -o "$tmp/src.ttf"
  pyftsubset "$tmp/src.ttf" --unicodes="$unicodes" --layout-features='*' \
    --flavor=woff2 --output-file="$out/$name.woff2"
done

curl -fsSL "$base/ofl/shrikhand/OFL.txt" -o "$out/LICENSE-OFL.txt"
curl -fsSL "$base/apache/specialelite/LICENSE.txt" -o "$out/LICENSE-Apache-SpecialElite.txt"
ls -la "$out"
