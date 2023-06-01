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
              <iframe v-else class='bg-cover bg-center' frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen  v-on:mouseover="playVideo" v-on:mouseleave="stopVideo" :data-uid='JSON.parse(item["videos_path_1(Additional items)"])["url"].split("v=")[1]'
                      :style='`background-image: url("${getYoutubeImage(item)}");`'></iframe>
              <figcaption class="p-4">
                <p
                    class="text-lg mb-4 font-bold leading-relaxed text-gray-800 dark:text-gray-300"
                    v-text="item.Title"/>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
                  <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                  <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                </svg>
                <p
                    class="text-lg mb-4 font-light leading-relaxed text-gray-800 dark:text-gray-300"
                >
                  {{ item["start_dt(Additional items)"] }} -> {{ item["end_dt(Additional items)"] }}
                </p>
                <a :href="`https://maps.google.com/?q=${item['venue_lat(Additional items)']},${item['venue_long(Additional items)']}`">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                  </svg>
                Location</a>
                <br>
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
    </section>
  </div>
</template>

