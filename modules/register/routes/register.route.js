const express = require('express');
const router = express.Router();

const controller = require('../controllers/register.controller');

router.get('/', controller.getRegister);

router.post('/', controller.postRegister);

module.exports = router;
