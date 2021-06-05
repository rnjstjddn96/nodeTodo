const express = require('express');
const router = express.Router();
const todo = require('./todo/index');
const todoGroup = require('./todoGroup/index')

router.use('/todo', todo);
router.use('/todoGroup', todoGroup)

module.exports = router;
