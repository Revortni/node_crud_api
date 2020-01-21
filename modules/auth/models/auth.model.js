const Joi = require('@hapi/joi');
const validator = require('../../../utils/validator');

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9]{1,30}$/))
    .required()
}).with('email', 'password');

const validate = params => {
  return validator.validate(params, loginSchema);
};

module.exports = {
  validate
};
