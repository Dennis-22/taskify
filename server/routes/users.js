const express = require('express')
const { sendError, statusCodes, sendData, sendMessage } = require('../utils/response')
const { doesUserEmailExist, getUser, createUser} = require('../schemas/user')
const {deleteFromDb, editDb} = require('../database/mutateDb')

const router = express.Router() 
const {serverError, badRequest, notFound, notAccepted, ok, created} = statusCodes

router.post('/login',async(req, res)=>{
    const {email, password} = req.body
    try{
        const userExist = doesUserEmailExist(email)
        if(!userExist) return sendError(res, "No user", notFound, "Email does not exist")

        const gettingUser = await getUser(email, password)
        if(gettingUser.success === false){
            return sendError(res, "Incorrect password", badRequest, gettingUser.text)
        }
        sendData(res, ok, gettingUser.userDate)
    } catch (error) {
        return sendError(res, error, serverError, "Failed to login")
    }
})

router.post('/signup', async(req, res)=>{
    const {username, password, email, confirmPassword} = req.body
    try {
        const userExist = doesUserEmailExist(email)
        if(userExist) return sendError(res, "Email exist", notAccepted, "Email already exist")
        if(password !== confirmPassword){
            return sendError(res, 'Passwords mismatch', statusCodes.notAccepted, "Password and confirm password does not match")
        }
        
        const newUser = await createUser(email, username, password)
        sendData(res, created, newUser)
    } catch (error) {
        return sendError(res, error, serverError, "Failed to sign up")
    }
})

router.patch('/edit/:userId', async(req,res)=>{
    const userId = req.params.userId
    try {
        await editDb('users', userId, req.body)
        sendData(res, created, req.body)
    } catch (error) {
        sendError(res, error, serverError, "Failed to edit account")
    }
    res.send('/edit account')
})

router.delete('/delete/userId', async(req, res)=>{
    const userId = req.params.userId
    try {
        await deleteFromDb('users', userId)
        sendMessage(res, "User account deleted")
    } catch (error) {
        sendError(res, error, serverError, "Failed to delete account")
    }
})

module.exports = router