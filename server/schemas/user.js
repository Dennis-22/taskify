const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {usersCollection} = require('../db')
const {generateRandomId} = require('../utils/utils')

async function doesUserEmailExist(email, addUserData=false){
    let emailExist = await usersCollection.findOne({email:email})
    return emailExist && addUserData ? emailExist : emailExist && !addUserData ? true : false
}

async function getUser(email, password){
    const userExist = await doesUserEmailExist(email, true)
    let comparePasswords = await bcrypt.compare(password, userExist.password)

    if(comparePasswords === false){
        return {success:false, text:"Password does not match"}
    }

    const {username, id} = userExist
    let accessToken = jwt.sign({username, userId:id}, process.env.ACCESS_TOKEN_SECRET)
    return {success:true, text:"", data:{username, email, accessToken}}
}

async function createUser(email, username, password){
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = {id:generateRandomId(), email, username, password:hashPassword}
    await usersCollection.insertOne(newUser);
    let accessToken = jwt.sign({username, userId:newUser.id}, process.env.ACCESS_TOKEN_SECRET)
    return {username, email, accessToken}
}

async function editUser(userId, editData){
    if(editData.hasOwnProperty('password')){ //user is changing his/her password
        // hash the password
        let hashPassword = await bcrypt.hash(editData.password, 10)
        await usersCollection.updateOne(
            {id: userId},
            {$set:{...editData, password:hashPassword}}
        )        
    }else{
        await usersCollection.updateOne(
            {id: userId},
            {$set:editData}
        )
    }
}

async function deleteUser(userId){
    await usersCollection.deleteOne({id:userId})
}

module.exports = {doesUserEmailExist, getUser, createUser, editUser, deleteUser}