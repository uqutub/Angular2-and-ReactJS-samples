import { Observable } from "rxjs";
import { ActionsObservable } from "redux-observable";
import { browserHistory } from 'react-router'; // http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router

import MembersAction from "./../action/member";
import * as firebase from 'firebase';
import { HttpService } from "./../../service/index";


export default class MemberEpic {

    static signupEpic = (action$: ActionsObservable<any>) =>
        action$.ofType(MembersAction.SIGNUP)
            // .do(x => { console.log("===-----Epicccccccccccccccccc", x) })
            .switchMap(({payload}) => {
                // firebase.auth()
                return HttpService.post(payload.url, payload.body)
                    .map(({response}) => {
                        if (response.err) {
                            return {
                                type: MembersAction.SIGNUP_FAILER,
                                payload: null
                            };
                        } else {
                            // localStorage.setItem("ngo", JSON.stringify(response.data.data))
                            browserHistory.push('/login');
                            return {
                                type: MembersAction.SIGNUP_SUCCESS,
                                payload: response.data
                            };
                        }
                    });
            })


    static isLoggedInEpic = (action$: ActionsObservable<any>) =>
        action$.ofType(MembersAction.ISLOGGEDIN)
            .switchMap(() => {
                let d = JSON.parse(localStorage.getItem('react-localStorage-user'))
                if (d && d.type) {
                    return Observable.of({
                        type: MembersAction.LOGIN_SUCCESS,
                        payload: d
                    })
                } else {
                    return Observable.of(null);
                }
            })

    static loginEpic = (action$: ActionsObservable<any>) =>
        action$.ofType(MembersAction.LOGIN)
            // .do(x => { console.log("login ecpis =-=-=-=-=-=-=-=-=-=-=-=-=-", x) })
            .switchMap(({payload}) => {
                console.log("login ecpis =-=-=-=-=-=-=-=-=-=-=-=-=-", payload)

                return Observable.fromPromise(firebase.auth().signInWithEmailAndPassword(payload.email, payload.password))
                    .catch(err => {
                        console.log('err ', err)
                        return Observable.of(err)
                    })
                    .switchMap((d: any) => {
                        console.log('d login ', d)
                        if (d.message) {
                            // error
                            return Observable.of({
                                type: MembersAction.LOGIN_FAILER,
                                payload: d.message
                            });
                        }

                        return Observable.fromPromise(firebase.database().ref('/').child(`users/${d.displayName}`).once('value'))
                            .map(u => {
                                //set local storage
                                localStorage.setItem('react-localStorage-user', JSON.stringify(u.val()));

                                return {
                                    type: MembersAction.LOGIN_SUCCESS,
                                    payload: u.val()
                                }
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