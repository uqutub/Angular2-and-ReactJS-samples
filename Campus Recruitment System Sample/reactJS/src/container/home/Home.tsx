import * as React from "react";
import { connect } from "react-redux";
import { browserHistory, Link } from 'react-router'; // http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
import StudentActions from '../../store/action/student';

interface IHomeProps extends React.Props<any> {
    activeUser: any;
    companies: any;
    vacancies: any;
    students: any;
    location: { query: any };
    applyVacant: (vacancy: Object) => void;
    addVacancy: (vacancy: Object) => void;
    updateVacancy: (vacancy: Object) => void;
    deleteVacancy: (vacancy: Object) => void;
};

function mapStateToProps(state: any) {
    return {
        activeUser: state.AuthReducer['activeUser'],
        companies: state.StudentReducer['companies'],
        vacancies: state.StudentReducer['vacancies'],
        students: state.StudentReducer['students'],
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        applyVacant: (vacancy: Object): void => dispatch(StudentActions.applyVacant(vacancy)),
        addVacancy: (vacancy: Object): void => dispatch(StudentActions.addVacancy(vacancy)),
        updateVacancy: (vacancy: Object): void => dispatch(StudentActions.updateVacancy(vacancy)),
        deleteVacancy: (vacancy: Object): void => dispatch(StudentActions.deleteVacancy(vacancy)),
    };
}


export class Home extends React.Component<IHomeProps, any> {

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
        this.state = { title: '', description: '', id: '' }
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
        // this.editFunc = this.editFunc.bind(this);
        this.clear = this.clear.bind(this);
        this.onSubmitFunc = this.onSubmitFunc.bind(this);
    }

    componentWillMount() {
        // console.log(this.props['location']['pathname'])
    }

    componentDidMount() { }

    componentWillReceiveProps() {

        // setTimeout(() => {
        //     if (Object.keys(this.props.companies).length > 0) {
        //         this.renderCompanies(this.keys(this.props.companies));
        //     }

        //     if (Object.keys(this.props.vacancies).length > 0) {
        //         this.renderVacancies(this.keys(this.props.vacancies));
        //     }
        // }, 5)
    }

    keys(obj?: Object) {
        return (obj) ? Object.keys(obj) : [];
    }

    // _companies: any;
    // renderCompanies(aRRay: any[]) {
    //     this._companies = aRRay.map((val, indx) => {
    //         console.log('sdjaskldjslaslsalajsadj ', val)
    //         return <div key={indx}>
    //             {this.props.companies[val].fname}
    //         </div>;
    //     })
    //     console.log('this._companies ------------------', this._companies)
    // }

    // _vacancies: any;
    // renderVacancies(aRRay: any[]) {
    //     this._vacancies = aRRay.map((val, indx) => {
    //         console.log('aaaaaaaaaaaaaaaaaaaaaaaa ', val)
    //         return <div key={indx}>
    //             {this.props.vacancies[val].name}
    //         </div>;
    //     })
    //     console.log('this._vacancies ------------------', this._vacancies)
    // }

    isApplied(applied: Object) {
        if (applied && this.keys(applied).length > 0) {
            return (JSON.stringify(applied).indexOf(this.props.activeUser['cuid']) != -1) ? true : false
        } else {
            return false;
        }
    }

    delStduentOrCompany(obj: Object) {
        console.log('del student......')
    }

    isAdmin() {
        return (
            <div className="container-fluid">
                <h3>Admin Dashboard</h3>
                <br />
                <div className="row">
                    <div className="col-md-4">
                        <h3>Students</h3>
                        <hr />
                        {
                            this.keys(this.props.students).map((val, indx) => {
                                return <div key={indx}>
                                    <div id="accordionS" role="tablist" aria-multiselectable="true">
                                        <div className="card">
                                            <div className="card-header" role="tab" id="headingOne">
                                                <h5 className="mb-0">
                                                    <div>
                                                        <a data-toggle="collapse" data-parent="#accordionS" href={'#s' + indx.toString()} aria-expanded="true" aria-controls="collapseOne">
                                                            {this.props.students[val].fname + ' ' + this.props.students[val].lname}
                                                        </a>
                                                        {/*<span className="pull-right text-danger" onClick={() => { this.delStduentOrCompany(this.props.students[val]) } }>
                                                            Delete
                                                        </span>*/}
                                                    </div>
                                                </h5>
                                            </div>

                                            <div id={'s' + indx.toString()} className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                <div className="card-block">
                                                    About: {this.props.students[val].desc} <br />
                                                    Year: {this.props.students[val].year} <br />
                                                    GPA: {this.props.students[val].gpa}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>;
                            })
                        }
                    </div>
                    <div className="col-md-4">
                        <h3>Vacancies</h3>
                        <hr />
                        {
                            this.keys(this.props.vacancies).map((val, indx) => {
                                return <div key={indx}>
                                    <div id="accordion" role="tablist" aria-multiselectable="true">
                                        <div className="card">
                                            <div className="card-header" role="tab" id="headingOne">
                                                <h5 className="mb-0">
                                                    <div>
                                                        <a data-toggle="collapse" data-parent="#accordion" href={'#v' + indx.toString()} aria-expanded="true" aria-controls="collapseOne">
                                                            {this.props.vacancies[val].title} <span className="text-success">{this.isApplied(this.props.vacancies[val].applied) && ' / Applied: ' + this.keys(this.props.vacancies[val].applied).length}</span>
                                                        </a>
                                                        <span className="pull-right text-danger" onClick={() => { this.delVacancy(this.props.vacancies[val]) } }>
                                                            Delete
                                                         </span>

                                                    </div>
                                                </h5>
                                            </div>

                                            <div id={'v' + indx.toString()} className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                <div className="card-block">
                                                    Desc: {this.props.vacancies[val].description} <br />
                                                    From: {this.props.vacancies[val].name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>;
                            })
                        }
                    </div>
                    <div className="col-md-4">
                        <h3>Comapnies</h3>
                        <hr />
                        {
                            this.keys(this.props.companies).map((val, indx) => {
                                return <div key={indx}>

                                    <div id="accordionc" role="tablist" aria-multiselectable="true">
                                        <div className="card">
                                            <div className="card-header" role="tab" id="headingOne">
                                                <h5 className="mb-0">
                                                    <div>
                                                        <a data-toggle="collapse" data-parent="#accordionc" href={'#c' + indx.toString()} aria-expanded="true" aria-controls="collapseOne">
                                                            {this.props.companies[val].fname}
                                                        </a>
                                                        {/*<span className="pull-right text-danger" onClick={() => { this.delStduentOrCompany(this.props.companies[val]) } }>
                                                            Delete
                                                        </span>*/}
                                                    </div>
                                                </h5>
                                            </div>

                                            <div id={'c' + indx.toString()} className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                <div className="card-block">
                                                    Contact Person: {this.props.companies[val].lname} <br />
                                                    Email:  {this.props.companies[val].eml}
                                                    {this.props.companies[val].address && this.props.companies[val].address.length > 0 && 'Address: ' + this.props.companies[val].address} <br />
                                                    {this.props.companies[val].contact && this.props.companies[val].contact.toString().length > 0 && 'Contact: ' + this.props.companies[val].contact} <br />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>;
                            })
                        }

                    </div>
                </div>
            </div>
        );
    }

    isStudent() {
        return (
            <div className="container-fluid">
                <h3>Student Dashboard</h3>
                <br />
                <div className="row">
                    <div className="col-md-6">
                        <h3>List Vacancies</h3>
                        <hr />
                        {
                            this.keys(this.props.vacancies).map((val, indx) => {
                                return <div key={indx}>
                                    <div id="accordion" role="tablist" aria-multiselectable="true">
                                        <div className="card">
                                            <div className="card-header" role="tab" id="headingOne">
                                                <h5 className="mb-0">
                                                    <div>
                                                        <a data-toggle="collapse" data-parent="#accordion" href={'#v' + indx.toString()} aria-expanded="true" aria-controls="collapseOne">
                                                            {this.props.vacancies[val].title}
                                                        </a>
                                                        <span className="text-success pull-right">{this.isApplied(this.props.vacancies[val].applied) && 'Applied'}</span>
                                                    </div>
                                                </h5>
                                            </div>

                                            <div id={'v' + indx.toString()} className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                <div className="card-block">
                                                    Desc: {this.props.vacancies[val].description} <br />
                                                    From: {this.props.vacancies[val].name}
                                                    <br />
                                                    <br />
                                                    {!this.isApplied(this.props.vacancies[val].applied) && <button className="btn btn-primary" onClick={() => { this.props.vacancies[val]['stid'] = this.props.activeUser['cuid']; this.props.applyVacant(this.props.vacancies[val]) } }>Apply</button>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>;
                            })
                        }





                    </div>
                    <div className="col-md-6">
                        <h3>List Comapnies</h3>
                        <hr />
                        {
                            this.keys(this.props.companies).map((val, indx) => {
                                return <div key={indx}>

                                    <div id="accordionc" role="tablist" aria-multiselectable="true">
                                        <div className="card">
                                            <div className="card-header" role="tab" id="headingOne">
                                                <h5 className="mb-0">
                                                    <a data-toggle="collapse" data-parent="#accordionc" href={'#c' + indx.toString()} aria-expanded="true" aria-controls="collapseOne">
                                                        {this.props.companies[val].fname}
                                                    </a>
                                                </h5>
                                            </div>

                                            <div id={'c' + indx.toString()} className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                <div className="card-block">
                                                    Contact Person: {this.props.companies[val].lname} <br />
                                                    Email:  {this.props.companies[val].eml}
                                                    {this.props.companies[val].address && this.props.companies[val].address.length > 0 && 'Address: ' + this.props.companies[val].address} <br />
                                                    {this.props.companies[val].contact && this.props.companies[val].contact.toString().length > 0 && 'Contact: ' + this.props.companies[val].contact} <br />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>;
                            })
                        }

                    </div>
                </div>
            </div>
        );
    }

    _isEdit = false;
    editFunc(obj: any) {
        this.setState({ title: obj.title, description: obj.description, id: obj.$key });
        this._isEdit = true;
    }

    delVacancy(obj: any) {
        this.props.deleteVacancy(obj);
    }

    clear() {
        this._isEdit = false;
        this.setState({ title: '', description: '', id: '' });
    }

    onInputChangeHandler(e: any) {
        this.setState(Object.assign({}, this.state, { [e.target.name]: e.target.value }));
    }

    onSubmitFunc(ev: any) {
        ev.preventDefault();
        let obj = Object.assign({}, this.state, { company: this.props.activeUser.cuid, name: this.props.activeUser.fname })
        console.log('updateddddddd vacancy from compoent, ', obj)
        if (this._isEdit) {
            // update
            this.props.updateVacancy(obj);
        } else {
            // add
            delete obj['id'];
            this.props.addVacancy(obj);
        }
        this.setState({ title: '', description: '', id: '' });
    }

    isCompany() {
        return (
            <div className="container-fluid row">
                <div className="col-md-4">
                    <h4>Add Vacancy</h4>
                    <br />
                    <form onSubmit={this.onSubmitFunc}>
                        <div className="form-group">
                            <label>Title: </label>
                            <input name="title" placeholder="title ..." required type="text" className="form-control" id="title" onChange={this.onInputChangeHandler} value={this.state.title} />
                        </div>

                        <div className="form-group">
                            <label>Description:</label>
                            <textarea name="description" placeholder="description ..." min="5" required className="form-control" id="description" onChange={this.onInputChangeHandler} value={this.state.description}>
                            </textarea>
                        </div>

                        <div className="margin-bottom20px">
                            <button type="submit" className="btn btn-primary">
                                {this._isEdit}
                                {this._isEdit ? 'Update' : 'Add +'}
                            </button>
                            <button type="button" className="btn btn-warning" onClick={this.clear}>
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-md-4">
                    <h4>List of Posted Vacancy</h4>
                    <br />
                    {
                        this.keys(this.props.vacancies).map((val, indx) => {
                            return <div key={indx}>
                                <div id="accordion" role="tablist" aria-multiselectable="true">
                                    <div className="card">
                                        <div className="card-header" role="tab" id="headingOne">
                                            <h5 className="mb-0">
                                                <div>
                                                    <a data-toggle="collapse" data-parent="#accordion" href={'#v' + indx.toString()} aria-expanded="true" aria-controls="collapseOne">
                                                        {this.props.vacancies[val].title} <span className="text-success">{this.isApplied(this.props.vacancies[val].applied) && ' / Applied: ' + this.keys(this.props.vacancies[val].applied).length}</span>
                                                    </a>
                                                    <span className="pull-right text-danger" onClick={() => { this.delVacancy(this.props.vacancies[val]) } }>
                                                        Delete
                                                    </span>
                                                    <span className="pull-right text-warning" onClick={() => { this.editFunc(this.props.vacancies[val]) } }>
                                                        Edit /&nbsp;
                                                    </span>
                                                </div>
                                            </h5>
                                        </div>

                                        <div id={'v' + indx.toString()} className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                            <div className="card-block">
                                                Desc: {this.props.vacancies[val].description} <br />
                                                From: {this.props.vacancies[val].name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>;
                        })
                    }
                </div>
                <div className="col-md-4">
                    <h4>List of Students</h4>
                    <br />
                    {
                        this.keys(this.props.students).map((val, indx) => {
                            return <div key={indx}>
                                <div id="accordionS" role="tablist" aria-multiselectable="true">
                                    <div className="card">
                                        <div className="card-header" role="tab" id="headingOne">
                                            <h5 className="mb-0">
                                                <div>
                                                    <a data-toggle="collapse" data-parent="#accordionS" href={'#s' + indx.toString()} aria-expanded="true" aria-controls="collapseOne">
                                                        {this.props.students[val].fname + ' ' + this.props.students[val].lname}
                                                    </a>
                                                </div>
                                            </h5>
                                        </div>

                                        <div id={'s' + indx.toString()} className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                            <div className="card-block">
                                                About: {this.props.students[val].desc} <br />
                                                Year: {this.props.students[val].year} <br />
                                                GPA: {this.props.students[val].gpa}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>;
                        })
                    }
                </div>
            </div>
        );
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
