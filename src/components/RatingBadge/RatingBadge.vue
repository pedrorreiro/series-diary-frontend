<template>
  <div
    :title="`Nota: ${rating ?? 0}`"
    class="flex max-w-[80px] flex-row items-center justify-center gap-2 rounded-lg bg-black bg-opacity-80 px-2 py-1 font-semibold text-yellow-500 backdrop-blur-xl"
  >
    <IconStar class="h-5 w-5" stroke="2.5" />
    <span class="text-white">{{ rating }}</span>
  </div>
</template>

<script setup lang="ts">
import { IconStar } from '@tabler/icons-vue'

defineProps<{
  rating?: string
}>()
</script>
