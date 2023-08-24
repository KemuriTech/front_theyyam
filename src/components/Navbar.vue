<template>
  <Popover class="relative backdrop-blur-sm z-50">
    <div class="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
      <div class="flex justify-start lg:w-0 lg:flex-1">
        <NuxtLink
          class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary from-10% to-secondary to-90%"
          to="/"
        >
          <span class="sr-only">{{ config.public.SERVICE_NAME }}</span>
          {{ config.public.SERVICE_NAME }}
        </NuxtLink>
      </div>
      <div class="-mr-2 -my-2 md:hidden">
        <PopoverButton
          class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span class="sr-only">Open menu</span>
          <Bars3Icon aria-hidden="true" class="h-6 w-6" />
        </PopoverButton>
      </div>
      <nav class="hidden md:flex space-x-10">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :aria-current="item.current ? 'page' : undefined"
          :to="item.href"
          class="text-base font-medium text-gray-500 text-trans-y"
        >{{ item.name }}
        </NuxtLink>
      </nav>
      <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
        <a
          v-if="status === 'authenticated'"
          class="text-base font-medium text-gray-500 text-trans-y"
          href="#"
          @click="logoutHandler"
        >Sign Out</a>
        <NuxtLink
          v-else
          class="text-base font-medium text-gray-500 text-trans-y"
          to="/login"
        >
          Login
        </NuxtLink>

      </div>
    </div>
    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <PopoverPanel
        v-slot="{ close }"
        class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50"
        focus
      >
        <div
          class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50 backdrop-blur-sm bg-white/90"
        >
          <div class="pt-5 pb-6 px-5">
            <div class="flex items-center justify-between">
              <NuxtLink
                class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary from-10% to-secondary to-90%"
                to="/"
                @click="close"
              >
                <span class="sr-only">{{ config.public.SERVICE_NAME }}</span>
                {{ config.public.SERVICE_NAME }}
              </NuxtLink>
              <div class="-mr-2">
                <PopoverButton
                  class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" class="h-6 w-6" />
                </PopoverButton>
              </div>
            </div>
          </div>
          <div class="py-6 px-5">
            <div class="grid grid-cols-1 gap-4">
              <NuxtLink
                v-for="item in navigation"
                :key="item.name"
                :aria-current="item.current ? 'page' : undefined"
                :to="item.href"
                class="text-base font-medium text-gray-900 hover:text-gray-700"
                @click="close"
              >{{ item.name }}
              </NuxtLink>
              <a
                v-if="status === 'authenticated'"
                class="text-base font-medium text-gray-900 hover:text-gray-700"
                href="#"
                @click="logoutHandler(), close()"
              >Sign Out</a>
              <NuxtLink
                v-else
                class="text-base font-medium text-gray-900 hover:text-gray-700"
                to="/login"
                @click="close"
              >Login
              </NuxtLink>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup>
import {
  Popover,
  PopoverButton,
  PopoverPanel
} from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { NOTIFICATION_TYPE } from '~/constants';
import { useNotification } from '~/stores/notification';
const config = useRuntimeConfig();

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Events', href: '/events', current: true },
  { name: 'Past Events', href: '/past', current: false },
  { name: 'Map View', href: '/map', current: true }
];
const { $api } = useNuxtApp();
const { addNotification } = useNotification();
const { signOut, status } = useAuth();
const logoutHandler = async () => {
  await signOut({ redirect:false })
    .then(() => {
      redirectAfterLogout();
      addNotification('Signed out successfully.', NOTIFICATION_TYPE.SUCCESS);
    })
    .catch((err) => console.log(err));
};
const redirectAfterLogout = async () => {
  await navigateTo('/');
};

</script>
