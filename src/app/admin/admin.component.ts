import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../service/api.service';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private router : Router, private apiService : ApiService, private breakpointObserver: BreakpointObserver , private translate : TranslateService,private userService : UsersService){}
  isSmallScreen: boolean = false;
  toggleSettings = false;
  selectedLang = this.translate.currentLang || 'en';

  routing(){
    // this.apiService.logout()
  }
  

  ngOnInit(){
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
    this.selectedLang  = localStorage.getItem('selectedLang') ?? 'en';
    this.translate.use(this.selectedLang);
    this.getUserInfoByToken();
  }

  switchLanguage(lang: any) {
    this.translate.use(lang.value);
    localStorage.setItem('selectedLang' , lang.value)
  }

  getUserInfoByToken(){
    this.userService.getUserInfoByToken().subscribe((res:any)=>{
      console.log(res);
    })
  }
}
