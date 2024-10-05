import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik"
import {
  addHours,
  formatDistanceToNowStrict,
  formatDuration,
  intervalToDuration,
  isWithinInterval,
} from "date-fns"

import { FadeIn } from "./fade-in"

const formatToNow = (date: Date) => formatDistanceToNowStrict(date)

type CountdownProps = {
  date: Date
  upNext: boolean
}

export const Countdown = component$<CountdownProps>(({ date, upNext }) => {
  const countdownString = useSignal("")

  useVisibleTask$(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const isSameDay = isWithinInterval(date, {
        start: now,
        end: addHours(now, 24),
      })
      if (upNext || isSameDay) {
        const duration = intervalToDuration({
          start: now,
          end: date,
        })

        countdownString.value = `in ${formatDuration(duration, { delimiter: ", ", zero: true })}`
      } else {
        countdownString.value =
          date.getTime() < Date.now()
            ? `${formatToNow(date)} ago`
            : `in ${formatToNow(date)}`
      }

      return () => {
        clearInterval(interval as never)
      }
    })
  })

  return (
    <FadeIn show={countdownString.value !== ""}>
      <div class="tabular-nums sm:text-end">{countdownString}</div>
    </FadeIn>
  )
})
