export interface ISeason {
  id: string
  episodes: {
    id: number
  }[]
}

export interface EpisodeType {
  id: number
  showId: number
}

export interface IShow {
  id: number
  seasons: ISeason[]
}

export type ActionTarget = 'episode' | 'season' | 'show'
