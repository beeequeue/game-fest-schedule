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
        sans: { name: "Satoshi", provider: "fontshare" },
      },
    }),
  ],
  transformers: [transformerDirectives()],
  content: {
    pipeline: {
      include: [
        // Generic JSX files
        /\.tsx/,
        // QRLs during Qwik dev, parsed JSX files during Qwik build
        /_[\da-z]{11}\.js$/,
      ],
    },
  },
} satisfies VitePluginConfig
