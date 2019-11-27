const httpClient = require('./../../utils/http-client');

const config = require('./config');
const globalConfig = require('./../../config');

class Informational {
  constructor(token) {
    this.token = token;
  }

  me() {
    const options = {
      // eslint-disable-next-line prettier/prettier
      url: `${globalConfig.base_url}${config.base_urls.information}/v1/users/@me`,
      method: 'GET',
      headers: { Authorization: `Bearer ${this.token}` },
    };
    return httpClient(options);
  }
}

module.exports = Informational;
