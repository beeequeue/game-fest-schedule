<script lang="ts">
  import "uno.css"
  import "../global.css"

  const { children } = $props()
</script>

<svelte:head>
  <link rel="me" href="https://bsky.app/profile/haglund.dev" />
</svelte:head>

{@render children()}
