import {
  KUROCO_API_VER_AUTH,
  KUROCO_API_PREFIX,
  LANDING_PAGE_URL
} from '~/constants';
import apiModule from '~/repositories/apiModule';

class AuthApiModule extends apiModule {
  constructor(resource) {
    super(`${LANDING_PAGE_URL}/${KUROCO_API_PREFIX}/${KUROCO_API_VER_AUTH}/${resource}`);
  }

}

export default AuthApiModule;