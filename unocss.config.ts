import presetUno from "@unocss/preset-uno"
import presetIcons from "@unocss/preset-icons"
import presetWebFonts from "@unocss/preset-web-fonts"
import transformerDirectives from "@unocss/transformer-directives"

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
  safelist: ["saturate-150", "saturate-250"],
  rules: [
    [
      /text-outline-(.+)-(.+)/,
      ([, width, color]: [never, string, string]) => ({
        "text-shadow": `-${width}px -${width}px 0 ${color}, ${width}px -${width}px 0 ${color}, -${width}px ${width}px 0 ${color}, ${width}px ${width}px 0 ${color}`,
      }),
    ],
  ],
}
