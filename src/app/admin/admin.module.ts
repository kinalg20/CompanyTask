import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { DialogComponent } from './dialog/dialog.component';
import { ReportComponent } from './report/report.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [UserComponent, AdminComponent, DialogComponent, ReportComponent, SettingsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
