import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'password' , 'role', 'actions'];
  users = new MatTableDataSource<any>([]);
  constructor(private apiService: ApiService , private dialog: MatDialog) { }
  ngOnInit() {
    this.getUserList();
  }

  getUserList(){
    this.apiService.getUsers().subscribe(users => {
      this.users.data = users;
    });
  }
}

 
