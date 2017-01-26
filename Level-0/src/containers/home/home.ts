import { Component, Input, OnInit } from '@angular/core';
import { Observable, select, PostActions, MemberActions } from '../../store';
// import 'rxjs/add/operator/distinctUntilChnaged';

@Component({
  selector: 'home',
  template: require('./home.html'),
  styles: [require("./home.scss")]
})
export class HomeContainer {
  @select(['auth', 'user']) user$: Observable<any>;
  @select(['post', 'posts']) posts$: Observable<any>;
  @select(['member', 'members']) members$: Observable<any>;
  @select(['member', 'students']) students$: Observable<any>;
  @select(['member', 'companies']) companies$: Observable<any>;

  posts: Object;
  user: Object;
  userId: string;
  vacancies: Object;
  comapnies: Object;
  students: Object;

  constructor(private pa: PostActions, private ma: MemberActions) {
    this.user$.take(1).subscribe(u => {
      this.user = u;
      this.userId = u['$key'];
    });
  }

  ngOnInit() { }

  checkApplied(id: string): string {
    // Apply {{(posts$ | async)[post]?.applied[userId]}}
    if (this.posts[id].applied && this.posts[id].applied[this.userId]) {
      return 'Applied'
    }

    return 'Apply';
  }

  keys(object: {}) {
    return Object.keys(object);
  }
  keysP(object: {}) {
    this.posts = object;
    return Object.keys(object);
  }

  keysV(object: {}) {
    this.vacancies = object;
    return Object.keys(object);
  }

  keysC(object: {}) {
    this.comapnies = object;
    return Object.keys(object);
  }

  keysS(object: {}) {
    this.students = object;
    return Object.keys(object);
  }

  onApply(id: string) {
    console.log(id, this.posts[id]);
    let obj = Object.assign({}, this.posts[id]);
    obj['studentId'] = this.user['$key']
    this.pa.applyVanacy(obj);
  }

  delStudent(id: string) {
    // console.log('del studen. ', this.students[id])
    this.ma.delStudent(this.students[id]);
  }

  delCompany(id: string) {
    // console.log('del com. ', this.comapnies[id])
    this.ma.delCompany(this.comapnies[id]);
  }

  delVacancy(id: string) {
    // console.log('del vacnt. ', this.vacancies[id])
    this.pa.delVacancy(this.vacancies[id]);
  }


  appliedCount(id: string): number {
    if (this.vacancies[id].applied) {
      return Object.keys(this.vacancies[id].applied).length;
    }

    return 0;
  }

}
