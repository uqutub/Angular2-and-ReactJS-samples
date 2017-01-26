import DummyActions from '../action/dummy';

// import { fromJS } from 'immutable';
// const INITIAL_STATE = fromJS({
//   count: 0,
// });

const INITIAL_STATE = {
    count: 0,
};

interface IAction {
    type: string,
    payload?: any
}

function counterReducer(state = INITIAL_STATE, action: IAction) {
    switch (action.type) {
        case DummyActions.LOAD_INITIAL_DATA_SUCCESS:
            console.log('reducer: LOAD_INITIAL_DATA_SUCCESS')
            // return state.update('count', (value) => value + 1);
            return Object.assign({}, state, { count: state.count + 1 });
        default:
            return state;
    }
}

export default counterReducer;