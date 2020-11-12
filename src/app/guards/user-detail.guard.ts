import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from '../service/login/login.service';
import { NotifyService } from '../service/notification/notify.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailGuard implements CanActivate, CanLoad {
  constructor(private loginService: LoginService, private notifyService: NotifyService){
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const can_view_details = +this.loginService.currentUser.can_view_details;
    const currentUserId = +this.loginService.currentUser.id;
    const nextId = +next.params['id']
    if (can_view_details === 1){
      return true
    }
    if (currentUserId === nextId){
      return true
    }
    this.notifyService.showError('You do not have permission', 'Permission')
    return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
