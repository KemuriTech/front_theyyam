<template>
    <Popover class="relative backdrop-blur-sm z-50">
        <div class="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
            <div class="flex justify-start lg:w-0 lg:flex-1">
                <NuxtLink to="/"
                          class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary from-10% to-secondary to-90%">
                    <span class="sr-only">{{ SERVICE_NAME }}</span>
                    {{ SERVICE_NAME }}
                </NuxtLink>
            </div>
            <div class="-mr-2 -my-2 md:hidden">
                <PopoverButton
                        class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span class="sr-only">Open menu</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true"/>
                </PopoverButton>
            </div>
            <PopoverGroup as="nav" class="hidden md:flex space-x-10">
                <NuxtLink v-for="item in navigation" :key="item.name" :to="item.href"
                          class="text-base font-medium text-gray-500 text-trans-y"
                          :aria-current="item.current ? 'page' : undefined">{{ item.name }}
                </NuxtLink>
            </PopoverGroup>
            <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            </div>
        </div>

        <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in"
                    leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <PopoverPanel focus
                          class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50"
                          v-slot="{ close }">
                <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50 backdrop-blur-sm bg-white/90">
                    <div class="pt-5 pb-6 px-5">
                        <div class="flex items-center justify-between">
                            <NuxtLink to="/"
                                      class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary from-10% to-secondary to-90%"
                                      @click="close">
                                <span class="sr-only">{{ SERVICE_NAME }}</span>
                                {{ SERVICE_NAME }}
                            </NuxtLink>
                            <div class="-mr-2">
                                <PopoverButton
                                        class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span class="sr-only">Close menu</span>
                                    <XMarkIcon class="h-6 w-6" aria-hidden="true"/>
                                </PopoverButton>
                            </div>
                        </div>
                    </div>
                    <div class="py-6 px-5">
                        <div class="grid grid-cols-2 gap-4">
                            <NuxtLink @click="close" v-for="item in navigation" :key="item.name" :to="item.href"
                                      class="text-base font-medium text-gray-900 hover:text-gray-700"
                                      :aria-current="item.current ? 'page' : undefined">{{ item.name }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </PopoverPanel>
        </transition>
    </Popover>
</template>

<script setup>
import {Popover, PopoverButton, PopoverGroup, PopoverPanel} from '@headlessui/vue'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/vue/24/outline'
import {SERVICE_NAME} from "~/constants";

const navigation = [
    {name: 'Events', href: '/events', current: true},
    {name: 'Past Events', href: '/pastevents', current: false},
]
</script>
<style scoped>

</style>
