const mongoose = require("mongoose");

const DatesSchema = new mongoose.Schema({
    acc_id: {
        type: Number,
        unique: true,
        required: true
    },
    thedate: {
        type: Number,
        required: true
    },
    availability: {
        type: Number,
        required: true
    }
});

const Dates = mongoose.model("Dates", DatesSchema, "mongo_acc_dates");

module.exports = Dates;