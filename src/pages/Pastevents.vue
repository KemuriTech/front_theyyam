<script setup>
import { AisInstantSearch, AisSearchBox, AisInfiniteHits } from 'vue-instantsearch/vue3/es/index.js'
import { createWidgetMixin } from 'vue-instantsearch/vue3/es';
import { connectInfiniteHits } from 'instantsearch.js/es/connectors';
const indexName = 'events'
const algolia = useAlgoliaRef()

createWidgetMixin({ connector: connectInfiniteHits })

const visibilityChanged = (isVisible) => {
  if (isVisible && !this.state.isLastPage) {
    this.state.showMore();
  }
}
</script>

<template>
  <div class="bg-white">
    <section class="bg-gray-100 dark:bg-gray-900 py-10 px-12">
      <span class="text-4xl">Events</span>
      <ais-instant-search :index-name="indexName" :search-client="algolia">
        <ais-search-box />
        <ais-infinite-hits>
          <template v-slot:item="{ item }">
            <NuxtLink :to="`Event${item['Topic ID']}`" class="cursor-pointer">
              <figure>
                <img v-if='!JSON.parse(item["videos_path_1(Additional items)"])["url"]' :src="JSON.parse(item['photos_path(Additional items)'])['url']">
                <iframe v-else :src='"https://www.youtube.com/embed/" + JSON.parse(item["videos_path_1(Additional items)"])["url"].split("v=")[1]' frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <figcaption class="p-4">
                  <p
                      class="text-lg mb-4 font-bold leading-relaxed text-gray-800 dark:text-gray-300"
                      v-text="item.Title"/>
                  <p
                      class="text-lg mb-4 font-light leading-relaxed text-gray-800 dark:text-gray-300"
                  >
                    {{ item["start_dt(Additional items)"] }} -> {{ item["end_dt(Additional items)"] }}
                  </p>
                  <a :href="`https://maps.google.com/?q=${item['venue_lat(Additional items)']},${item['venue_long(Additional items)']}`">Location</a>
                  <small
                      class="leading-5 text-gray-500 dark:text-gray-400"
                      v-text="item['description(Additional items)'].substring(0, 150) + '...'">
                  </small>
                </figcaption>
              </figure>
            </NuxtLink>
          </template>
        </ais-infinite-hits>
      </ais-instant-search>
      <!-- Card Grid -->
      <div
          class="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
            class="my-8 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1"
            v-for="(event, index) in eventList">
          <!-- Clickable Area -->
          <NuxtLink :to="`Event${event.topicID}`" class="cursor-pointer">
            <figure>
              <!-- Image -->
              <img
                  :src="event.image"
                  class="rounded-t h-72 w-full object-cover" />
              <figcaption class="p-4">
                <p
                    class="text-lg mb-4 font-bold leading-relaxed text-gray-800 dark:text-gray-300"
                    v-text="event.title"/>
                <small
                    class="leading-5 text-gray-500 dark:text-gray-400"
                    v-text="event.description">
                </small>
              </figcaption>
            </figure>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
