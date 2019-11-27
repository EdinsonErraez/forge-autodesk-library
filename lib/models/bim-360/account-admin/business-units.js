/* eslint-disable prettier/prettier */
const config = require('./config');
const globalConfig = require('./../../../config');

const httpClient = require('../../../utils/http-client');
const authenticationHelper = require('./../../../helpers/authentication');

class BusinnessUnits {
  constructor(accountId) {
    this.account_id = accountId;
  }

  get(oauth2client, originCredentials) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.hq.base}${config.base_urls.hq.v1}/accounts/${this.account_id}/business_units_structure`,
          method: 'GET',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
          },
        };

        const businessUnits = await httpClient(options)
        const result = { business_units: businessUnits.business_units };
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  update(oauth2client, originCredentials, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.hq.base}${config.base_urls.hq.v1}/accounts/${this.account_id}/business_units_structure`,
          method: 'PUT',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
            'Content-Type': 'application/json',
          },
          data: {
            business_units: data,
          },
        };

        const businessUnits = await httpClient(options)
        const result = { business_units: businessUnits.business_units };
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = BusinnessUnits;
