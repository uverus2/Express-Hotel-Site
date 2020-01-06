import React, { Component } from 'react';
import ReactDOM from "react-dom";
import App from './visitMain.jsx';
import "../sass/mainForBoth.scss";
import "../images/heroVisit.jpg";
import "../sass/visitHampshire/main.scss";
import createjs from 'createjs';

//https://edward2.solent.ac.uk/node05/
//http://localhost:3005/
global.apiLocalHost = "http://localhost:3005/";



ReactDOM.render( < App / > , document.getElementById("clientSite"));