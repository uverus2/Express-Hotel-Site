const express = require("express");
const router = express.Router();
const functions = require("../functions/functions");
const { check, param, validationResult } = require('express-validator');


// Route get Location 
router.get("/location/:location", [
    param("location").isLength({ min: 1 }).withMessage('Location must not be empty').isAlpha().withMessage('Only letters are allowed')
], async(req, res) => {
    try {
        const errors = validationResult(req);
        await functions.errorCheck(errors, 400);
        const location = req.params.location;
        const locationData = await functions.findAccomodation(location);
        res.json(locationData);
    } catch (e) {
        res.status(e.status).json(e.error);
    }
});

route.get("/hello", (req,res) => {
    res.send("Hello");   
})

// Route get Location 
router.get("/availability/:id", [
    param("id").isLength({ min: 1 }).withMessage('ID must not be empty').isInt().withMessage('Only numbers are allowed')
], async(req, res) => {
    try {
        const errors = validationResult(req);
        await functions.errorCheck(errors, 400);
        const acc_id = req.params.id;
        const availabilityData = await functions.availabilityInfo(acc_id);
        res.json(availabilityData);
    } catch (e) {
        res.status(e.status).json(e.error);
    }
});

// Route gets Location of a certain type
router.get("/location/:location/:type", [
    param("location").isLength({ min: 1 }).withMessage('Location must not be empty').isAlpha().withMessage('Only letters are allowed'),
    param("type").isAlpha().withMessage('Only letters are allowed for the Type').isIn(["hotel", "campsite", "BandB", "pub"]).withMessage('Type must be either a hotel, campsite, BandB or pub')
], async(req, res) => {
    try {
        const errors = validationResult(req);
        await functions.errorCheck(errors, 400);
        const location = req.params.location;
        const locationType = req.params.type;
        const locationDataWithType = await functions.findAccomodationAndType(location, locationType);
        res.json(locationDataWithType);
    } catch (e) {
        res.status(e.status).json(e.error);
    }
});


// Route Posts a booking 
router.post("/booking", [
    check("acc_id").exists().withMessage("ID Must be provided").isLength({ min: 1 }).withMessage('ID value must not be empty').isInt().withMessage('ID must be a number').custom(async data => {
        const doesItExist = await functions.checkIfAccomodationExists(data);
        try {
            if (!doesItExist) {
                return Promise.reject("Accomodation Does not exist")
            } else {
                return Promise.resolve()
            }
        } catch (e) {
            console.log(e);
        }

    }),
    check("username").exists().withMessage("Username must be supplied").isLength({ min: 1 }).withMessage('Username must not be empty').isAlpha().withMessage('Only letters are allowed'),
    check("npeople").exists().withMessage("Number must be provided").isLength({ min: 1 }).withMessage('It must not be empty').isInt().withMessage('ID must be a number'),
    check("theDate").exists().withMessage("The Date must be provided").isLength({ min: 1, max: 6 }).withMessage('Date must not be empty and no longer than 6 characters').isInt().withMessage('ID must be a number').custom(date => {
        if (date.toString().substring(0, 2) < 20) {
            return Promise.reject("Date provided must be in the future");
        }
        if (date.toString().substring(2, 4) > 12) {
            return Promise.reject("The year has only 12 months therefore number cannot be larger than 12");
        }
        if (date.toString().substring(4, 6) > 31) {
            return Promise.reject("Month must be lower than 31");
        }
        return Promise.resolve()
    })
], async(req, res) => {
    try {
        const errors = validationResult(req);
        await functions.errorCheck(errors, 400);
        const retriveAvailabilityFinal = await functions.retriveAvailabilityOnDate(req.body.acc_id, req.body.theDate, req.body.npeople);

        const boookingDetails = {
            acc_id: req.body.acc_id,
            theDate: req.body.theDate,
            username: req.body.username,
            npeople: req.body.npeople
        }
        const inserBookingFunction = await functions.insertBooking(boookingDetails)
        await functions.decreaseAvailability(req.body.acc_id, req.body.theDate, retriveAvailabilityFinal)
        res.status(inserBookingFunction.status).json(inserBookingFunction.message);

    } catch (e) {
        if (e.hasOwnProperty("errorDetails")) {
            res.status(e.errorDetails.status).json(e);
        } else {
            res.status(e.status).json(e.error);
        }
    }
});

module.exports = router