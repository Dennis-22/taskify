const bcrypt = require('bcrypt')
const {writeToDb} = require('../database/mutateDb')
const users = require('../database/users.json')
const {generateRandomId} = require('../utils/utils')

function doesUserEmailExist(email){
    return users.some(user => user.email === email)
}

async function getUser(email, password){
    
    let userExist = users.find(user => user.email === email)
    let comparePasswords = await bcrypt.compare(password, userExist.password)

    if(comparePasswords === false){
        return {success:false, text:"Password does not match"}
    }

    return {success:true, text:"", userDate:userExist}
}

async function createUser(email, username, password){
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = {id:generateRandomId(), email, username, password:hashPassword}
    await writeToDb('users', newUser)
    return newUser
}


module.exports = {doesUserEmailExist, getUser, createUser}