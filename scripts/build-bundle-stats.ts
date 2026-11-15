import assert from "node:assert/strict";
import { readFile, realpath } from "node:fs/promises";
import { resolve } from "node:path";
import { build } from "astro";
import webpackStats from "rollup-plugin-webpack-stats";

const [root, output] = process.argv.slice(2);
assert(root && output, "Usage: node scripts/build-bundle-stats.ts <checkout> <stats.json>");
const statsPath = resolve(output);
const checkoutRoot = await realpath(resolve(root));
process.chdir(checkoutRoot);

await build({
  root: checkoutRoot,
  vite: {
    plugins: [
      {
        ...webpackStats({ fileName: statsPath }),
        applyToEnvironment: (environment) => environment.name === "client",
      },
    ],
  },
});

// The stats plugin logs write failures without failing the build.
const stats = JSON.parse(await readFile(statsPath, "utf8"));
assert(
  stats.assets?.length && stats.chunks?.length && stats.modules?.length,
  "Missing client bundle stats",
);
