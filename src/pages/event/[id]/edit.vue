<template>
  <div class="max-w-2xl mx-auto py-16 sm:py-24 sm:pt-12 lg:max-w-7xl">
    <div class="space-y-6">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <ui-error-alert v-if="formResponse.type === 'danger'" :messages="formResponse.messages"/>
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
                      @keyup="checkImageOnChange"
                    />
                  </div>
                  <template v-if="eventData.details.photo.url">
                    <div v-if="eventData.details.photo.urlStatus" class="aspect-video overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 mt-2">
                      <img :src="eventData.details.photo.url" :alt="eventData.details.subject" class="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                    </div>
                    <p v-else class="text-red-600 p-2">Invalid Image</p>
                  </template>
                </div>
                <div v-for="(video, index) in eventData.details.videos" :key="index" class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Video {{index + 1}} URL</label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="url"
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      v-model="eventData.details.videos[index].url"
                      @keyup="onYTKeyUp(eventData.details.videos[index])"
                    />
                  </div>
                  <template v-if="eventData.details.videos[index].url">
                    <div v-if="eventData.details.videos[index].urlStatus" class="aspect-[4/3] mt-2">
                      <iframe class="w-full h-full sm:rounded-lg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowfullscreen :src="$ytVideo.getYTVideoUrl($ytVideo.youtubeParser(eventData.details.videos[index].url), 'mute=1&modestbranding=1&autoplay=1')"></iframe>
                    </div>
                    <p v-else class="text-red-600 p-2">Invalid Link</p>
                  </template>
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
                    <GoogleMap :api-key="`${config.public.googleAPIkey}`" style="width: 100%; height: 500px" :center="{ lat: markerPosition.lat, lng: markerPosition.lng }" :zoom="15">
                      <Marker :options="{ position: { lat: markerPosition.lat , lng: markerPosition.lng}, draggable: true  }" @dragend="getLatLng" />
                    </GoogleMap>
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
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Publish Settings</h3>
              <p class="mt-1 text-sm text-gray-500">Do you want to Publish your event?</p>
            </div>
            <div class="my-4 md:my-0 md:col-span-2 flex items-center space-x-4">
              <div class="appearance-none block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <div class="mt-1 space-y-2">
                  <div class="flex items-center">
                    <input
                      type="radio"
                      value="1"
                      v-model="publishPayload"
                      class="w-4 h-4 text-secondary focus:ring-secondary dark:focus:ring-secondary dark:ring-offset-gray-800"
                    />
                    <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Publish</label>
                  </div>
                  <div class="flex items-center">
                    <input
                      type="radio"
                      value="0"
                      v-model="publishPayload"
                      class="w-4 h-4 text-secondary focus:ring-secondary dark:focus:ring-secondary dark:ring-offset-gray-800"
                    />
                    <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Unpublish</label>
                  </div>
                </div>
              </div>
              <div class="w-full flex items-center text-sm font-medium text-gray-900 dark:text-gray-300">
                <p>This content is currently {{ isPublished }}.</p>
                <CheckCircleIcon v-if="isPublished === 'published'" aria-hidden="true" class="h-7 w-7 text-green-500" />
                <XCircleIcon v-else aria-hidden="true" class="h-7 w-7 text-red-500" />
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
import { onMounted, ref, watch, computed } from 'vue';
import { debounce } from 'instantsearch.js/es/lib/utils';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';

definePageMeta({ middleware: 'auth' })

const config = useRuntimeConfig();
const markerPosition = ref({ lat: 0, lng: 0 });
const { $api, $router, $ytVideo, $commonUtl } = useNuxtApp()
const { params } = useRoute();
const eventData = reactive({
  details: {}
});
const mediaArr = useState('mediaArr', () => ([]));
const formResponse = reactive({
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

const { status } = useAuth();

const targetApi = computed(() => {
  if (status.value === 'unauthenticated') {
    return 'occasion';
  } else if (status.value === 'authenticated') {
    return 'authDetailOccasion';
  }
  return '';
});

await $api[targetApi.value].show(params.id)
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
  if (eventData.details.photo.url)
    await checkImage(eventData.details.photo.url);

  eventData.details.videos.forEach((e, index) => {
    if (e.url) checkYT(eventData.details.videos[index])
  })
});
const getLatLng = (event) => {
  const lat = parseFloat(event.latLng.lat().toFixed(5));
  const lng = parseFloat(event.latLng.lng().toFixed(5));
  markerPosition.value = { lat, lng };
};
const publishPayload = ref(eventData.details.open_flg);
const isPublished = computed(() => (eventData.details.open_flg === 1) ? 'published' : 'not published');

const getErrors = () => {
  const regExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;

  const errArr = [];

  if (!eventData.details.photo.urlStatus) {
    errArr.push('Image URL incorrect');
  }

  if ((eventData.details.videos[0].url && !regExp.test(eventData.details.videos[0].url)) || (eventData.details.videos[0].url && !eventData.details.videos[0].urlStatus)) {
    errArr.push('Video 1 URL incorrect')
  }
  if ((eventData.details.videos[1].url && !regExp.test(eventData.details.videos[1].url)) || (eventData.details.videos[1].url && !eventData.details.videos[1].urlStatus)) {
    errArr.push('Video 2 URL incorrect')
  }
  if ((eventData.details.videos[2].url && !regExp.test(eventData.details.videos[2].url)) || (eventData.details.videos[2].url && !eventData.details.videos[2].urlStatus)) {
    errArr.push('Video 3 URL incorrect')
  }

  return errArr;
}
const setResponse = (type, message) => {
  formResponse.type = type;
  formResponse.messages = message;
  window.scrollTo({ top: 0, behavior: 'smooth' });

};
const submitHandler = async event => {
  event.preventDefault();
  formResponse.isProcessing = true;
  formResponse.messages = [];

  const errors = getErrors();

  if (errors.length) {
    setResponse('danger', errors);
    formResponse.isProcessing = false;
    return;
  }
  
  const requestBody = {
    subject: eventData.details.subject,
    description: eventData.details.description,
    start_dt: eventData.details.start_dt,
    end_dt: eventData.details.end_dt,
    performers: eventData.details.performers,
    malayalam_calendar: eventData.details.malayalam_calendar,
    venue_name: eventData.details.venue_name,
    venue_address: eventData.details.venue_address,
    venue_direction_notes: eventData.details.venue_direction_notes,
    venue_lat: markerPosition.value.lat,
    venue_long: markerPosition.value.lng,
    open_flg: parseInt(publishPayload.value),
    photo: {
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
  
  requestBody['contact_name'] = contactsPayload.map(contact => contact.name || '');
  requestBody['contact_designation'] = contactsPayload.map(contact => contact.designation || '');
  requestBody['contact_details_1'] = contactsPayload.map(contact => contact.phones[0] || '');
  requestBody['contact_details_2'] = contactsPayload.map(contact => contact.phones[1] || '');
  requestBody['contact_details_3'] = contactsPayload.map(contact => contact.phones[2] || '');
  
  requestBody['videos'] = eventData.details.videos.map(video => {
    return {
      url: video.url,
      title: video.title || ''
    };
  });
  
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
        $router.push({ path: `/event/${eventData.details.slug}` })
      }
    })
    .finally((res) => {
      formResponse.isProcessing = false;
    });

}

const checkMedia = (url) => {
  return new Promise((resolve,reject) => {
    let img = new Image()
    img.onload = () => resolve({ height: img.height, width: img.width })
    img.onerror = reject
    img.src = url;
  })
}
const checkImage = async () => {
  await checkMedia(eventData.details.photo.url)
    .then(res => {
      if (res.height) {
        eventData.details.photo.urlStatus = true;
      } else
        eventData.details.photo.urlStatus = false;
    })
    .catch(er => eventData.details.photo.urlStatus = false);
};


const checkImageOnChange = $commonUtl.debounce(checkImage);

const checkYT = async ytData => {
  await checkMedia(`https://img.youtube.com/vi/${$ytVideo.youtubeParser(ytData.url)}/mqdefault.jpg`)
    .then(res => {
      if (res.width !== 120) {
        ytData.urlStatus = true;
      } else
        ytData.urlStatus = false;
    })
    .catch(er => ytData.urlStatus = false);
}

const onYTKeyUp = $commonUtl.debounce(checkYT);
</script>