import { Action, createAction } from "redux-actions";

import { store } from '../index';

export default class StudentActions {

    static ADDALLVACANCIES: string = "ADDALLVACANCIES";
    static ADDMYVACANCIES: string = "ADDMYVACANCIES";
    static ADDCOMPANIES: string = "ADDCOMPANIES";
    static APPLYVACANT: string = "APPLYVACANT";
    static ADDVACANCY: string = "ADDVACANCY";
    static UPDATEDVACANCY: string = "UPDATEDVACANCY";
    static DELETEDVACANCY: string = "DELETEDVACANCY";
    static DELETEDVACANCY_EVENT: string = "DELETEDVACANCY_EVENT";
    static ADDSTUDENT: string = "ADDSTUDENT";


    static NULL: string = "NULL";

    constructor() { }

    static addAllVacancies(payload: Object) {
        store.dispatch({
            type: StudentActions.ADDALLVACANCIES,
            payload
        })
    }

    static addMyVacancies(payload: Object) {
        store.dispatch({
            type: StudentActions.ADDMYVACANCIES,
            payload
        })
    }

    static addCompanies(payload: Object) {
        store.dispatch({
            type: StudentActions.ADDCOMPANIES,
            payload
        })
    }

    static applyVacant(payload: Object) {
        return {
            type: StudentActions.APPLYVACANT,
            payload
        }
    }

    static addVacancy(payload: Object) {
        return {
            type: StudentActions.ADDVACANCY,
            payload
        }
    }

    static updateVacancy(payload: Object) {
        return {
            type: StudentActions.UPDATEDVACANCY,
            payload
        }
    }

    static deleteVacancy(payload: Object) {
        return {
            type: StudentActions.DELETEDVACANCY,
            payload
        }
    }

    static deleteVacancyEvent(payload: Object) {
        store.dispatch({
            type: StudentActions.DELETEDVACANCY_EVENT,
            payload
        })
    }

    static addStudent(payload: Object) {
        store.dispatch({
            type: StudentActions.ADDSTUDENT,
            payload
        })
    }




}

