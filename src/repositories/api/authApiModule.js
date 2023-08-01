import apiModule from '~/repositories/apiModule';

class AuthAPIModule extends apiModule {
  constructor(resource) {
    const config =useRuntimeConfig();
    super(`${config.LANDING_PAGE_URL}/${config.KUROCO_API_PREFIX}/${config.KUROCO_API_VER_AUTH}/${resource}`);
  }

}

export default AuthAPIModule;