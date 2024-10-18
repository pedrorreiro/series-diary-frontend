import SerieService from '@/services/SerieService/SerieService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDiaryStore = defineStore(
  'diaryStore',
  () => {
    const watchedEpisodes = ref<Record<number, boolean>>({})
    const watchedShows = ref<Record<number, boolean>>({})
    const showsOfInterest = ref<Record<number, boolean>>({})

    const actions = {
      episode: {
        isWatched(episodeId: number): boolean {
          return !!watchedEpisodes.value[episodeId]
        },

        watch(episodeId: number, showId: number) {
          showsOfInterest.value[showId] = true
          watchedEpisodes.value[episodeId] = true
        },

        unwatch(episodeId: number, showId: number) {
          delete watchedShows.value[showId]
          delete watchedEpisodes.value[episodeId]
        }
      },

      season: {
        isWatched(episodeIdList: number[]): boolean {
          return episodeIdList.every((episodeId) => watchedEpisodes.value[episodeId])
        },

        watch(episodeIdList: number[], showId: number) {
          showsOfInterest.value[showId] = true
          episodeIdList.forEach((episodeId) => {
            watchedEpisodes.value[episodeId] = true
          })
        },

        unwatch(episodeIdList: number[], showId: number) {
          delete watchedShows.value[showId]
          episodeIdList.forEach((episodeId) => {
            delete watchedEpisodes.value[episodeId]
          })
        }
      },

      show: {
        isOfInterest(showId: number) {
          return !!showsOfInterest.value[showId]
        },

        isWatched(showId: number) {
          return !!watchedShows.value[showId]
        },

        async watch(showId: number) {
          const episodeIdList = await SerieService.getEpisodesList(showId)

          if (episodeIdList.isWrong()) {
            return
          }

          showsOfInterest.value[showId] = true
          watchedShows.value[showId] = true

          episodeIdList.value.forEach((episodeId) => {
            watchedEpisodes.value[episodeId] = true
          })

          showsOfInterest.value[showId] = true
        },

        async unwatch(showId: number) {
          const episodeIdList = await SerieService.getEpisodesList(showId)

          if (episodeIdList.isWrong()) {
            return
          }

          delete watchedShows.value[showId]
          delete showsOfInterest.value[showId]

          episodeIdList.value.forEach((episodeId) => {
            delete watchedEpisodes.value[episodeId]
          })
        }
      }
    }

    // // Computed Properties
    // const seasonProgress = (seasonId: string) => {
    //   const season = seasons.value.find((s) => s.id === seasonId)
    //   if (season) {
    //     const watchedEpisodesCount = season.episodes.filter((episodeId) => {
    //       const episode = episodes.value.find((e) => e.id === episodeId)
    //       return episode && episode.watched
    //     }).length
    //     const totalEpisodes = season.episodes.length
    //     return (watchedEpisodesCount / totalEpisodes) * 100
    //   }
    //   return 0
    // }

    // const showProgress = (showId: string) => {
    //   const show = shows.value.find((s) => s.id === showId)
    //   if (show) {
    //     const watchedSeasonsCount = show.seasons.filter((seasonId) => {
    //       const season = seasons.value.find((s) => s.id === seasonId)
    //       return season && season.watched
    //     }).length
    //     const totalSeasons = show.seasons.length
    //     return (watchedSeasonsCount / totalSeasons) * 100
    //   }
    //   return 0
    // }

    return {
      watchedShow: watchedShows,
      watchedEpisodes,
      showsOfInterest,
      actions
    }
  },
  {
    persist: true
  }
)