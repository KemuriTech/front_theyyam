<script setup>
import { AisInstantSearch, AisSearchBox, AisInfiniteHits,AisConfigure } from 'vue-instantsearch/vue3/es/index.js'
import { createWidgetMixin } from 'vue-instantsearch/vue3/es';
import { connectInfiniteHits } from 'instantsearch.js/es/connectors';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const indexName = 'events'
const algolia = useAlgoliaRef()

createWidgetMixin({ connector: connectInfiniteHits })

const visibilityChanged = (isVisible) => {
  if (isVisible && !this.state.isLastPage) {
    this.state.showMore();
  }
}

const playVideo = (event) => {
  const _target = event.target;

  _target.setAttribute('src', 'https://www.youtube.com/embed/'+_target.getAttribute('data-uid')+'?autoplay=1&mute=1&controls=0')
}

const getYoutubeImage = (item) => {
  return `https://img.youtube.com/vi/${JSON.parse(item["videos_path_1(Additional items)"])["url"].split("v=")[1]}/0.jpg`;
};

const stopVideo = (event) => {
  const _target = event.target;

  _target.setAttribute('src', '');
}

const route = useRoute();

const getFilters = computed(() => {
  const todayTimeStamp = Math.round(+new Date()/1000);
  if (route.path === '/Pastevents') {
    return `'end_dt_timestamp(Additional items)' < ${todayTimeStamp}`;
  }
});

</script>

<template>
  <div class="relative">
    <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
         aria-hidden="true">
      <div
          class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(100%-110rem)] sm:w-[72.1875rem]"
          style="clip-path: polygon(100% 100%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 100% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
  </div>
  <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:pt-12 sm:px-6 lg:max-w-7xl lg:px-8">
    <ais-instant-search :index-name="indexName" :search-client="algolia">
      <ais-configure :filters="getFilters" />
      <ais-search-box />
      <ais-infinite-hits>
        <template v-slot:item="{ item }">
          <NuxtLink :to="`Event${item['Topic ID']}`" class="cursor-pointer">
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