/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
const qs = require('qs');

const config = require('./../config');
const globalConfig = require('../../../config');

const httpClient = require('../../../utils/http-client');
const authenticationHelper = require('../../../helpers/authentication');

const baseUrl = config.base_urls;

class Item {
  getById(oauth2client, originCredentials, projectId, id, parameters = {}, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const queryString = qs.stringify(parameters);
        const options = {
          url: `${globalConfig.base_url}${baseUrl.data.base}${baseUrl.data.v1}/projects/${projectId}/items/${id}?${queryString}`,
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

  getParentById(oauth2client, originCredentials, projectId, id, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const options = {
          url: `${globalConfig.base_url}${baseUrl.data.base}${baseUrl.data.v1}/projects/${projectId}/items/${id}/parent`,
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

  getRefsById(oauth2client, originCredentials, projectId, id, parameters = {}, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
        
        const queryString = qs.stringify(parameters);
        const options = {
          url: `${globalConfig.base_url}${baseUrl.data.base}${baseUrl.data.v1}/projects/${projectId}/items/${id}/refs?${queryString}`,
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

  getRelationshipsLinksById(oauth2client, originCredentials, projectId, id, parameters = {}, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const queryString = qs.stringify(parameters);
        const options = {
          url: `${globalConfig.base_url}${baseUrl.data.base}${baseUrl.data.v1}/projects/${projectId}/items/${id}/relationships/links?${queryString}`,
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

  getRelationshipsRefsById(oauth2client, originCredentials, projectId, id, parameters = {}, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const queryString = qs.stringify(parameters);
        const options = {
          url: `${globalConfig.base_url}${baseUrl.data.base}${baseUrl.data.v1}/projects/${projectId}/items/${id}/relationships/refs?${queryString}`,
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

  getTipById(oauth2client, originCredentials, projectId, id, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const options = {
          url: `${globalConfig.base_url}${baseUrl.data.base}${baseUrl.data.v1}/projects/${projectId}/items/${id}/tip`,
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

  getVersionsById(oauth2client, originCredentials, projectId, id, parameters = {}, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const queryString = qs.stringify(parameters);
        const options = {
          url: `${globalConfig.base_url}${baseUrl.data.base}${baseUrl.data.v1}/projects/${projectId}/items/${id}/versions?${queryString}`,
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

  create(oauth2client, originCredentials, projectId, data, parameters = {}, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const queryString = qs.stringify(parameters);

        const options = {
          url: `${globalConfig.base_url}${baseUrl.data.base}${baseUrl.data.v1}/projects/${projectId}/items?${queryString}`,
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

  addRelationshipsRefs(oauth2client, originCredentials, projectId, id, data, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${baseUrl.data.base}${baseUrl.data.v1}/projects/${projectId}/items/${id}/relationships/refs`,
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

  update(oauth2client, originCredentials, projectId, id, data, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${baseUrl.data.base}${baseUrl.data.v1}/projects/${projectId}/items/${id}`,
          method: 'PATCH',
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

module.exports = Item;
