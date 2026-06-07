import { onMount } from "svelte"

export function useSyncedInterval(fn: () => void, intervalMs: number) {
  onMount(() => {
    let interval: number

    setTimeout(
      () => {
        fn()
        interval = setInterval(fn, intervalMs) as unknown as number
      },
      intervalMs - (Date.now() % intervalMs) + 2,
    )

    return () => clearInterval(interval)
  })
}
