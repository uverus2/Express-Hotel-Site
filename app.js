const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const { server } = require("./placesAPI/config/serverConfig");
const routes = require("./placesAPI/routes/routes");
const cors = require('cors');


mongoose.connect('mongodb://localhost:27017/node1905', {
    useNewUrlParser: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(connect => console.log("Database Connected")).catch(error => console.log(`DB Connection Error: ${error.message}`));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use("/api/", routes);

app.use((req, res, next) => {
    const err = new Error("Route is Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
            status: err.status
        }
    });
});

server(app);