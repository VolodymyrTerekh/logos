import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";

import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [LoginComponent, HeaderComponent, SidebarComponent, FooterComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule
  ],
  exports: [
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
})
export class CoreModule { }
