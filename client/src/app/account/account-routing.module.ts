import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from "./account.component";
import { MyPageComponent } from "./my-page/my-page.component";

const routes: Routes = [
  { path: '', component: AccountComponent, children: [{ path: '', component: MyPageComponent }] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountRoutingModule { }
