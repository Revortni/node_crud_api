const jwt = require('jsonwebtoken');
const config = require('../../../configs');
const hash = require('../../../utils/hashing');
const base = require('../../../utils/database');
const validate = require('../models/auth.model');
const db = new base({ database: 'api', table: 'users' });

db.connect({
	host: 'localhost',
	user: 'root',
	password: ''
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
			});
		})
		.catch(err => next(err));
};

const getRegister = (req, res, next) => {
	// application logic here
	// application level middleware
	console.log('req.body >>', req.body);

	//db stuff
	// insert

	res.json({
		msg: 'From register get',
		body: req.body
	});
};

const postRegister = (req, res, next) => {
	// application logic here
	// application level middleware
	res.json({
		msg: 'From register post',
		body: req.body
	});
};

module.exports = {
	login,
	getRegister,
	postRegister
};
