import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Router } from '@angular/router';

import { NotifyService } from '../../service/notification/notify.service'

import { LoginService } from '../../service/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  pageLoad: boolean = false 
  constructor(private notify: NotifyService, private loginService: LoginService, private router: Router) { 

  }

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const token = localStorage.getItem("access_token")
    if (this.loginService.isLoggedIn){
      this.pageLoad = true
      return true
    }
    this.notify.showError("Please sign-in or sign-up", "Error")
    this.router.navigateByUrl('login')
    return false
  }

  canLoad(){
    const token = localStorage.getItem("access_token")
    if (this.loginService.isLoggedIn){
      this.pageLoad = true
      return true
    }
    this.notify.showError("Please sign-in or sign-up", "Error")
    this.router.navigateByUrl('login')
    return false
  }
}
