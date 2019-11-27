/* eslint-disable prettier/prettier */
const config = require('./config');
const globalConfig = require('./../../../config');

const httpClient = require('../../../utils/http-client');
const authenticationHelper = require('./../../../helpers/authentication');

class ProjectUser {
  constructor(accountId) {
    this.account_id = accountId;
  }

  add(oauth2client, originCredentials, projectId, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.hq.base}${config.base_urls.hq.v1}/accounts/${this.account_id}/projects/${projectId}/users`,
          method: 'POST',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
            'Content-Type': 'application/json',
          },
          data,
        };

        const user = await httpClient(options)
        const result = { data: user }
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  bulk(oauth2client, originCredentials, projectId, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.hq.base}${config.base_urls.hq.v2}/accounts/${this.account_id}/projects/${projectId}/users/import`,
          method: 'POST',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
            'Content-Type': 'application/json',
          },
          data,
        };

        const users = await httpClient(options)
        const result = { data: users }
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  update(oauth2client, originCredentials, projectId, userId, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.hq.base}${config.base_urls.hq.v2}/accounts/${this.account_id}/projects/${projectId}/users/${userId}`,
          method: 'PATCH',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
            'Content-Type': 'application/json',
          },
          data,
        };

        const user = await httpClient(options);
        const result = { data: user }
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = ProjectUser;
