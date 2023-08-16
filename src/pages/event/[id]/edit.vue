<template>
  <div class="max-w-2xl mx-auto py-16 sm:py-24 sm:pt-12 lg:max-w-7xl">
    <div class="space-y-6">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div v-if="formResponse.isResponse" class="text-center pt-2">
          <div v-for="(message, number) in formResponse.messages" :key="number">
            <ui-alert :message="message" :type="formResponse.type" />
          </div>
        </div>
        <form @submit="submitHandler">
          <div class="mt-10 mb-5 md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <h3 class="text-lg font-medium leading-6 text-gray-900">About Event</h3>
              <p class="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you
                share.</p>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <div class="grid grid-cols-6 gap-6 max-w-2xl">
                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Title</label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      :required="true"
                      v-model="eventData.details.subject"
                    />
                  </div>
                </div>
                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Description</label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <textarea
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      v-model="eventData.details.description"
                      rows="6"
                    />
                  </div>
                </div>
                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Performers</label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      v-model="eventData.details.performers"
                    />
                  </div>
                </div>
                <template v-for="(contact, index) in eventData.details.contacts" :key="index">
                  <div class="col-span-6">
                    <label class="block text-sm font-medium text-gray-700">Contact {{index + 1}} Name</label>
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        v-model="contact.name"
                      />
                    </div>
                  </div>
                  <div class="col-span-6">
                    <label class="block text-sm font-medium text-gray-700">Contact {{index + 1}} Designation</label>
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        v-model="contact.designation"
                      />
                    </div>
                  </div>
                  <div v-for="(phone, pIndex) in contact.phones" :key="`p-${index}-${pIndex}`" class="col-span-6 sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Phone {{ pIndex + 1 }}</label>
                    <div class="mt-1 flex rounded-md shadow-sm gap-6">
                      <input
                        type="text"
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        v-model="contact.phones[pIndex]"
                      />
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <div aria-hidden="true" class="hidden sm:block">
            <div class="py-5">
              <div class="border-t border-gray-200" />
            </div>
          </div>

          <div class="mt-10 mb-5 md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Media</h3>
              <p class="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you
                share.</p>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <div class="grid grid-cols-6 gap-6 max-w-2xl">
                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Photo URL</label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="url"
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      :required="true"
                      v-model="eventData.details.photo.url"
                    />
                  </div>
                </div>
                <div v-for="(video, index) in eventData.details.videos" :key="index" class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Video {{index + 1}} URL</label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="url"
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      v-model="eventData.details.videos[index].url"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div aria-hidden="true" class="hidden sm:block">
            <div class="py-5">
              <div class="border-t border-gray-200" />
            </div>
          </div>

          <div class="mt-10 mb-5 md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Schedule and Venue</h3>
              <p class="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you
                share.</p>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <div class="grid grid-cols-6 gap-6 max-w-2xl">
                <div class="col-span-6 sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Event Start Date</label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="date"
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      v-model="eventData.details.start_dt"
                    />
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Event End Date</label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="date"
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      v-model="eventData.details.end_dt"
                    />
                  </div>
                </div>
                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Malayalam Calendar Dates</label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      v-model="eventData.details.malayalam_calendar"
                    />
                  </div>
                </div>
                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Venue Name</label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      v-model="eventData.details.venue_name"
                    />
                  </div>
                </div>
                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Venue Address</label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      v-model="eventData.details.venue_address"
                    />
                  </div>
                </div>
                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Venue Direction</label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <textarea
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      rows="4"
                      v-model="eventData.details.venue_direction_notes"
                    />
                  </div>
                </div>
                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Select Venue Location On Map</label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <GoogleMap :api-key="`${config.googleAPIkey}`" style="width: 100%; height: 500px" :center="{ lat: markerPosition.lat, lng: markerPosition.lng }" :zoom="15">
                      <Marker :options="{ position: { lat: markerPosition.lat , lng: markerPosition.lng}, draggable: true  }" @dragend="getLatLng" />
                    </GoogleMap>
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Venue Latitude</label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="number"
                      step="any"
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      v-model="markerPosition.lat"
                    />
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Venue Longitude</label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="number"
                      step="any"
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      v-model="markerPosition.lng"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" class="hidden sm:block">
            <div class="py-5">
              <div class="border-t border-gray-200" />
            </div>
          </div>

          <div class="flex justify-end">
            <NuxtLink class="bg-white py-2 px-4 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      :to="`/event/${params.id}`">
              Cancel
            </NuxtLink>
            <button :class="`ml-3 inline-flex justify-center py-1.5 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 ${formResponse.isProcessing ? 'animate-pulse' : ''}`"
                    :disabled="formResponse.isProcessing"
                    type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { NOTIFICATION_TYPE } from '~/constants';
import { useNotification } from '~/stores/notification';
import { GoogleMap, Marker } from 'vue3-google-map';
import { onMounted, ref } from 'vue';

definePageMeta({ middleware: 'auth' })

const config = useRuntimeConfig();
const markerPosition = ref({ lat: 0, lng: 0 });
const { $api, $router } = useNuxtApp()
const { params } = useRoute();
const eventData = reactive({
  details: {}
});
const mediaArr = useState('mediaArr', () => ([]));
const formResponse = reactive({
  isResponse: false,
  type: '',
  messages: [],
  isProcessing: false,
});
const { addNotification } = useNotification();

useHead({
  bodyAttrs: {
    class: computed(() => 'h-full')
  },
  htmlAttrs: {
    class: computed(() => 'h-full bg-gray-50')
  }
});

await $api.occasion.show(params.id)
  .then(response => response.json())
  .then(response => {
    if (!response.details) {
      return $router.push({ path: '/events' })
    }
    const videos = Array.apply(null, { length:3 }).map((e, index) => (
      {
        url: response.details.videos[index]?.url,
        title: response.details.videos[index]?.title,
      }));

    eventData.details = { ...response.details, videos };
  });

onMounted(async () => {
  markerPosition.value = {
    lat: eventData.details.venue_lat,
    lng: eventData.details.venue_long
  };
});
const getLatLng = (event) => {
  const lat = parseFloat(event.latLng.lat().toFixed(5));
  const lng = parseFloat(event.latLng.lng().toFixed(5));
  markerPosition.value = { lat, lng };
};

const getErrors = () => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const latExp = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
  const longExp = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;

  const errArr = [];

  if (eventData.details.videos[0].url && !regExp.test(eventData.details.videos[0].url)) {
    errArr.push('Video 1 URL incorrect')
  }
  if (eventData.details.videos[1].url && !regExp.test(eventData.details.videos[1].url)) {
    errArr.push('Video 2 URL incorrect')
  }
  if (eventData.details.videos[2].url && !regExp.test(eventData.details.videos[2].url)) {
    errArr.push('Video 3 URL incorrect')
  }
  // lat and long both must have either value or empty
  const lat = markerPosition.value.lat;
  const lng = markerPosition.value.lng;
  if (lat === '' && lng !== '') {
    errArr.push('Venue Lat cannot be empty');
  } else if (lat !== '' && lng === '') {
    errArr.push('Venue Long cannot be empty');
  } else if (!latExp.test(lat) || !longExp.test(lng)) {
    errArr.push('Invalid Venue Lat and Long');
  }

  return errArr;
}
const setResponse = (type, message) => {
  formResponse.isResponse = true;
  formResponse.type = type;
  formResponse.messages = message;
  window.scrollTo({ top: 0, behavior: 'smooth' });

};
const submitHandler = async event => {
  event.preventDefault();
  formResponse.isProcessing = true;
  formResponse.isResponse = false;
  const errors = getErrors();

  if (errors.length) {
    setResponse('danger', errors);
    formResponse.isProcessing = false;
    return;
  }

  const requestBody = {
    subject: eventData.details.subject,
    ext_3: eventData.details.description,
    ext_4: eventData.details.start_dt,
    ext_5: eventData.details.end_dt,
    ext_6: eventData.details.performers,
    ext_7: eventData.details.malayalam_calendar,
    ext_8: eventData.details.venue_name,
    ext_9: eventData.details.venue_address,
    ext_10: eventData.details.venue_direction_notes,
    ext_11: markerPosition.value.lat,
    ext_12: markerPosition.value.lng,
    ext_16: {
      url: eventData.details.photo.url,
      title: ''
    },
  };
  
  const contactsPayload = (eventData?.details?.contacts || []).map(contact => {
    const name = contact.name || '';
    const designation = contact.designation || '';
    const phones = (contact.phones || []).slice(0, 3).map(phone => phone || '');
    return { name, designation, phones };
  });
  
  requestBody['ext_17'] = contactsPayload.map(contact => contact.name || '');
  requestBody['ext_18'] = contactsPayload.map(contact => contact.designation || '');
  requestBody['ext_19'] = contactsPayload.map(contact => contact.phones[0] || '');
  requestBody['ext_20'] = contactsPayload.map(contact => contact.phones[1] || '');
  requestBody['ext_21'] = contactsPayload.map(contact => contact.phones[2] || '');
  
  for (let i = 0; i < 3; i++) {
    if (eventData.details.videos[i]?.url) {
      requestBody[`ext_${13 + i}`] = {
        url: eventData.details.videos[i].url,
        title: '',
      };
    }
  }

  await $api.authOccasion.update(params.id, requestBody)
    .then(response => response.json())
    .then(res => {
      let message = [];
      let type = 'success';
      if (res.errors?.length) {
        type = 'danger';
        res.errors?.map((e) => message.push(e.message));
        setResponse(type, message);
      }
      else {
        addNotification('Content Updated Successfully.', NOTIFICATION_TYPE.SUCCESS);
        $router.push({ path: `/event/${eventData.details.topics_id}` })
      }
    })
    .finally((res) => {
      formResponse.isProcessing = false;
    });

}
</script>