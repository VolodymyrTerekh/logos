import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataComponent } from './data.component';
import { DataRoutingModule } from "./data-routing.module";
import { UsersComponent } from "./users/users.component";
import { UserDetailsComponent } from "./users/user-details/user-details.component";


@NgModule({
  imports: [
    CommonModule,
    DataRoutingModule
  ],
  declarations: [DataComponent, UsersComponent, UserDetailsComponent]
})
export class DataModule { }
