// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: 'src',
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/algolia'],
    algolia: {
        apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
        applicationId: process.env.ALGOLIA_APPLICATION_ID,
        instantSearch: {
            theme: 'algolia'
        }
    }
})
