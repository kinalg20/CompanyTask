import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = localStorage.getItem('auth_token')
    let modifiedRequest = request
    if(token) {
      modifiedRequest = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
        },
      });
    }

    return next.handle(modifiedRequest);
  }
}
