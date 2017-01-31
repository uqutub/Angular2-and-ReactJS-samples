import * as firebase from "firebase";
import configiration from "./../config/index";

firebase.initializeApp(configiration.firebaseDev);

export class FirebaseServie {
    static mainRef = firebase.database().ref();
    static storage = firebase.storage().ref();
    static auth = firebase.auth;

    static saveImageToFirebase(location: string, filename: string, file: Object) {
        console.log(FirebaseServie.storage);
        return new Promise((resolve, reject) => {
            var uploadRef = FirebaseServie.storage.child(location).child(filename).put(file);
            uploadRef.on('state_changed', null, (err) => {
                reject(err)
            }, () => {
                resolve(uploadRef.snapshot.downloadURL)
            });
        })
    }
}