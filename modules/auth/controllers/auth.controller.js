const jwt = require('jsonwebtoken');
const config = require('../../../configs');
const hash = require('../../../utils/hashing');
const DATABASE = require('../../../utils/database');
const validator = require('../models/auth.model');
const db = new DATABASE({ database: 'app', table: 'app_users' });

const connectToDatabase = (req, res, next) => {
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
      next({ err });
    });
};

const generateToken = data => {
  let token = jwt.sign(data, config.secret);
  return token;
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  validator
    .validate({ email, password })
    .then(value => {
      db.fetch({ email })
        .then(data => {
          if (data.length > 0) {
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
            next({ err: 'No matching record found.', status: 404 });
          }
        })
        .catch(err => next({ err }));
    })
    .catch(err => next({ err }));
};

module.exports = {
  login,
  connectToDatabase
};
