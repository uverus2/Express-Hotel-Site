const mongoose = require("mongoose");

const BookingsSchema = new mongoose.Schema({
    acc_id: {
        type: Number,
        required: true
    },
    theDate: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    npeople: {
        type: Number,
        required: true
    }
});

const Bookings = mongoose.model("Bookings", BookingsSchema);

module.exports = Bookings;