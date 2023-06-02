const getYTVideoUrl = (uid) => {
    return `https://www.youtube.com/embed/${uid}?autoplay=1&mute=1&controls=0`;
}
export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            getYTVideoUrl: getYTVideoUrl
        }
    }
})