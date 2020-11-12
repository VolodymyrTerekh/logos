import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AddUserComponent } from './add-user/add-user.component';

import { SortByPipe } from '../shared/sort-by.pipe';

import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    UsersComponent,
    UserDetailComponent,
    AddUserComponent,
    SortByPipe
  ],
  imports: [
    CommonModule,

    HttpClientModule,

    UsersRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    NgbModule,
    FontAwesomeModule,
    MatSelectModule
  ],
  providers:[
  ]
})
export class UsersModule { }
