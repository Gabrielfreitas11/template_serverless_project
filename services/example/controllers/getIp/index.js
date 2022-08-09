const { isValidParams } = require('./validations/validator');
const HttpResponse = require('../../../../common/httpResponse');
const { findOne } = require('../../../../common/database/functions/find');

module.exports = async ({ queryStringParameters }) => {
  try {
    const params = isValidParams(queryStringParameters);

    if (typeof params === 'string') {
      return HttpResponse.badRequest({
        status_code: 400,
        message: params,
      });
    }

    const data = await findOne(params);

    return HttpResponse.ok({ status_code: 200, response: data });
  } catch (error) {
    console.log(error);
    return HttpResponse.serverError({
      status_code: 500,
      message: 'Erro ao executar a função getIp',
    });
  }
};
