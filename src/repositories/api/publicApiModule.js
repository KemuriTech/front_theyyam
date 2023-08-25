import apiModule from '~/repositories/apiModule';

class PublicAPIModule extends apiModule {
  constructor(resource) {
    const config = useRuntimeConfig();
    super(`${config.public.LANDING_PAGE_URL}/${config.public.KUROCO_API_PREFIX}/${config.public.KUROCO_API_VER}/${resource}`);
  }
}

export default PublicAPIModule;