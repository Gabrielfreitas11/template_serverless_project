const axios = require('axios');
const logger = require('./logger');

const logAdapter = async ({
  statusCode = null, response = { data: '' }, options, log, error = null,
}) => {
  if (error) {
    await logger.fail({
      request: options,
      response: !error.response ? (error.response.data) : ({ statusCode: error.response.status, body: { message: error.message, data: error.stack } }), // eslint-disable-line
    }, log);
  } else {
    await logger.info({
      request: options,
      response: {
        statusCode,
        body: options.responseType === 'stream' ? '**STREAM**' : response.data instanceof Buffer ? { type: 'Buffer', data: '**ARRAYBUFFER**' } : response.data, // eslint-disable-line
      },
    }, log);
  };
};

module.exports.request = async function request(options, optionsHttpsAgent = null) {
  const log = logger.initLog({ request: options }, 'pending');

  const optionsAxios = optionsHttpsAgent && optionsHttpsAgent.httpsAgent
    ? optionsHttpsAgent : options;

  return axios(optionsAxios).then(
    async (response) => {
      const logPayload = log();

      await logAdapter({
        statusCode: response.status, response, options, log: logPayload,
      });
      return response;
    },
    async (error) => {
      const logPayload = log();

      await logAdapter({ error, options, log: logPayload });
      throw error;
    },
  );
};
