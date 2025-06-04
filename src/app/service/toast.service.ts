import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) { }

  showToast(message: any, type: 'success' | 'failure' = 'success') { // Use specific types for 'type'
    let config: any = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [] // Initialize as an empty array first
    };
  
    // Conditionally add the correct class
    if (type === 'success') {
      config.panelClass.push('success-snackbar');
    } else if (type === 'failure') {
      config.panelClass.push('failure-snackbar');
    }
  
    this.snackBar.open(message, 'Close', config);
  }
}
