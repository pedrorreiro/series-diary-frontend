<template>
  <div
    class="flex h-full w-full flex-col justify-between bg-gray-900 bg-cover bg-center bg-no-repeat px-8 py-16 text-center text-white"
  >
    <div class="mb-4 mt-16">
      <div
        class="mx-auto my-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white"
      >
        <IconX stroke="1.5" class="h-6 w-6" />
      </div>

      <h1 class="mb-4 mt-5 text-3xl font-bold">
        {{ $t('Error.pageNotFound') }}
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconX } from '@tabler/icons-vue'
</script>
