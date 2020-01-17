const express = require('express');
const membersRouter = express.Router();
const controller = require('../controllers/members.controller');

//Root
membersRouter.route('/').get(controller.getMemberList);

//Add member
membersRouter.post('/add', controller.addMember);

//Search member
membersRouter
	.route('/search')
	.get(controller.searchMember)
	.post(controller.searchMember);

//fetch, update, delete members by id
membersRouter
	.route('/:id')
	.post((req, res, next) =>
		next({ status: 405, msg: 'Invalid post request' })
	)
	.get(controller.getMember)
	.put(controller.updateMember)
	.delete((req, res, next) => {
		if (req.user.role !== 2) {
			return next({
				msg: 'You dont have permission to perform delete action.'
			});
		}
		return controller.deleteMember(req, res, next);
	});

module.exports = membersRouter;
