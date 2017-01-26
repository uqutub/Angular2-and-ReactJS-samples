import { MemberActions } from '../actions';

interface IInitalState {
    isLoading: boolean;
    isError: { status: boolean, msg: string }
    members: Object;
    students: Object;
    companies: Object;
}

const InitalState: IInitalState = {
    isLoading: false,
    isError: { status: false, msg: null },
    members: {},
    students: {},
    companies: {}
};

export const MemberReducer = function (state: IInitalState = InitalState, action: { type: string, payload?: any }) {
    let obj = null;
    switch (action.type) {
        case MemberActions.ADDMEMBER:
            obj = Object.assign({}, state.members);
            obj[action.payload['$key']] = action.payload;
            return Object.assign({}, state, { members: obj });
        case MemberActions.ADDSTUDENT:
            obj = Object.assign({}, state.students);
            obj[action.payload['$key']] = action.payload;
            return Object.assign({}, state, { students: obj });
        case MemberActions.ADDCOMPANY:
            obj = Object.assign({}, state.companies);
            obj[action.payload['$key']] = action.payload;
            return Object.assign({}, state, { companies: obj });

        default:
            return state;
    }
}