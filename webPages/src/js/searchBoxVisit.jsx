import React from 'react';

class Search extends React.Component {

    searchOnClick() {
        const search = document.getElementById("search").value; 
        
        fetch(`http://localhost:3005/api/location/Hampshire/${search}`).then(response => response.json()).then(response => {
            this.props.passBackUserInput(response); 
        }).catch(e => console.log(e));

    }
    render() {
        return (
            <div className="container py-4"> 
                <div className="row">
                    <div className="col-md-10 mx-auto">
                       
                        <div className="form-group text-center">
                            <h3>Enter the Location type</h3>
                            <input type="text" className="form-control mt-3" id="search" placeholder="Location Type" />
                        </div>
                        <div className="text-center pt-2">
                            <button onClick={this.searchOnClick.bind(this)} className="btn btn-lg btn-outline-primary w-50 text-center"> Find </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        ); 
    }
}
export default Search;
