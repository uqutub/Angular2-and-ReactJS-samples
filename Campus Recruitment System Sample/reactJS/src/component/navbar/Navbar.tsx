import * as React from "react";
import { Link } from "react-router";

export default class Navbar extends React.Component<any, any> {

    constructor() {
        super();
    }

    componentDidMount() {
        // console.log('componentDidMount() ', this.props.isAuthenticated)
    }

    componentWillReceiveProps() { }

    // <li className="nav-item" onClick={this.props.logout}><Link className="nav-link" to="/logout"><span className="glyphicon glyphicon-log-in"></span> Logout</Link></li>

    // _flag = true;
    // ifLoggedIn() {
    //     console.log('ifLoggedIn')
    //     if (this.props.isAuthenticated && this._flag) {
    //         this._flag = false;
    //         return (
    //             <div>
    //                 <ul className="nav navbar-nav float-xs-right">
    //                     <li className="nav-item" onClick={this.props.logout}> Logout</li>
    //                 </ul>
    //             </div>
    //         )
    //     } else if(this.props.isAuthenticated && !this._flag) {
    //         this._flag = true;
    //         return (
    //             <div>
    //                 <ul className="nav navbar-nav float-xs-right">
    //                     <li className="nav-item"><Link className="nav-link" to="/signup"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
    //                     <li className="nav-item"><Link className="nav-link" to="/a"><span className="glyphicon glyphicon-user"></span> Admin</Link></li>
    //                     <li className="nav-item"><Link className="nav-link" to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
    //                 </ul>
    //             </div>
    //         )
    //     }
    // }

    render() {
        return (
            <nav className="navbar navbar-fixed-top navbar-light bg-faded" style={{ backgroundColor: '#e3f2fd' }}>
                <Link className="navbar-brand" to="/home">CRS</Link>
                <ul className="nav navbar-nav">
                    {
                        this.props.isAuthenticated &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Register Member</Link>
                        </li>
                    }
                </ul>
                {
                    this.props.isAuthenticated &&
                    <ul className="nav navbar-nav float-xs-right">
                        <li className="nav-item" onClick={this.props.logout}> Logout</li>
                    </ul>
                }
                {
                    !this.props.isAuthenticated &&
                    <ul className="nav navbar-nav float-xs-right">
                        <li className="nav-item"><Link className="nav-link" to="/signup"><span className="glyphicon glyphicon-user"></span> Sign-up</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/login"><span className="glyphicon glyphicon-log-in"></span> Sign-in</Link></li>
                    </ul>
                }
            </nav>
        );
    }
}