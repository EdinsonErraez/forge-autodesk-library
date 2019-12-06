/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
const fs = require('fs');
const util = require('util');

const uuidv4 = require('uuid/v4')
const qs = require('qs');
const eachLimit = require('async/eachLimit');

const config = require('../config');
const globalConfig = require('../../../config');

const httpClient = require('../../../utils/http-client');
const authenticationHelper = require('../../../helpers/authentication');

const statFileAsync = util.promisify(fs.stat);

const baseUrl = config.base_urls;

class Objects {
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

  uploadFileChunks(oauth2client, originCredentials, bucketKey, id, sessionId, fileData, headers = {}) {
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

  uploadLargeFile(oauth2client, originCredentials, bucketKey, id, pathFile, onUploadProgress) {
    return new Promise(async (resolve, reject) => {
      let credentials = originCredentials;
      const { size } = await statFileAsync(pathFile);
      // Transfor megas to bytes. 5MB
      const chunkSize = 5 * 1024 * 1024;
      // Get number of parts
      const nbChunks = Math.ceil(size / chunkSize);
      // Create array with the number of part
      const chunksMap = Array.from({
        length: nbChunks,
      }, (e, i) => i);
      // generates uniques session ID
      const sessionId = uuidv4();
      // prepare the upload tasks
      const uploadTasks = chunksMap.map((chunkIdx) => {
        // Start of each part
        const start = chunkIdx * chunkSize;
        // End of each part
        const end = Math.min(size, (chunkIdx + 1) * chunkSize) - 1;
        // Range of each part
        const range = `bytes ${start}-${end}/${size}`;
        // Length of each part
        const length = end - start + 1;

        // Upload large file
        const run = async () => {
          const uploadFileChunksResponse = await this.uploadFileChunks(oauth2client, credentials, bucketKey, id, sessionId, { range, length, pathFile, start, end });
          return uploadFileChunksResponse;
        };

        return {
          chunkIndex: chunkIdx,
          run,
        };
      });

      let progress = 0;
      // Execute upload file each three file
      eachLimit(uploadTasks, 3, (task, callback) => {
        task.run().then((response) => {
          if (response.credentials) ({ credentials } = response);

          if (onUploadProgress) {
            progress += 100.0 / nbChunks
  
            onUploadProgress({
              progress: Math.round(progress * 100) / 100,
              chunkIndex: task.chunkIndex,
              sessionId,
            })
          }

          callback();
        }, (err) => {
          callback(err);
        });
      }, (err) => {
        if (err) reject(err);
        const result = {
          data: {
            fileSize: size,
            bucketKey,
            id,
            nbChunks,
            credentials,
          }
        }
        resolve(result);
      });
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

module.exports = Objects;