<template>
  <div @scroll="handleScroll" class="h-screen overflow-y-auto bg-background">
    <div class="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 py-8" id="top">
      <div class="mx-auto flex w-full max-w-[500px] flex-col gap-4">
        <h1 class="text-center text-3xl font-semibold text-secondary">Diário de Séries</h1>

        <SearchBar v-model="serieQuery" @onAutoCompleteClick="async () => await fetchSeries(1)" />

        <button
          class="btn mb-2 bg-primary text-secondary"
          :class="[
            {
              'btn-loading': isLoading
            }
          ]"
          :disabled="isSearchButtonDisabled"
          @click="fetchSeries(1)"
        >
          <p class="text-white">Pesquisar</p>
        </button>
      </div>

      <div class="flex flex-wrap justify-center gap-2" v-if="isLoading && page === 1">
        <div class="poster skeleton-pulse" v-for="fakeSerie in new Array(8)" :key="fakeSerie" />
      </div>

      <div>
        <a href="#top">
          <div
            v-if="series && series?.length > 0"
            class="bg-primary-text fixed bottom-6 right-6 z-10 rounded-full p-2"
          >
            <IconChevronUp class="h-5 w-5 text-primary" />
          </div>
        </a>
        <div class="flex flex-wrap justify-center gap-2" v-if="series && series?.length > 0">
          <SeriePoster
            @click="openShowDetails(serie.id)"
            v-for="serie in series"
            :serie="serie"
            :key="serie.id"
          />
        </div>
        <div
          v-if="isLoading && page > 1"
          class="spinner-dot-pulse mx-auto my-4 [--spinner-color:var(--gray-12)]"
        >
          <div class="spinner-pulse-dot"></div>
        </div>
        <div>
          <p v-if="series && series?.length === 0" class="text-center text-red-500">
            Nenhuma série encontrada
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBar from '@/components/SearchBar/SearchBar.vue'
import SeriePoster from '@/components/SeriePoster/SeriePoster.vue'
import router from '@/router'

import SerieService from '@/services/SerieService/SerieService'
import type { QuerySeriesResponse, Serie } from '@/services/SerieService/types'
import { IconChevronUp } from '@tabler/icons-vue'
import { computed } from 'vue'

import { ref } from 'vue'

const serieQuery = ref('')
const page = ref(1)
const isLoading = ref(false)
const lastQuery = ref('')
const isSearchButtonDisabled = computed(
  () => !serieQuery.value.length || isLoading.value || serieQuery.value === lastQuery.value
)

const seriesResultData = ref<{
  totalPages: number
  totalResults: number
} | null>(null)

const series = ref<Serie[] | null>(null)

const openShowDetails = (id: number) => {
  setTimeout(() => {
    router.push({ name: 'show', params: { id: id.toString() } })
  }, 500)
}

const fetchSeries = async (newPage?: number) => {
  if (newPage === 1) series.value = null

  if (isLoading.value) return

  if (newPage) {
    page.value = newPage
  }

  isLoading.value = true

  const result = await SerieService.queryShows(serieQuery.value, page.value)
  let data: QuerySeriesResponse

  if (result.isRight()) {
    data = result.value
  } else {
    isLoading.value = false
    return
  }

  const currentSeries = series.value || ([] as Serie[])

  seriesResultData.value = {
    totalPages: data.totalPages,
    totalResults: data.totalResults
  }

  lastQuery.value = serieQuery.value

  series.value = [...currentSeries, ...data.results]

  isLoading.value = false
}

const handleScroll = (event: Event) => {
  if (isLoading.value) return
  const target = event.currentTarget as HTMLElement
  const scrolledTo = target.scrollTop + target.clientHeight
  const isReachBottom = Math.ceil(target.scrollHeight) <= scrolledTo

  if (page.value >= seriesResultData.value?.totalPages!) return

  if (isReachBottom && serieQuery.value.length > 0) {
    page.value += 1
    fetchSeries(page.value)
  }
}
</script>
