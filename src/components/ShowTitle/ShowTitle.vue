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

    <button v-if="!isShowWatched" class="btn btn-solid-primary" @click="watchShow">
      Marcar como assistido
    </button>

    <button v-else class="btn btn-outline-error" @click="unwatchShow">
      Marcar como não assistido
    </button>
  </div>
</template>

<script setup lang="ts">
import { useDiaryStore } from '@/stores/diary/store'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const diaryStore = useDiaryStore()

const showId = ref(parseInt(route.params.id as string))

defineProps<{
  title?: string
}>()

const router = useRouter()

const isShowWatched = computed(() => diaryStore.actions.show.isWatched(showId.value))

function watchShow() {
  diaryStore.actions.show.watch(showId.value)
}

function unwatchShow() {
  diaryStore.actions.show.unwatch(showId.value)
}

const goToHome = () => {
  router.push('/')
}
</script>
