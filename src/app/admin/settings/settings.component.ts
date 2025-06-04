import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/service/api.service';
import { PermissionService } from 'src/app/service/permission.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  constructor(private apiService : ApiService , private translate: TranslateService,public permisson : PermissionService) {}
  dark: boolean = false;

settheme(status: boolean): void {
  if (status) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

ngOnInit() {
  this.settheme(this.dark);
}


}
