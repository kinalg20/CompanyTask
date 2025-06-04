
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../service/users.service';
import { PermissionService } from '../service/permission.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private permission: PermissionService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.permission.setLoader(true);
    let token = localStorage.getItem('auth_token')
    let modifiedRequest = request
    if(token) {
      this.permission.setLoader(false);
      modifiedRequest = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
        },
      });
    }
    else{
      this.permission.setLoader(false);
    }

    return next.handle(modifiedRequest);
  }
}
