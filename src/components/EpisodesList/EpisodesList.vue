<template>
  <div class="flex w-full flex-col gap-2">
    <div class="flex flex-row items-center gap-2">
      <div class="dropdown">
        <label class="btn my-2 bg-background-2 text-secondary" tabindex="0"
          >{{ selectedSeason }}ª Temporada</label
        >
        <div
          class="dropdown-menu dropdown-menu-bottom-right max-h-[200px] overflow-auto bg-background"
        >
          <a
            v-for="season in seasonsList"
            :key="season"
            class="dropdown-item text-sm text-secondary"
            @click="emit('season:change', season)"
          >
            {{ season }}ª Temporada
          </a>
        </div>
      </div>

      <WatchedIndicator
        collection="season"
        type="button"
        :is-watched="isSeasonWatched"
        :is-loading="false"
        @click:watch="watchSeason"
        @click:unwatch="unwatchSeason"
      />
    </div>

    <div class="flex w-full flex-col gap-4 overflow-scroll">
      <template v-if="episodes.length > 0">
        <EpisodeCard
          v-for="episode in episodes"
          :key="episode.episodeNumber"
          :episode="episode"
          :show-id="show.id"
        />
      </template>

      <template v-else>
        <div
          v-for="index in new Array(8)"
          :key="index"
          :class="`skeleton-pulse w-full rounded-lg`"
          :style="`height: ${skeletonHeight}px`"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Episode, Show } from '@/services/SerieService/types'
import { computed } from 'vue'
import EpisodeCard from '../EpisodeCard/EpisodeCard.vue'

import { LARGE_WIDTH } from '@/helpers/constraints'
import { useDiaryStore } from '@/stores/diary/store'
import WatchedIndicator from '../WatchedIndicator/WatchedIndicator.vue'

const emit = defineEmits(['season:change'])

const screenWith = window.innerWidth

// Na versão de pc, o skeleton tem a altura da imagem do episódio
// Na versão mobile, o skeleton tem a altura de 1.4x a altura da imagem (isso é aproximado)
const skeletonHeight = screenWith >= LARGE_WIDTH ? 197 : ((screenWith * 9) / 16) * 1.4

type EpisodesListProps = {
  episodes: Episode[]
  show: Show
  loading: boolean
  selectedSeason: number
}

const props = defineProps<EpisodesListProps>()

const diaryStore = useDiaryStore()

const episodesIds = computed(() => props.episodes.map((episode) => episode.id))

const seasonsList = computed(() =>
  Array.from({ length: props.show.numberOfSeasons }, (_, i) => i + 1)
)

const isSeasonWatched = computed(() => {
  return diaryStore.actions.season.isWatched(episodesIds.value)
})

function watchSeason() {
  diaryStore.actions.season.watch(episodesIds.value, props.show.id)
}

function unwatchSeason() {
  diaryStore.actions.season.unwatch(episodesIds.value, props.show.id)
}
</script>
