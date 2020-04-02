/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
const qs = require('qs');

const config = require('./config');
const globalConfig = require('./../../../config');

const httpClient = require('../../../utils/http-client');
const authenticationHelper = require('./../../../helpers/authentication');

class ProjectUser {
  constructor(accountId) {
    this.account_id = accountId;
  }

  getByProjectId(oauth2client, originCredentials, projectId, parameters = {}, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      

        const queryStringParameters = {
          limit: parameters.limit || 20,
          offset: parameters.offset || 10,
          sort: parameters.sort,
          fields: parameters.fields,
          'filter[name]': parameters['filter[name]'],
          'filter[email]': parameters['filter[email]'],
          'filter[accessLevels]': parameters['filter[accessLevels]'],
          'filter[companyId]': parameters['filter[companyId]'],
          'filter[autodeskId]': parameters['filter[autodeskId]'],
          'filter[roleId]': parameters['filter[roleId]'],
          'filter[memberGroupId]': parameters['filter[memberGroupId]'],
          'filter[serviceNames]': parameters['filter[serviceNames]'],
        };

        const queryString = qs.stringify(queryStringParameters);
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.bim360.base}${config.base_urls.bim360.v1}/projects/${projectId}/users?${queryString}`,
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

  getById(oauth2client, originCredentials, projectId, parameters = {}, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      

        const queryStringParameters = {
          fields: parameters.fields,
        };

        const queryString = qs.stringify(queryStringParameters);
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.bim360.base}${config.base_urls.bim360.v1}/projects/${projectId}/users/${id}?${queryString}`,
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

        const response = await httpClient(options)
        const result = { data: response }
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  bulk(oauth2client, originCredentials, projectId, data, headers = {}) {
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

module.exports = ProjectUser;
