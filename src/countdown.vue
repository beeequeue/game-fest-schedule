<template>
  <div class="tabular-nums sm:text-end">{{ text }}</div>
</template>

<script setup lang="ts">
import {
  addHours,
  formatDistanceToNowStrict,
  formatDuration,
  intervalToDuration,
  isWithinInterval,
} from "date-fns"
import { computed } from "vue"

const props = defineProps<{ date: Date; upNext: boolean }>()

const formatToNow = (date: Date) => formatDistanceToNowStrict(date)

const text = computed(() => {
  const now = new Date()

  const isSameDay = isWithinInterval(props.date, {
    start: now,
    end: addHours(now, 24),
  })
  if (props.upNext || isSameDay) {
    const duration = intervalToDuration({
      start: now,
      end: props.date,
    })

    return `in ${formatDuration(duration, { delimiter: ", ", zero: true })}`
  }

  return props.date.getTime() < Date.now()
    ? `${formatToNow(props.date)} ago`
    : `in ${formatToNow(props.date)}`
})
</script>

<style scoped></style>
