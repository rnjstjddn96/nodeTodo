const Sequelize = require('sequelize');
const conn = require('../../dbConnection');
const models = require('../../todo/model') 
const Op = Sequelize.Op;

const todolist = models.todolist; //todoList model
const todoGroup = models.todoGroup //todoGroup model

exports.findById = async (id) => {
    const group = await todoGroup.findOne({
        where: { id: id },
        raw: true
    });
    return group
};

exports.createGroup = async (req, res) => {
    const name = req.body.name
    console.log('aaa name: ', name)
    if(!name) {
        res.sendStatus(400);
        return;
    }

    try {
        const ret = await todoGroup.create({
            name: name
        }, { logging: false });
        const result = {
            "name": name
        }
        res.sendStatus(200);
        res.send(result);
    } catch (error) {  
        console.log('Error: ', error);
    }
}

exports.getAllTodoGroups = (req, res) => {
    todoGroup.findAll({})
    .then( results => {
        if (results == null) {
            res.send({
                message: 'emptyTodoGroup'
            })
        }

        var resultArray = new Array();
        for(var group of results) {
            const result = {
                id: group.id,
                name: group.name
            }
            resultArray.push(result)
        }
        res.send(resultArray)
    })
    .catch(error => {
        console.log('Error :', error);
    })
}