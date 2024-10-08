import SerieService from '@/services/SerieService/SerieService'
import type { Episode } from '@/services/SerieService/types'
import { useQuery } from '@tanstack/vue-query'
import type { Ref } from 'vue'

export const useEpisodesQuery = (showId: number, selectedSeason: Ref<number>) => {
  return useQuery<Episode[], Error>({
    queryKey: ['fetch-episodes', showId, selectedSeason],
    queryFn: async () => {
      const result = await SerieService.getSeasonDetails(showId, selectedSeason.value)

      if (result.isRight()) {
        return result.value.episodes
      } else {
        throw new Error(result.value.message)
      }
    },
    initialData: [],
    enabled: !!showId && !!selectedSeason.value
  })
}

export const useShowQuery = (showId: number) => {
  return useQuery({
    queryKey: ['fetch-show', showId],
    queryFn: async () => {
      const result = await SerieService.getShowById(showId)

      if (result.isRight()) {
        return result.value
      } else {
        throw new Error(result.value.message)
      }
    },
    enabled: !!showId
  })
}
