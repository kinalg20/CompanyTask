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
      data: {
        userInfo : user ? user : {},
        title : user ? 'Edit User' : 'Add User'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (['Submitted' , 'Updated'].includes(result?.status)) {
        if(result.status == 'Submitted'){
          this.apiService.showToast('User Added Successfully')
        }

        else{
          this.apiService.showToast('User Updated Successfully')
        }
        this.getUserList();
      }
    });
  }

  deleteUser(id : any) {
    
   }
}

 
