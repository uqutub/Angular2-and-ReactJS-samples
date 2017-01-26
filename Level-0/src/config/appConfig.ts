import { AuthProviders, AuthMethods } from 'angularfire2';

export class AppConfig {
    config: {
        // apiPDF: string,
        // apiBaseUrl: string,
        firebaseConfig: { apiKey: string, authDomain: string, databaseURL: string, storageBucket: string },
        firebaseAuthConfig: { provider: any, method: any };
    };

    constructor(env: string = 'dev') {
        if (env === 'dev') {
            this.config = {
                // 'apiPDF': 'https://polar-falls-53557.herokuapp.com/api',
                // 'apiBaseUrl': "https://htzis68yf2.execute-api.us-east-1.amazonaws.com/dev", //  'apiBaseUrl': 'https://o244tfx6eh.execute-api.us-east-1.amazonaws.com/dev',
                'firebaseConfig': {
                    apiKey: "AIzaSyD-OSjxLdOp3Hjiy0_KgKBAuns8Z-KnaOc",
                    authDomain: "m-level-0.firebaseapp.com",
                    databaseURL: "https://m-level-0.firebaseio.com",
                    storageBucket: "m-level-0.appspot.com",
                    // messagingSenderId: "305136679751"
                },
                firebaseAuthConfig: { provider: AuthProviders.Password, method: AuthMethods.Password }
            };
        } else {
            this.config = {
                // 'apiPDF': 'https://polar-falls-53557.herokuapp.com/api',
                // 'apiBaseUrl': 'https://fl3l0d8034.execute-api.us-east-1.amazonaws.com/prod',
                'firebaseConfig': {
                    apiKey: "AIzaSyD-OSjxLdOp3Hjiy0_KgKBAuns8Z-KnaOc",
                    authDomain: "m-level-0.firebaseapp.com",
                    databaseURL: "https://m-level-0.firebaseio.com",
                    storageBucket: "m-level-0.appspot.com",
                    // messagingSenderId: "305136679751"
                },
                firebaseAuthConfig: { provider: AuthProviders.Password, method: AuthMethods.Password }
            };
        }
    }
}

export let appConfig = new AppConfig('dev');
