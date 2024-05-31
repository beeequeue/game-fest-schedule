<template>
  <div class="relative w-full h-full flex flex-col items-center">
    <div class="mt-5">All times are in {{ timeZone }}</div>

    <div class="w-full h-full flex flex-col items-center overflow-y-auto last:pb-20">
      <div
        v-for="event in events"
        :key="event.name"
        class="flex flex-col items-center w-fit py-5"
      >
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

          <div :key="time">({{ formatToNow(event.dateTime) }})</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import dayjs from "dayjs"
import relative from "dayjs/plugin/relativeTime"

import { events } from "./schedule.js"

dayjs.extend(relative)

const time = ref(0)
setInterval(() => {
  time.value++
}, 2000)

const timeZone = new Intl.DateTimeFormat("en-us", { timeZoneName: "short" })
  .formatToParts(new Date())
  .find((part) => part.type === "timeZoneName")!.value

const formatDate = (date: dayjs.Dayjs) => date.format("YYYY-MM-DD HH:mm")
const formatToNow = (date: dayjs.Dayjs) => date.fromNow()
</script>

<style scoped></style>
