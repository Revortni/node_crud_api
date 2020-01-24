//import query
const query = require('../query/todo.query');

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

const addTodo = (req, res, next) => {
  const data = req.body;
  query
    .insertRecord({...data, user_id:req.user_id})
    .then(data => {
      res.status(200).json({ data });
      res.end();
    })
    .catch(err => {
      next({ err });
    });
};


const updateTodo = (req, res, next) => {
  const { id } = req.params || null;
  const data = req.body;
  query
    .updateRecord({ id:`"${id}"`, data })
    .then(data => {
      res.status(200).json({ data });
      res.end();
    })
    .catch(err => {
      console.log(err)
      next({ err });
    });
};

const updateCheckedStatus = (req, res, next) => {
  const { id } = req.params || null;
  const {completed} = req.body;
  query
    .updateRecord({ id:`"${id}"`, data:{completed} })
    .then(data => {
      res.status(200).json({ data });
      res.end();
    })
    .catch(err => {
      console.log(err)
      next({ err });
    });
};

const deleteTodo = (req, res, next) => {
  const { id } = req.params || null;
  query
    .deleteRecord(`"${id}"`)
    .then(msg => {
      res.status(200).json({ msg });
      res.end();
    })
    .catch(err => {
      console.log(err)
      next({ err });
    });
};

const getAllTodos = (req, res, next) => {
  query
    .fetchRecord({
      fields:['id','text','completed'],
      criteria:{user_id:req.user_id},
      order:true
    })
    .then(data => {
      res.status(200).json({...data });
      res.end();
    })
    .catch(err => {
      next({ err });
    });
};

module.exports = {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  connectToDatabase,
  updateCheckedStatus
};
