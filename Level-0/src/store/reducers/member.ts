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
            console.log('addmember ', Object.assign({}, state, { members: obj }))
            return Object.assign({}, state, { members: obj });
        case MemberActions.ADDSTUDENT:
            obj = Object.assign({}, state.students);
            obj[action.payload['$key']] = action.payload;
            console.log('add students ', Object.assign({}, state, { students: obj }))
            return Object.assign({}, state, { students: obj });
        case MemberActions.ADDCOMPANY:
            obj = Object.assign({}, state.companies);
            obj[action.payload['$key']] = action.payload;
            console.log('add company ', Object.assign({}, state, { companies: obj }))
            return Object.assign({}, state, { companies: obj });

        // case PostActions.ADDPOSTSUCCESS:
        //     newpost = Object.assign({}, state.posts);
        //     newpost[action.payload.$key] = action.payload;
        //     console.log(Object.assign({}, state, { isLoading: false, posts: newpost }))
        //     return Object.assign({}, state, { isLoading: false, posts: newpost });
        // case PostActions.ADDPOSTFAIL:
        //     return Object.assign({}, state, { isLoading: false, isError: action.payload.isError });
        default:
            return state;
    }
}