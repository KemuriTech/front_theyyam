<script>
import { useRoute } from "vue-router";
export default {
  async setup() {
    const { params } = useRoute();
    let eventData = {};
    await fetch(`https://theyyam.g.kuroco.app/rcms-api/1/event/${params.id}`, {
      method: 'GET',
    }).then(response => response.json())
        .then(response => {
          eventData = response.details
        })

    let upcomingEventData = {};

    await fetch(`https://theyyam.g.kuroco.app/rcms-api/1/latest-event`, {
      method: 'GET',
    }).then(response => response.json())
      .then(response => {
        upcomingEventData = response.list;
      })

    return { eventData, upcomingEventData };
  }
}
</script>

<template>
<section class="py-8 px-4 sm:px-8 md:px-12">
  <div class="max-w-screen-xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img alt="Temple Photo" :src="eventData.ext_16.url" class="w-full rounded-xl object-cover mb-4" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div class="aspect-w-16 aspect-h-9">
              <iframe :src='`https://www.youtube.com/embed/${eventData.ext_13.url.split("v=")[1]}`' frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>

            <div class="aspect-w-16 aspect-h-9">
              <iframe :src='`https://www.youtube.com/embed/${eventData.ext_14.url.split("v=")[1]}`' frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>

            <div class="aspect-w-16 aspect-h-9">
              <iframe :src='`https://www.youtube.com/embed/${eventData.ext_15.url.split("v=")[1]}`' frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>

            <div id="venueMap"></div>

          </div>
        </div>

      <div class="sticky top-0">
        
        <div class="max-w-[35ch] space-y-4">
          <a :href="eventData.ext_1.url">
            <h1 class="text-2xl font-bold text-black mb-2">{{ eventData.subject }}</h1>
          </a>

          <div>
            <span class="text-sm text-gray-700">Dates:</span>
            <span class="text-sm text-gray-700">{{ eventData.ext_4 }} -> {{ eventData.ext_5 }}</span>
          </div>

          <div>
            <span class="text-sm text-gray-700">Date according to Malayalam Calendar:</span>
            <span class="text-sm text-gray-700">{{ eventData.ext_7 }}</span>
          </div>

          </div>

              <span class="mb-1 text-sm font-medium">Theyyams Performing Here:</span>

              <div class="flex flex-wrap gap-1 text-gray-700">

                  {{ eventData.ext_6 }}
              </div>

              <span class="mb-1 text-sm font-medium">Address:</span>

              <div class="flex flex-wrap gap-1 text-gray-700">

                {{ eventData.ext_9 }}
              </div>

              <span class="mb-1 text-sm font-medium">Venue Directions:</span>

              <div class="flex flex-wrap gap-1 text-gray-700">

                {{ eventData.ext_10 }}
              </div>

              <h3>Contact Info:</h3>

              <div class="text-gray-700">
                  <span v-if="eventData.ext_17">{{ eventData.ext_17 }} <br></span>
                  <span v-if="eventData.ext_18">{{ eventData.ext_18 }} <br></span>
                  <span v-if="eventData.ext_19">{{ eventData.ext_19 }} <br></span>
                  <span v-if="eventData.ext_20">{{ eventData.ext_20 }} <br></span>
                  <span v-if="eventData.ext_21">{{ eventData.ext_21 }} <br></span>
              </div>

              <div class="text-gray-700">
                <span v-if="eventData.ext_22">{{ eventData.ext_22 }} <br></span>
                <span v-if="eventData.ext_23">{{ eventData.ext_23 }} <br></span>
                <span v-if="eventData.ext_24">{{ eventData.ext_24 }} <br></span>
                <span v-if="eventData.ext_25">{{ eventData.ext_25 }} <br></span>
                <span v-if="eventData.ext_26">{{ eventData.ext_26 }} <br></span>
              </div>

              <div class="text-gray-700">
                <span v-if="eventData.ext_27">{{ eventData.ext_27 }} <br></span>
                <span v-if="eventData.ext_28">{{ eventData.ext_28 }} <br></span>
                <span v-if="eventData.ext_29">{{ eventData.ext_29 }} <br></span>
                <span v-if="eventData.ext_30">{{ eventData.ext_30 }} <br></span>
                <span v-if="eventData.ext_31">{{ eventData.ext_31 }} <br></span>
              </div>

              <div class="text-gray-700">
                <span v-if="eventData.ext_32">{{ eventData.ext_32 }} <br></span>
                <span v-if="eventData.ext_33">{{ eventData.ext_33 }} <br></span>
                <span v-if="eventData.ext_34">{{ eventData.ext_34 }} <br></span>
                <span v-if="eventData.ext_35">{{ eventData.ext_35 }} <br></span>
                <span v-if="eventData.ext_36">{{ eventData.ext_36 }} <br></span>
              </div>

        </div>
      </div>
    </div>
  </section>
  <section class="bg-gray-100 dark:bg-gray-900 py-10 px-4 sm:px-8 md:px-12">
  <div>
    <h1 class="justify-center text-center font-bold text-2xl text-gray-800 dark:text-gray-300 mb-4">Upcoming Events</h1>
  </div>
  <div class="flex flex-wrap justify-center -mx-2">
    <div v-for="event in upcomingEventData" :key="event.id" class="event-card w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-2">
        <NuxtLink :to="`Event${event.topics_id}`" class="cursor-pointer">
          <figure class="relative">
            <div class="aspect-w-16 aspect-h-9 overflow-hidden">
              <iframe :src='`https://www.youtube.com/embed/${event.ext_13.url.split("v=")[1]}`' frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen class="embed-responsive-item"></iframe>
            </div>
          <figcaption class="p-4">
            <p class="text-lg mb-4 font-bold leading-relaxed text-gray-800 dark:text-gray-300" v-text="event.subject"></p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#c4c8d8" class="w-6 h-6">
              <path
                d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
              <path fill-rule="evenodd"
                d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                clip-rule="evenodd" />
            </svg>
            <p class="text-lg mb-4 font-light leading-relaxed text-gray-800 dark:text-gray-300">
              {{ event.ext_4 }} -> {{ event.ext_5 }}
            </p>
            <a style="color:#c4c8d8;" :href="`https://maps.google.com/?q=${event.ext_11},${event.ext_12}`">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#c4c8d8" class="w-6 h-6">
                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                  </svg>
            Location</a>
            <br><br>
            <small class="leading-5 text-gray-500 dark:text-gray-400" v-text="event.ext_3"></small>
          </figcaption>
        </figure>
      </NuxtLink>
    </div>
  </div>
</section>
</template>
<style scoped>

.event-card {
  flex: 1;
  box-sizing: border-box;
  border: 1px solid #c4c8d8;
  box-shadow:0 2px 5px 0px #e3e5ec;
  padding: 10px;
  margin-right: 10px;
}

.event-card:last-child {
  margin-right: 0;
}
</style>

