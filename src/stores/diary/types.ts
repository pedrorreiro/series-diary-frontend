export interface IShow {
  id: number
  watched: boolean
  seasons: ISeason[]
}

export interface ISeason {
  id: string
  watched: boolean
  episodes: IEpisode[]
}

export interface IEpisode {
  id: number
  watched: boolean
}

export type ActionTarget = 'episode' | 'season' | 'show'
