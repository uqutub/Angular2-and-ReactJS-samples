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
    // this.loader = true;
  }

  ngOnInit() { 
    this.subscription[0] = this.isLoggedin$.subscribe(d => {
      if(d){
        this.router.navigate(['/home'])
      } 
      // else {
      //   this.router.navigate(['/signin'])
      // }
    });
  }

  ngOnDestroy(){
    this.subscription.map(x => {
      x.unsubscribe();
    })
  }


  

  onSubmit(valid, form) {
    console.log(valid, form)
    this.aa.login(form);
  }

}
