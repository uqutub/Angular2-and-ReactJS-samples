import { Action, createAction } from "redux-actions";

export default class AuthActions {

    static SIGNUP: string = "SIGNUP";
    static SIGNUP_FAILER: string = "SIGNUP_FAILER";
    static CREATEUSER: string = "CREATEUSER";
    static SIGNUP_SUCCESS: string = "SIGNUP_SUCCESS";


    static LOGIN: string = "LOGIN";
    static LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
    static LOGIN_FAILER: string = "LOGIN_FAILER";

    static LOGOUT: string = "LOGOUT";
    static LOGOUT_SUCCESS: string = "LOGOUT_SUCCESS";

    static ISLOGGEDIN: string = "ISLOGGEDIN";

    static NULL: string = "NULL";
    
    constructor() { }

    static isLoggedin() {
        return {
            type: AuthActions.ISLOGGEDIN
        };
    }

    static signup(payload: Object) {
        return {
            type: AuthActions.SIGNUP,
            payload
        };
    }

    static login(payload: Object) {
        return {
            type: AuthActions.LOGIN,
            payload
        };
    }

    static logout() {
        return {
            type: AuthActions.LOGOUT
        };
    }

} 