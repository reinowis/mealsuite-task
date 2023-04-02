import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { User } from '@shared/models';

export enum UserActionTypes {
    GET_USERS = 'GET_USERS',
    GET_USERS_SUCCESS = 'GET_USER_SUCCESS',
    GET_USERS_FAILURE = 'GET_USER_FAILURE',
}

export const GetUsers = createAction(UserActionTypes.GET_USERS);
export const GetUsersSuccess = createAction(UserActionTypes.GET_USERS_SUCCESS, props<{ users: User[] }>());
export const GetUsersFailure = createAction(UserActionTypes.GET_USERS_FAILURE, props<{ error: HttpErrorResponse }>());
