import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { throwError, of, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService,
    private userService: UsersService
  ) {}

  getReportsData() {
    return this.http.get('https://mocki.io/v1/0551a83f-e825-450a-b379-38fbb43354b1');
  }

  getDashboardCards() {
    return this.http.get('https://mocki.io/v1/374f37f4-4aba-4620-ac2f-1ab93f0c28f7');
  }

  getJsonData() {
    return this.http.get('assets/i18n/roleAuth.json');
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
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

  async canActivateSecurePages(route: any, state: any): Promise<boolean> {
    try {
      const loggedInUser: any = await firstValueFrom(this.userService.getUserUsingSubjectBehaviour());

      if (!loggedInUser?.id) {
        this.router.navigateByUrl('/auth/login');
        return false;
      }

      const routeData: any = await firstValueFrom(this.getJsonData());
      const matchedRoute = routeData?.roles?.find((r: any) => r.route === state.url);

      if (matchedRoute && matchedRoute.role.includes(loggedInUser.role)) {
        return true;
      } else {
        this.router.navigateByUrl('/admin/home');
        return false;
        // throw new Error('User not authorized');
      }

    } catch (err) {
      console.error(err);
      this.router.navigateByUrl('/auth/login');
      return false;
    }
  }
}
