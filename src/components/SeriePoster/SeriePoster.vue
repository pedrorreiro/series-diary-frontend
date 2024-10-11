<template>
  <div
    class="perspective w-[240px] select-none overflow-hidden rounded-2xl text-center hover:cursor-pointer"
  >
    <div
      class="preserve-3d h-full w-full transform bg-primary p-2 transition-transform duration-700 dark:bg-background-2"
    >
      <!-- Frente  -->
      <div class="relative w-full backface-hidden">
        <div class="absolute top-2 flex w-full flex-row items-center justify-between px-2">
          <RatingBadge class="z-10" :rating="props.serie.voteAverage" />
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
            class="my-4 ml-2 truncate text-left font-semibold text-background dark:text-secondary"
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
import RatingBadge from '../RatingBadge/RatingBadge.vue'

const props = defineProps({
  serie: {
    type: Object as () => Serie,
    required: true
  }
})

function onImageError(event: any) {
  if (event && event.target) {
    event.target.src = 'https://i.imgur.com/5QusPD9.png'
  }
}
</script>
