import * as React from "react";

export default class AdminDashboard extends React.Component<{}, {}> {
    constructor() {
        super();
        console.log("--AdminDashboard--")
    }
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

}