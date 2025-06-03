import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [UserComponent, AdminComponent, DialogComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
