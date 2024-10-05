import { component$ } from "@builder.io/qwik"
import type { DocumentHead } from "@builder.io/qwik-city"
import { format } from "date-fns"

import { Countdown } from "../components/countdown"
import { Timezone } from "../components/timezone"
import { events } from "../schedule"

const formatDate = (date: Date) => format(date, "yyyy-MM-dd HH:mm")
const formatDayMonth = (date: Date) => format(date, "MMMM do")

export default component$(() => {
  const shouldShowSeparator = (index: number) => {
    const previous = events[index - 1]?.dateTime
    const current = events[index].dateTime

    return (
      previous != null &&
      (previous.getDate() !== current.getDate() ||
        current.getMonth() !== previous.getMonth())
    )
  }

  const upNextIndex = events.findIndex(({ dateTime }) => Date.now() < dateTime.getTime())

  return (
    <>
      <div class="relative flex w-full items-center justify-center py-5">
        <Timezone />

        <a
          href="https://github.com/BeeeQueue/gamee-fest-schedule"
          rel="noopener"
          target="_blank"
          class="absolute right-5 flex items-center py-2 pl-2 text-white"
        >
          Source
          <div class="i-simple-icons:github w-1.25em h-1.25em ml-1.5" />
        </a>
      </div>

      <div class="flex h-full w-full flex-col items-center overflow-y-auto px-6 pb-20">
        {events.map((event, index) => (
          <div
            key={event.name}
            class={[
              "relative",
              "flex",
              "w-full",
              "flex-col",
              "items-center",
              "py-5",
              {
                separator: shouldShowSeparator(index),
                "pt-8": shouldShowSeparator(index),
              },
            ]}
          >
            {shouldShowSeparator(index) && (
              <divsum class="md:left-25% absolute left-5 top-1 text-gray-400">
                {formatDayMonth(event.dateTime)}
              </divsum>
            )}

            <div class="flex w-fit max-w-full flex-col items-center">
              {event.url != null ? (
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener"
                  class="block w-full text-center text-white"
                >
                  <h1 class="m-0 mb-2 text-center">{event.name}</h1>
                </a>
              ) : (
                <h1 class="m-0 mb-2 text-center">{event.name}</h1>
              )}

              <div class="w-130 lt-sm:flex-col lt-sm:text-center flex max-w-full justify-between text-gray-300">
                <div>{formatDate(event.dateTime)}</div>

                {upNextIndex <= index && (
                  <Countdown date={event.dateTime} upNext={upNextIndex === index} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
})

export const head = {
  title: "Summer Game Fest Schedule",
  meta: [
    {
      name: "description",
      content: "A simple schedule for the Summer Game Fest",
    },
  ],
  links: [{ rel: "me", href: "https://github.com/BeeeQueue" }],
} satisfies DocumentHead
