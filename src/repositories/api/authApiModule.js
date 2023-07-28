import apiModule from '~/repositories/apiModule';

class AuthApiModule extends apiModule {
  constructor(resource) {
    const config =useRuntimeConfig();
    super(`${config.LANDING_PAGE_URL}/${config.KUROCO_API_PREFIX}/${config.KUROCO_API_VER_AUTH}/${resource}`);
  }

}

export default AuthApiModule;