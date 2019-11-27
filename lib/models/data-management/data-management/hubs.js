/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
const qs = require('qs');

const config = require('./../config');
const globalConfig = require('./../../../config');

const httpClient = require('../../../utils/http-client');
const authenticationHelper = require('./../../../helpers/authentication');

const baseUrl = config.base_urls;

class Hub {
  get(oauth2client, originCredentials, parameters = {}, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const queryString = qs.stringify(parameters);
        const options = {
          url: `${globalConfig.base_url}${baseUrl.project.base}${baseUrl.project.v1}/hubs?${queryString}`,
          method: 'GET',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
          },
        };
        options.headers = Object.assign(options.headers, headers);

        const response = await httpClient(options)
        const result = { data: response }
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  getById(oauth2client, originCredentials, id, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const options = {
          url: `${globalConfig.base_url}${baseUrl.project.base}${baseUrl.project.v1}/hubs/${id}`,
          method: 'GET',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
          },
        };
        options.headers = Object.assign(options.headers, headers);

        const response = await httpClient(options)
        const result = { data: response }
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = Hub;
