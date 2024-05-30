import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
} from "unocss"

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetWebFonts({
      fonts: {
        sans: { name: "Sentient", provider: "fontshare" },
      },
    }),
  ],
  transformers: [transformerDirectives()],
  safelist: ["saturate-150", "saturate-250"],
  rules: [
    [
      /text-outline-(.+)-(.+)/,
      ([, width, color]) => ({
        "text-shadow": `-${width}px -${width}px 0 ${color}, ${width}px -${width}px 0 ${color}, -${width}px ${width}px 0 ${color}, ${width}px ${width}px 0 ${color}`,
      }),
    ],
  ],
})
