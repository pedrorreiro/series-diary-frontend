export type Serie = {
  adult: boolean
  id: number
  originCountry: Array<string>
  originalLanguage: string
  originalName: string
  overview: string
  popularity: number
  posterPath: string
  firstAirDate: string
  name: string
  voteAverage: number
  voteCount: number
}

export type QuerySeriesResponse = {
  page: number
  results: Array<Serie>
  totalPages: number
  totalResults: number
}
