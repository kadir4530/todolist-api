const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hourSchema = new Schema({
    hour: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
})

const Hour = mongoose.model('Hour', hourSchema);

module.exports = Hour;