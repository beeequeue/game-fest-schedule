import adapter from "@sveltejs/adapter-node"
import { sveltekit } from "@sveltejs/kit/vite"
// import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"
import unocss from "@unocss/vite"
import sonda from "sonda/vite"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    sourcemap: process.env.ANALYZE != null,
  },

  plugins: [
    unocss(),
    sveltekit({
      adapter: adapter({ precompress: false }),
      // preprocess: vitePreprocess(),
    }),
    sonda({ sources: true, deep: true, enabled: process.env.ANALYZE != null }),
  ],

  server: {
    headers: {
      "Cache-Control": "public, max-age=0",
    },
  },
})
