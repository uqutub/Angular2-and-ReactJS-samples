import { DomSanitizationService } from './iconSanitizer';
import { HttpService } from './http';
import { AuthGuardService } from './authGuard';
import { FirebaseService } from './firebase';
import { ToastService } from './toast';

export const providers: any[] = [
    HttpService
    , AuthGuardService
    , FirebaseService
    , ToastService
    , DomSanitizationService
]

export {
    HttpService
    , AuthGuardService
    , FirebaseService
    , ToastService
    , DomSanitizationService
}