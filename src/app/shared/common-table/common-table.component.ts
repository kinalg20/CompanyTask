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
  constructor(private apiService: ApiService, private userService: UsersService, private dialog: MatDialog, private store: Store) { }
  ngOnInit() {
    // this.store.dispatch(UserActions.loadUsers());
  }
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
          this.apiService.showToast('User Added Successfully')
        }

        else {
          this.apiService.showToast('User Updated Successfully')
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
        // this.userService.deleteUser(id).subscribe(() => {
        //   this.apiService.showToast('user deleted successfully');
        // });
      }
    });
  }

  ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
    // this.paginationcss.nativeElement.width = this.tableRef.nativeElement.offsetWidth + 'px';
    const observer = new ResizeObserver(() => {
      const width = this.tableRef.nativeElement.offsetWidth;
      console.log('Updated width:', width);
    });
    observer.observe(this.tableRef.nativeElement);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();
  }

}
