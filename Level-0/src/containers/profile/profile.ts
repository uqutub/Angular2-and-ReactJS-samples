import { Component, Input, OnInit } from '@angular/core';
import { Observable, select, AuthActions } from '../../store';
// import 'rxjs/add/operator/distinctUntilChnaged';

@Component({
    selector: 'profile',
    template: require('./profile.html'),
    styles: [require("./profile.scss")]
})
export class ProfileContainer {
    @select(['auth', 'user']) user$: Observable<any>;

    model: Object = {
        cuid: '',
        fuid: '',
        eml: '',
        fname: '',
        lname: '',
        type: ''
    };
    constructor(private aa: AuthActions) {
        this.user$.subscribe(u => {
            console.log('profule user$.subscribe ', u)
            this.model['cuid'] = u['cuid'];
            this.model['fuid'] = u['fuid'];
            this.model['eml'] = u['eml'];
            this.model['fname'] = u['fname'];
            this.model['lname'] = u['lname'];
            this.model['type'] = u['type'];
            this.model['contact'] = u['contact'];
            this.model['desc'] = u['desc'];

            if (u && u.type == 'company') {
                this.model['address'] = u['address'];
            } else if (u && u.type == 'student') {
                this.model['gpa'] = u['gpa'];
                this.model['year'] = u['year'];
            }

            console.log('this.model ', this.model)
        })
    }

    ngOnInit() { }

    onSubmit(valid, form) {
        this.aa.updateProfile(this.model);
    }


}
