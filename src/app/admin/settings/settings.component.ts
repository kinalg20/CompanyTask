import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  selectedTheme = this.apiService.getTheme();

  constructor(private apiService : ApiService , private translate: TranslateService) {}

  changeTheme(theme: string) {
    this.apiService.setTheme(theme as 'light-theme' | 'dark-theme');
  }
}
