import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire } from 'angularfire2';
import { ActionsObservable } from 'redux-observable';
import { MemberActions, AuthActions } from '../actions';


@Injectable()
export class MemberEpics {

    constructor(private af: AngularFire) { }

    getStudents = (action$: ActionsObservable<any>) => // if my account type is company then get my posts
        action$.ofType(AuthActions.LOGIN_SUCCESS)
            .switchMap(({payload}) => {
                if (payload.type == "company") {
                    return this.af.database.list(`users`, {
                        query: {
                            limitToFirst: 50,
                            orderByChild: 'type',
                            equalTo: 'student'
                        }
                    }).mergeMap(aRRay => {
                        return aRRay.map(x => {
                            delete x['$exists']
                            return {
                                type: MemberActions.ADDMEMBER,
                                payload: x
                            }
                        });
                    });
                } else if (payload.type == "student") {
                    return this.af.database.list(`users`, {
                        query: {
                            limitToFirst: 50,
                            orderByChild: 'type',
                            equalTo: 'company'
                        }
                    }).mergeMap(aRRay => {
                        return aRRay.map(x => {
                            delete x['$exists']
                            return {
                                type: MemberActions.ADDMEMBER,
                                payload: x
                            }
                        });
                    });
                } else if (payload.type == "admin") {

                     return this.af.database.list(`users`, {
                        query: {
                            limitToFirst: 50,
                            orderByChild: 'type',
                            equalTo: 'student'
                        }
                    }).mergeMap(aRRay => {
                        return aRRay.map(x => {
                            delete x['$exists']
                            return {
                                type: MemberActions.ADDSTUDENT,
                                payload: x
                            }
                        });
                    });
                }
            })

    getCompanies = (action$: ActionsObservable<any>) => // if my account type is company then get my posts
        action$.ofType(AuthActions.LOGIN_SUCCESS)
            .switchMap(({payload}) => {
                if (payload.type == "admin") {

                    return this.af.database.list(`users`, {
                        query: {
                            limitToFirst: 50,
                            orderByChild: 'type',
                            equalTo: 'company'
                        }
                    }).mergeMap(aRRay => {
                        return aRRay.map(x => {
                            delete x['$exists']
                            return {
                                type: MemberActions.ADDCOMPANY,
                                payload: x
                            }
                        });
                    });

                }
            })


    delStudent = (action$: ActionsObservable<any>) => // if my account type is company then get my posts
        action$.ofType(MemberActions.DELSTUDENT)
            .switchMap(({payload}) => {
                return Observable.of(null);
            })



  delCompany = (action$: ActionsObservable<any>) => // if my account type is company then get my posts
        action$.ofType(MemberActions.DELCOMPANY)
            .switchMap(({payload}) => {
               return Observable.of(null);
            })


}