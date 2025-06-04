import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../state/user.model';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [UsersService]
    });

    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users', (done) => {
    const mockUsers = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
      done();
    });

    const req = httpMock.expectOne('https://api.zabali.co/api/user-auth');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should add a user correctly', (done) => {
    const newUser: User = {
      name: "John Doe",
      email: "kina@mail.com",
      role: "admin",
      username: "johndoe234",
      password: "password123",
      createdBy: 'system',
      expiresInMins: '60',
      avatar: "http://example.com/avatar.png"
    };

    const mockResponse = { ...newUser, id: 123 };

    service.addUser(newUser).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne('https://api.zabali.co/api/user-auth/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(mockResponse);
  });

  it('should update a user correctly', (done) => {
    const updatedUser = {
      id: 1,
      name: "John Updated",
      email: "kina@mail.com",
      role: "admin",
      username: "johndoe234",
      password: "password123",
      createdBy: 'system',
      expiresInMins: '60',
      avatar: "http://example.com/avatar.png"
    };

    service.updateUser(updatedUser.id, updatedUser).subscribe((res) => {
      expect(res).toEqual(updatedUser);
      done();
    });

    const req = httpMock.expectOne(`https://api.zabali.co/api/user-auth/${updatedUser.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({
      ...updatedUser,
      createdBy: 'system',
      expiresInMins: 60,
      avatar: 'http://example.com/avatar.png'
    });
    req.flush(updatedUser);
  });

  it('should delete a user', (done) => {
    const userId = 2;

    service.deleteUser(userId).subscribe((res) => {
      expect(res).toEqual({});
      done();
    });

    const req = httpMock.expectOne(`https://api.zabali.co/api/user-auth/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should return user info if token is present', (done) => {
    const fakeToken = btoa(
      JSON.stringify({ alg: "HS256", typ: "JWT" })
    ) + '.' + btoa(
      JSON.stringify({ id: 10, name: "Mock User" })
    ) + '.signature';

    localStorage.setItem('user_token', fakeToken);

    const mockUser = { id: 10, name: 'Mock User' };

    service.getUserInfoByToken().subscribe((res) => {
      expect(res).toEqual(mockUser);
      done();
    });

    const req = httpMock.expectOne(`https://api.zabali.co/api/user-auth/10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should return empty observable if no token is found', (done) => {
    localStorage.removeItem('user_token');
    service.getUserInfoByToken().subscribe((res) => {
      expect(res).toBe('');
      done();
    });
  });
});
