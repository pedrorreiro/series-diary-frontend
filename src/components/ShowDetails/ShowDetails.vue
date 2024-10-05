<template>
  <div class="mb-8 lg:mb-0">
    <div
      v-if="!serie"
      class="skeleton-pulse max-h-[720px] max-w-[480px] rounded-[24px] object-cover"
    />
    <img
      v-else
      :src="serie.posterPath"
      class="h-[500px] max-h-[720px] w-full max-w-[480px] rounded-[24px] object-cover lg:h-[720px] lg:w-[480px]"
      draggable="false"
      alt="Poster"
    />
  </div>

  <div v-if="serie">
    <h2 v-if="serie.tagline" class="mb-4 text-justify text-lg font-semibold">
      {{ serie.tagline }}
    </h2>
    <p class="text-justify">{{ serie.overview }}</p>

    <div class="my-4 flex flex-wrap gap-2">
      <RatingBadge :rating="`${serie.voteAverage}`" />
      <span v-for="genre in serie.genres" :key="genre.id" class="badge badge-flat-primary">{{
        genre.name
      }}</span>
    </div>

    <div>
      <div class="grid-rows-* grid grid-cols-2 gap-4">
        <div class="show-info">
          <p>Data de estréia</p>
          <p>{{ formatDate(serie.firstAirDate) }}</p>
        </div>

        <div class="show-info first:font-semibold">
          <p>Número de temporadas</p>
          <p>{{ serie.numberOfSeasons }}</p>
        </div>

        <div class="show-info">
          <p>Status</p>
          <p>{{ serie?.status }}</p>
        </div>

        <div class="show-info">
          <p>Último episódio lançado</p>
          <p>{{ formatDate(serie.lastAirDate) }}</p>
        </div>

        <div class="show-info">
          <p>Número de temporadas</p>
          <p>{{ serie.numberOfSeasons }}</p>
        </div>

        <div class="show-info">
          <p>Número de episódios</p>
          <p>{{ serie.numberOfEpisodes }}</p>
        </div>

        <div class="show-info">
          <p>Gêneros</p>
          <p>
            {{ serie.genres.map((g) => g.name).join(', ') }}
          </p>
        </div>

        <div class="show-info">
          <p>Tipo</p>
          <p>{{ ShowTypeMap[serie.type] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RatingBadge from '@/components/RatingBadge/RatingBadge.vue'
import { ShowTypeMap } from '@/services/SerieService/map'
import { useDateTime } from '@/value-objects/date-time'
import type { Serie } from './types'

function formatDate(date: string) {
  return useDateTime().format(new Date(date), 'dd/MM/yyyy')
}

defineProps<{
  serie: Serie
}>()
</script>

<style scoped lang="postcss">
.show-info p:first-child {
  @apply font-semibold;
}
.show-info {
  @apply flex flex-col gap-2 rounded-md bg-background-2 p-2;
}
</style>
