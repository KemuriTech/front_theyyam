<template>
  <div v-if="messages.length" class="rounded-md bg-red-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">{{getHeading}}</h3>
        <div class="mt-2 text-sm text-red-700">
          <ul role="list" class="list-disc pl-5 space-y-1">
            <li v-for="(message, index) in messages" :key="index">{{message}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { XCircleIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  messages : {
    type: Array
  }
});

const getHeading = computed(() => {
  if (props.messages.length > 1) {
    return `There were ${props.messages.length} errors with your submission`;
  }
  return 'There was an error with your submission';
});

</script>
