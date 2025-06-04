import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, catchError, lastValueFrom, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users$ = new BehaviorSubject<any[]>([]);

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService
  ) { }

  getUsers() {
    return this.http.get('https://api.escuelajs.co/api/v1/users');
    // if (!this.users$.value || this.users$.value.length === 0) {
    //   this.http.get('https://api.escuelajs.co/api/v1/users').subscribe({
    //     next: (users: any) => this.users$.next(users),
    //     error: (err) => {
    //       console.error(err);
    //       this.users$.next([]);
    //     }
    //   });
    // }
    // return this.users$;
  }
  


  addUser(user: any) {
    return this.http.post('https://api.escuelajs.co/api/v1/users', user);
    // return lastValueFrom(this.http.post('https://dummyjson.com/users' , user));
    // let getUserDetails : any = localStorage.getItem('userInfo');
    // let savedRecords = JSON.parse(getUserDetails);
    // if(getUserDetails?.length){
    //   savedRecords.push({...user , ...{id : savedRecords?.length + 1}});
    // }
    // else{
    //   savedRecords = [{...user , ...{id : 1}}]
    // }
    // localStorage.setItem('userInfo' , JSON.stringify(savedRecords))
    // this.users$.next(savedRecords);
  }

  updateUser(id : any , updated: any) {
    return this.http.post(`https://api.escuelajs.co/api/v1/users/${id}`, updated);
    // return new Promise((resolve, reject) => {
    //   try {
    //     if (!this.users$ || !this.users$.value) {
    //       return reject('User list not available.');
    //     }

    //     if (!updated || !updated.id) {
    //       return reject('user id is invalid.');
    //     }

    //     const current = this.users$.value.map(u => u.id === updated.id ? updated : u);
    //     this.users$.next(current);
    //     resolve(true);
    //   }

    //   catch (error) {
    //     reject(error);
    //   }
    // });

  }

  deleteUser(id: number) {
    return new Promise((resolve, reject) => {
      try {
        const current = this.users$.value.filter(u => u.id !== id);
        this.users$.next(current);
        localStorage.setItem('userInfo', JSON.stringify(current))
      }

      catch (err) {
        reject(err);
      }
    })
  }
}
