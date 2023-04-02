export interface TaskQuery {
  description?: string;
  completed?: boolean;
  assigneeId?: Array<string>;
}

export interface IError<T> {
  action: T;
  detail: string;
}

export interface BaseState<T> {
  loading: Array<T>;
  errors: Array<IError<T>>;
}
