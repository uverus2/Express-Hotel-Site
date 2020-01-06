import React from 'react';
import ReactDOM from "react-dom";

let dateVariable = "";

class Shapes {
    constructor(x, y, stroke, strokeColor, fillColor) {
        this.x = x;
        this.y = y;
        this.stroke = stroke;
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
    }
};

class Text extends Shapes {
    constructor(text, baseline, font, x, y, stage) {
        super(x, y);
        this.text = text;
        this.baseline = baseline;
        this.font = font;
        this.stage = stage;
    }
    textCreate() {
        const text = new createjs.Text(`${this.text}`, `${this.font}`, "#000000");
        text.x = this.x;
        text.y = this.y;
        text.textBaseline = this.baseline;
        text.textAlign = "center";
        this.stage.addChild(text);
    }
};

class Rect extends Shapes {
    constructor(x, width, y, height, stroke, strokeColor, fillColor, stage) {
        super(x, y, stroke, strokeColor, fillColor);
        this.width = width;
        this.height = height;
        this.stage = stage;
    }

    createRect() {
        const rect = new createjs.Shape();
        rect.graphics.setStrokeStyle(this.stroke, "round").beginStroke(`${this.strokeColor}`).beginFill(`${this.fillColor}`);
        rect.graphics.drawRect(this.x, this.y, this.width, this.height);
        rect.graphics.endFill();
        this.stage.addChild(rect);
    }
};

class CalendarElement {
    constructor(containerX, containerY, stage, date,spaces) {
        this.containerX = containerX;
        this.containerY = containerY;
        this.stage = stage;
        this.date = date;
        this.spaces = spaces;
    }
    createCalendarComponent() {
        const container = new createjs.Container();

        if (this.spaces <= 0) {
            const horizon = new Rect(0, 50, 0, 50,1, "#000", "red", container);
            horizon.createRect();
        }else {
            const horizon = new Rect(0, 50, 0, 50,1, "#000", "green", container);
            horizon.createRect();
        }
        

        const name = new Text(`Date`, "alphabetic", "10px Georgia", 25, 12, container);
        name.textCreate();

        const dateText = new Text(`${this.date}`, "alphabetic", "10px Georgia", 25, 23, container);
        dateText.textCreate();

        const title = new Text(`Availability`, "alphabetic", "9px Georgia", 25, 35, container);
        title.textCreate();

        const number = new Text(`${this.spaces}`, "alphabetic", "10px Georgia", 25, 46, container);
        number.textCreate();

        const date = this.date;

        container.addEventListener("click", (event) => {
            dateVariable = date.split("/").reverse().join("");
            document.getElementById("formAvailable").classList.remove("d-none");
        });

        container.x = this.containerX;
        container.y = this.containerY;
        this.stage.addChild(container);
    }
};


class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:props.name,
            acc_id: props.acc_id,
            username: "",
            number: ""
        };

        this.handleUsername = this.handleUsername.bind(this);
        this.handleNumberOfPeople = this.handleNumberOfPeople.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        
    }

    handleUsername(e){
        this.setState({username:e.target.value});
    }

    handleNumberOfPeople(e){
        this.setState({number:e.target.value});
    }

    handleFormSubmit(e){
        e.preventDefault();
        
        const number = this.state.number <= 0 ? 1 : this.state.number;

        let body = {
            acc_id: this.props.acc_id.toString(),
            theDate: dateVariable.toString(),
            username: this.state.username,
            npeople: number.toString(),
        };

        const url = apiLocalHost + "api/booking";

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
                    document.getElementById("errorTwo").innerHTML=`<h2>${response[Object.keys(response)[0]].msg.errmsg} </h2>`;
                }else {
                    document.getElementById("errorTwo").innerHTML=`<h2>${response[Object.keys(response)[0]].msg} </h2>`;
                }
              }else if (typeof response === "string"){
                document.getElementById("bookingAvailabilitySection").style.display = "none";
                const onSuccess = document.getElementById("onFormCompletionTwo");
                onSuccess.classList.remove("d-none");
                onSuccess.innerHTML = `<h2>${response} </h2>`;
                
                
                if (this.props.value){
                    const timer = document.getElementById("countdowntimerTwo");
                    timer.parentElement.classList.remove("d-none");

                    let timeleft = 5;
                        const downloadTimer = setInterval(() => {
                        timeleft = timeleft - 1 ;
                        timer.textContent = timeleft;
                        if(timeleft <= 0){
                        clearInterval(downloadTimer)
                        };
                        },1000);

                    
                    setTimeout(()=>{
                        location.reload();
                    },5000);
                }
            }
                }).catch(e => {
                    console.log(e);
                });
    }

    createCalendar() {
        var canvas = ReactDOM.findDOMNode(this.refs.canvas);
        canvas.style.backgroundColor = "#fff";
        canvas.width = canvas.height * 
        (canvas.clientWidth / canvas.clientHeight);
        canvas.height = canvas.clientHeight / 3;

        this.stage = new createjs.Stage(canvas);

        fetch(`${apiLocalHost}api/availability/${this.state.acc_id}`).then(response => response.json()).then(response => {
          
            
            const plotDates = [
                [5,25],
                [60,25],
                [115,25],
                [170,25],
                [225,25],
                [280,25],
                [335,25],
                [390,25],
                [5,80],
                [60,80],
                [115,80],
                [170,80],
                [225,80],
                [280,80],
                [335,80],
                [390,80],
                [5,135],
                [60,135],
                [115,135],
                [170,135],
              ];

           const dates = response.map(i => {
               return i.thedate
           });

           const availability = response.map(i => {
                return i.availability
            });

        
            let i = -1;
            plotDates.map(plot => {
                i++
                plot.push(dates[i]);
                plot.push(availability[i]);

            });

              let calendarElement; 

              plotDates.map(i => {
                  calendarElement = new CalendarElement(i[0],i[1],this.stage,i[2].substring(4,6) + "/" + i[2].substring(2,4) + "/" + i[2].substring(0,2),i[3] );
                  calendarElement.createCalendarComponent();
              });
      
              const date = new Text(`${this.props.name}`, "alphabetic", "15px Georgia", canvas.width/2, 15, this.stage);
              date.textCreate();

              this.stage.update(); // end of promise
        }).catch(e => console.log(e));

    } // end of create function

    componentDidMount(){
        this.createCalendar();
    }
   
    render (){
        return(
            <div className="container-fluid py-4" id="canvasBody">
                <div id="onFormCompletionTwo" className="d-none text-center py-2"></div>
                <h3 className="d-none text-center">The page will refresh in:<span id="countdowntimerTwo">3</span></h3>
                <div className="row h-100 mx-auto" id="bookingAvailabilitySection">
                    <div className="col-12">
                        <canvas ref="canvas" id="calendar">  </canvas>
                    </div>
                    <div className="col-md-9 mx-auto">
                    <form id="formAvailable" className="d-none" onSubmit={this.handleFormSubmit}> 
                        <div id="errorTwo" className="text-center py-2">  </div>
                        <div className="form-group">
                            <label> Username</label>
                            <input type="text" className="form-control" value={this.state.username} onChange={this.handleUsername} required/>
                        </div>
                        <div className="form-group">
                            <label>Number of people</label>
                            <input type="number" className="form-control" value={this.state.number} onChange={this.handleNumberOfPeople} required/>
                        </div>
                        <input  type="hidden" value={this.props.acc_id} />
                        <button type="submit" className="btn btn-primary">Book Now</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Canvas