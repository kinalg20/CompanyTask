import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from './user.model';
import { UserActions } from './user.actions';

export const usersFeatureKey = 'users';

export interface State extends EntityState<User> {
  // additional entities state properties
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();



export interface State extends EntityState<User> {
  loading: boolean;
  error: any;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
});

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(UserActions.loadUsersSuccess,
    (state, action) => adapter.setAll(action.users, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(UserActions.loadUsersFailure,
    (state, action) => ({
      ...state,
      loading: false,
      error: action.error,
    })
  ),
  on(UserActions.addUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.deleteUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  }))
);


export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer,
  extraSelectors: ({ selectUsersState }) => ({
    ...adapter.getSelectors(selectUsersState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = usersFeature;
