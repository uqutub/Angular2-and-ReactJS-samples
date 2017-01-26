import { HttpService } from './http';
import { AuthGuardService } from './authGuard';
import { FirebaseService } from './firebase';
import { ToastService } from './toast';

export const providers: any[] = [
    HttpService
    , AuthGuardService
    , FirebaseService
    , ToastService
]

export {
    HttpService
    , AuthGuardService
    , FirebaseService
    , ToastService
}