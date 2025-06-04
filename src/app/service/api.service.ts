import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, lastValueFrom, Observable, ReplaySubject, shareReplay, tap, throwError } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router, 
    private translate: TranslateService
  ) { }



  showToast(message: any, type: 'success' | 'failure' = 'success') { // Use specific types for 'type'
    let config: any = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [] // Initialize as an empty array first
    };
  
    // Conditionally add the correct class
    if (type === 'success') {
      config.panelClass.push('success-snackbar');
    } else if (type === 'failure') {
      config.panelClass.push('failure-snackbar');
    }
  
    this.snackBar.open(message, 'Close', config);
  }

  getReportsData(){
    return this.http.get('https://mocki.io/v1/0551a83f-e825-450a-b379-38fbb43354b1');
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

  // getLoginInformation(): any {
  //   if (!this.loginInfo$) {
  //     // Fetch login information if it's not already cached
  //     this.loginInfo$ = this.fetchLoginInformation();
  //     this.loginInfo$.subscribe()
  //   }
  //   return this.userSession.asObservable();
  // }


  // reinitiateLogin() {
  //   // Reset the cached login information
  //   this.loginInfo$ = undefined;
  //   // Fetch login information again
  //   return this.fetchLoginInformation();
  // }


  logout() {
    localStorage.removeItem('auth_token')
    this.showToast("Log out successfully!!");
    this.loginInfo$ = undefined;
    this.userSession = new ReplaySubject<any>(1);
    this.router.navigate(['/', 'auth']);
  }

  preventSpace(event: KeyboardEvent) {
    if (event.code === 'Space' || event.key === ' ') {
      event.preventDefault();
    }
  }
  
  blockPasteWithSpace(event: ClipboardEvent) {
    const pasteData = event.clipboardData?.getData('text');
    if (pasteData?.includes(' ')) {
      event.preventDefault();
    }
  }
}
