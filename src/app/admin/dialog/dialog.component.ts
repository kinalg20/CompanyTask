import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { UsersService } from 'src/app/service/users.service';

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
  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public apiService: ApiService, private userService: UsersService) {
    this.userForm.patchValue(data.userInfo);
  }
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  async onSubmit() {
    let result: any = {};
    if (Object.keys(this.data.userInfo)?.length) {
      result.status = 'Updated';
      // let userDetails = Object.assign({}, { id: this.data.userInfo.id }, this.userForm.value)
      await this.userService.updateUser(this.data.userInfo.id , this.userForm.value);
      this.closeDialog(result);
    }
    else {
      this.userService.getUsers().subscribe((res: any) => {
        let usersList = res.filter((resp: any) => resp.username == this.userForm.value.name);
        if (usersList?.length == 1) {
          this.apiService.showToast('User Already Exists')
        }
        else {
          let userInfo = Object.assign({}, this.userForm.value, { createdBy: 'adminSystem' })
          result.status = 'Submitted';
          this.userService.addUser(userInfo);
          this.closeDialog(result);
        }
      })
    }
  }
}
