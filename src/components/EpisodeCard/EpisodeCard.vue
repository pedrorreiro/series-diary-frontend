<template>
  <div
    class="flex flex-col gap-4 rounded-lg bg-background-2 hover:bg-background-2/70 active:bg-background-2 md:flex-row"
  >
    <img
      :src="episode.stillPath"
      alt="thumbnail"
      class="w-full rounded-l-lg object-contain md:w-[350px]"
      @error="onImageError"
      draggable="false"
    />

    <div class="flex w-full flex-col gap-2 p-4">
      <p class="text-sm text-secondary/70">{{ formatIsoDate(episode.airDate) }}</p>

      <div class="flex flex-col gap-4">
        <p>#{{ episode.episodeNumber }} - {{ episode.name }}</p>
        <p class="line-clamp-3 text-sm text-secondary/70 lg:line-clamp-2" :title="episode.overview">
          {{ episode.overview || 'Sem descrição...' }}
        </p>

        <div class="flex flex-row items-center justify-between">
          <div class="flex flex-row items-center gap-3">
            <RatingBadge :rating="episode.voteAverage" />
            <div class="flex select-none flex-row gap-1">
              <IconClockHour1 stroke="2" class="h-6 w-6" />
              <div>{{ episode.runtime }}</div>
            </div>
          </div>

          <IconCircle stroke="{1}" class="h-6 w-6" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatIsoDate } from '@/helpers/utils'
import type { Episode } from '@/services/SerieService/types'
import { IconCircle, IconClockHour1 } from '@tabler/icons-vue'
import RatingBadge from '../RatingBadge/RatingBadge.vue'

interface EpisodeCardProps {
  episode: Episode
}

const { episode } = defineProps<EpisodeCardProps>()

function onImageError(event: any) {
  if (event && event.target) {
    event.target.src = 'https://i.imgur.com/IAAinxX.png'
  }
}
</script>
