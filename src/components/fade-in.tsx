import { component$, Slot } from "@builder.io/qwik"

type FadeInProps = {
  show: boolean
}

export const FadeIn = component$<FadeInProps>(({ show }) => {
  return (
    <span class={["opacity-0 transition-opacity", { "opacity-100": show }]}>
      <Slot />
    </span>
  )
})
