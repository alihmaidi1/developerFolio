export interface ApiError {
  code: string;
  message: string;
}

interface OperationResultBase {
  statusCode: number;
}

interface SuccessfulResult<T> extends OperationResultBase {
  isSuccess: true;
  isFailure: false;
  error: null;
  value: T;
}

interface FailedResult extends OperationResultBase {
  isSuccess: false;
  isFailure: true;
  error: ApiError;
  value: null;
}

export type TResult<T> = SuccessfulResult<T> | FailedResult;
