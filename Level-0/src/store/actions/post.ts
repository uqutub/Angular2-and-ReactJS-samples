import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState, Observable } from '../';
import { AngularFire } from 'angularfire2';

@Injectable()
export class PostActions {

    static ADDPOST: string = 'ADDPOST';
    static ADDPOSTSUCCESS: string = 'ADDPOSTSUCCESS';
    static ADDPOSTFAIL: string = 'ADDPOSTFAIL';

    static GETSINGLEPOST: string = 'GETSINGLEPOST';

    static GETRECENTPOST: string = 'GETRECENTPOST';

    static EDITPOST: string = 'EDITPOST';
    static EDITPOSTSUCCESS: string = 'EDITPOSTSUCCESS';
    static EDITPOSTFAIL: string = 'EDITPOSTFAIL';

    static APPLYVANACY: string = 'APPLYVANACY';
    static APPLYVANACYSUCCESS: string = 'APPLYVANACYSUCCESS';

    static DELVACANCY: string = 'DELVACANCY';
    static DELVACANCYSUCCESS: string = 'DELVACANCYSUCCESS';

    static NULL: string = 'NULL';

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private af: AngularFire
    ) {

    }

    addPost(payload: Object): void {
        console.log('postData ')
        this.ngRedux.dispatch({
            type: PostActions.ADDPOST,
            payload
        });
    }

    editPost(payload: Object): void {
        this.ngRedux.dispatch({
            type: PostActions.EDITPOST,
            payload
        });
    }

    applyVanacy(payload) {
        this.ngRedux.dispatch({
            type: PostActions.APPLYVANACY,
            payload
        });
    }

    delVacancy(payload) {
        this.ngRedux.dispatch({
            type: PostActions.DELVACANCY,
            payload
        });
    }



}