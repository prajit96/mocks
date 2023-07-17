const express = require('express');
const boardRoute = require('./routes/board.routes');
const taskRoute = require('./routes/task.routes');
const subtaskRoute = require('./routes/subtask.routes');
const {connection} = require("./db")
require("dotenv").config()

const cors = require('cors');
const app = express();

app.use(express.json())
app.use(cors());

app.use('/board', boardRoute);
app.use('/task', taskRoute);
app.use('/subtask', subtaskRoute);

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to DB")
        console.log(`Server is running at port ${process.env.port}`)
    } catch (err) {
        console.log(err)
        console.log("wrong here")
    }
})