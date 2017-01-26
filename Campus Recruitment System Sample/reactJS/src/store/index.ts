// https://redux-observable.js.org/docs/basics/SettingUpTheMiddleware.html

import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

// Application State IAppState
import IAppState from './IAppState';

// reducers
import memberReducer from "./reducer/member";

// epics
import MemberEpic from "./epic/member";


// Application Epics / Effects
export const rootEpic = combineEpics(
    MemberEpic.signupEpic,
    MemberEpic.loginEpic,
    MemberEpic.isLoggedInEpic,
);

// Application Reducers
export const rootReducer = combineReducers<IAppState>({
    memberReducer
});
