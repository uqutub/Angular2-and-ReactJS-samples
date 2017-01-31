import * as React from "react";
import { connect } from "react-redux";
import { browserHistory } from 'react-router';

import SignupComponent from "./../../component/signup/Signup";
import AuthActions from "./../../store/action/auth";

interface IRMemberProps extends React.Props<any> {
    signup: (obj: Object) => void;
    isRegistered: boolean;
    activeUser: any;
    counterReg: any
}

function mapStateToProps(state: any) {
    return {
        isRegistered: state.AuthReducer['isRegistered'],
        activeUser: state.AuthReducer['activeUser'],
        counterReg: state.AuthReducer['counterReg']
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        signup: (data: Object): void => dispatch(AuthActions.signup(data))
    };
}
class Signup extends React.Component<IRMemberProps, any> {

    constructor() {
        super();
        this.onSignupClick = this.onSignupClick.bind(this);
    }

    onSignupClick(state: any) {
        this.props.signup(state);
    }

    _flag = true;
    componentWillReceiveProps() {
        setTimeout(() => {
        console.log('propsssssss................ ', this.props)
            if (this.props.counterReg > 0 && this.props.activeUser.type == 'admin') {
                browserHistory.push('/home');
            } 
            if (this.props.isRegistered && this._flag && this.props.activeUser.type != 'admin') {
                this._flag = false;
                browserHistory.push('/login');
            } else if (!this.props.isRegistered && !this._flag) {
                this._flag = true;
            }
        }, 5);
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-2">
                        <SignupComponent click={this.onSignupClick} authenticUser={this.props.activeUser} />
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);