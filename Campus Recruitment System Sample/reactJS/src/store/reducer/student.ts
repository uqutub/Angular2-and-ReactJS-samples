import StudentAction from "./../action/student";

const INITIAL_STATE = {
    isError: { status: false, msg: '' },
    isProcessing: false,
    vacancies: {},
    companies: {},
    students: {}
}

interface IACTION {
    type: string,
    payload?: any
}


function StudentReducer(state = INITIAL_STATE, action: IACTION) {
    let newObj: any = null;
    switch (action.type) {

        case StudentAction.ADDALLVACANCIES:
            newObj = Object.assign({}, state.vacancies);
            newObj[action.payload['$key']] = action.payload;
            // console.log('StudentAction.ADDALLVACANCIES STUDENT ADMIN---------------------------', Object.assign({}, state, { vacancies: newObj }))
            return Object.assign({}, state, { vacancies: newObj });

        case StudentAction.ADDMYVACANCIES:
            newObj = Object.assign({}, state.vacancies);
            newObj[action.payload['$key']] = action.payload;
            // console.log('StudentAction.ADDMYVACANCIES COMAPNY---------------------------', Object.assign({}, state, { vacancies: newObj }))
            return Object.assign({}, state, { vacancies: newObj });

        case StudentAction.ADDCOMPANIES:
            newObj = Object.assign({}, state.companies);
            newObj[action.payload['$key']] = action.payload;
            // console.log('ADDCOMPANIES   student or admin ', Object.assign({}, state, { companies: newObj }))
            return Object.assign({}, state, { companies: newObj });


        case StudentAction.DELETEDVACANCY_EVENT:
            console.log('StudentAction.DELETEDVACANCY_EVENT ----------', action.payload)
            newObj = Object.assign({}, state.vacancies);
            delete newObj[action.payload.$key];
            return Object.assign({}, state, { vacancies: newObj });

        case StudentAction.ADDSTUDENT:
            console.log('my studentsssss-----', action.payload);
            newObj = Object.assign({}, state.students);
            newObj[action.payload['$key']] = action.payload;
            return Object.assign({}, state, { students: newObj });

        default:
            return state;

    }
}

export default StudentReducer;