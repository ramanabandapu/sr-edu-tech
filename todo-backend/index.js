const express = require('express')

const cors = require('cors');

require('dotenv').config();

const connection = require('./Server/db');

const { todoController } = require('./Controllers/Todo.controller')

const { authenticate } = require('./Middlewares/auth.middleware')

const { userController } = require('./Controllers/User.controller')

const app = express()

app.use(express.json())

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions))


app.get('/', (req, res) => {
    try {
        res.send('Hello World')
    } catch (err) {
        res.send({ error: err.message })
    }
})

app.use('/user', userController);

app.use(authenticate)

app.use('/todos', todoController);



app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log(`Listening on Port ${process.env.PORT}`);
    }
    catch (err) {
        console.log(err.message);
    }
});