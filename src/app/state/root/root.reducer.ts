import { ActionReducerMap } from '@ngrx/store';
import { TaskEntityState, taskReducer } from '@state/task';
import { UserEntityState, userReducer } from '@state/user';

export interface AppState {
  task: TaskEntityState;
  user: UserEntityState;
}

export const rootReducers: ActionReducerMap<AppState> = {
  task: taskReducer,
  user: userReducer,
};
