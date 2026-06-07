<script lang="ts">
  import { onMount } from "svelte"

  import FadeIn from "./fade-in.svelte"

  let tzString = $state("")

  onMount(() => {
    tzString = new Intl.DateTimeFormat("en-us", { timeZoneName: "short" })
      .formatToParts(new Date())
      .find((part) => part.type === "timeZoneName")!.value
  })
</script>

<FadeIn show={tzString !== ""}>
  All times are in
  <span title="Your guessed local timezone" class={["decoration-underline cursor-help font-bold"]}>
    {` ${tzString}`}
  </span>
</FadeIn>
