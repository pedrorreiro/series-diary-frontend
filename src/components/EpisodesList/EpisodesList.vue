<template>
  <div>
    <div class="dropdown">
      <label class="btn my-2" tabindex="0">{{ selectedSeason }}ª Temporada</label>
      <div class="dropdown-menu dropdown-menu-bottom-right">
        <a
          v-for="season in seasonsList"
          :key="season"
          class="dropdown-item text-sm"
          @click="setCurrentMenuOption(season)"
        >
          {{ season }}ª Temporada
        </a>
      </div>
    </div>

    <div>
      <div v-for="episode in seasonEpisodes" :key="episode.numberInSeason">legal</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type EpisodesListProps = {
  seasonsList: number[]
}

type Episode = {
  numberInSeason: number
  thumbnail: string
  title: string
  runtime: string
  releasedDate: Date
  rating: number
  description: string
}

const episodes: Episode[] = [
  {
    numberInSeason: 1,
    thumbnail: 'https://via.placeholder.com/150/0000FF/808080?text=Episode+1',
    title: 'The One Where It All Began',
    runtime: '22 min',
    releasedDate: new Date('1994-09-22'),
    rating: 8.7,
    description:
      "Monica's old high school friend Rachel moves in with her after leaving her fiancé at the altar."
  },
  {
    numberInSeason: 2,
    thumbnail: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Episode+2',
    title: 'The One with the Sonogram at the End',
    runtime: '22 min',
    releasedDate: new Date('1994-09-29'),
    rating: 8.2,
    description:
      'Ross finds out his ex-wife, Carol, is pregnant, and Rachel returns her engagement ring to Barry.'
  },
  {
    numberInSeason: 3,
    thumbnail: 'https://via.placeholder.com/150/00FF00/000000?text=Episode+3',
    title: 'The One with the Thumb',
    runtime: '22 min',
    releasedDate: new Date('1994-10-06'),
    rating: 7.9,
    description:
      'Monica gets upset when she learns that her boyfriend is a high school senior. Chandler starts smoking again.'
  },
  {
    numberInSeason: 4,
    thumbnail: 'https://via.placeholder.com/150/FFFF00/000000?text=Episode+4',
    title: 'The One with George Stephanopoulos',
    runtime: '22 min',
    releasedDate: new Date('1994-10-13'),
    rating: 8.1,
    description:
      'The girls spy on George Stephanopoulos across the street. The guys go to a hockey game.'
  },
  {
    numberInSeason: 5,
    thumbnail: 'https://via.placeholder.com/150/FFA500/FFFFFF?text=Episode+5',
    title: 'The One with the East German Laundry Detergent',
    runtime: '22 min',
    releasedDate: new Date('1994-10-20'),
    rating: 8.5,
    description:
      'Ross and Rachel wash their dirty laundry together, and Monica experiences some dating problems.'
  },
  {
    numberInSeason: 6,
    thumbnail: 'https://via.placeholder.com/150/800080/FFFFFF?text=Episode+6',
    title: 'The One with the Butt',
    runtime: '22 min',
    releasedDate: new Date('1994-10-27'),
    rating: 8.0,
    description: "Joey gets his big break when he is hired to be Al Pacino's stunt butt."
  },
  {
    numberInSeason: 7,
    thumbnail: 'https://via.placeholder.com/150/FFC0CB/000000?text=Episode+7',
    title: 'The One with the Blackout',
    runtime: '22 min',
    releasedDate: new Date('1994-11-03'),
    rating: 9.0,
    description:
      "New York suffers a blackout, and the gang heads to Monica's apartment. Chandler gets trapped in an ATM vestibule."
  },
  {
    numberInSeason: 8,
    thumbnail: 'https://via.placeholder.com/150/000000/FFFFFF?text=Episode+8',
    title: 'The One Where Nana Dies Twice',
    runtime: '22 min',
    releasedDate: new Date('1994-11-10'),
    rating: 8.3,
    description:
      "Ross and Monica attend their grandmother's funeral, and Chandler questions his sexual orientation."
  },
  {
    numberInSeason: 9,
    thumbnail: 'https://via.placeholder.com/150/008080/FFFFFF?text=Episode+9',
    title: 'The One Where Underdog Gets Away',
    runtime: '22 min',
    releasedDate: new Date('1994-11-17'),
    rating: 7.8,
    description:
      'The gang has Thanksgiving dinner together after they all miss their family festivities.'
  },
  {
    numberInSeason: 10,
    thumbnail: 'https://via.placeholder.com/150/ADD8E6/000000?text=Episode+10',
    title: 'The One with the Monkey',
    runtime: '22 min',
    releasedDate: new Date('1994-12-15'),
    rating: 8.2,
    description:
      "The gang makes a pact not to bring dates to their New Year's Eve party, but it gets complicated."
  }
]

defineProps<EpisodesListProps>()

const selectedSeason = ref(1)
const seasonEpisodes = ref<Episode[]>([])

async function setCurrentMenuOption(season: number) {
  selectedSeason.value = season

  seasonEpisodes.value = await Promise.resolve(episodes)
}
</script>
