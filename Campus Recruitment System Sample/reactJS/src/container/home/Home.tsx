import * as React from "react";
import { connect } from "react-redux";
import { browserHistory, Link } from 'react-router'; // http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
// import NgoAction from "./../../store/action/ngo";

interface IHomeProps extends React.Props<any> {
    activeUser: any;
    location: { query: any };
    getqNgos: (limit: number, str: string) => void;
};

function mapStateToProps(state: any) {
    return {
        activeUser: state.memberReducer['activeUser'],
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        // getqNgos: (limit: number, qstr: string): void => dispatch(NgoAction.get(limit, qstr)),
    };
}


export class Home extends React.Component<IHomeProps, void> {

    style = {
        vcenter: {
            display: 'flex',
            'alignItems': 'center',
            'justifyContent': 'center',
            textAlign: 'center',
            marginTop: '20vh'
        },
        marginTop50px: {
            marginTop: "50px"
        },
        marginTop20px: {
            marginTop: "20px"
        },
        marginRight20px: {
            marginRight: "20px"
        },
        marginBottom15px: {
            marginBottom: "15px"
        },
        fontSize18px: {
            fontSize: "18px"
        }
    }

    constructor() {
        super();
    }

    componentWillMount() {
        // console.log(this.props['location']['pathname'])
    }

    componentDidMount() { }

    componentWillReceiveProps() { }

    isAdmin() {
        return (
            <div className="container-fluid">
                Hello Admin
                <div className="row">
                    <div className="col-md-4">
                        <h3>Students</h3>
                        <hr />
                    </div>
                    <div className="col-md-4">
                        <h3>Vacancies</h3>
                        <hr />
                    </div>
                    <div className="col-md-4">
                        <h3>Comapnies</h3>
                        <hr />
                    </div>
                </div>
            </div>
        );
    }

    isStudent() {
        return (<div>  Hello Student </div>);
    }

    isCompany() {
        return (<div>  Hello Company </div>);
    }

    checkType() {
        if (this.props.activeUser && this.props.activeUser.type == 'admin') {
            return this.isAdmin();
        } else if (this.props.activeUser && this.props.activeUser.type == 'student') {
            return this.isStudent();
        } else if (this.props.activeUser && this.props.activeUser.type == 'company') {
            return this.isCompany();
        } else {
            return (<div>What are you doing here!</div>);
        }
    }

    render() {
        return this.checkType()
    } // render
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
