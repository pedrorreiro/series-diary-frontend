<template>
  <div class="h-full">
    <LoadingView />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import { RouterView } from 'vue-router'
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
