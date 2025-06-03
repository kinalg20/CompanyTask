import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  displayedColumns = ['id', 'name', 'email', 'actions'];
  users: any = [];
  constructor(private apiService: ApiService , private dialog: MatDialog) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList(){
    this.apiService.getUsers().subscribe(data => this.users = data);
  }

  openDialog(user?:any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px', 
      autoFocus: false,
      disableClose: true,
      data: { /* pass any data if needed */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'submitted') {
        this.refreshUserList();  // <-- your parent component function
      }
    });
  }

  deleteUser(id : any) { }
}

 
