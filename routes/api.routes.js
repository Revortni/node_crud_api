const authenticate = require('./../middlewares/authenticate');
const authRoute = require('./../controllers/auth.route');
const memberRoute = require('../modules/members/routes/members.route');

const router = require('express').Router();

router.use('/auth', authRoute);
router.use('/members', authenticate, memberRoute);

module.exports = router;
