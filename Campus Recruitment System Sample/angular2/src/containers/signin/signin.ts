import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, select, AuthActions } from '../../store';

@Component({
  selector: 'signin',
  template: require('./signin.html'),
  styles: [require("./signin.scss")]
})
export class SigninContainer implements OnInit, OnDestroy {
  @select(['auth', 'isLoggedin']) isLoggedin$: Observable<boolean>;
  subscription: any[] = [];

  constructor(private router: Router, private aa: AuthActions) {
  }

  ngOnInit() { 
    this.subscription[0] = this.isLoggedin$.subscribe(d => {
      if(d){
        this.router.navigate(['/home'])
      } 
    
    });
  }

  ngOnDestroy(){
    this.subscription.map(x => {
      x.unsubscribe();
    })
  }

  onSubmit(valid, form) {
    this.aa.login(form);
  }

}
