const mongoose = require("mongoose");

const DatesSchema = new mongoose.Schema({
    acc_id: {
        type: String,
        unique: true,
        required: true
    },
    thedate: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
});

const Dates = mongoose.model("Dates", DatesSchema, "mongo_acc_dates");

module.exports = Dates;