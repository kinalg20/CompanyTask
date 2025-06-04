import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogComponent } from 'src/app/admin/dialog/dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ApiService } from 'src/app/service/api.service';
import { UsersService } from 'src/app/service/users.service';
import { Store } from '@ngrx/store';
import { UserActions } from 'src/app/state/user.actions';
import { ToastService } from 'src/app/service/toast.service';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent {
  @Input() tableData: any = [];
  @Input() displayedColumns: any = [];
  @Input() title: string = ''
  @Input() showAddEdit: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('tableRef') tableRef!: ElementRef;
  @ViewChild('paginatorRef') paginationcss!: ElementRef;
  constructor(private actions$: Actions , private apiService: ApiService, private userService: UsersService, private dialog: MatDialog, private store: Store, private toastService: ToastService) { }

  openDialog(user?: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px',
      autoFocus: false,
      disableClose: true,
      data: {
        userInfo: user ? user : {},
        title: user ? 'Edit User' : 'Add User'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (['Submitted', 'Updated'].includes(result?.status)) {
        if (result.status == 'Submitted') {
          this.toastService.showToast('User Added Successfully')
        }

        else {
          this.toastService.showToast('User Updated Successfully')
        }
      }
    });
  }

  deleteUser(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(UserActions.deleteUser({ id }));
        this.actions$.pipe(
          ofType(UserActions.addUserSuccess, UserActions.addUserFailure),
          take(1)
        ).subscribe((action : any) => {
          if (action.type === UserActions['addUserSuccess'].type) {
            this.toastService.showToast(action.message)
          } else {
            this.toastService.showToast(action.message)
          }
        });
      }
    });
  }

  ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
    const observer = new ResizeObserver(() => {
      const width = this.tableRef.nativeElement.offsetWidth;
    });
    observer.observe(this.tableRef.nativeElement);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();
  }

}
