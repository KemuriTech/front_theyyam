import DateFormatModule from "~/repositories/dateFormatModule";

interface DateFormatInstance {
    formatter: DateFormatModule
}

export default defineNuxtPlugin((nuxtApp) => {
    const modules: DateFormatInstance = {
        formatter: new DateFormatModule(),
    };

    return {
        provide: {
            ...modules
        },
    };

})