<template>
  <div class="flex flex-col gap-4 rounded-lg bg-background-2 md:flex-row">
    <img
      :src="episode.stillPath"
      alt="thumbnail"
      class="w-full rounded-l-lg object-contain md:w-[350px]"
    />

    <div class="flex flex-col gap-2 p-4">
      <p>{{ episode.airDate }}</p>

      <div class="flex flex-col gap-4">
        <p>#{{ episode.episodeNumber }} - {{ episode.name }}</p>
        <p class="text-secondary/70 line-clamp-3 text-sm lg:line-clamp-2">{{ episode.overview }}</p>

        <div class="flex flex-row">
          <div>
            <div>{{ episode.duration }}</div>
            <RatingBadge :rating="episode.voteAverage" />
          </div>

          <IconCircle stroke="{1}" class="h-6 w-6" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Episode } from '@/services/SerieService/types'
import { IconCircle } from '@tabler/icons-vue'
import RatingBadge from '../RatingBadge/RatingBadge.vue'

interface EpisodeCardProps {
  episode: Episode
}

const { episode } = defineProps<EpisodeCardProps>()
</script>
