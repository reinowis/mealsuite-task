import { createSelector } from "@ngrx/store";
import { AppState } from "@state/root";
import { selectAllUsers, selectUserEntities } from "./user.reducer";

const userState = (state: AppState) => state.user;

export const getUsersSelector = createSelector(userState, selectAllUsers);
export const getUserEnitiesSelector = createSelector(userState, selectUserEntities);
export const getUserLoadingSelector = createSelector(userState, (state) => state.loading);
export const getSelectedUserSelector = (id: string) => createSelector(userState, state => state.entities[id]);
