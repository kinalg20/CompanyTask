import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

describe('UsersService', () => {
  let service: UsersService;

  const mockSnackBar = { open: jasmine.createSpy('open') };
  const mockRouter = { navigate: jasmine.createSpy('navigate') };
  const mockTranslate = { instant: jasmine.createSpy('instant') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule , MatSnackBarModule],
      providers: [
        UsersService,
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Router, useValue: mockRouter },
        { provide: TranslateService, useValue: mockTranslate }
      ]
    });

    service = TestBed.inject(UsersService);
    localStorage.clear();  // Clear localStorage before each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers()', () => {
    it('should load users from localStorage and update BehaviorSubject', () => {
      const mockUsers = [{ id: 1, name: 'Kinal' }];
      localStorage.setItem('userInfo', JSON.stringify(mockUsers));

      const result$ = service.getUsers();

      result$.subscribe(data => {
        expect(data).toEqual(mockUsers);
      });
    });
  });

  describe('addUser()', () => {
    it('should add new user when users already exist', () => {
      const mockUsers = [{ id: 1, name: 'Test' }];
      localStorage.setItem('userInfo', JSON.stringify(mockUsers));

      const newUser = { name: 'New User' };
      service.addUser(newUser);

      const saved = JSON.parse(localStorage.getItem('userInfo')!);
      expect(saved.length).toBe(2);
      expect(saved[1].name).toBe('New User');
      expect(saved[1].id).toBe(2);
    });

    it('should create new array if no users exist', () => {
      const newUser = { name: 'First User' };
      service.addUser(newUser);

      const saved = JSON.parse(localStorage.getItem('userInfo')!);
      expect(saved.length).toBe(1);
      expect(saved[0].name).toBe('First User');
      expect(saved[0].id).toBe(1);
    });
  });

  describe('updateUser()', () => {
    it('should update the user with matching id', async () => {
      const mockUsers = [
        { id: 1, name: 'Original' },
        { id: 2, name: 'Other' }
      ];
      (service as any).users$.next(mockUsers);

      const updated = { id: 1, name: 'Updated' };
      await service.updateUser(updated);

      const result = (service as any).users$.value;
      expect(result[0].name).toBe('Updated');
      expect(result[1].name).toBe('Other');
    });

    it('should reject if user id is invalid', async () => {
      try {
        await service.updateUser({ name: 'Invalid' });
      } catch (err) {
        expect(err).toBe('user id is invalid.');
      }
    });

    it('should reject if users$ is not available', async () => {
      (service as any).users$ = null;
      try {
        await service.updateUser({ id: 1, name: 'Test' });
      } catch (err) {
        expect(err).toBe('User list not available.');
      }
    });
  });

  describe('deleteUser()', () => {
    it('should delete user by id and update localStorage', async () => {
      const mockUsers = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' }
      ];
      (service as any).users$.next(mockUsers);

      await service.deleteUser(1);
      const result = (service as any).users$.value;

      expect(result.length).toBe(1);
      expect(result[0].id).toBe(2);

      const saved = JSON.parse(localStorage.getItem('userInfo')!);
      expect(saved.length).toBe(1);
      expect(saved[0].id).toBe(2);
    });
  });
});
