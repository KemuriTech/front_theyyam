<template>
  <footer class="bg-white border-t" aria-labelledby="footer-heading">
    <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <nav class="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
        <div v-for="item in navigation.main" :key="item.name" class="px-5 py-2">
          <NuxtLink :to="item.href" class="text-base font-medium text-gray-500 text-trans-y">
            {{ item.name }}
          </NuxtLink>
        </div>
      </nav>
      <p class="mt-8 text-center text-base text-gray-500">&copy; {{ navigation.date.year }} <a href="https://kemuri.in/" target="_blank" class="font-medium text-base text-gray-500 hover:text-gray-900">KEMURI Technology</a>. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Past Events', href: '/past' },
    { name: 'Map View', href: '/map' },
    { name: 'Terms & Conditions', href: '/terms-conditions' },
  ],
  date: {
    year:(new Date()).getFullYear()
  }
}

</script>

<style scoped>

</style>
