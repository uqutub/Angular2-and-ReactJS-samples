import { AuthActions } from '../actions';

interface IInitalState {
  isLoading: boolean;
  isError: { status: boolean, msg: string }
  isLoggedin: boolean;
  user: Object;
  isRegistered: boolean;
}

const InitalState: IInitalState = {
  isLoading: false,
  isError: { status: false, msg: null },
  isLoggedin: false,
  user: null,
  isRegistered: false,
};

export const authReducer = function (state: IInitalState = InitalState, action: { type: string, payload?: any }) {
  switch (action.type) {

    case AuthActions.REGISTER:
      return Object.assign({}, state, { isLoading: true });
    case AuthActions.REGISTER_SUCCESS:
      return Object.assign({}, state, { isLoading: false, isRegistered: true, isError: { status: false, msg: null } });
    case AuthActions.REGISTER_FAIL:
      return Object.assign({}, state, { isLoading: false, isError: action.payload.isError });

    case AuthActions.LOGIN:
      return Object.assign({}, state, { isLoading: true });
    case AuthActions.LOGIN_FAIL:
      return Object.assign({}, state, { isLoading: false, isLoggedin: false, user: null, isError: action.payload.isError });
    case AuthActions.LOGIN_SUCCESS:
      console.log(Object.assign({}, state, { isLoading: false, isLoggedin: true, user: action.payload }))
      return Object.assign({}, state, { isLoading: false, isLoggedin: true, user: action.payload, isError: { status: false, msg: null } });

    case AuthActions.UPDATE:
      return Object.assign({}, state, { isLoading: true });
    case AuthActions.UPDATESUCCESS:
      return Object.assign({}, state, { isLoading: false, user: action.payload });
   
    default:
      return state;
  }
}