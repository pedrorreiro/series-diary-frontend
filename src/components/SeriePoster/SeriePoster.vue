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
        <div class="flex h-full flex-row items-center justify-between">
          <p
            :title="serie.name"
            class="ml-2 truncate text-left text-sm font-semibold text-background dark:text-secondary"
          >
            {{ serie.name }}
          </p>

          <div @click.stop class="flex h-full py-3 pl-4">
            <WatchedIndicator
              :is-watched="isWatched"
              :is-loading="isProcessingRequest"
              type="icon"
              @click:watch="watchShow"
              @click:unwatch="unwatchShow"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDiaryStore } from '@/stores/diary/store'
import { type Serie } from '@services/SerieService/types'
import { computed, ref } from 'vue'
import RatingBadge from '../RatingBadge/RatingBadge.vue'
import WatchedIndicator from '../WatchedIndicator/WatchedIndicator.vue'

const diaryStore = useDiaryStore()
const isProcessingRequest = ref(false)

const props = defineProps({
  serie: {
    type: Object as () => Serie,
    required: true
  }
})

const isWatched = computed(() => {
  return diaryStore.actions.show.isWatched(props.serie.id)
})

async function watchShow() {
  isProcessingRequest.value = true
  await diaryStore.actions.show.watch(props.serie.id)
  isProcessingRequest.value = false
}

async function unwatchShow() {
  isProcessingRequest.value = true
  await diaryStore.actions.show.unwatch(props.serie.id)
  isProcessingRequest.value = false
}

function onImageError(event: any) {
  if (event && event.target) {
    event.target.src = 'https://i.imgur.com/5QusPD9.png'
  }
}
</script>
