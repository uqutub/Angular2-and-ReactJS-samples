import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire } from 'angularfire2';
import { ActionsObservable } from 'redux-observable';
import { PostActions, AuthActions } from '../actions';


@Injectable()
export class PostEpics {
    // private BASE_URL = appConfig.config.apiBaseUrl;

    constructor(private af: AngularFire) { }

    getMyPosts = (action$: ActionsObservable<any>) => // if my account type is company then get my posts
        action$.ofType(AuthActions.LOGIN_SUCCESS)
            .switchMap(({payload}) => {
                if (payload.type == "company") {
                    return this.af.database.list(`company-posts/${payload.cuid}`, {
                        query: {
                            limitToFirst: 10,
                        }
                    })
                        .mergeMap(aRRay => {
                            return aRRay.map(x => {
                                delete x['$exists']
                                x['uid'] = payload.cuid;
                                return {
                                    type: PostActions.ADDPOSTSUCCESS,
                                    payload: x
                                }
                            });
                        });
                } else {
                    return Observable.of({
                        type: PostActions.GETRECENTPOST
                    });
                }
            })

    getPosts = (action$: ActionsObservable<any>) => // if my account type is company then get my posts
        action$.ofType(PostActions.GETRECENTPOST)
            .switchMap(({payload}) => {
                return this.af.database.list(`posts`, {
                    query: {
                        limitToFirst: 50,
                    }
                }).mergeMap(aRRay => {
                    return aRRay.map(x => {
                        delete x['$exists']
                        x['uid'] = x.company;
                        return {
                            type: PostActions.ADDPOSTSUCCESS,
                            payload: x
                        }
                    });
                });
            })

    addPost = (action$: ActionsObservable<any>) =>
        action$.ofType(PostActions.ADDPOST)
            .switchMap(({payload}) => {
                return this.af.database.list(`company-posts/${payload.uid}`)
                    .push({
                        title: payload.title,
                        description: payload.description,
                        dated: firebase.database['ServerValue'].TIMESTAMP,
                        company: payload.uid,
                        name: payload.name
                    }).then(d => {
                        // console.log('PostActions.ADDPOST then ', d)
                        let obj = payload;
                        obj['$key'] = d.key;
                        this.af.database.object(`posts/${d.key}`).update({
                            title: payload.title,
                            description: payload.description,
                            dated: firebase.database['ServerValue'].TIMESTAMP,
                            company: payload.uid,
                            name: payload.name
                        })
                        return {
                            type: PostActions.GETSINGLEPOST,
                            payload: obj
                        }
                    })
                    .catch((err) => {
                        console.log('PostActions.ADDPOST catch ', err)
                        return {
                            type: PostActions.ADDPOSTFAIL
                        }
                    })
            })


    getSinglePost = (action$: ActionsObservable<any>) =>
        action$.ofType(PostActions.GETSINGLEPOST)
            .switchMap(({payload}) => {
                return Observable.fromPromise(firebase.database().ref('/').child(`company-posts/${payload.uid}/${payload.$key}`).once('value'))
                    .map(x => {
                        let obj = payload;
                        obj['dated'] = x.val()['dated'];
                        return {
                            type: PostActions.ADDPOSTSUCCESS,
                            payload: obj
                        }
                    });
            });

    editPost = (action$: ActionsObservable<any>) =>
        action$.ofType(PostActions.EDITPOST)
            .switchMap(({payload}) => {
                return Observable.fromPromise(this.af.database.object(`company-posts/${payload.uid}/${payload.$key}`)
                    .update({
                        title: payload.title,
                        description: payload.description,
                        updated: firebase.database['ServerValue'].TIMESTAMP
                    })).map(x => {
                        this.af.database.object(`posts/${payload.$key}`).update({
                            title: payload.title,
                            description: payload.description,
                            updated: firebase.database['ServerValue'].TIMESTAMP,
                            company: payload.uid
                        })
                        return {
                            type: PostActions.ADDPOSTSUCCESS,
                            payload: payload
                        }
                    })
            })

    applyVacancy = (action$: ActionsObservable<any>) =>
        action$.ofType(PostActions.APPLYVANACY)
            .switchMap(({payload}) => {
                console.log('apply vacncy epics', payload)
                let obj = {};
                obj[payload.studentId] = payload.studentId
                return Observable.fromPromise(this.af.database.object(`posts/${payload.$key}/applied`).update(obj))
                    .switchMap((a) => {
                        console.log('updated posts node', a)
                        return Observable.fromPromise(this.af.database.object(`company-posts/${payload.company}/${payload.$key}/applied`).update(obj))
                            .map((b) => {
                                console.log('updated company - posts node', b)
                                return {
                                    type: PostActions.APPLYVANACYSUCCESS,
                                    payload
                                }
                            })
                    })
            });

    delVacancy = (action$: ActionsObservable<any>) =>
        action$.ofType(PostActions.DELVACANCY)
            .switchMap(({payload}) => {
                console.log('del vanct epics ', payload);
                return Observable.fromPromise(this.af.database.object(`posts/${payload.$key}`).remove())
                    .switchMap((a) => {
                        console.log('updated posts node', a)
                        return Observable.fromPromise(this.af.database.object(`company-posts/${payload.company}/${payload.$key}`).remove())
                            .map((b) => {
                                console.log('updated company - posts node', b)
                                return {
                                    type: PostActions.DELVACANCYSUCCESS,
                                    payload
                                }
                            });
                    });
            });

}