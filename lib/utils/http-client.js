const axios = require('axios');

module.exports = options =>
  new Promise((resolve, reject) => {
    axios(options)
      .then(response => resolve(response.data))
      .catch(error => {
        const errorMessage = {
          config: error.config,
        };

        if (error.response) {
          errorMessage.status = error.response.status;
          errorMessage.result = error.response.data;
        } else if (error.request) errorMessage.result = error.request;
        else errorMessage.result = error.message;

        reject(errorMessage);
      });
  });
