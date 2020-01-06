import React, { Component } from 'react';
import ReactDOM from "react-dom";
import App from './placesMain.jsx';
import "../sass/mainForBoth.scss";
import "../images/heroPlaces.jpg";
import "../images/beer.png";
import "../images/bonfire.png";
import "../images/hostel.png";
import "../images/bed.png";
import "../sass/placesToStay/main.scss";
import createjs from 'createjs';

//https://edward2.solent.ac.uk/node05/
//http://localhost:3005/
global.apiLocalHost = "http://localhost:3005/";

ReactDOM.render( < App / > , document.getElementById("index"));