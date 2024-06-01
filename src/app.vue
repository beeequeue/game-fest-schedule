<template>
  <div class="relative w-full h-full flex flex-col items-center">
    <div class="py-5">
      All times are in
      <span title="Your guessed local timezone" class="font-bold decoration-underline">{{ timeZone }}</span>
    </div>

    <div class="w-full h-full flex flex-col items-center overflow-y-auto last:pb-20">
      <div
        v-for="(event, index) in events"
        :key="event.name"
        class="relative flex flex-col items-center w-full py-5"
        :class="{
          separator: shouldShowSeparator(index),
          'pt-6': shouldShowSeparator(index),
        }"
      >
        <div
          v-if="shouldShowSeparator(index)"
          class="absolute top-1 left-25% text-gray-200"
        >
          {{ formatDayMonth(event.dateTime) }}
        </div>

        <div class="flex flex-col items-center w-fit">
          <a
            v-if="event.url"
            :href="event.url"
            target="_blank"
            rel="noopener"
            class="block w-full text-center text-white"
          >
            <h1 class="text-center m-0 mb-1">{{ event.name }}</h1>
          </a>
          <h1 v-else class="text-center m-0 mb-1">
            {{ event.name }}
          </h1>

          <div class="w-75 flex justify-between text-gray-300">
            <div>{{ formatDate(event.dateTime) }}</div>

            <div v-if="event.dateTime.getTime() < Date.now()" :key="`after-${time}`">
              ({{ formatToNow(event.dateTime) }} ago)
            </div>
            <div v-else :key="`before-${time}`">
              (in {{ formatToNow(event.dateTime) }})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { format, formatDistanceToNowStrict } from "date-fns"

import { events } from "./schedule.js"

const time = ref(0)
setInterval(() => {
  time.value++
}, 1000)

const timeZone = new Intl.DateTimeFormat("en-us", { timeZoneName: "short" })
  .formatToParts(new Date())
  .find((part) => part.type === "timeZoneName")!.value

const formatDate = (date: Date) => format(date, "yyyy-MM-dd HH:mm")
const formatDayMonth = (date: Date) => format(date, "MMMM do")
const formatToNow = (date: Date) => formatDistanceToNowStrict(date)

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
