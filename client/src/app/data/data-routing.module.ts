import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataComponent } from "./data.component";
import { UsersComponent } from "./users/users.component";
import { UserAddComponent } from "./users/user-add/user-add.component";
import { UserDetailsComponent } from "./users/user-details/user-details.component";


const routes: Routes = [
  /*{ path: '', component: DataComponent, children: [{ path: '', component: UsersComponent, pathMatch: 'full' }, { path: 'users/add', component: UserAddComponent, outlet: 'addUser', pathMatch: 'full' }] },*/
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '', component: DataComponent, children: [{ path: '', component: UsersComponent }, { path: 'add', component: UserAddComponent }] },
  { path: '', component: DataComponent, children: [{ path: '', component: UsersComponent }, { path: 'details/:id', component: UserDetailsComponent, pathMatch: 'full' }] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DataRoutingModule { }
