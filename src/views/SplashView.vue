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
      v-if="show"
      class="absolute inset-0 z-10 bg-black bg-cover bg-center transition-opacity duration-500"
    >
      <div class="absolute inset-0 flex items-center justify-center bg-black opacity-80">
        <img :src="logo" alt="Logo" class="m-auto w-1/2" />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const show = ref(true)

onMounted(async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 2000)
  })

  show.value = false
})

const logo = ref(
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1224px-NASA_logo.svg.png'
)
</script>
