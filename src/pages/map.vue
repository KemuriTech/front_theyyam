<template>
  <BgGradient />
  <div class="max-w-2xl mx-auto py-16 sm:py-4 sm:pt-12 lg:max-w-7xl">
    <div class="px-2 sm:px-5 lg:px-6">
      <div class="flex items-center pb-3">
        <div class="sm:w-[12rem] md:w-[15rem] pr-2">
          <datepicker :key="datepickerKey" v-model="filter" :formatter="pickerFormat" :placeholder="'Filter By Date'" aria-label="Filter By Date"/>
        </div>
        <div class="flex-grow">
          <input  id="search" v-model="searchInput" autocomplete="search" class="relative block w-full opacity-100 pl-3 pr-12 py-2.5 rounded-lg overflow-hidden border-solid text-sm text-vtd-secondary-700 placeholder-vtd-secondary-400 transition-colors bg-white border border-vtd-secondary-300 focus:border-vtd-primary-300 focus:ring focus:ring-vtd-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-vtd-secondary-800 dark:border-vtd-secondary-700 dark:text-vtd-secondary-100 dark:placeholder-vtd-secondary-500 dark:focus:border-vtd-primary-500 dark:focus:ring-opacity-20" placeholder="Search here" type="text"/>
        </div>
      </div>
    </div>
    <GoogleMap :key="mapKey" :api-key="`${config.public.googleAPIkey}`" :center="mapCenter" :zoom="11" class="px-6" style="width: 100%; height: 820px" @click="closeInfoWindow()">
      <Marker v-for="(event, id) in filteredEventData" :key="event.id" :options="{ position: { lat: event.venue_lat, lng: event.venue_long } }" @mousedown="openInfoWindow(id)">
        <InfoWindow v-if="selectedMarkerId === id">
          <NuxtLink :to="`/event/${event.slug}`" target="_blank">
            <div v-if="isPageLoaded" id="content">
              <h3 id="firstHeading" class="firstHeading mt-0 font-bold">{{ event.subject }}</h3>
              <img :src="`${event.photo?.url}`" alt="Temple" class="w-full h-[10rem] object-center object-cover sm:rounded-lg py-2"/>
              <p class="text-md text-gray-700 py-2">{{ $formatter.formatDate(event.start_dt, event.end_dt) }}</p>
              <div class="pb-2">
                <p class="text-gray-700 text-base line-clamp-3 text-sm w-[20rem]">{{ event.description }}</p>
              </div>
              <span class="py-0 mb-1 text-center no-underline text-gray-600 font-normal">
                View event
                <svg class="inline mb-0.5 fill-gray-600" height="12" viewBox="0 0 48 48" width="12" x="0px"
                     xmlns="http://www.w3.org/2000/svg" y="0px">
                  <path d="M 40.960938 4.9804688 A 2.0002 2.0002 0 0 0 40.740234 5 L 28 5 A 2.0002 2.0002 0 1 0 28 9 L 36.171875 9 L 22.585938 22.585938 A 2.0002 2.0002 0 1 0 25.414062 25.414062 L 39 11.828125 L 39 20 A 2.0002 2.0002 0 1 0 43 20 L 43 7.2460938 A 2.0002 2.0002 0 0 0 40.960938 4.9804688 z M 12.5 8 C 8.3826878 8 5 11.382688 5 15.5 L 5 35.5 C 5 39.617312 8.3826878 43 12.5 43 L 32.5 43 C 36.617312 43 40 39.617312 40 35.5 L 40 26 A 2.0002 2.0002 0 1 0 36 26 L 36 35.5 C 36 37.446688 34.446688 39 32.5 39 L 12.5 39 C 10.553312 39 9 37.446688 9 35.5 L 9 15.5 C 9 13.553312 10.553312 12 12.5 12 L 22 12 A 2.0002 2.0002 0 1 0 22 8 L 12.5 8 z"/>
                </svg>
              </span>
            </div>
          </NuxtLink>
        </InfoWindow>
      </Marker>
    </GoogleMap>
    <MapAlert v-if="isPageLoaded && !hasContent" @reset-clicked="handleReset" @show-clicked="handleShowClick" />
  </div>
</template>

<script setup>
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map';
import { ref, computed, onMounted , watch } from 'vue';
import Datepicker from 'vue-tailwind-datepicker';
import MapAlert from '../components/ui/MapAlert';
import BgGradient from '../components/BgGradient';
const config = useRuntimeConfig();

useHead({
  title: `${config.public.SERVICE_NAME} | Find Theyyam Events Near You | Interactive Map of Theyyam Performances`,
  meta: [
    { name: 'description', content: 'Explore our interactive map to discover Theyyam events happening near you. Stay updated on the vibrant Theyyam performances and never miss a ritual dance again. Locate and join the tradition!' },
    { name: 'image', property: 'image', content: `https://${config.public.FRONTEND_BASE_URL}/images/th_bg_1.jpg` },
    { name: 'og:title', property: 'og:title', content: `${config.public.SERVICE_NAME} | Find Theyyam Events Near You | Interactive Map of Theyyam Performances` },
    { name: 'og:description', property: 'og:description', content: 'Explore our interactive map to discover Theyyam events happening near you. Stay updated on the vibrant Theyyam performances and never miss a ritual dance again. Locate and join the tradition!' },
    { name: 'og:image', property: 'og:image', content: `https://${config.public.FRONTEND_BASE_URL}/images/th_bg_1.jpg` },
  ],
})

const { $formatter, $api } = useNuxtApp()
const isPageLoaded = ref(false);
const selectedMarkerId = ref(null);
const hasContent = ref(false);
const mapCenter = ref({ lat: 0, lng: 0 });
const openInfoWindow = (id) => {
  selectedMarkerId.value = id;
};
const closeInfoWindow = () => {
  selectedMarkerId.value = null;
};
const filter = ref({
  fromDate: null,
  toDate: null,
});
const pickerFormat = ref({
  date: 'DD MMM YYYY',
  month: 'MMM'
})
const searchInput = ref('');
const datepickerKey = ref(0);
const mapKey = ref(0);

let eventData = {};

await $api.allEvents.get()
  .then(response => response.json())
  .then(response => {
    eventData = response.list;
  });
    
let filteredEventData = computed(() => {
  const fromDate = filter.value.fromDate ? new Date(filter.value.fromDate) : null;
  const toDate = filter.value.toDate ? new Date(filter.value.toDate) : null;
  const search = searchInput.value.trim().toLowerCase();
  if (toDate) {
    toDate.setHours(23, 59, 59, 999);
  }
  return eventData.filter((event) => {
    const eventFromDate = new Date(event.start_dt);
    const eventToDate = new Date(event.end_dt);
    const contactNames = event.contact_name.map(contact => contact);
    const eventSearchParams = [
      event.subject,
      event.description,
      event.performers,
      event.venue_address,
      ...contactNames
    ].map(item => item.toLowerCase());
    const dateFilter = (!fromDate || eventFromDate >= fromDate) && (!toDate || eventToDate <= toDate);
    const searchFilter = !search || eventSearchParams.some(field => field.includes(search));
    return dateFilter && searchFilter;
  });
});

const setMapCenter = (data = filteredEventData.value) => {
  if (data.length > 0) {
    hasContent.value = true;
    const latSum = data.reduce((total, event) => total + parseFloat(event.venue_lat), 0);
    const lngSum = data.reduce((total, event) => total + parseFloat(event.venue_long), 0);
    const avgLat = latSum / data.length;
    const avgLng = lngSum / data.length;
    mapCenter.value = { lat: avgLat, lng: avgLng };
  } else if (!data.length) {
    hasContent.value = false;
  }
};

const handleShowClick = () => {
  hasContent.value = true;
};

onMounted(async () => {
  isPageLoaded.value = true;
  setMapCenter();
});

watch(filteredEventData, (newFilteredEventData) => {
  setMapCenter(newFilteredEventData);
});
    
const handleReset = () => {
  filter.value.fromDate = null;
  filter.value.toDate = null;
  searchInput.value = '';
  datepickerKey.value += 1;
  mapKey.value += 1;
};

</script>
