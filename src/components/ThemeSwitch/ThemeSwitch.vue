<template>
  <div class="dropdown rounded-full border-2 border-background bg-secondary p-2 backdrop-blur-sm">
    <IconSun v-if="!darkMode" tabindex="0" class="h-6 w-6 text-background"></IconSun>
    <IconMoon v-else tabindex="0" class="h-6 w-6 text-background"></IconMoon>

    <div class="dropdown-menu bg-background">
      <a class="dropdown-item" @click="set(null)"><IconDeviceLaptop class="h-6 w-6" /> Sistema</a>
      <a class="dropdown-item" @click="set(true)"> <IconMoon class="h-6 w-6" />Escuro</a>
      <a class="dropdown-item" @click="set(false)"> <IconSun class="h-6 w-6" />Claro</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DarkModeKey } from '@/helpers/symbols'
import { IconDeviceLaptop, IconMoon, IconSun } from '@tabler/icons-vue'
import { inject } from 'vue'

const darkModeKey = inject(DarkModeKey)
const darkMode = darkModeKey?.get
const set = darkModeKey?.set!
</script>

<style scoped lang="postcss">
.dropdown-item {
  @apply flex flex-row items-center gap-2 text-sm text-secondary hover:bg-background-2;
}
</style>
