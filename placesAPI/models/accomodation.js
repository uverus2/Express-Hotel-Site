const mongoose = require("mongoose");

const AccomodationSchema = new mongoose.Schema({
    _id: { type: String },
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    longitude: {
        type: Number,
        required: true,
        trim: true
    },
    latitude: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
});

const Accomodation = mongoose.model("Accomodation", AccomodationSchema, "mongo_accommodations");
//const Accomodation = mongoose.model("Accomodation", AccomodationSchema, "accommodations");

module.exports = Accomodation;