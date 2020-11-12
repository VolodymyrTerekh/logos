import { Component, OnInit,  AfterViewInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoginService } from '../service/login/login.service';
import { UserService } from '../service/users/users.service';
import { NotifyService } from '../service/notification/notify.service';

import { Router } from '@angular/router';
import { IUser } from '../service/users/userInterface';
import {bounceAnimation} from '../animation/animated-router-outlet';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [bounceAnimation]

})
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  passwordOrLoginIsInvalid: boolean = false;
  msg: string;

  constructor(private router: Router, private loginService: LoginService,
              private userService: UserService, private notifyService: NotifyService) {
    this.loginForm = new FormGroup({
      "login": new FormControl("", Validators.required),
      "password": new FormControl("", Validators.required),
    })
   }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  get loginField() {
    return this.loginForm.get('login');
  }

  get passwordField() {
    return this.loginForm.get('password');
  }

  login(){
    this.loginService.login(this.loginForm.value).subscribe({
      next: (user: IUser) => {
        this.localStorageSave(user)
        this.loginService.currentUser = user['user']
        this.loginForm.reset();
        this.router.navigate(["/users"]);
      },
      error: (err) => {
        this.passwordOrLoginIsInvalid = true;
        this.msg = err["msg"]
        this.notifyService.showError(err["msg"], "Error")
      },
      complete: () => {
        console.log("complete")
      }
    })
  }
  localStorageSave(user: IUser){
    localStorage.setItem("access_token", user["token"]);
    localStorage.setItem("refresh_token", user["refreshToken"]);
  }


}
