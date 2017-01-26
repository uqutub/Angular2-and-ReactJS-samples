import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState, Observable } from '../';
import { AngularFire } from 'angularfire2';

@Injectable()
export class AuthActions {

    static REGISTER: string = 'REGISTER';
    static CREATEUSER: string = 'CREATEUSER';
    static REGISTER_SUCCESS: string = 'REGISTER_SUCCESS';
    static REGISTER_FAIL: string = 'REGISTER_FAIL';

    static ISLOGGEDIN: string = 'ISLOGGEDIN';

    static LOGIN: string = 'LOGIN';
    static GETUSERINFO: string = 'GETUSERINFO';
    static LOGIN_SUCCESS: string = 'LOGIN_SUCCESS';
    static LOGIN_FAIL: string = 'LOGIN_FAIL';

    static LOGOUT: string = 'LOGOUT';
    static LOGOUT_SUCCESS: string = 'LOGOUT_SUCCESS';

    static UPDATE: string = 'UPDATE';
    static UPDATESUCCESS: string = 'UPDATESUCCESS';

    static NULL: string = 'NULL';

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private af: AngularFire
    ) {
        this.ngRedux.dispatch({
            type: AuthActions.ISLOGGEDIN
        });
    }

    register(user: Object): void {
        console.log('resghitser action.', user)
        this.ngRedux.dispatch({
            type: AuthActions.REGISTER,
            payload: user
        });
    }

    login(credentials: Object): void {
        this.ngRedux.dispatch({
            type: AuthActions.LOGIN,
            payload: credentials
        });
    }


    logout(): void {
        this.ngRedux.dispatch({
            type: AuthActions.LOGOUT
        });
    }

    updateProfile(payload: Object): void {
        this.ngRedux.dispatch({
            type: AuthActions.UPDATE,
            payload
        });
    }

}