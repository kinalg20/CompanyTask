import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/service/users.service';
import { Store } from '@ngrx/store';
import { selectAllUsers, selectError, selectLoading } from 'src/app/state/user.selector';
import { UserActions } from 'src/app/state/user.actions';
import { take } from 'rxjs';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  displayedColumns: string[] = ['id', 'name', 'username' , 'password', 'role', 'actions'];
  users = new MatTableDataSource<any>([]);
  users$ = this.store.select(selectAllUsers);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
  constructor(private userService: UsersService, private dialog: MatDialog, private store: Store) {
  }

  ngOnInit() {
    this.store.select(selectAllUsers).pipe(take(1)).subscribe(users => {
      if (users.length === 0) {
        this.store.dispatch(UserActions.loadUsers());
      }
    });
  
    this.users$.subscribe((res: any) => {
      this.users.data = res;
    });
  }

}


