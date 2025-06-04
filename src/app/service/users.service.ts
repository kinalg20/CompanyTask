import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, catchError, lastValueFrom, map, Observable, of, tap } from 'rxjs';
import { User } from '../state/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public userList: any = [
    { id: 1, name: 'Alice', email: 'alice@mail.com', password: '1234', role: 'admin' },
    { id: 2, name: 'Bob', email: 'bob@mail.com', password: '1234', role: 'admin' },
    { id: 3, name: 'Charlie', email: 'charlie@mail.com', password: '1234', role: 'admin' },
  ];
  private users$ = new BehaviorSubject<any[]>([]);

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService
  ) { }

  getUsers(): Observable<User[]> {
    return of(this.userList)
  }


  addUser(user: User): Observable<User> {
    const lastUser = this.userList[this.userList.length - 1];
    const newId = lastUser ? lastUser.id + 1 : 1;
    const newUser: any = { ...user, id: newId };
    let userListClone: any = JSON.parse(JSON.stringify(this.userList))
    userListClone.push(newUser);
    this.userList = userListClone;
    return of(newUser);
  }



  updateUser(id: any, updated: any) {
    let userListClone: any = JSON.parse(JSON.stringify(this.userList));
    const index = userListClone.findIndex((res: any) => res.id == id);
    if (index !== -1) {
      userListClone[index] = { ...userListClone[index], ...updated };
    }

    this.userList = userListClone;
    return of(updated);
  }

  deleteUser(id: number) {
    let userListClone: any = JSON.parse(JSON.stringify(this.userList));
    const index = userListClone.findIndex((res: any) => res.id == id);
    userListClone.splice(index , 1);
    this.userList = userListClone;
    return of(id);
  }
}
