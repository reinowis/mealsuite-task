import { createReducer, on } from "@ngrx/store";
import { IError, User } from "@shared/models";

import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { setErrorState, setSuccessState } from "@shared/helpers";
import * as UserActions from "./user.actions";

export interface UserEntityState extends EntityState<User> {
  loading: Array<UserActions.UserActionTypes>;
  errors: Array<IError<UserActions.UserActionTypes>>;
}

const initialState: UserEntityState = {
  entities: null,
  loading: [],
  errors: [],
  ids: [],
};

const userAdapter = createEntityAdapter<User>();

export const userReducer = createReducer(
  userAdapter.getInitialState(initialState),
  on(UserActions.GetUsers, (state) => ({
    ...state,
    loading: [...state.loading, UserActions.UserActionTypes.GET_USERS],
  })),
  on(UserActions.GetUsersSuccess, (state, { users }) => userAdapter.setAll(users, setSuccessState(state, UserActions.UserActionTypes.GET_USERS))),
  on(UserActions.GetUsersFailure, (state, { error }) => setErrorState(state, UserActions.UserActionTypes.GET_USERS, error))
);

const { selectAll, selectTotal, selectEntities, selectIds } =
  userAdapter.getSelectors();

export const selectUserEntities = selectEntities;
export const selectAllUsers = selectAll;
export const selectTotalUsers = selectTotal;
export const selectUserIds = selectIds;
