import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { User } from "@shared/models";
import {
  AppState,
  TaskActions,
  UserActions,
  getTaskEntitiesSelector,
  getUsersSelector
} from "@state";
import { Observable, ReplaySubject } from "rxjs";
import { filter, map, takeUntil, tap } from "rxjs/operators";

@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.component.html",
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  private destroy$ = new ReplaySubject<boolean>();

  users$: Observable<User[]> = this.store.select(getUsersSelector);
  taskEntities$ = this.store.select(getTaskEntitiesSelector);

  taskId: string;
  taskForm: FormGroup;

  get description() {
    return this.taskForm.get("description");
  }

  get assigneeId() {
    return this.taskForm.get("assigneeId");
  }

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get("id");
    this.initData();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private initData() {
    this.store.dispatch(TaskActions.GetTaskDetails({ id: this.taskId }));
    this.store.dispatch(UserActions.GetUsers());
  }

  private initForm() {
    this.taskForm = this.formBuilder.group({
      description: ["", Validators.required],
      assigneeId: ["", Validators.required],
      completed: [],
    });

    this.taskEntities$
      .pipe(
        takeUntil(this.destroy$),
        map(entities => !!entities && entities[this.taskId]),
        filter(task => !!task),
        tap((task) => {
          this.taskForm.patchValue({
            description: task.description,
            assigneeId: task.assigneeId,
            completed: task.completed,
          });
        })
      )
      .subscribe();
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.store.dispatch(
        TaskActions.UpdateTask({ id: this.taskId, task: this.taskForm.value })
      );
    }
  }

  goBack() {
    this.location.back();
  }
}
