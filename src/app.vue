<template>
  <div class="relative w-full h-full flex flex-col items-center">
    <div class="relative w-full flex justify-center items-center py-5">
      <div>
        All times are in
        <span title="Your guessed local timezone" class="font-bold decoration-underline cursor-help">
          {{ timeZone }}
        </span>
      </div>

      <a
        href="https://github.com/BeeeQueue/gamee-fest-schedule"
        rel="noopener"
        target="_blank"
        class="flex items-center absolute right-5 py-2 pl-2 text-white"
      >
        Source
        <div class="i-simple-icons:github w-1.25em h-1.25em ml1.5" />
      </a>
    </div>

    <div class="w-full h-full px-6 flex flex-col items-center overflow-y-auto last:pb-20">
      <div
        v-for="(event, index) in events"
        :key="event.name"
        class="relative flex flex-col items-center w-full py-5"
        :class="{
          separator: shouldShowSeparator(index),
          'pt-8': shouldShowSeparator(index),
        }"
      >
        <div
          v-if="shouldShowSeparator(index)"
          class="absolute top-1 left-5 md:left-25% text-gray-400"
        >
          {{ formatDayMonth(event.dateTime) }}
        </div>

        <div class="flex flex-col items-center w-fit max-w-full">
          <a
            v-if="event.url"
            :href="event.url"
            target="_blank"
            rel="noopener"
            class="block w-full text-center text-white"
          >
            <h1 class="text-center m-0 mb-2">{{ event.name }}</h1>
          </a>
          <h1 v-else class="text-center m-0 mb-2">
            {{ event.name }}
          </h1>

          <div
            class="max-w-full w-130 flex lt-sm:flex-col lt-sm:text-center justify-between text-gray-300"
          >
            <div>
              {{ formatDate(event.dateTime) }}
            </div>

            <Countdown
              v-if="upNextIndex <= index"
              :key="time"
              :date="event.dateTime"
              :up-next="upNextIndex === index"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { format } from "date-fns"

import { events } from "./schedule.js"
import Countdown from "./countdown.vue"

const upNextIndex = events.findIndex(({ dateTime }) => Date.now() < dateTime.getTime())

const time = ref(0)
setInterval(() => {
  time.value++
}, 1000)

const timeZone = new Intl.DateTimeFormat("en-us", { timeZoneName: "short" })
  .formatToParts(new Date())
  .find((part) => part.type === "timeZoneName")!.value

const formatDate = (date: Date) => format(date, "yyyy-MM-dd HH:mm")
const formatDayMonth = (date: Date) => format(date, "MMMM do")

const shouldShowSeparator = (index: number) => {
  const previous = events[index - 1]?.dateTime
  const current = events[index].dateTime

  return (
    previous != null &&
    (previous.getDate() !== current.getDate() ||
      current.getMonth() !== previous.getMonth())
  )
}
</script>

<style>
h1 {
  line-height: 32px;
}

.separator {
  --at-apply: b-0 b-t-2 b-solid b-gray-500;
}
</style>
