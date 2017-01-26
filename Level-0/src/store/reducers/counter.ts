import {CounterActions} from '../actions/counter';
interface IInitalState {
  counter: number;
}

const InitalState: IInitalState = {
  counter: 0
};


export const CounterReducer = function (state: IInitalState = InitalState, action: { type: string, payload?: any }) {
  switch (action.type) {
    case CounterActions.INCREMENT:
    console.log('case CounterActions.INCREMENT:')
      return Object.assign({}, state, { counter: state.counter+1 });
    case CounterActions.DECREMENT:
    console.log('case CounterActions.DECREMENT:')
      return Object.assign({}, state, { counter: state.counter-1 });
    default:
      return state;
  }
}