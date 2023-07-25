import APIModule from "~/repositories/apiModule";

interface APIInstance {
    contact: APIModule,
    occasion: APIModule,
    occasions: APIModule,
    pastEvents: APIModule,
    upcomingEvents: APIModule,
    allEvents: APIModule,
    auth: APIModule,
    logout: APIModule,
}

export default defineNuxtPlugin((nuxtApp) => {
    const modules: APIInstance = {
        contact: new APIModule('contact-us'),
        occasion: new APIModule('event'),
        occasions: new APIModule('events'),
        pastEvents: new APIModule('past-events'),
        upcomingEvents: new APIModule('latest-event'),
        allEvents: new APIModule('all-events'),
        auth: new APIModule('login'),
        logout: new APIModule('logout'),
    };

    return {
        provide: {
            api:modules
        },
    };

})