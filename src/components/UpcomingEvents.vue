<template>
  <div v-show="$route.path === '/'" class="relative">
    <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      aria-hidden="true">
      <div
        class="bg-clip-left relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-customPink to-customPurple opacity-30 sm:left-[10rem] sm:w-[72.1875rem]" />
    </div>
  </div>
  <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
    <div v-show="$route.path === '/'" class="text-center">
      <h2 class="text-base font-semibold tracking-wider text-indigo-600">Be Part of the Tradition</h2>
    </div>
    <div class="flex items-center justify-center space-x-4">
      <p class="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">Upcoming Events</p>
    </div>
    <div class="flex items-center justify-end space-x-4">
      <NuxtLink :to="`events` " class="whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500">View
        all<span aria-hidden="true">
          <ArrowRightIcon class="h-5 w-5 inline-block -mt-1" aria-hidden="true" />
        </span>
      </NuxtLink>
    </div>
    <div class="w-full mt-6 grid grid-cols-1 gap-x-8 gap-y-8 justify-items-center sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
      <div v-for="event in upcomingEventData" :key="event.id" class="relative group">
        <NuxtLink :to="`event${event.topics_id}`" class="cursor-pointer">
          <div class="w-full aspect-h-3 rounded bg-gray-100">
            <img v-if="!isAnyYTVideo(event)" :src="event.ext_16.url" class="object-center object-cover h-full w-full" />
            <iframe v-else class='bg-cover bg-center rounded' frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen v-on:mouseover="playVideo" v-on:mouseleave="stopVideo" :data-uid='getYTUID(event)'
              :style='`background-image: url("${getYoutubeImage(event)}");`'></iframe>
          </div>
          <div class="max-w-18 break-words mt-4 flex  text-left justify-between text-base font-medium text-gray-900 space-x-8 mb-1">
            <h3>
              <span aria-hidden="true" />
              {{ event.subject }}
            </h3>
          </div>
          <p class="mt-1 text-sm text-gray-500 flex items-center space-x-2">
            <span class="mr-1">{{ $formatter.formatDate(event.ext_4, event.ext_5) }}</span>
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
  
<script>
import { ArrowRightIcon } from "@heroicons/vue/20/solid"
export default {
  async setup() {

    let upcomingEventData = {};
    let { $formatter } = useNuxtApp();

    await fetch(`https://theyyam.g.kuroco.app/rcms-api/1/latest-event?cnt=4`, {
      method: 'GET',
    }).then(response => response.json())
      .then(response => {
        upcomingEventData = response.list;
      });

    return { upcomingEventData, $formatter };
  },
  methods: {
    playVideo(event) {
      const _target = event.target;

      _target.setAttribute('src', 'https://www.youtube.com/embed/' + _target.getAttribute('data-uid') + '?autoplay=1&mute=1&controls=0')
    },

    getYoutubeImage(item) {
      return item.ext_16.url;
    },

    stopVideo(event) {
      const _target = event.target;

      _target.setAttribute('src', '');
    },

    isAnyYTVideo(item) {
      if (item?.ext_13?.url || item?.ext_14?.url || item?.ext_15?.url || item?.ext_16?.url) return true;
      return false;
    },
    splitYTUID(url) {
      return url.split("v=")[1] ?? null;
    },
    getYTUID(item) {
      return this.splitYTUID(item?.ext_13?.url) ?? this.splitYTUID(item?.ext_14?.url) ?? this.splitYTUID(item?.ext_15?.url) ?? this.splitYTUID(item?.ext_16?.url);
    }
  },
  components: {
    ArrowRightIcon,
  },
}
</script>