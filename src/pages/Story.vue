<script setup>
const gallery = [
  {
    imageSrc: 'story_img4.jpg',
  },
  {
    imageSrc: 'story_img3.jpg',
  },
  {
    imageSrc: 'story_img4.jpg',
  },
]
</script>

<template>
  <div>
    <section>
      <h1 class="text-center">Theyyam Story</h1>
      <div class="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
        <div v-for="image in gallery" :key="image.id" class="flex flex-col rounded-2xl bg-white shadow-xl">
          <img :src="`_nuxt/assets/images/${image.imageSrc}`" class="h-2/3 w-auto object-cover object-center"  alt=""/>
        </div>
      </div>
    </section>
    <div class="relative bg-gray-800">
      <div class="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <p class="mt-6 max-w-3xl text-xl text-gray-300">"Theyyam" is a traditional form of worship passed down in the northern part of the state of Kerala, North
          Malabar region. The name refers to the word for god in the local language, Malayalam.</p>
        <p class="mt-6 max-w-3xl text-xl text-gray-300">The religious festival is like a hunting ceremony or a prayer for bounty. In gratitude for the blessing
          of the abundant forest, it is an expression of reverence for nature.</p>
        <p class="mt-6 max-w-3xl text-xl text-gray-300">The deity inhabits the person chosen by its spirit. The people who become the Theyyam are called the
          Theyyakkaran. They learn the performances as a family tradition, and pass on the legends of the land.
          The outline of story is based on the legend handed down in the land. There are many instances where the
          stories of indigenous and Hindu deities fuse.</p>
        <p class="mt-6 max-w-3xl text-xl text-gray-300">We are able to see people in the process of becoming Theyyam as part of an open theatre performance. In a
          site for communion with the divine after the performance, people paying homage were blessed and were
          able to receive direct revelations.</p>
        <p class="mt-6 max-w-3xl text-xl text-gray-300">More than 400 varieties of Theyyam myths are primarily performed in the temples of several villages in a
          public stage. It is held in the day and night, depending on the ceremony sometimes happens in the middle
          of the night.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Fira+Mono:500');
*{
  font-family: 'Fira Mono', monospace;
  font-weight: 800;
  font-size: 18px;
}
img{
  border-radius:15px;
}
.pb-32{
  box-shadow: 0px 2px #552214;
}
h1{
  font-size: 30px;
}
.rounded-2xl:nth-child(3) {
  transform: rotatey(180deg)
}
</style>
