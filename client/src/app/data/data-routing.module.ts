import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataComponent } from "./data.component";
import { UsersComponent } from "./users/users.component";
import { UserDetailsComponent } from "./users/user-details/user-details.component";



const routes: Routes = [
  { path: '', component: DataComponent, children: [{ path: '', component: UsersComponent }] },
  { path: '/:id', component: UserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DataRoutingModule { }
