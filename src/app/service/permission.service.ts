import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private apiService : ApiService,
    private router : Router
  ) { }

  canActivateSecurePages(): Promise<boolean> {
    return new Promise(resolve => {
      this.apiService.getLoginInformation().pipe(take(1)).subscribe(
        {
          next: (data) => {
            if (data) {
              if (!data.username) {
                this.apiService.showToast("You need to login to view the page.");
                this.router.navigate(['/','auth']);
                resolve(false);
                return;
              }
              resolve(true);
            }
          }
        }
      )
    })
  }

  canActivateAuthPages(): Promise<boolean> {
    return new Promise(resolve => {
      this.apiService.getLoginInformation().pipe(take(1)).subscribe(
        {
          next: (data) => {
            if (data && data.username) {
              this.apiService.showToast("You are already logged in.");
              this.router.navigate(['/', 'admin'])
              resolve(false);
              return;
            }
            resolve(true);
          }
        }
      )
    })
  }
}
