<template>
  <div class="h-full">
    <ThemeSwitch class="absolute right-2 top-2" />
    <LoadingView />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import { RouterView } from 'vue-router'
import ThemeSwitch from './components/ThemeSwitch/ThemeSwitch.vue'
import { LoadingKey } from './helpers/symbols'
import LoadingView from './views/LoadingView.vue'

const isLoading = ref(false)
const toggleLoading = () => {
  isLoading.value = !isLoading.value
}

provide(LoadingKey, {
  get: isLoading,
  toggle: toggleLoading
})
</script>
