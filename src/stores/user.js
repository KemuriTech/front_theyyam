import { defineStore } from 'pinia';
import { USER } from '~/constants';
export const useUser = defineStore('userStore',
  () => {

    const user = ref({});

    const init = () => {
      let _user;
      try {
        _user = JSON.parse(localStorage.getItem(USER) ?? '{}');
      } catch ($e) {
        _user = {};
      }
      user.value = _user;
    };

    onMounted(init);
    const setUserDetails = (details) => {
      localStorage.setItem(USER, JSON.stringify(details));
      user.value = details;
    };

    return { user, setUserDetails };
  });