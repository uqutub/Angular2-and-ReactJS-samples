import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState, Observable } from '../';
import { AngularFire } from 'angularfire2';

@Injectable()
export class MemberActions {

    static ADDMEMBER: string = 'ADDMEMBER';

    static ADDSTUDENT: string = 'ADDSTUDENT';
    static ADDCOMPANY: string = 'ADDCOMPANY';

    static DELSTUDENT: string = 'DELSTUDENT';
    static DELSTUDENTSUCCESS: string = 'DELSTUDENTSUCCESS';

    static DELCOMPANY: string = 'DELCOMPANY';
    static DELCOMPANYSUCCESS: string = 'DELCOMPANYSUCCESS';

    static NULL: string = 'NULL';

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private af: AngularFire
    ) {

    }

    delStudent(payload: Object): void {
        this.ngRedux.dispatch({
            type: MemberActions.DELSTUDENT,
            payload
        });
    }

    delCompany(payload: Object): void {
        this.ngRedux.dispatch({
            type: MemberActions.DELCOMPANY,
            payload
        });
    }




}