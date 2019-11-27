/* eslint-disable prettier/prettier */
const fs = require('fs');

const FormData = require('form-data');
const qs = require('qs');

const config = require('./config');
const globalConfig = require('./../../../config');

const httpClient = require('../../../utils/http-client');
const authenticationHelper = require('./../../../helpers/authentication');


class Project {
  constructor(accountId) {
    this.account_id = accountId;
  }

  get(oauth2client, originCredentials, parameters = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      

        const queryStringParameters = {
          limit: parameters.limit || 10,
          offset: parameters.offset || 0,
          sort: parameters.sort,
          field: parameters.field,
        };

        const queryString = qs.stringify(queryStringParameters);
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.hq.base}${config.base_urls.hq.v1}/accounts/${this.account_id}/projects?${queryString}`,
          method: 'GET',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
          },
        };

        const response = await httpClient(options);
        const result = { data: response }
        if (wasUpdated) result.credentials = credentials;
        if (response.length === queryStringParameters.limit) {
          result.nextParameters = {
            limit: queryStringParameters.limit,
            offset:
              queryStringParameters.offset + queryStringParameters.limit,
            sort: queryStringParameters.sort,
            field: queryStringParameters.field,
          };
        }
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  getAll(oauth2client, originCredentials, parameters = {}, originWasUpdated = false) {
    return new Promise(async (resolve, reject) => {
      try {
        let credentials = originCredentials;
        let wasUpdated = originWasUpdated
        const queryStringParameters = {
          limit: 100,
          offset: parameters.offset || 0,
          sort: parameters.sort,
          field: parameters.field,
        };
  
        const response = await this.get(oauth2client, credentials, queryStringParameters);
        if (response.credentials) {
          // eslint-disable-next-line prefer-destructuring
          credentials = response.credentials;
          wasUpdated = true;
        }
  
        let result;
        if (response.data.length !== 100) {
          result = { data: response.data };
          if (wasUpdated) result.credentials = credentials;
          return resolve(result);
        }
  
        const responseRecursive = await this.getAll(oauth2client, credentials, response.nextParameters, wasUpdated);
        result = {
          data: response.data.concat(responseRecursive.data),
        }

        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        return reject(error)
      }
    });
  }

  getById(oauth2client, originCredentials, projectId) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.hq.base}${config.base_urls.hq.v1}/accounts/${this.account_id}/projects/${projectId}`,
          method: 'GET',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
          },
        };

        const response = await httpClient(options)
        const result = { data: response }
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  add(oauth2client, originCredentials, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.hq.base}${config.base_urls.hq.v1}/accounts/${this.account_id}/projects`,
          method: 'POST',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
            'Content-Type': 'application/json',
          },
          data,
        };
        
        const response = await httpClient(options)
        const result = { data: response }
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  update(oauth2client, originCredentials, projectId, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.hq.base}${config.base_urls.hq.v1}/accounts/${this.account_id}/projects/${projectId}`,
          method: 'PATCH',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
            'Content-Type': 'application/json',
          },
          data,
        };
        
        const response = await httpClient(options);
        const result = { data: response }
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  createOrUpdateImage(oauth2client, originCredentials, projectId, pathImage) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const formData = new FormData();
        formData.append('chunk', fs.createReadStream(pathImage));
    
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.hq.base}${config.base_urls.hq.v1}/accounts/${this.account_id}/projects/${projectId}/image`,
          method: 'PATCH',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          },
          data: formData,
        };

        const response = await httpClient(options);
        const result = { data: response }
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = Project;
