import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UsersService } from "../../core/services/users.service";
import { IUser } from "../../core/services/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: IUser[];

  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getAllUsers()
        .subscribe(users => this.users = users, error => console.log(error));
  }

}
