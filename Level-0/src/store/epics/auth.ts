import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { AuthActions } from '../actions';
import { HttpService } from '../../providers';
import { appConfig } from '../../config/appConfig';


@Injectable()
export class AuthEpics {
  // private BASE_URL = appConfig.config.apiBaseUrl;

  constructor(private http: HttpService, private af: AngularFire) { }

  register = (action$) =>
    action$.ofType(AuthActions.REGISTER)
      .switchMap(({payload}) => {
        return this.af.database.object(`users/${payload.email}`)
          .map(data => {
            if (data.$value) {
              console.log('User does exist');
              return {
                type: AuthActions.REGISTER_FAIL,
                payload: { isError: { status: true, msg: 'user id exists' } }
              }
            } else {
              console.log('User does not exist');
              return {
                type: AuthActions.CREATEUSER,
                payload
              }
            }
          });
      });

  createUser = (action$) =>
    action$.ofType(AuthActions.CREATEUSER)
      .switchMap(({payload}) => {
        return Observable.fromPromise(this.af.auth.createUser({ email: payload.eml, password: payload.pwd }))
          .catch(err => {
            // console.log('catch ', err);
            return Observable.of({
              type: AuthActions.REGISTER_FAIL,
              payload: { isError: { status: true, msg: err.message } }
            });
          })
          .map((obj: any) => {
            // console.log('fomrpromse.....', obj);
            if (obj.type === 'REGISTER_FAIL') {
              return obj;
            }

            obj.auth.updateProfile({
              displayName: payload.uid,
              photoURL: 'some/url'
            }).then(d => console.log('some/url ', d))

            let uObj = {
              fuid: obj.uid,
              cuid: payload.uid,
              eml: payload.eml,
              pwd: payload.pwd,
              type: payload.type,
              fname: payload.fname,
              lname: payload.lname
            };
            firebase.database().ref('/').child(`users/${payload.uid}`).set(uObj);
            firebase.database().ref('/').child(`auth/${obj.uid}`).set(uObj);
            return {
              type: AuthActions.REGISTER_SUCCESS,
              payload: uObj
            }
          });
      });


  login = (action$) =>
    action$.ofType(AuthActions.LOGIN)
      // .map(action => { return action; })
      .switchMap(({payload}) => {
        return Observable.fromPromise(
          this.af.auth.login({ email: payload.email, password: payload.password }, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
          }))
          .catch(err => {
            this.clearLocalStorage();
            return Observable.of({
              type: AuthActions.LOGIN_FAIL,
              payload: { isError: { status: true, msg: err.message } }
            })
          })
          .map(data => {
            // console.log('loginnng ', data);
            if (data.type === 'LOGIN_FAIL') {
              return data;
            }

            return {
              type: AuthActions.GETUSERINFO,
              payload: data
            }
          });
      });

  getLoggedInUserData = (action$) =>
    action$.ofType(AuthActions.GETUSERINFO)
      .switchMap(({payload}) => {
        return this.af.database.object(`users/${payload.auth.displayName}`)
          .map(data => {
            this.setLocalStorage(data);   // saving into localStorage   
            return {
              type: AuthActions.LOGIN_SUCCESS,
              payload: data
            }
          });
      });


  logout = (action$) =>
    action$.ofType(AuthActions.LOGOUT)
      .switchMap(() => {
        this.af.auth.logout();
        this.clearLocalStorage();
        return Observable.of({
          type: AuthActions.LOGOUT_SUCCESS
        });
      });

  updateProfile = (action$) =>
    action$.ofType(AuthActions.UPDATE)
      .switchMap(({payload}) => {
        return Observable.fromPromise(this.af.database.object(`auth/${payload.fuid}`)
          .update(payload))
          .switchMap((y) => {
            console.log('auth update profile...', y)
            return Observable.fromPromise(this.af.database.object(`users/${payload.cuid}`)
              .update(payload))
          }).switchMap((x) => {
            console.log('users update proFile', x)
            this.setLocalStorage(payload);
            return Observable.of({
              type: AuthActions.UPDATESUCCESS,
              payload
            });
          })
      });

  isLoggedIn = (action$) =>
    action$.ofType(AuthActions.ISLOGGEDIN)
      .switchMap(() => {
        console.log(' AuthActions.ISLOGGEDIN ')
        if (this.getLocalStorage()) {
          console.log('isLoggedIn auth exists: ')
          return Observable.of({
            type: AuthActions.LOGIN_SUCCESS,
            payload: this.getLocalStorage()
          });
        } else {
          console.log('isLoggedIn auth not exists')
          return Observable.of({
            type: AuthActions.LOGIN_FAIL,
            payload: { isError: { status: false, msg: null } }
          });
        }
      });

  // getCurrentUserData = (action$) =>
  //   action$.ofType(AuthActions.LOGIN_SUCCESS)
  //     .switchMap(({payload}) => this.af.database.object(`users/${payload.userID}`)
  //       .catch(err => {
  //         console.log('users/ err ', err);
  //         return Observable.of(null)
  //       })
  //       .switchMap((user) => {
  //         if (user) {
  //           // console.log("Login", user);     
  //           return Observable.of({
  //             type: AuthActions.SETCURRENTUSERDATA,
  //             payload: user
  //           });
  //         } else {
  //           return Observable.of({
  //             type: AuthActions.NULL
  //           });
  //         }
  //       }));

  // UseCheckedIn = (action$) =>
  //   action$.ofType(AuthActions.LOGIN_SUCCESS)
  //     .switchMap(({payload}) => {
  //       return this.af.database.object(`subgroup-check-in-current-by-user/${payload.userID}`)
  //         .catch(err => {
  //           return Observable.of(null)
  //         })
  //         .map((checkedInObject) => {
  //           if (checkedInObject && checkedInObject.type == 1) {
  //             return {
  //               type: AuthActions.USERCHECKEDIN_SUCCESS,
  //               payload: checkedInObject
  //             };
  //           } else {
  //             return {
  //               type: AuthActions.USERCHECKEDIN_FAIL
  //             };
  //           }
  //         })
  //     }); firebase

  // UserOnline = (action$) =>
  //   action$.ofType(AuthActions.LOGIN_SUCCESS)
  //     .switchMap(() => this.af.database.object('.info/connected')
  //       .catch(err => {
  //         return Observable.of(null)
  //       })
  //       .switchMap((snapshot) => {
  //         let pushKey = null;
  //         if (snapshot && snapshot['$value'] == true && snapshot['$key'] == 'connected') {
  //           let userID = this.getLocalStorage().userID;
  //           // is online
  //           this.af.database.list('users-presence/' + this.getLocalStorage().userID + '/connections').push({})
  //             .then((item) => {
  //               pushKey = item.key;
  //               // console.log('key: ', pushKey);

  //               // update/add user-presence object
  //               let multipath = {}
  //               multipath[userID + "/last-modified"] = firebase.database['ServerValue'].TIMESTAMP;
  //               multipath[userID + "/defined-status"] = 1;
  //               multipath[userID + "/connections/" + item.key + "/type"] = 1;
  //               multipath[userID + "/connections/" + item.key + "/started"] = firebase.database['ServerValue'].TIMESTAMP;
  //               multipath[userID + "/connections/" + item.key + "/machineTitle"] = 'web';

  //               firebase.database().ref('/').child('users-presence').update(multipath);

  //               firebase.database().ref('/').child('users-presence/' + userID).onDisconnect().update({
  //                 'last-modified': firebase.database['ServerValue'].TIMESTAMP,
  //                 'defined-status': 0
  //               });

  //               firebase.database().ref('/').child('users-presence/' + userID + '/connections/' + item.key).onDisconnect().remove();

  //             }); // persence.push

  //           return Observable.of({
  //             type: AuthActions.USERONLINE_SUCCESS
  //           });
  //         } else {
  //           return Observable.of({
  //             type: AuthActions.USERONLINE_FAIL
  //           });
  //         }
  //       }));

  private setLocalStorage(userObj): void {
    localStorage.setItem('ng2-localStorage-user', JSON.stringify(userObj));
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('ng2-localStorage-user');
  }

  private getLocalStorage() {
    return JSON.parse(localStorage.getItem('ng2-localStorage-user'));
  }


}