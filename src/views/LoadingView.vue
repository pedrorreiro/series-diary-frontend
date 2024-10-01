<template>
  <transition
    name="fade"
    mode="out-in"
    enter-active-class="transition-opacity duration-500 ease-in-out"
    leave-active-class="transition-opacity duration-500 ease-in-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="absolute inset-0 z-10 bg-black bg-cover bg-center transition-opacity duration-500"
    >
      <div
        class="absolute inset-0 m-auto flex flex-col items-center justify-center bg-black opacity-80"
      >
        <img :src="logo" alt="Logo" class="w-1/2" />

        <p class="font-bold text-white">Carregando...</p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { LoadingKey } from '@/helpers/symbols'
import { inject, ref } from 'vue'

const loading = inject(LoadingKey)
const isLoading = loading?.get

const logo = ref(
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1224px-NASA_logo.svg.png'
)
</script>
