import YTVideoModule from "~/repositories/ytVideoModule";

interface YTVideoInstance {
    ytVideo: YTVideoModule
}

export default defineNuxtPlugin((nuxtApp) => {
    const modules: YTVideoInstance = {
        ytVideo: new YTVideoModule(),
    };

    return {
        provide: {
            ...modules
        },
    };

})