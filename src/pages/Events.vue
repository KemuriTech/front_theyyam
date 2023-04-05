<script>
export default {
  async setup() {
    const pageNumber = 1;
    const eventList = [];
    await fetch('https://theyyam.g.kuroco.app/rcms-api/1/events?topics_group_id%5B%5D=%271%27&pageID='+ pageNumber, {
      method: 'GET',
    }).then(response => response.json())
        .then(response => {
          response.list.forEach(el => eventList.push({ topicID: el.topics_id, title: el.subject, description: el.ext_3, start_dt: el.ext_4, end_dt: el.ext_5, location: el.ext_6, image: el.ext_16.url}))
        })
    return { eventList, pageNumber }
  }
}
</script>

<template>
  <div class="bg-white">
    <section class="bg-gray-100 dark:bg-gray-900 py-10 px-12">
      <span class="text-4xl">Events</span>
      <!-- Card Grid -->
      <div
          class="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div
              class="my-8 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1"
              v-for="(event, index) in eventList">
            <!-- Clickable Area -->
            <NuxtLink :to="`Event${event.topicID}`" class="cursor-pointer">
              <figure>
                <!-- Image -->
                <img
                    :src="event.image"
                    class="rounded-t h-72 w-full object-cover" />
                <figcaption class="p-4">
                  <p
                      class="text-lg mb-4 font-bold leading-relaxed text-gray-800 dark:text-gray-300"
                      v-text="event.title"/>
                  <small
                      class="leading-5 text-gray-500 dark:text-gray-400"
                      v-text="event.description">
                  </small>
                </figcaption>
              </figure>
            </NuxtLink>
          </div>
      </div>
    </section>
    <ol class="flex justify-center gap-1 text-xs font-medium">
      <li>
        <a
            href="#"
            class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
        >
          <span class="sr-only">Prev Page</span>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
          >
            <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
            />
          </svg>
        </a>
      </li>

      <li>
        <a
            href="#"
            class="block h-8 w-8 rounded border border-gray-100 text-center leading-8"
        >
          1
        </a>
      </li>

      <li
          class="block h-8 w-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white"
      >
        2
      </li>

      <li>
        <a
            href="#"
            class="block h-8 w-8 rounded border border-gray-100 text-center leading-8"
        >
          3
        </a>
      </li>

      <li>
        <a
            href="#"
            class="block h-8 w-8 rounded border border-gray-100 text-center leading-8"
        >
          4
        </a>
      </li>

      <li>
        <a
            href="#"
            class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
        >
          <span class="sr-only">Next Page</span>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
          >
            <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
            />
          </svg>
        </a>
      </li>
    </ol>
  </div>
</template>

