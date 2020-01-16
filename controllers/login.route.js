const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('./../configs');

const generateToken = data => {
    let token = jwt.sign(data, config.secret, { expiresIn: '1h' });
    return token;
};

router.post('/login', (req, res, next) => {
    // application logic here
    // application level middleware
    // validation() joi express-validator
    // password encryption // bcrypt(not recommended for windows)
    // db_stuff()
    // result
    const user = req.body;
    let token = generateToken({ ...user, id: 1 });

    return res.json({
        user,
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
