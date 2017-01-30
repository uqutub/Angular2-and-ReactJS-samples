import * as React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { browserHistory } from 'react-router';
import { Navbar } from "./../../component/index";
import AuthActions from "./../../store/action/auth";

// for isLoggedin Property from REDUX
function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.AuthReducer['isAuthenticated'],
    };
}

// for call isLoggedin
function mapDispatchToProps(dispatch: any) {
    return {
        isLoggedin: (): void => dispatch(AuthActions.isLoggedin()),
        logout: (): void => dispatch(AuthActions.logout())
    };
}

// note: React.Component<Properties/Props, component-state>
class App extends React.Component<any, any> {

    constructor() {
        super();
        setTimeout(() => {
            this.props.isLoggedin()
        }, 5)
        this.logoutFunc = this.logoutFunc.bind(this);
    }


    _flag = true;
    componentWillReceiveProps() { 
        setTimeout(()=>{
            if(!this.props.isAuthenticated && this._flag) {
                this._flag = false;
                browserHistory.push('/login');
            } else if(this.props.isAuthenticated && !this._flag) {
                this._flag = true;
            }
        }, 5);
    }

    logoutFunc() {
        this.props.logout();
    }

    render() {
        return (
            <div>
                <Navbar isAuthenticated={this.props.isAuthenticated} logout={this.logoutFunc} />
                {/* add this for show routes*/}
                <div style={{ marginTop: '10vh' }}>
                    {this.props.children}
                </div>
            </div>
        )

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)