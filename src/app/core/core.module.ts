import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { LoginModule } from '../login/login.module';

import { CoreRoutingModule } from './core-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { RefreshTokenInterceptor } from '../interceptor/jwt.interveptor';
import { AuthInterceptor } from '../interceptor/httpconfig.interceptor';

import { UserEntitlementsComponent } from '../users/user-entitlements/user-entitlements.component';
import { AppComponent } from '../app.component';

import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [AppComponent, UserEntitlementsComponent],
  imports: [
    CommonModule,

    CoreRoutingModule,

    LoginModule,

    HttpClientModule,
    
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

    MatSelectModule,
    MatButtonModule,

    ReactiveFormsModule,
    FormsModule,

  ],
  exports: [
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
