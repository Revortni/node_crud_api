const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth.controller');

router.post('/login', controller.login);

router.get('/register', controller.getRegister);

router.post('/register', controller.postRegister);

router.use('/', (req, res, next) => {
    next({ msg: 'Empty route' });
});

module.exports = router;
