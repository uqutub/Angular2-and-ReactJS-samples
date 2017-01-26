import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { NgReduxModule } from 'ng2-redux';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { MomentModule } from 'angular2-moment';
import { StoreModule } from '../store';
import { RootContainer } from '../containers/root/root';
import { ApplicationComponents, AppRoutes } from './routes';
import { providers } from '../providers';
import { Pipes } from "../pipes"
import { appConfig } from './appConfig';
import { EqualValidator } from '../directives/equal-validator.directive';

@NgModule({
  imports: [
    BrowserModule
    , RouterModule.forRoot(AppRoutes)
    , FormsModule
    , HttpModule
    , NgReduxModule
    , StoreModule
    , MaterialModule.forRoot()
    , AngularFireModule.initializeApp(appConfig.config.firebaseConfig, appConfig.config.firebaseAuthConfig)
    , MomentModule
  ]
  , declarations: [RootContainer, EqualValidator, ...ApplicationComponents, ...Pipes]
  , providers: [...providers]
  , entryComponents: []
  , bootstrap: [RootContainer]
})
export class AppModule { }
