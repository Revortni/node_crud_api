const jwt = require('jsonwebtoken');
const config = require('../../../configs');
const hash = require('../../../utils/hashing');
const DATABASE = require('../../../utils/database');
const validate = require('../models/auth.model');
const db = new DATABASE({ database: 'api', table: 'users' });

db.connect({
	host: 'localhost',
	user: 'root',
	password: ''
})
	.then(done => {
		console.log(done);
	})
	.catch(err => {
		console.log(err);
	});

const generateToken = data => {
	let token = jwt.sign(data, config.secret);
	return token;
};

const login = (req, res, next) => {
	const { email, password } = req.body;

	validate
		.login({ email, password })
		.then(value => {
			return db.fetch({ email }).then(data => {
				if (data.length >= 0) {
					const sentPassword = req.body.password;
					const { password, ...rest } = data[0];
					if (hash.match(sentPassword, password)) {
						let token = generateToken(rest);
						res.status(200).json({
							email,
							token
						});
						res.end();
						return;
					} else {
						next({ msg: `Invalid password for ${email}` });
					}
				} else {
					throw { err: 'No matching record found.', status: '404' };
				}
			});
		})
		.catch(err => next(err));
};

module.exports = {
	login
};
