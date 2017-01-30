import * as React from "react";
import { connect } from "react-redux";
import { browserHistory } from 'react-router';

import LoginComponent from '../../component/login/Login';
import AuthActions from "./../../store/action/auth";

interface IRMemberProps extends React.Props<any> {
    login: (obj: Object) => void;
    isAuthenticated: boolean;
}

function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.AuthReducer['isAuthenticated'],
    };
}
function mapDispatchToProps(dispatch: any) {
    return {
        login: (data: Object): void => dispatch(AuthActions.login(data))
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

    _flag = true;
    componentWillReceiveProps() {
        setTimeout(() => {
            if (this.props.isAuthenticated && this._flag) {
                this._flag = false;
                browserHistory.push('/home');
            } else if (!this.props.isAuthenticated && !this._flag) {
                this._flag = true;
            }
        }, 10);
    }

    render() {
        return (
            <div className="container">
                <div className="row col-md-5 offset-md-3">
                    <LoginComponent click={this.onLoginClick} />
                    <br />
                    <div>
                        <label>
                            Admin: admin@admin.com -- Pwd: !admin@123
                    </label>
                        <label>
                            Student: student@level0.com -- Pwd: 123456
                    </label>
                        <label>
                            Admin: company1@level0.com -- Pwd: 123456
                    </label>
                    </div>
                </div>
            </div>
        );
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Login)