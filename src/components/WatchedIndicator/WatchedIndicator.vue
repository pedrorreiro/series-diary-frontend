<template>
  <div
    class="flex items-center justify-center hover:cursor-pointer"
    :class="{
      'h-7 min-h-7 w-7 min-w-7 hover:scale-105 active:scale-100': type === 'icon'
    }"
  >
    <template v-if="type === 'icon'">
      <IconLoader2 v-if="isLoading" class="h-4 w-4 animate-spin text-secondary" />

      <template v-else>
        <IconCircleCheckFilled
          v-if="isWatched"
          class="h-full w-full text-green-500"
          @click.stop="emit('click:unwatch')"
        />

        <IconCircleCheck v-else class="h-full w-full" @click.stop="emit('click:watch')" />
      </template>
    </template>

    <template v-else-if="type === 'button'">
      <button
        v-if="!isWatched"
        :disabled="disabled"
        class="button btn btn-solid-primary"
        @click.stop="emit('click:watch')"
      >
        <p class="text-center">Marcar como assistido</p>
        <IconLoader2 v-if="isLoading" class="loader" />
      </button>

      <button
        v-else
        :disabled="disabled"
        class="button btn btn-outline-error"
        @click.stop="emit('click:unwatch')"
      >
        <p class="text-center">Marcar como não assistido</p>
        <IconLoader2 v-if="isLoading" class="loader" />
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { IconCircleCheck, IconCircleCheckFilled, IconLoader2 } from '@tabler/icons-vue'

interface Props {
  isWatched: boolean
  isLoading: boolean
  type: 'icon' | 'button'
  disabled?: boolean
}

const { isWatched } = defineProps<Props>()

const emit = defineEmits(['click:watch', 'click:unwatch'])
</script>

<style lang="postcss" scoped>
.loader {
  @apply absolute right-4 h-4 w-4 animate-spin text-secondary;
}

.button {
  @apply flex w-full flex-row justify-center;
}
</style>
