// https://redux-observable.js.org/docs/basics/SettingUpTheMiddleware.html

import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';


// Application State IAppState
import IAppState from './IAppState';

// reducers
import AuthReducer from "./reducer/auth";
import StudentReducer from "./reducer/student";

// epics
import AuthEpic from "./epic/auth";
import StudentEpic from "./epic/student";


// Application Epics / Effects
export const rootEpic = combineEpics(
    AuthEpic.signupEpic,
    AuthEpic.createrMemberEpic,
    AuthEpic.loginEpic,
    AuthEpic.isLoggedInEpic,
    AuthEpic.LogoutEpic,
    StudentEpic.getVacancies,
    StudentEpic.getCompanies,
    StudentEpic.applyVacantEpic,
    StudentEpic.onVacancyEventChangesEpics,
    StudentEpic.addVacancyEpics,
    StudentEpic.updateVacancyEpics,
    StudentEpic.deleteVacancyEpics,
    StudentEpic.onVacancyEventDeleteEpics,
    StudentEpic.getAllStudents,

);

// Application Reducers
export const rootReducer = combineReducers<IAppState>({
    AuthReducer,
    StudentReducer
});




// for initialize in application 


const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);

export let store = createStoreWithMiddleware(rootReducer);