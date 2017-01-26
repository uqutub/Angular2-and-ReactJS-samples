import { Component, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable, select, AuthActions } from '../../store';
// import { FirebaseService } from '../../providers';
// import 'rxjs/add/operator/distinctUntilChnaged';

declare let google: any;

declare let firebase: any;
// firebase.database.enableLogging(true);
// firebase.database.enableLogging((logMessage) => {
//   // Add a timestamp to the messages.
//   console.log('logging ------------ : ' + logMessage);
// });

@Component({
  selector: 'root',
  template: require('./root.html'),
  styles: [require('./root.scss') /*, require("./../assets/scss/variables.scss")*/],
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
