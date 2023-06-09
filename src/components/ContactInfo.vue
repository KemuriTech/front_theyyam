<script>
export default {
  props: ['name', 'designation', 'contact1', 'contact2', 'contact3'],
  methods: {
    getTel(tel) {
      return `tel:${tel}`;
    }
  }
};
</script>

<template>
  <div v-if="name || designation || contact1 || contact2 || contact3" class="border-b pb-2 mb-3">
    <span v-if="name">{{ name }}</span> <span v-if="designation">({{ designation }})</span>
    <div v-if="contact1"><a class="no-underline text-gray-600 font-normal" :href="getTel(contact1)">{{ contact1 }}</a></div>
    <div v-if="contact2"><a class="no-underline text-gray-600 font-normal" :href="getTel(contact2)">{{ contact2 }}</a></div>
    <div v-if="contact3"><a class="no-underline text-gray-600 font-normal" :href="getTel(contact3)">{{ contact3 }}</a></div>
  </div>
</template>