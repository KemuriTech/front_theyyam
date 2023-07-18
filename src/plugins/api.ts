import APIModule from "~/repositories/apiModule";

interface APIInstance {
    contact: APIModule,
    occasion: APIModule,
    occasions: APIModule,
    pastEvents: APIModule,
    allEvents: APIModule,
}

export default defineNuxtPlugin((nuxtApp) => {
    const modules: APIInstance = {
        contact: new APIModule('contact-us'),
        occasion: new APIModule('event'),
        occasions: new APIModule('events'),
        pastEvents: new APIModule('past-events'),
        allEvents: new APIModule('all-events'),
    };

    return {
        provide: {
            api:modules
        },
    };

})