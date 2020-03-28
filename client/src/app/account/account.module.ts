import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountComponent } from './account.component';
import { AccountRoutingModule } from "./account-routing.module";
import { MyPageComponent } from "./my-page/my-page.component";


@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule
  ],
  declarations: [AccountComponent, MyPageComponent]
})
export class AccountModule { }
