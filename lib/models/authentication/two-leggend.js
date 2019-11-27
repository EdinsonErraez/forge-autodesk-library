const qs = require('qs');
const moment = require('moment');

const config = require('./config');
const globalConfig = require('./../../config');

const httpClient = require('./../../utils/http-client');

class TwoLeggend {
  constructor(clientId, clientSecret, scopes, autoRefresh) {
    this.client_id = clientId;
    this.client_secret = clientSecret;
    this.grant_type = 'client_credentials';
    this.scopes = scopes;
    this.autoRefresh = autoRefresh;
  }

  authenticate() {
    const scopes = this.scopes.join(' ');

    const data = {
      client_id: this.client_id,
      client_secret: this.client_secret,
      grant_type: this.grant_type,
      scope: scopes,
    };

    const options = {
      // eslint-disable-next-line prettier/prettier
      url: `${globalConfig.base_url}${config.base_urls.authentication}/authenticate`,
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
    };
    return new Promise((resolve, reject) => {
      httpClient(options)
        .then(credentials => {
          const expirationDate = moment()
            .seconds(credentials.expires_in)
            .format();
          credentials.expiration_date = expirationDate;
          resolve(credentials);
        })
        .catch(reject);
    });
  }
}

module.exports = TwoLeggend;
