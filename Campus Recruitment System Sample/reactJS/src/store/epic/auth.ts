import { Observable } from "rxjs";
import { ActionsObservable } from "redux-observable";
import { browserHistory } from 'react-router'; // http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router

import AuthActions from "./../action/auth";

// import { HttpService } from "./../../service/index"

import { FirebaseServie } from '../../service/firebaseService';
import * as firebase from 'firebase';


export default class AuthEpic {

    static mainRef = FirebaseServie.mainRef;

    static signupEpic = (action$: ActionsObservable<any>) =>
        action$.ofType(AuthActions.SIGNUP)
            // .do(x => { console.log("===-----Epicccccccccccccccccc", x) })
            .switchMap(({payload}) => {
                return Observable.fromPromise(AuthEpic.mainRef.child(`users/${payload.cuid}`).once('value'))
                    .map(snapshot => {
                        if (snapshot.val()) {
                            // console.log('User does exist');
                            return {
                                type: AuthActions.SIGNUP_FAILER,
                                payload: { isError: { status: true, msg: 'user id exists' } }
                            }
                        } else {
                            // console.log('User does not exist');
                            return {
                                type: AuthActions.CREATEUSER,
                                payload
                            }
                        }
                    });
            });

    static createrMemberEpic = (action$: ActionsObservable<any>) =>
        action$.ofType(AuthActions.CREATEUSER)
            .switchMap(({payload}) => {
                return Observable.fromPromise(firebase.auth().createUserWithEmailAndPassword(payload.eml, payload.pwd))
                    .catch(err => {
                        return Observable.of({
                            type: AuthActions.SIGNUP_FAILER,
                            payload: { isError: { status: true, msg: err.message } }
                        });
                    })
                    .map((obj: any) => {
                        if (obj.type === 'SIGNUP_FAILER') {
                            return obj;
                        }

                        obj.updateProfile({
                            displayName: payload.cuid,
                            photoURL: 'some/url'
                        });

                        let uObj = {
                            fuid: obj.uid,
                            cuid: payload.cuid,
                            eml: payload.eml,
                            pwd: payload.pwd,
                            type: payload.type,
                            fname: payload.fname,
                            lname: payload.lname
                        };
                        firebase.database().ref('/').child(`users/${payload.cuid}`).set(uObj);
                        firebase.database().ref('/').child(`auth/${obj.uid}`).set(uObj);
                        console.log('ok created user wow!')
                        return {
                            type: AuthActions.SIGNUP_SUCCESS,
                            payload: uObj
                        }
                    });
            });

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