const bcrypt = require('bcryptjs');
const config = require('./../configs');

const password = 'blaze2hell';

bcrypt.genSalt(10, function(err, salt) {
	bcrypt.hash(password, salt, function(err, hash) {
		console.log(hash);
	});
});

bcrypt.compare(password, hash).then(res => {
	// res === true
});
