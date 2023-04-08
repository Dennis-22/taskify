const express = require('express')
const morgan = require('morgan')
const {sendMessage} = require('./utils/response')
require('dotenv').config

const app = express()
const PORT = process.env.PORT || 4000
const baseRoute = '/api/v1'

app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (req, res)=>{
    sendMessage(res, "Welcome to taskify")
})

app.use(`${baseRoute}/users`, require('./routes/users'))
app.use(`${baseRoute}/tasks`, require('./routes/tasks'))

app.listen(PORT, ()=> console.log(`Started on ${PORT}`))

// exit uncaught errors
process.on('uncaughtException', error => {
    console.error(`There was an uncaught error ${error}`)
    process.exit(1)
})