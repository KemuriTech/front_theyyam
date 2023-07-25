<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div v-if="formResponse.isResponse" class="text-center pt-2">
          <div v-for="(message, number) in formResponse.messages" :key="number">
            <ui-alert :message="message" :type="formResponse.type" />
          </div>
        </div>
        <form class="space-y-6" @submit="loginHandler">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                v-model="state.form.email"
                :required="true"
              />
            </div>
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                v-model="state.form.password"
                :required="true"
              />
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                v-model="state.form.login_save"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              :class="`w-full flex justify-center text-white bg-blue-700 py-2 px-4 focus:outline-none hover:bg-opacity-80 rounded-md text-sm bg-secondary
               ${formResponse.isProcessing ? 'animate-pulse' : ''}`"
              :disabled="formResponse.isProcessing"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useUser } from '~/stores/user';
import { NOTIFICATION_TYPE } from '~/constants';
import { useNotification } from '~/stores/notification';

useHead({
  bodyAttrs: {
    class: computed(() => 'h-full'),
  },
  htmlAttrs: {
    class: computed(() => 'h-full bg-gray-50'),
  },
});

const open = ref(false);
const state = reactive({
  form: {
    email: '',
    password: '',
    login_save: 0,
  },
});
const { setUserDetails } = useUser();
const formResponse = reactive({
  isResponse: false,
  type: '',
  messages: [],
  isProcessing: false,
});
const { $api } = useNuxtApp();
const { addNotification } = useNotification();
const loginHandler = async (event) => {
  event.preventDefault();
  formResponse.isProcessing = true;
  formResponse.isResponse = false;

  const _successMessage = 'Successfully Logged in.';

  await $api.auth
    .post({ ...state.form, login_save: state.form.login_save ? 1 : 0 })
    .then(async (res) => {
      let message = [];
      let type;

      if (!res.ok) {
        type = 'danger';
        await res
          .text()
          .then((text) =>
            JSON.parse(text).errors.map((e) => message.push(e.message))
          );
        setResponse(type, message);
      } else {
        await res.text().then((_res) => {
          let data = JSON.parse(_res);
          addNotification(_successMessage, NOTIFICATION_TYPE.SUCCESS);
          setUserDetails({ grant_token: data.grant_token });
          redirectAfterLogin();
        });
      }
    })
    .catch((err) => {
      const message = [];
      message.push('Something went wrong! Please try again...');
      setResponse('danger', message);
    })
    .finally((res) => {
      formResponse.isProcessing = false;
    });
};

const setResponse = (type, message) => {
  formResponse.isResponse = true;
  formResponse.type = type;
  formResponse.messages = message;
};

const redirectAfterLogin = async () => {
  await navigateTo('/');
};
</script>
