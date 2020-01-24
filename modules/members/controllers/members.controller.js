//import query
const query = require('../query/members.query');

const connectToDatabase = (req, res, next) => {
  query
    .connect({
      host: 'localhost',
      user: 'root',
      password: ''
    })
    .then(done => {
      console.log(done);
      next();
    })
    .catch(err => {
      next({
        err: err.code,
        msg: 'Database error, could not connect.',
        status: 500
      });
    });
};

const getMember = (req, res, next) => {
  const { id } = req.params;
  if (isNaN(id)) {
    next({ msg: `Invalid value for id : ${id} , id must be a number` });
    return;
  }

  query
    .fetchRecord({ criteria:{id} })
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
    .insertRecord(data)
    .then(data => {
      res.status(200).json({ data });
      res.end();
    })
    .catch(err => {
      next({
        err: err.code,
        msg: 'Database error, could not connect.',
        status: 500
      });
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
const insertFromFile = (req, res, next) => {
  //static data
  const DATA = require('../models/data.json');

  DATA.forEach(x => {
    console.log(x);
    query
      .insertRecord(x)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err)
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
    .fetchRecord({criteria:param})
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
  insertFromFile,
  connectToDatabase
};
