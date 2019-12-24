import React from 'react';
import { create } from 'domain';

class Result extends React.Component {

    render() {
        const output = this.props.name;
        if(typeof output !== "undefined" && typeof output === "object") {
            if (output.hasOwnProperty('location') || output.hasOwnProperty('type')){
                    const value = output.hasOwnProperty('location') ? "location" : "type";
                    const message = output[value].msg;
                return (
                    <div className="container py-4">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h2> {message} </h2>
                            </div>
                        </div>
                    </div>
                   
                )
            }else if (output.hasOwnProperty('error')){
                return ( 
                    <div className="container py-4">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h2> Nothing Found </h2>
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div id="panel-container" className="container py-4">
                        <div className="row">
                            {output.map(place => {
                                return (
                                <div id={`${place._id}`} key={`${place._id}`} className="col-md-5 py-3 my-3 text-center mx-auto panels"> 
                                    <div> <h4> <span className="tagName"> Name:</span> {place.name} </h4> </div>
                                    <div><h4> <span className="tagName">Description: </span> {place.description} </h4> </div>
                                    <div><h4> <span className="tagName"> Type: </span> {place.type}  </h4> </div>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                )
        }
        
    }else if (typeof output === "string") {
        
        return( 
            <div className="container py-4">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2> {output} </h2>
                        </div>
                </div>
            </div>
        )
    }
    else {
        return (
        <div> </div>   
        );
    }
       
    }
}

export default Result