const jwt = require('jsonwebtoken');
const config = require('./../configs');

module.exports = function(req, res, next) {
	let token;

	if (req.headers['x-acces-token']) {
		token = req.headers['x-access-token'];
	}
	if (req.headers['authorization']) {
		token = req.headers['authorization'];
	}
	if (req.headers['token']) {
		token = req.headers['token'];
	}
	if (req.query['token']) {
		token = req.query['token'];
	}
	if (token) {
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				return next({ status: 401, msg: 'Invalid token.', err });
			}
			req.user = { ...req.user, role: 1 };
			return next();
		});
	} else {
		next({ status: 401, msg: 'Unauthorized. Token was not provided.' });
	}
};
