const Joi = require('@hapi/joi');

const loginSchema = Joi.object({
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
		.required(),
	password: Joi.string()
		.pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/))
		.required()
}).with('email', 'password');

const validate = (params, schema) => {
	return schema.validate(params, schema);
};

const login = params => {
	return validate(params, loginSchema);
};

module.exports = {
	login
};
