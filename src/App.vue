<template>
  <div class="relative mx-auto h-full max-w-[1024px] bg-background">
    <ThemeSwitch class="fixed right-6 top-6 z-50" />
    <LoadingView />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, provide, ref } from 'vue'
import { RouterView } from 'vue-router'
import ThemeSwitch from './components/ThemeSwitch/ThemeSwitch.vue'
import { DarkModeKey, LoadingKey } from './helpers/symbols'
import LoadingView from './views/LoadingView.vue'

const isLoading = ref(false)
const isDarkMode = ref(document.body.classList.contains('dark'))

const updateDarkMode = () => {
  isDarkMode.value = document.body.classList.contains('dark')
}

const toggleLoading = () => {
  isLoading.value = !isLoading.value
}

const setDarkMode = (value: boolean | null) => {
  if (value === null) {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')

    if (prefersDarkScheme.matches) {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    } else {
      document.body.classList.remove('dark')
      document.body.classList.add('light')
    }

    updateDarkMode()
    return
  }

  if (value) {
    document.body.classList.add('dark')
    document.body.classList.remove('light')
  } else {
    document.body.classList.remove('dark')
    document.body.classList.add('light')
  }

  updateDarkMode()
}

const toggleDarkMode = () => {
  const darkMode = document.body.classList.contains('dark')
  if (darkMode) {
    document.body.classList.remove('dark')
    document.body.classList.add('light')
  } else {
    document.body.classList.add('dark')
    document.body.classList.remove('light')
  }

  updateDarkMode()
}

onMounted(() => {
  setDarkMode(null)
})

onUnmounted(() => {
  window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateDarkMode)
})

provide(LoadingKey, {
  get: isLoading,
  toggle: toggleLoading
})

provide(DarkModeKey, {
  get: computed(() => isDarkMode.value),
  toggle: toggleDarkMode,
  set: setDarkMode
})
</script>
