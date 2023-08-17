<template>
  <div v-if="show" aria-live="assertive" class="fixed inset-0 flex items-end px-4 py-6 p-10 md:p-20 sm:items-start sm:order-first">
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div class="p-4">
            <div class="flex items-center">
              <div class="w-0 flex-1 flex justify-between">
                <p class="w-0 flex-1 text-sm font-medium text-gray-900">No events found</p>
                <button  @click="emitReset" class="ml-3 font-medium flex-shrink-0 bg-white rounded-md text-sm text-secondary hover:text-opacity-80 hover:outline-none hover:ring-1 hover:ring-offset-4 hover:ring-secondary">Reset</button>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button @click="() => { show = false; emitShowClick(); }" class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'

export default {
  components: {
    XMarkIcon,
  },
  setup(_, { emit }) {
    const show = ref(true)
    
    const emitReset = () => {
      emit('reset-clicked');
    };
    
    const emitShowClick = () => {
      emit('show-clicked');
    };
    
    return {
      show,
      emitReset,
      emitShowClick
    }
  },
}
</script>