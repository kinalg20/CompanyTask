import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ApiService } from 'src/app/service/api.service';
import { UsersService } from 'src/app/service/users.service';
import { UserActions } from 'src/app/state/user.actions';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  options = [
    { value: 'viewer', label: 'viewer' },
    { value: 'editor', label: 'editor' },
    { value: 'admin', label: 'admin' }
  ];
  closeDialog(result?: any) {
    this.dialogRef.close(result);
  }
  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public apiService: ApiService, private userService: UsersService , private store: Store) {
    this.userForm.patchValue(data.userInfo);
  }
  userForm : any = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  async onSubmit() {
    if(this.userForm.valid){
      let result: any = {};
      if (this.userForm.value.id) {
        result.status = 'Updated';
        this.store.dispatch(UserActions.updateUser({ user: this.userForm.value }));
        this.closeDialog(result);
      }
      else {
        this.userService.getUsers().subscribe((res: any) => {
          let usersList = res.filter((resp: any) => resp.username == this.userForm.value.name);
          if (usersList?.length == 1) {
            this.apiService.showToast('User Already Exists')
          }
          else {
            result.status = 'Submitted';
            this.store.dispatch(UserActions.addUser({ user: this.userForm.value }));
            this.closeDialog(result);
          }
        })
      }
    }
  }
}
