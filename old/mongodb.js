const mongodb = require('mongodb')
/*const mongoClient = mongodb.MongoClient
const objectId = mongodb.ObjectID*/
const { MongoClient, ObjectID } = mongodb

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
/*const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())*/

MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }
    const db = client.db(databaseName)

    //Delete functions
    db.collection('tasks').deleteOne({
        description: 'Task 2'
    }).then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })

    /*db.collection('users').deleteMany({
        age: 24
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })*/


    //Update functions
    /*db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })*/

    //Con creacion de constante
    /*const updatePromise = db.collection('users').updateOne({
        _id: new ObjectID("5ede9b71ace6c8262ed9f906")
    }, {
        $set: {
            name: 'Alejandro',
            age: 34
        }
    })

    updatePromise.then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })*/
    //Sin creacion de constantes
    /*db.collection('users').updateOne({
        _id: new ObjectID("5ede9b71ace6c8262ed9f906")
    }, {
        //$set: {
        //    name: 'Alejandro',
        //    age: 34
        //}
        $inc: {
            age: 1
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })*/


    //Find functions
    /*db.collection('users').findOne({ name: 'Diego' }, (error, user) => {
        if (error) {
            return console.log('Unable to fetch')
        }
        console.log(user)
    })*/

    /*db.collection('users').find({ age: 25 }).toArray((error, users) => {
        console.log(users)
    })*/

    /*db.collection('tasks').findOne({ _id: new ObjectID("5ede9e891406c6278e33b5e2") }, (erro, task) => {
        if (error) {
            return console.log('Unable to fetch')
        }
        console.log(task)
    })

    db.collection('tasks').find({ completed: true }).toArray((error, tasks) => {
        if (error) {
            return console.log('Unable to fetch')
        }
        console.log(tasks)
    })*/



    //Insert functions
    /*db.collection('users').insertOne({
        name: 'Solange',
        age: 25
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert document')
        }

        console.log(result.ops)
    })*/
    /*db.collection('users').insertMany([
        {
            name: 'Diego',
            age: 24
        },
        {
            name: 'Brian',
            age: 25
        }
    ], (error, result) => {
        if(error){
            return console.log('Unable to insert documents')
        }
        console.log(result.ops)
    })*/

    /*db.collection('tasks').insertMany([
        {
            description: 'Task 1',
            completed: true
        },
        {
            description: 'Task 2',
            completed: false
        },
        {
            description: 'Task 3',
            completed: true
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents')
        }
        console.log(result.ops)
    })*/


})