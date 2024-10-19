<template>
  <div class="h-full w-full bg-background p-6">
    <div class="relative mx-auto mb-40 h-[480px] w-full">
      <div v-if="!show" class="skeleton-pulse h-[480px] w-full rounded-[40px]" />

      <img
        v-else
        :src="show.backdropPath"
        alt="Backdrop"
        draggable="false"
        class="h-full w-full rounded-[40px] object-cover"
      />

      <ShowTitle
        :title="show?.name"
        class="absolute left-1/2 max-w-[420px] -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0"
        :is-watch-show-button-disabled="areAllEpisodesIdsLoading"
        :is-loading="isProcessingRequest"
        @watch-show="watchShow"
        @unwatch-show="unwatchShow"
      />
    </div>

    <div class="tabs mx-auto my-8 gap-1">
      <div
        v-for="option in menuOptions"
        :key="option.value"
        @click="setCurrentMenuOption(option.value)"
        :class="[
          '!hover:bg-background tab tab-pill bg-background-2 text-secondary',
          { '!hover:bg-background tab-active !bg-primary': currentMenuOption === option.value }
        ]"
      >
        {{ option.label }}
      </div>
    </div>

    <div
      class="flex flex-col items-center align-top lg:flex-row lg:items-start lg:justify-between lg:gap-8"
    >
      <ShowDetails v-if="currentMenuOption === 'about' && show" :serie="show" />

      <EpisodesList
        v-else-if="currentMenuOption === 'episodes' && show"
        @season:change="selectedSeason = $event"
        :show="show"
        :episodes="episodes"
        :selected-season="selectedSeason"
        :loading="isEpisodesLoading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ShowTitle from '@/components/ShowTitle/ShowTitle.vue'
import { useDiaryStore } from '@/stores/diary/store'
import EpisodesList from '@components/EpisodesList/EpisodesList.vue'
import ShowDetails from '@components/ShowDetails/ShowDetails.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAllEpisodesIdsQuery, useEpisodesQuery, useShowQuery } from './query'

type MenuOption = 'about' | 'episodes'

const route = useRoute()
const showId = parseInt(route.params.id as string)

const currentMenuOption = ref<MenuOption>('about')
const selectedSeason = ref<number>(1)

const isProcessingRequest = ref(false)

const { data: show } = useShowQuery(showId)
const { data: episodes, isLoading: isEpisodesLoading } = useEpisodesQuery(showId, selectedSeason)
const { isLoading: areAllEpisodesIdsLoading } = useAllEpisodesIdsQuery(showId)

const menuOptions: Array<{
  label: string
  value: MenuOption
}> = [
  { label: 'Sobre', value: 'about' },
  { label: 'Lista de episódios', value: 'episodes' }
]

const setCurrentMenuOption = (option: MenuOption) => {
  currentMenuOption.value = option
}

const diaryStore = useDiaryStore()

async function watchShow() {
  isProcessingRequest.value = true
  await diaryStore.actions.show.watch(showId)
  isProcessingRequest.value = false
}

async function unwatchShow() {
  isProcessingRequest.value = true
  await diaryStore.actions.show.unwatch(showId)

  isProcessingRequest.value = false
}
</script>
