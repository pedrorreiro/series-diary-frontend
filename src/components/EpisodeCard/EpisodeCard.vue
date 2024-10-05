<template>
  <div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
interface EpisodeCardProps {
  episodeNumber: number
  episodeTitle: string
  episodeDescription: string
  thumbnail: string
  duration: string
  hasBeenWatched: boolean
  releaseDate: string
}
</script>
