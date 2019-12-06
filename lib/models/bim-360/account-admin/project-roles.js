/* eslint-disable prettier/prettier */
const config = require('./config');
const globalConfig = require('../../../config');

const httpClient = require('../../../utils/http-client');
const authenticationHelper = require('../../../helpers/authentication');

class ProjectRoles {
  constructor(accountId) {
    this.account_id = accountId;
  }

  getByProjectId(oauth2client, originCredentials, projectId) {
    return new Promise(async (resolve, reject) => {
      try {
        const { credentials, wasUpdated } = await authenticationHelper.verifyToken(oauth2client, originCredentials);      
      
        const options = {
          url: `${globalConfig.base_url}${config.base_urls.hq.base}${config.base_urls.hq.v1}/accounts/${this.account_id}/projects/${projectId}/industry_roles`,
          method: 'GET',
          headers: {
            Authorization: `${credentials.token_type} ${credentials.access_token}`,
          },
        };

        const response = await httpClient(options)
        const result = { data: response.business_units };
        if (wasUpdated) result.credentials = credentials;
        return resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = ProjectRoles;
