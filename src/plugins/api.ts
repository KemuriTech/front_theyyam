import PublicAPIModule from "~/repositories/api/publicApiModule";
import AuthAPIModule from "~/repositories/api/authApiModule";

interface APIInstance {
    contact: PublicAPIModule,
    occasion: PublicAPIModule,
    occasions: PublicAPIModule,
    pastEvents: PublicAPIModule,
    upcomingEvents: PublicAPIModule,
    allEvents: PublicAPIModule,
    auth: PublicAPIModule,
    logout: PublicAPIModule,
    authOccasion: AuthAPIModule,
    token: AuthAPIModule,
}

export default defineNuxtPlugin((nuxtApp) => {
    const modules: APIInstance = {
        contact: new PublicAPIModule('contact-us'),
        occasion: new PublicAPIModule('event'),
        occasions: new PublicAPIModule('events'),
        pastEvents: new PublicAPIModule('past-events'),
        upcomingEvents: new PublicAPIModule('latest-event'),
        allEvents: new PublicAPIModule('all-events'),
        auth: new PublicAPIModule('profile'),
        logout: new PublicAPIModule('logout'),
        authOccasion: new AuthAPIModule('event'),
        token: new AuthAPIModule('token'),
    };

    return {
        provide: {
            api:modules
        },
    };

})
