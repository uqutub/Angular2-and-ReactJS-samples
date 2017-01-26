import * as React from "react";
import SignupComponent from "./../../component/signup/Signup";
import { connect } from "react-redux";
import MembersAction from "./../../store/action/member";

interface IRMemberProps extends React.Props<any> {
    signup: (obj: Object) => void;
}

function mapDispatchToProps(dispatch: any) {
    return {
        signup: (data: Object): void => dispatch(MembersAction.signup(data))
    };
}
class Signup extends React.Component<IRMemberProps, any> {

    constructor() {
        super();
        this.onSignupClick = this.onSignupClick.bind(this)
    }

    onSignupClick(state: any) {
        this.props.signup(state)
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-2">
                        <SignupComponent click={this.onSignupClick} />
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(null, mapDispatchToProps)(Signup);