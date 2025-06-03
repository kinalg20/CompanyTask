import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private router : Router , private breakpointObserver: BreakpointObserver , private translate : TranslateService){}
  isSmallScreen: boolean = false;
  routing(){
    this.router.navigateByUrl('/');
  }
  

  ngOnInit(){
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  selectedLang = this.translate.currentLang || 'en';

  switchLanguage(lang: any) {
    this.translate.use(lang.target.value);
  }
}
