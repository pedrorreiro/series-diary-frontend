import type { ShowType } from "@/services/SerieService/types";

export type Serie = {
  posterPath: string;
  tagline: string;
  overview: string;
  voteAverage: number;
  genres: {
    id: number;
    name: string;
  }[],
  firstAirDate: string;
  numberOfSeasons: number;
  numberOfEpisodes: number;
  status: string;
  lastAirDate: string;
  type: ShowType;
}