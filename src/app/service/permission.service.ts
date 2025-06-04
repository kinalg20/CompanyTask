import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  showLoader: boolean = false;

  constructor(
    private router : Router
  ) { }

  
  get getLoader() {
    return this.showLoader;
  }

  setLoader(status: any) {
    this.showLoader = status;
  }
}
