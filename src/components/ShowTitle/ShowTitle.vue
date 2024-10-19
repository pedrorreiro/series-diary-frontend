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

    <WatchedIndicator
      type="button"
      :is-watched="isShowWatched"
      :is-loading="loadingFlag"
      :disabled="isWatchShowButtonDisabled"
      @click:watch="emit('watch-show')"
      @click:unwatch="emit('unwatch-show')"
    />
  </div>
</template>

<script setup lang="ts">
import { useDiaryStore } from '@/stores/diary/store'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import WatchedIndicator from '../WatchedIndicator/WatchedIndicator.vue'

const route = useRoute()
const emit = defineEmits(['watch-show', 'unwatch-show'])
const diaryStore = useDiaryStore()

const showId = ref(parseInt(route.params.id as string))

const props = defineProps<{
  title?: string
  isWatchShowButtonDisabled?: boolean
  isLoading?: boolean
}>()

const router = useRouter()

const isShowWatched = computed(() => diaryStore.actions.show.isWatched(showId.value))

const loadingFlag = computed(() => !!props.isLoading)

const goToHome = () => {
  router.push('/')
}
</script>
