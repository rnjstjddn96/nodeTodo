const express = require('express');
const router = express.Router();
const service = require('./todoGroup.service.js');

router.get('/list', service.getAllTodoGroups);
router.post('/', service.createGroup);

module.exports = router;