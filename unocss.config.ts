import extractorSvelte from "@unocss/extractor-svelte"
import presetIcons from "@unocss/preset-icons"
import presetWebFonts from "@unocss/preset-web-fonts"
import presetWind3 from "@unocss/preset-wind3"
import transformerDirectives from "@unocss/transformer-directives"
import type { VitePluginConfig } from "@unocss/vite"

export default {
  presets: [
    presetWind3(),
    presetIcons(),
    presetWebFonts({
      fonts: {
        sans: { name: "Averia Serif Libre" },
      },
    }),
  ],
  extractors: [extractorSvelte()],
  transformers: [transformerDirectives()],
} satisfies VitePluginConfig
