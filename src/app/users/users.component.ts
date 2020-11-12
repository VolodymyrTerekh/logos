import { Component, OnInit, OnDestroy } from '@angular/core';

import { SubscriptionLike  } from "rxjs";

import { IUser } from '../service/users/userInterface'

import { UserService } from '../service/users/users.service';
import { NotifyService } from '../service/notification/notify.service';
import { LoginService } from '../service/login/login.service';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { bounceAnimation } from '../animation/animated-router-outlet';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [bounceAnimation]
})
export class UsersComponent implements OnInit, OnDestroy {

  faTrash = faTrash;

  users: Array<IUser>;
  subscription:SubscriptionLike;

  currentUser: IUser;

  currentPage:number = 1;
  itemsPerPage:number = 7;
  pageSize: number;
  collectionSize: number;

  constructor(private userService: UserService, private notify: NotifyService, private loginService: LoginService) { 
    this.currentUser = this.loginService.currentUser;
  }

  ngOnInit() {
    this.getUsers()
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
    this.subscription = null;
  }


  addUserList(obj: {text: string}): void{
    const date = new Date().toString()
    this.users.push({
      name: obj.text,
      login: obj.text.toLowerCase(),
      email: obj.text + "@gmail.com",
      password: 12345,
      created_at: date,
      update_at: date,
      new_element: true,
      admin: false,
      id: this.users.length + 1
    })

    const numberOfList: number = this.users.length / 5;
    if (Math.floor(numberOfList) === numberOfList){
      this.onPageChange(numberOfList)
      this.currentPage = numberOfList
      return
    }
    this.currentPage = Math.floor(numberOfList+1)
    this.onPageChange(Math.floor(numberOfList+1))
  }

  getUsers(): void{
    // this.subscription = this.userService.getUsers().subscribe((users: Array<IUser>) => {
    //   this.users = users
    //   this.collectionSize = this.users.length
    // }, error => {
    //   console.log(error)
    // })

    this.subscription = this.userService.getUsers().subscribe({
      next: (users: Array<IUser>) => {
        this.users = users;
        this.collectionSize = this.users.length
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  
  deleteUser(id: number){
    this.userService.deleteUserById(id).subscribe( data => {
      this.users = this.users.filter( user => user.id != id)
      this.notify.showSuccess(data['msg'], 'User')
    }, error => {
      this.notify.showError('User not delete', 'User')
    })
    
    this.userService.deleteUserById(id).subscribe({
      next: (data) => {
        this.users = this.users.filter( user => user.id != id)
        this.notify.showSuccess(data['msg'], 'User')
      },
      error: error => {
        this.notify.showError('User not delete', 'User')
      }
    })
  }
  
  
  
  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
    this.collectionSize = this.users.length
  }


}
