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

    return { eventData }
  }
}
</script>

<template>
  <section>
    <div class="relative mx-auto max-w-screen-xl px-4 py-8">
      <div class="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        <div class="grid grid-cols-2 gap-4 md:grid-cols-1">
          <img
              alt="Temple Photo"
              :src="eventData.ext_16.url"
              class="aspect-square w-1/2 rounded-xl object-cover"
          />

          <div class="grid grid-cols-2 gap-4 lg:mt-4">

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

          <div class="mt-8 flex justify-between">
            <div class="max-w-[35ch] space-y-2">
              <a :href="eventData.ext_1.url">
                <h1 class="text-xl font-bold sm:text-2xl text-black">
                  {{ eventData.subject }}
                </h1>
              </a>

              Dates: <span class="text-sm text-gray-700">{{ eventData.ext_4 }}  -> {{ eventData.ext_5 }}</span> <br>
              Date according to Malayalam Calendar : <span class="text-sm text-gray-700"> {{ eventData.ext_7 }} </span>

            </div>
          </div>

          <div class="mt-4">
            <div class="prose max-w-none">
              <p class="text-sm text-gray-700">
                {{ eventData.ext_3 }}
               </p>
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

              <div class="col-sm-12 text-gray-700">
                  <span v-if="eventData.ext_17">{{ eventData.ext_17 }} <br></span>
                  <span v-if="eventData.ext_18">{{ eventData.ext_18 }} <br></span>
                  <span v-if="eventData.ext_19">{{ eventData.ext_19 }} <br></span>
                  <span v-if="eventData.ext_20">{{ eventData.ext_20 }} <br></span>
                  <span v-if="eventData.ext_21">{{ eventData.ext_21 }} <br></span>
              </div>

              <div class="col-sm-12 text-gray-700">
                <span v-if="eventData.ext_22">{{ eventData.ext_22 }} <br></span>
                <span v-if="eventData.ext_23">{{ eventData.ext_23 }} <br></span>
                <span v-if="eventData.ext_24">{{ eventData.ext_24 }} <br></span>
                <span v-if="eventData.ext_25">{{ eventData.ext_25 }} <br></span>
                <span v-if="eventData.ext_26">{{ eventData.ext_26 }} <br></span>
              </div>

              <div class="col-sm-12 text-gray-700">
                <span v-if="eventData.ext_27">{{ eventData.ext_27 }} <br></span>
                <span v-if="eventData.ext_28">{{ eventData.ext_28 }} <br></span>
                <span v-if="eventData.ext_29">{{ eventData.ext_29 }} <br></span>
                <span v-if="eventData.ext_30">{{ eventData.ext_30 }} <br></span>
                <span v-if="eventData.ext_31">{{ eventData.ext_31 }} <br></span>
              </div>

              <div class="col-sm-12 text-gray-700">
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
</template>

