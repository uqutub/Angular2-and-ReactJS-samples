import { Observable } from "rxjs";
import { ActionsObservable } from "redux-observable";
import { browserHistory } from 'react-router'; // http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router

import AuthActions from "./../action/auth";
import StudentActions from "./../action/student";

import { FirebaseServie } from '../../service/firebaseService';
import * as firebase from 'firebase';

export default class StudentEpic {
    static mainRef = FirebaseServie.mainRef;

    static getVacancies = (action$: ActionsObservable<any>) =>
        action$.ofType(AuthActions.LOGIN_SUCCESS)
            .switchMap(({payload}) => {
                // console.log('StudentEpics LOGINSUCCESS ', payload)
                if (payload && (payload.type == 'student' || payload.type == 'admin')) {
                    StudentEpic.mainRef.child('posts').on('child_added', (snapshot) => {
                        // console.log('child_added: ', snapshot.key, snapshot.val());
                        let obj = Object.assign({}, snapshot.val());
                        obj['$key'] = snapshot.key
                        StudentActions.addAllVacancies(obj);
                    })

                } else if (payload && payload.type == 'company') {
                    StudentEpic.mainRef.child(`company-posts/${payload.cuid}`).on('child_added', (snapshot) => {
                        // console.log('child_added: ', snapshot.key, snapshot.val());
                        let obj = Object.assign({}, snapshot.val());
                        obj['$key'] = snapshot.key
                        StudentActions.addMyVacancies(obj);
                    })
                }

                return Observable.of({
                    type: StudentActions.NULL
                })
            })

    static getCompanies = (action$: ActionsObservable<any>) =>
        action$.ofType(AuthActions.LOGIN_SUCCESS)
            .switchMap(({payload}) => {
                // console.log('StudentEpics LOGINSUCCESS ', payload)
                if (payload && (payload.type == 'student' || payload.type == 'admin')) {
                    StudentEpic.mainRef.child('users').on('child_added', (snapshot) => {
                        // console.log('child_added: ', snapshot.key, snapshot.val());
                        if (snapshot.val() && snapshot.val().type == 'company') {
                            let obj = Object.assign({}, snapshot.val());
                            obj['$key'] = snapshot.key
                            StudentActions.addCompanies(obj);
                        }
                    })
                }
                return Observable.of({
                    type: StudentActions.NULL
                })
            })

    static applyVacantEpic = (action$: ActionsObservable<any>) =>
        action$.ofType(StudentActions.APPLYVACANT)
            .switchMap(({payload}) => {
                console.log('APPLYVACANT EPICS payload', payload)
                StudentEpic.mainRef.child(`company-posts/${payload.company}/applied/${payload.stid}`).set(payload.stid);
                return Observable.fromPromise(StudentEpic.mainRef.child(`posts/${payload.$key}/applied/${payload.stid}`).set(payload.stid))
                    .map(data => {
                        console.log('set applied on apply vacant ', data)
                        return {
                            type: StudentActions.NULL
                        }
                    })
            })

    static onVacancyEventChangesEpics = (action$: ActionsObservable<any>) =>
        action$.ofType(AuthActions.LOGIN_SUCCESS)
            .switchMap(({payload}) => {
                // console.log('StudentEpics LOGINSUCCESS ', payload)
                if (payload && (payload.type == 'student' || payload.type == 'admin')) {

                    console.log('on changed fire >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                    StudentEpic.mainRef.child('posts').on('child_changed', (snapshot) => {
                        console.log('child chnaged of posts ', snapshot.key, snapshot.val())
                        let obj = Object.assign({}, snapshot.val());
                        obj['$key'] = snapshot.key
                        StudentActions.addAllVacancies(obj);
                    })
                } else if (payload && payload.type == 'company') {
                    console.log('on changed fire >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                    StudentEpic.mainRef.child(`company-posts/${payload.cuid}`).on('child_changed', (snapshot) => {
                        console.log('child chnaged of posts ', snapshot.key, snapshot.val())
                        let obj = Object.assign({}, snapshot.val());
                        obj['$key'] = snapshot.key
                        StudentActions.addAllVacancies(obj);
                    })
                }

                return Observable.of({
                    type: StudentActions.NULL
                })
            })


    static addVacancyEpics = (action$: ActionsObservable<any>) =>
        action$.ofType(StudentActions.ADDVACANCY)
            .switchMap(({payload}) => {
                console.log('add vacancy ', payload)
                payload['dated'] = firebase.database.ServerValue.TIMESTAMP;

                let Objkey = StudentEpic.mainRef.child(`posts`).push(payload)
                console.log('Objkey ------------ ', Objkey);
                return Observable.fromPromise(StudentEpic.mainRef.child(`company-posts/${payload.company}/${Objkey.key}`)
                    .update(payload))
                    .map((data) => {
                        console.log('add company-oposts', data)
                        return {
                            type: StudentActions.NULL
                        }
                    })


            })


    static updateVacancyEpics = (action$: ActionsObservable<any>) =>
        action$.ofType(StudentActions.UPDATEDVACANCY)
            .switchMap(({payload}) => {
                console.log('update vacancy ', payload)
                payload['updated'] = firebase.database.ServerValue.TIMESTAMP;
                StudentEpic.mainRef.child(`posts/${payload.id}`).push(payload)
                return Observable.fromPromise(StudentEpic.mainRef.child(`company-posts/${payload.company}/${payload.id}`)
                    .update(payload))
                    .map((data) => {
                        console.log('updateeeee company-oposts', data)
                        return {
                            type: StudentActions.NULL
                        }
                    })
            })


    static deleteVacancyEpics = (action$: ActionsObservable<any>) =>
        action$.ofType(StudentActions.DELETEDVACANCY)
            .switchMap(({payload}) => {
                console.log('Delete vacancy ', payload)
                StudentEpic.mainRef.child(`posts/${payload.$key}`).set({})
                return Observable.fromPromise(StudentEpic.mainRef.child(`company-posts/${payload.company}/${payload.$key}`)
                    .set({}))
                    .map((data) => {
                        console.log('deleteeee company-oposts', data)
                        return {
                            type: StudentActions.NULL
                        }
                    })
            })


    static onVacancyEventDeleteEpics = (action$: ActionsObservable<any>) =>
        action$.ofType(AuthActions.LOGIN_SUCCESS)
            .switchMap(({payload}) => {
                // console.log('StudentEpics LOGINSUCCESS ', payload)
                console.log('on delete fire >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                StudentEpic.mainRef.child('posts').on('child_removed', (snapshot) => {
                    console.log('child delete of posts ', snapshot.key, snapshot.val())
                    let obj = Object.assign({}, snapshot.val());
                    obj['$key'] = snapshot.key
                    StudentActions.deleteVacancyEvent(obj);
                })

                return Observable.of({
                    type: StudentActions.NULL
                })
            })


    static getAllStudents = (action$: ActionsObservable<any>) =>
        action$.ofType(AuthActions.LOGIN_SUCCESS)
            .switchMap(({payload}) => {
                if (payload && (payload.type == 'admin' || payload.type == 'company')) {
                    StudentEpic.mainRef.child('users').on('child_added', (snapshot) => {
                        // console.log('child_added: ', snapshot.key, snapshot.val());
                        if (snapshot.val() && snapshot.val().type == 'student') {
                            let obj = Object.assign({}, snapshot.val());
                            obj['$key'] = snapshot.key
                            StudentActions.addStudent(obj);
                        }
                    })
                }

                return Observable.of({
                    type: StudentActions.NULL
                })
            })




}