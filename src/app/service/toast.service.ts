import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) { }

  showToast(message: any, type: 'success' | 'failure' = 'success') {
    let config: any = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: []
    };
  
    if (type === 'success') {
      config.panelClass.push('success-snackbar');
    } else if (type === 'failure') {
      config.panelClass.push('failure-snackbar');
    }
  
    this.snackBar.open(message, 'Close', config);
  }
}
