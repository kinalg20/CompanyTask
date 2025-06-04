import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, State } from './user.reducer';

// Step 1: select the feature slice of state by its feature key (which is 'users')
export const selectUserState = createFeatureSelector<State>('users');

// Step 2: get basic selectors from the adapter
const { selectAll, selectEntities } = adapter.getSelectors();

// Step 3: create selector for all users as array
export const selectAllUsers = createSelector(
  selectUserState,
  selectAll
);

// Step 4: create selector for loading boolean
export const selectLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

// Step 5: create selector for error object/string
export const selectError = createSelector(
  selectUserState,
  (state) => state.error
);
