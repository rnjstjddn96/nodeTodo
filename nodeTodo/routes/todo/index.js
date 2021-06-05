const express = require('express');
const router = express.Router();
const service = require('./todo.service');

router.get('/list', service.getAllTodos);
router.get('/list/done', service.getAllDoneTodos);
router.get('/list/:id', service.getTodosByGroup)
router.post('/check', service.checkIsDone);
router.post('/', service.createTodo);

module.exports = router;

