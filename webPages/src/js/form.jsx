import React from 'react';

class BookingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            username : "",
            number:"1",
            date:""
        };

        this.handleUsername = this.handleUsername.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleNumberOfPeople = this.handleNumberOfPeople.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleUsername(e){
        this.setState({username:e.target.value});
    }

    handleDate(e){
        this.setState({date:e.target.value});
    }
    handleNumberOfPeople(e){
        this.setState({number:e.target.value});
    }

    handleFormSubmit(e){
        e.preventDefault();
        
        const number = this.state.number <= 0 ? 1 : this.state.number;

        let body = {
            acc_id: this.props.acc_id.toString(),
            theDate: this.state.date.split("-").join("").substring(2).toString(),
            username: this.state.username,
            npeople: number.toString(),
        };

        const url = "http://localhost:3005/api/booking";

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
                    document.getElementById("error").innerHTML=`<h2>${response[Object.keys(response)[0]].msg.errmsg} </h2>`;
                }else {
                    document.getElementById("error").innerHTML=`<h2>${response[Object.keys(response)[0]].msg} </h2>`;
                }
              }else if (typeof response === "string"){
                document.getElementById("form").style.display = "none";
                const onSuccess = document.getElementById("onFormCompletion");
                onSuccess.classList.remove("d-none");
                onSuccess.innerHTML = `<h2>${response} </h2>`;
                const timer = document.getElementById("countdowntimer");
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
                }).catch(e => {
                    console.log(e);
                });
    }
    render() {
        return(
        <div>
            <h3 className="d-none">The page will refresh in:<span id="countdowntimer">3</span></h3>
            <div id="onFormCompletion" className="d-none text-center py-2"></div>
            <form id="form" onSubmit={this.handleFormSubmit}> 
            <div id="error" className="text-center py-2">  </div>
            <div className="form-group">
                <label> Username</label>
                <input type="text" className="form-control" value={this.state.username} onChange={this.handleUsername} required/>
            </div>
            <div className="form-group">
                <label>Number of people</label>
                <input type="number" className="form-control" value={this.state.number} onChange={this.handleNumberOfPeople} required/>
            </div>
            <div className="form-group">
                <label>Booking Date</label>
                <input type="date" className="form-control" value={this.state.date} onChange={this.handleDate} required/>
            </div>
            <input  type="hidden" value={this.props.acc_id} />
            <button type="submit" className="btn btn-primary">Book Now</button>
            </form>
        </div>
        );
        
    }
}

export default BookingForm