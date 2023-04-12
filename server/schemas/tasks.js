const { generateRandomId } = require('../utils/utils')
const {tasksCollection} = require('../db')

async function findAllTasks(userId){
    const tasksQuery = tasksCollection.find({userId:{$eq: userId}})
    let userTasks = []
    await tasksQuery.forEach(task => userTasks.push(task))
    return userTasks
}

async function findTask(taskId){
    let task = await tasksCollection.findOne({id:taskId})
    return task
}

async function createTask(data){
    const {userId, title, description, tag, date} = data
    let newTask = {id:generateRandomId(), userId, title, description, tag, date, completed:false}
    await tasksCollection.insertOne(newTask);
    return newTask
}

async function editTask(taskId, newData){
    await tasksCollection.updateOne(
        {id: taskId},
        {$set:newData}
    )
}

async function deleteTask(taskId){
    await tasksCollection.deleteOne({id:taskId})
}

module.exports = {findAllTasks, findTask, createTask, editTask, deleteTask}