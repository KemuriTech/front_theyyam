import APIModule from "~/repositories/apiModule";

interface APIInstance {
    contact: APIModule,
    occasion: APIModule,
}

export default defineNuxtPlugin((nuxtApp) => {
    const modules: APIInstance = {
        contact: new APIModule('contact-us'),
        occasion: new APIModule('event'),
    };

    return {
        provide: {
            api:modules
        },
    };

})