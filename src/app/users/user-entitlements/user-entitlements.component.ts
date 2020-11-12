import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from 'src/app/service/login/login.service';
import { IUser } from 'src/app/service/users/userInterface';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/users/users.service';
import { NotifyService } from 'src/app/service/notification/notify.service';



@Component({
  selector: 'app-user-entitlements',
  templateUrl: './user-entitlements.component.html',
  styleUrls: ['./user-entitlements.component.css']
})
export class UserEntitlementsComponent implements OnInit {

  userId: number;
  entitlements: object[];
  disableSelect = new FormControl(false);

  selectAddEntitlements: string;
  selectDeleteEntitlements: string;

  constructor(private userService: UserService, private loginService: LoginService, 
              private activatedRoute: ActivatedRoute, private notifyService:NotifyService) {
    
  }


  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe( data => {
      this.userId = data['params'].userId
      this.userService.getUserEntitlementsById(this.userId).subscribe( data => {
        this.entitlements = Object.entries(data['user']).map(([entitlements, value]) => ({entitlements, value}))
      })
    })
  }

  addEntitlements(){
    if (this.selectAddEntitlements === ''){
      return
    }
    this.userService.addUserEntitlementsById(this.userId, this.selectAddEntitlements).subscribe( data => {
      this.entitlements = Object.entries(data['entitlements']).map(([entitlements, value]) => ({entitlements, value}))
      this.notifyService.showSuccess('Update user permission', "Permission")
    }, error => console.log(error))
  }

  deleteEntitlements(){
    if (this.selectDeleteEntitlements === ''){
      return
    }
    this.userService.deleteUserEntitlementsById(this.userId, this.selectDeleteEntitlements).subscribe( data => {
      this.entitlements = Object.entries(data['entitlements']).map(([entitlements, value]) => ({entitlements, value}))
      this.notifyService.showSuccess('Delete user permission', "Permission")
    }, error => console.log(error))
  }


  
}
