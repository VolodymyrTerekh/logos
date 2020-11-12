import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IUser } from '../users/userInterface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = 'http://localhost:3001/auth/';
  // baseUrl = '/auth/';

  currentUser: IUser;

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  constructor(private http: HttpClient, private router: Router) { }

  login(obj: {login: string, password: string}): Observable<IUser>{
    return this.http.post<IUser>(this.baseUrl + 'login', {login: obj.login, password: obj.password}).pipe(
      tap( data => {
        if (data["status"] === 403){
          throw(data);
        }
      }),
      catchError( (err: HttpErrorResponse) => {
        console.log('err login');
        return throwError(err);
      })
    );
  }

  logOut(): void{
    this.currentUser = null;
    this.http.post(this.baseUrl+'logout', {refreshToken: localStorage.getItem('refresh_token')}).pipe(
      catchError( err => {
        return throwError(err);
      })
    ).subscribe( data => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      this.router.navigateByUrl('');
    },
    err => console.log(err));
  }
}
