
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

const port = process.env.PORT || 5000;
const uri = process.env.LOCAL_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    console.log(uri)
    if (!error) {
        console.log("Connected to mongoDb")
    }
})


const activityRouter = require("./routes/activities");
const hourRouter = require("./routes/hours");
const dayRouter = require("./routes/days");
const toDoListRouter = require("./routes/toDoList");
// const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");


app.use('/activities', activityRouter);
app.use('/hours', hourRouter);
app.use('/days', dayRouter);
app.use('/todolist', toDoListRouter);
// app.use('/users', userRouter); 
app.use('/users', authRouter);

app.listen(port, () => {
    console.log('Server is running on portt : ' + port);
})

