const { isValidParams } = require('./validations/validator');
const HttpResponse = require('../../../../common/httpResponse');
const { requestAPI } = require('../../client/cepAdapter');

module.exports = async ({ queryStringParameters }) => {
  try {
    const params = isValidParams(queryStringParameters);

    if (typeof params === 'string') {
      return HttpResponse.badRequest({
        status_code: 400,
        message: params,
      });
    }

    const { code, message, ...address } = await requestAPI(params);

    return HttpResponse.ok({ status_code: 200, response: address.result });
  } catch (error) {
    console.log(error);
    return HttpResponse.serverError({
      status_code: 500,
      message: 'Erro ao executar a função cepAdapter',
    });
  }
};
