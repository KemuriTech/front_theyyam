<template>
  <div>
    <div>
      <div v-if="showContactInfo">
        <span>{{ contactInfo.name }}</span>
        <span v-if="contactInfo.designation"> ({{ contactInfo.designation }})</span>
        <div v-for="phone in contactInfo.phones" :key="phone">
          <div v-if="phone" class="flex items-center no-underline text-gray-600 font-normal">
            <span class="">{{ phone }}</span>
            <a class="no-underline text-gray-600 font-normal" :href="formattedTel(phone)">
              <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="48"><path d="M795-120q-116 0-236.5-56T335-335Q232-438 176-558.5T120-795q0-19.286 12.857-32.143T165-840h140q14 0 24 10t14 25l26.929 125.641Q372-665 369.5-653.5q-2.5 11.5-10.729 19.726L259-533q26 44 55 82t64 72q37 38 78 69.5t86 55.5l95-98q10-11 23.151-15T686-369l119 26q15 4 25 16.044T840-300v135q0 19.286-12.857 32.143T795-120ZM229-588l81-82-23-110H180q2 42 13.5 88.5T229-588Zm369 363q41 19 89 31t93 14v-107l-103-21-79 83ZM229-588Zm369 363Z"/></svg>            </a>
            <a :href="getWhatsAppLink(phone)" target="blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="currentColor"
                style="color: #128c7e"
                viewBox="0 0 24 24">
                <path
                  d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
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
    cleanPhoneNumber(phone) {
      if (phone) {
        // Clean the number: Remove all non-digit characters and spaces
        const cleanedNumber = phone.replace(/[\D\s()]/g, '');
        return cleanedNumber;
      }
      return '';
    },
    getWhatsAppLink(phone) {
      if (phone) {
        const formattedPhone = this.cleanPhoneNumber(phone);
        return `https://wa.me/${formattedPhone}`;
      }
      return '';
    },
  },
};
</script>