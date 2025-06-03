import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private users$ = new BehaviorSubject<any[]>([
    { id: 1, name: 'Alice', email: 'alice@mail.com', password: '234' },
    { id: 2, name: 'Bob', email: 'bob@mail.com', password: '234' },
    { id: 2, name: 'Bob', email: 'bob@mail.com', password: '234' },
    { id: 2, name: 'Bob', email: 'bob@mail.com', password: '234' },
    { id: 2, name: 'Bob', email: 'bob@mail.com', password: '234' },
  ]);

  constructor(private snackBar: MatSnackBar ,  private http : HttpClient, private translate: TranslateService) { }
  getUsers() {
    return this.users$.asObservable();
  }
  addUser(user: any) {
    return new Promise((resolve, reject) => {
      try {
        const current = this.users$.value;
        user.id = current.length ? Math.max(...current.map(u => u.id)) + 1 : 1;
        this.users$.next([...current, user]);
        resolve(true);
      }

      catch (err) {
        reject(err);
      }
    }
    )
  }

  updateUser(updated: any) {
    return new Promise((resolve, reject) => {
      try {
        if (!this.users$ || !this.users$.value) {
          return reject('User list not available.');
        }

        if (!updated || !updated.id) {
          return reject('user id is invalid.');
        }

        const current = this.users$.value.map(u => u.id === updated.id ? updated : u);
        this.users$.next(current);
        resolve(true);
      }

      catch (error) {
        reject(error);
      }
    });

  }

  deleteUser(id: number) {
    return new Promise((resolve , reject)=>{
      try{
        const current = this.users$.value.filter(u => u.id !== id);
        this.users$.next(current);
      }

      catch(err){
        reject(err);
      }
    })
  }

  showToast(message : any){
    this.snackBar.open(message, 'Close', {
      duration: 3000, // in milliseconds
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  getReportsData(){
    return this.http.get('https://mocki.io/v1/0551a83f-e825-450a-b379-38fbb43354b1');
  }

  private currentTheme = 'light-theme';

  setTheme(theme: 'light-theme' | 'dark-theme') {
    document.body.classList.remove(this.currentTheme);
    this.currentTheme = theme;
    document.body.classList.add(theme);
  }

  getTheme() {
    return this.currentTheme;
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  getDashboardCards(){
    return this.http.get('https://mocki.io/v1/374f37f4-4aba-4620-ac2f-1ab93f0c28f7');
  }
}
