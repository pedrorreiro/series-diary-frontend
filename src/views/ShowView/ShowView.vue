<template>
  <div class="h-full w-full bg-background p-6">
    <div class="relative mx-auto mb-40 h-[480px] w-full">
      <div v-if="!serie" class="skeleton-pulse h-[480px] w-full rounded-[40px]" />
      <img
        v-else
        class="h-full w-full rounded-[40px] object-cover"
        :src="serie.backdropPath"
        draggable="false"
        alt="Backdrop"
      />

      <ShowTitle
        class="lg:left[0px] absolute left-1/2 max-w-[420px] -translate-x-1/2 -translate-y-1/2"
        :title="serie?.name"
      />
    </div>

    <div class="tabs mx-auto my-8 gap-1">
      <div
        @click="setCurrentMenuOption('about')"
        :class="currentMenuOption === 'about' && 'tab-active'"
        class="tab tab-active tab-pill"
      >
        Sobre
      </div>
      <div
        @click="setCurrentMenuOption('episodes')"
        :class="currentMenuOption === 'episodes' && 'tab-active'"
        class="tab tab-pill"
      >
        Lista de episódios
      </div>
    </div>

    <div
      class="flex flex-col items-center align-top lg:flex-row lg:items-start lg:justify-between lg:gap-8"
    >
      <ShowDetails :serie="serie" v-if="currentMenuOption === 'about' && !!serie" />
      <EpisodesList
        v-else-if="currentMenuOption === 'episodes' && !!serie"
        :seasons-list="[1, 2, 3]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ShowTitle from '@/components/ShowTitle/ShowTitle.vue'
import { showErrorToast } from '@/helpers/toast-models'
import SerieService from '@/services/SerieService/SerieService'
import type { GetShowByIdResponse } from '@/services/SerieService/types'
import EpisodesList from '@components/EpisodesList/EpisodesList.vue'
import ShowDetails from '@components/ShowDetails/ShowDetails.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

type MenuOption = 'about' | 'episodes'

const router = useRoute()

const currentMenuOption = ref<MenuOption>('about')

const serie = ref<GetShowByIdResponse | null>(null)

const setCurrentMenuOption = (option: MenuOption) => {
  currentMenuOption.value = option
}

onMounted(async () => {
  const getShowByIdResponse = await SerieService.getShowById(parseInt(router.params.id as string))
  if (getShowByIdResponse.isRight()) {
    serie.value = getShowByIdResponse.value
  } else {
    console.log(getShowByIdResponse.value)
    const errorMessage = getShowByIdResponse.value.message
    showErrorToast(errorMessage)
  }
})
</script>
