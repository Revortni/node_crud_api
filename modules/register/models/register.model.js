const Joi = require('@hapi/joi');
const validator = require('../../../utils/validator');

const registerSchema = Joi.object({
  firstName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  lastName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/))
    .required()
}).with('email', 'password');

const validate = params => {
  return validator.validate(params, registerSchema);
};

module.exports = {
  validate
};
