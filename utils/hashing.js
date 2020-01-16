const bcrypt = require('bcryptjs');
const config = require('./../configs');

const encrypt = payload => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(payload, salt);
};

const match = (payload, hash) => {
	return bcrypt.compareSync(payload, hash);
};

module.exports = {
	encrypt,
	match
};
