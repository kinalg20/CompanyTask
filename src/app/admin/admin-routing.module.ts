import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin.component';
import { ReportComponent } from './report/report.component';
import { SettingsComponent } from './settings/settings.component';
import { authGuard } from '../config/auth.guard';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'users', component: UserComponent , canActivate : [authGuard]},
      { path: 'reports', component: ReportComponent , canActivate : [authGuard]},
      { path: 'settings', component: SettingsComponent , canActivate : [authGuard]},
      { path: 'home', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
