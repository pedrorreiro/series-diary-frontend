<template>
  <div class="flex w-full flex-col gap-36 bg-background p-6">
    <div class="relative mx-auto h-[480px] w-full">
      <div v-if="!serie" class="skeleton-pulse h-[480px] w-full rounded-[40px]" />
      <img
        v-else
        class="h-full w-full rounded-[40px] object-cover"
        :src="serie.backdropPath"
        draggable="false"
      />
      <ShowTitle
        class="lg:left[0px] absolute left-1/2 max-w-[420px] -translate-x-1/2 -translate-y-1/2"
        :title="serie?.name"
      />
    </div>

    <div
      class="flex flex-col items-center align-top lg:flex-row lg:items-start lg:justify-between lg:gap-8"
    >
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
              <p>Duração total</p>
              <p>{{ serie.totalDuration }}</p>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RatingBadge from '@/components/RatingBadge/RatingBadge.vue'
import ShowTitle from '@/components/ShowTitle/ShowTitle.vue'
import { showErrorToast } from '@/helpers/toast-models'
import SerieService from '@/services/SerieService/SerieService'
import type { GetShowByIdResponse } from '@/services/SerieService/types'
import { useDateTime } from '@/value-objects/date-time'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const router = useRoute()

const serie = ref<GetShowByIdResponse | null>(null)

function formatDate(date: string) {
  return useDateTime().format(new Date(date), 'dd/MM/yyyy')
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

<style scoped lang="postcss">
.show-info p:first-child {
  @apply font-semibold;
}
.show-info {
  @apply flex flex-col gap-2 rounded-md bg-background-2 p-2;
}
</style>
