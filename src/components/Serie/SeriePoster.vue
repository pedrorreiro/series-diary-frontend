<template>
  <div
    class="perspective poster select-none overflow-hidden text-center hover:cursor-pointer"
    @click="flipCard"
  >
    <div
      class="preserve-3d bg-primary-background h-full w-full transform p-2 transition-transform duration-700"
      :class="{ 'rotate-y-180': isFlipped }"
    >
      <!-- Frente  -->
      <div class="backface-hidden relative w-full">
        <div
          :title="`Nota: ${voteAverage}`"
          class="font-poppins absolute left-2 top-2 z-10 flex flex-row items-center justify-center gap-2 rounded-lg bg-black bg-opacity-80 px-2 py-1 font-semibold text-yellow-500"
        >
          <IconStar class="h-5 w-5" stroke="2.5" />
          <p>{{ voteAverage }}</p>
        </div>
        <div class="overflow-hidden rounded-lg">
          <img
            class="m-auto h-[300px] w-full rounded-lg transition-transform duration-300 hover:scale-105"
            :src="`${serie.posterPath}`"
            @error="onImageError"
            alt="poster"
          />
        </div>
        <p
          :title="serie.name"
          class="text-primary-text font-poppins my-4 ml-2 truncate text-left font-semibold"
        >
          {{ serie.name }}
        </p>
      </div>

      <!-- Verso -->
      <div
        class="backface-hidden rotate-y-180 font-poppins text-primary-text absolute inset-0 flex h-full w-full flex-col justify-between p-4"
      >
        <p class="line-clamp-[17] text-justify text-xs font-semibold" :title="overview">
          {{ overview }}
        </p>
        <div
          v-if="!showFirstAirDate"
          class="flex w-full justify-center"
          @mouseenter="showFirstAirDate = true"
        >
          <IconCalendarEvent class="h-5 w-5" />
        </div>

        <Transition name="tooltip" mode="out-in">
          <div
            v-if="showFirstAirDate"
            @mouseleave="showFirstAirDate = false"
            class="absolute bottom-0 left-0 w-full bg-black bg-opacity-15 p-2 text-xs backdrop-blur-sm"
          >
            <p>Data de lançamento</p>
            <p>{{ parseFirstAirDate(serie.firstAirDate) }}</p>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Serie } from '@/services/SerieService/types'
import { useDateTime } from '@/value-objects/date-time'
import { IconCalendarEvent, IconStar } from '@tabler/icons-vue'
import { computed, ref } from 'vue'

const props = defineProps({
  serie: {
    type: Object as () => Serie,
    required: true
  }
})

const isFlipped = ref(false)
const showFirstAirDate = ref(false)

const overview = computed(() => {
  return props.serie.overview || 'Sem descrição'
})

const voteAverage = computed(() => {
  return props.serie.voteCount > 0 ? props.serie.voteAverage.toFixed(1) : '-'
})

function flipCard() {
  isFlipped.value = !isFlipped.value
}

function parseFirstAirDate(date: string) {
  if (!date) return ''
  const isoDate = useDateTime().parseIsoDate(date)
  return useDateTime().format(isoDate, 'dd/MM/yyyy')
}

function onImageError(event: any) {
  if (event && event.target) {
    event.target.src = 'https://i.imgur.com/5QusPD9.png'
  }
}
</script>

<style scoped>
.perspective {
  perspective: 1000px;
}
.backface-hidden {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.preserve-3d {
  transform-style: preserve-3d;
  --webkit-transform-style: preserve-3d;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
.tooltip-enter-active,
.tooltip-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    visibility 0.2s;
}
.tooltip-enter-from {
  opacity: 0;
  transform: translateY(10px);
  visibility: hidden;
}
.tooltip-enter-to {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}
.tooltip-leave-from {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}
.tooltip-leave-to {
  opacity: 0;
  transform: translateY(10px);
  visibility: hidden;
}
</style>
