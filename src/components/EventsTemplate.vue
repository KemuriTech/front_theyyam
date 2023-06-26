<template>
<BgGradient />
    <div class="max-w-2xl mx-auto py-16 sm:py-24 sm:pt-12 lg:max-w-7xl">
        <div class="px-2 sm:px-5 lg:px-6">
            <input id="search" v-model="searchInput" autocomplete="search" class="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   name="search"
                   placeholder="Search Here" type="text"/>
        </div>
        <div class="w-full mt-6 grid grid-cols-1 gap-x-8 gap-y-8 justify-items-center sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4 px-4 sm:px-6 lg:px-8">
            <div v-for="(item, number) in items" :key="number">
                <NuxtLink :to="`event/${item.topics_id}`" class="cursor-pointer">
                    <div class="image-figure aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
                        <img v-if='!item?.ext_13?.url'
                             :src="item?.ext_16?.url"/>
                      <div v-else
                           v-on:mouseleave="stopVideo"
                           v-on:mouseover="playVideo"
                      >
                        <iframe :data-uid='item?.ext_13?.url?.split("v=")[1]'
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
                              $formatter.formatDate(item.ext_4, item.ext_5)
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
import {useRouter} from 'vue-router';
import {watch} from 'vue';


const router = useRouter();
const previousPath = ref(null);
const {$api} = useNuxtApp();

const items = useState('items', () => ([]));
const extraParam = router.currentRoute.value.name;
const isProcessing = ref(false);
const pageInfo = ref({
  pageID: 1,
  lastPage: 1,
});
const searchInput = ref('');

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

const buildFilterQuery = () => {
  const queryInputs = {
    subject: searchInput.value,
  };
  const filterQuery = Object.entries(queryInputs)
    .reduce((queries, [col, value]) => {
      if (value !== '') {
        queries.push(`${col} icontains "${value}"`);
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

  if (searchInput.value) {
    params.filter = buildFilterQuery();
  }

  isProcessing.value = true;
  initializeData();

  await $api
    [extraParam === 'Pastevents' ? 'pastEvents' : 'occasions']
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

const playVideo = (event) => {
  event.target?.firstElementChild?.setAttribute('src', 'https://www.youtube.com/embed/' + event.target?.firstElementChild?.getAttribute('data-uid') + '?autoplay=1&mute=1&controls=0')
}

const getYoutubeImage = (item) => item?.ext_16?.url;

const stopVideo = (event) => {
  event.target?.firstElementChild?.setAttribute('src', '');
}

router.beforeEach((to, from) => {
  previousPath.value = from.name;
});

</script>
