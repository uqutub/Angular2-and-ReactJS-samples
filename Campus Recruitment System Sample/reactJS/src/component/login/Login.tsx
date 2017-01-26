import * as React from "react";
import { connect } from "react-redux";
import { Link, Router } from "react-router";

import { ILoginCompProps } from '../../model';

interface IState {
    email: string;
    password: string
}
export default class LoginComponent extends React.Component<ILoginCompProps, any> {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
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
            <div>
                <form noValidate>
                    <h1>Signin!</h1>
                    <hr />
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={this.handlerInput} autoComplete="off" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" id="pwd" name="password" onChange={this.handlerInput} autoComplete="off" />
                    </div>
                    <div>
                        <button type="button" className="btn btn-default" onClick={() => { this.props.click(this.state) } }>Login</button>
                        <span className="pull-right"><Link className="nav-link" to="/signup">Register Account?</Link></span>
                    </div>
                </form>
            </div>
        );
    }
}