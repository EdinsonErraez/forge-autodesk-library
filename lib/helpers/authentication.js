/* eslint-disable prettier/prettier */
const moment = require('moment');

module.exports = {
  verifyToken: (oauth2client, originCredentials) =>
    new Promise(async (resolve, reject) => {
      try {
        let wasUpdated = false;
        let credentials = originCredentials;

        if (oauth2client.autoRefresh) {
          if (moment().isAfter(credentials.expiration_date)) {
            let newCredentials;
            if (oauth2client.constructor.name === 'TwoLeggend') {
              newCredentials = await oauth2client.authenticate();
            } else if (oauth2client.constructor.name === 'ThreeLeggend') {
              newCredentials = await oauth2client.refreshToken(credentials.refresh_token);
            }

            const expirationDate = moment()
              .seconds(newCredentials.expires_in)
              .format();
            newCredentials.expiration_date = expirationDate;
            credentials = newCredentials;
            wasUpdated = true;
          }
        }

        resolve({ credentials, wasUpdated });
      } catch (error) {
        reject(error)
      }
    }),
};
