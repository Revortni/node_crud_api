const authenticate = require('./../middlewares/authenticate');
const authRoute = require('../modules/auth/routes/auth.route');
const registerRoute = require('../modules/register/routes/register.route');
const memberRoute = require('../modules/members/routes/members.route');
const todoRoute = require('../modules/todo/routes/todo.route');

const router = require('express').Router();

router.use('/login', authRoute);
router.use('/register', registerRoute);
router.use('/members', authenticate, memberRoute);
router.use('/todo',authenticate,todoRoute);
router.use('/',authenticate)

module.exports = router;
