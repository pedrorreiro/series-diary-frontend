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

export type GetShowByIdResponse = {
  name: string
  backdropPath: string
  posterPath: string
  overview: string
  numberOfSeasons: number
  voteAverage: number
  firstAirDate: string
  lastAirDate: string
  totalDuration: number
  tagline: string
  type: ShowType
  genres: {
    id: number
    name: string
  }[]
  numberOfEpisodes: number
  status: string
}

export enum ShowType {
  Documentary = 'Documentary',
  News = 'News',
  Miniseries = 'Miniseries',
  Reality = 'Reality',
  Scripted = 'Scripted',
  TalkShow = 'Talk Show',
  Video = 'Video',
}