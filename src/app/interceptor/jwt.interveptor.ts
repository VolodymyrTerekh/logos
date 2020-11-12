import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpClient
  } from "@angular/common/http";
  import { Observable, throwError } from "rxjs";
  import { LoginService } from '../service/login/login.service'
import { catchError, flatMap } from 'rxjs/operators';


@Injectable()

  export class RefreshTokenInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService, private http: HttpClient){}

    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                
                if (err.status === 401){
                    if (err.statusText === "Unauthorized"){
                        const refreshToken = localStorage.getItem('refresh_token')
                        return this.http.post("http://localhost:3001/auth/refreshToken", {refreshToken: refreshToken}).pipe(
                            flatMap( data => {
                                localStorage.setItem('access_token', data['token'])
                                localStorage.setItem('refresh_token', data['refreshToken'])
                                console.log(data)
                                req = req.clone({
                                    headers: req.headers.set('access_token', data['token'])
                                })
                                console.log(data['token'])
                                
                                return next.handle(req)
                            })
                        )
                    }
                    else{
                        return next.handle(req)
                    }

                }
                return next.handle(req)
            })
        )
            
    }
  }