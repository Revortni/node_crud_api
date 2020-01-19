const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth.controller');

//connect to the database
router.use(controller.connectToDatabase);

//handle login
router.route('/').post(controller.login);

module.exports = router;
