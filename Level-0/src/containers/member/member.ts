import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, select, PostActions } from '../../store';
// import 'rxjs/add/operator/distinctUntilChnaged';

@Component({
    selector: 'member-info',
    template: require('./member.html'),
    styles: [require("./member.scss")]
})
export class MemberContainer {
    @select(['auth', 'user']) user$: Observable<any>;
    @select(['member', 'members']) members$: Observable<any>;

    user: Object;
    userId: string;
    memberId: string = null;
    memberInfo: Object = null;

    constructor(private pa: PostActions, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(params => {
            this.memberId = params['id'];
        });

        this.user$.take(1).subscribe(u => {
            this.user = u;
            this.userId = u['$key'];
        });
        this.members$.take(1).subscribe(m => {
            console.log(this.memberId, m)
            if (this.memberId) {
                console.log(m[this.memberId])
                this.memberInfo = m[this.memberId];
            } else {
                // fire action for getting member details
            }
        })
    }

    ngOnInit() { }


    keys(object: {}) {
        return Object.keys(object);
    }



}
