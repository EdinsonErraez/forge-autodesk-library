const qs = require('qs');
const moment = require('moment');

const config = require('./config');
const globalConfig = require('./../../config');

const httpClient = require('./../../utils/http-client');

class ThreeLeggend {
  constructor(
    clientId,
    clientSecret,
    redirectUri,
    scopes,
    responseType,
    autoRefresh
  ) {
    this.client_id = clientId;
    this.client_secret = clientSecret;
    this.redirect_uri = redirectUri;
    this.scopes = scopes;
    this.response_type = responseType;
    this.autoRefresh = autoRefresh;
  }

  generateAuthUrl() {
    const scopes = this.scopes.join(' ');

    const data = {
      client_id: this.client_id,
      client_secret: this.client_secret,
      response_type: this.response_type,
      redirect_uri: this.redirect_uri,
      scope: scopes,
    };

    const dataStringify = qs.stringify(data);
    // eslint-disable-next-line prettier/prettier
    const authUrl = `${globalConfig.base_url}${config.base_urls.authentication}/authorize?${dataStringify}`;
    return authUrl;
  }

  getToken(authorizationCode) {
    const data = {
      client_id: this.client_id,
      client_secret: this.client_secret,
      grant_type: 'authorization_code',
      redirect_uri: this.redirect_uri,
      code: authorizationCode,
    };

    const options = {
      // eslint-disable-next-line prettier/prettier
      url: `${globalConfig.base_url}${config.base_urls.authentication}/gettoken`,
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

  refreshToken(refreshToken) {
    const data = {
      client_id: this.client_id,
      client_secret: this.client_secret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };

    const options = {
      // eslint-disable-next-line prettier/prettier
      url: `${globalConfig.base_url}${config.base_urls.authentication}/refreshtoken`,
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

module.exports = ThreeLeggend;
