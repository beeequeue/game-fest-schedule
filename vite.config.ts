import { qwikVite } from "@builder.io/qwik/optimizer"
import { qwikCity } from "@builder.io/qwik-city/vite"
import UnoCss from "@unocss/vite"
import { defineConfig } from "vite"

import pkgJson from "./package.json" with { type: "json" }

console.log()

/**
 * Note that Vite normally starts from `index.html` but the qwikCity plugin makes start at `src/entry.ssr.tsx` instead.
 */
export default defineConfig(({ command, mode }) => ({
  plugins: [qwikCity(), qwikVite({ lint: false }), UnoCss()],
  optimizeDeps: {
    // Put problematic deps that break bundling here, mostly those with binaries.
    // For example ['better-sqlite3'] if you use that in server functions.
    exclude: [],
  },

  /**
   * This is an advanced setting. It improves the bundling of your server code. To use it, make sure you understand when your consumed packages are dependencies or dev dependencies. (otherwise things will break in production)
   */
  ssr:
    command === "build" && mode === "production"
      ? {
          // All dev dependencies should be bundled in the server build
          noExternal: Object.keys(pkgJson.devDependencies ?? {}),
          // Anything marked as a dependency will not be bundled
          // These should only be production binary deps (including deps of deps), CLI deps, and their module graph
          // If a dep-of-dep needs to be external, add it here
          // For example, if something uses `bcrypt` but you don't have it as a dep, you can write
          // external: [...Object.keys(dependencies), 'bcrypt']
          // @ts-expect-error: Missing property
          // eslint-disable-next-line ts/no-unsafe-argument
          external: Object.keys(pkgJson.dependencies ?? {}),
        }
      : undefined,

  server: {
    headers: {
      "Cache-Control": "public, max-age=0",
    },
  },
}))
