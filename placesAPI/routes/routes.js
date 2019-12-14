const express = require("express");
const router = express.Router();
const functions = require("../functions/functions");

router.get("/location", async(req, res) => {
    const location = req.body.location;
    console.log(location)
    if (location === undefined || !location || location.length < 0) {
        res.status(400).json("{Message: Bad Request. Location name is required}")
    } else {
        try {
            const locationData = await functions.findAccomodation(location);
            res.json(locationData);
        } catch (e) {
            res.status(e.status).json(e.error)
        }
    }


});

module.exports = router