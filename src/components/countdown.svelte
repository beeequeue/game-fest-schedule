<script lang="ts">
  import {
    addHours,
    formatDistanceToNowStrict,
    formatDuration,
    intervalToDuration,
    isWithinInterval,
  } from "date-fns"
  import { onMount } from "svelte"

  import FadeIn from "./fade-in.svelte"

  type CountdownProps = {
    date: Date
    upNext: boolean
  }

  const { date, upNext }: CountdownProps = $props()

  const formatToNow = (date: Date) => formatDistanceToNowStrict(date)

  let countdownString = $state("")

  onMount(() => {
    setInterval(() => {
      const now = new Date()
      const isSameDay = isWithinInterval(date, {
        start: now,
        end: addHours(now, 24),
      })
      const isInNextHour = isWithinInterval(date, {
        start: now,
        end: addHours(now, 2),
      })
      if (upNext || isSameDay) {
        const duration = intervalToDuration({
          start: now,
          end: date,
        })

        countdownString = `in ${formatDuration(duration, {
          delimiter: ", ",
          format: !isInNextHour
            ? ["weeks", "days", "hours"]
            : ["weeks", "days", "hours", "minutes", "seconds"],
          zero: true,
        })}`
      } else {
        countdownString =
          date.getTime() < Date.now() ? `${formatToNow(date)} ago` : `in ${formatToNow(date)}`
      }
    }, 500)
  })
</script>

<FadeIn show={countdownString !== ""}>
  <div class="tabular-nums sm:text-end">{countdownString}</div>
</FadeIn>
