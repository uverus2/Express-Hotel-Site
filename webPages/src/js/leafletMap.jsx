import React from 'react';
import Canvas from './availability.jsx';

let map = ""; 
const createElement = (el, value, optional) => {
    let createdEl = document.createElement(el);
    if (optional != undefined) {
        createdEl.innerHTML = optional + value;
    } else if (value != undefined) {
        createdEl.innerHTML = value;
    }
    return createdEl
};

const appendMultiple = (el, array) => {
    array.map(i => {
        el.append(i);
    });
};



const createInputs = (type,inputID,placeholderText,labelText,appendTo) => {
    const div = document.createElement("div");
    div.classList.add("py-2");
    const label = document.createElement("label");
    label.innerHTML=`${labelText}`;
    const input = document.createElement("input");
    input.style.width = "100%";
    input.setAttribute("type", `${type}`);
    input.setAttribute("id", `${inputID}`);
    input.required = true;
    input.setAttribute("placeholder",`${placeholderText}`);
    

    const elementsArray = [label,input]
    appendMultiple(div, elementsArray);
    appendTo.append(div);
};

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            lat:0,
            long:0,
            username : "",
            accId: "",
            name:""
        };
        this.map = "";
    }

    clickedOnAvailability (acc_id,name){
        this.setState({accId:acc_id, name:name});
    }

    
    createMap(map,lat,long){
        if(map){
        map.setView([lat, long], 16);
        }
    }

    mapDetails(map){
        const attrib = "Map data copyright OpenStreetMap contributors, Open Database Licence";
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: attrib }).addTo(map);
        document.getElementById("map").style.height = "50vh";
    }

    createCustomPopup (marker,acc_id,name) {
        const popup = document.createElement("div");
        popup.style.width = "200px";
        const h2 = createElement("h5",`${name}`);
        const a = createElement("a","Book Now");
        a.classList.add("py-2");
        const form = createElement("form");
        form.style.display = "none";
        const submitButton = createElement("button","Book Now");
        a.addEventListener("click", ()=> {
            form.style.display = "block";
        });

        const checkAvailable = createElement("a","Check Availability");

        checkAvailable.addEventListener("click", ()=> {
            const canvasBody = document.getElementById("canvas");
            canvasBody.classList.remove("d-none");
            this.clickedOnAvailability(acc_id, name);
            
        });
        // Add a click event to return the acc ID; 

        const error = createElement("h5",``);
        error.setAttribute("id","error");

        createInputs("text","username","Username","Username",form);
        createInputs("date","date","Date","Date",form);
        createInputs("number","npeople","Number","NumberPeople",form);
        form.append(submitButton);
        
        const url = "http://localhost:3005/api/booking";
        form.addEventListener("submit", (e)=>{
            e.preventDefault();
            const username = document.getElementById("username").value;
            const date = document.getElementById("date").value.split("-").join("").substring(2).toString();
            const npeople = document.getElementById("npeople").value.toString();
            const id = acc_id.toString();

            let body = {
                acc_id: id,
                theDate: date,
                username: username,
                npeople: npeople
            };

            fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                 'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
              }).then(response => response.json()).then(response => {
                if(typeof response === "object"){
                    if(response[Object.keys(response)[0]].msg.hasOwnProperty('errmsg')){
                        document.getElementById("error").innerHTML=`<h5 class="py-2">${response[Object.keys(response)[0]].msg.errmsg} </h5>`;
                    }else {
                        document.getElementById("error").innerHTML=`<h5 class="py-2">${response[Object.keys(response)[0]].msg} </h5>`;
                    }
                  }else if (typeof response === "string"){
                    document.getElementById("error").innerHTML=`<h5 class="py-2">${response}</h5>`;
                    form.style.display = "none";
                  }
              }).catch(e => console.log(e));
        });

        const elemntsArray = [h2,a,form,error,checkAvailable];
        appendMultiple(popup, elemntsArray);

        marker.bindPopup(popup);
    }

    createMarkers(map,data) {

        const typeIcon = L.Icon.extend({
            options: {
                iconSize:     [32, 32],
                iconAnchor:   [22, 94],
                shadowAnchor: [4, 62],
                popupAnchor:  [-3, -76]
            }
        });

        let hotel = new typeIcon({iconUrl: '../images/hostel.png'}),
            camp = new typeIcon({iconUrl: '../images/bonfire.png'}),
            pub = new typeIcon({iconUrl: '../images/beer.png'}),
            bAndB = new typeIcon({iconUrl: '../images/bed.png'})

        data.map(place => {
            let marker = "";
            if(place.type === "hotel") {
                marker = L.marker([place.latitude,place.longitude], {icon:hotel}).addTo(map);
            }else if(place.type === "campsite"){
                marker = L.marker([place.latitude,place.longitude], {icon:camp}).addTo(map);
            }else if(place.type === "BandB"){
                marker = L.marker([place.latitude,place.longitude], {icon:bAndB}).addTo(map);
            }else if(place.type === "pub"){
                marker = L.marker([place.latitude,place.longitude], {icon:pub}).addTo(map);
            }

            this.createCustomPopup(marker,place._id,place.name);

        });

       map.flyTo([data[0].latitude, data[0].longitude], 10);
    }

    getCoordinates () {
        map = L.map("map");
        this.mapDetails(map);

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition (
                gpspos=> {
                    this.setState({lat:gpspos.coords.latitude, long:gpspos.coords.longitude});
                    this.createMap(map,this.state.lat,this.state.long);
                    const marker = L.marker([this.state.lat,this.state.long]).addTo(map);
                    marker.bindPopup("Your Location");
                },
                err => {
                     this.createMap(map,this.state.lat,this.state.long);
                    if(err.code === 1){
                        alert(`Permission denied`);
                    }else if (err.code === 2){
                        alert(`Current Position Unavailable`);
                    }else if (err.code === 2){
                        alert(`Request took too long`);
                    }
                }
            );
        }
        else{
            alert("Sorry, geolocation not supported in this browser");
             this.createMap(map,this.state.lat,this.state.long);
        }
    }

    componentDidMount() {
        this.getCoordinates();
    }
    render() {

    
        const data = this.props.data
        if(data && typeof data === "object"){
            if(data.hasOwnProperty('location') !== true && data.hasOwnProperty('type') !== true && data.hasOwnProperty('error') !== true){
                this.createMarkers(map,data);
            }
        }
        return (
            <div>
            <div id="canvas" className="d-none" >
                <Canvas key={this.state.name} value={false} name={this.state.name} acc_id={this.state.accId || 1} />
            </div>
            <div className="container py-4">
                <div className="row">
                    <div className="col-12">
                        <div id="map"></div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Map

