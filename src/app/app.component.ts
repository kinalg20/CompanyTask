import { Component } from '@angular/core';
import { PermissionService } from './service/permission.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin';
  constructor(public permission: PermissionService){}
}
