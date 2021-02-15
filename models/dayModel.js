const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const daySchema = new Schema({
    dayName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
})

const Day = mongoose.model('Day', daySchema);

module.exports = Day;