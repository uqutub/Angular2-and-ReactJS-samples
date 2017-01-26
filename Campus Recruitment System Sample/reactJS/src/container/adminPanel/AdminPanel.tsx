import * as React from "react";
import { Link } from "react-router";

// import LoginComponent from '../../component/login/Login';

export default class AdminPanel extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <h1>Hello Admin How are you!</h1>
                <Link to="/adminpanel"><span className="glyphicon glyphicon-user"></span> Admin</Link>
                {this.props.children}
            </div>
        );
    }
}