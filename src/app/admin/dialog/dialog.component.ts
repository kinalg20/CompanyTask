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
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  async onSubmit(){
    let result : any = {};
    if(Object.keys(this.data.userInfo)?.length){
      result.status = 'Updated';
      let userDetails = Object.assign({} , {id : this.data.userInfo.id} , this.userForm.value)
      await this.apiService.updateUser(userDetails);
    }
    else{
      result.status = 'Submitted';
      await this.apiService.addUser(this.userForm.value);
    }
    this.closeDialog(result);
  }
}
