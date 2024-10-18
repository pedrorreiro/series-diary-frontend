import { type Either } from '@/core/either'
import type { AxiosInstance } from 'axios'
import type { ApiError } from './errors'
import type {
  GetEpisodesListResponse,
  GetSeasonDetailsResponse,
  QuerySeriesResponse,
  Show
} from './types'
import {
  handleAxiosResponse,
  initService,
  setRequestInterceptors,
  setResponseInterceptors
} from './utils'

class SerieService {
  private static httpClient: AxiosInstance

  public static async init() {
    this.httpClient = await initService(this.httpClient)
    setResponseInterceptors(this.httpClient)
    setRequestInterceptors(this.httpClient)
  }

  public static async queryShows(
    search: string,
    page: number
  ): Promise<Either<ApiError, QuerySeriesResponse>> {
    const url = `/search-serie?query=${search}&page=${page}`
    const request = this.httpClient.get(url)

    const response = await handleAxiosResponse<QuerySeriesResponse>(request)

    return response
  }

  public static async getShowById(id: number): Promise<Either<ApiError, Show>> {
    const url = `/get-show-by-id/${id}`
    const request = this.httpClient.get(url)

    const response = await handleAxiosResponse<Show>(request)

    return response
  }

  public static async getSeasonDetails(
    showId: number,
    season: number
  ): Promise<Either<ApiError, GetSeasonDetailsResponse>> {
    const url = `/get-season-details?showId=${showId}&season=${season}`
    const request = this.httpClient.get(url)

    const response = await handleAxiosResponse<GetSeasonDetailsResponse>(request)

    return response
  }

  public static async getEpisodesList(
    showId: number,
    seasonNumbers?: number[]
  ): Promise<Either<ApiError, GetEpisodesListResponse>> {
    let url = `/list-episodes-ids?showId=${showId}`

    seasonNumbers &&
      seasonNumbers.forEach((sn, index) => {
        if (index === 0) {
          url += `?seasonNumbers=${sn}`
        } else {
          url += `&seasonNumbers=${sn}`
        }
      })

    const request = this.httpClient.get(url)

    const response = await handleAxiosResponse<GetEpisodesListResponse>(request)

    return response
  }
}

export default SerieService
