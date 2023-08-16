<template>
  <BgGradient />
  <div class="max-w-2xl mx-auto py-16 sm:py-24 sm:pt-12 lg:max-w-7xl">
    <div class="px-2 sm:px-5 lg:px-6">
      <div class="flex">
        <div class="sm:w-[12rem] md:w-[15rem] pr-2">
          <datepicker v-model="dateFilter" :formatter="pickerFormat" :placeholder="'Filter By Date'" />
        </div>
        <div class="flex-grow">
          <input  id="search" v-model="searchInput" autocomplete="search" class="relative block w-full opacity-100 pl-3 pr-12 py-2.5 rounded-lg overflow-hidden border-solid text-sm text-vtd-secondary-700 placeholder-vtd-secondary-400 transition-colors bg-white border border-vtd-secondary-300 focus:border-vtd-primary-300 focus:ring focus:ring-vtd-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-vtd-secondary-800 dark:border-vtd-secondary-700 dark:text-vtd-secondary-100 dark:placeholder-vtd-secondary-500 dark:focus:border-vtd-primary-500 dark:focus:ring-opacity-20" placeholder="Search here" type="text"/>
        </div>
      </div>
    </div>
    <div class="w-full mt-6 grid grid-cols-1 gap-x-8 gap-y-8 justify-items-center sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4 px-4 sm:px-6 lg:px-8">
      <div v-for="(item, number) in items" :key="number">
        <NuxtLink :to="`event/${item.topics_id}`" class="cursor-pointer">
          <div class="image-figure aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
            <img v-if='!item?.videos?.length'
                 :src="item?.photo?.url"/>
            <div v-else
                 v-on:mouseleave="stopVideo"
                 v-on:mouseover="playVideo"
            >
              <iframe :data-uid='JSON.stringify(getUIDs(item))'
                      :style='`background-image: url("${getYoutubeImage(item)}");`'
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen class='bg-cover bg-center pointer-events-none' frameborder="0"
              >
              </iframe>
            </div>
          </div>
          <div class="mt-4 flex text-left justify-between text-base font-medium text-gray-900 space-x-8 mb-1 w-64">
            <h3>
              <span/>
              {{ item.subject }}
            </h3>
          </div>
          <p class="mt-1 text-sm text-gray-500 flex items-center space-x-2">
            <span class="mr-1">{{
              $formatter.formatDate(item.start_dt, item.end_dt)
            }}</span>
          </p>
        </NuxtLink>
      </div>
      <template v-if="isProcessing">
        <ui-skeletons-event-card-skeleton v-for="key in 8" :key="key" />
      </template>
    </div>
    <div v-if="!items.length && !isProcessing">
      <div class="text-center">
        <h3 class="mt-2 text-sm font-medium text-gray-900">No events found.</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { watch , ref } from 'vue';
import { useYTValidate } from '~/stores/ytValidate';
import Datepicker from 'vue-tailwind-datepicker';
import { searchExt } from '../constants';
import dayjs from 'dayjs'
const config = useRuntimeConfig();

const router = useRouter();
const previousPath = ref(null);
const { $api } = useNuxtApp();
const filter = ref('');

const items = useState('items', () => ([]));
const extraParam = router.currentRoute.value.name;
const isProcessing = ref(false);
const pageInfo = ref({
  pageID: 1,
  lastPage: 1,
});
const searchInput = ref('');
const dateFilter = ref({
  fromDate: null,
  toDate: null,
});
const pickerFormat = ref({
  date: 'DD MMM YYYY',
  month: 'MMM'
})
const ytStore = useYTValidate();
const { validateYTVideo } = ytStore;

const initializeData = () => {
  if (pageInfo.value.pageID == 1) {
    items.value = [];
  }
}

onMounted(() => {
  scroll();
})

function debounce(func, timeout = 1000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}


const scroll = () => {
  window.onscroll = () => {
    let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight;
    if (bottomOfWindow && !isProcessing.value && pageInfo.value.lastPage > pageInfo.value.pageID) {
      pageInfo.value.pageID++;
      fetchData();
    }
  }
};

const getPageInfo = (arr) => {
  return {
    pageID: arr.pageNo,
    lastPage: arr.endPageNo
  };
}

const formatPickerDate = (dateString) => (dateString === null ? '' : dayjs(dateString).format('YYYY-MM-DD'));

const buildFilterQuery = () => {
  const queryInputs = {
    subject: searchInput.value,
  };
  const fromDate = formatPickerDate(dateFilter.value.fromDate);
  const toDate = formatPickerDate(dateFilter.value.toDate);
  const filterQuery = Object.entries(queryInputs)
    .reduce((queries, [col, value]) => {
      if (value !== '') {
        const query = searchExt.map(ext => {
          const extCondition = `ext_${ext} icontains "${value}"`;
          return `${col} icontains "${value}" OR ${extCondition}`;
        }).join(' OR ');
        queries.push(query);
      }
      if (fromDate !== '' && toDate !== '') {
        queries.push(`ext_4 >= "${fromDate}" AND ext_5 <= "${toDate}"`)
      }
      return queries;
    }, [])
    .join(' AND ');
  return filterQuery;
}
const fetchData = async () => {
  const params = {
    pageID: pageInfo.value.pageID,
  };

  if (searchInput.value || dateFilter.value.fromDate &&  dateFilter.value.toDate) {
    params.filter = buildFilterQuery();
  }

  isProcessing.value = true;
  initializeData();

  await $api
    [extraParam === 'past' ? 'pastEvents' : 'occasions']
    .get(params)
    .then(response => response.json())
    .then(res => {
      pageInfo.value = getPageInfo(res.pageInfo);

      if (pageInfo.value.pageID == 1) {
        items.value = res.list;
        return;
      }
      const _item = [...items.value, ...res.list];
      items.value = _item;
    })
    .finally(res => {
      isProcessing.value = false
    })
}

fetchData();
const hitSearchAPI = () => debounce(()=>{
  pageInfo.value.pageID = 1;
  return fetchData();
})

watch(searchInput, hitSearchAPI());
watch(dateFilter, hitSearchAPI());

const playVideo =  async event => {
  const ytUIDs = JSON.parse(event.target?.firstElementChild?.getAttribute('data-uid'));
  let ytCurrentLength = 0;

  while (ytCurrentLength < ytUIDs.length) {
    await validateYTVideo(ytUIDs[ytCurrentLength])
      .then(res=> {
        if (res.isValid) {
          event.target?.firstElementChild?.setAttribute('src', `https://www.youtube.com/embed/${res.uid}?autoplay=1&mute=1&controls=0`);
          ytCurrentLength = ytUIDs.length;
        }
      });
    ytCurrentLength++;
  }
}

const getYoutubeImage = (item) => item?.photo?.url;

const stopVideo = (event) => {
  event.target?.firstElementChild?.setAttribute('src', '');
}

const splitYTUID = (url) => {
  return url.split('v=')[1] ?? null;
}

const getUIDs = item => {
  return item?.videos?.map(e=>splitYTUID(e.url));
}

router.beforeEach((to, from) => {
  previousPath.value = from.name;
});

useHead({
  title: config.SERVICE_NAME,
  meta: [
    { hid: 'description', name: 'description', content: config.SITE_DESC },
    { hid: 'og:image', property: 'og:image', content: `https://${config.FRONTEND_BASE_URL}/images/th_bg_1.jpg` },
  ],
})
</script>
