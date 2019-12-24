import React from 'react';
class Result extends React.Component {

    clickedOnPanel (e){
        const panel = e.currentTarget;
        this.props.passBackAccId(panel.id);
    }

    clickedOnAvailability (e){
        const panel = e.currentTarget;
        this.props.passBackAccAvailability(panel.id, panel.getAttribute("name"));
    }

    render() {
        const output = this.props.name;
        const value = this.props.value;
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
                                <div className="col-md-6 py-3 my-3" key={`${place._id}`}>
                                    <div onClick={this.clickedOnPanel.bind(this)} id={`${place._id}`} className="col-12 py-3 my-3 text-center mx-auto panels"> 
                                        <div> <h4> <span className="tagName"> Name:</span> {place.name} </h4> </div>
                                        <div><h4> <span className="tagName">Description: </span> {place.description} </h4> </div>
                                        <div><h4> <span className="tagName"> Type: </span> {place.type}  </h4> </div>
                                    </div>
                                    {value ?
                                    <div className="col-12 py-2 availability" id={`${place._id}`} name={place.name} onClick={this.clickedOnAvailability.bind(this)}>
                                        <a> Check Availability</a>
                                    </div> : ""
                                    }
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