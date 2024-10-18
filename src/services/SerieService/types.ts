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

export type Show = {
  id: number
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

export type Episode = {
  airDate: string
  episodeNumber: number
  id: number
  name: string
  overview: string
  productionCode: string
  seasonNumber: number
  showId: number
  seasonId: string
  stillPath: string
  voteAverage: number
  voteCount: number
  runtime: string
}

export type GetSeasonDetailsResponse = {
  id: number
  airDate: string
  episodes: Episode[]
  name: string
  overview: string
  posterPath: string
  seasonNumber: number
}

export type GetEpisodesListResponse = number[]

export enum ShowType {
  Documentary = 'Documentary',
  News = 'News',
  Miniseries = 'Miniseries',
  Reality = 'Reality',
  Scripted = 'Scripted',
  TalkShow = 'Talk Show',
  Video = 'Video'
}
