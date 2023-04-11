const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@taskify.njylld0.mongodb.net/?retryWrites=true&w=majority`

const mongoDbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const usersCollection = mongoDbClient.db("taskify_db").collection('users');
const tasksCollection = mongoDbClient.db("taskify_db").collection('tasks')

module.exports ={usersCollection, tasksCollection}