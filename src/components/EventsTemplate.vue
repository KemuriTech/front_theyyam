<template>
  <div class="relative">
    <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      aria-hidden="true">
      <div
        class="bg-clip-left relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-customPink to-customPurple opacity-30 sm:left-[10rem] sm:w-[72.1875rem]" />
    </div>
  </div>
  <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:pt-12 sm:px-6 lg:max-w-7xl lg:px-8">
    <ais-instant-search :index-name="'events'" :search-client="algolia">
      <ais-configure :filters="getFilters" />
      <ais-search-box />
      <ais-infinite-hits>
        <template v-slot:item="{ item }">
          <NuxtLink :to="`event${item['Topic ID']}`" class="cursor-pointer">
            <div class="image-figure aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
              <img v-if='!JSON.parse(item["videos_path_1(Additional items)"])["url"]'
                :src="JSON.parse(item['photos_path(Additional items)'])['url']">
              <iframe v-else class='bg-cover bg-center' frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen v-on:mouseover="playVideo" v-on:mouseleave="stopVideo"
                :data-uid='JSON.parse(item["videos_path_1(Additional items)"])["url"].split("v=")[1]'
                :style='`background-image: url("${getYoutubeImage(item)}");`'></iframe>
            </div>
            <div class="mt-4 flex  text-left justify-between text-base font-medium text-gray-900 space-x-8 mb-1">
              <h3>
                <span />
                {{ item.Title }}
              </h3>
            </div>
            <p class="mt-1 text-sm text-gray-500 flex items-center space-x-2">
              <span class="mr-1">{{ $formatDate(item["start_dt(Additional items)"], item["end_dt(Additional items)"])
              }}</span>
            </p>
          </NuxtLink>
        </template>
      </ais-infinite-hits>
    </ais-instant-search>
  </div>
</template>

<script setup>
import { AisInstantSearch, AisSearchBox, AisInfiniteHits, AisConfigure } from 'vue-instantsearch/vue3/es/index.js'
import { createWidgetMixin } from 'vue-instantsearch/vue3/es';
import { connectInfiniteHits } from 'instantsearch.js/es/connectors';
import { computed } from 'vue';
import { useRouter } from 'vue-router';


const algolia = useAlgoliaRef()

createWidgetMixin({ connector: connectInfiniteHits })

const visibilityChanged = (isVisible) => {
  if (isVisible && !this.state.isLastPage) {
    this.state.showMore();
  }
}

const playVideo = (event) => {
  event.target?.setAttribute('src', 'https://www.youtube.com/embed/' + event.target?.getAttribute('data-uid') + '?autoplay=1&mute=1&controls=0')
}

const getYoutubeImage = (item) => {
  return JSON.parse(item['photos_path(Additional items)'])['url'];
};

const stopVideo = (event) => {
  event.target?.setAttribute('src', '');
}

const router = useRouter();

const previousPath = ref('');

router.beforeEach((to, from) => {
  previousPath.value = from.path;
});

const getFilters = computed(() => {
  const todayTimeStamp = Math.round(+new Date() / 1000);
  if (router.currentRoute.value.path === '/pastevents' || previousPath.value ==='/pastevents') {
    return `'end_dt_timestamp(Additional items)' < ${todayTimeStamp}`;
  }
  if (router.currentRoute.value.path === '/events'  || previousPath.value ==='/events') {
    return `'end_dt_timestamp(Additional items)' > ${todayTimeStamp}`;
  }
});

</script>

<style>
.ais-InfiniteHits-item {
  border: none;
  box-shadow: none;
  margin-top: 0;
}

.ais-InfiniteHits-list {
  display: grid;
  gap: 2rem;
  margin-left: 0;
}

.ais-InfiniteHits-item {
  display: grid;
  margin-left: 0;
}

.ais-SearchBox {
  margin-bottom: 1rem;
}

@media (max-width: 767px) {
  .ais-InfiniteHits-list {
    width: min-content;
    margin: auto;
    display: grid;
    align-content: center;
  }
}

@media (min-width: 768px) {
  .ais-InfiniteHits-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ais-SearchBox-input {
    width: 104%;
  }
}

@media (min-width: 1024px) {
  .ais-InfiniteHits-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .ais-SearchBox-input {
    width: 102%;
  }
}

@media (min-width: 1280px) {
  .ais-InfiniteHits-list {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .ais-SearchBox-input {
    width: 104%;
  }
}
</style>