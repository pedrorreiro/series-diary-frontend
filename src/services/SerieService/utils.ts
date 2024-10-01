import { right, wrong, type Either } from '@/core/either'
import { config } from '@/default'
import { showErrorToast } from '@/helpers/toast-models'
import type { AxiosError, AxiosInstance, AxiosRequestHeaders, AxiosResponse } from 'axios'
import axios from 'axios'
import { errorResponseMap } from './constraints'
import { ApiError } from './errors'

type ApiResponse<SuccessResponse> = Promise<Either<ApiError, SuccessResponse>>

export async function initService(httpClient: AxiosInstance): Promise<AxiosInstance> {
  httpClient = axios.create({
    baseURL: config.SerieService.baseUrl as string
  })

  httpClient.defaults.baseURL = config.SerieService.baseUrl as string
  httpClient.defaults.headers.common['Content-Type'] = 'application/json'

  return httpClient
}

export async function setRequestInterceptors(client: AxiosInstance) {
  client.interceptors.request.use(
    (requestConfig) => {
      if (requestConfig.url && typeof requestConfig.url === 'string') {
        requestConfig.url = `${config.SerieService.baseUrl}${requestConfig.url.replace(/\/+$/, '')}` // Remove barras no final da URL
      }

      requestConfig.headers = {
        ...requestConfig.headers
        // Authorization: `Bearer ${config.SerieService.token}`
      } as unknown as AxiosRequestHeaders

      return requestConfig
    },
    (error: any) => {
      return Promise.reject(error)
    }
  )

  return client
}

export async function setResponseInterceptors(client: AxiosInstance) {
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const errorStatus = error.response?.status
      let errorName = 'Error'

      let errorMsg = errorResponseMap({
        errorStatus,
        routeName: error.config.method?.toUpperCase()
      })

      if (error.response) {
        if (error.response.status === 401 && error.response?.data.name === 'TokenExpiredError') {
          // await refreshToken();

          return client(error.config)
        }

        if (error.response.data) {
          errorName = error.response.data.name
          errorMsg = error.response.data.message
        }
      }
      console.log(error)
      showErrorToast(errorMsg)

      return Promise.reject(new ApiError(errorName, errorMsg))
    }
  )
}

export async function handleAxiosResponse<SuccessResponse>(
  request: Promise<AxiosResponse>
): ApiResponse<SuccessResponse> {
  try {
    const response = await request

    return right(response.data as SuccessResponse)
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>
    return wrong(axiosError)
  }
}
