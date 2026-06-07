<script lang="ts">
  import { format } from "date-fns"
  import { onMount } from "svelte"

  import Countdown from "../components/countdown.svelte"
  import Timezone from "../components/timezone.svelte"
  import { events } from "../schedule"
  import { useSyncedInterval } from "../utils"

  const formatDate = (date: Date) => format(date, "yyyy-MM-dd HH:mm")
  const formatDayMonth = (date: Date) => format(date, "MMMM do")

  let now = $state(Date.now())
  useSyncedInterval(() => {
    now = Date.now()
  }, 1000)

  const shouldShowSeparator = (index: number) => {
    const previous = events[index - 1]?.dateTime
    const current = events[index]!.dateTime

    return (
      previous != null &&
      (previous.getDate() !== current.getDate() || current.getMonth() !== previous.getMonth())
    )
  }

  const findUpNext = () => {
    const now = Date.now()

    return events
      .toSorted((a, b) => a.dateTime.getTime() - b.dateTime.getTime())
      .findIndex(({ dateTime }) => now < dateTime.getTime())
  }
  let upNextIndex = $state(findUpNext())

  useSyncedInterval(() => {
    if (upNextIndex === -1) return

    const upNextDate = events[upNextIndex]!.dateTime
    if (upNextDate.getTime() >= Date.now()) return

    upNextIndex = findUpNext()
  }, 1000)

  onMount(() => {
    if (upNextIndex === -1) return
    document.getElementById(`event-${upNextIndex}`)?.scrollIntoView({ behavior: "smooth", inline: "center" })
  })
</script>

<svelte:head>
  <title>Summer Game Fest Schedule</title>
  <meta name="description" content="A simpler, better schedule for Summer Game Fest 2026" />
</svelte:head>

<!-- what the fuck? why is this element shoved to the left???? -->
<div class="pl-11 flex items-center justify-between gap-2 py-5">
  <a
    href="https://github.com/BeeeQueue/game-fest-schedule"
    rel="noopener"
    target="_blank"
    class="flex items-center gap-1.5 py-2 text-white"
  >
    <div class="i-simple-icons:github size-1.25em"></div>
    Source
  </a>

  <Timezone />

  <a
    href="https://bsky.app/profile/haglund.dev"
    rel="noopener"
    target="_blank"
    class="flex items-center gap-1.5 py-2 text-white"
  >
    beequeue
    <div class="i-simple-icons:bluesky size-1.25em"></div>
  </a>
</div>

<div class="flex h-full w-full flex-col items-center overflow-y-auto px-6 pb-50">
  {#each events as event, index (event.name)}
    <div
      id={`event-${index + 1}`}
      class="relative flex w-full flex-col items-center pb-5"
      class:separator={shouldShowSeparator(index)}
      class:pt-8={shouldShowSeparator(index)}
    >
      {#if shouldShowSeparator(index)}
        <div class="absolute top-1 right-0 left-0 flex justify-center text-gray-400">
          {formatDayMonth(event.dateTime)}
        </div>
      {/if}

      <div class="flex w-fit max-w-full flex-col items-center gap-2">
        {#if event.url != null}
          <div>
            <a
              href={event.url}
              target="_blank"
              rel="noopener"
              class="decoration-none relative z-20 flex w-full items-center justify-center gap-1 text-center"
              class:rainbow-gradient={index === upNextIndex}
            >
              <h1 class="m-0 py-1 text-center">{event.name}</h1>
            </a>
            <span class="bg-#eee h-2px -mt-5px relative z-1 block w-full"></span>
          </div>
        {:else}
          <h1 class="m-0 text-center" class:rainbow-gradient={index === upNextIndex}>
            {event.name}
          </h1>
        {/if}

        <div class="w-130 max-w-full flex-col justify-between text-center text-gray-300">
          <div>{formatDate(event.dateTime)}</div>

          <Countdown {now} date={event.dateTime} upNext={upNextIndex === index} />
        </div>
      </div>
    </div>
  {/each}
</div>
