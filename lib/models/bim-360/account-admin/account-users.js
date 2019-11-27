/* eslint-disable prettier/prettier */
const qs = require('qs');

const config = require('./config');
const globalConfig = require('./../../../config');

const httpClient = require('../../../utils/http-client');
const authenticationHelper = require('./../../../helpers/authentication');

class AccountUser {
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
          url: `${globalConfig.base_url}${config.base_urls.hq.base}${config.base_urls.hq.v1}/accounts/${this.account_id}/users?${queryString}`,
          method: 'GET',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
          },
        };
        const users = await httpClient(options);
        const result = { users }
        if (wasUpdated) result.credentials = credentials;
        if (users.length === queryStringParameters.limit) {
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
  
        const users = await this.get(oauth2client, credentials, queryStringParameters);
        if (users.credentials) {
          // eslint-disable-next-line prefer-destructuring
          credentials = users.credentials;
          wasUpdated = true;
        }
  
        let result;
        if (users.users.length !== 100) {
          result = { users: users.users };
          if (wasUpdated) result.credentials = credentials;
          return resolve(result);
        }
  
        const responseRecursive = await this.getAll(oauth2client, credentials, users.nextParameters, wasUpdated);
        result = {
          users: users.users.concat(responseRecursive.users),
        }

        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        return reject(error)
      }
    });
  }

  getById(oauth2client, originCredentials, userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.hq.base}${config.base_urls.hq.v1}/accounts/${this.account_id}/users/${userId}`,
          method: 'GET',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
          },
        };

        const user = await httpClient(options)
        const result = { user }
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
          url: `${globalConfig.base_url}${config.base_urls.hq.base}${config.base_urls.hq.v1}/accounts/${this.account_id}/users`,
          method: 'POST',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
            'Content-Type': 'application/json',
          },
          data,
        };
        const user = await httpClient(options)
        const result = { user }
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  bulk(oauth2client, originCredentials, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.hq.base}${config.base_urls.hq.v1}/accounts/${this.account_id}/users/import`,
          method: 'POST',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
            'Content-Type': 'application/json',
          },
          data,
        };

        const users = await httpClient(options)
        const result = { users }
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });    
  }

  search(oauth2client, originCredentials, parameters = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const queryStringParameters = {
          limit: parameters.limit || 10,
          offset: parameters.offset || 0,
          sort: parameters.sort,
          field: parameters.field,
          name: parameters.name,
          email: parameters.email,
          company_name: parameters.company_name,
          operator: parameters.operator,
          partial: parameters.partial,
        };
    
        const queryString = qs.stringify(queryStringParameters);
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.hq.base}${config.base_urls.hq.v1}/accounts/${this.account_id}/users/search?${queryString}`,
          method: 'GET',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
          },
        };
        
        const users = await httpClient(options);
        const result = { users }
        if (wasUpdated) result.credentials = credentials;
        if (users.length === queryStringParameters.limit) {
          result.nextParameters = {
            limit: queryStringParameters.limit,
            offset:
              queryStringParameters.offset + queryStringParameters.limit,
            sort: queryStringParameters.sort,
            field: queryStringParameters.field,
            name: queryStringParameters.name,
            email: queryStringParameters.email,
            company_name: queryStringParameters.company_name,
            operator: queryStringParameters.operator,
            partial: queryStringParameters.partial,
          };
        }
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  searchAll(oauth2client, originCredentials, parameters = {}, originWasUpdated) {
    return new Promise(async (resolve, reject) => {
      try {
        let credentials = originCredentials;
        let wasUpdated = originWasUpdated
        const queryStringParameters = {
          limit: 100,
          offset: parameters.offset || 0,
          sort: parameters.sort,
          field: parameters.field,
          name: parameters.name,
          email: parameters.email,
          company_name: parameters.company_name,
          operator: parameters.operator,
          partial: parameters.partial,
        };
  
        const users = await this.search(oauth2client, credentials, queryStringParameters);
        if (users.credentials) {
          // eslint-disable-next-line prefer-destructuring
          credentials = users.credentials;
          wasUpdated = true;
        }
  
        let result;
        if (users.users.length !== 100) {
          result = { users: users.users };
          if (wasUpdated) result.credentials = credentials;
          return resolve(result);
        }
  
        const responseRecursive = await this.getAll(oauth2client, credentials, users.nextParameters, wasUpdated);
        result = {
          users: users.users.concat(responseRecursive.users),
        }

        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        return reject(error)
      }
    });
  }

  update(oauth2client, originCredentials, userId, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.hq.base}${config.base_urls.hq.v1}/accounts/${this.account_id}/users/${userId}`,
          method: 'PATCH',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
            'Content-Type': 'application/json',
          },
          data,
        };
        const user = await httpClient(options);
        const result = { user }
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = AccountUser;
