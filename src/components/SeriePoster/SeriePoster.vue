<template>
  <div
    class="perspective w-[240px] select-none overflow-hidden rounded-2xl text-center hover:cursor-pointer"
    @click="flipCard"
  >
    <div
      class="preserve-3d h-full w-full transform bg-primary-background p-2 transition-transform duration-700"
      :class="{ 'rotate-y-180': isFlipped }"
    >
      <!-- Frente  -->
      <div class="relative w-full backface-hidden">
        <div class="absolute top-2 flex w-full flex-row items-center justify-between px-2">
          <RatingBadge :rating="voteAverage" />
        </div>

        <div class="relative overflow-hidden rounded-lg">
          <img
            draggable="false"
            class="m-auto h-[300px] w-full rounded-lg transition-transform duration-300 hover:scale-105 active:scale-100"
            :src="`${serie.posterPath}`"
            @error="onImageError"
            alt="poster"
          />
        </div>
        <div class="flex flex-row items-center justify-between">
          <p
            :title="serie.name"
            class="my-4 ml-2 truncate text-left font-poppins font-semibold text-primary-text"
          >
            {{ serie.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Serie } from '@services/SerieService/types'
import { computed, ref } from 'vue'
import RatingBadge from '../Rating/RatingBadge.vue'

const props = defineProps({
  serie: {
    type: Object as () => Serie,
    required: true
  }
})

const isFlipped = ref(false)

const voteAverage = computed(() => {
  return props.serie.voteCount > 0 ? props.serie.voteAverage.toString() : '-'
})

function flipCard() {
  isFlipped.value = !isFlipped.value
}

function onImageError(event: any) {
  if (event && event.target) {
    event.target.src = 'https://i.imgur.com/5QusPD9.png'
  }
}
</script>
