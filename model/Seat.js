const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeatSchema = new Schema({
    coachId:{
        type: Schema.Types.ObjectId,
        ref: "_coach"
    },
    seatNumber:{
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    }
    
})
module.exports = mongoose.model("_seat", SeatSchema);