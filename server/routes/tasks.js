const express = require('express')
const { sendError, statusCodes, sendData, sendMessage } = require('../utils/response')
const {findAllTasks, createTask, findTask, deleteTask, editTask} = require('../schemas/tasks')


const router = express.Router() 
const {serverError, ok, created} = statusCodes

router.get('/:userId', async(req, res)=>{
    const userId = req.userId
    try {
        const usersTasks = await findAllTasks(userId)
        sendData(res, ok, usersTasks)
    } catch (error) {
        sendError(res, error, serverError, "Failed to get users tasks")
    }
})

router.get('/task/:taskId', async(req, res)=>{
    const taskId = req.params.taskId
    try {
        let task = await findTask(taskId)
        sendData(res, ok, task)
    } catch (error) {
        sendError(res, error, serverError, "Failed to get task")
    }
})

router.post('/create', async(req, res)=>{
    const userId = req.userId
    console.log('hit with id', userId)
    try {
        let newTask = await createTask({...req.body, userId})
        sendData(res, created, newTask)
    } catch (error) {
        sendError(res, error, serverError, "Failed to create task")
    }
})

router.patch('/edit/:taskId', async(req, res)=>{
    try {
        await editTask(req.params.taskId, req.body)
        sendData(res, created, req.body)
    } catch (error) {
        sendError(res, error, serverError, "Failed to edit task")
    }
})

router.patch('/complete/:taskId', async(req, res)=>{
    const taskId = req.params.taskId
    try {
        await editTask(taskId, {completed:true})
        sendMessage(res, "Task completed")
    } catch (error) {
        sendError(res, error, serverError, "Failed to complete task")
    }
})

router.delete('/delete/:taskId', async(req, res)=> {
    try {
        await deleteTask(req.params.taskId)
        sendMessage(res, 'Task deleted')
    } catch (error) {
        sendError(res, error, serverError, "Failed to delete task")
    }
})

module.exports = router