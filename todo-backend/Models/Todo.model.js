const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: { type: 'string', required: true },
    description: { type: 'string' },
    completed: { type: 'boolean', required: true },
    authorID: { type: 'string', required: true },
    authorName: { type: 'string', required: true }
})


const TodoModel = mongoose.model('todo', todoSchema)

module.exports = { TodoModel } 