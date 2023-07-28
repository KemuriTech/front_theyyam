class APIModule {

  constructor(resource) {
    this.resource = resource;
    this.headers = {};
  }

  get(param) {
    this._setupHeader();
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
      headers: this.headers
    });
  }

  show(id, param) {
    this._setupHeader();
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
      headers: this.headers
    });
  }

  post(payload, endpointConfig = {}) {
    this._setupHeader();
    endpointConfig.headers = {
      ...this.headers,
      ...endpointConfig?.headers,
      'Content-Type': 'application/json'
    }
    return fetch(this.resource, {
      method: 'POST',
      body : JSON.stringify(payload),
      ...endpointConfig
    })
  }

  _setupHeader() {
    const {
      status,
      token,
    } = useAuth();

    if (status.value === 'authenticated') {
      this.headers = {
        'X-RCMS-API-ACCESS-TOKEN': token.value
      }
    }
  }
}

export default APIModule;