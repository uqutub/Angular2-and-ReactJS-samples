import * as React from "react";
import { Link } from "react-router";

export default class Navbar extends React.Component<any, any> {

    componentWillReceiveProps() {
    }

    render() {
        return (
            <nav className="navbar navbar-fixed-top navbar-light bg-faded" style={{ backgroundColor: '#e3f2fd' }}>
                <Link className="navbar-brand" to="/home">CRS</Link>
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to='/a/ngo'>Create Ngo</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/a/list-ngo">List Ngo</Link>
                    </li>
                </ul>
                <ul className="nav navbar-nav float-xs-right">
                    <li className="nav-item"><Link className="nav-link" to="/signup"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/a"><span className="glyphicon glyphicon-user"></span> Admin</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            </nav>
        );
    }
}