import apiModule from '~/repositories/apiModule';

class PublicAPIModule extends apiModule {
  constructor(resource) {
    const config =useRuntimeConfig();
    super(`${config.LANDING_PAGE_URL}/${config.KUROCO_API_PREFIX}/${config.KUROCO_API_VER}/${resource}`);
  }
}

export default PublicAPIModule;