import CommonUtilModule from "~/repositories/commonUtilModule";

interface CommonUtilInterface {
    commonUtl: CommonUtilModule
}

export default defineNuxtPlugin((nuxtApp) => {
    const modules: CommonUtilInterface = {
        commonUtl: new CommonUtilModule(),
    };

    return {
        provide: {
            ...modules
        },
    };

})