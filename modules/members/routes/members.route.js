const express = require('express');
const membersRouter = express.Router();
const controller = require('../controllers/members.controller');

//GET
membersRouter.get('/all', controller.getMemberList);

//fetch, update, delete members
membersRouter
	.route('/:id')
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

//POST
membersRouter.post('/add', controller.addMember);

module.exports = membersRouter;
