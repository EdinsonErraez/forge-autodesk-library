/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
const config = require('./config');
const globalConfig = require('../../config');

const httpClient = require('../../utils/http-client');
const authenticationHelper = require('../../helpers/authentication');

const baseUrl = config.base_urls;

class Command {
  call(oauth2client, originCredentials, projectId, data, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${baseUrl.data.base}${baseUrl.data.v1}/projects/${projectId}/commands`,
          method: 'POST',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
            'Content-Type': 'application/vnd.api+json',
          },
          data,
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

module.exports = Command;