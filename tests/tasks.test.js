const superTest = require('supertest')
const app = require('../src/app')
const Tasks = require('../src/models/task')
const Task = require('../src/models/task')
const {
    userOneId,
    userTwoId,
    userOne,
    userTwo,
    task1,
    task2,
    task3,
    setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await superTest(app)
        .post('/tasks')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send({
            description: 'TestTask'
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should get tasks from user', async () => {
    const response = await superTest(app)
        .get('/tasks')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send()
        .expect(200)
    expect(response.body.length).toBe(2)
})

test('Should not delete tasks from other user', async () => {
    const response = await superTest(app)
        .delete('/tasks/' + task1._id)
        .set('Authorization', 'Bearer ' + userTwo.tokens[0].token)
        .send()
        .expect(404)
    const task = await Task.findById(task1._id)
    expect(task).not.toBeNull()
})