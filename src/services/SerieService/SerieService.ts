import { type Either } from '@/core/either'
import type { AxiosInstance } from 'axios'
import type { ApiError } from './errors'
import type { QuerySeriesResponse } from './types'
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

  public static async querySeries(
    search: string,
    page: number
  ): Promise<Either<ApiError, QuerySeriesResponse>> {
    const url = `/search-serie?query=${search}&page=${page}`
    const request = this.httpClient.get(url)

    const response = await handleAxiosResponse<QuerySeriesResponse>(request)

    return response
  }
}

export default SerieService
