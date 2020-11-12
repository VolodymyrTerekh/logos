import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
  } from "@angular/common/http";
  import { Observable } from "rxjs";

  
  export class AuthInterceptor implements HttpInterceptor {

    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('access_token')
        const authReq = req.clone({
            headers: req.headers.set('access_token', token)
        })
        return next.handle(authReq);
        
    }
  }