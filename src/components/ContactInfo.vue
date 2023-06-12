<template>
  <div>
    <div v-if="showContactInfo">
      <span v-if="name">{{ name }}</span> <span v-if="designation">({{ designation }})</span>
      <div v-for="contact in contacts" :key="contact">
        <a class="no-underline text-gray-600 font-normal" :href="formattedTel(contact)">{{ contact }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'designation', 'firstContact', 'secondContact', 'thirdContact'],
  computed: {
    showContactInfo() {
      return (
          this.name ||
          this.designation ||
          this.firstContact !== undefined ||
          this.secondContact !== undefined ||
          this.thirdContact !== undefined
      );
    },
    contacts() {
      const contactList = [];
      if (this.firstContact !== undefined) contactList.push(this.firstContact);
      if (this.secondContact !== undefined) contactList.push(this.secondContact);
      if (this.thirdContact !== undefined) contactList.push(this.thirdContact);
      return contactList;
    },
  },
  methods: {
    formattedTel(tel) {
      return `tel:${tel}`;
    },
  },
};
</script>
