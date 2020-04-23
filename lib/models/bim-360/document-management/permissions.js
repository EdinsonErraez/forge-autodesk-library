/* eslint-disable prettier/prettier */
/* eslint-disable class-methods-use-this */

const config = require('./config');
const globalConfig = require('../../../config');

const httpClient = require('../../../utils/http-client');
const authenticationHelper = require('../../../helpers/authentication');

class Permissions {

  get(oauth2client, originCredentials, projectId, folderId, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);
    
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.bim360.base}${config.base_urls.bim360.v1}/projects/${projectId}/folders/${folderId}/permissions`,
          method: 'GET',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
          },
        };
        options.headers = Object.assign(options.headers, headers);  

        const response = await httpClient(options);
        const result = { data: response }
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  add(oauth2client, originCredentials, projectId, folderId, data, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);
    
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.bim360.base}${config.base_urls.bim360.v1}/projects/${projectId}/folders/${folderId}/permissions:batch-create`,
          method: 'POST',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
          },
          data,
        };
        options.headers = Object.assign(options.headers, headers);  

        const response = await httpClient(options);
        const result = { data: response }
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  update(oauth2client, originCredentials, projectId, folderId, data, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);
    
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.bim360.base}${config.base_urls.bim360.v1}/projects/${projectId}/folders/${folderId}/permissions:batch-update`,
          method: 'POST',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
          },
          data,
        };
        options.headers = Object.assign(options.headers, headers);  

        const response = await httpClient(options);
        const result = { data: response }
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  delete(oauth2client, originCredentials, projectId, folderId, data, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);
    
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.bim360.base}${config.base_urls.bim360.v1}/projects/${projectId}/folders/${folderId}/permissions:batch-delete`,
          method: 'POST',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
          },
          data,
        };
        options.headers = Object.assign(options.headers, headers);  

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

module.exports = Permissions;
