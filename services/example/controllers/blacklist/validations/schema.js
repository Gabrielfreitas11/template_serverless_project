const Joi = require('@hapi/joi');

exports.schema = Joi.object({
  cpf: Joi.string(),
  errorExcess: Joi.boolean(),
  ip: Joi.string().required(),
});
