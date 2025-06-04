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
    private http: HttpClient,
    private router: Router, 
    private translate: TranslateService
  ) { }


  getReportsData(){
    return this.http.get('https://mocki.io/v1/0551a83f-e825-450a-b379-38fbb43354b1');
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  getDashboardCards(){
    return this.http.get('https://mocki.io/v1/374f37f4-4aba-4620-ac2f-1ab93f0c28f7');
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
