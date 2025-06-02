import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router : Router){}
  hide : boolean = true;
  loginForm = new FormGroup({
    email : new FormControl('' , [Validators.required, Validators.email]),
    password: new FormControl('' , [Validators.required])
  })

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.router.navigateByUrl('/home');
    }
  }
}
