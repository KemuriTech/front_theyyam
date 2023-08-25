import apiModule from '~/repositories/apiModule';

class AuthAPIModule extends apiModule {
  constructor(resource) {
    const config =useRuntimeConfig();
    super(`${config.public.LANDING_PAGE_URL}/${config.public.KUROCO_API_PREFIX}/${config.public.KUROCO_API_VER_AUTH}/${resource}`);
  }

}

export default AuthAPIModule;