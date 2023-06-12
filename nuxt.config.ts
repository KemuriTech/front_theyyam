require('dotenv').config()
export default defineNuxtConfig({
    srcDir: 'src',
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/algolia'],
    algolia: {
        apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
        applicationId: process.env.ALGOLIA_APPLICATION_ID,
        instantSearch: {
            theme: 'algolia'
        }
    },
    css: [
        '@/assets/css/common.css'
    ],
})
