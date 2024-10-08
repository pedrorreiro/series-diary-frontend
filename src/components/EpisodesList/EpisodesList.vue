<template>
  <div>
    <div class="dropdown">
      <label class="btn my-2" tabindex="0">{{ selectedSeason }}ª Temporada</label>
      <div class="dropdown-menu dropdown-menu-bottom-right">
        <a
          v-for="season in seasonsList"
          :key="season"
          class="dropdown-item text-sm"
          @click="emit('season:change', season)"
        >
          {{ season }}ª Temporada
        </a>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <EpisodeCard v-for="episode in episodes" :key="episode.episodeNumber" :episode="episode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Episode } from '@/services/SerieService/types'
import EpisodeCard from '../EpisodeCard/EpisodeCard.vue'

const emit = defineEmits(['season:change'])

type EpisodesListProps = {
  seasonsList: number[]
  episodes: Episode[]
  showId: number
  loading: boolean
  selectedSeason: number
}

defineProps<EpisodesListProps>()
</script>
