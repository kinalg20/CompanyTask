import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { User } from './user.model';

export const UserActions = createActionGroup({
  source: 'User/API',
  events: {
    'Load Users': emptyProps(),           // dispatched to load users (no payload)
    'Load Users Success': props<{ users: any }>(), // on success
    'Load Users Failure': props<{ error: any }>(),    // on failure
    'Add Users Success': emptyProps(), // on success
    'Add Users Failure': props<{ error: any }>(),    // on failure
    'Add User': props<{ user: User }>(),
    'Upsert User': props<{ user: User }>(),
    'Add Users': props<{ users: User[] }>(),
    'Upsert Users': props<{ users: User[] }>(),
    'Update User': props<{ user: Update<User> }>(),
    'Update Users': props<{ users: Update<User>[] }>(),
    'Delete User': props<{ id: number }>(),
    'Delete Users': props<{ ids: string[] }>(),
    'Clear Users': emptyProps(),
  }
});

