import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router : Router, private apiService : ApiService){}
  hide : boolean = true;
  loginForm = new FormGroup({
    username : new FormControl('' , [Validators.required]),
    password: new FormControl('' , [Validators.required])
  })

  onLogin() {

    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      
      let postData : any = {};

      postData['username'] = this.loginForm.value.username;
      postData['password'] = this.loginForm.value.password;

      this.apiService.login(postData).subscribe({
        next : (res:any) => {
          localStorage.setItem('auth_token', res.accessToken)
          this.apiService.reinitiateLogin().subscribe(res => {
            if(res && res.username) {
              this.router.navigateByUrl('admin/home');
            }
          });
        }
      })
    }
  }
}
