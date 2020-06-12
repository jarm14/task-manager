const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

/*const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password can´t contain "password"')
            }
        }
    }
})*/

/*const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})*/

/*const taskOne = new Task({
    description: 'Learn node'
})

taskOne.save().then(() => {
    console.log(taskOne)
}).catch((error) => {
    console.log(error)
})*/

/*const me = new User({
    name: 'Diego',
    age: 25,
    email: 'diego@email.com',
    password: 'diego112358'
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log(error)
})*/