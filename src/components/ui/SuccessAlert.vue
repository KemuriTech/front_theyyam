<template>
  <div>
    <div class="rounded-md bg-green-50 p-4 alert-parent">
      <div class="flex">
        <div class="flex-shrink-0">
          <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-green-800">{{ message }}</p>
        </div>
        <div class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5">
            <button
              type="button"
              class="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
              v-on:click="closeAlert"
            >
              <span class="sr-only">Dismiss</span>
              <XMarkIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XMarkIcon, CheckCircleIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
  message: {
    type: String,
  },
});

const closeAlert = (event) => {
  let element = event.target;
  while (!element.parentNode.classList.contains('alert-parent') && element.nodeName !== 'BODY') {
    element = element.parentNode;
  }
  if (element.nodeName !== 'BODY')
    element.parentNode.remove();
};
</script>
