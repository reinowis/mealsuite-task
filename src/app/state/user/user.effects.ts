import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { BackendService } from '@core/services/backend.service';
import * as UserActions from './user.actions';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserEffects {
  getUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.GetUsers),
    mergeMap(() => this.backendService.users().pipe(
      switchMap(users => of(UserActions.GetUsersSuccess({ users }))),
      catchError((error: HttpErrorResponse) => of(UserActions.GetUsersFailure(error))),
    )),
  ));

  constructor(private actions$: Actions, private backendService: BackendService) { }
}
