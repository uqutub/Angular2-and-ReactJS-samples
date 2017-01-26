import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState, Observable } from '../';

@Injectable()
export class CounterActions {

    static INCREMENT: string = 'INCREMENT';
    static DECREMENT: string = 'DECREMENT';

    constructor(private ngRedux: NgRedux<IAppState>) { }

    increment() {
        this.ngRedux.dispatch({
            type: CounterActions.INCREMENT
        });
    }

    decrement() {
        this.ngRedux.dispatch({
            type: CounterActions.DECREMENT
        });
    }

}