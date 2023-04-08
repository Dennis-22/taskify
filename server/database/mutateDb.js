const fs = require('fs')
const path = require('path')

const fsPromises = fs.promises

const dbCollections = {
    users:'users.json',
    task:'task.json',
    test:'test.json'
}

async function getCollectionData(collection){
    try {
        let data = await fsPromises.readFile(path.join(__dirname, dbCollections[collection]), 'utf8')
        return JSON.parse(data)
    } catch (error) {
        throw new Error(error)
    }
}

async function writeToDb(collection, data){
    try {
        const oldFile = await getCollectionData(collection)
        let newFile = oldFile.concat(data)
        await fsPromises.writeFile(path.join(__dirname, dbCollections[collection]), JSON.stringify(newFile))   
    } catch (error) {
        throw new Error(error)
    }
}

async function editDb(collection, id, data){
    try {
        const oldFile = await getCollectionData(collection)
        let dataToEdit = oldFile.find(data => data.id === id)
        if(!dataToEdit) throw new Error("No file found")
        let removeEditData = oldFile.filter((data) => data.id !== id)
        let updatedFile = removeEditData.concat({...dataToEdit, ...data})
        await fsPromises.writeFile(path.join(__dirname, dbCollections[collection]), JSON.stringify(updatedFile))
    } catch (error) {
        throw new Error(error)
    }
}

async function deleteFromDb(collection, id){
    const oldData = await getCollectionData(collection)
    let newData = oldData.filter(data => data.id !== id)
    await fsPromises.writeFile(path.join(__dirname, dbCollections[collection]), JSON.stringify(newData))
}

module.exports = {writeToDb, editDb, deleteFromDb, getCollectionData}