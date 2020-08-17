import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UsersService } from "../../core/services/users.service";
import { LoginService } from "../../core/services/login.service";
import { IUser } from "../../core/services/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: IUser[];
  currentUser: IUser;

  can_view_users = false;
  can_edit_user = false;
  can_view_user = false;
  can_delete_user = false;
  can_view_details_full = false;
  can_edit_users_full = false;


  constructor(private router: Router, private usersService: UsersService, private loginService: LoginService) {

    /*if(this.currentUser['entitlements'].some(e => e === 'can_view_users')) {
      this.can_view_users = true;
      console.log(this.can_view_users);
    }

    if(this.currentUser['entitlements'].some(e => e === 'can_edit_user')) {
      this.can_edit_user = true;
    }

    if(this.currentUser['entitlements'].some(e => e === 'can_view_user')) {
      this.can_view_user = true;
    }

    if(this.currentUser['entitlements'].some(e => e === 'can_delete_user')) {
      this.can_delete_user = true;
    }

    if(this.currentUser['entitlements'].some(e => e === 'can_view_details_full')) {
      this.can_view_details_full = true;
    }

    if(this.currentUser['entitlements'].some(e => e === 'can_edit_users_full')) {
      this.can_edit_users_full = true;
    }*/
  }

  ngOnInit() {
    this.currentUser = this.loginService.currentUser;
    if(this.currentUser[0].entitlements.find(x => x === "can_view_users")){
      this.can_view_users = true;
    }
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getAllUsers()
        .subscribe(users => this.users = users, error => console.log(error));
  }

}
