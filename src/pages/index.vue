<template>

  <section class="text-black body-font overflow-hidden">
    <div class="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center ">
      <div class="lg:flex-grow flex flex-col md:items-start md:text-left sm:mb-5 mb-16 md:mb-0 items-center text-center">
        <h1 class="title-font tracking-wide text-5xl md:text-7xl mb-4 font-bold ">Theyyam Festival
        </h1>
        <p class="mb-8 text-lg leading-8 text-gray-600">Experience the Vibrancy of Tradition at the Theyyam Festival - A Sacred Dance That Transcends Time</p>
        <div class="flex justify-center">
          <NuxtLink class="inline-flex text-white bg-secondary py-2 px-4 focus:outline-none hover:bg-opacity-80 rounded-md	text-sm" to="/events">View Events</NuxtLink>
        </div>
      </div>

      <div  id="pattern" class="sm:w-full lg:max-w-xl bg-contain bg-no-repeat md:ml-4 xl:mr-16 overflow-hidden lg:py-5 px-5">
        <div class="w-full flex gap-5 lg:gap-10 justify-center">
          <div v-for="(imageGroup, key) in images" :key="key" class="flex flex-col gap-5 lg:gap-10 justify-center" :data-key="key">
            <img v-for="(image, _key) in imageGroup" :key="_key" class="object-cover object-center rounded-xl" alt="hero" :src="`/images/${image.imageSrc}`" width="200" height="300"/>
          </div>
        </div>
      </div>
      <div class="relative">
        <div class="absolute rounded-full bg-secondary w-72 h-72 mix-blend-multiply filter blur-xl opacity-50 animate-blob -z-10 top-5 -left-20"></div>
      </div>
    </div>
  </section>

  <div class="relative bg-red-900">
    <div class="h-80 w-full absolute bottom-0 xl:inset-0 xl:h-full">
      <div class="h-full w-full xl:grid xl:grid-cols-2">
        <div class="h-full xl:relative xl:col-start-2">
          <img class="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0" :src="`/images/${section2Img}`" alt="" />
          <div aria-hidden="true" class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-red-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r" />
        </div>
      </div>
    </div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-cols-2 xl:grid-flow-col-dense xl:gap-x-8">
      <div class="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
        <h2 class="text-sm font-semibold text-secondary tracking-wide">What is Theyyam?</h2>
        <p class="mt-5 text-lg text-gray-300">Theyyam is more than just a festival, it's a window into the rich tapestry of Kerala's cultural heritage. This sacred dance ritual, known to be over 1,500 years old, brings to life ancient tales and honors divine figures through spectacular performances filled with vibrant colors, hypnotic rhythms, and awe-inspiring passion. Experience an unforgettable blend of art, religion, and tradition at the Theyyam Festival.</p>
        <div class="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
          <p v-for="item in metrics" :key="item.id">
            <span class="block text-2xl font-bold text-white">{{ item.stat }}</span>
            <span class="mt-1 block text-base text-gray-300"
            ><span class="font-medium text-white">{{ item.emphasis }}</span> {{ item.rest }}</span
            >
          </p>
        </div>
      </div>
    </div>
  </div>
  <UpcomingEvents/>
  <div class="relative">
    <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
      <div class="bg-clip-right relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[45deg] bg-gradient-to-tr from-primary to-secondary opacity-30 sm:left-[100rem] sm:w-[72.1875rem]" />
    </div>
  </div>
  <div class="mx-auto max-w-md px-4 text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
    <div>
      <h2 class="text-base font-semibold tracking-wider text-secondary">Why to visit Theyyam</h2>
      <p class="mt-5 max-w-prose mx-auto text-xl text-gray-500">To visit Theyyam is to embark on a spiritual odyssey, where ancient mythologies awaken amidst the rhythm of drums and the swirl of vibrant costumes. It's a unique opportunity to witness the unparalleled artistic skills, deeply-rooted traditions, and spiritual devotion that transcends ordinary human experience. Witness the hypnotic performances that blur the lines between performer and deity, between audience and participants, taking you on a transcendental journey. Soak in the raw emotional power, the enthralling beats, the stunning visuals, and the spiritual awakening. Discover Theyyam - where history, culture, and spirituality converge in a mesmerizing dance of divinity. Experience the divine. Experience Theyyam.</p>
    </div>
    <div class="mt-12">
      <video controls class="rounded-lg shadow-xl ring-1 ring-black ring-opacity-5" playsinline="" autoplay="autoplay" loop="loop" muted="muted" type="video" id="avatarVideo" >
        <source id="videoSrc" :src="`/videos/${videoName}`" />
      </video>
    </div>
    <div class="video-credits text-base pt-2">
      <p class="flex justify-end text-base text-gray-500 hover:text-black">
        <a href="https://www.youtube.com/watch?v=qm7NbZWi3EY&t=12s" target="_blank">Gods of Malabar by Tom Dcruz</a>
      </p>
    </div>
    <div class="mt-10 pb-20">
      <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        <div v-for="feature in features" :key="feature.name" class="relative">
          <dt>
            <div class="absolute flex items-top justify-center h-12 w-12 rounded-md text-secondary mt-1">
              <component :is="feature.icon" class="h-6 w-6" aria-hidden="true" />
            </div>
            <p class="ml-16 text-lg leading-6 font-medium text-gray-900 text-left">{{ feature.name }}</p>
          </dt>
          <dd class="mt-2 ml-16 text-base text-gray-500 text-left">
            {{ feature.description }}
          </dd>
        </div>
      </dl>
    </div>
  </div>

  <div class="relative bg-red-900">
    <div class="h-80 w-full absolute bottom-0 xl:inset-0 xl:h-full">
      <div class="h-full w-full xl:grid xl:grid-cols-2">
        <div class="h-full xl:relative xl:col-start-0">
          <img class="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0" :src="`/images/${eventImg}`" alt="" />
          <div aria-hidden="true" class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-red-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-l ml-auto" />
        </div>
      </div>
    </div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-cols-2 xl:grid-flow-col-dense xl:gap-x-8">
      <div class="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-2 xl:pb-24 xl:pr-10">
        <h2 class="text-sm font-semibold text-secondary tracking-wide">Events</h2>
        <p class="mt-3 text-3xl font-extrabold text-white">Explore the Events</p>
        <p class="mt-5 text-lg text-gray-300">Ready to dive into the heart of Theyyam? Browse the wide range of events tailored to offer a truly immersive cultural experience. From divine Theyyam performances to traditional music event offers a unique lens through which to understand and appreciate the depth of this extraordinary festival.</p>
        <div class="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
          <div class="inline-flex rounded-md shadow">
            <NuxtLink class="inline-flex text-white bg-blue-700 py-2 px-4 focus:outline-none hover:bg-opacity-80 rounded-md text-sm bg-secondary" to="/events">View Events</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ContactUs />

</template>

<script setup>
import { MusicalNoteIcon, AcademicCapIcon, EyeIcon, SparklesIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { SERVICE_NAME, SITE_DESC, FRONTEND_BASE_URL } from '../constants';

const images = [
  [
    {
      imageSrc: 'th_intro6.jpg',
    },

  ],
  [
    {
      imageSrc: 'th_intro2.jpg',
    },
    {
      imageSrc: 'th_intro1.jpg',
    },
    {
      imageSrc: 'th_intro4.jpg',
    },

  ],
  [
    {
      imageSrc: 'th_intro5.jpg',
    },
    {
      imageSrc: 'th_intro3.jpg',
    },
  ],
];

const metrics = [
  { id: 1, stat: '1,500+', emphasis: 'Years of history:', rest: 'Theyyam is one of the oldest surviving sacred dance rituals in the world."' },
  { id: 2, stat: '400+', emphasis: 'Unique Forms:', rest: 'More than 400 distinct forms of Theyyam performances exist, each having its unique rituals, costumes, and makeup.' },
  { id: 3, stat: '15,000+', emphasis: 'Performances Annually:', rest: 'With over 15,000 Theyyam performances conducted annually, this festival is the beating heart of Kerala\'s cultural landscape.' },
  { id: 4, stat: '1000+', emphasis: 'Venues:', rest: 'Theyyam rituals take place across over 1,000 sacred groves and temples in North Kerala.' },
]

const features = [
  {
    name: 'Vivid Cultural Immersion:',
    description:
        'Discover the rich tapestry of Indian mythology and tradition through a living and breathing form of art, deeply intertwined with the culture and the community.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Unique Spiritual Experience:',
    description:
        'Encounter a unique form of worship where the line between human and divine blurs, giving you an unmatched spiritual journey.',
    icon: SparklesIcon,
  },
  {
    name: 'Visual Extravaganza:',
    description:
        'Marvel at the performers\' stunning costumes, detailed makeup, and elaborate ornaments that create a visual spectacle you won\'t forget.',
    icon: EyeIcon,
  },
  {
    name: 'Musical Delight:',
    description:
        'Get swept away by the mesmerizing rhythm of traditional drums and the trance-inducing chants that accompany each performance.',
    icon: MusicalNoteIcon,
  },
]

const videoName = 'Godsofmalabarcomp.mp4';

const section2Img = 'th_bg_1.jpg';

const eventImg = 'th_bg_2.jpg';

useHead({
  title: SERVICE_NAME,
  meta: [
    { hid: 'description', name: 'description', content: SITE_DESC },
    { hid: 'og:image', property: 'og:image', content: `https://${FRONTEND_BASE_URL}/images/th_bg_1.jpg` },
  ],
})
</script>
