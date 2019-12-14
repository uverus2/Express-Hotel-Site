const Accomodation = require("../models/accomodation");

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
                    reject(errorMessage)
                } else {
                    resolve(data);
                }
            }
        });
    });
}


module.exports = {
    findAccomodation
}