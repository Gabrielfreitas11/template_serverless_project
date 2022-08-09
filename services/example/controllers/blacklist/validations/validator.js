const { schema } = require('./schema');

exports.isValidParams = (params) => {
  if (!params) {
    return 'Faltando parâmetros obrigatórios';
  }

  const result = schema.validate(params);

  if (result.error) {
    return `O seguinte parâmetro está faltando ou incorreto: ${result.error.details[0].path[0]}`;
  }

  return result.value;
};
