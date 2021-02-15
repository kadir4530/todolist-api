
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

















// const fs = require('fs');
// const apiUrl = "http://localhost:3000"

// app.get("/activities", function (req, res) {

//     fetch(apiUrl + "/activities")
//         .then(res => res.json())
//         .then(data => data.send(200, data))
//         .catch(err => console.log(err))

// })

// app.get("/days", function (req, res) {

//     fetch(apiUrl + "/days")
//         .then(res => res.json())
//         .then(data => data.send(200, data))
//         .catch(err => console.log(err))

// })
// app.post("/activities/add", (req, res) => {
//     const activity = req.body;
//     return fs.appendFile("./tmp/activities.json", activity, function (err) {
//         if (err) {
//             return console.log(err);
//         }
//         res.send("The file was saved!");
//     });
// })
// // fs.writeFile("./tmp/test", "Hey aslan!", function (err) {
// //     if (err) {
// //         return console.log(err);
// //     }
// //     console.log("The file was saved!");
// // });
// const readMyFile = () => {
//     fs.readFile("./tmp/test", "utf8", function (err, data) {
//         if (err) {
//             return console.log(err)
//         }
//         const content = data;
//         console.log(content);
//     })
// }

// fs.readFile("./tmp/test", "utf8", function (err, data) {
//     if (err) {
//         return console.log(err)
//     }
//     console.log(data)
// })

// async function getActivities() {
//     let response = await fetch("activities");
//     let data =fs.readFile("./tmp/test", "utf8", function (err, data) {
//         if (err) {
//             return console.log(err)
//         }
//         console.log(data)
//     })
//     return data;
// }
// getActivities().then(data => console.log(data))
