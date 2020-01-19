const express = require('express');
const router = express.Router();
const controller = require('../controllers/members.controller');

//connect to the database
router.use(controller.connectToDatabase);

//Root
router.route('/').get(controller.getMemberList);

//Add member
router.post('/add', controller.addMember);

//Search member
router
  .route('/search')
  .get(controller.searchMember)
  .post(controller.searchMember);

//fetch, update, delete members by id
router
  .route('/:id')
  .post((req, res, next) => next({ status: 405, msg: 'Invalid post request' }))
  .get(controller.getMember)
  .patch(controller.updateMember)
  .delete((req, res, next) => {
    if (req.user.role !== 2) {
      return next({
        msg: 'You dont have permission to perform delete action.'
      });
    }
    return controller.deleteMember(req, res, next);
  });

module.exports = router;
