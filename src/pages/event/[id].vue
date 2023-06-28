<template>
  <BgGradient />
  <main class="max-w-7xl mx-auto sm:pt-16 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto lg:max-w-none">
      <!-- Product -->
      <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <!-- Image gallery -->
        <TabGroup v-if="mediaArr.length" as="div" class="flex flex-col-reverse">
          <!-- Image selector -->
          <div class="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <TabList class="grid grid-cols-4 gap-6">
              <Tab v-for="(media, id) in mediaArr" :key="id" class="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50" v-slot="{ selected }">
                <span class="sr-only">
                  {{ media.type }}
                </span>
                <span class="absolute inset-0 rounded-md overflow-hidden">
                  <img :src="getImage({type:media.type, url:media.url})" alt="" class="w-full h-full object-center object-cover" />
                </span>
                <span :class="[selected ? 'ring-indigo-500' : 'ring-transparent', 'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none']" aria-hidden="true" />
              </Tab>
            </TabList>
          </div>
          <TabPanels class="w-full aspect-w-1 aspect-h-1" >
            <TabPanel v-for="(media, id) in mediaArr" :key="id">
              <Head>
                <Meta :content="media.url" name="og:image"/>
              </Head>
              <img v-if="media.type === MEDIA_TYPE.IMAGE" class="w-full h-[21rem] object-center object-cover sm:rounded-lg" :src="media.url" alt="Temple" />
              <div v-else-if="media.type === MEDIA_TYPE.YT_VIDEO" class='w-full h-[21rem]'>
                <iframe class="w-full h-full sm:rounded-lg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowfullscreen :src="$ytVideo.getYTVideoUrl(media.url, 'mute=1&modestbranding=1&autoplay=1')"></iframe>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <!-- Product info -->
        <div class="mt-8 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <Head>
            <Title>{{ eventData.subject }}</Title>
            <Meta :content="eventData.ext_3" name="description"/>
          </Head>
          <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{{ eventData.subject }}</h1>

          <div class="mt-3">
            <h2 class="sr-only">Details</h2>
            <p class="text-lg text-gray-700">{{$formatter.formatDate(eventData?.ext_4, eventData?.ext_5)}}</p>
            <p class="text-lg text-gray-700">{{ eventData.ext_7 }}</p>
          </div>

          <div class="mt-6">
            <h3 class="sr-only">Description</h3>

            <div class="text-base text-gray-700 space-y-6">
              {{ eventData.ext_3 }}
            </div>
          </div>

          <section v-if="eventData.ext_6 || eventData.ext_9 || eventData.ext_10 || eventData.ext_11 || eventData.ext_12 || contactInfos.length" aria-labelledby="details-heading" class="mt-12">
            <h2 id="details-heading" class="sr-only">Additional details</h2>

            <div class="border-t divide-y divide-gray-200">
              <Disclosure v-if="eventData.ext_6" as="div" v-slot="{ open }">
                <h3>
                  <DisclosureButton class="group relative w-full py-6 flex justify-between items-center text-left">
                    <span :class="[open ? 'text-secondary' : 'text-gray-900', 'text-sm font-medium']">
                      Theyyams Performing Here
                    </span>
                    <span class="ml-6 flex items-center">
                      <PlusIcon v-if="!open" class="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                      <MinusIcon v-else class="block h-6 w-6 text-secondary group-hover:bg-opacity-80 " aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel as="div" class="pb-6 prose prose-sm">
                  <p>
                    {{ eventData.ext_6 }}
                  </p>
                </DisclosurePanel>
              </Disclosure>
              <Disclosure v-if="eventData.ext_9 || eventData.ext_10" as="div" v-slot="{ open }">
                <h3>
                  <DisclosureButton class="group relative w-full py-6 flex justify-between items-center text-left">
                    <span :class="[open ? 'text-secondary' : 'text-gray-900', 'text-sm font-medium']">
                      Address & Venue Directions
                    </span>
                    <span class="ml-6 flex items-center">
                      <PlusIcon v-if="!open" class="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                      <MinusIcon v-else class="block h-6 w-6 text-secondary group-hover:bg-opacity-80 " aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel as="div" class="pb-6 prose prose-sm">
                  <p>{{ eventData.ext_9 }}</p>
                  <p>{{ eventData.ext_10 }}</p>
                  <a v-if="eventData.ext_11 && eventData.ext_12" :href="`https://www.google.com/maps/search/?api=1&query=${eventData.ext_11}%2C${eventData.ext_12}`" target="_blank" class="py-2.5 text-center no-underline text-gray-600 font-normal">
                    Open in Google Maps
                    <svg class="inline mb-0.5 fill-gray-600" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="12" height="12" viewBox="0 0 48 48" ><path d="M 40.960938 4.9804688 A 2.0002 2.0002 0 0 0 40.740234 5 L 28 5 A 2.0002 2.0002 0 1 0 28 9 L 36.171875 9 L 22.585938 22.585938 A 2.0002 2.0002 0 1 0 25.414062 25.414062 L 39 11.828125 L 39 20 A 2.0002 2.0002 0 1 0 43 20 L 43 7.2460938 A 2.0002 2.0002 0 0 0 40.960938 4.9804688 z M 12.5 8 C 8.3826878 8 5 11.382688 5 15.5 L 5 35.5 C 5 39.617312 8.3826878 43 12.5 43 L 32.5 43 C 36.617312 43 40 39.617312 40 35.5 L 40 26 A 2.0002 2.0002 0 1 0 36 26 L 36 35.5 C 36 37.446688 34.446688 39 32.5 39 L 12.5 39 C 10.553312 39 9 37.446688 9 35.5 L 9 15.5 C 9 13.553312 10.553312 12 12.5 12 L 22 12 A 2.0002 2.0002 0 1 0 22 8 L 12.5 8 z"/></svg>
                  </a>
                </DisclosurePanel>
              </Disclosure>
              <Disclosure v-if="contactInfos.length" as="div" v-slot="{ open }">
                <h3>
                  <DisclosureButton class="group relative w-full py-6 flex justify-between items-center text-left">
                    <span :class="[open ? 'text-secondary' : 'text-gray-900', 'text-sm font-medium']">
                      Contact Info
                    </span>
                    <span class="ml-6 flex items-center">
                      <PlusIcon v-if="!open" class="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                      <MinusIcon v-else class="block h-6 w-6 text-secondary group-hover:bg-opacity-80 " aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel as="div" class="pb-6 prose prose-sm">
                  <div class="grid grid-cols-2">
                    <ContactInfo
                      v-for="info in contactInfos"
                      :key="info.id"
                      :contact-info="info"
                    />
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
  <UpcomingEvents />
</template>

<script>
import { useRoute } from 'vue-router';

import { ref } from 'vue'
import {
  Dialog,
  DialogOverlay,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  UserIcon,
  StarIcon
} from '@heroicons/vue/20/solid';

import { MinusIcon, PlusIcon } from '@heroicons/vue/20/solid';


const MEDIA_TYPE = {
  IMAGE: 'IMAGE',
  YT_VIDEO: 'YT_VIDEO',
}

const open = ref(false)

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    MinusIcon,
    PlusIcon,
  },
  async setup() {
    const { $formatter, $ytVideo, $api, $router } = useNuxtApp()
    const { params } = useRoute();
    let eventData = {};
    const mediaArr = useState('mediaArr', () => ([]));

    await $api.occasion.show(params.id)
      .then(response => response.json())
      .then(response => {
        if (!response.details) {
          return $router.push({ path: '/events' })
        }

        eventData = response.details;
        let _mediaArr = [];
        if (eventData?.ext_16?.url) {
          _mediaArr.push({
            url: eventData?.ext_16?.url,
            type: MEDIA_TYPE.IMAGE
          })
        }
        mediaArr.value = _mediaArr;
      });
    const contactInfos = [];

    if (eventData?.ext_17
      || eventData?.ext_18
      || eventData?.ext_19
      || eventData?.ext_20
      || eventData?.ext_21) {
      contactInfos.push(
        {
          name: eventData.ext_17 ?? '',
          designation: eventData.ext_18 ?? '',
          contacts: [
            eventData.ext_19 ?? '',
            eventData.ext_20 ?? '',
            eventData.ext_21 ?? '',
          ],
        },
      )
    }
    if (eventData?.ext_22
      || eventData?.ext_23
      || eventData?.ext_24
      || eventData?.ext_25
      || eventData?.ext_26) {
      contactInfos.push(
        {
          name: eventData.ext_22 ?? '',
          designation: eventData.ext_23 ?? '',
          contacts: [
            eventData.ext_24 ?? '',
            eventData.ext_25 ?? '',
            eventData.ext_26 ?? '',
          ],
        },
      )
    }
    if (eventData?.ext_27
      || eventData?.ext_28
      || eventData?.ext_29
      || eventData?.ext_30
      || eventData?.ext_31) {
      contactInfos.push(
        {
          name: eventData.ext_27 ?? '',
          designation: eventData.ext_28 ?? '',
          contacts: [
            eventData.ext_29 ?? '',
            eventData.ext_30 ?? '',
            eventData.ext_31 ?? '',
          ],
        },
      )
    }
    if (eventData?.ext_32
      || eventData?.ext_33
      || eventData?.ext_34
      || eventData?.ext_35
      || eventData?.ext_36) {
      contactInfos.push(
        {
          name: eventData.ext_32 ?? '',
          designation: eventData.ext_33 ?? '',
          contacts: [
            eventData.ext_34 ?? '',
            eventData.ext_35 ?? '',
            eventData.ext_36 ?? '',
          ],
        },
      )
    }


    return {
      eventData,
      open,
      $formatter,
      $ytVideo,
      MEDIA_TYPE,
      contactInfos,
      mediaArr
    }
  },
  mounted() {
    const _mediaArr = this.mediaArr;
    const _getAllYTUIDs = () => {
      return [
        this.$ytVideo.youtubeParser(this.eventData.ext_13?.url),
        this.$ytVideo.youtubeParser(this.eventData.ext_14?.url),
        this.$ytVideo.youtubeParser(this.eventData.ext_15?.url)
      ]
    }
    this.$ytVideo.getValidUID(() => _getAllYTUIDs())
      .then(ids => {
        _mediaArr.push(...ids.map((e, i) => ({
          url: e,
          type: MEDIA_TYPE.YT_VIDEO
        })))

        this.mediaArr.value = _mediaArr;
      })
  },
  methods: {
    getImage({ type, url }) {
      switch (type) {
      case MEDIA_TYPE.IMAGE:
        return url;
      case MEDIA_TYPE.YT_VIDEO:
        return `https://img.youtube.com/vi/${url}/0.jpg`;
      }
    },
  }
}


</script>