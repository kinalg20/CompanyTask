import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { PermissionService } from '../service/permission.service';
import { ApiService } from '../service/api.service';
import { ToastService } from '../service/toast.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private permission: PermissionService , private toastService :ToastService , private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.permission.setLoader(true);

    const token = localStorage.getItem('user_token');
    let modifiedRequest = request;

    if (token) {
      modifiedRequest = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
        },
      });
    }

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Unauthorized — redirect to login or show message');
          this.router.navigateByUrl('/')
        } else if (error.status === 500) {
          console.error('Internal Server Error');
        } else {
          console.error(`Error Status: ${error.status}, Message: ${error.message}`);
        }
        this.toastService.showToast(error.error.error);
        return throwError(() => error);
      }),
      finalize(() => {
        this.permission.setLoader(false);
      })
    );
  }
}
