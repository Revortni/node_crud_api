const Joi = require('@hapi/joi');

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

const validate = (params, schema) => {
	return new Promise(async (resolve, reject) => {
		try {
			const value = await schema.validateAsync(params);
			return resolve(value);
		} catch (err) {
			return reject(err);
		}
	});
};

const register = params => {
	return validate(params, registerSchema);
};

module.exports = {
	register
};
