import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { LoginService } from "../services/login.service";
import { UsersService } from "../services/users.service";
import { NotifyService } from "../../shared/notify.service";

import { Router, RouterModule } from '@angular/router';
import { IUser } from "../services/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  passwordOrLoginIsInvalid: boolean = false;
  msg: string;

  constructor(private router: Router, private formBuilder: FormBuilder, private loginService: LoginService,
              private userService: UsersService, private NotifyService: NotifyService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
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
        this.localStorageSave(user);
        this.loginService.currentUser = user['authUser'];
        this.loginForm.reset();
        this.router.navigate(["/users"]);
      },
      error: (err) => {
        this.passwordOrLoginIsInvalid = true;
        this.msg = err["msg"];
        this.NotifyService.showError(err["msg"], "Error");
      },
      complete: () => {
        console.log("complete");
      }
    })
  }

  localStorageSave(user: IUser){
    localStorage.setItem("access_token", user["token"]);
  }


}
