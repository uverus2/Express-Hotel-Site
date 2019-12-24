import React, { Component } from 'react';
import Header from './header.jsx';
import Hero from './hero.jsx';
import Search from './searchBoxVisit.jsx';
import Result from './result.jsx';
import BookingForm from './form.jsx';
import Canvas from './availability.jsx';

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
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            serviceName : "Visit Hampshire",
            clickValue: props.name,
            accId:props.id,
            name:""
        };
    }


    updateOnClick(name) {
        this.setState({clickValue: name});
    }

    grabIdOnClick(id) {
        this.setState({accId: id});
        const allPanels = document.querySelector("#panel-container").style.display = "none";
        document.getElementById("canvas").style.display = "none";
        document.getElementById("form-container").classList.remove("d-none");
    }

    grabIdOnAvailabilityID(id,name) {
        this.setState({accId: id, name:name});
        const canvasBody = document.getElementById("canvas");
        canvasBody.classList.remove("d-none");
    }
    render() {
        return (
            <div>
                <Header serviceName={this.state.serviceName}/>
                <Hero/>
                <Search passBackUserInput={this.updateOnClick.bind(this)}/>
                <div id="canvas" className="d-none">
                    <Canvas key={this.state.name} name={this.state.name} acc_id={this.state.accId || 1} />
                </div>
                <Result name={this.state.clickValue} value={true} passBackAccId={this.grabIdOnClick.bind(this)} passBackAccAvailability={this.grabIdOnAvailabilityID.bind(this)}/>
                <div className="container py-4">
                    <div className="row">
                        <div id="form-container" className="col-12 d-none">
                            <BookingForm acc_id={this.state.accId || 0 }/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;