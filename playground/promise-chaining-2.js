require('../src/db/mongoose')
const Task = require('../src/models/task')

/*Task.findByIdAndDelete('5edfe1d7f8c774c30ba37826').then((taskDeleted) => {
    console.log(taskDeleted)
    return Task.find({ completed: false })
}).then((tasks) => {
    console.log(tasks)
}).catch((e) => {
    console.log(e)
})*/


const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5eded3fb6e5796450dba6b49').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})