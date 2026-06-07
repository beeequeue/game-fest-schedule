import extractorSvelte from "@unocss/extractor-svelte"
import presetIcons from "@unocss/preset-icons"
import presetUno from "@unocss/preset-uno"
import presetWebFonts from "@unocss/preset-web-fonts"
import transformerDirectives from "@unocss/transformer-directives"
import type { VitePluginConfig } from "@unocss/vite"

export default {
  presets: [
    presetUno(),
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
