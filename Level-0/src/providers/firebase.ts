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

    getPushRef(path) {
        return this.ref.child(path).push();
    }

    uploadImageOnStorageBase64(path, image: string): Promise<string> {
        return new Promise(res => {
            this.storage.child(path).putString(image, 'base64')
                .then((snapshot) => {
                    console.log('Uploaded a base64 string!');
                    // The promise will resolve with a Download URL provided by Firebase Storage
                    res(snapshot.downloadURL);
                });
        });
    }

    uploadImageOnStorageBlob(path, blob): Promise<string> {
        return new Promise(res => {
            this.storage.child(path).put(blob).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                // The promise will resolve with a Download URL provided by Firebase Storage
                res(snapshot.downloadURL);
            })
        });
    }

}

// export const firebase = new FirebaseService();