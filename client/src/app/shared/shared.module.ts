import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ToastrModule, ToastrService} from 'ngx-toastr';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    ToastrService
  ]
})
export class SharedModule { }
