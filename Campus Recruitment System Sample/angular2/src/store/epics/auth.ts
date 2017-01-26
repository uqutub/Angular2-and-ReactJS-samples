import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { AuthActions } from '../actions';

@Injectable()
export class AuthEpics {

  constructor(private af: AngularFire) { }

  register = (action$) =>
    action$.ofType(AuthActions.REGISTER)
      .switchMap(({payload}) => {
        return this.af.database.object(`users/${payload.email}`)
          .map(data => {
            if (data.$value) {
              // console.log('User does exist');
              return {
                type: AuthActions.REGISTER_FAIL,
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

  createUser = (action$) =>
    action$.ofType(AuthActions.CREATEUSER)
      .switchMap(({payload}) => {
        return Observable.fromPromise(this.af.auth.createUser({ email: payload.eml, password: payload.pwd }))
          .catch(err => {
            return Observable.of({
              type: AuthActions.REGISTER_FAIL,
              payload: { isError: { status: true, msg: err.message } }
            });
          })
          .map((obj: any) => {
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
            this.setLocalStorage(data);
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
        if (this.getLocalStorage()) {
          return Observable.of({
            type: AuthActions.LOGIN_SUCCESS,
            payload: this.getLocalStorage()
          });
        } else {
          return Observable.of({
            type: AuthActions.LOGIN_FAIL,
            payload: { isError: { status: false, msg: null } }
          });
        }
      });

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