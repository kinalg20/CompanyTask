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
  constructor(private router: Router, private userService: UsersService,private apiService : ApiService, private breakpointObserver: BreakpointObserver, private translate: TranslateService) { }
  isSmallScreen: boolean = false;
  toggleSettings = false;
  selectedLang = this.translate.currentLang || 'en';

  routing() {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }


  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
    this.selectedLang = localStorage.getItem('selectedLang') ?? 'en';
    this.translate.use(this.selectedLang);
    this.getMenu()
    this.getUserInfo();
  }

  switchLanguage(lang: any) {
    this.translate.use(lang.value);
    localStorage.setItem('selectedLang', lang.value)
  }

  userInfo : any = {};
  getUserInfo() {
    this.userService.getUserUsingSubjectBehaviour().subscribe((res: any) => {
      console.log(res);
      this.userInfo = res;
      this.menuList = this.menuList.filter((res:any)=> res.role.includes(this.userInfo.role));
    })
  }

  menuList : any = [];
  getMenu(){
    this.apiService.getJsonData().subscribe((res:any)=>{
      this.menuList = res['roles'];
    })
  }
}
