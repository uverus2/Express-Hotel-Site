import React, { Component } from 'react';
import Header from './header.jsx';
import Hero from './hero.jsx';
import Search from './searchBox.jsx';
import Result from './result.jsx';
import Map from './leafletMap.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            serviceName : "Places to Stay",
            clickValue: props.name
        };
    }

    updateOnClick(name) {
        this.setState({clickValue: name});
    }
    render() {

        return (
            <div>
                <Header serviceName={this.state.serviceName}/>
                <Hero/>
                <Map data={this.state.clickValue}/>
                <Search passBackUserInput={this.updateOnClick.bind(this)}/>
                <Result value={false} name={this.state.clickValue}/>
            </div>
        );
    }
}

export default App;