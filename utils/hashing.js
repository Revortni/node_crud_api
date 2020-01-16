const bcrypt = require('bcryptjs');
const config = require('./../configs');

const encrypt = payload => {
	return bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(payload, salt, function(err, hash) {
			return hash;
		});
	});
};

const match = (payload, hash) => {
	return bcrypt.compare(payload, hash).then(res => {
		return res;
	});
};
