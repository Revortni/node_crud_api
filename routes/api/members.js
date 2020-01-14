const express = require('express');
const membersRouter = express.Router();
const members = require('./members');

//import db
const db = require('./db');
db.connect();

const getMember = (req, res, next) => {
	const { id } = req.params;
	if (isNaN(id)) {
		next(`Invalid value for id : ${id} , id must be a number`);
		return;
	}

	db.fetchRecord(id)
		.then(data => {
			if (data.length <= 0) throw `No member with id ${id} was found.`;
			res.json({ data });
			res.end();
		})
		.catch(err => {
			next(err);
		});
};

const addMember = (req, res, next) => {
	const data = req.body;

	db.insertRecord(data)
		.then(data => {
			res.json({ msg: data });
			res.end();
		})
		.catch(err => {
			next(err);
		});
};

const updateMember = (req, res, next) => {
	const { id } = req.params;
	const data = req.body;

	db.updateRecord({ id, data })
		.then(data => {
			res.json({ msg: data });
			res.end();
		})
		.catch(err => {
			next(err);
		});
};

const deleteMember = (req, res, next) => {
	const { id } = req.params || null;
	db.deleteRecord(id)
		.then(data => {
			res.json({ msg: data });
			res.end();
		})
		.catch(err => {
			next(err);
		});
};

const getMemberList = (req, res, next) => {
	db.fetchAll()
		.then(data => {
			res.json({ data });
			res.end();
		})
		.catch(err => {
			next(err);
		});
};

//GET
membersRouter.get('/all', getMemberList);

//fetch, update, delete members
membersRouter
	.route('/:id')
	.get(getMember)
	.put(updateMember)
	.delete(deleteMember);

//POST
membersRouter.post('/add', addMember);

module.exports = membersRouter;
