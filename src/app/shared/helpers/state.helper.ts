import { BaseState, IError } from "@shared/models";

export function clearLoading<T extends BaseState<U>, U>(
  state: T,
  action: U
): Array<U> {
  return state.loading.filter((loadingMarker: U) => loadingMarker !== action);
}

export function clearError<T extends BaseState<U>, U>(
  state: T,
  action: U
): Array<IError<U>> {
  return state.errors.filter((error: IError<U>) => error.action !== action);
}

export function addError<T extends BaseState<U>, U>(
  state: T,
  action: U,
  detail: string
): Array<IError<U>> {
  const error: IError<U> = { action, detail };
  return [...state.errors, error];
}

export function setErrorState<
  T extends BaseState<U>,
  U,
  V extends { message?: string }
>(state: T, action: U, error: V): T {
  return {
    ...state,
    loading: clearLoading(state, action),
    errors: addError(state, action, error.message),
  };
}

export function setSuccessState<
  T extends BaseState<U>,
  U,
>(state: T, action: U): T {
  return {
    ...state,
    loading: clearLoading(state, action),
    errors: clearError(state, action),
  };
}

export function setLoadingState<
  T extends BaseState<U>,
  U,
>(state: T, action: U): T {
  return {
    ...state,
    loading: [...state.loading, action],
  };
}