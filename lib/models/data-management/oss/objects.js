/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
const fs = require('fs');

const qs = require('qs');

const config = require('../config');
const globalConfig = require('../../../config');

const httpClient = require('../../../utils/http-client');
const authenticationHelper = require('../../../helpers/authentication');

const baseUrl = config.base_urls;

class Object {
  uploadSmallFile(oauth2client, originCredentials, bucketKey, id, pathFile, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${baseUrl.oss.base}${baseUrl.oss.v2}/buckets/${bucketKey}/objects/${id}`,
          method: 'PUT',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
          },
          data: fs.createReadStream(pathFile),
          maxContentLength: 100 * 1024 * 1024,
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

  uploadLargeFileChunks(oauth2client, originCredentials, bucketKey, id, sessionId, fileData, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const { range, length, pathFile, start, end } = fileData;
        const options = {
          url: `${globalConfig.base_url}${baseUrl.oss.base}${baseUrl.oss.v2}/buckets/${bucketKey}/objects/${id}/resumable`,
          method: 'PUT',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
            'Content-Range': range,
            'Session-Id': sessionId,
            'Content-Length': length,
          },
          data: fs.createReadStream(pathFile, { start, end }),
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

  getResumableUploadStatus(oauth2client, originCredentials, bucketKey, id, sessionId) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const options = {
          url: `${globalConfig.base_url}${baseUrl.oss.base}${baseUrl.oss.v2}/buckets/${bucketKey}/objects/${id}/status/${sessionId}`,
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

  get(oauth2client, originCredentials, bucketKey, parameters = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const queryString = qs.stringify(parameters);
        const options = {
          url: `${globalConfig.base_url}${baseUrl.oss.base}${baseUrl.oss.v2}/buckets/${bucketKey}/objects?${queryString}`,
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

  getDetailById(oauth2client, originCredentials, bucketKey, id, parameters = {}, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const queryString = qs.stringify(parameters);
        const options = {
          url: `${globalConfig.base_url}${baseUrl.oss.base}${baseUrl.oss.v2}/buckets/${bucketKey}/objects/${id}/details?${queryString}`,
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

  downloadById(oauth2client, originCredentials, bucketKey, id, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const options = {
          url: `${globalConfig.base_url}${baseUrl.oss.base}${baseUrl.oss.v2}/buckets/${bucketKey}/objects/${id}`,
          method: 'GET',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
          },
        };        
        options.headers = Object.assign(options.headers, headers);        

        const response = await httpClient(options)
        return resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  createSigned(oauth2client, originCredentials, bucketKey, id, data, parameters = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const queryString = qs.stringify(parameters);
        const options = {
          url: `${globalConfig.base_url}${baseUrl.oss.base}${baseUrl.oss.v2}/buckets/${bucketKey}/objects/${id}/signed?${queryString}`,
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

  copy(oauth2client, originCredentials, bucketKey, id, newObjectName) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${baseUrl.oss.base}${baseUrl.oss.v2}/buckets/${bucketKey}/objects/${id}/copyto/${newObjectName}`,
          method: 'PUT',
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

  delete(oauth2client, originCredentials, bucketKey, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
    
        const options = {
          url: `${globalConfig.base_url}${baseUrl.oss.base}${baseUrl.oss.v2}/buckets/${bucketKey}/objects/${id}`,
          method: 'DELETE',
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
}

module.exports = Object;