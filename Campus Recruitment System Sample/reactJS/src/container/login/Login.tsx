import * as React from "react";
import { connect } from "react-redux";
import { browserHistory } from 'react-router';

import LoginComponent from '../../component/login/Login';
import MembersAction from "./../../store/action/member";

interface IRMemberProps extends React.Props<any> {
    login: (obj: Object) => void;
    isAuthenticated: boolean;
}

function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.memberReducer['isAuthenticated'],
    };
}
function mapDispatchToProps(dispatch: any) {
    return {
        login: (data: Object): void => dispatch(MembersAction.login(data))
    };
}


class Login extends React.Component<IRMemberProps, any> {
    constructor() {
        super();
        this.onLoginClick = this.onLoginClick.bind(this)
    }

    onLoginClick(state: any) {
        this.props.login(state);
    }

    componentWillReceiveProps() { 
        setTimeout(()=>{
            if(this.props.isAuthenticated) {
                browserHistory.push('/home');
            }
        }, 0);
    }

    render() {
        return (
            <div className="container">
                <div className="row col-md-5 offset-md-3">
                    <LoginComponent click={this.onLoginClick} />
                </div>
            </div>
        );
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Login)