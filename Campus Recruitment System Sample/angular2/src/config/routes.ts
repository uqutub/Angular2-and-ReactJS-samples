import { Routes } from '@angular/router';

import { Containers, HomeContainer, SigninContainer, SignupContainer, PostContainer, ProfileContainer, MemberContainer, RootContainer } from '../containers';
import { Components } from "../components";

import { AuthGuardService } from '../providers/index';

export const AppRoutes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' }
  , { path: "signin", component: SigninContainer }
  , { path: "signup", component: SignupContainer }
  , {
    path: "",
    canActivate: [AuthGuardService],
    children: [
      { path: "home", component: HomeContainer },
      { path: "profile", component: ProfileContainer },
      { path: "post", component: PostContainer },
      { path: "u/:id", component: MemberContainer },
    ]
  }
];

export const ApplicationComponents: any[] = [
  Containers
  , Components
];