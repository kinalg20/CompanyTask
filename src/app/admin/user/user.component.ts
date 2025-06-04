import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  displayedColumns: string[] = ['id', 'name','password' , 'role', 'actions'];
  users = new MatTableDataSource<any>([]);
  constructor(private userService: UsersService , private dialog: MatDialog) { }
  ngOnInit() {
    this.getUserList();
  }

  getUserList(){
    this.userService.getUsers().subscribe((res:any) => {
      this.users.data = res;
    });
  }
}

 
