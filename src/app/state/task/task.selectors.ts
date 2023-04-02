import { createSelector } from "@ngrx/store";
import { AppState } from "@state/root";
import { selectAllTasks, selectTaskEntities } from "./task.reducer";
import { TaskActionTypes } from "./task.actions";

const taskState = (state: AppState) => state.task;

export const getTasksSelector = createSelector(taskState, selectAllTasks);

export const getTaskEntitiesSelector = createSelector(
  taskState,
  selectTaskEntities
);

export const getTasksLoadingSelector = createSelector(taskState, (state) =>
  state.loading.includes(TaskActionTypes.GET_TASKS)
);

export const getTaskQuerySelector = createSelector(
  taskState,
  (state) => state.query
);
