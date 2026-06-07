<script lang="ts">
  import {
    addHours,
    formatDistanceToNowStrict,
    formatDuration,
    intervalToDuration,
    isWithinInterval,
  } from "date-fns"

  import FadeIn from "./fade-in.svelte"

  type CountdownProps = {
    now: number // ms
    date: Date
    upNext: boolean
  }

  const { now, date, upNext }: CountdownProps = $props()
  const isInPast = $derived(now > date.getTime())

  const formatToNow = (date: Date) => formatDistanceToNowStrict(date)

  const countdownString = $derived.by<string>(() => {
    const isSameDay = isWithinInterval(date, {
      start: now,
      end: addHours(now, 24),
    })
    const isInNextHour = isWithinInterval(date, {
      start: now,
      end: addHours(now, 2),
    })

    if ((upNext || isSameDay) && !isInPast) {
      const duration = intervalToDuration({
        start: now,
        end: date,
      })

      return `in ${formatDuration(duration, {
        delimiter: ", ",
        format: !isInNextHour
          ? ["weeks", "days", "hours"]
          : ["weeks", "days", "hours", "minutes", "seconds"],
        zero: true,
      })}`
    } else {
      return isInPast ? `${formatToNow(date)} ago` : `in ${formatToNow(date)}`
    }
  })
</script>

<FadeIn show={countdownString !== ""}>
  <div class="tabular-nums" class:text-gray-500={isInPast}>{countdownString}</div>
</FadeIn>
