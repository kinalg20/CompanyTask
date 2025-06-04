import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { UserActions } from './user.actions';
import { UsersService } from '../service/users.service';
import { ToastService } from '../service/toast.service';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          tap((users: any) => console.log('Fetched users:', users)),
          map((users: any) =>
            UserActions.loadUsersSuccess({ users: users.length > 1 ? users : [users] })
          ),
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
          tap((user: any) => {
            this.toastService.showToast(user.message);
          }),
          mergeMap((user: any) => [
            UserActions.addUserSuccess({ user }),
            UserActions.loadUsers()
          ]),
          catchError(error => of(UserActions.addUserFailure({ error })))
        )
      )
    ));
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(action =>
        this.userService.updateUser(action.user.id, action.user).pipe(
          mergeMap((user: any) => [
            UserActions.addUserSuccess(user),
            UserActions.loadUsers()
          ]),
          catchError(error => of(UserActions.addUserFailure({ error })))
        )
      )
    )
  );
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(action =>
        this.userService.deleteUser(Number(action.id)).pipe(
          mergeMap((user: any) => [
            UserActions.addUserSuccess(user),
            UserActions.loadUsers()
          ]),
          catchError(error => of(UserActions.addUserFailure({ error })))
        )
      )
    )
  );


  constructor(private actions$: Actions, private userService: UsersService, private toastService: ToastService) { }
}
