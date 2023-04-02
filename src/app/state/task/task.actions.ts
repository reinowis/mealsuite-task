import { createAction, props } from '@ngrx/store';
import { Task, TaskQuery } from '@shared/models';
import { Update } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';

export enum TaskActionTypes {
    GET_TASKS = 'GET_TASKS',
    GET_TASKS_SUCCESS = 'GET_TASK_SUCCESS',
    GET_TASKS_FAILURE = 'GET_TASK_FAILURE',
    GET_TASK_DETAILS = 'GET_TASK_DETAILS',
    GET_TASK_DETAILS_SUCCESS = 'GET_TASK_DETAILS_SUCCESS',
    GET_TASK_DETAILS_FAILURE = 'GET_TASK_DETAILS_FAILURE',
    UPDATE_TASK = 'UPDATE_TASK',
    UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS',
    UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE',
    COMPLETE_TASK = 'COMPLETE_TASK',
    COMPLETE_TASK_SUCCESS = 'COMPLETE_TASK_SUCCESS',
    COMPLETE_TASK_FAILURE = 'COMPLETE_TASK_FAILURE',
    ADD_TASK = 'ADD_TASK',
    ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS',
    ADD_TASK_FAILURE = 'ADD_TASK_FAILURE',
    DELETE_TASK = 'DELETE_TASK',
    DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS',
    DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE',
}

export const GetTasks = createAction(TaskActionTypes.GET_TASKS, props<{ query?: TaskQuery }>());
export const GetTasksSuccess = createAction(TaskActionTypes.GET_TASKS_SUCCESS, props<{ tasks: Task[] }>());
export const GetTasksFailure = createAction(TaskActionTypes.GET_TASKS_FAILURE, props<{ error: HttpErrorResponse }>());

export const GetTaskDetails = createAction(TaskActionTypes.GET_TASK_DETAILS, props<{ id: string }>());
export const GetTaskDetailsSuccess = createAction(TaskActionTypes.GET_TASK_DETAILS_SUCCESS, props<{ task: Task }>());
export const GetTaskDetailsFailure = createAction(TaskActionTypes.GET_TASK_DETAILS_FAILURE, props<{ error: HttpErrorResponse }>());

export const UpdateTask = createAction(TaskActionTypes.UPDATE_TASK, props<{ id: string; task: Partial<Task> }>());
export const UpdateTaskSuccess = createAction(TaskActionTypes.UPDATE_TASK_SUCCESS, props<Update<Task>>());
export const UpdateTaskFailure = createAction(TaskActionTypes.UPDATE_TASK_FAILURE, props<{ error: HttpErrorResponse }>());

export const CompleteTask = createAction(TaskActionTypes.COMPLETE_TASK, props<{ id: string; completed: boolean; }>());
export const CompleteTaskSuccess = createAction(TaskActionTypes.COMPLETE_TASK_SUCCESS, props<Update<Task>>());
export const CompleteTaskFailure = createAction(TaskActionTypes.COMPLETE_TASK_FAILURE, props<{ error: HttpErrorResponse }>());

export const AddTask = createAction(TaskActionTypes.ADD_TASK, props<{ task: Task }>());
export const AddTaskSuccess = createAction(TaskActionTypes.ADD_TASK_SUCCESS, props<{ task: Task }>());
export const AddTaskFailure = createAction(TaskActionTypes.ADD_TASK_FAILURE, props<{ error: HttpErrorResponse }>());

export const DeleteTask = createAction(TaskActionTypes.DELETE_TASK, props<{ id: string }>());
export const DeleteTaskSuccess = createAction(TaskActionTypes.DELETE_TASK_SUCCESS, props<{ tasks: Task[] }>());
export const DeleteTaskFailure = createAction(TaskActionTypes.DELETE_TASK_FAILURE, props<{ error: HttpErrorResponse }>());
