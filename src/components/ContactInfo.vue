<template>
  <div v-if="showContactInfo">
    <span v-if="contactInfo.name">{{ contactInfo.name }}</span>
    <span v-if="contactInfo.designation">({{ contactInfo.designation }})</span>
    <div v-for="contact in contactInfo.contacts" :key="contact">
      <a class="no-underline text-gray-600 font-normal" :href="formattedTel(contact)">{{ contact }}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contactInfo: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    showContactInfo() {
      const { name, designation, contacts } = this.contactInfo;
      return name || designation || (contacts && contacts.length > 0);
    },
  },
  methods: {
    formattedTel(tel) {
      return `tel:${tel}`;
    },
  },
};
</script>