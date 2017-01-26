import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable, select, AuthActions } from '../../store';

@Component({
    selector: 'signup',
    template: require('./signup.html'),
    styles: [require("./signup.scss")]
})
export class SignupContainer implements OnInit, OnDestroy {
    @select(['auth', 'isRegistered']) isRegistered$: Observable<boolean>;
    @select(['auth', 'isLoggedin']) isLoggedin$: Observable<boolean>;
    @select(['auth', 'user']) user$: Observable<boolean>;
    @select(['auth', 'isLoading']) isLoading$: Observable<boolean>;
    @select(['auth', 'isError']) isError$: Observable<any>;


    model: Object = { uid: '', fname: '', lname: '', eml: '', pwd: '', type: 'student' }
    subscription: any[] = [];

    // uId$: BehaviorSubject<string>;
    // userId: any = { 'checkUserId': false };
    // emailRegx: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    constructor(private router: Router, private aa: AuthActions) { }

    ngOnInit() { }

    onSubmit(valid, form) {
        console.log(valid, form)
        this.aa.register(this.model);
        this.user$.take(1).subscribe((u: any) => {
            if (u && u.type == 'admin') {
                // if user loggedin and type admin
                console.log('is user and admin loggedin')
                this.subscription[0] = this.isRegistered$.subscribe(d => {
                    if (d) {
                        this.router.navigate(['/home'])
                    }
                });
            } else {
                this.subscription[0] = this.isRegistered$.subscribe(d => {
                    if (d) {
                        this.router.navigate(['/signin'])
                    }
                });
            }
        });

    }

    ngOnDestroy() {
        this.subscription.map(x => {
            x.unsubscribe();
        })
    }

}
