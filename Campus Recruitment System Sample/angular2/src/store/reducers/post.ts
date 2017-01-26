import { PostActions } from '../actions';

interface IInitalState {
    isLoading: boolean;
    isError: { status: boolean, msg: string }
    posts: Object;
}

const InitalState: IInitalState = {
    isLoading: false,
    isError: { status: false, msg: null },
    posts: {}
};

export const PostReducer = function (state: IInitalState = InitalState, action: { type: string, payload?: any }) {
    let newpost = null;
    switch (action.type) {
        case PostActions.ADDPOST:
            return Object.assign({}, state, { isLoading: true });
        case PostActions.ADDPOSTSUCCESS:
            newpost = Object.assign({}, state.posts);
            newpost[action.payload.$key] = action.payload;
            return Object.assign({}, state, { isLoading: false, posts: newpost });
        case PostActions.ADDPOSTFAIL:
            return Object.assign({}, state, { isLoading: false, isError: action.payload.isError });
        case PostActions.APPLYVANACYSUCCESS:
            newpost = Object.assign({}, state.posts);
            if (newpost[action.payload['$key']] && newpost[action.payload['$key']]['applied']) {
                newpost[action.payload['$key']]['applied'][action.payload['studentId']] = action.payload['studentId']
            } else {
                newpost[action.payload['$key']]['applied'] = {};
                newpost[action.payload['$key']]['applied'][action.payload['studentId']] = action.payload['studentId']
            }
            return Object.assign({}, state, { posts: newpost });
        case PostActions.DELVACANCYSUCCESS: 
            newpost = Object.assign({}, state.posts);
            delete newpost[action.payload['$key']];
            return Object.assign({}, state, { posts: newpost });;
        default:
            return state;
    }
}