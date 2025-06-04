import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { ToastService } from 'src/app/service/toast.service';
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
  constructor(private actions$: Actions , public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public apiService: ApiService, private userService: UsersService, private store: Store) {
    this.userForm.patchValue(data.userInfo);
  }
  userForm: any = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  async onSubmit() {
    if (this.userForm.valid) {
      let result: any = {};
      if (this.userForm.value.id) {
        result.status = 'Updated';
        this.store.dispatch(UserActions.updateUser({ user: this.userForm.value }));
        this.actions$.pipe(
          ofType(UserActions.addUsersSuccess, UserActions.addUsersFailure),
          take(1)
        ).subscribe(action => {
          if (action.type === UserActions.addUsersSuccess.type) {
            result.response = 'Success';
          } else {
            result.response = 'Failure';
          }
          this.closeDialog(result);
        });
      }
      else {
        result.status = 'Submitted';
        let userInfo = Object.assign({}, this.userForm.value, { "avatar": "http://example.com/avatar.png" , "expiresInMins": 60})
        this.store.dispatch(UserActions.addUser({ user: userInfo }));
        this.actions$.pipe(
          ofType(UserActions.addUsersSuccess, UserActions.addUsersFailure),
          take(1)
        ).subscribe(action => {
          if (action.type === UserActions.addUsersSuccess.type) {
            result.response = 'Success';
          } else {
            result.response = 'Failure';
          }
          this.closeDialog(result);
        });
      }
    }
  }
}
