<template>
  <BgGradient v-show="$route.path === '/'"/>
  <div class="max-w-2xl mx-auto py-16 px-4 sm:pt-16 sm:pb-8 sm:px-6 lg:max-w-7xl lg:px-8">
    <div v-show="$route.path === '/'" class="text-center">
      <h2 class="text-base font-semibold tracking-wider text-secondary">Be Part of the Tradition</h2>
    </div>
    <div class="flex items-center justify-center space-x-4">
      <p class="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">Upcoming Events</p>
    </div>
    <div class="flex items-center justify-end space-x-4">
      <NuxtLink :to="`events`" class="whitespace-nowrap text-sm font-medium text-secondary hover:text-opacity-80">View
        all<span aria-hidden="true">
          <ArrowRightIcon class="h-5 w-5 inline-block -mt-1" aria-hidden="true" />
        </span>
      </NuxtLink>
    </div>
    <div class="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-8 sm:gap-y-10
    justify-items-center">
      <div v-for="event in upcomingEventData" :key="event.id" class="relative group">
        <NuxtLink :to="`/event/${event.topics_id}`" class="cursor-pointer">
          <div class="w-full aspect-h-3 rounded bg-gray-100">
            <img v-if="!isAnyYTVideo(event)" :src="event.ext_16.url" class="object-center object-cover h-full w-full" />
            <div v-else
                 v-on:mouseleave="stopVideo"
                 v-on:mouseover="playVideo"
            >
              <iframe :data-uid="getYTUID(event)" :style='`background-image: url("${getYoutubeImage(event)}");`'
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen class="bg-cover bg-center rounded pointer-events-none" frameborder="0"></iframe>
            </div>
          </div>
          <div class="max-w-18 break-words mt-4 flex text-left justify-between text-base font-medium text-gray-900 space-x-8 mb-1">
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
import { ArrowRightIcon } from '@heroicons/vue/20/solid'
import { BASE_URL } from '../constants';
export default {
  async setup() {

    let upcomingEventData = {};
    let { $formatter } = useNuxtApp();

    await fetch(`https://${BASE_URL}/rcms-api/1/latest-event?cnt=4`, {
      method: 'GET',
    }).then(response => response.json())
      .then(response => {
        upcomingEventData = response.list;
      });

    return { upcomingEventData, $formatter };
  },
  methods: {
    playVideo: (event) => {
      event.target?.firstElementChild?.setAttribute('src', 'https://www.youtube.com/embed/' + event.target?.firstElementChild?.getAttribute('data-uid') + '?autoplay=1&mute=1&controls=0')
    },

    getYoutubeImage: (item) => {
      return item.ext_16?.url;
    },

    stopVideo: (event) => {
      event.target?.firstElementChild?.setAttribute('src', '');
    },

    isAnyYTVideo: (item) => {
      if (item?.ext_13?.url || item?.ext_14?.url || item?.ext_15?.url || item?.ext_16?.url) return true;
      return false;
    },
    splitYTUID(url) {
      return url.split('v=')[1] ?? null;
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