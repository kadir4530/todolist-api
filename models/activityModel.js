const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    activityName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
})

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;