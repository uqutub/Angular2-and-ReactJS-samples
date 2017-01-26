import * as React from "react";
import { Link } from "react-router";

class SignupComponent extends React.Component<any, any>{
    constructor() {
        super();
        this.state = {
            username: "",
            firstName: "",
            lastName: "",
            type: "user",
            email: "",
            contact: "",
            address: "",
            age: "",
            NIC: "",
            password: "",
            location: { lat: 0, lng: 0 },
            dated: Date.now()
        }
        this.handlerInput = this.handlerInput.bind(this);
    }
    handlerInput(e: any) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <form noValidate>
                <h1>Signup!</h1>
                <hr />
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" className="form-control" id="username" name="username" onChange={this.handlerInput} autoComplete="off" />
                </div>
                <div className="form-group">
                    <label htmlFor="fstName">firstName:</label>
                    <input type="text" className="form-control" id="fstName" name="firstName" onChange={this.handlerInput} autoComplete="off" />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">lastName:</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" onChange={this.handlerInput} autoComplete="off" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address:</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={this.handlerInput} autoComplete="off" />
                </div>
                <div className="form-group">
                    <label htmlFor="contact">Contact:</label>
                    <input type="text" className="form-control" id="contact" name="contact" onChange={this.handlerInput} autoComplete="off" />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" className="form-control" id="address" name="address" onChange={this.handlerInput} autoComplete="off" />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input type="number" className="form-control" id="age" name="age" onChange={this.handlerInput} autoComplete="off" />
                </div>
                <div className="form-group">
                    <label htmlFor="nic">NIC:</label>
                    <input type="text" className="form-control" id="nic" name="NIC" onChange={this.handlerInput} autoComplete="off" />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password" className="form-control" id="pwd" name="password" onChange={this.handlerInput} autoComplete="off" />
                </div>

                <div>
                    <button type="button" className="btn btn-default" onClick={() => { this.props.click(this.state) } }>Signup</button>
                    <span className="pull-right"><Link className="nav-link" to="/login">Login?</Link></span>
                </div>
            </form>
        )
    }
}

export default SignupComponent;