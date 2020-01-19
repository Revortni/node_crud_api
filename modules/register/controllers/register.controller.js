const hash = require('../../../utils/hashing');
const DATABASE = require('../../../utils/database');
const validator = require('../models/register.model');
const db = new DATABASE({ database: 'app', table: 'app_users' });
const uniqueId = require('../../../utils/unique');
const config = require('../../../configs');

const connectToDatabase = (res, req, next) => {
	db.connect({
		host: 'localhost',
		user: 'root',
		password: ''
	})
		.then(done => {
			console.log(done);
			next();
		})
		.catch(err => {
			next({
				err: err.code,
				msg: 'Database error, could not connect.',
				status: 500
			});
		});
};

const getRegister = (req, res, next) => {
	console.log('req.body >>', req.body);
	res.json({
		msg: 'From register get',
		body: req.body
	});
};

const register = (value, callback) => {
	const id = uniqueId.getId();
	const { password } = value;
	const encrypted = hash.encrypt(password);
	value = {
		...value,
		password: encrypted,
		permissionLevel: config.defaultPermission
	};
	db.insert({ ...value, id }).then(callback);
};

const postRegister = (req, res, next) => {
	const { firstName, lastName, email, password } = req.body;
	validator
		.validate({ firstName, lastName, email, password })
		.then(value => {
			db.checkIfRecordExists({ email }).then(match => {
				if (match.length > 0) {
					res.json({
						status: 400,
						msg: `A user with ${email} already exists`
					});
					return;
				}
				register(value, () => {
					res.json({
						status: 401,
						msg: 'User created',
						info: {
							firstName,
							lastName,
							email
						}
					});
				});
			});
		})
		.catch(err => next({ err }));
};

module.exports = {
	getRegister,
	postRegister,
	connectToDatabase
};
