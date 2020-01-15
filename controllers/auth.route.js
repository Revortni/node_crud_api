const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('./../configs');

const generateToken = data => {
    let token = jwt.sign({ id: data.id }, config.secret);
    return token;
};

router.post('/login', (req, res, next) => {
    // application logic here
    // application level middleware
    // validation() joi express-validator
    // password encryption // bcrypt(not recommended for windows)
    // db_stuff()
    // result

    let token = generateToken({ id: 2, name: 'Rev' });
    res.json({
        user: req.body,
        token
    });
});

router.get('/register', (req, res, next) => {
    // application logic here
    // application level middleware
    console.log('req.body >>', req.body);

    //db stuff
    // insert

    res.json({
        msg: 'From register get',
        body: req.body
    });
});

router.post('/register', (req, res, next) => {
    // application logic here
    // application level middleware
    res.json({
        msg: 'From register post',
        body: req.body
    });
});

router.use('/', (req, res, next) => {
    next({ msg: 'Empty route' });
});

module.exports = router;
