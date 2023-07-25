<template>
  <div>
    <ui-notification v-if="notification" :message="notification" :notification-type="notificationType"/>
    <Navbar />
    <slot />
    <Footer />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useNotification } from '~/stores/notification';

const notificationStore = useNotification();
const { notification, notificationType } = storeToRefs(notificationStore);

</script>
