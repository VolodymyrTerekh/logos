import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/service/users/userInterface';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/service/users/users.service';

import { ComponentCanDeactivate } from '../../guards/exit-users-detail/exit.user-detail.guard'

import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/service/login/login.service';
import { NotifyService } from 'src/app/service/notification/notify.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, AfterViewInit, ComponentCanDeactivate {

  saveUserBtn: boolean = false;
  showEntitlements: boolean = false;

  currentUser: IUser;
  currentShowUserDetail: IUser;

  userForm: FormGroup = new FormGroup({
    userName: new FormControl({value: '', disabled: true}),
    userEmail: new FormControl({value: '', disabled: true}),
    userLogin: new FormControl({value: '', disabled: true}),
    userPassword: new FormControl({value: '****', disabled: true}),
  });

  get getShowEntitlements(){
    return this.showEntitlements = !this.showEntitlements
  }

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, 
              private userService: UserService, private loginService: LoginService, private notify: NotifyService) { }

  ngOnInit() {
    this.currentUser = this.loginService.currentUser
    this.activatedRoute.params.subscribe( data => {
      this.userService.getUserById(data['id']).subscribe( (user: IUser) => {
        this.currentShowUserDetail = user['user']
        this.userForm.get('userName').setValue(this.currentShowUserDetail.name)
        this.userForm.get('userEmail').setValue(this.currentShowUserDetail.email)
        this.userForm.get('userLogin').setValue(this.currentShowUserDetail.login)
      })
    })

  }
  ngAfterViewInit(){
  }

  editUser(): void{
    if (this.currentUser.can_edit_users !== 1){
      if ( this.currentUser.id === this.currentShowUserDetail.id ){
        this.userForm.get('userName').enable();
        this.userForm.get('userLogin').enable();
        this.saveUserBtn = true;
        return
      }
      this.notify.showError("You do not have permission", "Permission")
      return
    }
    this.userForm.get('userName').enable();
    this.userForm.get('userLogin').enable();
    this.saveUserBtn = true;
  }

  saveUser(): void{
    const userNameValue = this.userForm.get('userName').value;
    const userLoginValue = this.userForm.get('userLogin').value;
    if (this.userForm.dirty && this.userForm.touched){
      if (userNameValue !== this.currentShowUserDetail.name || userLoginValue !== this.currentShowUserDetail.login){
        this.userService.updateUserById(this.currentShowUserDetail.id, userNameValue, userLoginValue).subscribe( data => {
          this.notify.showSuccess(data['msg'], "User")
          this.currentShowUserDetail.name = userNameValue;
          this.currentShowUserDetail.login = userLoginValue;
        }, error => {
          this.notify.showError('Server faild', "Server")
        })
      }
    }
    this.userForm.get('userName').disable();
    this.userForm.get('userLogin').disable();
    this.saveUserBtn = false;
  }

  canDeactivate(): boolean{
    const userNameValue = this.userForm.get('userName').value;
    const userLoginValue = this.userForm.get('userLogin').value;
    if (this.currentShowUserDetail.name !== userNameValue || this.currentShowUserDetail.login !== userLoginValue){
      const say = confirm('You did not save user! Save?')
      if (say === true){
        this.userService.updateUserById(this.currentShowUserDetail.id, userNameValue, userLoginValue).subscribe( data => {
          this.notify.showSuccess(data['msg'], "User")
          return true
        })
      }
      return true
    }
    return true
  }


}
