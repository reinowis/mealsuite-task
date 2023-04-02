import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, mergeMap, switchMap, tap } from "rxjs/operators";

import { BackendService } from "@core/services/backend.service";

import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import * as TaskActions from "./task.actions";

@Injectable()
export class TaskEffects {
  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.GetTasks),
      switchMap(({ query }) => this.backendService.tasks(query)),
      switchMap((tasks) => of(TaskActions.GetTasksSuccess({ tasks }))),
      catchError((error: HttpErrorResponse) =>
        of(TaskActions.GetTasksFailure({ error }))
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.AddTask),
      mergeMap(({ task }) => this.backendService.newTask(task)),
      switchMap((savedTask) =>
        of(TaskActions.AddTaskSuccess({ task: savedTask }))
      ),
      catchError((error: HttpErrorResponse) => {
        this.snackbar.open(error?.message);
        return of(TaskActions.AddTaskFailure({ error }));
      })
    )
  );

  getTaskDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.GetTaskDetails),
      mergeMap(({ id }) => this.backendService.task(id)),
      switchMap((task) => of(TaskActions.GetTaskDetailsSuccess({ task }))),
      catchError((error: HttpErrorResponse) => {
        this.snackbar.open(error?.message);
        return of(TaskActions.GetTaskDetailsFailure({ error }));
      })
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.UpdateTask),
      mergeMap(({ id, task }) => this.backendService.update(id, task)),
      switchMap((task) =>
        of(TaskActions.UpdateTaskSuccess({ id: task.id, changes: task }))
      ),
      tap((_) => {
        this.snackbar.open("Task has been updated successfully", "OK", {
          duration: 3000,
          verticalPosition: "top",
        });
      }),
      catchError((error: HttpErrorResponse) => {
        this.snackbar.open(error?.message);
        return of(TaskActions.UpdateTaskFailure({ error }));
      })
    )
  );

  completeTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.CompleteTask),
      mergeMap(({ id, completed }) =>
        this.backendService.complete(id, completed)
      ),
      switchMap((task) =>
        of(
          TaskActions.CompleteTaskSuccess({
            id: task.id,
            changes: {
              completed: task.completed,
            },
          })
        )
      ),
      catchError((error: HttpErrorResponse) => {
        this.snackbar.open(error?.message);
        return of(TaskActions.CompleteTaskFailure({ error }));
      })
    )
  );

  constructor(
    private actions$: Actions,
    private backendService: BackendService,
    private snackbar: MatSnackBar
  ) {}
}
