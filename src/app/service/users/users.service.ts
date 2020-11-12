import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { IUser } from './userInterface';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:3001/users';
  // baseUrl = '/users';
  users: Array<IUser>;

  constructor(private http: HttpClient) {
  }


  getUsers(): Observable<Array<IUser>>{
    const headers = new HttpHeaders().set("access-token", localStorage.getItem("access_token"))
    return this.http.get<Array<IUser>>(this.baseUrl).pipe(
      catchError( (err: HttpErrorResponse) => {
        console.log(err)
        return throwError(err)
      })
    )
  }

  getUserById(id: number): Observable<IUser>{
    return this.http.get<IUser>(this.baseUrl + `/${id}`)
  }

  updateUserById(id: number, userName: string, userLogin: string){
    return this.http.put(this.baseUrl + `/${id}`, {id: id, name: userName, login: userLogin})
  }

  deleteUserById(id: number): Observable<Object>{
    return this.http.delete(this.baseUrl + `/${id}`)
  }

  getUserEntitlementsById(id: number){
    return this.http.get(this.baseUrl + `/${id}/entitlements`)
  }

  addUserEntitlementsById(id: number, entitlements: string){
    return this.http.put(this.baseUrl + `/${id}/add-entitlements`, {id: id, entitlements: entitlements})
  }

  deleteUserEntitlementsById(id: number, entitlements: string){
    return this.http.put(this.baseUrl + `/${id}/delete-entitlements`, {id: id, entitlements: entitlements})
  }

  addUser(name:string){
    const headers = new HttpHeaders().set("access-token", localStorage.getItem("access_token"))
    return this.http.post(this.baseUrl, {name: name}, { responseType: 'text'})
  }
}
