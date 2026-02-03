import { $, component$, useOnDocument, useSignal } from "@builder.io/qwik"
import {
  addHours,
  formatDistanceToNowStrict,
  formatDuration,
  intervalToDuration,
  isWithinInterval,
} from "date-fns"

import { FadeIn } from "./fade-in.tsx"

const formatToNow = (date: Date) => formatDistanceToNowStrict(date)

type CountdownProps = {
  date: Date
  upNext: boolean
}

export const Countdown = component$<CountdownProps>(({ date, upNext }) => {
  const countdownString = useSignal("")

  useOnDocument(
    "DOMContentLoaded",
    $(() => {
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

          countdownString.value = `in ${formatDuration(duration, {
            delimiter: ", ",
            format: !isInNextHour
              ? ["weeks", "days", "hours"]
              : ["weeks", "days", "hours", "minutes", "seconds"],
            zero: true,
          })}`
        } else {
          countdownString.value =
            date.getTime() < Date.now()
              ? `${formatToNow(date)} ago`
              : `in ${formatToNow(date)}`
        }
      })
    }),
  )

  return (
    <FadeIn show={countdownString.value !== ""}>
      <div class="tabular-nums sm:text-end">{countdownString}</div>
    </FadeIn>
  )
})
