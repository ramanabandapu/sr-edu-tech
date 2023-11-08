const express = require('express')
const todoController = express.Router()
const { TodoModel } = require('../Models/Todo.model')

todoController.get('/', async (req, res) => {
    try {
        const todo = await TodoModel.find({ authorID: req.body.authorID }).lean().exec();
       return res.status(200).send(todo);
    } catch (error) {
       return res.status(404).send({ error: error.message });
    }
})

todoController.post('/addTodo', async (req, res) => {
    try {
        const todo = await new TodoModel(req.body);
        todo.save();
        return res.send({ "msg": "todo has been saved" })

    } catch (error) {
        return res.send({ error: error.message });
    }
})
todoController.patch('/update/:todoId', async (req, res) => {
    const { todoId } = req.params
    const todo = await TodoModel.findOne({ _id: todoId })
    try {
        if (req.body.authorID !== todo.authorID) {
            return res.send({ "msg": "you are not authorized to do this" });
        }
        else {
            await TodoModel.findByIdAndUpdate({ _id: todoId }, req.body);
            return res.send({ "msg": `todo has been updated for this ${todoId}` })
        }

    } catch (error) {
        return res.send({ error: error.message });
    }
})
todoController.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    const todo = await TodoModel.findOne({ _id: id })
    try {
        if (req.body.authorID !== todo.authorID) {
            return res.send({ "msg": "you are not authorized to do this" });
        }
        else {
            await TodoModel.findByIdAndDelete({ _id: id }, req.body);
            return res.send({ "msg": `todo has been deleted for this ${id}` })
        }

    } catch (error) {
        return res.send({ error: error.message });
    }
})

todoController.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const todo = await TodoModel.findOne({ _id: id })
       return res.status(200).send(todo);
    } catch (error) {
        return res.send({ error: error.message });
    }
})

module.exports = { todoController } 