<script>
import { useRoute } from "vue-router";

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

import {MinusIcon, PlusIcon} from "@heroicons/vue/20/solid";


const MEDIA_TYPE = {
    IMAGE: 'IMAGE',
    YT_VIDEO: 'YT_VIDEO',
}

const open = ref(false)

const ContactInfo = {
    props: [
        'name',
        'designation',
        'contact1',
        'contact2',
        'contact3'
    ],
    template:`
      <div v-if="name||designation||contact1||contact2||contact3" class="border-b pb-2 mb-3">
        <span v-if="name">{{name}}</span> <span v-if="designation">({{designation}})</span>
        <div v-if="contact1">{{contact1}}</div>
        <div v-if="contact2">{{contact2}}</div>
        <div v-if="contact3">{{contact3}}</div>
      </div>
    `
}
const GetMainMedia = {
    setup() {
        const { $getYTVideoUrl } = useNuxtApp()
        return {
            MEDIA_TYPE,
            $getYTVideoUrl
        }
    },
    props: [
        'detail'
    ],
    template:`
      <img v-if="detail.type === MEDIA_TYPE.IMAGE" class="w-full h-full object-center object-cover sm:rounded-lg" :src="detail.url" alt="Temple" />
      <div v-else-if="detail.type === MEDIA_TYPE.YT_VIDEO" class='w-full h-full object-center object-cover sm:rounded-lg'>
      <iframe  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen :src="$getYTVideoUrl(detail.url)"></iframe>
      </div>
    `
}

export default {
    components: {
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
        MinusIcon,
        PlusIcon,
        StarIcon,
        UserIcon,
        ContactInfo,
        GetMainMedia,
    },
    async setup() {
        const { $formatDate } = useNuxtApp()
        const { params } = useRoute();
        let eventData = {};
        await fetch(`https://theyyam.g.kuroco.app/rcms-api/1/event/${params.id}`, {
            method: 'GET',
        }).then(response => response.json())
            .then(response => {
                eventData = response.details
            })
        return {
            eventData,
            open,
            $formatDate
        }
    },
    computed: {
        getAllMedia() {
            const mediaArr = [];

            mediaArr.push({
                url:this.eventData.ext_16.url,
                type:MEDIA_TYPE.IMAGE
            })

            mediaArr.push({
                url:this.eventData.ext_13.url.split("v=")[1],
                type:MEDIA_TYPE.YT_VIDEO
            })

            mediaArr.push({
                url:this.eventData.ext_14.url.split("v=")[1],
                type:MEDIA_TYPE.YT_VIDEO
            })

            mediaArr.push({
                url:this.eventData.ext_15.url.split("v=")[1],
                type:MEDIA_TYPE.YT_VIDEO
            })

            return mediaArr;
        }
    },
    methods: {
        getImage({type, url}) {
            console.log(type, url)
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

<template>
    <div class="bg-white pb-8">
        <main class="max-w-7xl mx-auto sm:pt-16 sm:px-6 lg:px-8">
            <div class="max-w-2xl mx-auto lg:max-w-none">
                <!-- Product -->
                <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    <!-- Image gallery -->
                    <TabGroup as="div" class="flex flex-col-reverse">
                        <!-- Image selector -->
                        <div class="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                            <TabList class="grid grid-cols-4 gap-6">
                                <Tab v-for="(media, id) in getAllMedia" :key="id" class="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50" v-slot="{ selected }">
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

                        <TabPanels class="w-full aspect-w-1 aspect-h-1">
                            <TabPanel v-for="(media, id) in getAllMedia" :key="id">
                                <GetMainMedia :detail="media"/>
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>

                    <!-- Product info -->
                    <div class="mt-8 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{{ eventData.subject }}</h1>

                        <div class="mt-3">
                            <h2 class="sr-only">Details</h2>
                            <p class="text-lg	text-gray-900">Dates: <span class="text-gray-700">{{$formatDate(eventData.ext_4, eventData.ext_5)}}</span>
                            </p>
                            <p class="text-lg">Date according to Malayalam Calendar : <span class="text-gray-700">{{ eventData.ext_7 }}</span>
                            </p>
                        </div>

                        <div class="mt-6">
                            <h3 class="sr-only">Description</h3>

                            <div class="text-base text-gray-700 space-y-6">
                                {{ eventData.ext_3 }}
                            </div>
                        </div>

                        <section aria-labelledby="details-heading" class="mt-12">
                            <h2 id="details-heading" class="sr-only">Additional details</h2>

                            <div class="border-t divide-y divide-gray-200">
                                <Disclosure as="div" v-slot="{ open }">
                                    <h3>
                                        <DisclosureButton class="group relative w-full py-6 flex justify-between items-center text-left">
                      <span :class="[open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium']">
                        Theyyams Performing Here
                      </span>
                                            <span class="ml-6 flex items-center">
                        <PlusIcon v-if="!open" class="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                        <MinusIcon v-else class="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500" aria-hidden="true" />
                      </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel as="div" class="pb-6 prose prose-sm">
                                        <p>
                                            {{ eventData.ext_6 }}
                                        </p>
                                    </DisclosurePanel>
                                </Disclosure>
                                <Disclosure as="div" v-slot="{ open }">
                                    <h3>
                                        <DisclosureButton class="group relative w-full py-6 flex justify-between items-center text-left">
                      <span :class="[open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium']">
                        Address
                      </span>
                                            <span class="ml-6 flex items-center">
                        <PlusIcon v-if="!open" class="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                        <MinusIcon v-else class="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500" aria-hidden="true" />
                      </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel as="div" class="pb-6 prose prose-sm">
                                        <p>
                                            {{ eventData.ext_9 }}
                                        </p>
                                    </DisclosurePanel>
                                </Disclosure>
                                <Disclosure as="div" v-slot="{ open }">
                                    <h3>
                                        <DisclosureButton class="group relative w-full py-6 flex justify-between items-center text-left">
                      <span :class="[open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium']">
                        Venue Directions
                      </span>
                                            <span class="ml-6 flex items-center">
                        <PlusIcon v-if="!open" class="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                        <MinusIcon v-else class="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500" aria-hidden="true" />
                      </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel as="div" class="pb-6 prose prose-sm">
                                        <p>
                                            {{ eventData.ext_10 }}
                                        </p>
                                    </DisclosurePanel>
                                </Disclosure>
                                <Disclosure as="div" v-slot="{ open }">
                                    <h3>
                                        <DisclosureButton class="group relative w-full py-6 flex justify-between items-center text-left">
                      <span :class="[open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium']">
                        Contact Info
                      </span>
                                            <span class="ml-6 flex items-center">
                        <PlusIcon v-if="!open" class="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                        <MinusIcon v-else class="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500" aria-hidden="true" />
                      </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel as="div" class="pb-6 prose prose-sm">
                                        <div class="grid grid-cols-2">
                                            <ContactInfo
                                                    :name="eventData.ext_17"
                                                    :designation="eventData.ext_18"
                                                    :contact1="eventData.ext_19"
                                                    :contact2="eventData.ext_20"
                                                    :contact3="eventData.ext_21"
                                            />
                                            <ContactInfo
                                                    :name="eventData.ext_22"
                                                    :designation="eventData.ext_23"
                                                    :contact1="eventData.ext_24"
                                                    :contact2="eventData.ext_25"
                                                    :contact3="eventData.ext_26"
                                            />
                                            <ContactInfo
                                                    :name="eventData.ext_27"
                                                    :designation="eventData.ext_28"
                                                    :contact1="eventData.ext_29"
                                                    :contact2="eventData.ext_30"
                                                    :contact3="eventData.ext_31"
                                            />
                                            <ContactInfo
                                                    :name="eventData.ext_32"
                                                    :designation="eventData.ext_33"
                                                    :contact1="eventData.ext_34"
                                                    :contact2="eventData.ext_35"
                                                    :contact3="eventData.ext_36"
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
    </div>
</template>