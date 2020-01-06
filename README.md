# Mongo DB , Express, React and Node js project + Webpack to compile

## Two hotel booking websites which use APIs to Lookup, Post and Edit hotels and create bookings.

### Mongo DB runs on the standard localhost:27017 with the database name required to be node1905 but it can be changed within the app.js file
### The app runs on server 3005 but if you need to change you can do so from PlacesAPI/config/serverConfig.js. If you do so you will be required to change the fetch() calls to those services but than cam simply be done from webPages/src/js/ with files visitHampshire.js and placesToStay.js using the global variable called apiLocalHost

# Installation

## Run NPM install to install the required dependencies

# Webpack
### npm run dev - Live server and real time updates
### npm run build - compile the files within the dist folder

# Mongo DB
### You will ne required to import the files called mongo_acc_dates and mongo_accommodations using the mongo shell 
### You can use the command mongoimport --db node1905 --file C:/Program Files/MongoDB/mongo_acc_dates or mongo_accommodations
### This will only work if files are stored in the MongoDB folder. More information [here](https://www.quackit.com/mongodb/tutorial/mongodb_import_data.cfm);
### If you decide to change the collection names please change them inside the placesAPI/models/ 



# Final
### Once everything is installed you can navigate to the app folder and run web services using node app.js (or nodemon app.js) and run npm run dev on a separate terminal. If the same settings are used as the following you can simply view it from the dist folder. 