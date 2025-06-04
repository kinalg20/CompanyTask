import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { User } from '../state/user.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public userList: any = [
    { id: 1, name: 'Alice', email: 'alice@mail.com', password: '1234', role: 'admin' },
    { id: 2, name: 'Bob', email: 'bob@mail.com', password: '1234', role: 'admin' },
    { id: 3, name: 'Charlie', email: 'charlie@mail.com', password: '1234', role: 'admin' },
  ];

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('https://api.zabali.co/api/user-auth')
  }


  addUser(user: User) {
    return this.http.post('https://api.zabali.co/api/user-auth/register', user)
  }



  updateUser(id: any, updated: any) {
    let userObject = {...updated ,  "createdBy": "system", "expiresInMins": 60 , "avatar": "http://example.com/avatar.png"};
    return this.http.put(`https://api.zabali.co/api/user-auth/${id}`,userObject)
  }

  deleteUser(id: number) {
    return this.http.delete(`https://api.zabali.co/api/user-auth/${id}`)
  }

  loginUser(userObj: any) {
    return this.http.post('https://api.zabali.co/api/user-auth/login', userObj)
  }

  getUserInfoByToken() {
    let token = localStorage.getItem('user_token');
    if(token){
      const decoded: any = jwtDecode(token!);
      return this.http.get(`https://api.zabali.co/api/user-auth/${decoded.id}`);
    }
    else{
      return of('');
    }
  }
}
