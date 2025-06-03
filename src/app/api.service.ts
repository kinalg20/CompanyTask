import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private users$ = new BehaviorSubject<any[]>([
    { id: 1, name: 'Alice', email: 'alice@mail.com' , password : '234'},
    { id: 2, name: 'Bob', email: 'bob@mail.com' , password : '234'},
  ]);

  constructor() { }
  getUsers() {
    return this.users$.asObservable();
  }
  addUser(user: any) {
    const current = this.users$.value;
    user.id = current.length ? Math.max(...current.map(u => u.id)) + 1 : 1;
    this.users$.next([...current, user]);
  }

  updateUser(updated: any) {
    const current = this.users$.value.map(u => u.id === updated.id ? updated : u);
    this.users$.next(current);
  }

  deleteUser(id: number) {
    const current = this.users$.value.filter(u => u.id !== id);
    this.users$.next(current);
  }
}
