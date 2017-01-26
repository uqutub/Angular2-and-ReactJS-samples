import { createAction, Action } from 'redux-actions';

export default class DummyActions {

    static LOAD_INITIAL_DATA: string = 'LOAD_INITIAL_DATA';
    static LOAD_INITIAL_DATA_SUCCESS: string = 'LOAD_INITIAL_DATA_SUCCESS';
    static DUMMY: string = 'DUMMY'

    static loadData() {
        console.log('action LOAD_INITIAL_DATA_SUCCESS')
        return {
            type: DummyActions.LOAD_INITIAL_DATA_SUCCESS
        };

    }

    // static decrement() {
    //     console.log('action decrement')
    //     return {
    //         type: CounterActions.DECREMENT_COUNTER,
    //     };
    // }


    // static addTodo = createAction<any>(
    //     CounterActions.DUMMY,
    //     payload => payload
    // );

}
