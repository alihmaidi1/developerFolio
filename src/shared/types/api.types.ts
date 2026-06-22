export interface ApiError {
  code: string;
  message: string;
}

export interface TResult<T> {
  isSuccess: boolean;
  isFailure: boolean;
  statusCode: number;
  error: ApiError | null;
  value: T | null;
}
