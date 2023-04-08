const express = require('express')
const { sendError, statusCodes, sendData, sendMessage } = require('../utils/response')
const {findAllTasks, createTask, findTask, deleteTask} = require('../schemas/tasks')
const { editDb } = require('../database/mutateDb')

const router = express.Router() 
const {serverError, badRequest, notFound, notAccepted, ok, created} = statusCodes

router.get('/all/:userId', (req, res)=>{
    try {
        const usersTasks = findAllTasks(req.params.userId)
        sendData(res, ok, usersTasks)
    } catch (error) {
        sendError(res, error, serverError, "Failed to get users tasks")
    }
})

router.get('/task/:taskId', (req, res)=>{
    try {
        let task = findTask(req.params.taskId)
        sendData(res, ok, task)
    } catch (error) {
        sendError(res, error, serverError, "Failed to get task")
    }
})

router.post('/create', async(req, res)=>{
    try {
        let newTask = await createTask(req.body)
        sendData(res, created, newTask)
    } catch (error) {
        sendError(res, error, serverError, "Failed to create task")
    }
})

router.patch('/edit/:taskId', async(req, res)=>{
    console.log('hit')
    try {
        // await editDb('task', req.params.taskId, req.body)
        // sendData(res, created, req.body)
        sendData(res, created, ['done'])
    } catch (error) {
        sendError(res, error, serverError, "Failed to edit task")
    }
})

router.patch('/task/complete/:taskId', async(req, res)=>{
    console.log('hit')
    try {
        let completeTask = {completed:true}
        await editDb('task', req.params.taskId, completeTask)
        sendMessage(res, "Task completed")
    } catch (error) {
        sendError(res, error, serverError, "Failed to complete task")
    }
})

router.delete('/:taskId', async(req, res)=> {
    try {
        await deleteTask(req.params.taskId)
        sendMessage(res, 'Task deleted')
    } catch (error) {
        sendError(res, error, serverError, "Failed to delete task")
    }
})

module.exports = router