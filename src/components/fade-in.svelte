<script lang="ts">
  import type { Snippet } from "svelte"

  type Props = {
    show: boolean
    children: Snippet
  }

  const { show, children }: Props = $props()
</script>

<span class={["opacity-0 transition-opacity", { "opacity-100": show }]}>
  {@render children()}
</span>
