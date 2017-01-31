import * as React from "react";
import { Link } from "react-router";

class SignupComponent extends React.Component<any, any>{

    constructor() {
        super();
        this.state = {
            cuid: "",
            fname: "",
            lname: "",
            type: "student",
            eml: "",
            contact: "",
            // address: "",
            pwd: ""
        };

        this._onSubmit = this._onSubmit.bind(this);
        this.handlerInput = this.handlerInput.bind(this);

        setTimeout(() => {
            console.log('this.props.authenticUser ', this.props.authenticUser);
        }, 5000)
    }

    handlerInput(e: any) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    _onSubmit(e: any) {
        e.preventDefault();
        console.log(this.state, this.state.cuid.length)
        if (this.state.cuid.length <= 4) {
            alert('Pls User Id, max length 4')
        } else if (this.state.fname.length <= 3) {
            alert('Pls First Name')
        } else if (this.state.lname.length <= 3) {
            alert('Pls Last Name')
        } else if (this.state.eml.length <= 5) {
            alert('Pls Email Id')
        } else if (this.state.contact.length <= 7) {
            alert('Pls Contact, mix length 7')
        } else if (this.state.pwd.length <= 5) {
            alert('Pls Pwd, max length should be 5')
        } else {
            this.props.click(this.state);
        }

    }

    render() {
        return (
            <form noValidate onSubmit={this._onSubmit}>
                <h1>Signup!</h1>
                <hr />
                {
                    this.props.authenticUser.type == "admin" &&
                    <div className="form-group">
                        <label htmlFor="cuid">Type:</label>
                        <select name="type" id="type" className="form-control" onChange={this.handlerInput}>
                            <option value="student">Student</option>
                            <option value="company">Company</option>
                        </select>
                    </div>
                }
                <div className="form-group">
                    <label htmlFor="cuid">Username:</label>
                    <input type="text" className="form-control" id="cuid" name="cuid" onChange={this.handlerInput} autoComplete="off" required />
                </div>
                <div className="form-group">
                    <label htmlFor="fname">firstName:</label>
                    <input type="text" className="form-control" id="fname" name="fname" onChange={this.handlerInput} autoComplete="off" required />
                </div>
                <div className="form-group">
                    <label htmlFor="lname">lastName:</label>
                    <input type="text" className="form-control" id="lname" name="lname" onChange={this.handlerInput} autoComplete="off" required />
                </div>
                <div className="form-group">
                    <label htmlFor="contact">Contact:</label>
                    <input type="text" className="form-control" id="contact" name="contact" onChange={this.handlerInput} autoComplete="off" required />
                </div>
                {/*<div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" className="form-control" id="address" name="address" onChange={this.handlerInput} autoComplete="off" />
                </div>*/}
                <div className="form-group">
                    <label htmlFor="eml">Email address:</label>
                    <input type="email" className="form-control" id="eml" name="eml" onChange={this.handlerInput} autoComplete="off" />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password" className="form-control" id="pwd" name="pwd" onChange={this.handlerInput} autoComplete="off" />
                </div>
                <div>
                    <input type="submit" value="Signup" className="btn btn-default" name="register" />
                    <span className="pull-right"><Link className="nav-link" to="/login">Login?</Link></span>
                </div>
            </form>
        )
    }
}

export default SignupComponent;