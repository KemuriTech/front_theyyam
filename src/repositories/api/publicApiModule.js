import {
  KUROCO_API_VER,
  KUROCO_API_PREFIX,
  LANDING_PAGE_URL
} from '~/constants';
import apiModule from '~/repositories/apiModule';

class PublicAPIModule extends apiModule {
  constructor(resource) {
    super(`${LANDING_PAGE_URL}/${KUROCO_API_PREFIX}/${KUROCO_API_VER}/${resource}`);
  }
}

export default PublicAPIModule;