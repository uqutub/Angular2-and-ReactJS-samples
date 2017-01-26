import { AuthProviders, AuthMethods } from 'angularfire2';

export class AppConfig {
    config: {
        firebaseConfig: { apiKey: string, authDomain: string, databaseURL: string, storageBucket: string },
        firebaseAuthConfig: { provider: any, method: any };
    };

    constructor(env: string = 'dev') {
        this.config = {
            'firebaseConfig': {
                apiKey: "AIzaSyD-OSjxLdOp3Hjiy0_KgKBAuns8Z-KnaOc",
                authDomain: "m-level-0.firebaseapp.com",
                databaseURL: "https://m-level-0.firebaseio.com",
                storageBucket: "m-level-0.appspot.com",
            },
            firebaseAuthConfig: { provider: AuthProviders.Password, method: AuthMethods.Password }
        };
    }
}

export let appConfig = new AppConfig('dev');
