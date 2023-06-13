<template>
    <footer class="bg-gray-800">
        <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
            <nav class="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                <div v-for="item in navigation.main" :key="item.name" class="px-5 py-2">
                    <NuxtLink :href="item.href" class="text-base text-white hover:text-gray-400">
                        {{ item.name }}
                    </NuxtLink>
                </div>
            </nav>
            <p class="mt-8 text-center text-base text-gray-400">&copy; {{ navigation.date.year }} <a href="https://kemuri.in/" target="_blank" class="text-base text-white hover:text-gray-400">KEMURI Technology</a>. All rights reserved.</p>
        </div>
    </footer>
</template>

<script setup>
import { defineComponent, h } from 'vue'
import { ref } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const enabled = ref(false)

const navigation = {
    main: [
        { name: 'Events', href: '/events' },
        { name: 'Past Events', href: '/pastevents' },
    ],
    date: {
        year:(new Date()).getFullYear()
    }
}

</script>

<style scoped>

</style>
