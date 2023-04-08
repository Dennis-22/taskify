const fs = require('fs')
const path = require('path')
const {writeToDb, editDb, getCollectionData, deleteFromDb}= require('./database/mutateDb')


const test = [
    {id:4, test:'four'},
    {id:3, test:'three'},
]

// writeToDb('test', test)


async function Hello(){
    // await writeToDb('test', test)
    // let data = await getCollectionData('test')
    // let newData = {test:'fourteen'}
    await deleteFromDb('test', 1)
}

Hello()