const joi = require('@hapi/joi');

exports.schema = joi.object({
  cep: joi.string().min(8).max(8).required(),
});
