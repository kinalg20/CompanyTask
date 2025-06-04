import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { PermissionService } from 'src/app/service/permission.service';
import { ToastService } from 'src/app/service/toast.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router, private userService: UsersService, private permission: PermissionService , private apiService : ApiService,private toastService :ToastService) { }
  hide: boolean = true;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  onLogin() {
    this.permission.setLoader(true);
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.permission.setLoader(true);
      let postData: any = Object.assign({} , this.loginForm.value);
      this.userService.loginUser(postData).subscribe({
        next: (res: any) => {
          if(res.token){
            localStorage.setItem('user_token' , res.token)
          }
          else{
            this.toastService.showToast(res.error);
          }
        },
        complete: () => {
          this.router.navigateByUrl('/admin/home')
        },
        error: (err: any) => {
          this.toastService.showToast(err.error.error);
        }
      })
    }
    else {
      this.permission.setLoader(false);
    }
  }
}
