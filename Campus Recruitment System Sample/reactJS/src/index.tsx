import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router'
import { Provider } from 'react-redux';

import { store } from './store/index';
// import * as firebase from "firebase";
import { App, Home, Login, AdminPanel, Signup, AdminDashboard } from "./container";



function checkIsAdmin(nextState: any, replace: Function) {
    let user = JSON.parse(localStorage.getItem("react-localStorage-user"));
    // console.log('user in localStorage ', user )
    // if (user && (user.type === 'admin' || user.type === 'company' || user.type === 'student')) {
    //     console.log('authenricated royte by admin')
    //     // replace({
    //     //     pathname: "/a/home",
    //     //     state: { nextPathname: nextState.location.pathname }
    //     // })
    // } else 
    if (!user) {
        replace({
            pathname: "/login",
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

ReactDOM.render(
    <Provider store={store}>

        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Login} />
                <Route path="login" component={Login} />
                <Route path="signup" component={Signup} />
                <Route component={AdminDashboard} onEnter={checkIsAdmin}>
                    <IndexRoute component={Home} />
                    <Route path="home" component={Home} />
                    {/*<Route path="ngo-detail/:ngoId" component={NgoDetail} />*/}
                </Route>
            </Route>
        </Router>

    </Provider>,
    document.getElementById('root')
);