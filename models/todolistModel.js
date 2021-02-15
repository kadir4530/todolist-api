const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todolistSchema = new Schema({
    day: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    activities:[
        {
            hour:{
                type: String,
                required: true, 
                trim: true,
                minlength: 3
            },
            activityName:{
                type: String,
                required: true, 
                trim: true,
                minlength: 3
            }
        }
    ]
})

const ToDoList = mongoose.model('ToDoList', todolistSchema);

module.exports = ToDoList;