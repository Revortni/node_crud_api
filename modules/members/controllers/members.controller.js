const express = require('express');
const membersRouter = express.Router();

//import query
const query = require('../query/members.query');
query
	.connect()
	.then(done => {
		console.log(done);
	})
	.catch(err => {
		console.log(err);
	});

const getMember = (req, res, next) => {
	const { id } = req.params;
	if (isNaN(id)) {
		next({ msg: `Invalid value for id : ${id} , id must be a number` });
		return;
	}

	query
		.fetchRecord({ id })
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
		.fetchRecord({})
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
	const DATA = require('../models/data.json');

	DATA.forEach(x => {
		query
			.insertRecord(x)
			.then(data => {
				console.log(data);
			})
			.catch(err => {
				next({ err });
			});
	});

	res.status(200).json({ data: DATA });
	res.end();
};

const searchMember = (req, res, next) => {
	let param;

	//search ={key:<key>,value:<value}
	switch (req.method) {
		case 'GET':
			param = req.params.search;
			break;
		case 'POST':
			param = req.body.search;
			break;
		default:
			next({ err });
	}

	query
		.fetchRecord(param)
		.then(data => {
			res.status(200).json({ data });
			res.end();
		})
		.catch(err => {
			next({ err });
		});
};

module.exports = {
	getMember,
	addMember,
	updateMember,
	deleteMember,
	searchMember,
	getMemberList,
	insertFromFile
};
