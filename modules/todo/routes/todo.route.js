const express = require('express');
const router = express.Router();
const controller = require('../controllers/todo.controller');

//connect to the database
router.use(controller.connectToDatabase);

//fetch
router
	.route('/')
	.get(controller.getAllTodos)
	.post(controller.addTodo);

//, update, delete todo 
router
  .route('/:id')
  .patch(controller.updateCheckedStatus)
  .delete(controller.deleteTodo);

module.exports = router;
