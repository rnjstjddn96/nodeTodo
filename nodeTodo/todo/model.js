const conn = require('../dbConnection');
const Sequelize = require('sequelize');

class TodoModel extends Sequelize.Model {}

const TodoList = conn.define('todoList', {
    //property 정의
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    isDone: Sequelize.BOOLEAN,
}, {timestamps: true});
TodoList.sync().then( ret => {
    console.log('Sync Success :', ret);
    // conn.close();
}).catch(error => {
    console.error('Sync Failure :', error);
})

const TodoGroup = conn.define('todoGroup', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING
}, {timestamps: false});
TodoGroup.sync().then( ret => {
    console.log('Sync Success :', ret);
    // conn.close();
}).catch(error => {
    console.error('Sync Failure :', error);
})

exports.todolist = TodoList
exports.todoGroup = TodoGroup