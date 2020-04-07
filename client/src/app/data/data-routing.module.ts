import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataComponent } from "./data.component";
import { UsersComponent } from "./users/users.component";
import { UserAddComponent } from "./users/user-add/user-add.component";



const routes: Routes = [
  /*{ path: '', component: DataComponent, children: [{ path: '', component: UsersComponent, pathMatch: 'full' }, { path: 'users/add', component: UserAddComponent, outlet: 'addUser', pathMatch: 'full' }] },*/
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '', component: DataComponent, children: [{ path: '', component: UsersComponent }, { path: 'add', component: UserAddComponent }] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DataRoutingModule { }
