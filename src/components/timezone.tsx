import { $, component$, useOnDocument, useSignal } from "@builder.io/qwik"

import { FadeIn } from "./fade-in.tsx"

export const Timezone = component$(() => {
  const tzString = useSignal("")

  useOnDocument(
    "DOMContentLoaded",
    $(() => {
      tzString.value = new Intl.DateTimeFormat("en-us", { timeZoneName: "short" })
        .formatToParts(new Date())
        .find((part) => part.type === "timeZoneName")!.value
    }),
  )

  return (
    <FadeIn show={tzString.value !== ""}>
      All times are in{" "}
      <span
        title="Your guessed local timezone"
        class={["decoration-underline cursor-help font-bold"]}
      >
        {tzString}
      </span>
    </FadeIn>
  )
})
