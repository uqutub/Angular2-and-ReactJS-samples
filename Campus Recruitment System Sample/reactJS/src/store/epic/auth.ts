import { Observable } from "rxjs";
import { ActionsObservable } from "redux-observable";
import { browserHistory } from 'react-router'; // http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router

import AuthActions from "./../action/auth";
import * as firebase from 'firebase';
import { HttpService } from "./../../service/index";


export default class AuthEpic {

    static signupEpic = (action$: ActionsObservable<any>) =>
        action$.ofType(AuthActions.SIGNUP)
            // .do(x => { console.log("===-----Epicccccccccccccccccc", x) })
            .switchMap(({payload}) => {
                // firebase.auth()
                return HttpService.post(payload.url, payload.body)
                    .map(({response}) => {
                        if (response.err) {
                            return {
                                type: AuthActions.SIGNUP_FAILER,
                                payload: null
                            };
                        } else {
                            // localStorage.setItem("ngo", JSON.stringify(response.data.data))
                            browserHistory.push('/login');
                            return {
                                type: AuthActions.SIGNUP_SUCCESS,
                                payload: response.data
                            };
                        }
                    });
            })


    static isLoggedInEpic = (action$: ActionsObservable<any>) =>
        action$.ofType(AuthActions.ISLOGGEDIN)
            .switchMap(() => {
                let payload = JSON.parse(localStorage.getItem('react-localStorage-user'))
                if (payload && payload.type) {
                    return Observable.of({
                        type: AuthActions.LOGIN_SUCCESS,
                        payload
                    })
                } else {
                    return Observable.of({
                        type: AuthActions.NULL
                    })
                }
            })

    static loginEpic = (action$: ActionsObservable<any>) =>
        action$.ofType(AuthActions.LOGIN)
            // .do(x => { console.log("login ecpis =-=-=-=-=-=-=-=-=-=-=-=-=-", x) })
            .switchMap(({payload}) => {
                // console.log('LOGIN--- ', payload)
                return Observable.fromPromise(firebase.auth().signInWithEmailAndPassword(payload.email, payload.password))
                    .catch(err => {
                        console.log('err ', err)
                        return Observable.of(err);
                    })
                    .switchMap((d: any) => {
                        // console.log('d login ecpis', d)
                        if (d.message) {
                            // error
                            return Observable.of({
                                type: AuthActions.LOGIN_FAILER,
                                payload: d.message
                            });
                        } else {
                            return Observable.fromPromise(firebase.database().ref('/').child(`users/${d.displayName}`).once('value'))
                                .map(u => {
                                    //set local storage
                                    localStorage.setItem('react-localStorage-user', JSON.stringify(u.val()));
                                    return {
                                        type: AuthActions.LOGIN_SUCCESS,
                                        payload: u.val()
                                    }
                                })
                        }
                    })
            })


    static LogoutEpic = (action$: ActionsObservable<any>) =>
        action$.ofType(AuthActions.LOGOUT)
            .switchMap(() => {
                localStorage.removeItem('react-localStorage-user');
                return Observable.fromPromise(firebase.auth().signOut())
                    .map(() => {
                        return {
                            type: AuthActions.LOGOUT_SUCCESS
                        }
                    })
                    .catch((err) => {
                        return Observable.of({
                            type: AuthActions.LOGOUT_SUCCESS
                        })
                    })
            })

    private setLocalStorage(userObj: any): void {
        localStorage.setItem('react-localStorage-user', JSON.stringify(userObj));
    }

    private clearLocalStorage(): void {
        localStorage.removeItem('react-localStorage-user');
    }

    private getLocalStorage() {
        return JSON.parse(localStorage.getItem('react-localStorage-user'));
    }
}