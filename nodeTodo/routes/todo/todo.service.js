const Sequelize = require('sequelize');
const conn = require('../../dbConnection');
const models = require('../../todo/model') 
const todoGroupService = require('../todoGroup/todoGroup.service')
const Op = Sequelize.Op;

const todolist = models.todolist; //todoList model
const todoGroup = models.todoGroup //todoGroup model

exports.getAllTodos = (req, res) => {
    todolist.findAll({
        include: [{ model: todoGroup }]
    })
    .then( results => {
        if (results == null) {
            res.send({
                message: 'emptyTodos'
            })
        }

        var resultArray = new Array();
        for(var todo of results) {
            const result = {
                title: todo.title,
                content: todo.content,
                group_id: todo.group_id,
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

exports.getAllDoneTodos = (req, res) => {
    todolist.findAll({
        where: {
            isDone: true
        }
    })
    .then( results => {
        if (results == null) {
            res.send({
                message: 'emptyDoneTodos'
            })
        } else {
            var resultArray = new Array();
            for(var todo of results) {
                const result = {
                    title: todo.title,
                    content: todo.content,
                    isDone: todo.isDone                    
                };
                resultArray.push(result);
            }
            res.send(resultArray)
        }
    })
    .catch( error => {
        console.log('Error: ', error);
    })
}

exports.createTodo =  async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    let groupId = req.body.groupId;

    //error handling
    if (!title || !content) {
        res.sendStatus(400);
        return;
    }

    if (!groupId) {
        groupId = 1;
    }

    try {
        const ret = await todolist.create({
            title: title,
            content: content,
            isDone: false
        }, {logging: false});

        const result = {
            "title": title,
            "content": content,
            "isDone": false
        }

        todoGroupService.findById(groupId)
        .then(group => {
            if(group) {
                addToGroup(groupId, ret.id);
            } else {
                res.sendStatus(400);
                res.send('no such group')
            }
        })

        res.sendStatus(200)
        res.json(result)

        console.log('Create success')
    }
    catch (error) {
        console.log('Error: ', error);
    }
}

async function addToGroup(groupId, todoId) {
    const todo = await todolist.findOne({ where: { id: todoId }})
    const group = await todoGroup.findOne({ where : { id: groupId}})
    console.log('group name: ', group.name)
    todo.setTodoGroup(group)
}

exports.checkIsDone =  async (req, res) => {
    const id = req.body.id;

    //error handling
    if (!id) {
        res.sendStatus(400);
        return;
    }

    try {
        const todo = await todolist.findOne({
            where: { id: id },
            raw: true
        });

        const toCheck = (todo.isDone) ? false : true;

        const ret = await todolist.update({
            isDone: toCheck
        },{
            where: {
                id: todo.id
            }
        });

        const newData = ret.dataValue;
        res.sendStatus(200)

        res.json(ret.dataValue)
        console.log(newData);
        console.log('Update success')
    }
    catch (error) {
        console.log('Error: ', error);
    }
}

exports.getTodosByGroup = async (req, res) => {
    console.log('11111111111111: ', req);
    const groupId = req.params.id;

    todolist.findAll({
        where: {
            group_id: groupId
        },
        raw: true
    })
    .then( results => {
        if (results == null) {
            res.send({
                message: 'emptyTodos'
            })
        }

        var resultArray = new Array();
        for(var todo of results) {
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

