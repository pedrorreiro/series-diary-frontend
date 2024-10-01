<template>
  <div class="dropdown w-full">
    <input
      v-model="serieQuery"
      class="input input-solid input-primary input-block"
      placeholder="Procure aqui sua série favorita"
      @keyup="onKeyUp"
    />

    <div class="dropdown-menu w-full">
      <div
        v-if="isAutoCompleteLoading"
        class="spinner-dot-pulse mx-auto my-4 [--spinner-color:var(--gray-12)]"
      >
        <div class="spinner-pulse-dot"></div>
      </div>

      <div v-else>
        <a
          v-for="serie in seriesAutoComplete"
          :key="serie.image"
          @click="onAutocompleteClick(serie.name)"
          class="dropdown-item r flex flex-row items-center gap-2 text-sm"
        >
          <img @error="onImageError" class="h-8 w-8 rounded-full" :src="serie.image" alt="Série" />
          {{ serie.name }}
        </a>
        <a v-if="seriesAutoComplete.length === 0" class="d text-sm">Sem resultados</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SerieService from '@/services/SerieService/SerieService'
import type { QuerySeriesResponse } from '@/services/SerieService/types'
import debounce from 'lodash.debounce'
import { defineEmits, ref, watch } from 'vue'

const serieQuery = defineModel({ type: String, default: '' })
const isAutoCompleteLoading = ref(false)
const searchTriggeredByClick = ref(false)
const seriesAutoComplete = ref<
  {
    name: string
    image: string
  }[]
>([])
const emit = defineEmits(['onAutoCompleteClick'])

function onImageError(event: any) {
  if (event && event.target) {
    event.target.src = 'https://i.imgur.com/5QusPD9.png'
  }
}

const fetchSeries = async () => {
  if (!serieQuery.value) return []

  const result = (await SerieService.querySeries(serieQuery.value, 1)).value as QuerySeriesResponse

  const seriesNames = result.results.map((serie) => {
    return {
      name: serie.name,
      image: serie.posterPath
    }
  })

  const uniqueSeriesNames = seriesNames.filter(
    (serie, index, self) => self.findIndex((s) => s.name === serie.name) === index
  )

  seriesAutoComplete.value = uniqueSeriesNames
}

const onKeyUp = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    onAutocompleteClick(serieQuery.value)
  }
}

watch(
  serieQuery,
  debounce(async () => {
    if (searchTriggeredByClick.value) {
      searchTriggeredByClick.value = false
      return
    }

    if (serieQuery.value) {
      isAutoCompleteLoading.value = true
      await fetchSeries()
      isAutoCompleteLoading.value = false
    }
  }, 500)
)

const onAutocompleteClick = async (serieName: string) => {
  serieQuery.value = serieName
  searchTriggeredByClick.value = true
  emit('onAutoCompleteClick', serieName)
}
</script>
