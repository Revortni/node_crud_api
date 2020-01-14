const express = require('express');
const membersRouter = express.Router();
const controller = require('../controller/members.controller');

//GET
membersRouter.get('/all', controller.getMemberList);

//fetch, update, delete members
membersRouter
	.route('/:id')
	.get(controller.getMember)
	.put(controller.updateMember)
	.delete(controller.deleteMember);

//POST
membersRouter.post('/add', controller.addMember);

module.exports = membersRouter;
