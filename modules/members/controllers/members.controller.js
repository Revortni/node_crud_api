const express = require('express');
const membersRouter = express.Router();

//import query
const query = require('../query/members.query');
query.connect();

const getMember = (req, res, next) => {
	const { id } = req.params;
	if (isNaN(id)) {
		next({ msg: `Invalid value for id : ${id} , id must be a number` });
		return;
	}

	query
		.fetchRecord(id)
		.then(data => {
			if (data.length <= 0) throw `No member with id ${id} was found.`;
			res.status(200).json({ data });
			res.end();
		})
		.catch(err => {
			next({ err });
		});
};

const addMember = (req, res, next) => {
	const data = req.body;

	query
		.insertRecord(msg)
		.then(data => {
			res.status(200).json({ msg });
			res.end();
		})
		.catch(err => {
			next({ err });
		});
};

const updateMember = (req, res, next) => {
	const { id } = req.params;
	const data = req.body;

	query
		.updateRecord({ id, data })
		.then(msg => {
			res.status(200).json({ msg });
			res.end();
		})
		.catch(err => {
			next({ err });
		});
};

const deleteMember = (req, res, next) => {
	const { id } = req.params || null;
	query
		.deleteRecord(id)
		.then(msg => {
			res.status(200).json({ msg });
			res.end();
		})
		.catch(err => {
			next({ err });
		});
};

const getMemberList = (req, res, next) => {
	query
		.fetchAll()
		.then(data => {
			res.status(200).json({ data });
			res.end();
		})
		.catch(err => {
			next({ err });
		});
};

//insert data from file
const insertFromFile = () => {
	//static data
	const DATA = require('./data.json');

	DATA.forEach(x => {
		const keys = Object.keys(x);
		const values = Object.values(x);
		insertRecord(keys, values);
	});
};

module.exports = {
	getMember,
	addMember,
	updateMember,
	deleteMember,
	getMemberList,
	insertFromFile
};
