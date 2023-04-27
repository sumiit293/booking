const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrainSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    startPoint: {
        type: String
    },
    endPoint: {
        type: String
    }
})
module.exports = mongoose.model("_train", TrainSchema);