<template>
  <div
    class="flex w-full select-none flex-col gap-4 overflow-hidden rounded-[24px] bg-background-2/80 p-10 backdrop-blur-sm"
  >
    <div class="breadcrumbs text-sm text-secondary">
      <ul>
        <li>
          <a @click="goToHome">Series Diary</a>
        </li>
        <li>
          <a>Series</a>
        </li>
      </ul>
    </div>

    <p
      class="line-clamp-2 text-wrap break-words text-4xl font-semibold text-secondary"
      :title="title"
    >
      {{ title || '' }}
    </p>

    <div class="dropdown">
      <p>Selcionar temporada</p>

      <div class="dropdown-menu">
        <a class="dropdown-item">Sistema</a>
        <a class="dropdown-item"> Escuro</a>
        <a class="dropdown-item"> Claro</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{
  title?: string
}>()

const router = useRouter()

const goToHome = () => {
  router.push('/')
}
</script>
