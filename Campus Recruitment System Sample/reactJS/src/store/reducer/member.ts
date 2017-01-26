import MembersAction from "./../action/member";

const INITIAL_STATE = {
    activeUser: <any>{},
    isError: {status: false, msg: ''},
    isProcessing: false,
    isAuthenticated: false,
    members: <any>[]
}

interface IACTION {
    type: string,
    payload?: any
}


function memberReducer(state = INITIAL_STATE, action: IACTION) {
    switch (action.type) {
        case "SIGNUP":
            return Object.assign({}, state, { isProcessing: true });
        case "SIGNUP_SUCCESS":
            return Object.assign({}, state, { isProcessing: false });
        case "SIGNUP_FAILER":
            return Object.assign({}, state, { isProcessing: false, activeUser: {} });
        case "LOGIN":
            return Object.assign({}, state, { isProcessing: true });
        case "LOGIN_SUCCESS":
            console.log('LOGIN_SUCCESS ', Object.assign({}, state, { isProcessing: false, isAuthenticated: true, activeUser: action.payload }))
            return Object.assign({}, state, { isProcessing: false, isAuthenticated: true, activeUser: action.payload });
        case "LOGIN_FAILER":
            return Object.assign({}, state, { isProcessing: false, isAuthenticated: false, activeUser: {}, isError: {status: true, msg: action.payload} });
        default:
            return state;

    }
}

export default memberReducer;