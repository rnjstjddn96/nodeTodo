const conn = require('../dbConnection');
const Sequelize = require('sequelize');

const TodoGroup = conn.define('todoGroup', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING
}, {timestamps: false});

const TodoList = conn.define('todoList', {
    //property 정의
    id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    isDone: Sequelize.BOOLEAN,
}, {timestamps: true});

async function initGroup() {
    try {
        const groups = await TodoGroup.findAll({});
    
        if (groups.length === 0) {
            TodoGroup.create({
                name: 'default'
            })
        }
    } catch (error) {
        console.log('error: ', error)
    }
}

async function setRelation() {
    TodoList.belongsTo(TodoGroup, { foreignKey: 'group_id' })

    try {
        await TodoGroup.sync().then( ret => {
            console.log('Sync Success :', ret);
            // conn.close();
        }).catch(error => {
            console.error('Sync Failure :', error);
        })

        await TodoList.sync().then( ret => {
            console.log('Sync Success :', ret);
            // conn.close();
        }).catch(error => {
            console.error('Sync Failure :', error);
        })
    } catch (error) {
        console.log('error: ', error)
    }

    initGroup()
}

setRelation()

exports.todolist = TodoList
exports.todoGroup = TodoGroup