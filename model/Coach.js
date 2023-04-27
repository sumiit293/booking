const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoachSchema = new Schema({
    trainId:{
        type: Schema.Types.ObjectId,
        ref: "_train"
    },
    number: {
        type: Number,
        required: true
    },
    
})
module.exports = mongoose.model("_coach", CoachSchema);