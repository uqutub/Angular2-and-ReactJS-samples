import { Injectable, Inject } from '@angular/core';
import * as fb from 'firebase';
import { FirebaseApp, AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FirebaseService {

    private ref: fb.database.Reference;
    private storage: fb.storage.Reference;
    private auth: fb.auth.Auth;
    public firebaseTimeStamp = fb.database['ServerValue'].TIMESTAMP;

    constructor(
        @Inject(FirebaseApp) private fbApp: any,
        private af: AngularFire
    ) {
        this.ref = this.fbApp.database().ref();
        this.storage = this.fbApp.storage().ref();
        this.auth = this.fbApp.auth();
    }

    saveMultipath(multipath) {
        return this.ref.update(multipath);
    } // saveMultipath

 

}