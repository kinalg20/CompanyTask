import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from '../state/user.model';
import { TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from '../state/user.effects';
import { usersFeature } from '../state/user.reducer';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        StoreModule.forFeature(usersFeature),
        EffectsModule.forFeature([UserEffects]),
        TranslateModule.forRoot({
          defaultLanguage: 'en',
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [UsersService, TranslateStore, MatSnackBar]
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a user correctly', (done) => {
    const newUser: User = { name: 'kinal', email: 'kinal@mail.com', password: '1234', role: 'admin' };
    service.addUser(newUser).subscribe(addedUser => {
      expect(addedUser).toBeTruthy();
      expect(addedUser.id).toBeGreaterThan(0);
      expect(service['userList'].some((u: User) => u.email === 'kinal@mail.com')).toBeTrue();
      done();
    });
  });
  it('should update a user correctly', (done) => {
    const updatedData = {id : 1 , name: 'kinal123', email: 'kinal@mail.com', password: '1234', role: 'admin' };
    const userId = updatedData.id;
    service.updateUser(userId, updatedData).subscribe(updatedUser => {
      expect(updatedUser.name).toEqual(updatedData.name);
      const foundUser = service['userList'].find((u: User) => u.id === userId);
      expect(foundUser.name).toEqual(updatedData.name);
      done();
    });
  });

  it('should delete a user correctly', (done) => {
    const userId = 2;
    service.deleteUser(userId).subscribe(deletedId => {
      expect(service['userList'].find((u: User) => u.id === userId)).toBeUndefined();
      done();
    });
  });

  it('should delete a user if id present', (done) => {
    const userId = 2;
    service.deleteUser(userId).subscribe(deletedId => {
      expect(deletedId).toEqual(userId);
      done();
    });
  });
});