import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserActions } from './user.actions';
import { UsersService } from '../service/users.service';
import { User } from './user.model';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      mergeMap(action =>
        this.userService.addUser(action.user).pipe(
          mergeMap(user => [
            UserActions.addUsersSuccess(),
            UserActions.loadUsers()
          ]),
          catchError(error => of(UserActions.addUsersFailure({ error })))
        )
      )
    )
  );
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(action =>
        this.userService.updateUser(action.user.id , action.user).pipe(
          mergeMap(user => [
            UserActions.addUsersSuccess(),
            UserActions.loadUsers()
          ]),
          catchError(error => of(UserActions.addUsersFailure({ error })))
        )
      )
    )
  );
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(action =>
        this.userService.deleteUser(Number(action.id)).pipe(
          mergeMap(user => [
            UserActions.addUsersSuccess(),
            UserActions.loadUsers()
          ]),
          catchError(error => of(UserActions.addUsersFailure({ error })))
        )
      )
    )
  );
  

  constructor(private actions$: Actions , private userService : UsersService) {}
}
