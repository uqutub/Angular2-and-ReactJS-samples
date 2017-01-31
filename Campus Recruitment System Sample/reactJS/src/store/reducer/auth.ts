import AuthActions from "./../action/auth";

const INITIAL_STATE = {
    activeUser: <any>{},
    isError: { status: false, msg: '' },
    isProcessing: false,
    isAuthenticated: false,
    isRegistered: false,
    members: <any>[],
    counterReg: 0
}

interface IACTION {
    type: string,
    payload?: any
}


function AuthReducer(state = INITIAL_STATE, action: IACTION) {
    switch (action.type) {

        case AuthActions.SIGNUP:
            return Object.assign({}, state, { isProcessing: true });
        case AuthActions.SIGNUP_SUCCESS:
            return Object.assign({}, state, { isProcessing: false, isRegistered: true, counterReg: state.counterReg+1 });
        case AuthActions.SIGNUP_FAILER:
            console.log('SIGNUP_FAILER .....', Object.assign({}, state, { isProcessing: false, isError: action.payload }))
            return Object.assign({}, state, { isProcessing: false, isError: action.payload });

        case AuthActions.LOGIN:
            return Object.assign({}, state, { isProcessing: true });
        case AuthActions.LOGIN_SUCCESS:
            // console.log('LOGIN_SUCCESS ', Object.assign({}, state, { isProcessing: false, isAuthenticated: true, activeUser: action.payload }))
            return Object.assign({}, state, { isProcessing: false, isAuthenticated: true, activeUser: action.payload });
        case AuthActions.LOGIN_FAILER:
            return Object.assign({}, state, { isProcessing: false, isAuthenticated: false, activeUser: {}, isError: { status: true, msg: action.payload } });

        case AuthActions.LOGOUT:
            return Object.assign({}, state, { isProcessing: true });

        case AuthActions.LOGOUT_SUCCESS:
            return Object.assign({}, state, { isProcessing: false, isAuthenticated: false, activeUser: {}, counterReg: 0, isError: { status: false, msg: null } });

        default:
            return state;

    }
}

export default AuthReducer;