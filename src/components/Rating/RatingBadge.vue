<template>
  <div
    :title="`Nota: ${rating}`"
    class="z-10 flex flex-row items-center justify-center gap-2 rounded-lg bg-black bg-opacity-80 px-2 py-1 font-poppins font-semibold text-yellow-500 backdrop-blur-xl"
  >
    <IconStar class="h-5 w-5" stroke="2.5" />
    <p>{{ rating }}</p>
  </div>
</template>

<script setup lang="ts">
import { IconStar } from '@tabler/icons-vue'

defineProps<{
  rating: string
}>()
</script>
