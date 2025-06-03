import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, lastValueFrom, Observable, ReplaySubject, shareReplay, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

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

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router, 
    private translate: TranslateService
  ) { }

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
    return new Promise((resolve, reject) => {
      try {
        const current = this.users$.value.filter(u => u.id !== id);
        this.users$.next(current);
      }

      catch (err) {
        reject(err);
      }
    })
  }

  showToast(message: any) {
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
  login(data: any) {
    return this.http.post("https://dummyjson.com/auth/login", data);
  }


  private loginInfo$?: Observable<any>;

  // Use ReplaySubject to cache the user session
  private userSession = new ReplaySubject<any>(1);

  private fetchLoginInformation() {
    return this.http.get("https://dummyjson.com/auth/me").pipe(
      tap((data: any) => {
        this.userSession.next(data);
      }),
      catchError((error: HttpErrorResponse) => {
        this.showToast(error.error.message)
        this.userSession.next({is_login : false});
        this.router.navigate(['/', 'auth'])
        return throwError(() => error.error.message)
      }),
      shareReplay(1)
    );
  }

  getLoginInformation(): Observable<any> {
    if (!this.loginInfo$) {
      // Fetch login information if it's not already cached
      this.loginInfo$ = this.fetchLoginInformation();
      this.loginInfo$.subscribe()
    }
    return this.userSession.asObservable();
  }


  reinitiateLogin() {
    // Reset the cached login information
    this.loginInfo$ = undefined;
    // Fetch login information again
    return this.fetchLoginInformation();
  }


  logout() {
    localStorage.removeItem('auth_token')
    this.showToast("Log out successfully!!");
    this.loginInfo$ = undefined;
    this.userSession = new ReplaySubject<any>(1);
    this.router.navigate(['/', 'auth']);
  }
}
