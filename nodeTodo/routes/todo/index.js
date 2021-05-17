const express = require('express');
const router = express.Router();
const service = require('./todo.service');

router.get('/list', service.getAllTodos);
router.post('/', service.createTodo)

module.exports = router;

