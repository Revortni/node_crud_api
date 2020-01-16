const authenticate = require('./../middlewares/authenticate');
const authRoute = require('../modules/auth/routes/auth.route');
const memberRoute = require('../modules/members/routes/members.route');

const router = require('express').Router();

router.use('/auth', authRoute);
router.use('/members', authenticate, memberRoute);

module.exports = router;
