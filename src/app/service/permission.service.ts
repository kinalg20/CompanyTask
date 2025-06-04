import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

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
      resolve(true);
      // this.apiService.getLoginInformation().pipe(take(1)).subscribe(
      //   {
      //     next: (data : any) => {
      //       if (data) {
      //         if (!data.username) {
      //           this.apiService.showToast("You need to login to view the page.");
      //           this.router.navigate(['/','auth']);
      //           resolve(false);
      //           return;
      //         }
      //         resolve(true);
      //       }
      //     }
      //   }
      // )
    })
  }

  canActivateAuthPages(): Promise<boolean> {
    return new Promise(resolve => {
      resolve(true);
      // this.apiService.getLoginInformation().pipe(take(1)).subscribe(
      //   {
      //     next: (data : any) => {
      //       if (data && data.username) {
      //         this.apiService.showToast("You are already logged in.");
      //         this.router.navigate(['/', 'admin'])
      //         resolve(false);
      //         return;
      //       }
      //       resolve(true);
      //     }
      //   }
      // )
    })
  }
}
