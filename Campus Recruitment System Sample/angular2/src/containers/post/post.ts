import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, select, AuthActions, PostActions } from '../../store';

@Component({
    selector: 'post',
    template: require('./post.html'),
    styles: [require("./post.scss")]
})
export class PostContainer implements OnInit, OnDestroy {

    @select(['auth', 'user']) user$: Observable<boolean>;
    @select(['member', 'members']) members$: Observable<boolean>;
    @select(['post', 'posts']) posts$: Observable<any>;

    user: any;
    model: Object = { title: '', description: '' };
    subscription: any[] = [];
    posts: any;
    isEdit: boolean = false;
    popup: any = {};

    constructor(private router: Router, private aa: AuthActions, private pa: PostActions) {
        this.user$.take(1).subscribe((u: any) => {
            this.user = u;
            if (!u) {
                this.router.navigate(['/signin']);
            }

            if (u && u.type != 'company') {
                this.router.navigate(['/home']);
            }
        })
    }

    ngOnInit() { }

    ngOnDestroy() {
    }

    clearModel() {
        this.model = { title: '', description: '', $key: '' };
        this.isEdit = false;
    }


    clear() {
        this.clearModel();
    }

    onSubmit(valid, form) {
        form['uid'] = this.user.cuid;
        form['name'] = this.user.fname;
        if (this.isEdit) {
            form['$key'] = this.model['$key']
            this.pa.editPost(form);
        } else {
            this.pa.addPost(form);
        }
        this.clearModel();

    }

    keys(object: {}) {
        this.posts = object;
        return Object.keys(object);
    }

    onEdit(key: string) {
        this.model['title'] = this.posts[key]['title'];
        this.model['description'] = this.posts[key]['description'];
        this.model['$key'] = this.posts[key]['$key'];
        this.isEdit = true;
    }

    checkApplied(id: string): number {
        if (this.posts[id].applied) {
            return Object.keys(this.posts[id].applied).length;
        }

        return 0;
    }

    onModalPopupClick(id: string) {
        this.popup.header = `Students Applied on ${this.posts[id].title}`;
        this.popup.students = this.posts[id].applied ? Object.keys(this.posts[id].applied) : [];
    }

}
