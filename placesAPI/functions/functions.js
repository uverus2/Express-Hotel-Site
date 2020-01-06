const Accomodation = require("../models/accomodation");
const Dates = require("../models/acc_dates");
const Bookings = require("../models/acc_bookings");

const findAccomodation = (location) => {
    return new Promise((resolve, reject) => {
        let errorMessage = {};
        Accomodation.find({ location: location }, (err, data) => {
            if (err) {
                errorMessage.error = err;
                errorMessage.status = 500;
                reject(errorMessage);
            } else {
                if (data === null || data.length <= 0) {
                    errorMessage.error = "Content Not found";
                    errorMessage.status = 404;
                    reject(errorMessage);
                } else {
                    resolve(data);
                }
            }
        });
    });
};

const findAccomodationAndType = (location, type) => {
    return new Promise((resolve, reject) => {
        let errorMessage = {};
        Accomodation.find({ location: location, type: type }, (err, data) => {

            if (err) {
                errorMessage.error = err;
                errorMessage.status = 500;
                reject(errorMessage);
            } else {
                if (data === null || data.length <= 0) {
                    errorMessage.error = "Content Not found";
                    errorMessage.status = 404;
                    reject(errorMessage)
                } else {
                    resolve(data);
                }
            }
        });
    });
};

const availabilityInfo = (acc_id) => {

    return new Promise((resolve, reject) => {
        let errorMessage = {
            errorDetails: {
                msg: "",
                status: ""
            }
        };
        Dates.find({ acc_id: acc_id }, null, { limit: 20 }).sort({ thedate: 'asc' }).exec((err, data) => {
            if (err) {
                errorMessage.errorDetails.msg = err;
                errorMessage.errorDetails.status = 500;
                reject(errorMessage);
            } else {
                if (data === null || data.length <= 0) {
                    errorMessage.errorDetails.msg = "Place not found or no availability information";
                    errorMessage.errorDetails.status = 404;
                    reject(errorMessage);
                } else {
                    resolve(data);
                }
            }
        });

    });
}

const retriveAvailabilityOnDate = (acc_id, date, npeople) => {
    return new Promise((resolve, reject) => {
        let errorMessage = {
            errorDetails: {
                msg: "",
                status: ""
            }
        };
        Dates.find({ acc_id: acc_id, thedate: date }, (err, data) => {
            if (err) {
                errorMessage.errorDetails.msg = err;
                errorMessage.errorDetails.status = 500;
                reject(errorMessage);
            } else {
                if (data === null || data.length <= 0) {
                    errorMessage.errorDetails.msg = "No Availability information found for this Accomodation on this Date";
                    errorMessage.errorDetails.status = 404;
                    reject(errorMessage);
                } else {
                    if (Number(npeople) > Number(data[0].availability)) {
                        errorMessage.errorDetails.msg = "No Places availbale on this date";
                        errorMessage.errorDetails.status = 422;
                        reject(errorMessage);
                    } else {
                        const availabilityScore = Number(data[0].availability) - Number(npeople);
                        resolve(availabilityScore);
                    }
                }
            }
        });
    });
};

const checkIfAccomodationExists = acc_id => {
    return new Promise((resolve, reject) => {
        Accomodation.findOne({ _id: acc_id }, (err, data) => {
            if (err) {
                reject(err);
            }

            if (data) {

                resolve(true);
            } else {
                resolve(false);

            }

        });
    });
};

const errorCheck = (errors, status) => {
    let error = {
        error: {

        }
    }
    return new Promise((resolve, reject) => {
        if (!errors.isEmpty()) {
            error.status = status;
            error.error = errors.mapped();
            reject(error);
        } else {
            resolve();
        }
    });
};

const insertBooking = (bookingData) => {
    return new Promise((resolve, reject) => {
        let errorMessage = {
            errorDetails: {
                msg: "",
                status: ""
            }
        }
        Bookings.create(bookingData, (err) => {
            if (err) {
                errorMessage.errorDetails.msg = err;
                errorMessage.errorDetails.status = 500;
                reject(errorMessage);
            } else {
                const successMessage = {
                    message: "Booking Added Succesfully",
                    status: 201
                };
                resolve(successMessage);
            }
        });
    });
};

const decreaseAvailability = (acc_id, date, finalNumber) => {
    return new Promise((resolve, reject) => {
        let errorMessage = {}
        Dates.updateOne({ acc_id: acc_id, thedate: date }, { $set: { availability: finalNumber } }, (error) => {
            if (error) {
                errorMessage.error = err;
                errorMessage.status = 500;
                reject(errorMessage);
            } else {
                resolve(true);
            }
        });
    });
};


module.exports = {
    findAccomodation,
    errorCheck,
    findAccomodationAndType,
    checkIfAccomodationExists,
    retriveAvailabilityOnDate,
    insertBooking,
    decreaseAvailability,
    availabilityInfo
}