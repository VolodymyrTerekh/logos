import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [LoginComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [
    RouterModule,
    HeaderComponent,
    SidebarComponent
  ],
})
export class CoreModule { }
