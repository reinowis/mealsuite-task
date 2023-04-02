import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BackendService } from "@core/services/backend.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, mergeMap, switchMap } from "rxjs/operators";
import * as UserActions from "./user.actions";

@Injectable()
export class UserEffects {
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.GetUsers),
      mergeMap(() =>
        this.backendService.users().pipe(
          switchMap((users) => of(UserActions.GetUsersSuccess({ users }))),
          catchError((error: HttpErrorResponse) => {
            this.snackbar.open(error?.message);
            return of(UserActions.GetUsersFailure(error));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private backendService: BackendService,
    private snackbar: MatSnackBar
  ) {}
}
