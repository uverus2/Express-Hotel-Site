import React, { Component } from 'react';

class Header extends React.Component {
    render() {
        return (
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-3 text-center text-md-left">
                        <h2>{this.props.serviceName}</h2>
                    </div>
                    <div className="col-md-9 text-center text-md-right">
                        <h2>Welcome to our Service</h2>
                    </div>
                </div>
            </div>
        ); 
    }
}
export default Header;
