import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import {
  setErrorState,
  setLoadingState,
  setSuccessState,
} from "@shared/helpers";
import { IError, TaskQuery } from "@shared/models";
import { Task } from "../../shared/models/task.model";
import * as TaskActions from "./task.actions";

export interface TaskEntityState extends EntityState<Task> {
  query: TaskQuery;
  loading: Array<TaskActions.TaskActionTypes>;
  errors: Array<IError<TaskActions.TaskActionTypes>>;
}

const initialState: TaskEntityState = {
  entities: null,
  loading: [],
  errors: [],
  ids: [],
  query: null,
};

const taskAdapter = createEntityAdapter<Task>();

export const taskReducer = createReducer(
  taskAdapter.getInitialState(initialState),
  on(TaskActions.GetTasks, (state, { query }) => ({
    ...setLoadingState(state, TaskActions.TaskActionTypes.GET_TASKS),
    query,
  })),

  on(TaskActions.GetTasksSuccess, (state, { tasks }) =>
    taskAdapter.setAll(
      tasks,
      setSuccessState(state, TaskActions.TaskActionTypes.GET_TASKS)
    )
  ),

  on(TaskActions.GetTasksFailure, (state, { error }) =>
    setErrorState(state, TaskActions.TaskActionTypes.GET_TASKS, error)
  ),

  on(TaskActions.GetTaskDetails, (state, { id }) =>
    setLoadingState(state, TaskActions.TaskActionTypes.GET_TASKS)
  ),

  on(TaskActions.GetTaskDetailsSuccess, (state, { task }) =>
    taskAdapter.upsertOne(
      task,
      setSuccessState(state, TaskActions.TaskActionTypes.GET_TASK_DETAILS)
    )
  ),

  on(TaskActions.GetTasksFailure, (state, { error }) =>
    setErrorState(state, TaskActions.TaskActionTypes.GET_TASKS, error)
  ),

  on(TaskActions.AddTaskSuccess, (state, { task }) =>
    taskAdapter.addOne(
      task,
      setSuccessState(state, TaskActions.TaskActionTypes.ADD_TASK)
    )
  ),

  on(TaskActions.AddTaskFailure, (state, { error }) =>
    setErrorState(state, TaskActions.TaskActionTypes.ADD_TASK, error)
  ),

  on(TaskActions.UpdateTaskSuccess, (state, task) =>
    taskAdapter.updateOne(
      task,
      setSuccessState(state, TaskActions.TaskActionTypes.UPDATE_TASK)
    )
  ),

  on(TaskActions.UpdateTaskFailure, (state, { error }) =>
    setErrorState(state, TaskActions.TaskActionTypes.UPDATE_TASK, error)
  ),

  on(TaskActions.CompleteTaskSuccess, (state, task) =>
    taskAdapter.updateOne(task, state)
  ),

  on(TaskActions.CompleteTaskFailure, (state, { error }) =>
    setErrorState(state, TaskActions.TaskActionTypes.COMPLETE_TASK, error)
  ),

  on(TaskActions.DeleteTask, (state, { id }) =>
    taskAdapter.removeOne(id, state)
  ),

  on(TaskActions.DeleteTaskFailure, (state, { error }) =>
    setErrorState(state, TaskActions.TaskActionTypes.DELETE_TASK, error)
  )
);

const { selectAll, selectTotal, selectEntities, selectIds } =
  taskAdapter.getSelectors();

export const selectTaskEntities = selectEntities;
export const selectAllTasks = selectAll;
export const selectTotalTasks = selectTotal;
export const selectTaskIds = selectIds;
