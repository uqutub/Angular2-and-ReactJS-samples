import * as React from "react";
import { Link } from "react-router";
import { Navbar } from "./../../component/index";
import MembersAction from "./../../store/action/member";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch: any) {
    return {
        isLoggedin: (): void => dispatch(MembersAction.isLoggedin())
    };
}

// note: React.Component<Properties/Props, component-state>
class App extends React.Component<any, any> {

    constructor() {
        super();

        this.state = {
            isQueryPage: false
        }
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        setTimeout(() => {
            this.props.isLoggedin()
        }, 10)
    }

    changeStatusHandler(isQueryPage: boolean) {
        console.log("-----------------------------------==========", isQueryPage)
        this.setState({
            isQueryPage
        })
    }

    render() {
        return (
            <div>
                <Navbar isQueryPage={this.state.isQueryPage} changeStatus={this.changeStatusHandler} />
               
                {/* add this for show routes*/}
                <div style={{ marginTop: '10vh' }}>
                    {this.props.children}
                </div>
            </div>
        )

    }
}


export default connect(null, mapDispatchToProps)(App)