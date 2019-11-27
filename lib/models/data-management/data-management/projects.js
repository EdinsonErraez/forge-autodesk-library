/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
const qs = require('qs');

const config = require('./../config');
const globalConfig = require('../../../config');

const httpClient = require('../../../utils/http-client');
const authenticationHelper = require('../../../helpers/authentication');

const baseUrl = config.base_urls;

class Project {
  get(oauth2client, originCredentials, hubId, parameters = {}, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const queryString = qs.stringify(parameters);
        const options = {
          url: `${globalConfig.base_url}${baseUrl.project.base}${baseUrl.project.v1}/hubs/${hubId}/projects?${queryString}`,
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

  getById(oauth2client, originCredentials, hubId, id, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const options = {
          url: `${globalConfig.base_url}${baseUrl.project.base}${baseUrl.project.v1}/hubs/${hubId}/projects/${id}`,
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

  getHubById(oauth2client, originCredentials, hubId, id, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const options = {
          url: `${globalConfig.base_url}${baseUrl.project.base}${baseUrl.project.v1}/hubs/${hubId}/projects/${id}/hub`,
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

  getTopFoldersById(oauth2client, originCredentials, hubId, id, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const options = {
          url: `${globalConfig.base_url}${baseUrl.project.base}${baseUrl.project.v1}/hubs/${hubId}/projects/${id}/topFolders`,
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

  downloadDetailsById(oauth2client, originCredentials, id, downloadId, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const options = {
          url: `${globalConfig.base_url}${baseUrl.data.base}${baseUrl.data.v1}/projects/${id}/downloads/${downloadId}`,
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

  getJobById(oauth2client, originCredentials, hubId, id, jobId, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const options = {
          url: `${globalConfig.base_url}${baseUrl.data.base}${baseUrl.data.v1}/hubs/${hubId}/projects/${id}/jobs/${jobId}`,
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

  addDownloadsById(oauth2client, originCredentials, id, data, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${baseUrl.data.base}${baseUrl.data.v1}/projects/${id}/downloads`,
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

  addStorageById(oauth2client, originCredentials, id, data, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${baseUrl.data.base}${baseUrl.data.v1}/projects/${id}/storage`,
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

module.exports = Project;
