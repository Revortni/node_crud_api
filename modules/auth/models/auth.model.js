const Joi = require('joi');

const loginSchema = Joi.object()
	.keys({
		email: Joi.string()
			.email({ minDomainAtoms: 2 })
			.required(),
		password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
	})
	.with('email', 'password');

const validate = (params, schema) => {
	return new Promise((resolve, reject) => {
		Joi.validate(params, schema, (err, value) => {
			if (err) return reject(err.details);
			return resolve(value);
		});
	});
};

const login = params => {
	return validate(params, loginSchema);
};

module.exports = {
	login
};
