const Joi = require('@hapi/joi');

exports.schema = Joi.object({
  ip: Joi.string().required(),
});
