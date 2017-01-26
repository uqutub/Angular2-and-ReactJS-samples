import { NgModule } from '@angular/core';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import { createEpicMiddleware } from 'redux-observable';

import { combineReducers } from 'redux';

// Reducers
import { authReducer, PostReducer, MemberReducer } from './reducers';

// Actions
import { AuthActions, PostActions, MemberActions } from './actions';
export { AuthActions, PostActions, MemberActions } from './actions';

import { HttpService } from '../providers';

import { AuthEpics, PostEpics, MemberEpics } from './epics';

export { Observable } from 'rxjs';
export { select, NgRedux } from 'ng2-redux';
export { bindActionCreators } from 'redux';

export interface IAppState {
  auth?: Object;
  counter?: Object;
}

export const AppReducer = combineReducers<IAppState>({
  auth: authReducer,
  post: PostReducer,
  member: MemberReducer
});


@NgModule({
  providers: [
    // actions
    AuthActions,
    , PostActions
    , MemberActions
    // epics
    , AuthEpics
    , PostEpics
    , MemberEpics
    // other services
    , HttpService
  ]
})
export class StoreModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    private ae: AuthEpics,
    private pe: PostEpics,
    private me: MemberEpics,
  ) {
    const middleware = [
      createEpicMiddleware(this.ae.register),
      createEpicMiddleware(this.ae.createUser),
      createEpicMiddleware(this.ae.login),
      createEpicMiddleware(this.ae.logout),
      createEpicMiddleware(this.ae.getLoggedInUserData),
      createEpicMiddleware(this.ae.isLoggedIn),
      createEpicMiddleware(this.ae.updateProfile),
      createEpicMiddleware(this.pe.getMyPosts),
      createEpicMiddleware(this.pe.addPost),
      createEpicMiddleware(this.pe.getSinglePost),
      createEpicMiddleware(this.pe.getPosts),
      createEpicMiddleware(this.pe.editPost),
      createEpicMiddleware(this.pe.applyVacancy),
      createEpicMiddleware(this.pe.delVacancy),
      createEpicMiddleware(this.me.getStudents),
      createEpicMiddleware(this.me.getCompanies),
      createEpicMiddleware(this.me.delCompany),
      createEpicMiddleware(this.me.delStudent),
    ];
    this.ngRedux.configureStore(
      AppReducer,                                         // Main Reducer
      {},                                                 // Defailt State
      middleware,                                         // Middlewares
      [devTool.isEnabled() ? devTool.enhancer() : f => f] // Enhancers
    )
  }
} 