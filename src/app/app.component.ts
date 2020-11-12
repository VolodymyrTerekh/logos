import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './service/login/login.service';
import {bounceAnimation} from './animation/animated-router-outlet';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    animations: [bounceAnimation]
})
export class AppComponent {
  title = 'user-system';

  constructor(private router: Router, private loginService: LoginService){

  }

  get isLoggedIn(){
    return this.loginService.isLoggedIn;
  }

  getUsers(){
    this.router.navigateByUrl('/users');
  }

  getDashboard(){
    this.router.navigateByUrl('/dashboard');
  }

  getMyPage(){
    this.router.navigateByUrl('/my-page');
  }

  logOut(){
    this.loginService.logOut();
  }

}
