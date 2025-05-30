import { component$ } from "@builder.io/qwik"
import {
  QwikCityProvider,
  type RequestHandler,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city"
import { isDev } from "@builder.io/qwik/build"

import { RouterHead } from "./components/router-head"

import "@unocss/reset/sanitize/assets.css"
import "@unocss/reset/sanitize/forms.css"
import "@unocss/reset/sanitize/sanitize.css"
import "@unocss/reset/sanitize/typography.css"
import "@unocss/reset/sanitize/reduce-motion.css"
import "uno.css"

import "./global.css"

const oneDayInSeconds = 60 * 60 * 24

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    public: true,
    maxAge: oneDayInSeconds,
    sMaxAge: oneDayInSeconds * 7,
    staleWhileRevalidate: oneDayInSeconds * 30,
  })
}

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <RouterHead />

      <body lang="en">
        <RouterOutlet />

        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  )
})
