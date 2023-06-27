import {
  KUROCO_API_VER,
  KUROCO_API_PREFIX,
  LANDING_PAGE_URL
} from '../constants';
class APIModule {

  constructor(resource) {
    this.resource = `${LANDING_PAGE_URL}/${KUROCO_API_PREFIX}/${KUROCO_API_VER}/${resource}`;
  }

  get(param) {
    const serialize = (obj) => {
      var str = [];
      for (var p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
      return str.join('&');
    }


    return fetch(`${this.resource}?${serialize(param)}`, {
      method: 'GET',
    });
  }

  show(id, param) {
    const serialize = (obj) => {
      var str = [];
      for (var p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
      return str.join('&');
    }


    return fetch(`${this.resource}/${id}?${serialize(param)}`, {
      method: 'GET',
    });
  }

  post(payload, endpointConfig = {}) {
    endpointConfig.headers = {
      ...endpointConfig?.headers,
      'Content-Type': 'application/json'
    }
    return fetch(this.resource, {
      method: 'POST',
      body : JSON.stringify(payload),
      ...endpointConfig
    })
  }
}

export default APIModule;