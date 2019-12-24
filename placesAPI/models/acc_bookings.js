const mongoose = require("mongoose");

const BookingsSchema = new mongoose.Schema({
    acc_id: {
        type: String,
        required: true
    },
    theDate: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    npeople: {
        type: String,
        required: true
    }
});

const Bookings = mongoose.model("Bookings", BookingsSchema);

module.exports = Bookings;