import { defineStore } from 'pinia';
export const useNotification = defineStore('notificationStore', () => {
  const notification = ref('');
  const notificationType = ref('');

  const addNotification = (message, type) => {
    notification.value = message;
    notificationType.value = type;
  };

  const removeNotification = () => {
    notification.value = '';
    notificationType.value = '';
  };

  return {
    notification,
    notificationType,
    addNotification,
    removeNotification
  };
});
