const supertest = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
    const response = await supertest(app).post('/users').send({
        name: 'Joel',
        email: 'joel@email.com',
        password: 'Joel112358'
    }).expect(201)

    //Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Joel',
            email: 'joel@email.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('Joel112358')
})

test('Should login user', async () => {
    const response = await supertest(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    //Assert token creation on login
    const user = await User.findById(response.body.user._id)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
    await supertest(app).post('/users/login').send({
        email: userOne.email,
        password: 'notpass'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await supertest(app)
        .get('/users/me')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await supertest(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account user', async () => {
    const response = await supertest(app)
        .delete('/users/me')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send()
        .expect(200)

    //Assert user was deleted from database
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await supertest(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await supertest(app)
        .post('/users/me/avatar')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid fields', async () => {
    await supertest(app)
        .patch('/users/me')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send({
            name: 'Jess'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Jess')
})

test('Should not update invalid fields', async () => {
    await supertest(app)
        .patch('/users/me')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send({
            location: 'Boston'
        })
        .expect(400)
})