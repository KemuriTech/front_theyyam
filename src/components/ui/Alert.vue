<template>
  <div :class="`text-white px-6 py-4 border-0 rounded relative mb-4 ${getColor}`">
    <span class="inline-block align-middle mr-8">{{message}}</span>
    <button class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" v-on:click="closeAlert">
      <span>×</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    default:'success',
    type: String,
  },
  message : {
    type: String
  }
});

const getColor = computed(() => {
  switch (props.type) {
  case 'success':
    return 'bg-lime-500';
  case 'danger':
    return 'bg-rose-500';
  case 'warning':
    return 'bg-amber-500';
  case 'info':
    return 'bg-cyan-500';
  default:
    return 'bg-lime-500';
  }
})

const closeAlert = (event) => {
  let element = event.target;
  while(element.nodeName !== 'BUTTON'){
    element = element.parentNode;
  }
  element.parentNode.parentNode.removeChild(element.parentNode);
}
</script>
