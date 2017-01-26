import { Component, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable, select, AuthActions } from '../../store';

declare let google: any;
declare let firebase: any;

@Component({
  selector: 'root',
  template: require('./root.html'),
  styles: [require('./root.scss')],
  encapsulation: ViewEncapsulation.None
})
export class RootContainer implements OnInit, OnDestroy {
  @select(['auth', 'isLoggedin']) isLoggedin$: Observable<boolean>;
  @select(['auth', 'user']) user$: Observable<any>;

  constructor(private aa: AuthActions) { }

  ngOnInit() { }

  ngOnDestroy() { }

  logoutFireHandler() {
    console.log('logoutFireHandler ')
    this.aa.logout();
  }

}
