const { writeToDb } = require('../database/mutateDb')
const { generateRandomId } = require('../utils/utils')
const tasks = require('../database/task.json')

function findAllTasks(userId){
    return tasks.filter(task => task.userId === userId)
}

function findTask(taskId){
    const task = tasks.find(task => task.id === taskId)
    if(!task) throw new Error("No task found")
    return task
}

async function createTask(data){
    const {title, description, date} = data
    let newTask = {id:generateRandomId(), title, description, date, completed:false}
    // await writeToDb('task', newTask)
    return newTask
}


async function deleteTask(taskId){
    let newTask = tasks.filter(task => task.id !== taskId) 
    await writeToDb('task', newTask)
}

module.exports = {findAllTasks, findTask, createTask, deleteTask}