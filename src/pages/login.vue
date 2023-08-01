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
        <div class="w-full flex items-center justify-between py-3">
          <hr class="w-full bg-gray-400">
          <p class="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
          <hr class="w-full bg-gray-400  ">
        </div>
        <div class="flex justify-center py-5">
          <button @click="googleLoginHandler" class="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-0.5 0 48 48" version="1.1">
              <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Color-" transform="translate(-401.000000, -860.000000)">
                  <g id="Google" transform="translate(401.000000, 860.000000)">
                    <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path>
                    <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path>
                    <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path>
                    <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path>
                  </g>
                </g>
              </g>
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { NOTIFICATION_TYPE } from '~/constants';
import { useNotification } from '~/stores/notification';
import { useRoute } from 'vue-router';
const  config=useRuntimeConfig();
const { rawToken } = useAuthState();

definePageMeta({
  middleware: defineNuxtRouteMiddleware((to, from) => {
    const { status } = useAuth();
    if (status.value === 'authenticated') {
      navigateTo('/');
    }
  }),
});

useHead({
  bodyAttrs: {
    class: computed(() => 'h-full'),
  },
  htmlAttrs: {
    class: computed(() => 'h-full bg-gray-50'),
  },
});

const open = ref(false);
const route = useRoute();
const query = route.query;
const state = reactive({
  form: {
    email: '',
    password: '',
    login_save: 0,
  },
});
const { $api } = useNuxtApp();
const { signIn } = useAuth();
const formResponse = reactive({
  isResponse: false,
  type: '',
  messages: [],
  isProcessing: false,
});
const { addNotification } = useNotification();
const _successMessage = 'Successfully Logged in.';
const loginHandler = async (event) => {
  event.preventDefault();
  formResponse.isProcessing = true;
  formResponse.isResponse = false;

  await signIn({ ...state.form, login_save: state.form.login_save ? 1 : 0 },  { redirect:false })
    .then(() => {
      const _successMessage = 'Successfully Logged in.';

      addNotification(_successMessage, NOTIFICATION_TYPE.SUCCESS);
      redirectAfterLogin();
    })
    .catch(err => {
      let message = [];
      let type = 'danger';
      err?.data?.errors?.map((e) => message.push(e.message));
      if (!message.length) {
        message.push('Something went wrong! Please try again...');
      }
      setResponse(type, message);
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
  let path = '/';
  if (route.redirectedFrom !== undefined)
    path = route.redirectedFrom.path;
  await navigateTo(path);
};

const googleLoginHandler = () => {
  window.location.href = `https://${config.BASE_URL}/direct/login/oauth_login/?spid=1&api_id=${config.KUROCO_API_VER_AUTH}`;
}

if (query.oauth === 'success' && query.grant_token !== undefined) {
  const grantToken = query.grant_token;
  $api.token.post({ grant_token: grantToken })
    .then((response) => {
      if (response.access_token.value !== '') {
        rawToken.value=response.access_token.value
          .then(() => {
            addNotification(_successMessage, NOTIFICATION_TYPE.SUCCESS);
            redirectAfterLogin();
          })
      }
    });
}
</script>
