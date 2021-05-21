const Sequelize = require('sequelize');
const conn = require('../../dbConnection');
const models = require('../../todo/model') 
const Op = Sequelize.Op;

const todolist = models.todolist; //todoList model
const todoGroup = models.todoGroup //todoGroup model

exports.getAllTodos = (req, res) => {
    todolist.findAll({})
    .then( results => {
        if (results == null) {
            res.send({
                message: 'emptyTodos'
            })
        }

        var resultArray = new Array();
        for(var todo of results) {
            console.log('title:', todo.title);
            const result = {
                title: todo.title,
                content: todo.content,
                isDone: todo.isDone
            }
            resultArray.push(result)
        }
        res.send(resultArray)
    })
    .catch(error => {
        console.log('Error :', error);
    })
}

exports.createTodo =  async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const isDone = req.body.isDone;

    //error handling
    if (!title || !content || !isDone) {
        res.sendStatus(400);
        return;
    }

    try {
        const ret = await todolist.create({
            title: title,
            content: content,
            isDone: isDone
        }, {logging: false});
        const newData = ret.dataValue;
        res.sendStatus(200)
        console.log(newData);
        console.log('Create success')
    }
    catch (error) {
        console.log('Error: ', error);
    }
}


