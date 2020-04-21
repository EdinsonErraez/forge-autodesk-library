/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
const config = require('./config');
const globalConfig = require('../../config');

const httpClient = require('../../utils/http-client');
const authenticationHelper = require('../../helpers/authentication');

const baseUrl = config.base_urls;

class ModelDerivative {
  job(oauth2client, originCredentials, data, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${baseUrl.modelderivative.base}${baseUrl.modelderivative.v2}/designdata/job`,
          method: 'POST',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
            'Content-Type': 'application/json',
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

  manifest(oauth2client, originCredentials, derivativeId, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const options = {
          url: `${globalConfig.base_url}${baseUrl.modelderivative.base}${baseUrl.modelderivative.v2}/designdata/${derivativeId}/manifest`,
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

  downloadsDerivative(oauth2client, originCredentials, derivativeId,  derivativeUrn, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const options = {
          url: `${globalConfig.base_url}${baseUrl.modelderivative.base}${baseUrl.modelderivative.v2}/designdata/${derivativeId}/manifest/${derivativeUrn}`,
          method: 'GET',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
          },
        };
        options.headers = Object.assign(options.headers, headers);        

        const response = await httpClient(options)
        return response;
      } catch (error) {
        reject(error);
      }
    });
  }

  metadata(oauth2client, originCredentials, derivativeId, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const options = {
          url: `${globalConfig.base_url}${baseUrl.modelderivative.base}${baseUrl.modelderivative.v2}/designdata/${derivativeId}/metadata`,
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

  objectTree(oauth2client, originCredentials, derivativeId, guid, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const options = {
          url: `${globalConfig.base_url}${baseUrl.modelderivative.base}${baseUrl.modelderivative.v2}/designdata/${derivativeId}/metadata/${guid}`,
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

  objectProperties (oauth2client, originCredentials, derivativeId, guid, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const options = {
          url: `${globalConfig.base_url}${baseUrl.modelderivative.base}${baseUrl.modelderivative.v2}/designdata/${derivativeId}/metadata/${guid}/properties`,
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

module.exports = ModelDerivative;