import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { Dictionary } from "@ngrx/entity";
import { Store } from "@ngrx/store";
import { User, Task, TaskQuery } from "@shared/models";
import {
  AppState,
  TaskActions,
  UserActions,
  getTaskQuerySelector,
  getTasksLoadingSelector,
  getTasksSelector,
  getUserEnitiesSelector,
  getUsersSelector,
} from "@state";
import { Observable, ReplaySubject } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
})
export class TaskListComponent implements OnInit, OnDestroy {
  @ViewChild('taskFormDirective') taskFormDirective: NgForm;

  private destroy$ = new ReplaySubject<boolean>();
  tasks$: Observable<Task[]> = this.store.select(getTasksSelector);
  getTaskQuery$: Observable<TaskQuery> =
    this.store.select(getTaskQuerySelector);
  getTasksLoading$: Observable<boolean> = this.store.select(
    getTasksLoadingSelector
  );
  users$: Observable<User[]> = this.store.select(getUsersSelector);
  userEntities$: Observable<Dictionary<User>> = this.store.select(
    getUserEnitiesSelector
  );

  taskForm: FormGroup;
  queryForm: FormGroup;

  get description() {
    return this.taskForm.get("description");
  }

  get assigneeId() {
    return this.taskForm.get("assigneeId");
  }

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initData();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private initData() {
    this.getTasksList();
    this.store.dispatch(UserActions.GetUsers());
  }

  private initForm() {
    this.taskForm = this.formBuilder.group({
      description: ["", Validators.required],
      assigneeId: ["", Validators.required],
    });

    this.queryForm = this.formBuilder.group({
      description: [""],
      completed: [],
      assigneeId: [[]],
    });

    this.queryForm.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap((query) => this.getTasksList(query))
      )
      .subscribe();
  }

  private getTasksList(query?: TaskQuery) {
    this.store.dispatch(TaskActions.GetTasks({ query }));
  }

  completeTask($event: MatCheckboxChange, id: string) {
    this.store.dispatch(
      TaskActions.CompleteTask({
        id,
        completed: $event.checked,
      })
    );
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.store.dispatch(TaskActions.AddTask({ task: this.taskForm.value }));
      
      this.taskFormDirective.resetForm();
    }
  }

  resetFilter() {
    this.queryForm.reset();
  }
}
