/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */

const httpClient = require('../utils/http-client');
const authenticationHelper = require('./../helpers/authentication');

class Generic {
  call(oauth2client, originCredentials, addedOptions = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        let options = {
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
          },
        };

        let addHeaders = {};
        if (addedOptions.headers) {
          addHeaders = addedOptions.headers;
          delete addedOptions.headers;
        }
        options = Object.assign(options, addedOptions);
        options.headers = Object.assign(options.headers, addHeaders);        

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

module.exports = Generic;
