import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  template: require('./navbar.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit {

  @Input() isLoggedin: boolean;
  @Input() user: Object;
  @Output() logoutFire: EventEmitter<any>;

  constructor(private router: Router) {
    this.logoutFire = new EventEmitter();
  }

  ngOnInit() { }

  logout() {
    this.logoutFire.emit()
  }

}
