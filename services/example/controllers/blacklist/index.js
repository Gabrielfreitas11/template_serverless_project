const { isValidParams } = require('./validations/validator');
const HttpResponse = require('../../../../common/httpResponse');
const {
  findOneAndUpdate,
} = require('../../../../common/database/functions/insert');

module.exports = async ({ body }) => {
  try {
    const params = isValidParams(JSON.parse(body));

    if (typeof params === 'string') {
      return HttpResponse.badRequest({
        status_code: 400,
        message: params,
      });
    }

    const data = await findOneAndUpdate(params);

    return HttpResponse.ok({ status_code: 200, response: data });
  } catch (error) {
    console.log(error);
    return HttpResponse.serverError({
      status_code: 500,
      message: 'Erro ao executar a função blacklist',
    });
  }
};
