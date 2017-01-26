import { Action, createAction } from "redux-actions";

import CONFIG from '../../config/index';

export default class MembersAction {

    static SIGNUP: string = "SIGNUP";
    static SIGNUP_SUCCESS: string = "SIGNUP_SUCCESS";
    static SIGNUP_FAILER: string = "SIGNUP_FAILER";


    static LOGIN: string = "LOGIN";
    static LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
    static LOGIN_FAILER: string = "LOGIN_FAILER";

    static ISLOGGEDIN: string = "ISLOGGEDIN";
    
    constructor() { }

    static isLoggedin() {
        console.log('isloggggedin')
        return {
            type: MembersAction.ISLOGGEDIN,
        };
    }

    static signup(payload: Object) {
        return {
            type: MembersAction.SIGNUP,
            payload
        };
    }
    static login(payload: Object) {
        return {
            type: MembersAction.LOGIN,
            payload
        };
    }

} 