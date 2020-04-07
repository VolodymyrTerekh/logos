import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DataComponent } from './data.component';
import { DataRoutingModule } from "./data-routing.module";
import { UsersComponent } from "./users/users.component";
import { UserDetailsComponent } from "./users/user-details/user-details.component";
import { UserAddComponent } from './users/user-add/user-add.component';


@NgModule({
  imports: [
    CommonModule,
    DataRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [DataComponent, UsersComponent, UserDetailsComponent, UserAddComponent]
})
export class DataModule { }
