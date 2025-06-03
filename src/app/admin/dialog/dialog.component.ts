import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  closeDialog(result?:any) {
    this.dialogRef.close(result);
  }
  constructor(public dialogRef: MatDialogRef<DialogComponent> , @Inject(MAT_DIALOG_DATA) public data: any, private apiService : ApiService) { 
    this.userForm.patchValue(data.userInfo);
  }
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  onSubmit(){
    let result : any = {};
    if(this.data.userInfo){
      this.apiService.updateUser(this.userForm.value)
      result['status'] = 'Updated'
    }
    else{
      this.apiService.addUser(this.userForm.value);
      result['status'] = 'Submitted'
    }
    this.closeDialog(result);
  }
}
